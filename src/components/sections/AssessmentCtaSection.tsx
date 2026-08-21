"use client";

import Link from "next/link";
import { ArrowRight, Brain } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { BlurFade } from "@/components/ui/blur-fade";

export default function AssessmentCtaSection() {
  return (
    <section
      className="relative py-16 md:py-20 bg-ink scroll-mt-20 overflow-hidden"
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1.5 md:w-2 bg-hp-electric"
        aria-hidden="true"
      />
      <BlurFade inView className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 border border-white/10 bg-white/[0.03] px-6 py-8 md:px-10 md:py-10">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.35em] text-hp-soft mb-4">
              <Brain className="w-3.5 h-3.5" aria-hidden="true" />
              Free assessment
            </p>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-tight text-white leading-[1.05] mb-3">
              Not sure where to start?
            </h2>
            <p className="text-white/65 text-base md:text-lg leading-relaxed">
              3 minutes. 9 honest questions. A personalized diagnosis and a
              clear next step. No email required to see results.
            </p>
          </div>
          <Link
            href="/assessment"
            onClick={() => trackEvent("homepage_assessment_cta")}
            className="inline-flex items-center justify-center gap-2 h-12 px-7 text-sm font-semibold uppercase tracking-[0.7px] bg-hp-electric text-white hover:bg-hp-bright transition-colors shrink-0"
          >
            Take the Assessment
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </BlurFade>
    </section>
  );
}
