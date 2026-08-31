"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowRight, CalendarDays, Compass } from "lucide-react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { motion } from "motion/react";
import { trackConversion, trackEvent } from "@/lib/analytics";
import { CALENDAR_URL } from "@/lib/constants";
import { AUDIT_PRICE_LABEL, AUDIT_LIST_LABEL } from "@/lib/pricing";
import { BookCallButton } from "@/components/ui/BookCallButton";
import type { Archetype } from "@/lib/assessment/archetypes";
import type { ScoreResult } from "@/lib/assessment/scoring";
import ScoreChart from "./ScoreChart";

interface ResultPageProps {
  archetype: Archetype;
  scores: ScoreResult;
}

export default function ResultPage({ archetype, scores }: ResultPageProps) {
  useEffect(() => {
    trackEvent("audit_offer_view");
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-6">
      {/* Archetype badge */}
      <BlurFade inView delay={0.1}>
        <div className="text-center mb-8">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-hp-electric/10 border border-hp-electric/20 text-hp-electric text-xs font-mono mb-4">
            Your AI Readiness Profile
          </span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-hp-electric mb-3">
            {archetype.name}
          </h1>
          <p className="text-lg md:text-xl text-charcoal font-sans leading-relaxed max-w-2xl mx-auto">
            {archetype.headline}
          </p>
        </div>
      </BlurFade>

      {/* Score visualization */}
      <BlurFade inView delay={0.2}>
        <div className="bg-canvas rounded-hp-xl border border-hairline-strong p-6 md:p-8 mb-8">
          <h2 className="font-heading text-lg font-bold text-ink mb-5">
            Your scores
          </h2>
          <ScoreChart
            clarity={scores.clarity}
            readiness={scores.readiness}
            urgency={scores.urgency}
          />
        </div>
      </BlurFade>

      {/* CTAs — moved above the diagnosis so the highest-intent action
          appears right after the score chart. The card uses the brand
          HP Electric Blue so it reads as "the next step is a call" rather
          than a soft suggestion. The Calendar icon replaces the previous
          external-link glyph: the destination is the booking calendar, not
          a third-party site. Microcopy is the proven Connect-section line
          ("15 minutes. No pitch. Just clarity.") so visitors get a single,
          consistent promise of what the call is. */}
      <BlurFade inView delay={0.3}>
        <div className="bg-hp-electric text-white rounded-hp-xl p-6 md:p-8 mb-10">
          <h2 className="font-heading text-xl md:text-2xl font-bold tracking-tight mb-2">
            Your next step
          </h2>
          <p className="text-sm md:text-base text-white/80 font-sans leading-relaxed mb-6 max-w-xl">
            Based on your profile, here is what I recommend. Most clients book a
            15-minute call to turn this diagnosis into a concrete next move.
          </p>

          <div className="flex flex-col lg:flex-row gap-3">
            {archetype.primaryCta.external ? (
              <a
                href={archetype.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
                onClick={() => trackConversion("assessment_primary_cta")}
              >
                <Button
                  size="lg"
                  className="font-bold w-full lg:w-auto bg-white text-hp-electric hover:bg-white/90 whitespace-normal lg:whitespace-nowrap"
                >
                  {archetype.primaryCta.label}
                  <CalendarDays className="ml-2 h-5 w-5" aria-hidden="true" />
                </Button>
              </a>
            ) : (
              <Link
                href={archetype.primaryCta.href}
                onClick={() => trackConversion("assessment_primary_cta")}
              >
                <Button
                  size="lg"
                  className="font-bold w-full lg:w-auto bg-white text-hp-electric hover:bg-white/90 whitespace-normal lg:whitespace-nowrap"
                >
                  {archetype.primaryCta.label}
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
            )}

            {archetype.secondaryCta.external ? (
              <a
                href={archetype.secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("assessment_secondary_cta")}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="font-bold w-full lg:w-auto bg-transparent border-white/40 text-white hover:bg-white/10 hover:border-white whitespace-normal lg:whitespace-nowrap"
                >
                  {archetype.secondaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </a>
            ) : (
              <Link
                href={archetype.secondaryCta.href}
                onClick={() => trackEvent("assessment_secondary_cta")}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="font-bold w-full lg:w-auto bg-transparent border-white/40 text-white hover:bg-white/10 hover:border-white whitespace-normal lg:whitespace-nowrap"
                >
                  {archetype.secondaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            )}
          </div>
          {/* Booking fallback: archetypes whose recommended next step isn't a call
            still get one visible way to book — this is the highest-intent
            moment on the site (user just completed the assessment). */}
          {archetype.primaryCta.href !== CALENDAR_URL &&
            archetype.secondaryCta.href !== CALENDAR_URL && (
              <p className="mt-4 text-sm font-sans">
                <BookCallButton
                  bare
                  location="assessment_result"
                  className="font-bold text-white underline underline-offset-4 hover:text-white/80"
                  iconClassName="mr-1.5 h-3.5 w-3.5"
                >
                  Prefer to talk it through? Book a free 15-minute call
                </BookCallButton>
              </p>
            )}

          <p className="mt-4 text-sm text-white/80 font-sans">
            15 minutes. No pitch. Just clarity on your next step.
          </p>
        </div>
      </BlurFade>

      {/* AI Roadmap Audit offer — the paid rung between this free result and
          the Self-Sufficiency Program. Sits after the primary CTA block so it
          never competes with the highest-intent action. No countdown, no fake
          urgency (design principle 4): the price is honest launch pricing with
          the anchor stated as plain text. */}
      <BlurFade inView delay={0.35}>
        <div className="bg-canvas rounded-hp-xl border border-hairline-strong p-6 md:p-8 mb-10">
          <div className="flex items-start gap-4">
            <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hp-electric/10 border border-hp-electric/20">
              <Compass className="h-5 w-5 text-hp-electric" aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-hp-electric mb-2">
                Go deeper
              </p>
              <h2 className="font-heading text-xl md:text-2xl font-bold text-ink mb-2">
                The AI Roadmap Audit
              </h2>
              <p className="text-base text-charcoal font-sans leading-relaxed mb-4">
                This profile tells you where you stand. The Audit maps what to
                do about it: a 90-minute deep-dive on your actual workflows,
                scored against current-generation agents and tooling, ranked by
                time saved and revenue impact. Written report and video
                walkthrough, yours to keep. Implement it yourself, or with me.
              </p>
              <p className="text-sm text-graphite font-sans mb-6">
                <span className="font-bold text-ink">{AUDIT_PRICE_LABEL}</span>{" "}
                launch pricing (normally {AUDIT_LIST_LABEL}) while the format is
                new.
              </p>
              <a
                href="/audit"
                onClick={() => trackConversion("audit_offer_click")}
              >
                <Button
                  size="lg"
                  className="font-bold bg-hp-electric text-white hover:bg-hp-deep whitespace-normal lg:whitespace-nowrap"
                >
                  Get the Roadmap Audit
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Diagnosis — moved below the CTA so depth is opt-in, not a gate. */}
      <BlurFade inView delay={0.4}>
        <div className="space-y-5 mb-10">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-ink">
            What this means
          </h2>
          {archetype.diagnosis.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-base md:text-lg text-charcoal font-sans leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </BlurFade>
      <p className="text-graphite text-sm font-sans text-center mb-8">
        You can stop anytime. No locked-in commitment.
      </p>
      {/* Retake */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Link
          href="/assessment"
          className="inline-flex items-center gap-2 text-sm text-graphite hover:text-ink transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          Retake the assessment
        </Link>
      </motion.div>
    </div>
  );
}
