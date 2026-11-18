import { NextResponse } from 'next/server';
import { getWork, sizesFor } from '@/content/catalog';
import { EDITION_PER_SIZE } from '@/content/commerce';
import { soldBySize } from '@/lib/orders';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Remaining prints per size for one work. On any database error the counter is simply not shown. */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  try {
    const sold = await soldBySize(slug);
    const remaining = Object.fromEntries(sizesFor(slug).map((s) => [s.name, Math.max(0, EDITION_PER_SIZE - (sold[s.name] ?? 0))]));
    return NextResponse.json({ editionSize: EDITION_PER_SIZE, remaining }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ remaining: null }, { headers: { 'Cache-Control': 'no-store' } });
  }
}
