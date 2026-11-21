import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // Optimize barrel imports for common libraries (prevents 200-800ms cold start penalty)
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      '@heroicons/react',
      'date-fns',
      'lodash',
    ],
  },
  async redirects() {
    const removed = ['tropical-sunset', 'aspen-cascade', 'crystal-lagoon', 'shipwreck-at-dawn', 'mountain-majesty', 'still-water'];
    const cut2026: [string, string][] = [
      ['horizon-burn', 'sky'],
      ['turquoise-depths', 'coast'],
      ['fern-pool', 'water'],
      ['the-huntress', 'wildlife'],
      ['tropic-flame', 'forests'],
      ['on-the-wing', 'wildlife'],
      ['ice-blade', 'mountains'],
      ['headwaters', 'water'],
      ['granite-valley', 'mountains'],
      ['last-light', 'sky'],
      ['sea-stack', 'coast'],
      ['gilded-sky', 'sky'],
      ['first-bloom', 'forests'],
      ['mirror-dusk', 'sky'],
      ['sky-on-fire', 'sky'],
      ['the-old-warrior', 'wildlife'],
      ['emerald-ribbons', 'water'],
      ['morning-mist', 'sky'],
      ['midday-rest', 'wildlife'],
      ['river-of-stars', 'sky'],
      ['golden-mane', 'wildlife'],
      ['city-of-embers', 'sky'],
      ['winter-crown', 'mountains'],
      ['golden-pavilion', 'forests'],
      ['crimson-sky', 'sky'],
      ['tuxedo-pair', 'wildlife'],
      ['amber-chamber', 'canyons'],
      ['tidewater-stones', 'coast'],
      ['wind-script', 'canyons'],
      ['thundering-mist', 'water'],
      ['mist-veil', 'mountains'],
      ['pacific-edge', 'coast'],
      ['cloud-crest', 'mountains'],
      ['rising-mist', 'water'],
    ];
    return [
      // Old gallery slugs from before the Lik-style reorganisation
      { source: '/collections/tropics', destination: '/collections/coast', permanent: true },
      { source: '/collections/ocean-coast', destination: '/collections/coast', permanent: true },
      { source: '/collections/peaks-ice', destination: '/collections/mountains', permanent: true },
      { source: '/collections/mountain-forest', destination: '/collections/lakes', permanent: true },
      { source: '/collections/light-sky', destination: '/collections/sky', permanent: true },
      { source: '/collections/far-horizons', destination: '/collections/panoramas', permanent: true },
      // Best Sellers was retired before any sales (2026-11-19); Premier Works replaces it.
      { source: '/best-sellers', destination: '/premier', permanent: false },
      ...removed.map((slug) => ({ source: `/shop/${slug}`, destination: '/shop', permanent: true })),
      // Cut in the 2026-11-20 catalog audit (no sales or inquiries): send old links to the work's gallery.
      ...cut2026.map(([slug, gallery]) => ({ source: `/shop/${slug}`, destination: `/collections/${gallery}`, permanent: true })),
    ];
  },
  images: {
    // No Vercel Image Optimization (it returns 402 on this plan). A custom loader points <Image> at
    // pre-sized static JPEGs in public/works/w640|w1200|w2048 (scripts/make-image-sizes.py), with the
    // full 3840px file only for requests wider than 2048. Grids/cards get 640/1200, heroes 2048 or full.
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560],
    imageSizes: [32, 64, 128, 256, 384, 512],
    qualities: [75, 80],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

export default withPayload(nextConfig);
