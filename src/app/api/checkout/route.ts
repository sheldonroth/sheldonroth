import { NextResponse } from 'next/server';
import { sizeFor, works } from '@/content/catalog';
import { buildCheckoutParams, createCheckoutSession, priceLines } from '@/lib/checkout';
import { soldTotals } from '@/lib/orders';
import { checkoutEnabled, getStripe } from '@/lib/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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

  // Price every unit from the shared edition and the ladder; refuse sold-out or inquiry-only editions.
  let sold: Map<string, number>;
  try {
    sold = await soldTotals([...new Set([...lines.values()].map((l) => l.slug))]);
  } catch (e) {
    console.error('edition lookup failed', e);
    return NextResponse.json({ error: 'Checkout is briefly unavailable. Please try again in a moment.' }, { status: 503 });
  }
  const priced = priceLines([...lines.values()], sold);
  if (!priced.ok) return NextResponse.json({ error: priced.error, code: priced.code }, { status: 409 });

  const origin = process.env.NEXT_PUBLIC_BASE_URL || new URL(request.url).origin;
  try {
    const session = await createCheckoutSession(getStripe(), buildCheckoutParams(priced.lines, origin));
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Could not start checkout. Please try again.' }, { status: 502 });
  }
}
