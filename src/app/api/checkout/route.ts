import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getImage, sizeFor, works } from '@/content/catalog';

// Initialize Stripe lazily to avoid build-time errors
const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(secretKey);
};

export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0 || items.length > 20) {
      return NextResponse.json({ error: 'Invalid items' }, { status: 400 });
    }

    // Price every line from the catalog: the client only names the work and size, and a size is only accepted
    // when the work's master supports it (see sizesFor).
    const origin = process.env.NEXT_PUBLIC_BASE_URL || new URL(request.url).origin;
    const lineItems = [];
    for (const item of items as { slug?: unknown; size?: unknown; quantity?: unknown }[]) {
      const work = typeof item?.slug === 'string' ? works.find((w) => w.slug === item.slug) : undefined;
      const size = work && typeof item.size === 'string' ? sizeFor(work.slug, item.size) : undefined;
      const quantity = Number(item?.quantity);
      if (!work || !size || !Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
        return NextResponse.json({ error: 'One or more items are not available in the selected size.' }, { status: 400 });
      }
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${work.title} — ${size.name}`,
            description: `${size.dimensions} · Limited Edition of ${work.editionSize}`,
            images: [new URL(getImage(work.slug).src, origin).toString()],
          },
          unit_amount: Math.round(size.price * 100), // Convert to cents
        },
        quantity,
      });
    }

    // Create Checkout Session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'CH', 'AT', 'JP', 'SG', 'AE'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'usd',
            },
            display_name: 'Free Worldwide Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 14,
              },
              maximum: {
                unit: 'business_day',
                value: 28,
              },
            },
          },
        },
      ],
      metadata: {
        order_type: 'fine_art_print',
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    const message = error instanceof Error ? error.message : 'Failed to create checkout session';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
