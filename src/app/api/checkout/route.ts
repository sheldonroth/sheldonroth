import { NextResponse } from 'next/server';
import Stripe from 'stripe';

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
    const stripe = getStripe();
    const { items, successUrl, cancelUrl } = await request.json();

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid items' }, { status: 400 });
    }

    // Create line items for Stripe
    const lineItems = items.map((item: {
      name: string;
      price: number;
      quantity: number;
      image?: string;
      description?: string;
    }) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.description,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/cart`,
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
