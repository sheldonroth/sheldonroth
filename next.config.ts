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
    return [
      { source: '/collections/tropics', destination: '/collections/water', permanent: true },
      { source: '/collections/ocean-coast', destination: '/collections/water', permanent: true },
      ...removed.map((slug) => ({ source: `/shop/${slug}`, destination: '/shop', permanent: true })),
    ];
  },
  images: {
    // Full-res photography, capped at 2560 wide for speed. Full-bleed/hero images use q80, grids/cards q75.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560],
    imageSizes: [32, 64, 128, 256, 384, 512],
    qualities: [75, 80],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
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
