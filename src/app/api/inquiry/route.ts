import { NextResponse, type NextRequest } from 'next/server';
import { sizeFor, works } from '@/content/catalog';
import { ARTIST_PROOF_SIZE, TIERS } from '@/content/pricing';
import { hashIp, markNotified, notify, recentCount, saveInquiry } from '@/lib/inquiries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;
const MAX_BODY = 20_000;
const MIN_FILL_MS = 2500;
const PER_IP_PER_HOUR = 5;

// Best-effort per-instance burst limiter (the hourly limit is enforced from the database).
const bursts = new Map<string, number[]>();
function burstLimited(key: string) {
  const now = Date.now();
  const recent = (bursts.get(key) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  bursts.set(key, recent);
  if (bursts.size > 5000) bursts.clear();
  return recent.length > 3;
}

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/\u0000/g, '').trim().slice(0, max) : '');

export async function POST(req: NextRequest) {
  const len = Number(req.headers.get('content-length') || 0);
  if (len > MAX_BODY) return NextResponse.json({ ok: false, error: 'Message too long.' }, { status: 413 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Spam traps: a hidden field humans never fill, and a minimum time on the form. Bots get a quiet success.
  const elapsed = Number(body.elapsed);
  if (clean(body.company_website, 200) || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200).toLowerCase();
  const phone = clean(body.phone, 40) || null;
  const message = clean(body.message, 5000);
  const slug = clean(body.artwork, 120);
  const sizeName = clean(body.size, 40);
  const work = slug ? works.find((w) => w.slug === slug) : undefined;
  const fitted = work ? sizeFor(work.slug, sizeName) : undefined;
  const printSize = fitted
    ? fitted.dimensions
    : work && sizeName === ARTIST_PROOF_SIZE && TIERS[work.tier].artistProofs
      ? 'Artist Proof'
      : null;

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
  if (phone && !/^[0-9+().\-\s]{6,40}$/.test(phone)) errors.phone = 'Please check the phone number.';
  if (message.length < 10) errors.message = 'Please write a short message (at least 10 characters).';
  if ((message.match(/https?:\/\//gi) ?? []).length > 3) errors.message = 'Please remove some of the links.';
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 400 });

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || req.headers.get('x-real-ip');
  const ipHash = hashIp(ip);
  if (ipHash && burstLimited(ipHash)) {
    return NextResponse.json({ ok: false, error: 'Too many inquiries in a short time. Please try again later.' }, { status: 429 });
  }

  try {
    if ((await recentCount(ipHash)) >= PER_IP_PER_HOUR) {
      return NextResponse.json({ ok: false, error: 'Too many inquiries in a short time. Please try again later.' }, { status: 429 });
    }
    const record = {
      name,
      email,
      phone,
      artworkSlug: work?.slug ?? null,
      artworkTitle: work?.title ?? null,
      printSize,
      message,
      ipHash,
      userAgent: clean(req.headers.get('user-agent'), 300) || null,
      referer: clean(req.headers.get('referer'), 300) || null,
    };
    const id = await saveInquiry(record);
    const err = await notify(id, record);
    await markNotified(id, err).catch(() => {});
    if (err) console.warn(`inquiry ${id} stored; notification not sent: ${err}`);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('inquiry failed', e);
    return NextResponse.json({ ok: false, error: 'Something went wrong. Please try again in a moment.' }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ ok: false, error: 'Method not allowed' }, { status: 405, headers: { Allow: 'POST' } });
}
