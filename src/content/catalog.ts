import { imageSizes } from './image-sizes';

export type CollectionSlug = 'peaks-ice' | 'mountain-forest' | 'light-sky' | 'water' | 'far-horizons';

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
  /** On the site with its own page, but kept out of the main galleries */
  webOnly?: boolean;
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
    slug: 'peaks-ice',
    title: 'Peaks & Ice',
    tagline: 'Summits, glaciers and alpenglow',
    description:
      'Towering summits, rivers of glacier ice and the last warm light on fresh snow — the high peaks at their most dramatic.',
    cover: 'granite-throne',
  },
  {
    slug: 'mountain-forest',
    title: 'Mountain & Forest',
    tagline: 'High country light',
    description:
      'Turquoise lakes, wildflower basins and rushing water beneath the peaks — the high country at its most alive.',
    cover: 'glacial-jewel',
  },
  {
    slug: 'light-sky',
    title: 'Light & Sky',
    tagline: 'Fleeting moments of fire and gold',
    description:
      'Skies that ignite and forests turned to gold — the rare, fleeting moments when light transforms everything it touches.',
    cover: 'gold-forest',
  },
  {
    slug: 'water',
    title: 'Water',
    tagline: 'The colour and power of water',
    description:
      'Reefs and islands from above, crystal shallows and a restless shoreline — the clarity, colour and power of water.',
    cover: 'turquoise-depths',
  },
  {
    slug: 'far-horizons',
    title: 'Far Horizons',
    tagline: 'Savanna, dunes and open sea',
    description:
      'Lone trees on golden grassland, wind-written dunes and cloud pouring over the cliffs — wide open land at the edge of the world.',
    cover: 'sentinel-tree',
  },
];

export const works: Work[] = [
  {
    slug: "sunstar-valley",
    title: "Sunstar Valley",
    collection: "peaks-ice",
    description:
      "The sun bursts over a high ridge and pours light down a deep mountain valley, layer after layer of peaks fading into the haze.",
    editionSize: 50,
    heroOrder: 1,
  },
  {
    slug: "alpenglow",
    title: "Alpenglow",
    collection: "peaks-ice",
    description:
      "Fresh snow and fluted ice catch the last warm light as a great summit rises into a deep blue sky.",
    editionSize: 50,
    bestSeller: true,
    heroOrder: 2,
  },
  {
    slug: "above-the-clouds",
    title: "Above the Clouds",
    collection: "peaks-ice",
    description:
      "Twin summits stand clear above a sea of cloud, their ridgelines sharp against an endless blue.",
    editionSize: 50,
    bestSeller: true,
    heroOrder: 3,
  },
  {
    slug: "cloud-tide",
    title: "Cloud Tide",
    collection: "far-horizons",
    description:
      "A tide of cloud spills over a sheer escarpment and dissolves into the valley below, slow as breath.",
    editionSize: 50,
    heroOrder: 4,
  },
  {
    slug: "glacial-jewel",
    title: "Glacial Jewel",
    collection: "mountain-forest",
    description:
      "A turquoise lake glows in a basin of red and green stone, fed by the snowfields that cradle it.",
    editionSize: 50,
    bestSeller: true,
    heroOrder: 5,
  },
  {
    slug: "sky-on-fire",
    title: "Sky on Fire",
    collection: "light-sky",
    description:
      "The whole sky ignites in crimson and gold above still water, mirrored in a single burning moment.",
    editionSize: 50,
    heroOrder: 6,
  },
  {
    slug: "wildflower-basin",
    title: "Wildflower Basin",
    collection: "mountain-forest",
    description:
      "A carpet of magenta wildflowers runs to the foot of the peaks in a high summer basin.",
    editionSize: 50,
    heroOrder: 7,
  },
  {
    slug: "granite-throne",
    title: "Granite Throne",
    collection: "peaks-ice",
    description:
      "A sculpted granite spire stands enthroned above its glaciers, every ridge drawn in light and shadow.",
    editionSize: 50,
    bestSeller: true,
    heroOrder: 8,
  },
  {
    slug: "glacier-frame",
    title: "Glacier Frame",
    collection: "peaks-ice",
    description:
      "Forest and stone frame a hanging glacier as it pours from the summit snows.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "snow-range",
    title: "Snow Range",
    collection: "peaks-ice",
    description:
      "A long wall of snow-covered peaks stretches across the horizon in a sweeping panorama.",
    editionSize: 50,
  },
  {
    slug: "sentinel",
    title: "Sentinel",
    collection: "peaks-ice",
    description:
      "A lone summit rises above the cloud, a white sentinel watching over the valley.",
    editionSize: 50,
  },
  {
    slug: "rising-pyramid",
    title: "Rising Pyramid",
    collection: "peaks-ice",
    description:
      "A perfect pyramid of rock and ice climbs out of the drifting cloud.",
    editionSize: 50,
  },
  {
    slug: "roof-of-the-world",
    title: "Roof of the World",
    collection: "peaks-ice",
    description:
      "The highest ridges break through the cloud in a vast panorama of rock, snow and sky.",
    editionSize: 50,
  },
  {
    slug: "frozen-symphony",
    title: "Frozen Symphony",
    collection: "peaks-ice",
    description:
      "Towers of glacier ice rise in fluted columns, a frozen symphony of light and form.",
    editionSize: 50,
  },
  {
    slug: "valley-of-giants",
    title: "Valley of Giants",
    collection: "peaks-ice",
    description:
      "Giant peaks line a deep forested valley under a sky of drifting cloud.",
    editionSize: 50,
  },
  {
    slug: "ice-spires",
    title: "Ice Spires",
    collection: "peaks-ice",
    description:
      "Spires of glacier ice stand guard before a skyline of jagged peaks.",
    editionSize: 50,
  },
  {
    slug: "monarch-of-ice",
    title: "Monarch of Ice",
    collection: "peaks-ice",
    description:
      "A broad monarch of a mountain wears its glaciers like a mantle of light.",
    editionSize: 50,
  },
  {
    slug: "glaciers-edge",
    title: "Glacier's Edge",
    collection: "peaks-ice",
    description:
      "A river of ice carves its way down between forested ridges toward the valley floor.",
    editionSize: 50,
  },
  {
    slug: "cloud-lake",
    title: "Cloud Lake",
    collection: "mountain-forest",
    description:
      "A milky blue lake lies beneath rugged peaks as clouds build over the high country.",
    editionSize: 50,
  },
  {
    slug: "rhododendron-valley",
    title: "Rhododendron Valley",
    collection: "mountain-forest",
    description:
      "Rhododendrons blaze red beneath a steep valley of snow-dusted peaks.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "storm-lake",
    title: "Storm Lake",
    collection: "mountain-forest",
    description:
      "Storm light falls across a high alpine lake ringed by snow-streaked ridges.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "bands-of-light",
    title: "Bands of Light",
    collection: "mountain-forest",
    description:
      "Bands of late sun sweep across rolling green ridges, sculpting every fold of the land.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "mist-veil",
    title: "Mist Veil",
    collection: "mountain-forest",
    description:
      "Mist drifts over a forested ridge as the peak beyond slips in and out of view.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "lake-and-summit",
    title: "Lake and Summit",
    collection: "mountain-forest",
    description:
      "A dark mountain lake gathers the reflection of a snowy summit at dusk.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "heart-of-the-mountains",
    title: "Heart of the Mountains",
    collection: "mountain-forest",
    description:
      "A small island of turquoise water sits at the heart of a vast mountain amphitheatre.",
    editionSize: 50,
  },
  {
    slug: "alpine-bloom",
    title: "Alpine Bloom",
    collection: "mountain-forest",
    description:
      "Wildflowers bloom along a high trail as the peaks rise behind them.",
    editionSize: 50,
  },
  {
    slug: "snowfield-mirror",
    title: "Snowfield Mirror",
    collection: "mountain-forest",
    description:
      "A dark volcanic crag rises above lingering snowfields under a wind-swept sky.",
    editionSize: 50,
  },
  {
    slug: "painted-mountain",
    title: "Painted Mountain",
    collection: "mountain-forest",
    description:
      "A mountain painted in rust and gold glows above a dark green forest.",
    editionSize: 50,
  },
  {
    slug: "emerald-ribbons",
    title: "Emerald Ribbons",
    collection: "mountain-forest",
    description:
      "Ribbons of water cascade over mossy rock in a hidden emerald glen.",
    editionSize: 50,
  },
  {
    slug: "blue-ribbon",
    title: "Blue Ribbon",
    collection: "mountain-forest",
    description:
      "A ribbon of deep blue water winds between steep green mountainsides.",
    editionSize: 50,
  },
  {
    slug: "hidden-falls",
    title: "Hidden Falls",
    collection: "mountain-forest",
    description:
      "A curtain of water pours through a stone grotto, softened to silk by a long exposure.",
    editionSize: 50,
  },
  {
    slug: "liquid-jade",
    title: "Liquid Jade",
    collection: "mountain-forest",
    description:
      "Jade-green water fills a quiet basin beneath steep alpine slopes.",
    editionSize: 50,
  },
  {
    slug: "sapphire-basin",
    title: "Sapphire Basin",
    collection: "mountain-forest",
    description:
      "A sapphire lake rests in a high basin beneath snow-streaked peaks and a sky of streaming cloud.",
    editionSize: 50,
  },
  {
    slug: "range-of-light",
    title: "Range of Light",
    collection: "mountain-forest",
    description:
      "An entire range of snowy peaks glows beneath towering summer clouds.",
    editionSize: 50,
  },
  {
    slug: "high-country",
    title: "High Country",
    collection: "mountain-forest",
    description:
      "Snowy summits and green ridges roll away beneath a bright summer sky.",
    editionSize: 50,
  },
  {
    slug: "eye-of-the-mountain",
    title: "Eye of the Mountain",
    collection: "mountain-forest",
    description:
      "A thawing lake opens like an eye in the snow, its floating ice a pale pupil.",
    editionSize: 50,
  },
  {
    slug: "gold-forest",
    title: "Gold Forest",
    collection: "light-sky",
    description:
      "The setting sun blazes through ancient trees, turning the forest floor to gold.",
    editionSize: 50,
  },
  {
    slug: "table-of-the-gods",
    title: "Table of the Gods",
    collection: "water",
    description:
      "A great flat-topped mountain rises above the sea, its sheer cliffs lit by evening sun.",
    editionSize: 50,
  },
  {
    slug: "swirling-sands",
    title: "Swirling Sands",
    collection: "water",
    description:
      "From above, white sand and turquoise water swirl together in endless patterns.",
    editionSize: 50,
  },
  {
    slug: "coral-symphony",
    title: "Coral Symphony",
    collection: "water",
    description:
      "Vibrant coral formations create a natural symphony of colour and texture beneath the waves — a celebration of the reef seen from above.",
    editionSize: 50,
    bestSeller: true,
  },
  {
    slug: "island-paradise",
    title: "Island Paradise",
    collection: "water",
    description:
      "A pristine island floats between azure sky and turquoise sea, the essence of paradise untouched by time.",
    editionSize: 50,
  },
  {
    slug: "turquoise-depths",
    title: "Turquoise Depths",
    collection: "water",
    description:
      "Crystal-clear water reveals layer upon layer of turquoise, inviting the eye into a serene world below the cliffs.",
    editionSize: 50,
    bestSeller: true,
  },
  {
    slug: "pacific-edge",
    title: "Pacific Edge",
    collection: "water",
    description:
      "Dramatic coastal rock meets the open ocean in a sweeping panorama that captures the raw energy of the shoreline.",
    editionSize: 50,
  },
  {
    slug: "sentinel-tree",
    title: "Sentinel Tree",
    collection: "far-horizons",
    description:
      "A lone weathered tree stands sentinel over golden grassland beneath a soft, open sky.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "wind-script",
    title: "Wind Script",
    collection: "far-horizons",
    description:
      "The wind writes in sand, ridges of light and shadow traced across the dunes.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "massif-from-the-water",
    title: "Massif from the Water",
    collection: "far-horizons",
    description:
      "A long mountain massif rises from a calm blue sea, softened by distance and haze.",
    editionSize: 50,
  },
  {
    slug: "sea-stack",
    title: "Sea Stack",
    collection: "far-horizons",
    description:
      "A rugged stack of rock rises from deep blue water beneath a cloudless sky.",
    editionSize: 50,
  },
  {
    slug: "veil-of-cloud",
    title: "Veil of Cloud",
    collection: "peaks-ice",
    description:
      "Cloud gathers around a towering peak, revealing its summit for only a moment.",
    editionSize: 50,
    webOnly: true,
  },
  {
    slug: "first-light",
    title: "First Light",
    collection: "peaks-ice",
    description:
      "The first light of day touches a distant snowy summit above a dark, quiet land.",
    editionSize: 50,
    webOnly: true,
  },
  {
    slug: "blue-cathedral",
    title: "Blue Cathedral",
    collection: "peaks-ice",
    description:
      "Inside the glacier, walls of blue ice rise like the vaults of a cathedral.",
    editionSize: 50,
    webOnly: true,
  },
  {
    slug: "sheer-majesty",
    title: "Sheer Majesty",
    collection: "peaks-ice",
    description:
      "A sheer face of rock and hanging ice drops from summit to valley in one sweeping line.",
    editionSize: 50,
    webOnly: true,
  },
  {
    slug: "emerald-basin",
    title: "Emerald Basin",
    collection: "mountain-forest",
    description:
      "Emerald water fills a high basin beneath a ring of weathered peaks.",
    editionSize: 50,
    webOnly: true,
  },
  {
    slug: "wild-water",
    title: "Wild Water",
    collection: "mountain-forest",
    description:
      "Whitewater thunders through a forested gorge, wild and unrelenting.",
    editionSize: 50,
    webOnly: true,
  },
  {
    slug: "travertine",
    title: "Travertine",
    collection: "water",
    description:
      "Terraces of stone and water step down the hillside in layers of cream and gold.",
    editionSize: 50,
    webOnly: true,
  },
  {
    slug: "autumn-majesty",
    title: "Autumn Majesty",
    collection: "mountain-forest",
    description:
      "Aspens turn to gold beneath snow-dusted peaks in the first days of autumn.",
    editionSize: 50,
    webOnly: true,
  },
  {
    slug: "crystal-shores",
    title: "Crystal Shores",
    collection: "water",
    description:
      "White sand meets clear turquoise water along a quiet, forested shore.",
    editionSize: 50,
    webOnly: true,
  },
  {
    slug: "high-valley",
    title: "High Valley",
    collection: "mountain-forest",
    description:
      "A green valley climbs toward rugged peaks under a bright, cloud-filled sky.",
    editionSize: 50,
    webOnly: true,
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
  return works.filter((w) => w.collection === slug && !w.webOnly);
}

export function getHeroWorks() {
  return works
    .filter((w) => w.heroOrder !== undefined && !w.webOnly)
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
  url: 'https://sheldonroth.com',
};
