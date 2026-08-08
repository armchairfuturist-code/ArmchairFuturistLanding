"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { CASE_STUDIES } from "@/content/case-studies";
import { GITHUB_URL } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

const caseStudies = CASE_STUDIES;

export default function CaseStudiesSection() {
  return (
    <section
      id="case-studies"
      className="py-20 md:py-28 bg-background scroll-mt-20"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <BlurFade inView>
          <div className="mb-16 md:mb-20 grid md:grid-cols-12 gap-6 md:gap-8 items-end">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-hp-electric mb-4">
                Case work
              </p>
              <h2 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-tight leading-[0.98] text-ink max-w-[16ch]">
                What happens when AI actually works
              </h2>
            </div>
            <p className="md:col-span-5 text-lg text-charcoal font-sans md:text-right md:pb-1 max-w-md md:ml-auto">
              Three recent projects. Anonymized and composited. No strategy
              decks.
            </p>
          </div>
        </BlurFade>

        <div className="space-y-0 border-t border-ink/15">
          {caseStudies.map((study) => (
            <article
              key={study.title}
              className="group relative border-b border-ink/15 py-10 md:py-14 pl-5 md:pl-8 grid md:grid-cols-12 gap-6 md:gap-10 view-unlock"
            >
              {/* Scroll-driven electric rail — grows as row enters view */}
              <span
                className="case-electric-rail view-rail"
                aria-hidden="true"
              />

              {/* Index + timeline rail */}
              <div className="md:col-span-2 flex md:flex-col items-baseline md:items-start justify-between md:justify-start gap-3">
                <span className="view-index font-display text-4xl md:text-5xl font-bold text-hp-electric/30 group-hover:text-hp-electric/55 transition-colors duration-300 leading-none">
                  {study.index}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite">
                  {study.timeline}
                </span>
              </div>

              {/* Title block */}
              <div className="md:col-span-4">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-ink tracking-tight leading-[1.1] mb-3 group-hover:text-hp-electric transition-colors duration-300">
                  {study.title}
                </h3>
                <p className="text-sm text-graphite font-medium">{study.client}</p>
              </div>

              {/* Body */}
              <div className="md:col-span-6 grid sm:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-5">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-hp-electric mb-2">
                      The problem
                    </p>
                    <p className="text-sm text-charcoal leading-relaxed">
                      {study.problem}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-hp-electric mb-2">
                      What I built
                    </p>
                    <p className="text-sm text-charcoal leading-relaxed">
                      {study.solution}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-hp-electric mb-3">
                    What I worked on
                  </p>
                  <ul className="space-y-3">
                    {study.patterns.map((pattern) => (
                      <li
                        key={pattern}
                        className="flex items-start gap-3 text-sm text-charcoal leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-2 w-2 shrink-0 bg-hp-electric"
                        />
                        <span>{pattern}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        <BlurFade inView>
          <div className="mt-14 md:mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-ink/10 bg-cloud px-6 py-8 md:px-10 md:py-10">
            <p className="text-lg md:text-xl text-ink font-display font-medium max-w-md leading-snug">
              Every engagement is different. Bring your situation and we will
              work out what fits.
            </p>
            <BookCallButton
              location="case_studies"
              size="lg"
              icon="arrow"
              iconClassName="ml-2 h-4 w-4"
              className="cta-electric w-full sm:w-auto whitespace-normal sm:whitespace-nowrap shrink-0"
            >
              Talk Through Your Situation
            </BookCallButton>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.1}>
          <div className="mt-8 md:mt-10 grid md:grid-cols-12 gap-6 md:gap-8 border border-ink/10 bg-canvas px-6 py-8 md:px-10 md:py-10">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-hp-electric mb-3">
                The moat is public
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-ink tracking-tight leading-[1.1] mb-3">
                Working AI systems, open on GitHub
              </h3>
              <p className="text-sm md:text-base text-charcoal leading-relaxed max-w-xl">
                An MCP server for investment analysis. A multi-model writing
                harness. Production client sites. These are the same ideas from
                this page, shipped and verifiable, not slideware.
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col justify-center gap-4">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-electric inline-flex items-center justify-center gap-2 h-12 px-7 text-sm font-semibold uppercase tracking-[0.7px] shrink-0"
              >
                Browse the Repos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="text-xs text-graphite font-mono">
                github.com/armchairfuturist-code
              </p>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
