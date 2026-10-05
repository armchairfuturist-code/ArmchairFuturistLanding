import type { MetadataRoute } from 'next';
import { ARCHETYPE_SLUGS } from '@/lib/assessment/archetypes';
import { SERVICE_SYSTEMS } from '@/content/service-catalog';
import lastmodData from '@/content/lastmod.generated.json';

/**
 * Sitemap for SEO and AI crawler discovery.
 *
 * lastModified comes from src/content/lastmod.generated.json, written by
 * scripts/gen-lastmod.mjs from git history of each page's source files.
 * The second argument to lm() is the previous hardcoded date, used only
 * when no generated value exists. Do not hand-edit the JSON.
 *
 * Priority: 1.0 home, 0.9 about, 0.8 assessment/services hub,
 * 0.7 results/case studies, 0.6 concept pages, 0.3 legal.
 */
const baseUrl = 'https://thearmchairfuturist.com';
const dates = lastmodData as Record<string, string>;
const lm = (path: string, fallback: string): Date => new Date(dates[path] ?? fallback);

export default function sitemap(): MetadataRoute.Sitemap {
  const assessmentResults: MetadataRoute.Sitemap = ARCHETYPE_SLUGS.map((slug) => ({
    url: `${baseUrl}/assessment/result/${slug}`,
    lastModified: lm('/assessment/result', '2026-03-04'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const page = (
    path: string,
    fallback: string,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: number,
  ): MetadataRoute.Sitemap[number] => ({
    url: path === '' ? baseUrl : `${baseUrl}${path}`,
    lastModified: lm(path === '' ? '/' : path, fallback),
    changeFrequency,
    priority,
  });

  return [
    // Core
    page('', '2026-06-19', 'weekly', 1),
    page('/about', '2026-06-19', 'monthly', 0.9),

    // Assessment funnel
    page('/assessment', '2026-03-04', 'monthly', 0.8),
    ...assessmentResults,
    page('/audit', '2026-08-21', 'monthly', 0.7),

    // Legal
    page('/privacy-policy', '2026-03-04', 'yearly', 0.3),
    page('/terms-of-service', '2026-03-04', 'yearly', 0.3),

    // Concepts
    page('/concepts', '2026-06-19', 'monthly', 0.7),
    page('/concepts/accountability-gap', '2026-03-29', 'monthly', 0.6),
    page('/concepts/the-install-trap', '2026-08-21', 'monthly', 0.6),
    page('/concepts/psychology-led-adoption', '2026-03-29', 'monthly', 0.6),
    page('/concepts/results-thinkers', '2026-03-29', 'monthly', 0.6),
    page('/concepts/human-architect', '2026-06-14', 'monthly', 0.6),
    page('/concepts/pilot-itis', '2026-06-14', 'monthly', 0.6),

    // Case studies
    page('/case-studies', '2026-06-19', 'monthly', 0.7),

    // Services hub + spokes
    page('/services', '2026-09-04', 'monthly', 0.8),
    ...SERVICE_SYSTEMS.map((system) => ({
      url: `${baseUrl}${system.href}`,
      lastModified: lm(system.href, '2026-09-04'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    page('/speaking', '2026-08-24', 'monthly', 0.6),

    // Methodology (E-E-A-T)
    page('/how-i-work', '2026-06-19', 'monthly', 0.7),

    // Content
    page('/blog', '2026-08-21', 'monthly', 0.6),
  ];
}
