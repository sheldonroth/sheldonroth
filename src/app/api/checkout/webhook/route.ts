import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getWork } from '@/content/catalog';
import { markOrderNotified, notifyOrder, recordPaidOrder, type OrderItem, type PaidOrder } from '@/lib/orders';
import { getStripe } from '@/lib/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Stripe webhook (checkout.session.completed / async_payment_succeeded). Signature-verified; the only place an order
 * is created. Records the order once, assigns edition numbers, and emails Sheldon the summary + a NAP print order.
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !process.env.STRIPE_SECRET_KEY) return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  const sig = req.headers.get('stripe-signature');
  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 });

  const stripe = getStripe();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), sig, secret);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed' && event.type !== 'checkout.session.async_payment_succeeded') {
    return NextResponse.json({ received: true });
  }
  const session = event.data.object as Stripe.Checkout.Session;
  if (session.payment_status !== 'paid') return NextResponse.json({ received: true, pending: true });

  try {
    const order = await toPaidOrder(stripe, session);
    const saved = await recordPaidOrder(order);
    if (!saved) return NextResponse.json({ received: true, duplicate: true });
    const err = await notifyOrder(saved.id, order, saved.items, saved.oversold);
    await markOrderNotified(saved.id, err).catch(() => {});
    if (err) console.warn(`order ${saved.id} stored; notification not sent: ${err}`);
    return NextResponse.json({ received: true, order: saved.id });
  } catch (e) {
    console.error('webhook processing failed', e);
    // 500 makes Stripe retry; recordPaidOrder is idempotent on the session id.
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}

async function toPaidOrder(stripe: Stripe, session: Stripe.Checkout.Session): Promise<PaidOrder> {
  const li = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100, expand: ['data.price.product'] });
  const items: OrderItem[] = li.data.map((l) => {
    const product = l.price?.product as Stripe.Product | undefined;
    const slug = product?.metadata?.slug ?? '';
    return {
      slug,
      title: getWork(slug)?.title ?? product?.name ?? l.description ?? 'Unknown work',
      size: product?.metadata?.size ?? '',
      dimensions: product?.metadata?.dimensions ?? '',
      quantity: l.quantity ?? 1,
      unitAmount: l.price?.unit_amount ?? 0,
    };
  });
  // Newer API versions put shipping under collected_information; older ones on the session.
  const s = session as Stripe.Checkout.Session & { shipping_details?: { name?: string | null; address?: Stripe.Address | null } | null };
  const shipping = session.collected_information?.shipping_details ?? s.shipping_details ?? null;
  const a = shipping?.address;
  return {
    sessionId: session.id,
    paymentIntent: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id ?? null,
    livemode: session.livemode,
    email: session.customer_details?.email ?? null,
    name: session.customer_details?.name ?? null,
    phone: session.customer_details?.phone ?? null,
    shipTo: a
      ? { name: shipping?.name ?? null, line1: a.line1 ?? null, line2: a.line2 ?? null, city: a.city ?? null, state: a.state ?? null, postal_code: a.postal_code ?? null, country: a.country ?? null }
      : null,
    items,
    amountSubtotal: session.amount_subtotal ?? null,
    amountShipping: session.total_details?.amount_shipping ?? null,
    amountTax: session.total_details?.amount_tax ?? null,
    amountTotal: session.amount_total ?? null,
    currency: session.currency ?? 'usd',
  };
}
