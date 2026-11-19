import { NextResponse, type NextRequest } from 'next/server';
import { hashIp, markNotified, notify, recentCount, saveInquiry } from '@/lib/inquiries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;
const MIN_FILL_MS = 1500;
const PER_IP_PER_HOUR = 5;
const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/\u0000/g, '').trim().slice(0, max) : '');

/**
 * Collector list signup (first access to new releases). Stored with the inquiries (site.inquiries, message tagged
 * "Collector list signup") and emailed to Sheldon through the same Resend setup, so no new table or secret is needed.
 */
export async function POST(req: NextRequest) {
  if (Number(req.headers.get('content-length') || 0) > 4000) {
    return NextResponse.json({ ok: false, error: 'Request too large.' }, { status: 413 });
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }
  // Spam traps: a hidden field and a minimum time on the page. Bots get a quiet success.
  const elapsed = Number(body.elapsed);
  if (clean(body.company_website, 200) || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }
  const email = clean(body.email, 200).toLowerCase();
  const name = clean(body.name, 120);
  if (!EMAIL_RE.test(email)) return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || req.headers.get('x-real-ip');
  const ipHash = hashIp(ip);
  try {
    if ((await recentCount(ipHash)) >= PER_IP_PER_HOUR) {
      return NextResponse.json({ ok: false, error: 'Too many requests. Please try again later.' }, { status: 429 });
    }
    const record = {
      name: name || 'Collector list',
      email,
      phone: null,
      artworkSlug: null,
      artworkTitle: null,
      printSize: null,
      message: 'Collector list signup: wants first access to new releases and Artist Proofs.',
      ipHash,
      userAgent: clean(req.headers.get('user-agent'), 300) || null,
      referer: clean(req.headers.get('referer'), 300) || null,
    };
    const id = await saveInquiry(record);
    const err = await notify(id, record, `New collector list signup — ${email}`);
    await markNotified(id, err).catch(() => {});
    if (err) console.warn(`collector signup ${id} stored; notification not sent: ${err}`);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('collector signup failed', e);
    return NextResponse.json({ ok: false, error: 'Something went wrong. Please try again in a moment.' }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ ok: false, error: 'Method not allowed' }, { status: 405, headers: { Allow: 'POST' } });
}
