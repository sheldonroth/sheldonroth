import { imageSizes } from './image-sizes';
import { masterLongEdge } from './master-sizes';

export type CollectionSlug = 'peaks-ice' | 'mountain-forest' | 'light-sky' | 'water' | 'far-horizons' | 'wildlife';

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
  {
    slug: 'wildlife',
    title: 'Wildlife',
    tagline: 'Portraits of the wild',
    description:
      'Lions in the shade of the rocks, elephants emerging from darkness and a leopard at rest — intimate portraits of the great animals of the wild.',
    cover: 'the-elder',
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
  {
    slug: "ember-sky",
    title: "Ember Sky",
    collection: "light-sky",
    description:
      "Clouds catch fire above a darkening ridge as the last light of evening sweeps across the sky.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "horizon-burn",
    title: "Horizon Burn",
    collection: "light-sky",
    description:
      "A band of molten gold burns along the horizon as twilight deepens over calm water.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "last-light",
    title: "Last Light",
    collection: "light-sky",
    description:
      "Layered ridgelines dissolve into haze beneath a sky fading from gold to rose.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "terraced-meadow",
    title: "Terraced Meadow",
    collection: "mountain-forest",
    description:
      "Ancient terraced fields glow green beneath towering snow peaks in clear morning light.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "gilded-sky",
    title: "Gilded Sky",
    collection: "light-sky",
    description:
      "The sky erupts in gold as the sun slips beneath a line of silhouetted trees.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "rose-summit",
    title: "Rose Summit",
    collection: "light-sky",
    description:
      "A great summit turns rose and copper in the soft afterglow of a high-country dusk.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "golden-tide",
    title: "Golden Tide",
    collection: "light-sky",
    description:
      "The setting sun lays a path of gold across the sea toward a rugged, wave-washed shore.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "morning-mist",
    title: "Morning Mist",
    collection: "light-sky",
    description:
      "Sunrise sets drifting mist aglow over still water, a lone tree standing at the shore.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "storm-light",
    title: "Storm Light",
    collection: "peaks-ice",
    description:
      "Snow-dusted peaks break through parting storm clouds above a quiet valley.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "canyon-song",
    title: "Canyon Song",
    collection: "water",
    description:
      "Turquoise water spills over mossy boulders between towering walls of layered stone.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "secret-grotto",
    title: "Secret Grotto",
    collection: "water",
    description:
      "A ribbon of falling water glows green beneath a stone arch deep inside a hidden canyon.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "golden-grove",
    title: "Golden Grove",
    collection: "mountain-forest",
    description:
      "Pale trunks rise through a blaze of autumn gold in a quiet mountain grove.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "stone-spires",
    title: "Stone Spires",
    collection: "peaks-ice",
    description:
      "A forest of fluted stone spires climbs toward the sky, every rib and gully carved sharp by wind and ice.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "cloud-weave",
    title: "Cloud Weave",
    collection: "peaks-ice",
    description:
      "Clouds weave through a vast wall of ice and rock as the high peaks emerge from the drifting mist.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "ice-valley",
    title: "Ice Valley",
    collection: "peaks-ice",
    description:
      "Cloud pours through a vast glacial valley ringed by jagged, snow-bound peaks.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "ocean-of-cloud",
    title: "Ocean of Cloud",
    collection: "peaks-ice",
    description:
      "Snow-clad summits stand above a still ocean of cloud that fills the valleys far below.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "winter-crown",
    title: "Winter Crown",
    collection: "peaks-ice",
    description:
      "A great pyramid of rock and ice crowns the range, its snow-laced ridges sharp against a deep blue sky.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "summit-cloud",
    title: "Summit Cloud",
    collection: "peaks-ice",
    description:
      "A single cloud drifts past a soaring pyramid of rock and snow in the clear high-altitude air.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "spindrift",
    title: "Spindrift",
    collection: "peaks-ice",
    description:
      "High winds tear a plume of spindrift from a towering wall of snow and ice.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "canyon-glow",
    title: "Canyon Glow",
    collection: "light-sky",
    description:
      "Sunlight bursts through a sculpted sandstone arch, setting the smooth canyon walls aglow in shades of fire.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "sandstone-flame",
    title: "Sandstone Flame",
    collection: "light-sky",
    description:
      "Wind- and water-carved sandstone curls upward like a frozen flame toward a sliver of blue sky.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "molten-lake",
    title: "Molten Lake",
    collection: "water",
    description:
      "The last light of day turns a mountain lake to molten gold beneath a sky of rose and violet.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "dune-lines",
    title: "Dune Lines",
    collection: "far-horizons",
    description:
      "Wind-drawn ripples sweep across the flank of a great dune, rising to a crest against the evening sky.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "tidewater-stones",
    title: "Tidewater Stones",
    collection: "water",
    description:
      "Surf washes over a beach of smooth dark stones while a green sea cliff stands against the open ocean.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "three-veils",
    title: "Three Veils",
    collection: "water",
    description:
      "Three ribbons of white water fall through a moss-draped gorge into a still, misty pool.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "living-sculpture",
    title: "Living Sculpture",
    collection: "mountain-forest",
    description:
      "The twisting limbs of an ancient maple spread beneath a glowing canopy of gold and green.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "sea-monolith",
    title: "Sea Monolith",
    collection: "water",
    description:
      "A great sea monolith stands dark against a brooding sky as the tide slips across the sand.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "golden-slope",
    title: "Golden Slope",
    collection: "mountain-forest",
    description:
      "A hillside of aspens blazes gold beneath a summit dusted with the season's first snow.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "autumn-cascade",
    title: "Autumn Cascade",
    collection: "water",
    description:
      "A mountain stream tumbles in silken steps over mossy boulders through a forest turning gold.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "mirror-lake",
    title: "Mirror Lake",
    collection: "mountain-forest",
    description:
      "Dark pines and golden aspens ring a glassy lake that mirrors a cloudless sky.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "blue-hour-shore",
    title: "Blue Hour Shore",
    collection: "water",
    description:
      "Sea stacks stand in silhouette as the last violet light of evening settles over a quiet tide.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "emerald-falls",
    title: "Emerald Falls",
    collection: "water",
    description:
      "A slender waterfall plunges from a basalt cliff into a lush emerald gorge.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "crimson-sky",
    title: "Crimson Sky",
    collection: "light-sky",
    description:
      "A storm of crimson cloud blazes above a darkened mountain ridge in the final minutes of dusk.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "river-strata",
    title: "River Strata",
    collection: "water",
    description:
      "A silken river slides past fallen slabs beneath towering walls of layered stone.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "sandstone-wave",
    title: "Sandstone Wave",
    collection: "light-sky",
    description:
      "Reflected light pours through a narrow canyon, turning wind-carved sandstone into rolling waves of orange and gold.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "lone-vigil",
    title: "Lone Vigil",
    collection: "wildlife",
    description:
      "A fish eagle keeps watch from the twisted arm of a dead tree, stark against a pale, empty sky.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "the-elder",
    title: "The Elder",
    collection: "wildlife",
    description:
      "A great bull elephant emerges from the darkness, every fold and furrow of a long life etched into its skin.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "above-it-all",
    title: "Above It All",
    collection: "wildlife",
    description:
      "A young giraffe turns its gaze from the shadows, its patterned neck rising out of total darkness.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "the-king",
    title: "The King",
    collection: "wildlife",
    description:
      "A lion rests in the shade of the rocks, its heavy mane framing a calm and unwavering stare.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "pride",
    title: "Pride",
    collection: "wildlife",
    description:
      "A lioness presses close to her mate in a quiet moment of affection beneath the rock walls.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "the-hidden-horn",
    title: "The Hidden Horn",
    collection: "wildlife",
    description:
      "A cape buffalo peers through tall grass, its great sweeping horns framing a wary stare.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "into-the-mist",
    title: "Into the Mist",
    collection: "wildlife",
    description:
      "A lone gemsbok steps through golden grass as morning mist swallows the plain behind it.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "the-watcher",
    title: "The Watcher",
    collection: "wildlife",
    description:
      "A leopard lounges on a weathered branch, its golden coat glowing against a forest rendered in silver.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "the-huntress",
    title: "The Huntress",
    collection: "wildlife",
    description:
      "A lioness pauses in the long grass, ears forward and every muscle ready.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "leap-of-faith",
    title: "Leap of Faith",
    collection: "wildlife",
    description:
      "A dolphin arcs clear of the water, its sleek body mirrored in the dark, rippling sea.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "golden-mane",
    title: "Golden Mane",
    collection: "wildlife",
    description:
      "A great maned lion stands in warm light before red stone, gazing out over his domain.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "the-heavyweight",
    title: "The Heavyweight",
    collection: "wildlife",
    description:
      "A hippo stands squarely in the grass, its heavy frame and steady gaze filling the frame.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "crystal-crown",
    title: "Crystal Crown",
    collection: "peaks-ice",
    description:
      "A soaring granite summit, streaked with ice and fresh snow, rises into a flawless blue sky.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "twin-horns",
    title: "Twin Horns",
    collection: "peaks-ice",
    description:
      "Two dark rock horns, laced with snow and ice, tear through drifting cloud high above the valley.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "sea-of-silence",
    title: "Sea of Silence",
    collection: "peaks-ice",
    description:
      "A snow-crowned summit floats above a still sea of cloud in the deep blue of the high mountains.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "cloud-crest",
    title: "Cloud Crest",
    collection: "peaks-ice",
    description:
      "Cloud spills over a vast wall of ice and rock, its crest catching the bright mountain light.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "breath-of-the-mountain",
    title: "Breath of the Mountain",
    collection: "peaks-ice",
    description:
      "Storm cloud boils around a hanging glacier as the mountain reveals itself for a fleeting moment.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "turquoise-mesa",
    title: "Turquoise Mesa",
    collection: "mountain-forest",
    description:
      "A crown of dark cliffs rises above green alpine slopes and a lake of deep turquoise.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "jagged-horizon",
    title: "Jagged Horizon",
    collection: "far-horizons",
    description:
      "Ridge after ridge rolls toward a skyline of jagged peaks beneath towering summer clouds.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "paintbrush-meadow",
    title: "Paintbrush Meadow",
    collection: "mountain-forest",
    description:
      "Wildflowers blaze crimson and gold across a high meadow beneath rolling clouds and green ridges.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "ghost-forest",
    title: "Ghost Forest",
    collection: "mountain-forest",
    description:
      "Bleached, twisted remains of old trees stand on a steaming mineral flat before a dark wall of pines.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "granite-cathedral",
    title: "Granite Cathedral",
    collection: "peaks-ice",
    description:
      "Jagged granite spires rise in silver light above the sage flats beneath a brooding sky.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "ice-blade",
    title: "Ice Blade",
    collection: "peaks-ice",
    description:
      "A sharp ridge of rock and hanging ice cuts across a clear blue mountain sky.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "nectar-flight",
    title: "Nectar Flight",
    collection: "wildlife",
    description:
      "A white-lined sphinx moth hovers at a spire of blue delphinium, its striped wings frozen mid-beat.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "river-of-stars",
    title: "River of Stars",
    collection: "light-sky",
    description:
      "The Milky Way arcs over a dark mountain ridge as the last trace of twilight fades from the horizon.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "silent-passage",
    title: "Silent Passage",
    collection: "water",
    description:
      "Smoothed to silk by a long exposure, a great river glides past boulders between towering canyon walls.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "wild-coast",
    title: "Wild Coast",
    collection: "water",
    description:
      "Waves fan across a dark-sand bay beneath green sea cliffs that run out into a deep blue ocean.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "canopy-of-gold",
    title: "Canopy of Gold",
    collection: "mountain-forest",
    description:
      "Slender aspen trunks reach into a canopy of glowing gold leaves against a clear blue sky.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "white-giant",
    title: "White Giant",
    collection: "peaks-ice",
    description:
      "A vast dome of snow and ice crowns a range of granite needles under a deep blue sky.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "the-needle",
    title: "The Needle",
    collection: "peaks-ice",
    description:
      "A sharp summit of dark rock and snow rises above a sea of ridges and hanging glaciers.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "frozen-ramparts",
    title: "Frozen Ramparts",
    collection: "peaks-ice",
    description:
      "A ridge of dark granite climbs into a great snow-covered summit, its glaciers bright in the high sun.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "serrated-sky",
    title: "Serrated Sky",
    collection: "peaks-ice",
    description:
      "A row of jagged granite spires, dusted with snow, cuts across a clear alpine sky.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "firestorm",
    title: "Firestorm",
    collection: "light-sky",
    description:
      "Ragged clouds ignite in crimson and orange above a dark ridgeline in the final moments of sunset.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "jade-waters",
    title: "Jade Waters",
    collection: "water",
    description:
      "Milky turquoise water flows past moss-covered stones beneath towering red canyon walls.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "travertine-falls",
    title: "Travertine Falls",
    collection: "water",
    description:
      "Turquoise water spills over mossy travertine ledges in a hidden red-rock canyon.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "silver-thread",
    title: "Silver Thread",
    collection: "water",
    description:
      "A slender waterfall drops from a sculpted rock lip into a quiet stone alcove.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "afterglow",
    title: "Afterglow",
    collection: "light-sky",
    description:
      "The sky smoulders orange behind silhouetted mountains, its glow mirrored on the dark water below.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "reflections-in-rose",
    title: "Reflections in Rose",
    collection: "mountain-forest",
    description:
      "Rose-tinted peaks rise above a dark spruce forest and lie perfectly mirrored in a still alpine lake.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "river-sunburst",
    title: "River Sunburst",
    collection: "water",
    description:
      "The sun bursts over a canyon rim as rapids tumble past smooth stones below.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "canyon-rampart",
    title: "Canyon Rampart",
    collection: "far-horizons",
    description:
      "Layered red cliffs glow in afternoon light above a calm green river.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "emerald-pool",
    title: "Emerald Pool",
    collection: "water",
    description:
      "Turquoise water pools beneath sweeping walls of polished red stone.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "golden-hillside",
    title: "Golden Hillside",
    collection: "mountain-forest",
    description:
      "Aspens in full autumn colour sweep up a mountainside toward a rocky summit.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "aspen-flame",
    title: "Aspen Flame",
    collection: "light-sky",
    description:
      "Backlit aspen leaves burn bright gold against a hillside of muted autumn colour.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "forest-cascade",
    title: "Forest Cascade",
    collection: "water",
    description:
      "A creek spills over mossy boulders in a cool, shaded mountain forest.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "storm-spire",
    title: "Storm Spire",
    collection: "peaks-ice",
    description:
      "A dark granite spire pierces brooding cloud above a steep, snow-streaked ridge.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "cloud-shadows",
    title: "Cloud Shadows",
    collection: "far-horizons",
    description:
      "Summer clouds drift over range after range of high peaks, their shadows moving across the slopes.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "headwaters",
    title: "Headwaters",
    collection: "mountain-forest",
    description:
      "A clear stream runs over a bed of rounded stones toward a distant summit beneath a bright summer sky.",
    editionSize: 50,
    isNew: true,
  },
  {
    slug: "painted-butte",
    title: "Painted Butte",
    collection: "far-horizons",
    description:
      "Bands of red and ochre rock rise above green scrub beneath a pale sky.",
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
