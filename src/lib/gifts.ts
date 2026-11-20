/**
 * Server-only gift certificate fulfilment. A paid gift Checkout Session (metadata.order_type = gift_certificate) becomes a
 * one-time Stripe promotion code worth the amount, emailed to the buyer. Every step is idempotent on the session id, so
 * Stripe webhook retries never create a second code or a second email. If the code can't be created, Sheldon gets a
 * "fulfil manually" email and the buyer is told the certificate follows within one business day.
 */
import { createHash } from 'crypto';
import type Stripe from 'stripe';
import { GIFT_AMOUNTS } from '@/content/gifts';

const FROM = () => process.env.ORDER_FROM || process.env.INQUIRY_FROM || 'Sheldon Roth Fine Art <inquiries@sheldonroth.com>';
const STUDIO = () => process.env.ORDER_NOTIFY_TO || 'sheldonroth2@gmail.com';
const usd = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

/** Deterministic, unguessable code for a session: GIFT + 10 hex characters of a hash of the session id. */
export function giftCode(sessionId: string) {
  return `GIFT${createHash('sha256').update(`sheldonroth-gift:${sessionId}`).digest('hex').slice(0, 10).toUpperCase()}`;
}

async function send(idempotencyKey: string, to: string, subject: string, text: string, replyTo?: string | null): Promise<string | null> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return 'RESEND_API_KEY not set';
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
      body: JSON.stringify({ from: FROM(), to: [to], ...(replyTo ? { reply_to: replyTo } : {}), subject, text }),
    });
    if (res.ok) return null;
    const detail = await res.json().then((j: { message?: string }) => j?.message ?? '').catch(() => '');
    return `resend ${res.status}${detail ? `: ${String(detail).slice(0, 200)}` : ''}`;
  } catch (e) {
    return `send failed: ${String(e).slice(0, 200)}`;
  }
}

async function ensurePromotionCode(stripe: Stripe, session: Stripe.Checkout.Session, amount: number, code: string) {
  const existing = await stripe.promotionCodes.list({ code, limit: 1 });
  if (existing.data[0]) return existing.data[0];
  const coupon = await stripe.coupons.create(
    {
      amount_off: amount * 100,
      currency: 'usd',
      duration: 'once',
      max_redemptions: 1,
      name: `Gift certificate ${usd(amount)}`,
      metadata: { order_type: 'gift_certificate', checkout_session: session.id },
    },
    { idempotencyKey: `gift-coupon-${session.id}` },
  );
  return stripe.promotionCodes.create(
    {
      promotion: { type: 'coupon', coupon: coupon.id },
      code,
      max_redemptions: 1,
      metadata: { order_type: 'gift_certificate', checkout_session: session.id, buyer: session.customer_details?.email ?? '' },
    },
    { idempotencyKey: `gift-code-${session.id}` },
  );
}

const field = (session: Stripe.Checkout.Session, key: string) =>
  session.custom_fields?.find((f) => f.key === key)?.text?.value?.trim() || null;

export async function fulfilGift(stripe: Stripe, session: Stripe.Checkout.Session) {
  const amount = Number(session.metadata?.gift_amount);
  // With Adaptive Pricing a buyer may pay in their own currency; currency_conversion keeps the USD source amounts.
  const usdTotal = session.currency_conversion ? session.currency_conversion.amount_total : session.amount_total;
  if (!GIFT_AMOUNTS.includes(amount as (typeof GIFT_AMOUNTS)[number]) || usdTotal !== amount * 100) {
    // Never issue a code that doesn't match what was paid.
    const err = await send(`gift-mismatch-${session.id}`, STUDIO(), `[CHECK] Gift certificate amount mismatch — ${session.id}`,
      `A gift certificate session paid ${usdTotal} USD cents with gift_amount=${session.metadata?.gift_amount}. No code was issued. Fulfil manually.`);
    return { ok: false, error: err ?? 'amount mismatch' };
  }
  const buyer = session.customer_details?.email ?? null;
  const buyerName = session.customer_details?.name ?? null;
  const recipient = field(session, 'recipient');
  const message = field(session, 'message');
  const test = session.livemode ? '' : '[TEST] ';
  const code = giftCode(session.id);

  let codeError: string | null = null;
  try {
    await ensurePromotionCode(stripe, session, amount, code);
  } catch (e) {
    codeError = String((e as Error).message ?? e).slice(0, 300);
    console.error('gift code creation failed', session.id, codeError);
  }

  const summary = [
    `Amount: ${usd(amount)}`,
    `Buyer: ${buyerName ?? '—'} <${buyer ?? '—'}>`,
    `For: ${recipient ?? '—'}`,
    message ? `Message: ${message}` : null,
    `Stripe session: ${session.id}`,
  ].filter(Boolean) as string[];

  if (codeError) {
    await send(`gift-manual-${session.id}`, STUDIO(), `${test}MANUAL: gift certificate ${usd(amount)} needs a code`, [
      'A gift certificate was paid but the promotion code could not be created automatically.',
      `Stripe said: ${codeError}`,
      '',
      ...summary,
      '',
      `To fulfil: in Stripe → Product catalog → Coupons, create a ${usd(amount)} off, once, 1 redemption coupon with`,
      `promotion code ${code}, then email it to the buyer.`,
    ].join('\n'), buyer);
    if (buyer) {
      await send(`gift-buyer-${session.id}`, buyer, 'Your Sheldon Roth gift certificate', [
        buyerName ? `Hi ${buyerName.split(/\s+/)[0]},` : 'Hello,',
        '',
        `Thank you for your ${usd(amount)} gift certificate. Your payment went through, and I'm preparing the certificate by hand.`,
        "You'll have it by email within one business day.",
        '',
        'Thanks,',
        'Sheldon',
      ].join('\n'));
    }
    return { ok: false, error: codeError };
  }

  if (buyer) {
    await send(`gift-buyer-${session.id}`, buyer, `Your ${usd(amount)} Sheldon Roth gift certificate`, [
      buyerName ? `Hi ${buyerName.split(/\s+/)[0]},` : 'Hello,',
      '',
      `Thank you. Here is your gift certificate${recipient ? ` for ${recipient}` : ''}.`,
      '',
      `    Gift certificate: ${usd(amount)}`,
      `    Code: ${code}`,
      message ? `    Message: ${message}` : null,
      '',
      'To redeem, choose any limited-edition print at https://sheldonroth.com/shop and enter the code in the',
      '"Add promotion code" field at checkout. It covers one order, and it does not expire.',
      '',
      'Forward this email to the person you are giving it to, or print it and tuck it in a card.',
      '',
      'Thanks,',
      'Sheldon',
    ].filter((l) => l !== null).join('\n'));
  }
  await send(`gift-studio-${session.id}`, STUDIO(), `${test}Gift certificate sold: ${usd(amount)} (${code})`, [
    'A gift certificate was paid and its code was created and emailed to the buyer.',
    '',
    `Code: ${code} (one use, ${usd(amount)} off)`,
    ...summary,
  ].join('\n'), buyer);
  return { ok: true, code };
}
