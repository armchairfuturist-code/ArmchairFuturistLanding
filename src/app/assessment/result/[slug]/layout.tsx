import type { Metadata } from 'next';
import { getArchetypeBySlug } from '@/lib/assessment/archetypes';

const siteUrl = 'https://thearmchairfuturist.com';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const archetype = getArchetypeBySlug(slug);
  
  if (!archetype) {
    return {
      title: 'Assessment Not Found',
    };
  }

  return {
    metadataBase: new URL(siteUrl),
    title: archetype.metaTitle,
    description: archetype.metaDescription,
    alternates: {
      canonical: `/assessment/result/${slug}`,
    },
    openGraph: {
      title: archetype.metaTitle,
      description: archetype.metaDescription,
      url: `/assessment/result/${slug}`,
      siteName: 'The Armchair Futurist',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: archetype.metaTitle,
      description: archetype.metaDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function AssessmentResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
