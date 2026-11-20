# Marketing features (added 2026-11-20)

## Analytics
`<Analytics />` and `<SpeedInsights />` (cookie-free) are in `src/app/layout.tsx`. Speed Insights is on for the project.
Web Analytics must be switched on once in Vercel: Project → Analytics → Enable (free on Hobby, with limits), or
`vercel project web-analytics enable sheldonroth --scope sheldonroths-projects` in a terminal.

## Abandoned checkout recovery (src/lib/checkout.ts)
Print checkouts set `allow_promotion_codes`, `after_expiration.recovery` (with promo codes) and
`consent_collection.promotions: 'auto'`. If Stripe refuses the consent/recovery settings, checkout retries without them.
One-time Dashboard steps (live mode):
1. Settings → Checkout and Payment Links: accept the promotional-emails terms (required for `consent_collection.promotions`).
2. Settings → Customer emails (or Checkout settings): turn on "Abandoned cart / recover abandoned carts" emails.

## Trade program (/trade, /api/trade)
Applications are stored in site.inquiries ("Trade application") and emailed to INQUIRY_NOTIFY_TO.
Set up once in Stripe (live): Product catalog → Coupons → New: 20% off, duration Once, name "Trade 20%" (id TRADE20).
To approve a designer: on that coupon, add a promotion code (e.g. TRADE-SMITHDESIGN), optionally limited to their email
as a customer, and reply with it. Deactivate the code to end their access.

## Gift certificates (/gift, /api/gift, src/lib/gifts.ts)
$250 / $500 / $1,000 / $1,650 via Stripe Checkout (card and Link only, no tax, no shipping). On payment the webhook
creates a one-use $X-off coupon + promotion code `GIFT…` and emails it to the buyer (and a copy to Sheldon). If code
creation fails, Sheldon gets a "MANUAL" email with the exact code to create, and the buyer is told it follows within one
business day. Certificates don't expire (Colorado law). Holiday banner shows until HOLIDAY_GIFT_UNTIL in
src/content/gifts.ts (the home page is static, so it disappears on the first deploy after that date).

## Google Merchant Center (/feed.xml)
RSS 2.0 feed, one item per work and size at the live ladder price, grouped by work, linking to `/shop/<slug>?size=<key>`
(which preselects the size). Free US shipping, handling 10–20 business days, category 500044.
