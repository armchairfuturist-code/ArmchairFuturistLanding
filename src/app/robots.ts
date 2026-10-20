import type { MetadataRoute } from 'next';

/**
 * SINGLE SOURCE of robots rules. public/robots.txt was deleted; do not recreate it
 * (a static file would shadow or conflict with this route).
 *
 * Every crawler is welcome, AI agents included. Search bots drive citations and
 * referrals. Training crawlers are how a model learns the entity exists, which is
 * the outcome this site wants. The only exclusion is /admin/, which is not public
 * content. The old allow-list of individual AI bots only created the chance of a
 * missing token, so the wildcard covers them all.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/'],
      },
    ],
    sitemap: [
      'https://thearmchairfuturist.com/sitemap.xml',
      'https://thearmchairfuturist.com/sitemap-ai.xml',
    ],
  };
}
