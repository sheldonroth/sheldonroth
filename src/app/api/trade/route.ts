import { NextResponse, type NextRequest } from 'next/server';
import { hashIp, markNotified, notify, recentCount, saveInquiry } from '@/lib/inquiries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;
const MIN_FILL_MS = 3000;
const PER_IP_PER_HOUR = 5;
const ROLES = ['Interior designer', 'Art consultant', 'Architect', 'Hospitality / corporate buyer', 'Other trade'];
const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/\u0000/g, '').trim().slice(0, max) : '');

/**
 * Trade program application. Stored with the inquiries (message tagged "Trade application") and emailed to Sheldon
 * through the same Resend setup; the recipient comes only from INQUIRY_NOTIFY_TO and is never sent to the browser.
 * Approval and the 20% trade code are handled by Sheldon (see docs/MARKETING.md).
 */
export async function POST(req: NextRequest) {
  if (Number(req.headers.get('content-length') || 0) > 12000) {
    return NextResponse.json({ ok: false, error: 'Request too large.' }, { status: 413 });
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }
  const elapsed = Number(body.elapsed);
  if (clean(body.company_website, 200) || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200).toLowerCase();
  const firm = clean(body.firm, 160);
  const website = clean(body.website, 300);
  const role = ROLES.includes(clean(body.role, 60)) ? clean(body.role, 60) : 'Other trade';
  const location = clean(body.location, 120);
  const project = clean(body.project, 4000);

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
  if (!firm) errors.firm = 'Please enter your firm or business name.';
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 400 });

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || req.headers.get('x-real-ip');
  const ipHash = hashIp(ip);
  try {
    if ((await recentCount(ipHash)) >= PER_IP_PER_HOUR) {
      return NextResponse.json({ ok: false, error: 'Too many requests. Please try again later.' }, { status: 429 });
    }
    const record = {
      name,
      email,
      phone: null,
      artworkSlug: null,
      artworkTitle: null,
      printSize: null,
      message: [
        'Trade application (20% trade program)',
        `Firm: ${firm}`,
        `Role: ${role}`,
        website ? `Website / portfolio: ${website}` : null,
        location ? `Based in: ${location}` : null,
        '',
        project || '(no project notes)',
        '',
        'To approve: create a personal promotion code on the TRADE20 coupon in Stripe and reply with it.',
      ]
        .filter((l) => l !== null)
        .join('\n'),
      ipHash,
      userAgent: clean(req.headers.get('user-agent'), 300) || null,
      referer: clean(req.headers.get('referer'), 300) || null,
    };
    const id = await saveInquiry(record);
    const err = await notify(id, record, `New trade application — ${firm} (${name})`);
    await markNotified(id, err).catch(() => {});
    if (err) console.warn(`trade application ${id} stored; notification not sent: ${err}`);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('trade application failed', e);
    return NextResponse.json({ ok: false, error: 'Something went wrong. Please try again in a moment.' }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ ok: false, error: 'Method not allowed' }, { status: 405, headers: { Allow: 'POST' } });
}
