import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getImage, sizeFor, works } from '@/content/catalog';
import { EDITION_PER_SIZE, LEAD_TIME_BUSINESS_DAYS, SHIP_COUNTRIES, SHIPPING_LABEL, SHIPPING_USD, STRIPE_TAX_ENABLED } from '@/content/commerce';
import { remainingFor } from '@/lib/orders';
import { checkoutEnabled, getStripe } from '@/lib/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SIZE_ORDER = ['Gallery', 'Signature', 'Masterwork'];

/** Lets the client know whether to send buyers to Stripe or to the inquiry form. */
export function GET() {
  return NextResponse.json({ enabled: checkoutEnabled() });
}

export async function POST(request: Request) {
  if (!checkoutEnabled()) {
    return NextResponse.json({ error: 'Online checkout is not available yet.', code: 'checkout_disabled' }, { status: 503 });
  }
  let body: { items?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
  const raw = body.items;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 10) {
    return NextResponse.json({ error: 'Your cart is empty or too large.' }, { status: 400 });
  }

  // Price every line from the catalog: the client only names the work and size, and a size is only accepted when the
  // work's master supports it (see sizesFor). Duplicate lines are merged.
  const lines = new Map<string, { slug: string; size: string; quantity: number }>();
  for (const item of raw as { slug?: unknown; size?: unknown; quantity?: unknown }[]) {
    const work = typeof item?.slug === 'string' ? works.find((w) => w.slug === item.slug) : undefined;
    const size = work && typeof item.size === 'string' ? sizeFor(work.slug, item.size) : undefined;
    const quantity = Number(item?.quantity);
    if (!work || !size || !Number.isInteger(quantity) || quantity < 1 || quantity > 5) {
      return NextResponse.json({ error: 'One or more items are not available in the selected size.' }, { status: 400 });
    }
    const key = `${work.slug}|${size.name}`;
    const prev = lines.get(key);
    lines.set(key, { slug: work.slug, size: size.name, quantity: (prev?.quantity ?? 0) + quantity });
  }

  // Edition check: never start a checkout for prints that are no longer available.
  let remaining: Map<string, number>;
  try {
    remaining = await remainingFor([...lines.values()]);
  } catch (e) {
    console.error('edition lookup failed', e);
    return NextResponse.json({ error: 'Checkout is briefly unavailable. Please try again in a moment.' }, { status: 503 });
  }
  for (const [key, l] of lines) {
    const left = remaining.get(key) ?? EDITION_PER_SIZE;
    if (left < l.quantity) {
      const title = works.find((w) => w.slug === l.slug)!.title;
      return NextResponse.json(
        { error: left <= 0 ? `${title} (${l.size}) is sold out.` : `Only ${left} of ${title} (${l.size}) remain.` },
        { status: 409 },
      );
    }
  }

  const origin = process.env.NEXT_PUBLIC_BASE_URL || new URL(request.url).origin;
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [...lines.values()].map((l) => {
    const work = works.find((w) => w.slug === l.slug)!;
    const size = sizeFor(work.slug, l.size)!;
    return {
      quantity: l.quantity,
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(size.price * 100),
        tax_behavior: 'exclusive',
        product_data: {
          name: `${work.title} — ${size.name}`,
          description: `${size.dimensions} · Face-mounted acrylic · Limited edition of ${EDITION_PER_SIZE} · Signed and numbered`,
          images: [new URL(getImage(work.slug).src, origin).toString()],
          metadata: { slug: work.slug, size: size.name, dimensions: size.dimensions },
        },
      },
    };
  });

  // Shipping: the largest size in the order sets the rate (see SHIPPING_USD in commerce.ts).
  const largest = [...lines.values()].map((l) => l.size).sort((a, b) => SIZE_ORDER.indexOf(b) - SIZE_ORDER.indexOf(a))[0];
  const shippingCents = Math.round((SHIPPING_USD[largest] ?? 0) * 100);

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      shipping_address_collection: { allowed_countries: [...SHIP_COUNTRIES] },
      phone_number_collection: { enabled: true },
      billing_address_collection: 'required',
      automatic_tax: { enabled: STRIPE_TAX_ENABLED },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: shippingCents, currency: 'usd' },
            display_name: SHIPPING_LABEL,
            tax_behavior: 'exclusive',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: LEAD_TIME_BUSINESS_DAYS.min },
              maximum: { unit: 'business_day', value: LEAD_TIME_BUSINESS_DAYS.max + 5 },
            },
          },
        },
      ],
      custom_text: {
        submit: { message: 'Each print is made to order and ships in 2–4 weeks. Sales are final except for damage in transit.' },
      },
      metadata: { order_type: 'fine_art_print', site: 'sheldonroth.com' },
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Could not start checkout. Please try again.' }, { status: 502 });
  }
}
