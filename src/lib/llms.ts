import {
  collections,
  formatPrice,
  fromPrice,
  getCollection,
  getWorksInTier,
  SITE,
  sizesFor,
  works,
  type Work,
} from '@/content/catalog';
import { GIFT_AMOUNTS } from '@/content/gifts';
import { LEAD_TIME_TEXT } from '@/content/commerce';
import { PREMIER_SLUGS, TIERS, type Tier } from '@/content/pricing';

const listed = (work: Work) => !work.webOnly;

function openingFrom(tier: Tier) {
  const prices = Object.values(TIERS[tier].prices).filter((n): n is number => typeof n === 'number');
  return formatPrice(Math.min(...prices));
}

function tierLine(tier: Tier) {
  const spec = TIERS[tier];
  const proofs =
    spec.artistProofs > 0
      ? `, plus ${spec.artistProofs} Artist Proofs, from ${openingFrom(tier)}`
      : `, from ${openingFrom(tier)} (no Artist Proofs)`;
  return `${spec.label} — edition of ${spec.edition}${proofs}`;
}

function mdLink(title: string, path: string) {
  return `[${title}](${SITE.url}${path})`;
}

function workLink(work: Work) {
  return mdLink(work.title, `/shop/${work.slug}`);
}

function sizesLine(work: Work) {
  const sizes = sizesFor(work.slug);
  if (!sizes.length) return 'Offered by studio inquiry.';
  return sizes.map((s) => `${s.dimensions} from ${formatPrice(s.price)}`).join('; ');
}

const intro = `> Limited-edition fine art photography by Sheldon Roth — nature, wildlife, underwater and landscape photographs, printed as archival Lumachrome HD prints and face-mounted to TruLife museum-grade acrylic.

Sheldon Roth is a fine art nature, wildlife and underwater photographer. His work ranges from high peaks, glaciers and alpine lakes to reefs, coastlines, wildlife portraits and panoramas. Each photograph is a single moment from the field, released as a signed and numbered limited edition with a certificate of authenticity.

Prints are archival Lumachrome HD prints, face-mounted to TruLife anti-reflective museum-grade acrylic, with an acrylic backing, a floating mount and a French-cleat hanger. A size is only offered when the original file holds at least 150 pixels per inch at that size. Online checkout ships free within the United States (insured, signature required). International delivery is by studio inquiry. Every piece is made to order; please allow ${LEAD_TIME_TEXT} from order to delivery.`;

const editions = `Each work is one edition shared across all of its sizes. Prices follow a published five-step ladder: the first quarter of an edition is offered at the opening price, then the price rises by 20%, 40% and 70% as the edition sells. The final 10% of each edition (at twice the opening price) is offered by inquiry. Artist Proofs, where they exist, are a separately numbered run of the largest available size, offered by inquiry at the top of the ladder from the outset.

- ${tierLine('premier')}. The five defining works: ${mdLink('Premier Works', '/premier')}.
- ${tierLine('signature')}. See ${mdLink('Signature Works', '/collections/signature')}.
- ${tierLine('collection')}.

Opening prices are by size and tier. Collection works begin at 24 × 16 in; Premier and Signature works begin at 30 × 20 in. Larger sizes (36 × 24, 45 × 30, 60 × 40, and 2:1 panoramic sizes such as 36 × 18 in) are offered when the master file supports them. The prices listed here are opening prices; the live price on each work page follows the ladder.`;

const returns = `Collectors may contact the studio within 14 days of delivery to return a work in its original crate and packaging, insured, with return freight paid by the collector. Once the piece arrives back undamaged, the collector may choose a full refund of the purchase price or a full exchange credit toward another work. Damage in transit is replaced at no cost if reported within 48 hours with photographs.`;

function galleriesBlock() {
  const lines = [
    `- ${mdLink('All galleries', '/collections')}`,
    ...collections.map((c) => `- ${mdLink(c.title, `/collections/${c.slug}`)}`),
    `- ${mdLink('New Releases', '/new-releases')}`,
    `- ${mdLink('All limited editions', '/shop')}`,
  ];
  return lines.join('\n');
}

function guidesBlock() {
  return [
    `- ${mdLink('Collector Guides', '/guides')}`,
    `- ${mdLink("Lumachrome Acrylic Prints: How They're Made & Why Collectors Choose Them", '/guides/lumachrome-acrylic-prints')}`,
    `- ${mdLink('How to Size Large-Format Fine Art Photography for Your Wall', '/guides/sizing-large-format-photography')}`,
    `- ${mdLink('How Limited-Edition Fine Art Photography Pricing Works', '/guides/limited-edition-photography-pricing')}`,
  ].join('\n');
}

function servicesBlock() {
  const gifts = GIFT_AMOUNTS.map((n) => formatPrice(n)).join(', ');
  return [
    `- ${mdLink('The Artist', '/artist')}`,
    `- ${mdLink('Inquire', '/contact')}`,
    `- ${mdLink('Gift Certificates', '/gift')} (${gifts})`,
    `- ${mdLink('Trade Program', '/trade')}`,
    `- ${mdLink('FAQ', '/faq')}`,
    `- ${mdLink('Shipping & Returns', '/shipping-returns')}`,
    `- ${mdLink('Caring for Your Art', '/care-instructions')}`,
    `- ${mdLink('Certificate of Authenticity', '/certificate')}`,
    `- [Instagram](${SITE.instagram})`,
  ].join('\n');
}

function worksInPrimary(slug: string) {
  return works.filter((w) => listed(w) && w.collection === slug);
}

/**
 * Short AI-oriented index at /llms.txt: who Sheldon is, what he sells, and a link to every work.
 * Generated from catalog.ts so it stays current as works are added or retitled.
 */
export function llmsTxt() {
  const premier = PREMIER_SLUGS.map((slug) => works.find((w) => w.slug === slug)).filter((w): w is Work => !!w);
  const byGallery = collections
    .filter((c) => !c.curated)
    .map((c) => {
      const items = worksInPrimary(c.slug);
      if (!items.length) return '';
      return `### ${c.title}\n\n${items.map((w) => `- ${workLink(w)}`).join('\n')}`;
    })
    .filter(Boolean)
    .join('\n\n');

  const also = works.filter((w) => w.webOnly);
  const alsoBlock = also.length
    ? `\n\n### Also on the site\n\n${also.map((w) => `- ${workLink(w)}`).join('\n')}`
    : '';

  return `# ${SITE.title}

${intro}

## Editions and pricing

${editions}

## Returns

${returns}

## Galleries

${galleriesBlock()}

## Premier works

${premier.map((w) => `- ${workLink(w)}`).join('\n')}
- ${mdLink('Premier Works gallery', '/premier')}

## All limited editions

Each work has its own page on the shop. Opening prices and available sizes are listed in the complete catalog: ${mdLink('full catalog (Markdown)', '/llms-full.txt')}.

${byGallery}${alsoBlock}

## Collector Guides

${guidesBlock()}

## Collector services

${servicesBlock()}
`;
}

function workSection(work: Work) {
  const from = fromPrice(work.slug);
  const galleries = work.collections
    .map((slug) => getCollection(slug))
    .filter((c): c is NonNullable<typeof c> => !!c)
    .map((c) => mdLink(c.title, `/collections/${c.slug}`))
    .join(', ');
  const spec = TIERS[work.tier];
  const lines = [
    `### ${work.title}`,
    '',
    work.description,
    '',
    `- Page: ${SITE.url}/shop/${work.slug}`,
    `- Image: ${SITE.url}/works/${work.slug}.jpg`,
    `- Edition: ${spec.label}, limited edition of ${work.editionSize}${spec.artistProofs ? ` plus ${spec.artistProofs} Artist Proofs` : ''}`,
    `- Galleries: ${galleries || '—'}`,
    from ? `- Opening prices: ${sizesLine(work)}` : `- Availability: ${sizesLine(work)}`,
  ];
  return lines.join('\n');
}

/**
 * Complete Markdown catalog at /llms-full.txt, grouped by tier, generated from catalog.ts.
 */
export function llmsFullTxt() {
  const premier = getWorksInTier('premier');
  const signature = getWorksInTier('signature').filter((w) => w.tier === 'signature');
  const collectionWorks = getWorksInTier('collection');
  const also = works.filter((w) => w.webOnly);

  const byGallery = collections
    .filter((c) => !c.curated)
    .map((c) => {
      const items = collectionWorks.filter((w) => w.collection === c.slug);
      if (!items.length) return '';
      return `## ${c.title}\n\n${c.description}\n\n${items.map(workSection).join('\n\n')}`;
    })
    .filter(Boolean)
    .join('\n\n');

  const alsoBlock = also.length
    ? `\n\n## Also on the site\n\nThese works have their own pages and can be purchased or inquired about, but they are kept out of the main galleries.\n\n${also.map(workSection).join('\n\n')}`
    : '';

  return `# ${SITE.title} — complete catalog

${intro}

This file is the full Markdown catalog of every limited-edition photograph currently offered at ${SITE.url}. A shorter index is at ${SITE.url}/llms.txt. Shop in the browser at ${SITE.url}/shop.

## Editions and pricing

${editions}

## Returns

${returns}

## Premier Works

The five defining works. ${mdLink('Premier Works gallery', '/premier')}.

${premier.map(workSection).join('\n\n')}

## Signature Works

${mdLink('Signature Works gallery', '/collections/signature')}.

${signature.map(workSection).join('\n\n')}

${byGallery}${alsoBlock}

## Collector Guides

${guidesBlock()}

## Collector services

${servicesBlock()}
`;
}

export const llmsHeaders = {
  'Content-Type': 'text/plain; charset=utf-8',
  'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
};
