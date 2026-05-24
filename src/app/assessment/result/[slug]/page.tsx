'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { useEffect, useMemo, Suspense } from 'react';
import { getArchetypeBySlug } from '@/lib/assessment/archetypes';
import { readAssessmentResult } from '@/lib/assessment/result-session';
import { trackConversion } from '@/lib/analytics';
import ResultPage from '@/components/assessment/ResultPage';
import type { ScoreResult } from '@/lib/assessment/scoring';

function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 50;
  return Math.min(100, Math.max(0, Math.round(value)));
}

function AssessmentResultContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug ?? '';

  const stored = useMemo(() => readAssessmentResult(), []);

  const resolvedSlug = stored?.archetypeSlug ?? slug;
  const archetype = getArchetypeBySlug(resolvedSlug);

  const scores: ScoreResult = useMemo(() => {
    if (stored) {
      return {
        clarity: stored.scores.clarity,
        readiness: stored.scores.readiness,
        urgency: stored.scores.urgency,
        individualSignals: stored.scores.individualSignals ?? 0,
        archetypeSlug: stored.archetypeSlug,
      };
    }
    const paramOr = (key: string, fallback: number) => {
      const raw = searchParams.get(key);
      if (raw === null || raw === '') return fallback;
      return clampScore(Number(raw));
    };
    return {
      clarity: paramOr('c', 50),
      readiness: paramOr('r', 50),
      urgency: paramOr('u', 50),
      individualSignals: paramOr('i', 0),
      archetypeSlug: slug,
    };
  }, [stored, searchParams, slug]);

  // Canonicalize URL when session data disagrees with path (prevents slug/score mismatch)
  useEffect(() => {
    if (!stored || stored.archetypeSlug === slug) return;
    const query = new URLSearchParams({
      c: String(stored.scores.clarity),
      r: String(stored.scores.readiness),
      u: String(stored.scores.urgency),
      i: String(stored.scores.individualSignals ?? 0),
    }).toString();
    router.replace(`/assessment/result/${stored.archetypeSlug}?${query}`);
  }, [stored, slug, router]);

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

export default function AssessmentResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[100dvh] flex items-center justify-center">
          <p className="text-muted-foreground font-sans">Loading your results...</p>
        </div>
      }
    >
      <AssessmentResultContent />
    </Suspense>
  );
}
