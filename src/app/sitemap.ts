import type { MetadataRoute } from 'next';
import { ARCHETYPE_SLUGS } from '@/lib/assessment/archetypes';

/**
 * Sitemap configuration for SEO and AI crawler discovery
 * 
 * Priority levels:
 * 1.0 - Homepage (most important)
 * 0.9 - Core conversion pages (about, services)
 * 0.8 - Assessment funnel
 * 0.7 - Assessment results
 * 0.6 - Content/concept pages
 * 0.3 - Legal pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thearmchairfuturist.com';

  const assessmentResults: MetadataRoute.Sitemap = ARCHETYPE_SLUGS.map((slug) => ({
    url: `${baseUrl}/assessment/result/${slug}`,
    lastModified: new Date('2026-03-04'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    // === CORE PAGES ===
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },

    // === ASSESSMENT FUNNEL ===
    {
      url: `${baseUrl}/assessment`,
      lastModified: new Date('2026-03-04'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...assessmentResults,

    // === LEGAL PAGES ===
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },

    // === CONCEPT/EXPLAINER PAGES ===
    // These pages target long-tail keywords and provide AI-citable definitions
    {
      url: `${baseUrl}/concepts`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/concepts/accountability-gap`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/concepts/psychology-led-adoption`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/concepts/results-thinkers`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    // === CASE STUDIES ===
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // {
    //   url: `${baseUrl}/case-studies`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.7,
    // },
    // {
    //   url: `${baseUrl}/case-studies/ai-adoption-consulting`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.6,
    // },
    // {
    //   url: `${baseUrl}/case-studies/workflow-automation`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.6,
    // },

    // // === BLOG/INSIGHTS (uncomment when created) ===
    // {
    //   url: `${baseUrl}/blog`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.7,
    // },
    // {
    //   url: `${baseUrl}/blog/ai-adoption-checklist`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.6,
    // },
    // {
    //   url: `${baseUrl}/blog/what-is-accountability-gap-ai`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.6,
    // },
  ];
}
