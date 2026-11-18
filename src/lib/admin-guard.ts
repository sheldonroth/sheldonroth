/**
 * Guard for one-off maintenance endpoints (/api/seed, /api/migrate, media fixers).
 * They answer 404 unless ADMIN_API_SECRET is set on the deployment AND the request carries the same value in the
 * `x-admin-secret` header. Production has no ADMIN_API_SECRET, so the routes are effectively removed there.
 */
import { timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';

export function adminGuard(req: Request): NextResponse | null {
  const secret = process.env.ADMIN_API_SECRET;
  const given = req.headers.get('x-admin-secret') ?? '';
  const ok =
    !!secret && secret.length >= 24 && given.length === secret.length && timingSafeEqual(Buffer.from(given), Buffer.from(secret));
  return ok ? null : NextResponse.json({ error: 'Not found' }, { status: 404 });
}
