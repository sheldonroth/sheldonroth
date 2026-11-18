import { imageSizes } from './image-sizes';
import { masterLongEdge } from './master-sizes';

export type CollectionSlug =
  | 'signature'
  | 'mountains'
  | 'lakes'
  | 'water'
  | 'canyons'
  | 'forests'
  | 'coast'
  | 'sky'
  | 'wildlife'
  | 'black-and-white'
  | 'panoramas';

export interface Collection {
  slug: CollectionSlug;
  title: string;
  tagline: string;
  description: string;
  cover: string; // work slug used as cover image (top-ranked landscape-format work, unique per collection)
  /** Curated tiers (Signature Works) are derived from rank rather than listed on each work. */
  curated?: boolean;
}

export interface Work {
  slug: string;
  title: string;
  /** Primary gallery (breadcrumb, "more from this gallery"). */
  collection: CollectionSlug;
  /** Every gallery this work belongs to, primary first. */
  collections: CollectionSlug[];
  description: string;
  editionSize: number;
  isNew?: boolean;
  bestSeller?: boolean;
  /** Curated fine-art ranking, 1 = strongest. Drives display order everywhere works are listed. */
  rank: number;
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
  'Face-mounted to anti-glare museum acrylic for depth and luminosity',
  'Archival Lumachrome HD print with brilliant colour and fine detail',
  'Acrylic backing with a floating mount and French-cleat hanging',
  'Signed and numbered by Sheldon Roth',
  'Certificate of authenticity included',
];

export const collections: Collection[] = [
  {
    slug: 'signature',
    title: 'Signature Works',
    tagline: 'The defining images',
    description:
      'The photographs that define the collection — rare light, extraordinary encounters and wild places at their most powerful. The strongest works in the portfolio, each released in a strictly limited edition.',
    cover: 'leap-of-faith',
    curated: true,
  },
  {
    slug: 'mountains',
    title: 'Mountains',
    tagline: 'Summits, glaciers and alpenglow',
    description:
      'Razor ridges above the cloud, rivers of ancient ice and the last warm light on fresh snow — the high peaks in all their scale and silence.',
    cover: 'ice-spires',
  },
  {
    slug: 'lakes',
    title: 'Lakes & Reflections',
    tagline: 'Still water beneath the peaks',
    description:
      'Turquoise tarns cradled in stone, mirror-calm water at dusk and sapphire basins ringed by snow — the quiet jewels of the high country.',
    cover: 'cloud-lake',
  },
  {
    slug: 'water',
    title: 'Waterfalls & Rivers',
    tagline: 'The living energy of moving water',
    description:
      'Falls pouring through hidden grottos, jade rivers winding between canyon walls and streams tumbling through moss — water in constant, graceful motion.',
    cover: 'canyon-song',
  },
  {
    slug: 'canyons',
    title: 'Canyons & Desert',
    tagline: 'Stone sculpted by time',
    description:
      'Slot canyons glowing like embers, sweeping river bends and wind-written dunes — rock and sand shaped over millennia by water, wind and light.',
    cover: 'sandstone-wave',
  },
  {
    slug: 'forests',
    title: 'Forests & Flora',
    tagline: 'The quiet majesty of growing things',
    description:
      'Ancient maples, cathedral groves and aspens turned to gold, with single blooms caught in perfect light — the forest and its flowers at their most luminous.',
    cover: 'living-sculpture',
  },
  {
    slug: 'coast',
    title: 'Coast & Ocean',
    tagline: 'Colour, clarity and the power of the sea',
    description:
      'Sea stacks at dusk, reefs and islands seen from above, crystal shallows and restless surf — the endless moods of the ocean.',
    cover: 'sea-monolith',
  },
  {
    slug: 'sky',
    title: 'Sky & Light',
    tagline: 'Fleeting moments of fire and gold',
    description:
      'Skies set ablaze, stars wheeling over dark ridges and seas of cloud catching the dawn — the rare moments when light transforms everything.',
    cover: 'river-of-stars',
  },
  {
    slug: 'wildlife',
    title: 'Wildlife',
    tagline: 'Portraits of the wild',
    description:
      'A leopard watching from the shadows, lions at rest and elephants emerging from darkness — intimate portraits of the great animals of the wild.',
    cover: 'the-watcher',
  },
  {
    slug: 'black-and-white',
    title: 'Black & White',
    tagline: 'Form, texture and shadow',
    description:
      'Stripped of colour, gesture and texture take centre stage — the raw character of the wild and the high peaks in pure monochrome.',
    cover: 'pride',
  },
  {
    slug: 'panoramas',
    title: 'Panoramas',
    tagline: 'The horizon, end to end',
    description:
      'Sweeping vistas that carry the horizon across the wall — mountain ranges, lakes and burning skies captured in their full breadth.',
    cover: 'above-the-clouds',
  },
];

const catalogWorks: Work[] = [
  {
    slug: "sunstar-valley",
    rank: 45,
    title: "Sunstar Valley",
    collection: "mountains",
    collections: ["mountains", "sky"],
    description:
      "The sun bursts over a high ridge and pours light down a deep mountain valley, layer after layer of peaks fading into the haze.",
    editionSize: 50,
  },
  {
    slug: "alpenglow",
    rank: 128,
    title: "Alpenglow",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Fresh snow and fluted ice catch the last warm light as a great summit rises into a deep blue sky.",
    editionSize: 50,
    bestSeller: true,
  },
  {
    slug: "above-the-clouds",
    rank: 30,
    title: "Above the Clouds",
    collection: "mountains",
    collections: ["mountains", "panoramas"],
    description:
      "Twin summits stand clear above a sea of cloud, their ridgelines sharp against an endless blue.",
    editionSize: 50,
    bestSeller: true,
  },
  {
    slug: "cloud-tide",
    rank: 25,
    title: "Cloud Tide",
    collection: "sky",
    collections: ["sky"],
    description:
      "A tide of cloud spills over a sheer escarpment and dissolves into the valley below, slow as breath.",
    editionSize: 50,
  },
  {
    slug: "glacial-jewel",
    rank: 16,
    title: "Glacial Jewel",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "A turquoise lake glows in a basin of red and green stone, fed by the snowfields that cradle it.",
    editionSize: 50,
    bestSeller: true,
  },
  {
    slug: "sky-on-fire",
    rank: 120,
    title: "Sky on Fire",
    collection: "sky",
    collections: ["sky", "panoramas"],
    description:
      "The whole sky ignites in crimson and gold above still water, mirrored in a single burning moment.",
    editionSize: 50,
  },
  {
    slug: "wildflower-basin",
    rank: 112,
    title: "Wildflower Basin",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "A carpet of magenta wildflowers runs to the foot of the peaks in a high summer basin.",
    editionSize: 50,
  },
  {
    slug: "granite-throne",
    rank: 125,
    title: "Granite Throne",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A sculpted granite spire stands enthroned above its glaciers, every ridge drawn in light and shadow.",
    editionSize: 50,
    bestSeller: true,
  },
  {
    slug: "glacier-frame",
    rank: 167,
    title: "Glacier Frame",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Forest and stone frame a hanging glacier as it pours from the summit snows.",
    editionSize: 50,
  },
  {
    slug: "snow-range",
    rank: 191,
    title: "Snow Range",
    collection: "mountains",
    collections: ["mountains", "panoramas"],
    description:
      "A long wall of snow-covered peaks stretches across the horizon in a sweeping panorama.",
    editionSize: 50,
  },
  {
    slug: "sentinel",
    rank: 50,
    title: "Sentinel",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A lone summit rises above the cloud, a white sentinel watching over the valley.",
    editionSize: 50,
  },
  {
    slug: "rising-pyramid",
    rank: 146,
    title: "Rising Pyramid",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A perfect pyramid of rock and ice climbs out of the drifting cloud.",
    editionSize: 50,
  },
  {
    slug: "roof-of-the-world",
    rank: 59,
    title: "Roof of the World",
    collection: "mountains",
    collections: ["mountains", "panoramas"],
    description:
      "The highest ridges break through the cloud in a vast panorama of rock, snow and sky.",
    editionSize: 50,
  },
  {
    slug: "frozen-symphony",
    rank: 56,
    title: "Frozen Symphony",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Towers of glacier ice rise in fluted columns, a frozen symphony of light and form.",
    editionSize: 50,
  },
  {
    slug: "valley-of-giants",
    rank: 149,
    title: "Valley of Giants",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Giant peaks line a deep forested valley under a sky of drifting cloud.",
    editionSize: 50,
  },
  {
    slug: "ice-spires",
    rank: 13,
    title: "Ice Spires",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Spires of glacier ice stand guard before a skyline of jagged peaks.",
    editionSize: 50,
  },
  {
    slug: "monarch-of-ice",
    rank: 155,
    title: "Monarch of Ice",
    collection: "mountains",
    collections: ["mountains", "panoramas"],
    description:
      "A broad monarch of a mountain wears its glaciers like a mantle of light.",
    editionSize: 50,
  },
  {
    slug: "glaciers-edge",
    rank: 85,
    title: "Glacier's Edge",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A river of ice carves its way down between forested ridges toward the valley floor.",
    editionSize: 50,
  },
  {
    slug: "cloud-lake",
    rank: 3,
    title: "Cloud Lake",
    collection: "lakes",
    collections: ["lakes", "panoramas"],
    description:
      "A milky blue lake lies beneath rugged peaks as clouds build over the high country.",
    editionSize: 50,
  },
  {
    slug: "rhododendron-valley",
    rank: 194,
    title: "Rhododendron Valley",
    collection: "mountains",
    collections: ["mountains", "forests"],
    description:
      "Rhododendrons blaze red beneath a steep valley of snow-dusted peaks.",
    editionSize: 50,
  },
  {
    slug: "storm-lake",
    rank: 64,
    title: "Storm Lake",
    collection: "lakes",
    collections: ["lakes", "panoramas"],
    description:
      "Storm light falls across a high alpine lake ringed by snow-streaked ridges.",
    editionSize: 50,
  },
  {
    slug: "bands-of-light",
    rank: 62,
    title: "Bands of Light",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Bands of late sun sweep across rolling green ridges, sculpting every fold of the land.",
    editionSize: 50,
  },
  {
    slug: "mist-veil",
    rank: 197,
    title: "Mist Veil",
    collection: "mountains",
    collections: ["mountains", "panoramas"],
    description:
      "Mist drifts over a forested ridge as the peak beyond slips in and out of view.",
    editionSize: 50,
  },
  {
    slug: "lake-and-summit",
    rank: 52,
    title: "Lake and Summit",
    collection: "lakes",
    collections: ["lakes", "mountains"],
    description:
      "A dark mountain lake gathers the reflection of a snowy summit at dusk.",
    editionSize: 50,
  },
  {
    slug: "heart-of-the-mountains",
    rank: 6,
    title: "Heart of the Mountains",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "A small island of turquoise water sits at the heart of a vast mountain amphitheatre.",
    editionSize: 50,
  },
  {
    slug: "alpine-bloom",
    rank: 180,
    title: "Alpine Bloom",
    collection: "forests",
    collections: ["forests"],
    description:
      "Wildflowers bloom along a high trail as the peaks rise behind them.",
    editionSize: 50,
  },
  {
    slug: "snowfield-mirror",
    rank: 113,
    title: "Snowfield Mirror",
    collection: "mountains",
    collections: ["mountains", "lakes"],
    description:
      "A dark volcanic crag rises above lingering snowfields under a wind-swept sky.",
    editionSize: 50,
  },
  {
    slug: "painted-mountain",
    rank: 65,
    title: "Painted Mountain",
    collection: "mountains",
    collections: ["mountains", "panoramas"],
    description:
      "A mountain painted in rust and gold glows above a dark green forest.",
    editionSize: 50,
  },
  {
    slug: "emerald-ribbons",
    rank: 184,
    title: "Emerald Ribbons",
    collection: "water",
    collections: ["water"],
    description:
      "Ribbons of water cascade over mossy rock in a hidden emerald glen.",
    editionSize: 50,
  },
  {
    slug: "blue-ribbon",
    rank: 42,
    title: "Blue Ribbon",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "A ribbon of deep blue water winds between steep green mountainsides.",
    editionSize: 50,
  },
  {
    slug: "hidden-falls",
    rank: 89,
    title: "Hidden Falls",
    collection: "water",
    collections: ["water"],
    description:
      "A curtain of water pours through a stone grotto, softened to silk by a long exposure.",
    editionSize: 50,
  },
  {
    slug: "liquid-jade",
    rank: 61,
    title: "Liquid Jade",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "Jade-green water fills a quiet basin beneath steep alpine slopes.",
    editionSize: 50,
  },
  {
    slug: "sapphire-basin",
    rank: 31,
    title: "Sapphire Basin",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "A sapphire lake rests in a high basin beneath snow-streaked peaks and a sky of streaming cloud.",
    editionSize: 50,
  },
  {
    slug: "range-of-light",
    rank: 161,
    title: "Range of Light",
    collection: "mountains",
    collections: ["mountains", "panoramas"],
    description:
      "An entire range of snowy peaks glows beneath towering summer clouds.",
    editionSize: 50,
  },
  {
    slug: "high-country",
    rank: 176,
    title: "High Country",
    collection: "mountains",
    collections: ["mountains", "panoramas"],
    description:
      "Snowy summits and green ridges roll away beneath a bright summer sky.",
    editionSize: 50,
  },
  {
    slug: "eye-of-the-mountain",
    rank: 153,
    title: "Eye of the Mountain",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "A thawing lake opens like an eye in the snow, its floating ice a pale pupil.",
    editionSize: 50,
  },
  {
    slug: "gold-forest",
    rank: 86,
    title: "Gold Forest",
    collection: "forests",
    collections: ["forests"],
    description:
      "The setting sun blazes through ancient trees, turning the forest floor to gold.",
    editionSize: 50,
  },
  {
    slug: "table-of-the-gods",
    rank: 169,
    title: "Table of the Gods",
    collection: "canyons",
    collections: ["canyons", "panoramas"],
    description:
      "A great flat-topped mountain rises above the sea, its sheer cliffs lit by evening sun.",
    editionSize: 50,
  },
  {
    slug: "swirling-sands",
    rank: 28,
    title: "Swirling Sands",
    collection: "coast",
    collections: ["coast"],
    description:
      "From above, white sand and turquoise water swirl together in endless patterns.",
    editionSize: 50,
  },
  {
    slug: "coral-symphony",
    rank: 24,
    title: "Coral Symphony",
    collection: "coast",
    collections: ["coast"],
    description:
      "Vibrant coral formations create a natural symphony of colour and texture beneath the waves — a celebration of the reef seen from above.",
    editionSize: 50,
    bestSeller: true,
  },
  {
    slug: "island-paradise",
    rank: 91,
    title: "Island Paradise",
    collection: "coast",
    collections: ["coast"],
    description:
      "A pristine island floats between azure sky and turquoise sea, the essence of paradise untouched by time.",
    editionSize: 50,
  },
  {
    slug: "turquoise-depths",
    rank: 203,
    title: "Turquoise Depths",
    collection: "coast",
    collections: ["coast"],
    description:
      "Crystal-clear water reveals layer upon layer of turquoise, inviting the eye into a serene world below the cliffs.",
    editionSize: 50,
    bestSeller: true,
  },
  {
    slug: "pacific-edge",
    rank: 201,
    title: "Pacific Edge",
    collection: "coast",
    collections: ["coast", "panoramas"],
    description:
      "Dramatic coastal rock meets the open ocean in a sweeping panorama that captures the raw energy of the shoreline.",
    editionSize: 50,
  },
  {
    slug: "sentinel-tree",
    rank: 20,
    title: "Sentinel Tree",
    collection: "forests",
    collections: ["forests"],
    description:
      "A lone weathered tree stands sentinel over golden grassland beneath a soft, open sky.",
    editionSize: 50,
  },
  {
    slug: "wind-script",
    rank: 96,
    title: "Wind Script",
    collection: "canyons",
    collections: ["canyons"],
    description:
      "The wind writes in sand, ridges of light and shadow traced across the dunes.",
    editionSize: 50,
  },
  {
    slug: "massif-from-the-water",
    rank: 195,
    title: "Massif from the Water",
    collection: "coast",
    collections: ["coast"],
    description:
      "A long mountain massif rises from a calm blue sea, softened by distance and haze.",
    editionSize: 50,
  },
  {
    slug: "sea-stack",
    rank: 189,
    title: "Sea Stack",
    collection: "coast",
    collections: ["coast"],
    description:
      "A rugged stack of rock rises from deep blue water beneath a cloudless sky.",
    editionSize: 50,
  },
  {
    slug: "veil-of-cloud",
    rank: 131,
    title: "Veil of Cloud",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Cloud gathers around a towering peak, revealing its summit for only a moment.",
    editionSize: 50,
    webOnly: true,
  },
  {
    slug: "first-light",
    rank: 172,
    title: "First Light",
    collection: "sky",
    collections: ["sky", "panoramas"],
    description:
      "The first light of day touches a distant snowy summit above a dark, quiet land.",
    editionSize: 50,
    webOnly: true,
  },
  {
    slug: "blue-cathedral",
    rank: 188,
    title: "Blue Cathedral",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Inside the glacier, walls of blue ice rise like the vaults of a cathedral.",
    editionSize: 50,
    webOnly: true,
  },
  {
    slug: "sheer-majesty",
    rank: 95,
    title: "Sheer Majesty",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A sheer face of rock and hanging ice drops from summit to valley in one sweeping line.",
    editionSize: 50,
    webOnly: true,
  },
  {
    slug: "emerald-basin",
    rank: 99,
    title: "Emerald Basin",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "Emerald water fills a high basin beneath a ring of weathered peaks.",
    editionSize: 50,
    webOnly: true,
  },
  {
    slug: "wild-water",
    rank: 181,
    title: "Wild Water",
    collection: "water",
    collections: ["water"],
    description:
      "Whitewater thunders through a forested gorge, wild and unrelenting.",
    editionSize: 50,
    webOnly: true,
  },
  {
    slug: "travertine",
    rank: 190,
    title: "Travertine",
    collection: "canyons",
    collections: ["canyons"],
    description:
      "Terraces of stone and water step down the hillside in layers of cream and gold.",
    editionSize: 50,
    webOnly: true,
  },
  {
    slug: "autumn-majesty",
    rank: 177,
    title: "Autumn Majesty",
    collection: "forests",
    collections: ["forests", "panoramas"],
    description:
      "Aspens turn to gold beneath snow-dusted peaks in the first days of autumn.",
    editionSize: 50,
    webOnly: true,
  },
  {
    slug: "crystal-shores",
    rank: 186,
    title: "Crystal Shores",
    collection: "coast",
    collections: ["coast"],
    description:
      "White sand meets clear turquoise water along a quiet, forested shore.",
    editionSize: 50,
    webOnly: true,
  },
  {
    slug: "high-valley",
    rank: 185,
    title: "High Valley",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A green valley climbs toward rugged peaks under a bright, cloud-filled sky.",
    editionSize: 50,
    webOnly: true,
  },
  {
    slug: "ember-sky",
    rank: 148,
    title: "Ember Sky",
    collection: "sky",
    collections: ["sky", "panoramas"],
    description:
      "Clouds catch fire above a darkening ridge as the last light of evening sweeps across the sky.",
    editionSize: 50,
  },
  {
    slug: "horizon-burn",
    rank: 199,
    title: "Horizon Burn",
    collection: "sky",
    collections: ["sky", "coast", "panoramas"],
    description:
      "A band of molten gold burns along the horizon as twilight deepens over calm water.",
    editionSize: 50,
  },
  {
    slug: "last-light",
    rank: 183,
    title: "Last Light",
    collection: "sky",
    collections: ["sky", "panoramas"],
    description:
      "Layered ridgelines dissolve into haze beneath a sky fading from gold to rose.",
    editionSize: 50,
  },
  {
    slug: "terraced-meadow",
    rank: 134,
    title: "Terraced Meadow",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Ancient terraced fields glow green beneath towering snow peaks in clear morning light.",
    editionSize: 50,
  },
  {
    slug: "gilded-sky",
    rank: 193,
    title: "Gilded Sky",
    collection: "sky",
    collections: ["sky"],
    description:
      "The sky erupts in gold as the sun slips beneath a line of silhouetted trees.",
    editionSize: 50,
  },
  {
    slug: "rose-summit",
    rank: 71,
    title: "Rose Summit",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A great summit turns rose and copper in the soft afterglow of a high-country dusk.",
    editionSize: 50,
  },
  {
    slug: "golden-tide",
    rank: 187,
    title: "Golden Tide",
    collection: "sky",
    collections: ["sky", "coast"],
    description:
      "The setting sun lays a path of gold across the sea toward a rugged, wave-washed shore.",
    editionSize: 50,
  },
  {
    slug: "morning-mist",
    rank: 196,
    title: "Morning Mist",
    collection: "sky",
    collections: ["sky"],
    description:
      "Sunrise sets drifting mist aglow over still water, a lone tree standing at the shore.",
    editionSize: 50,
  },
  {
    slug: "storm-light",
    rank: 143,
    title: "Storm Light",
    collection: "mountains",
    collections: ["mountains", "panoramas"],
    description:
      "Snow-dusted peaks break through parting storm clouds above a quiet valley.",
    editionSize: 50,
  },
  {
    slug: "canyon-song",
    rank: 4,
    title: "Canyon Song",
    collection: "water",
    collections: ["water", "canyons"],
    description:
      "Turquoise water spills over mossy boulders between towering walls of layered stone.",
    editionSize: 50,
  },
  {
    slug: "secret-grotto",
    rank: 9,
    title: "Secret Grotto",
    collection: "water",
    collections: ["water"],
    description:
      "A ribbon of falling water glows green beneath a stone arch deep inside a hidden canyon.",
    editionSize: 50,
  },
  {
    slug: "golden-grove",
    rank: 39,
    title: "Golden Grove",
    collection: "forests",
    collections: ["forests"],
    description:
      "Pale trunks rise through a blaze of autumn gold in a quiet mountain grove.",
    editionSize: 50,
  },
  {
    slug: "stone-spires",
    rank: 164,
    title: "Stone Spires",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A forest of fluted stone spires climbs toward the sky, every rib and gully carved sharp by wind and ice.",
    editionSize: 50,
  },
  {
    slug: "cloud-weave",
    rank: 137,
    title: "Cloud Weave",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Clouds weave through a vast wall of ice and rock as the high peaks emerge from the drifting mist.",
    editionSize: 50,
  },
  {
    slug: "ice-valley",
    rank: 36,
    title: "Ice Valley",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Cloud pours through a vast glacial valley ringed by jagged, snow-bound peaks.",
    editionSize: 50,
  },
  {
    slug: "ocean-of-cloud",
    rank: 82,
    title: "Ocean of Cloud",
    collection: "mountains",
    collections: ["mountains", "sky"],
    description:
      "Snow-clad summits stand above a still ocean of cloud that fills the valleys far below.",
    editionSize: 50,
  },
  {
    slug: "winter-crown",
    rank: 53,
    title: "Winter Crown",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A great pyramid of rock and ice crowns the range, its snow-laced ridges sharp against a deep blue sky.",
    editionSize: 50,
  },
  {
    slug: "summit-cloud",
    rank: 119,
    title: "Summit Cloud",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A single cloud drifts past a soaring pyramid of rock and snow in the clear high-altitude air.",
    editionSize: 50,
  },
  {
    slug: "spindrift",
    rank: 109,
    title: "Spindrift",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "High winds tear a plume of spindrift from a towering wall of snow and ice.",
    editionSize: 50,
  },
  {
    slug: "canyon-glow",
    rank: 17,
    title: "Canyon Glow",
    collection: "canyons",
    collections: ["canyons"],
    description:
      "Sunlight bursts through a sculpted sandstone arch, setting the smooth canyon walls aglow in shades of fire.",
    editionSize: 50,
  },
  {
    slug: "sandstone-flame",
    rank: 87,
    title: "Sandstone Flame",
    collection: "canyons",
    collections: ["canyons"],
    description:
      "Wind- and water-carved sandstone curls upward like a frozen flame toward a sliver of blue sky.",
    editionSize: 50,
  },
  {
    slug: "molten-lake",
    rank: 19,
    title: "Molten Lake",
    collection: "sky",
    collections: ["sky", "lakes"],
    description:
      "The last light of day turns a mountain lake to molten gold beneath a sky of rose and violet.",
    editionSize: 50,
  },
  {
    slug: "dune-lines",
    rank: 90,
    title: "Dune Lines",
    collection: "canyons",
    collections: ["canyons"],
    description:
      "Wind-drawn ripples sweep across the flank of a great dune, rising to a crest against the evening sky.",
    editionSize: 50,
  },
  {
    slug: "tidewater-stones",
    rank: 57,
    title: "Tidewater Stones",
    collection: "coast",
    collections: ["coast"],
    description:
      "Surf washes over a beach of smooth dark stones while a green sea cliff stands against the open ocean.",
    editionSize: 50,
  },
  {
    slug: "three-veils",
    rank: 92,
    title: "Three Veils",
    collection: "water",
    collections: ["water"],
    description:
      "Three ribbons of white water fall through a moss-draped gorge into a still, misty pool.",
    editionSize: 50,
  },
  {
    slug: "living-sculpture",
    rank: 8,
    title: "Living Sculpture",
    collection: "forests",
    collections: ["forests"],
    description:
      "The twisting limbs of an ancient maple spread beneath a glowing canopy of gold and green.",
    editionSize: 50,
  },
  {
    slug: "sea-monolith",
    rank: 10,
    title: "Sea Monolith",
    collection: "coast",
    collections: ["coast", "sky"],
    description:
      "A great sea monolith stands dark against a brooding sky as the tide slips across the sand.",
    editionSize: 50,
  },
  {
    slug: "golden-slope",
    rank: 126,
    title: "Golden Slope",
    collection: "forests",
    collections: ["forests"],
    description:
      "A hillside of aspens blazes gold beneath a summit dusted with the season's first snow.",
    editionSize: 50,
  },
  {
    slug: "autumn-cascade",
    rank: 144,
    title: "Autumn Cascade",
    collection: "water",
    collections: ["water"],
    description:
      "A mountain stream tumbles in silken steps over mossy boulders through a forest turning gold.",
    editionSize: 50,
  },
  {
    slug: "mirror-lake",
    rank: 133,
    title: "Mirror Lake",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "Dark pines and golden aspens ring a glassy lake that mirrors a cloudless sky.",
    editionSize: 50,
  },
  {
    slug: "blue-hour-shore",
    rank: 114,
    title: "Blue Hour Shore",
    collection: "coast",
    collections: ["coast"],
    description:
      "Sea stacks stand in silhouette as the last violet light of evening settles over a quiet tide.",
    editionSize: 50,
  },
  {
    slug: "emerald-falls",
    rank: 35,
    title: "Emerald Falls",
    collection: "water",
    collections: ["water"],
    description:
      "A slender waterfall plunges from a basalt cliff into a lush emerald gorge.",
    editionSize: 50,
  },
  {
    slug: "crimson-sky",
    rank: 22,
    title: "Crimson Sky",
    collection: "sky",
    collections: ["sky"],
    description:
      "A storm of crimson cloud blazes above a darkened mountain ridge in the final minutes of dusk.",
    editionSize: 50,
  },
  {
    slug: "river-strata",
    rank: 111,
    title: "River Strata",
    collection: "canyons",
    collections: ["canyons", "water", "panoramas"],
    description:
      "A silken river slides past fallen slabs beneath towering walls of layered stone.",
    editionSize: 50,
  },
  {
    slug: "sandstone-wave",
    rank: 7,
    title: "Sandstone Wave",
    collection: "canyons",
    collections: ["canyons"],
    description:
      "Reflected light pours through a narrow canyon, turning wind-carved sandstone into rolling waves of orange and gold.",
    editionSize: 50,
  },
  {
    slug: "lone-vigil",
    rank: 33,
    title: "Lone Vigil",
    collection: "wildlife",
    collections: ["wildlife", "black-and-white"],
    description:
      "A fish eagle keeps watch from the twisted arm of a dead tree, stark against a pale, empty sky.",
    editionSize: 50,
  },
  {
    slug: "the-elder",
    rank: 21,
    title: "The Elder",
    collection: "wildlife",
    collections: ["wildlife", "black-and-white"],
    description:
      "A great bull elephant emerges from the darkness, every fold and furrow of a long life etched into its skin.",
    editionSize: 50,
  },
  {
    slug: "above-it-all",
    rank: 12,
    title: "Above It All",
    collection: "wildlife",
    collections: ["wildlife", "black-and-white"],
    description:
      "A young giraffe turns its gaze from the shadows, its patterned neck rising out of total darkness.",
    editionSize: 50,
  },
  {
    slug: "the-king",
    rank: 15,
    title: "The King",
    collection: "wildlife",
    collections: ["wildlife", "black-and-white"],
    description:
      "A lion rests in the shade of the rocks, its heavy mane framing a calm and unwavering stare.",
    editionSize: 50,
  },
  {
    slug: "pride",
    rank: 5,
    title: "Pride",
    collection: "wildlife",
    collections: ["wildlife", "black-and-white"],
    description:
      "A lioness presses close to her mate in a quiet moment of affection beneath the rock walls.",
    editionSize: 50,
  },
  {
    slug: "the-hidden-horn",
    rank: 29,
    title: "The Hidden Horn",
    collection: "wildlife",
    collections: ["wildlife", "black-and-white"],
    description:
      "A cape buffalo peers through tall grass, its great sweeping horns framing a wary stare.",
    editionSize: 50,
  },
  {
    slug: "into-the-mist",
    rank: 123,
    title: "Into the Mist",
    collection: "wildlife",
    collections: ["wildlife", "panoramas"],
    description:
      "A lone gemsbok steps through golden grass as morning mist swallows the plain behind it.",
    editionSize: 50,
  },
  {
    slug: "the-watcher",
    rank: 2,
    title: "The Watcher",
    collection: "wildlife",
    collections: ["wildlife", "black-and-white"],
    description:
      "A leopard lounges on a weathered branch, its golden coat glowing against a forest rendered in silver.",
    editionSize: 50,
  },
  {
    slug: "the-huntress",
    rank: 156,
    title: "The Huntress",
    collection: "wildlife",
    collections: ["wildlife", "black-and-white"],
    description:
      "A lioness pauses in the long grass, ears forward and every muscle ready.",
    editionSize: 50,
  },
  {
    slug: "leap-of-faith",
    rank: 1,
    title: "Leap of Faith",
    collection: "wildlife",
    collections: ["wildlife", "coast", "black-and-white"],
    description:
      "A dolphin arcs clear of the water, its sleek body mirrored in the dark, rippling sea.",
    editionSize: 50,
  },
  {
    slug: "golden-mane",
    rank: 68,
    title: "Golden Mane",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A great maned lion stands in warm light before red stone, gazing out over his domain.",
    editionSize: 50,
  },
  {
    slug: "the-heavyweight",
    rank: 84,
    title: "The Heavyweight",
    collection: "wildlife",
    collections: ["wildlife", "black-and-white"],
    description:
      "A hippo stands squarely in the grass, its heavy frame and steady gaze filling the frame.",
    editionSize: 50,
  },
  {
    slug: "crystal-crown",
    rank: 152,
    title: "Crystal Crown",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A soaring granite summit, streaked with ice and fresh snow, rises into a flawless blue sky.",
    editionSize: 50,
  },
  {
    slug: "twin-horns",
    rank: 182,
    title: "Twin Horns",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Two dark rock horns, laced with snow and ice, tear through drifting cloud high above the valley.",
    editionSize: 50,
  },
  {
    slug: "sea-of-silence",
    rank: 116,
    title: "Sea of Silence",
    collection: "mountains",
    collections: ["mountains", "sky"],
    description:
      "A snow-crowned summit floats above a still sea of cloud in the deep blue of the high mountains.",
    editionSize: 50,
  },
  {
    slug: "cloud-crest",
    rank: 202,
    title: "Cloud Crest",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Cloud spills over a vast wall of ice and rock, its crest catching the bright mountain light.",
    editionSize: 50,
  },
  {
    slug: "breath-of-the-mountain",
    rank: 158,
    title: "Breath of the Mountain",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Storm cloud boils around a hanging glacier as the mountain reveals itself for a fleeting moment.",
    editionSize: 50,
  },
  {
    slug: "turquoise-mesa",
    rank: 142,
    title: "Turquoise Mesa",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "A crown of dark cliffs rises above green alpine slopes and a lake of deep turquoise.",
    editionSize: 50,
  },
  {
    slug: "jagged-horizon",
    rank: 140,
    title: "Jagged Horizon",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Ridge after ridge rolls toward a skyline of jagged peaks beneath towering summer clouds.",
    editionSize: 50,
  },
  {
    slug: "paintbrush-meadow",
    rank: 163,
    title: "Paintbrush Meadow",
    collection: "forests",
    collections: ["forests"],
    description:
      "Wildflowers blaze crimson and gold across a high meadow beneath rolling clouds and green ridges.",
    editionSize: 50,
  },
  {
    slug: "ghost-forest",
    rank: 198,
    title: "Ghost Forest",
    collection: "forests",
    collections: ["forests", "black-and-white"],
    description:
      "Bleached, twisted remains of old trees stand on a steaming mineral flat before a dark wall of pines.",
    editionSize: 50,
  },
  {
    slug: "granite-cathedral",
    rank: 173,
    title: "Granite Cathedral",
    collection: "mountains",
    collections: ["mountains", "black-and-white"],
    description:
      "Jagged granite spires rise in silver light above the sage flats beneath a brooding sky.",
    editionSize: 50,
  },
  {
    slug: "ice-blade",
    rank: 200,
    title: "Ice Blade",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A sharp ridge of rock and hanging ice cuts across a clear blue mountain sky.",
    editionSize: 50,
  },
  {
    slug: "nectar-flight",
    rank: 46,
    title: "Nectar Flight",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A white-lined sphinx moth hovers at a spire of blue delphinium, its striped wings frozen mid-beat.",
    editionSize: 50,
  },
  {
    slug: "river-of-stars",
    rank: 14,
    title: "River of Stars",
    collection: "sky",
    collections: ["sky"],
    description:
      "The Milky Way arcs over a dark mountain ridge as the last trace of twilight fades from the horizon.",
    editionSize: 50,
  },
  {
    slug: "silent-passage",
    rank: 70,
    title: "Silent Passage",
    collection: "canyons",
    collections: ["canyons", "water"],
    description:
      "Smoothed to silk by a long exposure, a great river glides past boulders between towering canyon walls.",
    editionSize: 50,
  },
  {
    slug: "wild-coast",
    rank: 192,
    title: "Wild Coast",
    collection: "coast",
    collections: ["coast"],
    description:
      "Waves fan across a dark-sand bay beneath green sea cliffs that run out into a deep blue ocean.",
    editionSize: 50,
  },
  {
    slug: "canopy-of-gold",
    rank: 147,
    title: "Canopy of Gold",
    collection: "forests",
    collections: ["forests"],
    description:
      "Slender aspen trunks reach into a canopy of glowing gold leaves against a clear blue sky.",
    editionSize: 50,
  },
  {
    slug: "white-giant",
    rank: 170,
    title: "White Giant",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A vast dome of snow and ice crowns a range of granite needles under a deep blue sky.",
    editionSize: 50,
  },
  {
    slug: "the-needle",
    rank: 122,
    title: "The Needle",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A sharp summit of dark rock and snow rises above a sea of ridges and hanging glaciers.",
    editionSize: 50,
  },
  {
    slug: "frozen-ramparts",
    rank: 74,
    title: "Frozen Ramparts",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A ridge of dark granite climbs into a great snow-covered summit, its glaciers bright in the high sun.",
    editionSize: 50,
  },
  {
    slug: "serrated-sky",
    rank: 18,
    title: "Serrated Sky",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A row of jagged granite spires, dusted with snow, cuts across a clear alpine sky.",
    editionSize: 50,
  },
  {
    slug: "firestorm",
    rank: 105,
    title: "Firestorm",
    collection: "sky",
    collections: ["sky"],
    description:
      "Ragged clouds ignite in crimson and orange above a dark ridgeline in the final moments of sunset.",
    editionSize: 50,
  },
  {
    slug: "jade-waters",
    rank: 60,
    title: "Jade Waters",
    collection: "water",
    collections: ["water", "canyons"],
    description:
      "Milky turquoise water flows past moss-covered stones beneath towering red canyon walls.",
    editionSize: 50,
  },
  {
    slug: "travertine-falls",
    rank: 32,
    title: "Travertine Falls",
    collection: "water",
    collections: ["water", "canyons"],
    description:
      "Turquoise water spills over mossy travertine ledges in a hidden red-rock canyon.",
    editionSize: 50,
  },
  {
    slug: "silver-thread",
    rank: 138,
    title: "Silver Thread",
    collection: "water",
    collections: ["water"],
    description:
      "A slender waterfall drops from a sculpted rock lip into a quiet stone alcove.",
    editionSize: 50,
  },
  {
    slug: "afterglow",
    rank: 139,
    title: "Afterglow",
    collection: "sky",
    collections: ["sky", "lakes"],
    description:
      "The sky smoulders orange behind silhouetted mountains, its glow mirrored on the dark water below.",
    editionSize: 50,
  },
  {
    slug: "river-sunburst",
    rank: 41,
    title: "River Sunburst",
    collection: "water",
    collections: ["water", "canyons"],
    description:
      "The sun bursts over a canyon rim as rapids tumble past smooth stones below.",
    editionSize: 50,
  },
  {
    slug: "canyon-rampart",
    rank: 80,
    title: "Canyon Rampart",
    collection: "canyons",
    collections: ["canyons"],
    description:
      "Layered red cliffs glow in afternoon light above a calm green river.",
    editionSize: 50,
  },
  {
    slug: "emerald-pool",
    rank: 63,
    title: "Emerald Pool",
    collection: "water",
    collections: ["water", "canyons", "panoramas"],
    description:
      "Turquoise water pools beneath sweeping walls of polished red stone.",
    editionSize: 50,
  },
  {
    slug: "golden-hillside",
    rank: 110,
    title: "Golden Hillside",
    collection: "forests",
    collections: ["forests", "panoramas"],
    description:
      "Aspens in full autumn colour blanket a steep mountainside, a lone spruce standing dark among the gold.",
    editionSize: 50,
  },
  {
    slug: "forest-cascade",
    rank: 168,
    title: "Forest Cascade",
    collection: "water",
    collections: ["water", "forests"],
    description:
      "A creek spills over mossy boulders in a cool, shaded mountain forest.",
    editionSize: 50,
  },
  {
    slug: "storm-spire",
    rank: 106,
    title: "Storm Spire",
    collection: "mountains",
    collections: ["mountains", "black-and-white"],
    description:
      "A dark granite spire pierces brooding cloud above a steep, snow-streaked ridge.",
    editionSize: 50,
  },
  {
    slug: "cloud-shadows",
    rank: 103,
    title: "Cloud Shadows",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Summer clouds drift over range after range of high peaks, their shadows moving across the slopes.",
    editionSize: 50,
  },
  {
    slug: "headwaters",
    rank: 127,
    title: "Headwaters",
    collection: "water",
    collections: ["water"],
    description:
      "A clear stream runs over a bed of rounded stones toward a distant summit beneath a bright summer sky.",
    editionSize: 50,
  },
  {
    slug: "mirror-dusk",
    rank: 151,
    title: "Mirror Dusk",
    collection: "sky",
    collections: ["sky", "lakes"],
    description:
      "Fiery clouds drift above a dark mountain notch and repeat themselves in the perfectly still water of a lake at dusk.",
    editionSize: 50,
  },
  {
    slug: "autumn-mirror",
    rank: 136,
    title: "Autumn Mirror",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "A hillside of golden aspens and a sky of drifting clouds lie doubled in a quiet beaver pond.",
    editionSize: 50,
  },
  {
    slug: "aspen-script",
    rank: 171,
    title: "Aspen Script",
    collection: "forests",
    collections: ["forests"],
    description:
      "Dark scars and pale bark form a quiet calligraphy across a stand of aspen trunks.",
    editionSize: 50,
  },
  {
    slug: "silver-dunes",
    rank: 135,
    title: "Silver Dunes",
    collection: "canyons",
    collections: ["canyons", "black-and-white"],
    description:
      "Wind-carved dunes roll to the horizon in low light, every ripple and crest drawn in silver and shadow.",
    editionSize: 50,
  },
  {
    slug: "desert-gentleman",
    rank: 132,
    title: "Desert Gentleman",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A camel in a hand-woven muzzle poses in profile against a soft desert sky.",
    editionSize: 50,
  },
  {
    slug: "silken-stream",
    rank: 79,
    title: "Silken Stream",
    collection: "water",
    collections: ["water"],
    description:
      "A long exposure turns a mountain stream to silk as it slips over stones between towering spruce.",
    editionSize: 50,
  },
  {
    slug: "canyon-evening",
    rank: 178,
    title: "Canyon Evening",
    collection: "canyons",
    collections: ["canyons"],
    description:
      "The last warm light catches a line of sandstone cliffs above a broad, calm river.",
    editionSize: 50,
  },
  {
    slug: "canyon-light",
    rank: 129,
    title: "Canyon Light",
    collection: "canyons",
    collections: ["canyons", "water"],
    description:
      "Sunlight blazes on the far walls of a deep canyon while the river below runs cool in shadow.",
    editionSize: 50,
  },
  {
    slug: "storm-over-the-pines",
    rank: 77,
    title: "Storm over the Pines",
    collection: "forests",
    collections: ["forests"],
    description:
      "Storm clouds gather over a dark peak as sunlit pine forest and green meadow fall away below.",
    editionSize: 50,
  },
  {
    slug: "summer-reflection",
    rank: 83,
    title: "Summer Reflection",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "Snow-streaked peaks and dark spruce mirror themselves in a still alpine lake on a summer morning.",
    editionSize: 50,
  },
  {
    slug: "meadow-watch",
    rank: 37,
    title: "Meadow Watch",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A mule deer pauses in a wildflower meadow beneath a wall of jagged red peaks.",
    editionSize: 50,
  },
  {
    slug: "the-old-maple",
    rank: 27,
    title: "The Old Maple",
    collection: "forests",
    collections: ["forests"],
    description:
      "An ancient maple spreads its twisting limbs over a carpet of sunlit moss.",
    editionSize: 50,
  },
  {
    slug: "kindred",
    rank: 69,
    title: "Kindred",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A young kudu turns her great ears toward the camera while her companion grazes behind.",
    editionSize: 50,
  },
  {
    slug: "savanna-sentinel",
    rank: 100,
    title: "Savanna Sentinel",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A lone gemsbok stands tall in golden grass beneath flat-topped acacias.",
    editionSize: 50,
  },
  {
    slug: "springbok",
    rank: 78,
    title: "Springbok",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A springbok ram stands alert at the edge of his grazing herd.",
    editionSize: 50,
  },
  {
    slug: "last-embers",
    rank: 117,
    title: "Last Embers",
    collection: "sky",
    collections: ["sky"],
    description:
      "A dead tree stands silhouetted against storm clouds as the final glow of sunset burns along the horizon.",
    editionSize: 50,
  },
  {
    slug: "painted-hunter",
    rank: 43,
    title: "Painted Hunter",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "An African wild dog lopes through tall grass, its patchwork coat blending with the savanna.",
    editionSize: 50,
  },
  {
    slug: "emerald-climber",
    rank: 54,
    title: "Emerald Climber",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A chameleon creeps along a slender stem, every scale of its jewelled skin in sharp relief against the sky.",
    editionSize: 50,
  },
  {
    slug: "lord-of-the-grass",
    rank: 101,
    title: "Lord of the Grass",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A young male lion rests in lush green grass, gazing out over his territory.",
    editionSize: 50,
  },
  {
    slug: "rising-mist",
    rank: 159,
    title: "Rising Mist",
    collection: "water",
    collections: ["water", "panoramas"],
    description:
      "From high above, a vast river plunges into a chasm and a towering plume of spray rises over the forest.",
    editionSize: 50,
  },
  {
    slug: "open-plains",
    rank: 115,
    title: "Open Plains",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A lone bull elephant walks out of the acacia woodland onto a sea of golden grass.",
    editionSize: 50,
  },
  {
    slug: "granite-tide",
    rank: 102,
    title: "Granite Tide",
    collection: "coast",
    collections: ["coast"],
    description:
      "The sea smooths to mist around rounded granite boulders glowing in soft coastal light.",
    editionSize: 50,
  },
  {
    slug: "emerald-amphitheater",
    rank: 23,
    title: "Emerald Amphitheater",
    collection: "water",
    collections: ["water"],
    description:
      "A slender waterfall drops into a vast bowl of basalt carpeted in moss and fern.",
    editionSize: 50,
  },
  {
    slug: "ancient-mariner",
    rank: 98,
    title: "Ancient Mariner",
    collection: "coast",
    collections: ["coast"],
    description:
      "A green sea turtle glides over a reef crowded with branching coral.",
    editionSize: 50,
  },
  {
    slug: "mountain-staircase",
    rank: 104,
    title: "Mountain Staircase",
    collection: "water",
    collections: ["water"],
    description:
      "Snowmelt tumbles down a staircase of boulders below a high waterfall and dark spruce.",
    editionSize: 50,
  },
  {
    slug: "snowmelt-run",
    rank: 76,
    title: "Snowmelt Run",
    collection: "water",
    collections: ["water"],
    description:
      "A clear mountain river races over smooth stones, a distant waterfall feeding it from the forest above.",
    editionSize: 50,
  },
  {
    slug: "granite-ribbon",
    rank: 26,
    title: "Granite Ribbon",
    collection: "water",
    collections: ["water"],
    description:
      "A ribbon of falling water threads down a towering granite wall framed by pines.",
    editionSize: 50,
  },
  {
    slug: "sapphire-caldera",
    rank: 67,
    title: "Sapphire Caldera",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "Deep blue water fills an ancient volcanic caldera beneath a sky of drifting summer cloud.",
    editionSize: 50,
  },
  {
    slug: "reef-garden",
    rank: 94,
    title: "Reef Garden",
    collection: "coast",
    collections: ["coast"],
    description:
      "A great fan of table coral spreads across the reef as small fish dart through the blue.",
    editionSize: 50,
  },
  {
    slug: "the-great-bend",
    rank: 11,
    title: "The Great Bend",
    collection: "canyons",
    collections: ["canyons", "water"],
    description:
      "A jade-green river carves a perfect horseshoe around a sandstone butte a thousand feet below.",
    editionSize: 50,
  },
  {
    slug: "first-steps",
    rank: 81,
    title: "First Steps",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A young rhino calf stands close beside its mother on sun-baked earth.",
    editionSize: 50,
  },
  {
    slug: "forest-jewel",
    rank: 107,
    title: "Forest Jewel",
    collection: "water",
    collections: ["water", "forests"],
    description:
      "Water spills between moss-covered boulders in a quiet corner of the forest.",
    editionSize: 50,
  },
  {
    slug: "stone-window",
    rank: 160,
    title: "Stone Window",
    collection: "canyons",
    collections: ["canyons"],
    description:
      "A natural sandstone arch frames a distant butte under a clear desert sky.",
    editionSize: 50,
  },
  {
    slug: "little-lion",
    rank: 55,
    title: "Little Lion",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A lion cub rests in lush grass, its sibling dozing close behind.",
    editionSize: 50,
  },
  {
    slug: "granite-valley",
    rank: 179,
    title: "Granite Valley",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Great granite walls fall away into a forested valley as afternoon cloud drifts overhead.",
    editionSize: 50,
  },
  {
    slug: "standoff",
    rank: 47,
    title: "Standoff",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A Cape buffalo bull fixes the camera with a level stare from the tall grass.",
    editionSize: 50,
  },
  {
    slug: "river-horse",
    rank: 75,
    title: "River Horse",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A hippo strides across a grassy bank, an oxpecker riding on its back.",
    editionSize: 50,
  },
  {
    slug: "three-of-a-kind",
    rank: 88,
    title: "Three of a Kind",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "Three zebras stand pressed together, their stripes merging into a single bold pattern.",
    editionSize: 50,
  },
  {
    slug: "meadow-prowler",
    rank: 108,
    title: "Meadow Prowler",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A black-backed jackal pauses among wildflowers, ears tuned to the grass ahead.",
    editionSize: 50,
  },
  {
    slug: "midday-rest",
    rank: 165,
    title: "Midday Rest",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A dark-maned lion sprawls in the shade of fallen timber, eyes narrowed against the heat.",
    editionSize: 50,
  },
  {
    slug: "ocean-fury",
    rank: 157,
    title: "Ocean Fury",
    collection: "coast",
    collections: ["coast"],
    description:
      "A breaking wave explodes against a dark reef in a white burst of spray.",
    editionSize: 50,
  },
  {
    slug: "the-lookout",
    rank: 121,
    title: "The Lookout",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A pied kingfisher keeps watch from a leafy perch against a flawless blue sky.",
    editionSize: 50,
  },
  {
    slug: "lone-lily",
    rank: 141,
    title: "Lone Lily",
    collection: "forests",
    collections: ["forests"],
    description:
      "A single white water lily rises on its slender stem above still, silvered water.",
    editionSize: 50,
  },
  {
    slug: "gentle-giant",
    rank: 145,
    title: "Gentle Giant",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "An elephant bull curls his trunk as he browses at the edge of the woodland.",
    editionSize: 50,
  },
  {
    slug: "painted-earth",
    rank: 166,
    title: "Painted Earth",
    collection: "canyons",
    collections: ["canyons"],
    description:
      "Steam drifts over a vast hot spring whose mineral-rich edges glow in rust and orange.",
    editionSize: 50,
  },
  {
    slug: "fern-cathedral",
    rank: 97,
    title: "Fern Cathedral",
    collection: "forests",
    collections: ["forests"],
    description:
      "Ancient redwood trunks rise like columns from a deep understory of sword ferns.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "winter-quiet",
    rank: 174,
    title: "Winter Quiet",
    collection: "forests",
    collections: ["forests"],
    description:
      "Pale aspen trunks stand in rows across fresh snow beneath a clear winter sky.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "hidden-gaze",
    rank: 34,
    title: "Hidden Gaze",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A young leopard rests in tall green grass beneath a fallen branch, eyes fixed on the lens.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "first-bloom",
    rank: 118,
    title: "First Bloom",
    collection: "forests",
    collections: ["forests"],
    description:
      "A single rose-pink camellia opens its layered petals against deep green leaves.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "the-old-warrior",
    rank: 154,
    title: "The Old Warrior",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A blue wildebeest bull lies in the pale dust, his shaggy mane lit by soft afternoon light.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "golden-beak",
    rank: 51,
    title: "Golden Beak",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A yellow-billed hornbill perches among willowy leaves, its great curved bill catching the light.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "tuxedo-pair",
    rank: 58,
    title: "Tuxedo Pair",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "Two African penguins stand side by side in the sand, one preening the other.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "grooming-hour",
    rank: 40,
    title: "Grooming Hour",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "High in a tree, one baboon patiently grooms another, who gazes calmly back with amber eyes.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "amber-chamber",
    rank: 93,
    title: "Amber Chamber",
    collection: "canyons",
    collections: ["canyons"],
    description:
      "Reflected light glows through the sculpted sandstone walls of a narrow slot canyon.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "quiet-stride",
    rank: 49,
    title: "Quiet Stride",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A cheetah steps across a rain-darkened track, its gaze locked on something beyond the frame.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "wading-party",
    rank: 175,
    title: "Wading Party",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "Three yellow-billed storks probe the shallows, their reflections trembling on the still water.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "on-the-wing",
    rank: 124,
    title: "On the Wing",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A pale chanting goshawk banks against a flawless blue sky, wings spread wide.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "moss-cascade",
    rank: 38,
    title: "Moss Cascade",
    collection: "water",
    collections: ["water", "forests"],
    description:
      "A clear stream slips between moss-covered boulders and ferns in a quiet old-growth forest.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "skyward",
    rank: 48,
    title: "Skyward",
    collection: "forests",
    collections: ["forests"],
    description:
      "Looking straight up the trunks of towering redwoods as they converge toward a pale sky.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "fern-pool",
    rank: 73,
    title: "Fern Pool",
    collection: "water",
    collections: ["water", "forests"],
    description:
      "Tree ferns arch over a still forest pool that mirrors their feathered fronds.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "thundering-mist",
    rank: 44,
    title: "Thundering Mist",
    collection: "water",
    collections: ["water"],
    description:
      "A great river plunges into a deep gorge, throwing towering clouds of spray over the forest.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "birch-sun",
    rank: 150,
    title: "Reaching for the Sun",
    collection: "forests",
    collections: ["forests"],
    description:
      "A slender white trunk climbs into a crown of bright leaves, the sun glowing just beyond.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "beach-patrol",
    rank: 72,
    title: "Beach Patrol",
    collection: "wildlife",
    collections: ["wildlife", "coast"],
    description:
      "African penguins march across the bright sand, their long shadows trailing behind them.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "penguin-portrait",
    rank: 66,
    title: "Formal Attire",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "An African penguin faces the lens against deep blue water, every feather crisp.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "fern-gorge",
    rank: 162,
    title: "Fern Gorge",
    collection: "water",
    collections: ["water", "forests"],
    description:
      "A shallow creek winds through a narrow gorge whose walls are draped in ferns.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "tropic-flame",
    rank: 130,
    title: "Tropic Flame",
    collection: "forests",
    collections: ["forests"],
    description:
      "A hibiscus bloom flares from deep crimson to gold against dark tropical leaves.",
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

const ranked = [...catalogWorks].sort((a, b) => a.rank - b.rank);

/** Signature Works: the top-ranked listed works (Lik's "Premier Images"). */
export const SIGNATURE_COUNT = 24;
const signature = new Set(ranked.filter((w) => !w.webOnly).slice(0, SIGNATURE_COUNT).map((w) => w.slug));

/** All works, best first (by `rank`). Every listing derives from this order. */
export const works: Work[] = ranked.map((w) => (signature.has(w.slug) ? { ...w, collections: [...w.collections, 'signature'] } : w));

export function getWork(slug: string) {
  return works.find((w) => w.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

/** Works in a gallery, best first. A work can appear in several galleries. */
export function getWorksInCollection(slug: string) {
  return works.filter((w) => w.collections.includes(slug as CollectionSlug) && !w.webOnly);
}

/** Galleries a work appears in, in gallery order. */
export function getCollectionsForWork(work: Work) {
  return collections.filter((c) => work.collections.includes(c.slug));
}

/** Home hero: the eight top-ranked listed works. */
export function getHeroWorks() {
  return works.filter((w) => !w.webOnly).slice(0, 8);
}

export function getNewReleases() {
  return works.filter((w) => w.isNew);
}

export function getBestSellers() {
  return works.filter((w) => w.bestSeller);
}

/** Minimum print resolution: a size is only offered when the work's master holds at least this many pixels per inch. */
export const MIN_PRINT_PPI = 150;

/** Print sizes this work's master can support at MIN_PRINT_PPI (long edge vs long edge). */
export function sizesFor(slug: string) {
  const portrait = isPortrait(slug);
  const master = masterLongEdge[slug] ?? 0;
  return PRINT_SIZES.filter((s) => master >= s.long * MIN_PRINT_PPI).map((s) => ({
    ...s,
    dimensions: portrait ? `${s.short}" × ${s.long}"` : `${s.long}" × ${s.short}"`,
  }));
}

/** The supported size with this name, or undefined when the work can't be printed that large. */
export function sizeFor(slug: string, name: string) {
  return sizesFor(slug).find((s) => s.name === name);
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
  url: 'https://sheldonroth.com',
};
