import type { Metadata, Viewport } from 'next';
import CinematicExperience, { type Chapter } from '@/components/experience/CinematicExperience';
import { fromPrice, formatPrice, getCollection, getImage, getWork } from '@/content/catalog';
import { focalPoints } from '@/content/focal-points';

// Kept out of search everywhere except production, so previews never compete with the live site.
const noindex = process.env.VERCEL_ENV !== 'production';

export const metadata: Metadata = {
  title: 'The Experience',
  description: 'A cinematic walk through ten limited-edition landscape photographs by Sheldon Roth.',
  ...(noindex ? { robots: { index: false, follow: false, googleBot: { index: false, follow: false } } } : {}),
};

export const viewport: Viewport = { themeColor: '#050505', colorScheme: 'dark' };

/** The chapters, in viewing order: landscapes only, strongest first, alternating mood and colour. */
const SLUGS = [
  'cloud-lake',
  'sandstone-wave',
  'heart-of-the-mountains',
  'secret-grotto',
  'sea-monolith',
  'living-sculpture',
  'the-great-bend',
  'ice-spires',
  'canyon-song',
  'molten-lake',
];

export default function ExperiencePage() {
  const chapters: Chapter[] = SLUGS.map((slug) => {
    const work = getWork(slug)!;
    const img = getImage(slug);
    const gallery = getCollection(work.collection);
    const price = fromPrice(slug);
    const f = focalPoints[slug];
    return {
      slug,
      title: work.title,
      gallery: gallery?.title ?? '',
      tagline: gallery?.tagline ?? '',
      description: work.description,
      edition: work.editionSize,
      tier: work.tier === 'premier' ? 'Premier' : work.tier === 'signature' ? 'Signature' : 'Collection',
      from: price ? formatPrice(price) : undefined,
      width: img.width,
      height: img.height,
      focal: { x: (f?.x ?? 50) / 100, y: (f?.y ?? 50) / 100 },
    };
  });
  return <CinematicExperience chapters={chapters} />;
}
