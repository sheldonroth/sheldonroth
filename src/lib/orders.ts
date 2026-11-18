/**
 * Server-only order storage and notifications (Neon site.orders / site.edition_sales, Resend).
 * Uses the same least-privilege role as inquiries (INQUIRIES_DATABASE_URL). Never import from client components.
 */
import { neon } from '@neondatabase/serverless';
import { EDITION_PER_SIZE, PRINT_PACKAGE } from '@/content/commerce';
import { getWork } from '@/content/catalog';
import { masterLongEdge } from '@/content/master-sizes';

function db() {
  const url = process.env.INQUIRIES_DATABASE_URL;
  if (!url) throw new Error('INQUIRIES_DATABASE_URL is not set');
  return neon(url);
}

/** Prints sold per size for one work. Throws when the database is unreachable (callers then hide the counter). */
export async function soldBySize(slug: string): Promise<Record<string, number>> {
  const sql = db();
  const rows = (await sql`select size_name, sold from site.edition_sales where work_slug = ${slug}`) as { size_name: string; sold: number }[];
  return Object.fromEntries(rows.map((r) => [r.size_name, Number(r.sold)]));
}

/** Remaining prints for each requested (slug, size). */
export async function remainingFor(keys: { slug: string; size: string }[]): Promise<Map<string, number>> {
  const sql = db();
  const slugs = [...new Set(keys.map((k) => k.slug))];
  const rows = (await sql`select work_slug, size_name, edition_size, sold from site.edition_sales where work_slug = any(${slugs})`) as {
    work_slug: string; size_name: string; edition_size: number; sold: number;
  }[];
  const out = new Map<string, number>();
  for (const k of keys) {
    const r = rows.find((x) => x.work_slug === k.slug && x.size_name === k.size);
    out.set(`${k.slug}|${k.size}`, r ? Number(r.edition_size) - Number(r.sold) : EDITION_PER_SIZE);
  }
  return out;
}

export interface OrderItem {
  slug: string;
  title: string;
  size: string;
  dimensions: string;
  quantity: number;
  unitAmount: number; // cents
  editionNumbers?: number[];
}

export interface ShipTo {
  name: string | null;
  line1: string | null;
  line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
}

export interface PaidOrder {
  sessionId: string;
  paymentIntent: string | null;
  livemode: boolean;
  email: string | null;
  name: string | null;
  phone: string | null;
  shipTo: ShipTo | null;
  items: OrderItem[];
  amountSubtotal: number | null;
  amountShipping: number | null;
  amountTax: number | null;
  amountTotal: number | null;
  currency: string | null;
}

/**
 * Records a paid order once (Stripe may deliver the webhook more than once) and assigns edition numbers.
 * Returns null when this session was already recorded.
 */
export async function recordPaidOrder(o: PaidOrder): Promise<{ id: number; items: OrderItem[]; oversold: string[] } | null> {
  const sql = db();
  const inserted = (await sql`
    insert into site.orders (stripe_session_id, payment_intent, status, livemode, email, name, phone, ship_to, items,
      amount_subtotal, amount_shipping, amount_tax, amount_total, currency)
    values (${o.sessionId}, ${o.paymentIntent}, 'paid', ${o.livemode}, ${o.email}, ${o.name}, ${o.phone},
      ${o.shipTo ? JSON.stringify(o.shipTo) : null}::jsonb, ${JSON.stringify(o.items)}::jsonb,
      ${o.amountSubtotal}, ${o.amountShipping}, ${o.amountTax}, ${o.amountTotal}, ${o.currency})
    on conflict (stripe_session_id) do nothing
    returning id`) as { id: number | string }[];
  if (!inserted.length) return null;
  const id = Number(inserted[0].id);

  const items: OrderItem[] = [];
  const oversold: string[] = [];
  for (const it of o.items) {
    const rows = (await sql`
      insert into site.edition_sales (work_slug, size_name, edition_size, sold)
      values (${it.slug}, ${it.size}, ${EDITION_PER_SIZE}, ${it.quantity})
      on conflict (work_slug, size_name) do update set sold = site.edition_sales.sold + excluded.sold, updated_at = now()
      returning sold, edition_size`) as { sold: number; edition_size: number }[];
    const sold = Number(rows[0].sold);
    const size = Number(rows[0].edition_size);
    const first = sold - it.quantity + 1;
    const editionNumbers = Array.from({ length: it.quantity }, (_, i) => first + i);
    if (sold > size) oversold.push(`${it.title} (${it.size}): ${sold} sold of ${size}`);
    items.push({ ...it, editionNumbers });
  }
  await sql`update site.orders set items = ${JSON.stringify(items)}::jsonb where id = ${id}`;
  return { id, items, oversold };
}

export async function markOrderNotified(id: number, error: string | null) {
  const sql = db();
  if (error) await sql`update site.orders set notify_error = ${error.slice(0, 500)} where id = ${id}`;
  else await sql`update site.orders set notified_at = now(), notify_error = null where id = ${id}`;
}

const money = (cents: number | null, currency: string | null) =>
  cents === null ? '—' : `${(cents / 100).toLocaleString('en-US', { style: 'currency', currency: (currency || 'usd').toUpperCase() })}`;

function address(s: ShipTo | null) {
  if (!s) return ['(no shipping address collected)'];
  return [s.name, s.line1, s.line2, [s.city, s.state, s.postal_code].filter(Boolean).join(', '), s.country].filter(Boolean) as string[];
}

/** Plain-text email body: the order summary, then one print order per line item, ready to forward to NAP. */
export function orderEmailText(id: number, o: PaidOrder, items: OrderItem[], oversold: string[]) {
  const ship = address(o.shipTo);
  const out: string[] = [
    `New paid order #${id} on sheldonroth.com${o.livemode ? '' : ' (TEST MODE — no real money)'}`,
    '',
    ...(oversold.length ? ['!! EDITION OVERSOLD — check before printing:', ...oversold.map((x) => `   ${x}`), ''] : []),
    'ORDER SUMMARY',
    `Buyer: ${o.name ?? '—'} <${o.email ?? '—'}>${o.phone ? `, ${o.phone}` : ''}`,
    ...items.map(
      (it) =>
        `- ${it.title} — ${it.size} ${it.dimensions} × ${it.quantity} @ ${money(it.unitAmount, o.currency)}` +
        `  (edition no. ${it.editionNumbers?.join(', ') ?? '?'} of ${EDITION_PER_SIZE})`,
    ),
    `Subtotal: ${money(o.amountSubtotal, o.currency)}`,
    `Shipping: ${money(o.amountShipping, o.currency)}`,
    `Tax: ${money(o.amountTax, o.currency)}`,
    `Total charged: ${money(o.amountTotal, o.currency)}`,
    `Stripe: session ${o.sessionId}${o.paymentIntent ? `, payment ${o.paymentIntent}` : ''}`,
    '',
    'Ship to:',
    ...ship.map((l) => `   ${l}`),
    '',
    '------------------------------------------------------------',
    'PRINT ORDER — ready to forward to Nevada Art Printers (orders@nevadaartprinters.com).',
    'Not sent automatically. Check it, then forward or paste it into their order form.',
    '------------------------------------------------------------',
  ];
  items.forEach((it, n) => {
    const work = getWork(it.slug);
    const master = masterLongEdge[it.slug];
    out.push(
      '',
      `Item ${n + 1}: "${it.title}"`,
      `  File: ${it.slug} print master${master ? ` (${master} px long edge)` : ''} — send the approved master if NAP doesn't already have it`,
      `  Size: ${it.dimensions} (${it.size})`,
      `  Quantity: ${it.quantity}`,
      `  Edition: ${it.editionNumbers?.map((e) => `${e}/${EDITION_PER_SIZE}`).join(', ') ?? '?'} — please write the edition number with the signature`,
      '  Package:',
      ...PRINT_PACKAGE.map((p) => `    - ${p}`),
      work ? `  Reference image: https://sheldonroth.com/works/${it.slug}.jpg` : '',
    );
  });
  out.push(
    '',
    'Drop-ship directly to the collector, blind packaging (no lab invoice or branding), insured, signature required:',
    ...ship.map((l) => `   ${l}`),
    o.phone ? `   Phone: ${o.phone}` : '',
    `Order reference: SR-${id}`,
    '',
    'Thanks,',
    'Sheldon',
  );
  return out.filter((l, i, a) => !(l === '' && a[i - 1] === '')).join('\n');
}

/** Emails Sheldon (only). Returns null on success or a short reason. */
export async function notifyOrder(id: number, o: PaidOrder, items: OrderItem[], oversold: string[]): Promise<string | null> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return 'RESEND_API_KEY not set';
  const to = process.env.ORDER_NOTIFY_TO || 'sheldonroth2@gmail.com';
  const from = process.env.ORDER_FROM || process.env.INQUIRY_FROM || 'Sheldon Roth Fine Art <inquiries@sheldonroth.com>';
  const titles = items.map((i) => `${i.title} (${i.size})`).join(', ');
  const subject = `${o.livemode ? '' : '[TEST] '}New order #${id}: ${titles} — ${money(o.amountTotal, o.currency)}`;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', 'Idempotency-Key': `order-${o.sessionId}` },
      body: JSON.stringify({ from, to: [to], reply_to: o.email ?? undefined, subject, text: orderEmailText(id, o, items, oversold) }),
    });
    if (res.ok) return null;
    const detail = await res.json().then((j: { message?: string }) => j?.message ?? '').catch(() => '');
    return `resend ${res.status}${detail ? `: ${String(detail).slice(0, 200)}` : ''}`;
  } catch (e) {
    return `send failed: ${String(e).slice(0, 200)}`;
  }
}
