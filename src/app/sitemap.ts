import type { MetadataRoute } from 'next';
import { ARCHETYPE_SLUGS } from '@/lib/assessment/archetypes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thearmchairfuturist.com';

  const assessmentResults: MetadataRoute.Sitemap = ARCHETYPE_SLUGS.map((slug) => ({
    url: `${baseUrl}/assessment/result/${slug}`,
    lastModified: new Date('2026-03-04'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/assessment`,
      lastModified: new Date('2026-03-04'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...assessmentResults,
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
  ];
}
