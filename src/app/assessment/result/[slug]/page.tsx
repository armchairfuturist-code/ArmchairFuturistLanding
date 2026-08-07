"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { useEffect, useMemo, Suspense } from "react";
import { getArchetypeBySlug } from "@/lib/assessment/archetypes";
import {
  buildResultPath,
  loadStoredFlowResult,
  resolveResultScores,
} from "@/lib/assessment/flow";
import { trackConversion } from "@/lib/analytics";
import ResultPage from "@/components/assessment/ResultPage";

function AssessmentResultContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = Array.isArray(params.slug) ? params.slug[0] : (params.slug ?? "");

  const stored = useMemo(() => loadStoredFlowResult(), []);
  const resolvedSlug = stored?.archetypeSlug ?? slug;
  const archetype = getArchetypeBySlug(resolvedSlug);

  const scores = useMemo(
    () =>
      resolveResultScores({
        slug: resolvedSlug,
        searchParams,
        stored,
      }),
    [stored, searchParams, resolvedSlug],
  );

  // Canonicalize URL when session data disagrees with path
  useEffect(() => {
    if (!stored || stored.archetypeSlug === slug) return;
    router.replace(buildResultPath(stored.archetypeSlug, stored.scores));
  }, [stored, slug, router]);

  useEffect(() => {
    if (archetype) {
      trackConversion("assessment_result_view", undefined);
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
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: archetype.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
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
          <p className="text-muted-foreground font-sans">
            Loading your results...
          </p>
        </div>
      }
    >
      <AssessmentResultContent />
    </Suspense>
  );
}
