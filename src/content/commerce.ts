/**
 * Checkout and fulfilment settings. Client-safe: no secrets here (keys come from env vars on the server).
 * Change these constants, commit and deploy — nothing else needs editing.
 */

/** Every size of every work is its own edition of this many prints. */
export const EDITION_PER_SIZE = 50;

/** Countries Stripe Checkout will ship to. International orders go through an inquiry until freight rates are set. */
export const SHIP_COUNTRIES = ['US'] as const;

/**
 * Shipping charged at checkout, in US dollars, per print size (for the whole order: the largest size in the cart sets
 * the rate). 0 = insured delivery included in the price. TBD: replace with Nevada Art Printers' crate/freight
 * quotes if Sheldon wants freight charged separately.
 */
export const SHIPPING_USD: Record<string, number> = {
  Gallery: 0,
  Signature: 0,
  Masterwork: 0,
};
export const SHIPPING_LABEL = 'Insured, signature-required delivery (US)';

/** Made-to-order lead time shown at checkout and on the policy pages (2–4 weeks). */
export const LEAD_TIME_BUSINESS_DAYS = { min: 10, max: 20 };
export const LEAD_TIME_TEXT = '2–4 weeks';

/** Stripe Tax (automatic sales tax). Off until Sheldon registers for tax collection with his accountant. */
export const STRIPE_TAX_ENABLED = false;

/** Print package sent to Nevada Art Printers for every order (from past NAP orders; confirm with Artemio). */
export const PRINT_PACKAGE = [
  'Lumachrome HD print',
  'TruLife Antiglare acrylic face, 1/8" (3 mm), polished edges',
  'Acrylic backer (lifetime warranty)',
  'Floater: 3/4" composite on 30×20, 1-1/4" composite on 45×30 and 60×40',
  'French cleat hanging',
  'Signature and edition number (confirm method: gold autopen bottom right, or Sheldon signs)',
  'Certificate of authenticity',
];
