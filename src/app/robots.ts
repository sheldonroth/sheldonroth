import type { MetadataRoute } from 'next';

const disallow = ['/api/', '/admin', '/cart', '/checkout/', '/gift/thanks'];

/** Standard search crawlers and AI search crawlers, each given the same allow/disallow rules. */
const crawlers = ['*', 'Googlebot', 'Bingbot', 'OAI-SearchBot', 'GPTBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended', 'Applebot'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: crawlers.map((userAgent) => ({ userAgent, allow: '/', disallow })),
    sitemap: 'https://sheldonroth.com/sitemap.xml',
  };
}
