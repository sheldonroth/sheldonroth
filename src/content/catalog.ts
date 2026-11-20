import { imageSizes } from './image-sizes';
import { masterLongEdge } from './master-sizes';
import { LEGACY_SIZE_NAMES, PREMIER_SLUGS, PRINT_FORMATS, PRINT_FORMATS_2X1, TIERS, sizeLabel, type SizeKey, type Tier } from './pricing';

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
  /** Pricing tier (see pricing.ts): derived from rank, never set by hand. */
  tier: Tier;
  /** Prints in the edition, shared across all sizes (set by the tier). */
  editionSize: number;
  isNew?: boolean;
  /** Hand-picked for the home page "Curator's Picks" row. A curatorial choice, not a sales claim. */
  curatorsPick?: boolean;
  /** Curated fine-art ranking, 1 = strongest. Drives display order everywhere works are listed. */
  rank: number;
  /** On the site with its own page, but kept out of the main galleries */
  webOnly?: boolean;
}

/** A work as written in the catalog below; tier and edition are added from its rank. */
type CatalogWork = Omit<Work, 'tier' | 'editionSize'>;

export interface PrintSize {
  /** Size key stored in carts, Stripe and the edition table, e.g. "30x20". */
  name: SizeKey;
  /** Display label turned for the work's orientation, e.g. `30" × 20"`. */
  dimensions: string;
  long: number;
  short: number;
  /** Opening (step 1) price for this work's tier. The live price comes from the ladder (see pricing.ts). */
  price: number;
}

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
      'The photographs that define the collection — rare light, extraordinary encounters and wild places at their most powerful. The strongest works in the portfolio, each released as a strictly limited edition and face-mounted to museum acrylic. These are the images collectors most often live with at large format.',
    cover: 'leap-of-faith',
    curated: true,
  },
  {
    slug: 'mountains',
    title: 'Mountains',
    tagline: 'Summits, glaciers and alpenglow',
    description:
      'Razor ridges above the cloud, rivers of ancient ice and the last warm light on fresh snow — the high peaks in all their scale and silence. These large-format landscape photographs are printed as archival Lumachrome acrylic editions, made to hold a wall without losing the detail of ice, rock and air.',
    cover: 'ice-spires',
  },
  {
    slug: 'lakes',
    title: 'Lakes & Reflections',
    tagline: 'Still water beneath the peaks',
    description:
      'Turquoise tarns cradled in stone, mirror-calm water at dusk and sapphire basins ringed by snow — the quiet jewels of the high country. Still water and reflection reward a large print, where colour and fine detail can be read across a room.',
    cover: 'cloud-lake',
  },
  {
    slug: 'water',
    title: 'Waterfalls & Rivers',
    tagline: 'The living energy of moving water',
    description:
      'Falls pouring through hidden grottos, jade rivers winding between canyon walls and streams tumbling through moss — water in constant, graceful motion. Each work is a limited-edition acrylic print, chosen for the way moving water holds light.',
    cover: 'canyon-song',
  },
  {
    slug: 'canyons',
    title: 'Canyons & Desert',
    tagline: 'Stone sculpted by time',
    description:
      'Slot canyons glowing like embers, sweeping river bends and wind-written dunes — rock and sand shaped over millennia by water, wind and light. These desert and canyon photographs are released as signed, limited editions, often at the larger sizes that let the stone’s colour and curve fill a wall.',
    cover: 'sandstone-wave',
  },
  {
    slug: 'forests',
    title: 'Forests & Flora',
    tagline: 'The quiet majesty of growing things',
    description:
      'Ancient maples, cathedral groves and aspens turned to gold, with single blooms caught in perfect light — the forest and its flowers at their most luminous. Printed face-mounted to acrylic, the work keeps the quiet depth of the canopy and the fine texture of bark, moss and petal.',
    cover: 'living-sculpture',
  },
  {
    slug: 'coast',
    title: 'Coast & Ocean',
    tagline: 'Colour, clarity and the power of the sea',
    description:
      'Sea stacks at dusk, reefs and islands seen from above, crystal shallows and restless surf — the endless moods of the ocean. This gallery includes coastal landscapes and underwater fine art prints, each a limited edition made for large-format acrylic display.',
    cover: 'sea-monolith',
  },
  {
    slug: 'sky',
    title: 'Sky & Light',
    tagline: 'Fleeting moments of fire and gold',
    description:
      'Skies set ablaze, stars wheeling over dark ridges and seas of cloud catching the dawn — the rare moments when light transforms everything. These photographs of fleeting light are printed as archival acrylic editions, so the colour of a brief sky can hold a room.',
    cover: 'river-of-stars',
  },
  {
    slug: 'wildlife',
    title: 'Wildlife',
    tagline: 'Portraits of the wild',
    description:
      'A leopard watching from the shadows, lions at rest and elephants emerging from darkness — intimate portraits of the great animals of the wild. Each wildlife fine art photograph is a signed, limited edition, printed at a size that preserves the texture of fur, feather and the look that met the lens.',
    cover: 'the-watcher',
  },
  {
    slug: 'black-and-white',
    title: 'Black & White',
    tagline: 'Form, texture and shadow',
    description:
      'Stripped of colour, gesture and texture take centre stage — the raw character of the wild and the high peaks in pure monochrome. These black-and-white editions are printed with the same Lumachrome acrylic process, so form and shadow remain sharp at large format.',
    cover: 'pride',
  },
  {
    slug: 'panoramas',
    title: 'Panoramas',
    tagline: 'The horizon, end to end',
    description:
      'Sweeping vistas that carry the horizon across the wall — mountain ranges, lakes and burning skies captured in their full breadth. Selected works are offered in 2:1 panoramic sizes, such as 36 × 18 in, made for wide walls where a standard 3:2 print would crop the view.',
    cover: 'above-the-clouds',
  },
];

const catalogWorks: CatalogWork[] = [
  {
    slug: "sunstar-valley",
    rank: 45,
    title: "Sunstar Valley",
    collection: "mountains",
    collections: ["mountains", "sky"],
    description:
      "The sun bursts over a high ridge and pours light down a deep mountain valley, layer after layer of peaks fading into the haze.",
  },
  {
    slug: "alpenglow",
    rank: 132,
    title: "Alpenglow",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Fresh snow and fluted ice catch the last warm light as a great summit rises into a deep blue sky.",
    curatorsPick: true,
  },
  {
    slug: "above-the-clouds",
    rank: 30,
    title: "Above the Clouds",
    collection: "mountains",
    collections: ["mountains", "panoramas"],
    description:
      "Twin summits stand clear above a sea of cloud, their ridgelines sharp against an endless blue.",
    curatorsPick: true,
  },
  {
    slug: "cloud-tide",
    rank: 25,
    title: "Cloud Tide",
    collection: "sky",
    collections: ["sky"],
    description:
      "A tide of cloud spills over a sheer escarpment and dissolves into the valley below, slow as breath.",
  },
  {
    slug: "glacial-jewel",
    rank: 16,
    title: "Glacial Jewel",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "A turquoise lake glows in a basin of red and green stone, fed by the snowfields that cradle it.",
    curatorsPick: true,
  },
  {
    slug: "sky-on-fire",
    rank: 124,
    title: "Sky on Fire",
    collection: "sky",
    collections: ["sky", "panoramas"],
    description:
      "The whole sky ignites in crimson and gold above still water, mirrored in a single burning moment.",
  },
  {
    slug: "wildflower-basin",
    rank: 116,
    title: "Wildflower Basin",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "A carpet of magenta wildflowers runs to the foot of the peaks in a high summer basin.",
  },
  {
    slug: "granite-throne",
    rank: 129,
    title: "Granite Throne",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A sculpted granite spire stands enthroned above its glaciers, every ridge drawn in light and shadow.",
    curatorsPick: true,
  },
  {
    slug: "glacier-frame",
    rank: 171,
    title: "Glacier Frame",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Forest and stone frame a hanging glacier as it pours from the summit snows.",
  },
  {
    slug: "snow-range",
    rank: 195,
    title: "Snow Range",
    collection: "mountains",
    collections: ["mountains", "panoramas"],
    description:
      "A long wall of snow-covered peaks stretches across the horizon in a sweeping panorama.",
  },
  {
    slug: "sentinel",
    rank: 50,
    title: "Sentinel",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A lone summit rises above the cloud, a white sentinel watching over the valley.",
  },
  {
    slug: "rising-pyramid",
    rank: 150,
    title: "Rising Pyramid",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A perfect pyramid of rock and ice climbs out of the drifting cloud.",
  },
  {
    slug: "roof-of-the-world",
    rank: 60,
    title: "Roof of the World",
    collection: "mountains",
    collections: ["mountains", "panoramas"],
    description:
      "The highest ridges break through the cloud in a vast panorama of rock, snow and sky.",
  },
  {
    slug: "frozen-symphony",
    rank: 57,
    title: "Frozen Symphony",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Towers of glacier ice rise in fluted columns, a frozen symphony of light and form.",
  },
  {
    slug: "valley-of-giants",
    rank: 153,
    title: "Valley of Giants",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Giant peaks line a deep forested valley under a sky of drifting cloud.",
  },
  {
    slug: "ice-spires",
    rank: 13,
    title: "Ice Spires",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Spires of glacier ice stand guard before a skyline of jagged peaks.",
  },
  {
    slug: "monarch-of-ice",
    rank: 159,
    title: "Monarch of Ice",
    collection: "mountains",
    collections: ["mountains", "panoramas"],
    description:
      "A broad monarch of a mountain wears its glaciers like a mantle of light.",
  },
  {
    slug: "glaciers-edge",
    rank: 88,
    title: "Glacier's Edge",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A river of ice carves its way down between forested ridges toward the valley floor.",
  },
  {
    slug: "cloud-lake",
    rank: 3,
    title: "Cloud Lake",
    collection: "lakes",
    collections: ["lakes", "panoramas"],
    description:
      "A milky blue lake lies beneath rugged peaks as clouds build over the high country.",
  },
  {
    slug: "rhododendron-valley",
    rank: 198,
    title: "Rhododendron Valley",
    collection: "mountains",
    collections: ["mountains", "forests"],
    description:
      "Rhododendrons blaze red beneath a steep valley of snow-dusted peaks.",
  },
  {
    slug: "storm-lake",
    rank: 65,
    title: "Storm Lake",
    collection: "lakes",
    collections: ["lakes", "panoramas"],
    description:
      "Storm light falls across a high alpine lake ringed by snow-streaked ridges.",
  },
  {
    slug: "bands-of-light",
    rank: 63,
    title: "Bands of Light",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Bands of late sun sweep across rolling green ridges, sculpting every fold of the land.",
  },
  {
    slug: "mist-veil",
    rank: 201,
    title: "Mist Veil",
    collection: "mountains",
    collections: ["mountains", "panoramas"],
    description:
      "Mist drifts over a forested ridge as the peak beyond slips in and out of view.",
  },
  {
    slug: "lake-and-summit",
    rank: 53,
    title: "Lake and Summit",
    collection: "lakes",
    collections: ["lakes", "mountains"],
    description:
      "A dark mountain lake gathers the reflection of a snowy summit at dusk.",
  },
  {
    slug: "heart-of-the-mountains",
    rank: 6,
    title: "Heart of the Mountains",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "A small island of turquoise water sits at the heart of a vast mountain amphitheatre.",
  },
  {
    slug: "alpine-bloom",
    rank: 184,
    title: "Alpine Bloom",
    collection: "forests",
    collections: ["forests"],
    description:
      "Wildflowers bloom along a high trail as the peaks rise behind them.",
  },
  {
    slug: "snowfield-mirror",
    rank: 117,
    title: "Snowfield Mirror",
    collection: "mountains",
    collections: ["mountains", "lakes"],
    description:
      "A dark volcanic crag rises above lingering snowfields under a wind-swept sky.",
  },
  {
    slug: "painted-mountain",
    rank: 66,
    title: "Painted Mountain",
    collection: "mountains",
    collections: ["mountains", "panoramas"],
    description:
      "A mountain painted in rust and gold glows above a dark green forest.",
  },
  {
    slug: "emerald-ribbons",
    rank: 188,
    title: "Emerald Ribbons",
    collection: "water",
    collections: ["water"],
    description:
      "Ribbons of water cascade over mossy rock in a hidden emerald glen.",
  },
  {
    slug: "blue-ribbon",
    rank: 42,
    title: "Blue Ribbon",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "A ribbon of deep blue water winds between steep green mountainsides.",
  },
  {
    slug: "hidden-falls",
    rank: 92,
    title: "Hidden Falls",
    collection: "water",
    collections: ["water"],
    description:
      "A curtain of water pours through a stone grotto, softened to silk by a long exposure.",
  },
  {
    slug: "liquid-jade",
    rank: 62,
    title: "Liquid Jade",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "Jade-green water fills a quiet basin beneath steep alpine slopes.",
  },
  {
    slug: "sapphire-basin",
    rank: 31,
    title: "Sapphire Basin",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "A sapphire lake rests in a high basin beneath snow-streaked peaks and a sky of streaming cloud.",
  },
  {
    slug: "range-of-light",
    rank: 165,
    title: "Range of Light",
    collection: "mountains",
    collections: ["mountains", "panoramas"],
    description:
      "An entire range of snowy peaks glows beneath towering summer clouds.",
  },
  {
    slug: "high-country",
    rank: 180,
    title: "High Country",
    collection: "mountains",
    collections: ["mountains", "panoramas"],
    description:
      "Snowy summits and green ridges roll away beneath a bright summer sky.",
  },
  {
    slug: "eye-of-the-mountain",
    rank: 157,
    title: "Eye of the Mountain",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "A thawing lake opens like an eye in the snow, its floating ice a pale pupil.",
  },
  {
    slug: "gold-forest",
    rank: 89,
    title: "Gold Forest",
    collection: "forests",
    collections: ["forests"],
    description:
      "The setting sun blazes through ancient trees, turning the forest floor to gold.",
  },
  {
    slug: "table-of-the-gods",
    rank: 173,
    title: "Table of the Gods",
    collection: "canyons",
    collections: ["canyons", "panoramas"],
    description:
      "A great flat-topped mountain rises above the sea, its sheer cliffs lit by evening sun.",
  },
  {
    slug: "swirling-sands",
    rank: 28,
    title: "Swirling Sands",
    collection: "coast",
    collections: ["coast"],
    description:
      "From above, white sand and turquoise water swirl together in endless patterns.",
  },
  {
    slug: "coral-symphony",
    rank: 24,
    title: "Coral Symphony",
    collection: "coast",
    collections: ["coast"],
    description:
      "Vibrant coral formations create a natural symphony of colour and texture beneath the waves — a celebration of the reef seen from above.",
    curatorsPick: true,
  },
  {
    slug: "island-paradise",
    rank: 94,
    title: "Island Paradise",
    collection: "coast",
    collections: ["coast"],
    description:
      "A pristine island floats between azure sky and turquoise sea, the essence of paradise untouched by time.",
  },
  {
    slug: "turquoise-depths",
    rank: 207,
    title: "Turquoise Depths",
    collection: "coast",
    collections: ["coast"],
    description:
      "Crystal-clear water reveals layer upon layer of turquoise, inviting the eye into a serene world below the cliffs.",
    curatorsPick: true,
  },
  {
    slug: "pacific-edge",
    rank: 205,
    title: "Pacific Edge",
    collection: "coast",
    collections: ["coast", "panoramas"],
    description:
      "Dramatic coastal rock meets the open ocean in a sweeping panorama that captures the raw energy of the shoreline.",
  },
  {
    slug: "sentinel-tree",
    rank: 20,
    title: "Sentinel Tree",
    collection: "forests",
    collections: ["forests"],
    description:
      "A lone weathered tree stands sentinel over golden grassland beneath a soft, open sky.",
  },
  {
    slug: "wind-script",
    rank: 100,
    title: "Wind Script",
    collection: "canyons",
    collections: ["canyons"],
    description:
      "The wind writes in sand, ridges of light and shadow traced across the dunes.",
  },
  {
    slug: "massif-from-the-water",
    rank: 199,
    title: "Massif from the Water",
    collection: "coast",
    collections: ["coast"],
    description:
      "A long mountain massif rises from a calm blue sea, softened by distance and haze.",
  },
  {
    slug: "sea-stack",
    rank: 193,
    title: "Sea Stack",
    collection: "coast",
    collections: ["coast"],
    description:
      "A rugged stack of rock rises from deep blue water beneath a cloudless sky.",
  },
  {
    slug: "veil-of-cloud",
    rank: 135,
    title: "Veil of Cloud",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Cloud gathers around a towering peak, revealing its summit for only a moment.",
    webOnly: true,
  },
  {
    slug: "first-light",
    rank: 176,
    title: "First Light",
    collection: "sky",
    collections: ["sky", "panoramas"],
    description:
      "The first light of day touches a distant snowy summit above a dark, quiet land.",
    webOnly: true,
  },
  {
    slug: "blue-cathedral",
    rank: 192,
    title: "Blue Cathedral",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Inside the glacier, walls of blue ice rise like the vaults of a cathedral.",
    webOnly: true,
  },
  {
    slug: "sheer-majesty",
    rank: 99,
    title: "Sheer Majesty",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A sheer face of rock and hanging ice drops from summit to valley in one sweeping line.",
    webOnly: true,
  },
  {
    slug: "emerald-basin",
    rank: 103,
    title: "Emerald Basin",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "Emerald water fills a high basin beneath a ring of weathered peaks.",
    webOnly: true,
  },
  {
    slug: "wild-water",
    rank: 185,
    title: "Wild Water",
    collection: "water",
    collections: ["water"],
    description:
      "Whitewater thunders through a forested gorge, wild and unrelenting.",
    webOnly: true,
  },
  {
    slug: "travertine",
    rank: 194,
    title: "Travertine",
    collection: "canyons",
    collections: ["canyons"],
    description:
      "Terraces of stone and water step down the hillside in layers of cream and gold.",
    webOnly: true,
  },
  {
    slug: "autumn-majesty",
    rank: 181,
    title: "Autumn Majesty",
    collection: "forests",
    collections: ["forests", "panoramas"],
    description:
      "Aspens turn to gold beneath snow-dusted peaks in the first days of autumn.",
    webOnly: true,
  },
  {
    slug: "crystal-shores",
    rank: 190,
    title: "Crystal Shores",
    collection: "coast",
    collections: ["coast"],
    description:
      "White sand meets clear turquoise water along a quiet, forested shore.",
    webOnly: true,
  },
  {
    slug: "high-valley",
    rank: 189,
    title: "High Valley",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A green valley climbs toward rugged peaks under a bright, cloud-filled sky.",
    webOnly: true,
  },
  {
    slug: "ember-sky",
    rank: 152,
    title: "Ember Sky",
    collection: "sky",
    collections: ["sky", "panoramas"],
    description:
      "Clouds catch fire above a darkening ridge as the last light of evening sweeps across the sky.",
  },
  {
    slug: "horizon-burn",
    rank: 203,
    title: "Horizon Burn",
    collection: "sky",
    collections: ["sky", "coast", "panoramas"],
    description:
      "A band of molten gold burns along the horizon as twilight deepens over calm water.",
  },
  {
    slug: "last-light",
    rank: 187,
    title: "Last Light",
    collection: "sky",
    collections: ["sky", "panoramas"],
    description:
      "Layered ridgelines dissolve into haze beneath a sky fading from gold to rose.",
  },
  {
    slug: "terraced-meadow",
    rank: 138,
    title: "Terraced Meadow",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Ancient terraced fields glow green beneath towering snow peaks in clear morning light.",
  },
  {
    slug: "gilded-sky",
    rank: 197,
    title: "Gilded Sky",
    collection: "sky",
    collections: ["sky"],
    description:
      "The sky erupts in gold as the sun slips beneath a line of silhouetted trees.",
  },
  {
    slug: "rose-summit",
    rank: 73,
    title: "Rose Summit",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A great summit turns rose and copper in the soft afterglow of a high-country dusk.",
  },
  {
    slug: "golden-tide",
    rank: 191,
    title: "Golden Tide",
    collection: "sky",
    collections: ["sky", "coast"],
    description:
      "The setting sun lays a path of gold across the sea toward a rugged, wave-washed shore.",
  },
  {
    slug: "morning-mist",
    rank: 200,
    title: "Morning Mist",
    collection: "sky",
    collections: ["sky"],
    description:
      "Sunrise sets drifting mist aglow over still water, a lone tree standing at the shore.",
  },
  {
    slug: "storm-light",
    rank: 147,
    title: "Storm Light",
    collection: "mountains",
    collections: ["mountains", "panoramas"],
    description:
      "Snow-dusted peaks break through parting storm clouds above a quiet valley.",
  },
  {
    slug: "canyon-song",
    rank: 4,
    title: "Canyon Song",
    collection: "water",
    collections: ["water", "canyons"],
    description:
      "Turquoise water spills over mossy boulders between towering walls of layered stone.",
  },
  {
    slug: "secret-grotto",
    rank: 9,
    title: "Secret Grotto",
    collection: "water",
    collections: ["water"],
    description:
      "A ribbon of falling water glows green beneath a stone arch deep inside a hidden canyon.",
  },
  {
    slug: "golden-grove",
    rank: 39,
    title: "Golden Grove",
    collection: "forests",
    collections: ["forests"],
    description:
      "Pale trunks rise through a blaze of autumn gold in a quiet mountain grove.",
  },
  {
    slug: "stone-spires",
    rank: 168,
    title: "Stone Spires",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A forest of fluted stone spires climbs toward the sky, every rib and gully carved sharp by wind and ice.",
  },
  {
    slug: "cloud-weave",
    rank: 141,
    title: "Cloud Weave",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Clouds weave through a vast wall of ice and rock as the high peaks emerge from the drifting mist.",
  },
  {
    slug: "ice-valley",
    rank: 36,
    title: "Ice Valley",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Cloud pours through a vast glacial valley ringed by jagged, snow-bound peaks.",
  },
  {
    slug: "ocean-of-cloud",
    rank: 85,
    title: "Ocean of Cloud",
    collection: "mountains",
    collections: ["mountains", "sky"],
    description:
      "Snow-clad summits stand above a still ocean of cloud that fills the valleys far below.",
  },
  {
    slug: "winter-crown",
    rank: 54,
    title: "Winter Crown",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A great pyramid of rock and ice crowns the range, its snow-laced ridges sharp against a deep blue sky.",
  },
  {
    slug: "summit-cloud",
    rank: 123,
    title: "Summit Cloud",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A single cloud drifts past a soaring pyramid of rock and snow in the clear high-altitude air.",
  },
  {
    slug: "spindrift",
    rank: 113,
    title: "Spindrift",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "High winds tear a plume of spindrift from a towering wall of snow and ice.",
  },
  {
    slug: "canyon-glow",
    rank: 17,
    title: "Canyon Glow",
    collection: "canyons",
    collections: ["canyons"],
    description:
      "Sunlight bursts through a sculpted sandstone arch, setting the smooth canyon walls aglow in shades of fire.",
  },
  {
    slug: "sandstone-flame",
    rank: 90,
    title: "Sandstone Flame",
    collection: "canyons",
    collections: ["canyons"],
    description:
      "Wind- and water-carved sandstone curls upward like a frozen flame toward a sliver of blue sky.",
  },
  {
    slug: "molten-lake",
    rank: 19,
    title: "Molten Lake",
    collection: "sky",
    collections: ["sky", "lakes"],
    description:
      "The last light of day turns a mountain lake to molten gold beneath a sky of rose and violet.",
  },
  {
    slug: "dune-lines",
    rank: 93,
    title: "Dune Lines",
    collection: "canyons",
    collections: ["canyons"],
    description:
      "Wind-drawn ripples sweep across the flank of a great dune, rising to a crest against the evening sky.",
  },
  {
    slug: "tidewater-stones",
    rank: 58,
    title: "Tidewater Stones",
    collection: "coast",
    collections: ["coast"],
    description:
      "Surf washes over a beach of smooth dark stones while a green sea cliff stands against the open ocean.",
  },
  {
    slug: "three-veils",
    rank: 95,
    title: "Three Veils",
    collection: "water",
    collections: ["water"],
    description:
      "Three ribbons of white water fall through a moss-draped gorge into a still, misty pool.",
  },
  {
    slug: "living-sculpture",
    rank: 8,
    title: "Living Sculpture",
    collection: "forests",
    collections: ["forests"],
    description:
      "The twisting limbs of an ancient maple spread beneath a glowing canopy of gold and green.",
  },
  {
    slug: "sea-monolith",
    rank: 10,
    title: "Sea Monolith",
    collection: "coast",
    collections: ["coast", "sky"],
    description:
      "A great sea monolith stands dark against a brooding sky as the tide slips across the sand.",
  },
  {
    slug: "golden-slope",
    rank: 130,
    title: "Golden Slope",
    collection: "forests",
    collections: ["forests"],
    description:
      "A hillside of aspens blazes gold beneath a summit dusted with the season's first snow.",
  },
  {
    slug: "autumn-cascade",
    rank: 148,
    title: "Autumn Cascade",
    collection: "water",
    collections: ["water"],
    description:
      "A mountain stream tumbles in silken steps over mossy boulders through a forest turning gold.",
  },
  {
    slug: "mirror-lake",
    rank: 137,
    title: "Mirror Lake",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "Dark pines and golden aspens ring a glassy lake that mirrors a cloudless sky.",
  },
  {
    slug: "blue-hour-shore",
    rank: 118,
    title: "Blue Hour Shore",
    collection: "coast",
    collections: ["coast"],
    description:
      "Sea stacks stand in silhouette as the last violet light of evening settles over a quiet tide.",
  },
  {
    slug: "emerald-falls",
    rank: 35,
    title: "Emerald Falls",
    collection: "water",
    collections: ["water"],
    description:
      "A slender waterfall plunges from a basalt cliff into a lush emerald gorge.",
  },
  {
    slug: "crimson-sky",
    rank: 22,
    title: "Crimson Sky",
    collection: "sky",
    collections: ["sky"],
    description:
      "A storm of crimson cloud blazes above a darkened mountain ridge in the final minutes of dusk.",
  },
  {
    slug: "river-strata",
    rank: 115,
    title: "River Strata",
    collection: "canyons",
    collections: ["canyons", "water", "panoramas"],
    description:
      "A silken river slides past fallen slabs beneath towering walls of layered stone.",
  },
  {
    slug: "sandstone-wave",
    rank: 7,
    title: "Sandstone Wave",
    collection: "canyons",
    collections: ["canyons"],
    description:
      "Reflected light pours through a narrow canyon, turning wind-carved sandstone into rolling waves of orange and gold.",
  },
  {
    slug: "lone-vigil",
    rank: 33,
    title: "Lone Vigil",
    collection: "wildlife",
    collections: ["wildlife", "black-and-white"],
    description:
      "A fish eagle keeps watch from the twisted arm of a dead tree, stark against a pale, empty sky.",
  },
  {
    slug: "the-elder",
    rank: 21,
    title: "The Elder",
    collection: "wildlife",
    collections: ["wildlife", "black-and-white"],
    description:
      "A great bull elephant emerges from the darkness, every fold and furrow of a long life etched into its skin.",
  },
  {
    slug: "above-it-all",
    rank: 12,
    title: "Above It All",
    collection: "wildlife",
    collections: ["wildlife", "black-and-white"],
    description:
      "A young giraffe turns its gaze from the shadows, its patterned neck rising out of total darkness.",
  },
  {
    slug: "the-king",
    rank: 15,
    title: "The King",
    collection: "wildlife",
    collections: ["wildlife", "black-and-white"],
    description:
      "A lion rests in the shade of the rocks, its heavy mane framing a calm and unwavering stare.",
  },
  {
    slug: "pride",
    rank: 5,
    title: "Pride",
    collection: "wildlife",
    collections: ["wildlife", "black-and-white"],
    description:
      "A lioness presses close to her mate in a quiet moment of affection beneath the rock walls.",
  },
  {
    slug: "the-hidden-horn",
    rank: 29,
    title: "The Hidden Horn",
    collection: "wildlife",
    collections: ["wildlife", "black-and-white"],
    description:
      "A cape buffalo peers through tall grass, its great sweeping horns framing a wary stare.",
  },
  {
    slug: "into-the-mist",
    rank: 127,
    title: "Into the Mist",
    collection: "wildlife",
    collections: ["wildlife", "panoramas"],
    description:
      "A lone gemsbok steps through golden grass as morning mist swallows the plain behind it.",
  },
  {
    slug: "the-watcher",
    rank: 2,
    title: "The Watcher",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A leopard lounges on a weathered branch, one paw trailing down the trunk, its golden coat glowing against a deep green forest.",
  },
  {
    slug: "the-huntress",
    rank: 160,
    title: "The Huntress",
    collection: "wildlife",
    collections: ["wildlife", "black-and-white"],
    description:
      "A lioness pauses in the long grass, ears forward and every muscle ready.",
  },
  {
    slug: "leap-of-faith",
    rank: 1,
    title: "Leap of Faith",
    collection: "wildlife",
    collections: ["wildlife", "coast"],
    description:
      "A dolphin arcs clear of the water, its sleek body mirrored in the rippling blue sea.",
  },
  {
    slug: "golden-mane",
    rank: 70,
    title: "Golden Mane",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A great maned lion stands in warm light before red stone, gazing out over his domain.",
  },
  {
    slug: "the-heavyweight",
    rank: 87,
    title: "The Heavyweight",
    collection: "wildlife",
    collections: ["wildlife", "black-and-white"],
    description:
      "A hippo stands squarely in the grass, its heavy frame and steady gaze filling the frame.",
  },
  {
    slug: "crystal-crown",
    rank: 156,
    title: "Crystal Crown",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A soaring granite summit, streaked with ice and fresh snow, rises into a flawless blue sky.",
  },
  {
    slug: "twin-horns",
    rank: 186,
    title: "Twin Horns",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Two dark rock horns, laced with snow and ice, tear through drifting cloud high above the valley.",
  },
  {
    slug: "sea-of-silence",
    rank: 120,
    title: "Sea of Silence",
    collection: "mountains",
    collections: ["mountains", "sky"],
    description:
      "A snow-crowned summit floats above a still sea of cloud in the deep blue of the high mountains.",
  },
  {
    slug: "cloud-crest",
    rank: 206,
    title: "Cloud Crest",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Cloud spills over a vast wall of ice and rock, its crest catching the bright mountain light.",
  },
  {
    slug: "breath-of-the-mountain",
    rank: 162,
    title: "Breath of the Mountain",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Storm cloud boils around a hanging glacier as the mountain reveals itself for a fleeting moment.",
  },
  {
    slug: "turquoise-mesa",
    rank: 146,
    title: "Turquoise Mesa",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "A crown of dark cliffs rises above green alpine slopes and a lake of deep turquoise.",
  },
  {
    slug: "jagged-horizon",
    rank: 144,
    title: "Jagged Horizon",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Ridge after ridge rolls toward a skyline of jagged peaks beneath towering summer clouds.",
  },
  {
    slug: "paintbrush-meadow",
    rank: 167,
    title: "Paintbrush Meadow",
    collection: "forests",
    collections: ["forests"],
    description:
      "Wildflowers blaze crimson and gold across a high meadow beneath rolling clouds and green ridges.",
  },
  {
    slug: "ghost-forest",
    rank: 202,
    title: "Ghost Forest",
    collection: "forests",
    collections: ["forests", "black-and-white"],
    description:
      "Bleached, twisted remains of old trees stand on a steaming mineral flat before a dark wall of pines.",
  },
  {
    slug: "granite-cathedral",
    rank: 177,
    title: "Granite Cathedral",
    collection: "mountains",
    collections: ["mountains", "black-and-white"],
    description:
      "Jagged granite spires rise in silver light above the sage flats beneath a brooding sky.",
  },
  {
    slug: "ice-blade",
    rank: 204,
    title: "Ice Blade",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A sharp ridge of rock and hanging ice cuts across a clear blue mountain sky.",
  },
  {
    slug: "nectar-flight",
    rank: 46,
    title: "Nectar Flight",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A white-lined sphinx moth hovers at a spire of blue delphinium, its striped wings frozen mid-beat.",
  },
  {
    slug: "river-of-stars",
    rank: 14,
    title: "River of Stars",
    collection: "sky",
    collections: ["sky"],
    description:
      "The Milky Way arcs over a dark mountain ridge as the last trace of twilight fades from the horizon.",
  },
  {
    slug: "silent-passage",
    rank: 72,
    title: "Silent Passage",
    collection: "canyons",
    collections: ["canyons", "water"],
    description:
      "Smoothed to silk by a long exposure, a great river glides past boulders between towering canyon walls.",
  },
  {
    slug: "wild-coast",
    rank: 196,
    title: "Wild Coast",
    collection: "coast",
    collections: ["coast"],
    description:
      "Waves fan across a dark-sand bay beneath green sea cliffs that run out into a deep blue ocean.",
  },
  {
    slug: "canopy-of-gold",
    rank: 151,
    title: "Canopy of Gold",
    collection: "forests",
    collections: ["forests"],
    description:
      "Slender aspen trunks reach into a canopy of glowing gold leaves against a clear blue sky.",
  },
  {
    slug: "white-giant",
    rank: 174,
    title: "White Giant",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A vast dome of snow and ice crowns a range of granite needles under a deep blue sky.",
  },
  {
    slug: "the-needle",
    rank: 126,
    title: "The Needle",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A sharp summit of dark rock and snow rises above a sea of ridges and hanging glaciers.",
  },
  {
    slug: "frozen-ramparts",
    rank: 76,
    title: "Frozen Ramparts",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A ridge of dark granite climbs into a great snow-covered summit, its glaciers bright in the high sun.",
  },
  {
    slug: "serrated-sky",
    rank: 18,
    title: "Serrated Sky",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "A row of jagged granite spires, dusted with snow, cuts across a clear alpine sky.",
  },
  {
    slug: "firestorm",
    rank: 109,
    title: "Firestorm",
    collection: "sky",
    collections: ["sky"],
    description:
      "Ragged clouds ignite in crimson and orange above a dark ridgeline in the final moments of sunset.",
  },
  {
    slug: "jade-waters",
    rank: 61,
    title: "Jade Waters",
    collection: "water",
    collections: ["water", "canyons"],
    description:
      "Milky turquoise water flows past moss-covered stones beneath towering red canyon walls.",
  },
  {
    slug: "travertine-falls",
    rank: 32,
    title: "Travertine Falls",
    collection: "water",
    collections: ["water", "canyons"],
    description:
      "Turquoise water spills over mossy travertine ledges in a hidden red-rock canyon.",
  },
  {
    slug: "silver-thread",
    rank: 142,
    title: "Silver Thread",
    collection: "water",
    collections: ["water"],
    description:
      "A slender waterfall drops from a sculpted rock lip into a quiet stone alcove.",
  },
  {
    slug: "afterglow",
    rank: 143,
    title: "Afterglow",
    collection: "sky",
    collections: ["sky", "lakes"],
    description:
      "The sky smoulders orange behind silhouetted mountains, its glow mirrored on the dark water below.",
  },
  {
    slug: "river-sunburst",
    rank: 41,
    title: "River Sunburst",
    collection: "water",
    collections: ["water", "canyons"],
    description:
      "The sun bursts over a canyon rim as rapids tumble past smooth stones below.",
  },
  {
    slug: "canyon-rampart",
    rank: 83,
    title: "Canyon Rampart",
    collection: "canyons",
    collections: ["canyons"],
    description:
      "Layered red cliffs glow in afternoon light above a calm green river.",
  },
  {
    slug: "emerald-pool",
    rank: 64,
    title: "Emerald Pool",
    collection: "water",
    collections: ["water", "canyons", "panoramas"],
    description:
      "Turquoise water pools beneath sweeping walls of polished red stone.",
  },
  {
    slug: "golden-hillside",
    rank: 114,
    title: "Golden Hillside",
    collection: "forests",
    collections: ["forests", "panoramas"],
    description:
      "Aspens in full autumn colour blanket a steep mountainside, a lone spruce standing dark among the gold.",
  },
  {
    slug: "forest-cascade",
    rank: 172,
    title: "Forest Cascade",
    collection: "water",
    collections: ["water", "forests"],
    description:
      "A creek spills over mossy boulders in a cool, shaded mountain forest.",
  },
  {
    slug: "storm-spire",
    rank: 110,
    title: "Storm Spire",
    collection: "mountains",
    collections: ["mountains", "black-and-white"],
    description:
      "A dark granite spire pierces brooding cloud above a steep, snow-streaked ridge.",
  },
  {
    slug: "cloud-shadows",
    rank: 107,
    title: "Cloud Shadows",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Summer clouds drift over range after range of high peaks, their shadows moving across the slopes.",
  },
  {
    slug: "headwaters",
    rank: 131,
    title: "Headwaters",
    collection: "water",
    collections: ["water"],
    description:
      "A clear stream runs over a bed of rounded stones toward a distant summit beneath a bright summer sky.",
  },
  {
    slug: "mirror-dusk",
    rank: 155,
    title: "Mirror Dusk",
    collection: "sky",
    collections: ["sky", "lakes"],
    description:
      "Fiery clouds drift above a dark mountain notch and repeat themselves in the perfectly still water of a lake at dusk.",
  },
  {
    slug: "autumn-mirror",
    rank: 140,
    title: "Autumn Mirror",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "A hillside of golden aspens and a sky of drifting clouds lie doubled in a quiet beaver pond.",
  },
  {
    slug: "aspen-script",
    rank: 175,
    title: "Aspen Script",
    collection: "forests",
    collections: ["forests"],
    description:
      "Dark scars and pale bark form a quiet calligraphy across a stand of aspen trunks.",
  },
  {
    slug: "silver-dunes",
    rank: 139,
    title: "Silver Dunes",
    collection: "canyons",
    collections: ["canyons", "black-and-white"],
    description:
      "Wind-carved dunes roll to the horizon in low light, every ripple and crest drawn in silver and shadow.",
  },
  {
    slug: "desert-gentleman",
    rank: 136,
    title: "Desert Gentleman",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A camel in a hand-woven muzzle poses in profile against a soft desert sky.",
  },
  {
    slug: "silken-stream",
    rank: 82,
    title: "Silken Stream",
    collection: "water",
    collections: ["water"],
    description:
      "A long exposure turns a mountain stream to silk as it slips over stones between towering spruce.",
  },
  {
    slug: "canyon-evening",
    rank: 182,
    title: "Canyon Evening",
    collection: "canyons",
    collections: ["canyons"],
    description:
      "The last warm light catches a line of sandstone cliffs above a broad, calm river.",
  },
  {
    slug: "canyon-light",
    rank: 133,
    title: "Canyon Light",
    collection: "canyons",
    collections: ["canyons", "water"],
    description:
      "Sunlight blazes on the far walls of a deep canyon while the river below runs cool in shadow.",
  },
  {
    slug: "storm-over-the-pines",
    rank: 80,
    title: "Storm over the Pines",
    collection: "forests",
    collections: ["forests"],
    description:
      "Storm clouds gather over a dark peak as sunlit pine forest and green meadow fall away below.",
  },
  {
    slug: "summer-reflection",
    rank: 86,
    title: "Summer Reflection",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "Snow-streaked peaks and dark spruce mirror themselves in a still alpine lake on a summer morning.",
  },
  {
    slug: "meadow-watch",
    rank: 37,
    title: "Meadow Watch",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A mule deer pauses in a wildflower meadow beneath a wall of jagged red peaks.",
  },
  {
    slug: "the-old-maple",
    rank: 27,
    title: "The Old Maple",
    collection: "forests",
    collections: ["forests"],
    description:
      "An ancient maple spreads its twisting limbs over a carpet of sunlit moss.",
  },
  {
    slug: "kindred",
    rank: 71,
    title: "Kindred",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A young kudu turns her great ears toward the camera while her companion grazes behind.",
  },
  {
    slug: "savanna-sentinel",
    rank: 104,
    title: "Savanna Sentinel",
    collection: "wildlife",
    collections: ["wildlife", "panoramas"],
    description:
      "A lone gemsbok stands tall in golden grass beneath flat-topped acacias, the open savanna stretching wide around it.",
  },
  {
    slug: "springbok",
    rank: 81,
    title: "Springbok",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A springbok ram stands alert at the edge of his grazing herd.",
  },
  {
    slug: "last-embers",
    rank: 121,
    title: "Last Embers",
    collection: "sky",
    collections: ["sky"],
    description:
      "A dead tree stands silhouetted against storm clouds as the final glow of sunset burns along the horizon.",
  },
  {
    slug: "painted-hunter",
    rank: 43,
    title: "Painted Hunter",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "An African wild dog lopes through tall grass, its patchwork coat blending with the savanna.",
  },
  {
    slug: "emerald-climber",
    rank: 55,
    title: "Emerald Climber",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A chameleon creeps along a slender stem, every scale of its jewelled skin in sharp relief against the sky.",
  },
  {
    slug: "lord-of-the-grass",
    rank: 105,
    title: "Lord of the Grass",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A young male lion rests in lush green grass, gazing out over his territory.",
  },
  {
    slug: "rising-mist",
    rank: 163,
    title: "Rising Mist",
    collection: "water",
    collections: ["water", "panoramas"],
    description:
      "From high above, a vast river plunges into a chasm and a towering plume of spray rises over the forest.",
  },
  {
    slug: "open-plains",
    rank: 119,
    title: "Open Plains",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A lone bull elephant walks out of the acacia woodland onto a sea of golden grass.",
  },
  {
    slug: "granite-tide",
    rank: 106,
    title: "Granite Tide",
    collection: "coast",
    collections: ["coast"],
    description:
      "The sea smooths to mist around rounded granite boulders glowing in soft coastal light.",
  },
  {
    slug: "emerald-amphitheater",
    rank: 23,
    title: "Emerald Amphitheater",
    collection: "water",
    collections: ["water"],
    description:
      "A slender waterfall drops into a vast bowl of basalt carpeted in moss and fern.",
  },
  {
    slug: "ancient-mariner",
    rank: 102,
    title: "Ancient Mariner",
    collection: "coast",
    collections: ["coast"],
    description:
      "A green sea turtle glides over a reef crowded with branching coral.",
  },
  {
    slug: "mountain-staircase",
    rank: 108,
    title: "Mountain Staircase",
    collection: "water",
    collections: ["water"],
    description:
      "Snowmelt tumbles down a staircase of boulders below a high waterfall and dark spruce.",
  },
  {
    slug: "snowmelt-run",
    rank: 78,
    title: "Snowmelt Run",
    collection: "water",
    collections: ["water"],
    description:
      "A clear mountain river races over smooth stones, a distant waterfall feeding it from the forest above.",
  },
  {
    slug: "granite-ribbon",
    rank: 26,
    title: "Granite Ribbon",
    collection: "water",
    collections: ["water"],
    description:
      "A ribbon of falling water threads down a towering granite wall framed by pines.",
  },
  {
    slug: "sapphire-caldera",
    rank: 69,
    title: "Sapphire Caldera",
    collection: "lakes",
    collections: ["lakes"],
    description:
      "Deep blue water fills an ancient volcanic caldera beneath a sky of drifting summer cloud.",
  },
  {
    slug: "reef-garden",
    rank: 98,
    title: "Reef Garden",
    collection: "coast",
    collections: ["coast"],
    description:
      "A great fan of table coral spreads across the reef as small fish dart through the blue.",
  },
  {
    slug: "the-great-bend",
    rank: 11,
    title: "The Great Bend",
    collection: "canyons",
    collections: ["canyons", "water"],
    description:
      "A jade-green river carves a perfect horseshoe around a sandstone butte a thousand feet below.",
  },
  {
    slug: "first-steps",
    rank: 84,
    title: "First Steps",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A young rhino calf stands close beside its mother on sun-baked earth.",
  },
  {
    slug: "forest-jewel",
    rank: 111,
    title: "Forest Jewel",
    collection: "water",
    collections: ["water", "forests"],
    description:
      "Water spills between moss-covered boulders in a quiet corner of the forest.",
  },
  {
    slug: "stone-window",
    rank: 164,
    title: "Stone Window",
    collection: "canyons",
    collections: ["canyons"],
    description:
      "A natural sandstone arch frames a distant butte under a clear desert sky.",
  },
  {
    slug: "little-lion",
    rank: 56,
    title: "Little Lion",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A lion cub rests in lush grass, its sibling dozing close behind.",
  },
  {
    slug: "granite-valley",
    rank: 183,
    title: "Granite Valley",
    collection: "mountains",
    collections: ["mountains"],
    description:
      "Great granite walls fall away into a forested valley as afternoon cloud drifts overhead.",
  },
  {
    slug: "standoff",
    rank: 47,
    title: "Standoff",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A Cape buffalo bull fixes the camera with a level stare from the tall grass.",
  },
  {
    slug: "river-horse",
    rank: 77,
    title: "River Horse",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A hippo strides across a grassy bank, an oxpecker riding on its back.",
  },
  {
    slug: "three-of-a-kind",
    rank: 91,
    title: "Three of a Kind",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "Three zebras stand pressed together, their stripes merging into a single bold pattern.",
  },
  {
    slug: "meadow-prowler",
    rank: 112,
    title: "Meadow Prowler",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A black-backed jackal pauses among wildflowers, ears tuned to the grass ahead.",
  },
  {
    slug: "midday-rest",
    rank: 169,
    title: "Midday Rest",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A dark-maned lion sprawls in the shade of fallen timber, eyes narrowed against the heat.",
  },
  {
    slug: "ocean-fury",
    rank: 161,
    title: "Ocean Fury",
    collection: "coast",
    collections: ["coast"],
    description:
      "A breaking wave explodes against a dark reef in a white burst of spray.",
  },
  {
    slug: "the-lookout",
    rank: 125,
    title: "The Lookout",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A pied kingfisher keeps watch from a leafy perch against a flawless blue sky.",
  },
  {
    slug: "lone-lily",
    rank: 145,
    title: "Lone Lily",
    collection: "forests",
    collections: ["forests"],
    description:
      "A single white water lily rises on its slender stem above still, silvered water.",
  },
  {
    slug: "gentle-giant",
    rank: 149,
    title: "Gentle Giant",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "An elephant bull curls his trunk as he browses at the edge of the woodland.",
  },
  {
    slug: "painted-earth",
    rank: 170,
    title: "Painted Earth",
    collection: "canyons",
    collections: ["canyons"],
    description:
      "Steam drifts over a vast hot spring whose mineral-rich edges glow in rust and orange.",
  },
  {
    slug: "fern-cathedral",
    rank: 101,
    title: "Fern Cathedral",
    collection: "forests",
    collections: ["forests"],
    description:
      "Ancient redwood trunks rise like columns from a deep understory of sword ferns.",
    isNew: true,
  },
  {
    slug: "winter-quiet",
    rank: 178,
    title: "Winter Quiet",
    collection: "forests",
    collections: ["forests"],
    description:
      "Pale aspen trunks stand in rows across fresh snow beneath a clear winter sky.",
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
    isNew: true,
  },
  {
    slug: "first-bloom",
    rank: 122,
    title: "First Bloom",
    collection: "forests",
    collections: ["forests"],
    description:
      "A single rose-pink camellia opens its layered petals against deep green leaves.",
    isNew: true,
  },
  {
    slug: "the-old-warrior",
    rank: 158,
    title: "The Old Warrior",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A blue wildebeest bull lies in the pale dust, his shaggy mane lit by soft afternoon light.",
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
    isNew: true,
  },
  {
    slug: "tuxedo-pair",
    rank: 59,
    title: "Tuxedo Pair",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "Two African penguins stand side by side in the sand, one preening the other.",
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
    isNew: true,
  },
  {
    slug: "amber-chamber",
    rank: 97,
    title: "Amber Chamber",
    collection: "canyons",
    collections: ["canyons"],
    description:
      "Reflected light glows through the sculpted sandstone walls of a narrow slot canyon.",
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
    isNew: true,
  },
  {
    slug: "wading-party",
    rank: 179,
    title: "Wading Party",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "Three yellow-billed storks probe the shallows, their reflections trembling on the still water.",
    isNew: true,
  },
  {
    slug: "on-the-wing",
    rank: 128,
    title: "On the Wing",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A pale chanting goshawk banks against a flawless blue sky, wings spread wide.",
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
    isNew: true,
  },
  {
    slug: "fern-pool",
    rank: 75,
    title: "Fern Pool",
    collection: "water",
    collections: ["water", "forests"],
    description:
      "Tree ferns arch over a still forest pool that mirrors their feathered fronds.",
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
    isNew: true,
  },
  {
    slug: "birch-sun",
    rank: 154,
    title: "Reaching for the Sun",
    collection: "forests",
    collections: ["forests"],
    description:
      "A slender white trunk climbs into a crown of bright leaves, the sun glowing just beyond.",
    isNew: true,
  },
  {
    slug: "beach-patrol",
    rank: 74,
    title: "Beach Patrol",
    collection: "wildlife",
    collections: ["wildlife", "coast"],
    description:
      "African penguins march across the bright sand, their long shadows trailing behind them.",
    isNew: true,
  },
  {
    slug: "penguin-portrait",
    rank: 67,
    title: "Formal Attire",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "An African penguin faces the lens against deep blue water, every feather crisp.",
    isNew: true,
  },
  {
    slug: "fern-gorge",
    rank: 166,
    title: "Fern Gorge",
    collection: "water",
    collections: ["water", "forests"],
    description:
      "A shallow creek winds through a narrow gorge whose walls are draped in ferns.",
    isNew: true,
  },
  {
    slug: "tropic-flame",
    rank: 134,
    title: "Tropic Flame",
    collection: "forests",
    collections: ["forests"],
    description:
      "A hibiscus bloom flares from deep crimson to gold against dark tropical leaves.",
    isNew: true,
  },
  {
    slug: "through-the-branches",
    rank: 68,
    title: "Through the Branches",
    collection: "sky",
    collections: ["sky"],
    description:
      "Bare, branching trees stand in silhouette as the sun bursts through their limbs, flooding the sky with gold.",
    isNew: true,
  },
  {
    slug: "lilac-breasted-roller",
    rank: 52,
    title: "Lilac-breasted Roller",
    collection: "wildlife",
    collections: ["wildlife"],
    description:
      "A lilac-breasted roller perches at the tip of a slender branch, its rose, turquoise and chestnut plumage sharp against a clear blue sky.",
    isNew: true,
  },
  {
    slug: "sunlit-reef",
    rank: 96,
    title: "Sunlit Reef",
    collection: "coast",
    collections: ["coast"],
    description:
      "A living wall of coral rises toward the sunlit surface as small fish drift through the blue.",
    isNew: true,
  },
  {
    slug: "golden-pavilion",
    rank: 79,
    title: "The Golden Pavilion",
    collection: "forests",
    collections: ["forests"],
    description:
      "A vermilion bridge leads to a gilded pavilion, its tiered roofs rising against a pale sky.",
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

function tierOf(slug: string): Tier {
  if (PREMIER_SLUGS.includes(slug)) return 'premier';
  if (signature.has(slug)) return 'signature';
  return 'collection';
}

/** All works, best first (by `rank`). Every listing derives from this order. */
export const works: Work[] = ranked.map((w) => {
  const tier = tierOf(w.slug);
  return {
    ...w,
    collections: signature.has(w.slug) ? [...w.collections, 'signature' as CollectionSlug] : w.collections,
    tier,
    editionSize: TIERS[tier].edition,
  };
});

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

export function getCuratorsPicks() {
  return works.filter((w) => w.curatorsPick);
}

export function getWorksInTier(tier: Tier) {
  return works.filter((w) => w.tier === tier && !w.webOnly);
}

/** Minimum print resolution: a size is only offered when the work's master holds at least this many pixels per inch. */
export const MIN_PRINT_PPI = 150;

/**
 * Works offered in 2:1 widescreen print sizes (same long-edge prices as the 3:2 formats) so the image is not cropped
 * or stretched. Other 2:1 works can be added here as they are remastered.
 */
const TWO_BY_ONE = new Set(['savanna-sentinel']);

/**
 * Print sizes offered for a work: sizes its tier sells that the master can hold at MIN_PRINT_PPI. The mid size
 * (36×24, or 36×18 for 2:1 works) is offered only when the master can't reach the next size up, so single-size
 * works gain a second, larger size.
 */
export function sizesFor(slug: string): PrintSize[] {
  const work = works.find((w) => w.slug === slug);
  if (!work) return [];
  const portrait = isPortrait(slug);
  const master = masterLongEdge[slug] ?? 0;
  const prices = TIERS[work.tier].prices;
  const fits = (long: number) => master >= long * MIN_PRINT_PPI;
  const widescreen = TWO_BY_ONE.has(slug);
  const formats = widescreen ? PRINT_FORMATS_2X1 : PRINT_FORMATS;
  const midKey: SizeKey = widescreen ? '36x18' : '36x24';
  const nextLong = widescreen ? 48 : 45;
  return formats.filter((f) => prices[f.key] && fits(f.long) && (f.key !== midKey || !fits(nextLong))).map((f) => ({
    name: f.key,
    dimensions: sizeLabel(f, portrait),
    long: f.long,
    short: f.short,
    price: prices[f.key]!,
  }));
}

/** The supported size with this key (old names like "Gallery" are mapped), or undefined when not offered. */
export function sizeFor(slug: string, name: string) {
  const key = LEGACY_SIZE_NAMES[name] ?? name;
  return sizesFor(slug).find((s) => s.name === key);
}

/** Lowest opening price for a work (the "From $X" on cards), or undefined when it is inquiry only. */
export function fromPrice(slug: string) {
  const s = sizesFor(slug);
  return s.length ? Math.min(...s.map((x) => x.price)) : undefined;
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
  instagram: 'https://www.instagram.com/thesheldonroth/',
  instagramHandle: '@thesheldonroth',
};
