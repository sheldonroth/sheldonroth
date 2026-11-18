import Stripe from 'stripe';

/** Checkout is live only when the secret key is configured. Without it the Buy buttons fall back to an inquiry. */
export const checkoutEnabled = () => !!process.env.STRIPE_SECRET_KEY;

let client: Stripe | null = null;
export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is not configured');
  client ??= new Stripe(key);
  return client;
}

/** True when Stripe refused automatic_tax because Stripe Tax isn't set up on the account. */
export function isTaxSetupError(error: unknown): boolean {
  const e = error as { type?: string; param?: string; message?: string } | null;
  if (!e || (e.type && e.type !== 'StripeInvalidRequestError')) return false;
  return (e.param ?? '').startsWith('automatic_tax') || /stripe tax|automatic[_ ]tax|tax settings|head office|origin address/i.test(e.message ?? '');
}
