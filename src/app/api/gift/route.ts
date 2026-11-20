import { NextResponse } from 'next/server';
import { GIFT_AMOUNTS } from '@/content/gifts';
import { checkoutEnabled, getStripe } from '@/lib/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Starts a Stripe Checkout for a digital gift certificate. The amount must be one of GIFT_AMOUNTS. */
export async function POST(req: Request) {
  if (!checkoutEnabled()) return NextResponse.json({ error: 'Checkout is not available. Please inquire.' }, { status: 503 });
  let body: { amount?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
  const amount = Number(body.amount);
  if (!GIFT_AMOUNTS.includes(amount as (typeof GIFT_AMOUNTS)[number])) {
    return NextResponse.json({ error: 'Please choose a gift certificate amount.' }, { status: 400 });
  }
  const origin = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;
  try {
    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      // Card and Link only: pay-over-time providers (Affirm, Klarna) don't allow gift certificate purchases.
      payment_method_types: ['card', 'link'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: amount * 100,
            product_data: {
              name: `Sheldon Roth Gift Certificate — $${amount.toLocaleString('en-US')}`,
              description: 'Digital gift certificate, delivered by email. Redeemable toward any limited-edition print. Does not expire.',
              metadata: { order_type: 'gift_certificate', gift_amount: String(amount) },
            },
          },
        },
      ],
      custom_fields: [
        { key: 'recipient', label: { type: 'custom', custom: 'Who is it for? (optional)' }, type: 'text', optional: true, text: { maximum_length: 80 } },
        { key: 'message', label: { type: 'custom', custom: 'Gift message (optional)' }, type: 'text', optional: true, text: { maximum_length: 240 } },
      ],
      submit_type: 'pay',
      success_url: `${origin}/gift/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/gift`,
      custom_text: { submit: { message: 'Your gift certificate code arrives by email within minutes of payment.' } },
      metadata: { order_type: 'gift_certificate', gift_amount: String(amount), site: 'sheldonroth.com' },
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error('gift checkout failed', e);
    return NextResponse.json({ error: 'Checkout could not start. Please try again in a moment.' }, { status: 500 });
  }
}
