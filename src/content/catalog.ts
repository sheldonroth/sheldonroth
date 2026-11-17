import { imageSizes } from './image-sizes';

export type CollectionSlug =
  | 'landscape'
  | 'seascape'
  | 'wildlife'
  | 'architecture'
  | 'nature'
  | 'abstract';

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
    slug: 'landscape',
    title: 'Landscape',
    tagline: 'Mountains, light and open country',
    description:
      'Majestic mountains, sweeping vistas and natural wonders, photographed in the fleeting moments when the light turns extraordinary.',
    cover: 'mountain-majesty',
  },
  {
    slug: 'seascape',
    title: 'Seascape',
    tagline: 'The colour and power of the sea',
    description:
      'Reefs, islands and coastlines — the colour, motion and raw power of the ocean, from the air and from the shore.',
    cover: 'coral-symphony',
  },
  {
    slug: 'wildlife',
    title: 'Wildlife',
    tagline: 'Portraits from the wild',
    description:
      'Intimate portraits of animals in their natural habitats, made with patience across the plains and grasslands of Africa.',
    cover: 'golden-mane',
  },
  {
    slug: 'architecture',
    title: 'Architecture',
    tagline: 'Geometry of the modern city',
    description:
      'Urban geometry and architectural landmarks — the rhythm, density and light of the world’s great cities.',
    cover: 'city-lights',
  },
  {
    slug: 'nature',
    title: 'Nature',
    tagline: 'Patterns and textures',
    description:
      'Abstract patterns and textures found in the natural world — bark, birch and the quiet details most people walk past.',
    cover: 'white-birch',
  },
  {
    slug: 'abstract',
    title: 'Abstract',
    tagline: 'Light, form and movement',
    description:
      'Experimental photography exploring light, form and movement, where the camera paints as much as it records.',
    cover: 'light-dance',
  },
];

export const works: Work[] = [
  {
    slug: 'coral-symphony',
    title: 'Coral Symphony',
    collection: 'seascape',
    description:
      'Vibrant coral formations create a natural symphony of colour and texture beneath the waves — a celebration of the reef seen from above.',
    editionSize: 50,
    bestSeller: true,
    heroOrder: 1,
  },
  {
    slug: 'shipwreck-at-dawn',
    title: 'Shipwreck at Dawn',
    collection: 'seascape',
    description:
      'A haunting silhouette of a beached vessel emerges from golden morning light, where the boundary between sea and sand dissolves.',
    editionSize: 50,
    isNew: true,
    heroOrder: 3,
  },
  {
    slug: 'island-paradise',
    title: 'Island Paradise',
    collection: 'seascape',
    description:
      'A pristine island floats between azure sky and turquoise sea, the essence of paradise untouched by time.',
    editionSize: 50,
    bestSeller: true,
    heroOrder: 2,
  },
  {
    slug: 'pacific-edge',
    title: 'Pacific Edge',
    collection: 'seascape',
    description:
      'Dramatic coastal rock meets the relentless Pacific in a sweeping panorama that captures the raw energy of the western shoreline.',
    editionSize: 50,
    bestSeller: true,
  },
  {
    slug: 'turquoise-depths',
    title: 'Turquoise Depths',
    collection: 'seascape',
    description:
      'Crystal-clear water reveals layer upon layer of turquoise, inviting the eye into a serene world below the cliffs.',
    editionSize: 50,
  },
  {
    slug: 'mountain-majesty',
    title: 'Mountain Majesty',
    collection: 'landscape',
    description:
      'A lone peak rises above green foothills beneath a sky of drifting cloud — the timeless grandeur of mountain wilderness.',
    editionSize: 50,
    bestSeller: true,
    heroOrder: 4,
  },
  {
    slug: 'tropical-sunset',
    title: 'Tropical Sunset',
    collection: 'landscape',
    description:
      'Palms stand tall against a glowing evening sky as the sun descends, painting the clouds in warm farewell.',
    editionSize: 50,
  },
  {
    slug: 'solitude',
    title: 'Solitude',
    collection: 'wildlife',
    description:
      'A single tree stands against the vast African sky — a moment of quiet contemplation on the open plains.',
    editionSize: 50,
  },
  {
    slug: 'king-of-the-savanna',
    title: 'King of the Savanna',
    collection: 'wildlife',
    description:
      'A magnificent lion surveys his domain with regal composure, at ease in the long grass of the savanna.',
    editionSize: 50,
    bestSeller: true,
  },
  {
    slug: 'golden-mane',
    title: 'Golden Mane',
    collection: 'wildlife',
    description:
      'Sunlight catches the flowing mane of the savanna’s apex predator — a portrait of wild beauty and untamed power.',
    editionSize: 50,
    isNew: true,
  },
  {
    slug: 'migration',
    title: 'Migration',
    collection: 'wildlife',
    description:
      'Ostriches move as one across the golden plains, a procession of the wild against an endless horizon.',
    editionSize: 50,
  },
  {
    slug: 'city-lights',
    title: 'City Lights',
    collection: 'architecture',
    description:
      'The skyline transforms into a constellation of illuminated towers and reflections, the pulsing heartbeat of the city at night.',
    editionSize: 50,
    isNew: true,
    heroOrder: 5,
  },
  {
    slug: 'empire',
    title: 'Empire',
    collection: 'architecture',
    description:
      'An iconic art deco spire reaches toward the heavens above Manhattan — a symbol of ambition and artistic excellence.',
    editionSize: 50,
    bestSeller: true,
  },
  {
    slug: 'density',
    title: 'Density',
    collection: 'architecture',
    description:
      'Towering residential blocks create a mesmerising pattern of windows and balconies, a testament to vertical living.',
    editionSize: 50,
  },
  {
    slug: 'urban-rainbow',
    title: 'Urban Rainbow',
    collection: 'architecture',
    description:
      'A facade of colour — hundreds of windows and balconies stacked into a vivid, almost painterly grid.',
    editionSize: 50,
  },
  {
    slug: 'white-birch',
    title: 'White Birch',
    collection: 'nature',
    description:
      'Elegant white birch trunks create a striking natural rhythm, their papery bark glowing in soft forest light.',
    editionSize: 50,
  },
  {
    slug: 'bark-patterns',
    title: 'Bark Patterns',
    collection: 'nature',
    description:
      'Ancient bark reveals intricate patterns carved by time and weather — nature’s own abstract masterpiece.',
    editionSize: 50,
  },
  {
    slug: 'light-dance',
    title: 'Light Dance',
    collection: 'abstract',
    description:
      'Captured light weaves through space in an ethereal dance of colour and form, blurring the line between photography and painting.',
    editionSize: 50,
    isNew: true,
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
