import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/admin', '/cart', '/checkout/'] }],
    sitemap: 'https://sheldonroth.com/sitemap.xml',
  };
}
