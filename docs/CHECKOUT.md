# Checkout go-live (Stripe)

Checkout goes straight to Stripe Checkout as soon as `STRIPE_SECRET_KEY` is set in Vercel Production. While it is missing,
Buy buttons fall back to the inquiry form.

## Vercel env (Production)
- `STRIPE_SECRET_KEY` (live `sk_live_…`)
- `STRIPE_WEBHOOK_SECRET` (`whsec_…` from the endpoint below)
- optional: `NEXT_PUBLIC_BASE_URL`, `ORDER_NOTIFY_TO` (default sheldonroth2@gmail.com)

## Stripe Dashboard (live mode)
1. Webhook endpoint `https://sheldonroth.com/api/checkout/webhook`, events `checkout.session.completed` and
   `checkout.session.async_payment_succeeded`.
2. **Stripe Tax — required for sales tax.** Tax → activate Stripe Tax, set the origin/head-office address, and add a
   **Colorado** registration under Tax → Registrations. Stripe only collects tax where a registration exists, so without
   it every order shows $0 tax. If Stripe Tax isn't activated at all, checkout still works (it retries without tax) but the
   order email is flagged `TAX NOT CALCULATED`.

## Settings in code (`src/content/commerce.ts`)
- Prices: tiered + stepped ladder in `src/content/pricing.ts` (Premier ed. 20 from $4,800, Signature ed. 40 from $3,400, Collection ed. 75 from $1,650; one edition shared across sizes; final 10% and Artist Proofs by inquiry). Checkout and `/api/editions/[slug]` price from the number sold (`site.edition_sales`, `_total` row per work).
- Shipping: free within the US (`SHIPPING_USD` all 0); international by inquiry (`SHIP_COUNTRIES = ['US']`).
- Tax: `STRIPE_TAX_ENABLED = true`, tax-exclusive prices, calculated from the shipping address.
  Product tax code `txcd_99999999` (General - Tangible Goods; Stripe has no specific code for physical art prints).
- Editions: 50 per size, counted in Neon `site.edition_sales` on the paid webhook.
