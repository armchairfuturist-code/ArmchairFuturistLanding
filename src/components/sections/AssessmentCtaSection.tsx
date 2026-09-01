"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { questions } from "@/lib/assessment/config";
import {
  readQuizDraft,
  saveQuizDraft,
} from "@/lib/assessment/quiz-session";
import { trackEvent } from "@/lib/analytics";
import { BlurFade } from "@/components/ui/blur-fade";

const firstQuestion = questions[0];
const questionsLeft = questions.length - 1;

/**
 * One sentence of insight per answer option, keyed by index.
 * ponytail: hardcoded to the live Q1 option order in config.ts — if the
 * first question changes, update these strings in the same commit.
 */
const teaserReactions = [
  "That polite subject change usually means AI has no owner in the room, so ignoring it stays cost-free.",
  "A couple of enthusiasts carrying the whole topic is fragile: the moment they get pulled away, the momentum stops.",
  "Pilots without a stated purpose are the most common pattern in these results: lots of activity, no decision.",
  "Working it out solo is more common than the meeting framing suggests. It usually means nobody has built the structure around you yet.",
];

export default function AssessmentCtaSection() {
  const reducedMotion = useReducedMotion();
  const [selected, setSelected] = useState<number | null>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Restore the teaser state for returning visitors who already answered Q1.
  useEffect(() => {
    const draft = readQuizDraft();
    if (draft && draft.currentQuestion >= 1) {
      setSelected(draft.answerIndices[0] ?? null);
    }
  }, []);

  const handleSelect = (optionIndex: number) => {
    setSelected(optionIndex);
    // Seed the quiz draft so /assessment resumes at question 2.
    saveQuizDraft({ currentQuestion: 1, answerIndices: [optionIndex] });
    trackEvent("homepage_assessment_answer", { option_index: optionIndex });
  };

  const handleArrowKeys = (event: React.KeyboardEvent, index: number) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const count = firstQuestion.answers.length;
    const next = (index + (event.key === "ArrowDown" ? 1 : -1) + count) % count;
    optionRefs.current[next]?.focus();
  };

  return (
    <section className="relative py-16 md:py-20 bg-ink scroll-mt-20">
      <BlurFade
        inView
        blur={reducedMotion ? "0px" : "6px"}
        duration={reducedMotion ? 0.15 : 0.4}
        className="container mx-auto px-4 md:px-6 max-w-3xl"
      >
        <div className="border border-white/10 bg-white/[0.03] px-5 py-8 md:px-10 md:py-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-hp-soft mb-6">
            Free assessment · question 1 of {questions.length}
          </p>
          <h2
            id="assessment-teaser-question"
            className="font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-medium tracking-tight text-white leading-[1.1] mb-3"
          >
            {firstQuestion.text}
          </h2>
          <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
            Answer the first question right here. The rest take about 3
            minutes, and no email is required to see results.
          </p>

          <div aria-live="polite">
            {selected === null ? (
              <div
                role="radiogroup"
                aria-labelledby="assessment-teaser-question"
                className="space-y-3"
              >
                {firstQuestion.answers.map((answer, idx) => {
                  const checked = selected === idx;
                  return (
                    <button
                      key={idx}
                      ref={(el) => {
                        optionRefs.current[idx] = el;
                      }}
                      type="button"
                      role="radio"
                      aria-checked={checked}
                      tabIndex={idx === (selected ?? 0) ? 0 : -1}
                      onClick={() => handleSelect(idx)}
                      onKeyDown={(event) => handleArrowKeys(event, idx)}
                      className={`w-full text-left px-4 py-4 md:px-5 rounded-hp-md border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hp-bright focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                        checked
                          ? "border-hp-electric bg-hp-electric/15"
                          : "border-white/15 bg-white/[0.03] hover:border-hp-electric/60 hover:bg-hp-electric/10"
                      }`}
                    >
                      <span className="flex items-start gap-3">
                        <span
                          className={`flex-shrink-0 w-7 h-7 rounded-lg border text-xs font-mono flex items-center justify-center mt-0.5 transition-colors ${
                            checked
                              ? "border-hp-electric bg-hp-electric text-white"
                              : "border-white/25 text-hp-soft"
                          }`}
                        >
                          {String.fromCharCode(97 + idx)}
                        </span>
                        <span className="text-sm md:text-base text-white/85 leading-relaxed">
                          {answer.text}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <motion.div
                key="teaser-reaction"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
              >
                <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-xl mb-6">
                  {teaserReactions[selected]}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
                  <Link
                    href="/assessment"
                    onClick={() => trackEvent("homepage_assessment_cta")}
                    className="inline-flex items-center justify-center gap-2 h-12 px-7 text-sm font-semibold uppercase tracking-[0.7px] bg-hp-electric text-white hover:bg-hp-bright transition-colors"
                  >
                    See your full score
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="self-start text-sm text-white/60 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hp-bright px-1 py-1"
                  >
                    Change answer
                  </button>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                  {questionsLeft} questions left · about 3 minutes · no email
                  required
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
