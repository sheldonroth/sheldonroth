import { NextResponse } from 'next/server';
import { getWork, sizesFor } from '@/content/catalog';
import { editionStatus, ladderSteps, TIERS } from '@/content/pricing';
import { soldTotal } from '@/lib/orders';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Edition status for one work: tier, shared edition, current ladder step and the current price of every size, all
 * computed on the server from the number sold. The exact remaining count is only included once at least 10% of the
 * edition has sold. On a database error the prices fall back to the opening step and `live` is false.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const sizes = sizesFor(slug);
  let sold = 0;
  let live = true;
  try {
    sold = await soldTotal(slug);
  } catch {
    live = false;
  }
  const status = editionStatus(work.tier, sold, sizes.map((s) => s.name));
  const spec = TIERS[work.tier];
  return NextResponse.json(
    {
      live,
      slug,
      tier: status.tier,
      tierLabel: status.tierLabel,
      editionSize: status.edition,
      artistProofs: status.artistProofs,
      step: status.current?.step ?? null,
      inquiryOnly: status.inquiryOnly,
      soldOut: status.soldOut,
      nextIncreaseAt: status.nextIncreaseAt ?? null,
      // Only disclosed once 10% of the edition has sold.
      sold: live && status.showRemaining ? status.sold : null,
      remaining: live && status.showRemaining ? status.remaining : null,
      sizes: sizes.map((s) => ({
        name: s.name,
        dimensions: s.dimensions,
        openingPrice: s.price,
        price: status.prices[s.name] ?? null,
        nextPrice: status.nextPrices?.[s.name] ?? null,
      })),
      ladder: ladderSteps(spec.edition).map((st) => ({
        step: st.step,
        from: st.from,
        to: st.to,
        multiplier: st.multiplier,
        inquiryOnly: st.inquiryOnly,
      })),
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
