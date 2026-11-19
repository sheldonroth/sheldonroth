/**
 * Server-only helpers for the /api/inquiry form: storage in Neon (site.inquiries, least-privilege role) and an
 * optional email notification. The recipient comes only from the INQUIRY_NOTIFY_TO env var.
 * Never import this file from client components.
 */
import { createHash } from 'crypto';
import { neon } from '@neondatabase/serverless';

export interface InquiryRecord {
  name: string;
  email: string;
  phone: string | null;
  artworkSlug: string | null;
  artworkTitle: string | null;
  printSize: string | null;
  message: string;
  ipHash: string | null;
  userAgent: string | null;
  referer: string | null;
}

function db() {
  const url = process.env.INQUIRIES_DATABASE_URL;
  if (!url) throw new Error('INQUIRIES_DATABASE_URL is not set');
  return neon(url);
}

export function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  return createHash('sha256').update(`${process.env.INQUIRY_IP_SALT ?? 'sheldonroth-inquiries'}:${ip}`).digest('hex');
}

/** Number of inquiries stored from this IP hash in the last hour. */
export async function recentCount(ipHash: string | null): Promise<number> {
  if (!ipHash) return 0;
  const sql = db();
  const rows = (await sql`select count(*)::int as n from site.inquiries where ip_hash = ${ipHash} and created_at > now() - interval '1 hour'`) as { n: number }[];
  return rows[0]?.n ?? 0;
}

export async function saveInquiry(r: InquiryRecord): Promise<number> {
  const sql = db();
  const rows = (await sql`
    insert into site.inquiries (name, email, phone, artwork_slug, artwork_title, print_size, message, ip_hash, user_agent, referer)
    values (${r.name}, ${r.email}, ${r.phone}, ${r.artworkSlug}, ${r.artworkTitle}, ${r.printSize}, ${r.message}, ${r.ipHash}, ${r.userAgent}, ${r.referer})
    returning id`) as { id: number | string }[];
  return Number(rows[0].id);
}

export async function markNotified(id: number, error: string | null) {
  const sql = db();
  if (error) await sql`update site.inquiries set notify_error = ${error.slice(0, 500)} where id = ${id}`;
  else await sql`update site.inquiries set notified_at = now(), notify_error = null where id = ${id}`;
}

/**
 * Sends the notification through whichever provider is configured:
 *  - Resend: RESEND_API_KEY (+ INQUIRY_FROM on a verified domain)
 *  - Mailgun: MAILGUN_API_KEY + MAILGUN_DOMAIN (MAILGUN_API_BASE=https://api.eu.mailgun.net for EU accounts)
 * Returns null on success or a short reason string.
 */
export async function notify(id: number, r: InquiryRecord, subjectOverride?: string): Promise<string | null> {
  const to = process.env.INQUIRY_NOTIFY_TO;
  if (!to) return 'INQUIRY_NOTIFY_TO not set';
  const from = process.env.INQUIRY_FROM || 'Sheldon Roth Fine Art <inquiries@sheldonroth.com>';
  const subject = subjectOverride ?? `New inquiry${r.artworkTitle ? `: ${r.artworkTitle}` : ''} — ${r.name}`;
  const text = [
    `Inquiry #${id} from sheldonroth.com`,
    '',
    `Name: ${r.name}`,
    `Email: ${r.email}`,
    r.phone ? `Phone: ${r.phone}` : null,
    r.artworkTitle ? `Artwork: ${r.artworkTitle}${r.printSize ? ` (${r.printSize})` : ''}` : null,
    '',
    r.message,
  ]
    .filter((l) => l !== null)
    .join('\n');

  try {
    if (process.env.RESEND_API_KEY) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to: [to], reply_to: r.email, subject, text }),
      });
      if (res.ok) return null;
      const detail = await res.json().then((j: { message?: string }) => j?.message ?? '').catch(() => '');
      return `resend ${res.status}${detail ? `: ${String(detail).slice(0, 200)}` : ''}`;
    }
    if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
      const base = process.env.MAILGUN_API_BASE || 'https://api.mailgun.net';
      const body = new URLSearchParams({ from, to, subject, text, 'h:Reply-To': r.email });
      const res = await fetch(`${base}/v3/${process.env.MAILGUN_DOMAIN}/messages`, {
        method: 'POST',
        headers: { Authorization: `Basic ${Buffer.from(`api:${process.env.MAILGUN_API_KEY}`).toString('base64')}` },
        body,
      });
      return res.ok ? null : `mailgun ${res.status}`;
    }
    return 'no email provider configured (set MAILGUN_API_KEY + MAILGUN_DOMAIN or RESEND_API_KEY)';
  } catch (e) {
    return `send failed: ${String(e).slice(0, 200)}`;
  }
}
