'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { getArchetypeBySlug, ARCHETYPE_SLUGS } from '@/lib/assessment/archetypes';
import { trackConversion } from '@/lib/analytics';
import ResultPage from '@/components/assessment/ResultPage';
import type { ScoreResult } from '@/lib/assessment/scoring';

export default function AssessmentResultPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  // In Next.js 16, params.slug can be string | string[]
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug ?? '';
  const archetype = getArchetypeBySlug(slug);

  const scores: ScoreResult = useMemo(() => ({
    clarity: Number(searchParams.get('c')) || 50,
    readiness: Number(searchParams.get('r')) || 50,
    urgency: Number(searchParams.get('u')) || 50,
    individualSignals: 0,
    archetypeSlug: slug,
  }), [searchParams, slug]);

  useEffect(() => {
    if (archetype) {
      trackConversion('assessment_result_view', undefined);
    }
  }, [archetype]);

  if (!archetype) {
    notFound();
  }

  return (
    <>
      {/* JSON-LD FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: archetype.faq.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />
      <ResultPage scores={scores} archetype={archetype} />
    </>
  );
}
