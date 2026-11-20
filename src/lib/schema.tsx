import type { Collection, Work } from '@/content/catalog';
import { SITE } from '@/content/catalog';

/** Open Graph image used as the Organisation and Person image. Never add address, email or phone here. */
export const OG_IMAGE = `${SITE.url}/og.jpg`;

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
  );
}

/** Shared Person + Organisation entities for the home and artist pages. */
export function personOrganizationGraph() {
  const organization = {
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.title,
    url: SITE.url,
    image: OG_IMAGE,
    sameAs: [SITE.instagram],
    founder: { '@id': `${SITE.url}/#person` },
  };

  const person = {
    '@type': 'Person',
    '@id': `${SITE.url}/#person`,
    name: 'Sheldon Roth',
    url: `${SITE.url}/artist`,
    image: OG_IMAGE,
    jobTitle: 'Fine Art Photographer',
    description:
      'Sheldon Roth is a fine art nature, wildlife and underwater photographer. His limited-edition photographs are printed as archival Lumachrome HD prints and face-mounted to museum acrylic.',
    sameAs: [SITE.instagram],
    worksFor: { '@id': `${SITE.url}/#organization` },
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    name: SITE.title,
    url: SITE.url,
    publisher: { '@id': `${SITE.url}/#organization` },
    creator: { '@id': `${SITE.url}/#person` },
  };

  return { '@context': 'https://schema.org', '@graph': [organization, person, website] };
}

export function collectionPageJsonLd(collection: Collection, works: Work[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${collection.title} — ${SITE.title}`,
    description: collection.description,
    url: `${SITE.url}/collections/${collection.slug}`,
    isPartOf: { '@id': `${SITE.url}/#website`, name: SITE.title, url: SITE.url },
    about: { '@id': `${SITE.url}/#person`, name: 'Sheldon Roth' },
    hasPart: works.slice(0, 24).map((w) => ({
      '@type': 'VisualArtwork',
      name: w.title,
      url: `${SITE.url}/shop/${w.slug}`,
      creator: { '@type': 'Person', name: 'Sheldon Roth' },
    })),
  };
}

export function collectionsIndexJsonLd(collections: Collection[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Galleries — ${SITE.title}`,
    description:
      'Explore the fine art photography galleries of Sheldon Roth — mountains, lakes, waterfalls, canyons, forests, coast, sky, wildlife, black and white and panoramas.',
    url: `${SITE.url}/collections`,
    isPartOf: { '@id': `${SITE.url}/#website`, name: SITE.title, url: SITE.url },
    hasPart: collections.map((c) => ({
      '@type': 'CollectionPage',
      name: c.title,
      url: `${SITE.url}/collections/${c.slug}`,
      description: c.description,
    })),
  };
}

export function articleJsonLd({
  title,
  description,
  url,
  datePublished = '2026-11-19',
  faqs,
}: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  faqs?: { q: string; a: string }[];
}) {
  const article = {
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    mainEntityOfPage: url,
    image: OG_IMAGE,
    author: { '@id': `${SITE.url}/#person`, name: 'Sheldon Roth', url: `${SITE.url}/artist` },
    publisher: { '@id': `${SITE.url}/#organization`, name: SITE.title, url: SITE.url, image: OG_IMAGE },
  };

  if (!faqs?.length) return { '@context': 'https://schema.org', ...article };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      article,
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}
