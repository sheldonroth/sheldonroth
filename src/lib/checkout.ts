import type Stripe from 'stripe';
import { getImage, sizeFor, works } from '@/content/catalog';
import {
  EDITION_PER_SIZE,
  LEAD_TIME_BUSINESS_DAYS,
  PRODUCT_TAX_CODE,
  SHIP_COUNTRIES,
  SHIPPING_LABEL,
  SHIPPING_USD,
  STRIPE_TAX_ENABLED,
} from '@/content/commerce';
import { isTaxSetupError } from '@/lib/stripe';

const SIZE_ORDER = ['Gallery', 'Signature', 'Masterwork'];

export type CheckoutLine = { slug: string; size: string; quantity: number };

/** Builds the Checkout Session from already-validated lines. Every price comes from the catalog, never the client. */
export function buildCheckoutParams(lines: CheckoutLine[], origin: string): Stripe.Checkout.SessionCreateParams {
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = lines.map((l) => {
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
          tax_code: PRODUCT_TAX_CODE,
          metadata: { slug: work.slug, size: size.name, dimensions: size.dimensions },
        },
      },
    };
  });

  // Shipping: the largest size in the order sets the rate (see SHIPPING_USD in commerce.ts; currently free in the US).
  const largest = lines.map((l) => l.size).sort((a, b) => SIZE_ORDER.indexOf(b) - SIZE_ORDER.indexOf(a))[0];
  const shippingCents = Math.round((SHIPPING_USD[largest] ?? 0) * 100);

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
    custom_text: {
      submit: { message: 'Each print is made to order and ships in 2–4 weeks. Sales are final except for damage in transit.' },
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
    return await stripe.checkout.sessions.create(params);
  } catch (error) {
    if (!params.automatic_tax?.enabled || !isTaxSetupError(error)) throw error;
    console.error('Stripe Tax unavailable, creating checkout without tax:', (error as Error).message);
    return stripe.checkout.sessions.create({
      ...params,
      automatic_tax: { enabled: false },
      metadata: { ...params.metadata, tax_status: 'not_calculated' },
    });
  }
}
