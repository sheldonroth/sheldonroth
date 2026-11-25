import { getImage, isPortrait, sizesFor, SITE, works, getCollection } from '@/content/catalog';
import { editionStatus } from '@/content/pricing';
import { LEAD_TIME_BUSINESS_DAYS } from '@/content/commerce';
import { soldTotals } from '@/lib/orders';
import { feedDescription, feedProductDetails, feedProductHighlights, feedSizeLabel } from '@/lib/merchant-feed';

export const runtime = 'nodejs';
// Rebuilt at most hourly, so prices follow the edition ladder as prints sell.
export const revalidate = 3600;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const tag = (name: string, value: string | number) => `<${name}>${esc(String(value))}</${name}>`;

function productDetail(section: string, name: string, value: string) {
  return (
    '<g:product_detail>' +
    tag('g:section_name', section) +
    tag('g:attribute_name', name) +
    tag('g:attribute_value', value) +
    '</g:product_detail>'
  );
}

/**
 * Google Merchant Center product feed (RSS 2.0 + g: namespace). One item per work and size, grouped by work, at the live
 * ladder price; the link preselects that size so the landing page shows the same price. Works whose next print is in
 * the inquiry-only step, or sold out, are left out. Descriptions and optional attributes are built from catalog and
 * published materials copy only.
 */
export async function GET() {
  let sold = new Map<string, number>();
  try {
    sold = await soldTotals(works.map((w) => w.slug));
  } catch {
    /* database unreachable: every edition is priced at its current step from zero sold (the opening price) */
  }

  const items: string[] = [];
  for (const work of works) {
    const sizes = sizesFor(work.slug);
    if (!sizes.length) continue;
    const status = editionStatus(work.tier, sold.get(work.slug) ?? 0, sizes.map((s) => s.name));
    if (status.soldOut || status.inquiryOnly) continue;
    const image = `${SITE.url}${getImage(work.slug).src}`;
    const gallery = getCollection(work.collection)?.title ?? 'Fine Art';
    const orientation = isPortrait(work.slug) ? 'portrait' : 'landscape';
    const ctx = { gallery, orientation } as const;
    for (const size of sizes) {
      const price = status.prices[size.name];
      if (!price) continue;
      const dims = feedSizeLabel(size.dimensions);
      items.push(
        [
          '<item>',
          tag('g:id', `${work.slug}-${size.name}`),
          tag('g:item_group_id', work.slug),
          tag('title', `${work.title} by Sheldon Roth — ${dims} Limited Edition Acrylic Photo Print`),
          tag('description', feedDescription(work, size, ctx)),
          tag('link', `${SITE.url}/shop/${work.slug}?size=${size.name}`),
          tag('g:image_link', image),
          tag('g:availability', 'in_stock'),
          tag('g:price', `${price.toFixed(2)} USD`),
          tag('g:brand', 'Sheldon Roth'),
          tag('g:condition', 'new'),
          tag('g:identifier_exists', 'no'),
          tag('g:google_product_category', '500044'),
          tag('g:product_type', `Fine Art Photography > ${gallery}`),
          tag('g:size', dims),
          tag('g:material', 'Acrylic'),
          tag('g:is_bundle', 'no'),
          ...feedProductDetails(work, size, ctx).map((d) => productDetail(d.section, d.name, d.value)),
          ...feedProductHighlights(work).map((h) => tag('g:product_highlight', h)),
          '<g:shipping><g:country>US</g:country><g:service>Insured, signature required</g:service><g:price>0.00 USD</g:price></g:shipping>',
          tag('g:min_handling_time', LEAD_TIME_BUSINESS_DAYS.min),
          tag('g:max_handling_time', LEAD_TIME_BUSINESS_DAYS.max),
          '</item>',
        ].join(''),
      );
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>Sheldon Roth Fine Art</title>
<link>${SITE.url}</link>
<description>Limited edition fine art photography by Sheldon Roth.</description>
${items.join('\n')}
</channel>
</rss>
`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' },
  });
}
