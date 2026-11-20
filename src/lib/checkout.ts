import type Stripe from 'stripe';
import { getImage, sizeFor, works } from '@/content/catalog';
import { SIZE_KEYS, priceAtStep, stepForNumber } from '@/content/pricing';
import {
  LEAD_TIME_BUSINESS_DAYS,
  PRODUCT_TAX_CODE,
  SHIP_COUNTRIES,
  SHIPPING_LABEL,
  SHIPPING_USD,
  STRIPE_TAX_ENABLED,
} from '@/content/commerce';
import { isTaxSetupError } from '@/lib/stripe';

const SIZE_ORDER: string[] = [...SIZE_KEYS];

export type CheckoutLine = { slug: string; size: string; quantity: number };
/** A line priced from the ladder: every unit in it costs `unitPrice` (USD). */
export type PricedLine = CheckoutLine & { unitPrice: number };

export type PricingResult = { ok: true; lines: PricedLine[] } | { ok: false; error: string; code: 'sold_out' | 'inquiry_only' };

/**
 * Prices validated lines from the stepped ladder. `sold` is prints sold per work (all sizes). Units of the same work
 * take consecutive edition numbers across its lines, so an order that crosses a step is split at the step. Units that
 * fall in the final, inquiry-only step (or past the edition) are refused.
 */
export function priceLines(lines: CheckoutLine[], sold: Map<string, number>): PricingResult {
  const next = new Map<string, number>();
  const out: PricedLine[] = [];
  for (const l of lines) {
    const work = works.find((w) => w.slug === l.slug)!;
    const size = sizeFor(work.slug, l.size)!;
    let n = next.get(work.slug) ?? (sold.get(work.slug) ?? 0) + 1;
    for (let i = 0; i < l.quantity; i++, n++) {
      const step = stepForNumber(work.editionSize, n);
      if (!step) return { ok: false, code: 'sold_out', error: `The edition of ${work.title} is sold out.` };
      if (step.inquiryOnly) {
        return {
          ok: false,
          code: 'inquiry_only',
          error: `The final editions of ${work.title} are offered by inquiry. Please contact the studio.`,
        };
      }
      const unitPrice = priceAtStep(size.price, step);
      const last = out[out.length - 1];
      if (last && last.slug === work.slug && last.size === size.name && last.unitPrice === unitPrice) last.quantity++;
      else out.push({ slug: work.slug, size: size.name, quantity: 1, unitPrice });
    }
    next.set(work.slug, n);
  }
  return { ok: true, lines: out };
}

/** Builds the Checkout Session from lines priced by `priceLines`. Prices never come from the client. */
export function buildCheckoutParams(lines: PricedLine[], origin: string): Stripe.Checkout.SessionCreateParams {
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = lines.map((l) => {
    const work = works.find((w) => w.slug === l.slug)!;
    const size = sizeFor(work.slug, l.size)!;
    return {
      quantity: l.quantity,
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(l.unitPrice * 100),
        tax_behavior: 'exclusive',
        product_data: {
          name: `${work.title} — ${size.dimensions}`,
          description: `${size.dimensions} · Face-mounted acrylic · Limited edition of ${work.editionSize} across all sizes · Signed and numbered`,
          images: [new URL(getImage(work.slug).src, origin).toString()],
          tax_code: PRODUCT_TAX_CODE,
          metadata: { slug: work.slug, size: size.name, dimensions: size.dimensions },
        },
      },
    };
  });

  // Shipping: the largest size in the order sets the rate (see SHIPPING_USD in commerce.ts; currently free in the US).
  const largest = lines.map((l) => l.size).sort((a, b) => SIZE_ORDER.indexOf(b) - SIZE_ORDER.indexOf(a))[0];
  const shippingCents = Math.round((SHIPPING_USD[largest] ?? 0) * 100);

  // No payment_method_types: Stripe's dynamic payment methods show whatever is enabled in the Dashboard (cards, wallets,
  // and Affirm / Klarna once switched on there).
  return {
    mode: 'payment',
    line_items: lineItems,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout/cancel`,
    shipping_address_collection: { allowed_countries: [...SHIP_COUNTRIES] },
    phone_number_collection: { enabled: true },
    billing_address_collection: 'required',
    // Stripe Tax uses the shipping address when one is collected. Needs the Colorado registration (see commerce.ts).
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
    // Trade (20%) and gift certificate codes are entered here; Sheldon controls every code in the Stripe Dashboard.
    allow_promotion_codes: true,
    // Abandoned checkout recovery: an expired session gets a recovery URL (sent by Stripe's abandoned cart emails to
    // buyers who opted in to promotional email below). Prices are re-quoted from the ladder only on a new checkout.
    after_expiration: { recovery: { enabled: true, allow_promotion_codes: true } },
    consent_collection: { promotions: 'auto' },
    custom_text: {
      submit: { message: 'Each print is made to order and ships in 2–4 weeks. Returns are accepted within 14 days of delivery (see Shipping & Returns).' },
    },
    metadata: { order_type: 'fine_art_print', site: 'sheldonroth.com' },
  };
}

/**
 * Creates the session. If Stripe refuses automatic tax because Stripe Tax isn't set up on the account, retries once
 * without tax (so sales aren't blocked) and tags the session so the order email flags "TAX NOT CALCULATED".
 */
export async function createCheckoutSession(stripe: Pick<Stripe, 'checkout'>, params: Stripe.Checkout.SessionCreateParams) {
  try {
    return await createWithOptionalFeatures(stripe, params);
  } catch (error) {
    if (!params.automatic_tax?.enabled || !isTaxSetupError(error)) throw error;
    console.error('Stripe Tax unavailable, creating checkout without tax:', (error as Error).message);
    return createWithOptionalFeatures(stripe, {
      ...params,
      automatic_tax: { enabled: false },
      metadata: { ...params.metadata, tax_status: 'not_calculated' },
    });
  }
}

/** True when Stripe refused one of the optional recovery / marketing-consent settings (never block a sale for them). */
export function isOptionalFeatureError(error: unknown): boolean {
  const e = error as { type?: string; param?: string; message?: string } | null;
  if (!e || (e.type && e.type !== 'StripeInvalidRequestError')) return false;
  // e.g. "To set `consent_collection.promotions`, please visit dashboard.stripe.com/settings/checkout to agree to the Terms".
  return /^(consent_collection|after_expiration)/.test(e.param ?? '') || /consent_collection|after_expiration/.test(e.message ?? '');
}

async function createWithOptionalFeatures(stripe: Pick<Stripe, 'checkout'>, params: Stripe.Checkout.SessionCreateParams) {
  try {
    return await stripe.checkout.sessions.create(params);
  } catch (error) {
    if (!isOptionalFeatureError(error)) throw error;
    console.error('Checkout recovery/consent refused, creating checkout without them:', (error as Error).message);
    const rest = { ...params };
    delete rest.consent_collection;
    delete rest.after_expiration;
    return stripe.checkout.sessions.create(rest);
  }
}
