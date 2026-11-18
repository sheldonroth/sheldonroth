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
