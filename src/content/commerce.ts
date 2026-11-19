/**
 * Checkout and fulfilment settings. Client-safe: no secrets here (keys come from env vars on the server).
 * Change these constants, commit and deploy — nothing else needs editing.
 */

/*
 * Editions and prices live in pricing.ts: one edition per work shared across all sizes (Premier 20, Signature 40,
 * Collection 75), with a stepped price ladder. The final 10% of each edition and all Artist Proofs are by inquiry.
 */

/**
 * Set to true once Affirm and/or Klarna are switched on in the Stripe Dashboard (Settings → Payment methods). Checkout
 * already uses dynamic payment methods, so they appear automatically; this flag only shows the "pay over time" note
 * on product pages, so the site never promises financing that checkout doesn't offer.
 */
export const FINANCING_AT_CHECKOUT = false;

/** Countries Stripe Checkout will ship to. International orders go through an inquiry until freight rates are set. */
export const SHIP_COUNTRIES = ['US'] as const;

/**
 * Shipping charged at checkout, in US dollars, per print size (for the whole order: the largest size in the cart sets
 * the rate). 0 = free shipping (approved by Sheldon 2026-11-18: free shipping within the US; international by inquiry).
 */
export const SHIPPING_USD: Record<string, number> = {
  '24x12': 0,
  '24x16': 0,
  '30x15': 0,
  '30x20': 0,
  '36x18': 0,
  '36x24': 0,
  '45x30': 0,
  '48x24': 0,
  '60x30': 0,
  '60x40': 0,
};
export const SHIPPING_LABEL = 'Free insured shipping (US, signature required)';

/** Made-to-order lead time shown at checkout and on the policy pages (2–4 weeks). */
export const LEAD_TIME_BUSINESS_DAYS = { min: 10, max: 20 };
export const LEAD_TIME_TEXT = '2–4 weeks';

/**
 * Stripe Tax (automatic sales tax), calculated from the buyer's shipping address.
 *
 * REQUIRES, in the Stripe Dashboard (live mode) → Tax: Stripe Tax activated, the business origin address set, and a
 * Colorado registration added under Tax → Registrations. Stripe only charges tax where a registration exists, so without
 * the Colorado registration every order is charged $0 tax. If Stripe Tax is not activated at all, Stripe rejects
 * automatic_tax; the checkout route then retries once without tax so sales are not blocked, logs the error, and the
 * order email to Sheldon is flagged "TAX NOT CALCULATED".
 */
export const STRIPE_TAX_ENABLED = true;

/**
 * Stripe product tax code for every print. Stripe's list (docs.stripe.com/tax/tax-codes) has no code for physical
 * artwork or prints, so this is txcd_99999999 "General - Tangible Goods". Shipping keeps Stripe's default shipping code.
 */
export const PRODUCT_TAX_CODE = 'txcd_99999999';

/** Print package sent to Nevada Art Printers for every order (from past NAP orders; confirm with Artemio). */
export const PRINT_PACKAGE = [
  'Lumachrome HD print',
  'TruLife Antiglare acrylic face, 1/8" (3 mm), polished edges',
  'Acrylic backer (lifetime warranty)',
  'Floater: 3/4" composite on 24×12, 24×16, 30×15, 30×20, 36×18 and 36×24; 1-1/4" composite on 45×30, 48×24, 60×30 and 60×40 (confirm 24×12, 24×16, 36×18 and 36×24 with NAP)',
  'French cleat hanging',
  'Signature and edition number (confirm method: gold autopen bottom right, or Sheldon signs)',
  'Certificate of authenticity',
];
