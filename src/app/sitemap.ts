import type { MetadataRoute } from 'next';
import { collections, works } from '@/content/catalog';

const BASE = 'https://sheldonroth.com';

const pages = [
  '',
  '/shop',
  '/collections',
  '/new-releases',
  '/premier',
  '/artist',
  '/contact',
  '/guides',
  '/guides/lumachrome-acrylic-prints',
  '/guides/sizing-large-format-photography',
  '/guides/limited-edition-photography-pricing',
  '/faq',
  '/trade',
  '/gift',
  '/shipping-returns',
  '/care-instructions',
  '/certificate',
  '/privacy',
  '/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((p) => ({
      url: `${BASE}${p}`,
      changeFrequency: 'weekly' as const,
      priority: p === '' ? 1 : p.startsWith('/guides') ? 0.7 : 0.6,
    })),
    ...collections.map((c) => ({ url: `${BASE}/collections/${c.slug}`, changeFrequency: 'weekly' as const, priority: 0.8 })),
    ...works.map((w) => ({ url: `${BASE}/shop/${w.slug}`, changeFrequency: 'monthly' as const, priority: 0.7, images: [`${BASE}/works/${w.slug}.jpg`] })),
  ];
}
