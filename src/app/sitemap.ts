import type { MetadataRoute } from 'next';
import { collections, works } from '@/content/catalog';

const BASE = 'https://sheldonroth.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/shop', '/collections', '/new-releases', '/best-sellers', '/artist', '/contact', '/faq', '/shipping-returns', '/care-instructions', '/certificate', '/privacy', '/terms'];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}`, changeFrequency: 'weekly' as const, priority: p === '' ? 1 : 0.6 })),
    ...collections.map((c) => ({ url: `${BASE}/collections/${c.slug}`, changeFrequency: 'weekly' as const, priority: 0.8 })),
    ...works.map((w) => ({ url: `${BASE}/shop/${w.slug}`, changeFrequency: 'monthly' as const, priority: 0.7, images: [`${BASE}/works/${w.slug}.jpg`] })),
  ];
}
