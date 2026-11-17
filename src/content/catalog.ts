import { imageSizes } from './image-sizes';

export type CollectionSlug = 'tropics' | 'mountain-forest' | 'ocean-coast';

export interface Collection {
  slug: CollectionSlug;
  title: string;
  tagline: string;
  description: string;
  cover: string; // work slug used as cover image
}

export interface Work {
  slug: string;
  title: string;
  collection: CollectionSlug;
  description: string;
  editionSize: number;
  isNew?: boolean;
  bestSeller?: boolean;
  /** Shown in the home page hero slideshow, in this order */
  heroOrder?: number;
}

export interface PrintSize {
  name: string;
  /** long x short edge in inches */
  long: number;
  short: number;
  price: number;
}

export const PRINT_SIZES: PrintSize[] = [
  { name: 'Gallery', long: 30, short: 20, price: 2800 },
  { name: 'Signature', long: 45, short: 30, price: 4900 },
  { name: 'Masterwork', long: 60, short: 40, price: 8500 },
];

export const PRINT_DETAILS = [
  'Face-mounted to museum-grade acrylic for depth and luminosity',
  'Archival chromogenic print with brilliant colour and fine detail',
  'Aluminium backing with a floating French-cleat hanging system',
  'Hand-signed and numbered by Sheldon Roth',
  'Certificate of authenticity included',
];

export const collections: Collection[] = [
  {
    slug: 'tropics',
    title: 'Tropics',
    tagline: 'Reefs, islands and endless blue',
    description:
      'Reefs, islands and sunsets from above and from the shore — colour so vivid it barely seems real.',
    cover: 'coral-symphony',
  },
  {
    slug: 'mountain-forest',
    title: 'Mountain & Forest',
    tagline: 'High country light',
    description:
      'Snow-capped peaks, still alpine water and rushing streams through the aspens — the high country at its most alive.',
    cover: 'mountain-majesty',
  },
  {
    slug: 'ocean-coast',
    title: 'Ocean & Coast',
    tagline: 'The power and clarity of water',
    description:
      'Crystal lagoons, turquoise depths and a restless Pacific shoreline — the clarity, colour and power of water.',
    cover: 'turquoise-depths',
  },
];

export const works: Work[] = [
  {
    slug: 'coral-symphony',
    title: 'Coral Symphony',
    collection: 'tropics',
    description:
      'Vibrant coral formations create a natural symphony of colour and texture beneath the waves — a celebration of the reef seen from above.',
    editionSize: 50,
    bestSeller: true,
    heroOrder: 1,
  },
  {
    slug: 'island-paradise',
    title: 'Island Paradise',
    collection: 'tropics',
    description:
      'A pristine island floats between azure sky and turquoise sea, the essence of paradise untouched by time.',
    editionSize: 50,
    bestSeller: true,
    heroOrder: 2,
  },
  {
    slug: 'shipwreck-at-dawn',
    title: 'Shipwreck at Dawn',
    collection: 'tropics',
    description:
      'A haunting silhouette of a beached vessel emerges from golden morning light, where the boundary between sea and sand dissolves.',
    editionSize: 50,
    isNew: true,
  },
  {
    slug: 'tropical-sunset',
    title: 'Tropical Sunset',
    collection: 'tropics',
    description:
      'Palms stand tall against a glowing evening sky as the sun descends, painting the clouds in warm farewell.',
    editionSize: 50,
    bestSeller: true,
  },
  {
    slug: 'mountain-majesty',
    title: 'Mountain Majesty',
    collection: 'mountain-forest',
    description:
      'A lone peak rises above green foothills beneath a sky of drifting cloud — the timeless grandeur of mountain wilderness.',
    editionSize: 50,
    bestSeller: true,
    heroOrder: 3,
  },
  {
    slug: 'still-water',
    title: 'Still Water',
    collection: 'mountain-forest',
    description:
      'A snow-streaked summit and its dark pines mirrored perfectly in a calm alpine pond, a moment of absolute stillness in the high country.',
    editionSize: 50,
    isNew: true,
  },
  {
    slug: 'aspen-cascade',
    title: 'Aspen Cascade',
    collection: 'mountain-forest',
    description:
      'Snowmelt tumbles over moss-covered stone beneath the aspens, softened to silk by a long exposure.',
    editionSize: 50,
    isNew: true,
  },
  {
    slug: 'crystal-lagoon',
    title: 'Crystal Lagoon',
    collection: 'ocean-coast',
    description:
      'Water so clear it glows — white sand gives way to bands of aquamarine and deep teal beneath a forested shore.',
    editionSize: 50,
    isNew: true,
    heroOrder: 5,
  },
  {
    slug: 'turquoise-depths',
    title: 'Turquoise Depths',
    collection: 'ocean-coast',
    description:
      'Crystal-clear water reveals layer upon layer of turquoise, inviting the eye into a serene world below the cliffs.',
    editionSize: 50,
    bestSeller: true,
  },
  {
    slug: 'pacific-edge',
    title: 'Pacific Edge',
    collection: 'ocean-coast',
    description:
      'Dramatic coastal rock meets the relentless Pacific in a sweeping panorama that captures the raw energy of the western shoreline.',
    editionSize: 50,
    bestSeller: true,
    heroOrder: 4,
  },
];

export function getImage(slug: string) {
  const size = imageSizes[slug] ?? { width: 2560, height: 1707 };
  return { src: `/works/${slug}.jpg`, ...size };
}

export function isPortrait(slug: string) {
  const { width, height } = getImage(slug);
  return height > width;
}

export function getWork(slug: string) {
  return works.find((w) => w.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function getWorksInCollection(slug: string) {
  return works.filter((w) => w.collection === slug);
}

export function getHeroWorks() {
  return works
    .filter((w) => w.heroOrder !== undefined)
    .sort((a, b) => (a.heroOrder ?? 0) - (b.heroOrder ?? 0));
}

export function getNewReleases() {
  return works.filter((w) => w.isNew);
}

export function getBestSellers() {
  return works.filter((w) => w.bestSeller);
}

export function sizesFor(slug: string) {
  const portrait = isPortrait(slug);
  return PRINT_SIZES.map((s) => ({
    ...s,
    dimensions: portrait ? `${s.short}" × ${s.long}"` : `${s.long}" × ${s.short}"`,
  }));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}

export const SITE = {
  name: 'Sheldon Roth',
  title: 'Sheldon Roth Fine Art',
  email: 'sheldon@sheldonroth.com',
  location: 'Buena Vista, Colorado',
  url: 'https://sheldonroth.com',
};
