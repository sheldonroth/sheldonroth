import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import WorkCard from '@/components/WorkCard';
import ProductClient from './ProductClient';
import {
  getCollection,
  getImage,
  getWork,
  getWorksInCollection,
  getCollectionsForWork,
  PRINT_DETAILS,
  SITE,
  sizesFor,
  works,
} from '@/content/catalog';
import { TIERS } from '@/content/pricing';
import { FINANCING_AT_CHECKOUT, SHIP_COUNTRIES } from '@/content/commerce';

export const dynamicParams = false;

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return { title: 'Artwork Not Found' };
  const img = getImage(work.slug);
  return {
    title: `${work.title} — ${work.tier === 'collection' ? '' : `${TIERS[work.tier].label} · `}Limited Edition of ${work.editionSize}`,
    description: work.description,
    openGraph: { title: `${work.title} by Sheldon Roth`, description: work.description, images: [{ url: img.src, width: img.width, height: img.height }] },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const collection = getCollection(work.collection)!;
  const image = getImage(work.slug);
  const galleries = getCollectionsForWork(work);
  const related = getWorksInCollection(work.collection).filter((w) => w.slug !== work.slug);
  const more = related.length >= 4 ? related.slice(0, 4) : [...related, ...works.filter((w) => w.collection !== work.collection && !w.webOnly && !related.includes(w))].slice(0, 4);

  const index = works.findIndex((w) => w.slug === work.slug);
  const prev = works[(index - 1 + works.length) % works.length];
  const next = works[(index + 1) % works.length];

  const sizes = sizesFor(work.slug);
  const spec = TIERS[work.tier];
  const url = `${SITE.url}/shop/${work.slug}`;
  const imageUrl = `${SITE.url}${image.src}`;
  const largest = sizes[sizes.length - 1];
  // Structured data: the artwork (VisualArtwork) and what is for sale (Product with one Offer per size at the
  // opening price). Prices rise with the published ladder; the page always shows the live price.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'VisualArtwork',
        '@id': `${url}#artwork`,
        name: work.title,
        description: work.description,
        image: imageUrl,
        url,
        artform: 'Photograph',
        artMedium: 'Lumachrome HD photographic print face-mounted to acrylic',
        artworkSurface: 'Acrylic',
        artEdition: spec.edition,
        creator: { '@type': 'Person', name: 'Sheldon Roth', url: `${SITE.url}/artist`, sameAs: [SITE.instagram] },
        ...(largest ? { width: { '@type': 'Distance', name: `${largest.long} in` }, height: { '@type': 'Distance', name: `${largest.short} in` } } : {}),
      },
      ...(sizes.length
        ? [
            {
              '@type': 'Product',
              '@id': `${url}#product`,
              name: `${work.title} — Limited Edition Photograph`,
              description: work.description,
              image: imageUrl,
              url,
              sku: work.slug,
              category: 'Fine Art Photography Prints',
              brand: { '@type': 'Brand', name: 'Sheldon Roth Fine Art' },
              subjectOf: { '@id': `${url}#artwork` },
              offers: sizes.map((s) => ({
                '@type': 'Offer',
                name: s.dimensions,
                sku: `${work.slug}-${s.name}`,
                price: s.price,
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                itemCondition: 'https://schema.org/NewCondition',
                url,
                seller: { '@type': 'Organization', name: 'Sheldon Roth Fine Art' },
                shippingDetails: {
                  '@type': 'OfferShippingDetails',
                  shippingRate: { '@type': 'MonetaryAmount', value: 0, currency: 'USD' },
                  shippingDestination: SHIP_COUNTRIES.map((c) => ({ '@type': 'DefinedRegion', addressCountry: c })),
                },
                hasMerchantReturnPolicy: {
                  '@type': 'MerchantReturnPolicy',
                  applicableCountry: 'US',
                  returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                  merchantReturnDays: 14,
                  returnFees: 'https://schema.org/ReturnShippingFees',
                  returnMethod: 'https://schema.org/ReturnByMail',
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <ProductClient
        work={{
          slug: work.slug,
          title: work.title,
          description: work.description,
          tier: work.tier,
          tierLabel: spec.label,
          editionSize: work.editionSize,
          artistProofs: spec.artistProofs,
          financing: FINANCING_AT_CHECKOUT,
          collectionTitle: collection.title,
          collectionSlug: collection.slug,
          image,
          sizes,
          details: PRINT_DETAILS,
        }}
      />

      {/* lik.com: grey band, "You Might Also Like" heading left with a gallery link right, four dark mats */}
      <section className="bg-[#edecec] py-14 lg:py-20">
        <div className="lk-container">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="lk-edition-label">You Might Also Like</p>
              <h2 className="mt-3 text-[30px] font-light leading-[1.1] tracking-[0.03em] text-accent md:text-[45px]">Explore more from this gallery</h2>
            </div>
            <Link href={`/collections/${collection.slug}`} className="lk-btn lk-btn-gold shrink-0">Shop the Gallery</Link>
          </div>
          {/* Cross-links: every gallery this work appears in, as lik.com links related collections */}
          <p className="mt-6 text-[14px] leading-[21px] text-[#5f5f58]">
            <span className="lk-edition-label mr-2">Featured in</span>
            {galleries.map((g, i) => (
              <span key={g.slug}>
                {i > 0 && <span aria-hidden="true"> · </span>}
                <Link href={`/collections/${g.slug}`} className="underline-offset-4 hover:underline">{g.title}</Link>
              </span>
            ))}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {more.map((w, i) => (
              <Reveal key={w.slug} delay={i * 100}>
                <WorkCard work={w} tone="dark" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <nav className="border-t border-line" aria-label="More artworks">
        <div className="lk-container grid grid-cols-2">
          <Link href={`/shop/${prev.slug}`} className="group py-8 pr-4">
            <span className="lk-edition-label">← Previous</span>
            <span className="lk-related-title mt-3 block group-hover:underline">{prev.title}</span>
          </Link>
          <Link href={`/shop/${next.slug}`} className="group border-l border-line py-8 pl-4 text-right">
            <span className="lk-edition-label">Next →</span>
            <span className="lk-related-title mt-3 block group-hover:underline">{next.title}</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
