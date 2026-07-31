"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { BookCallButton } from "@/components/ui/BookCallButton";

const caseStudies = [
  {
    title: "Automated Client Response System",
    client: "Professional Services Firm",
    problem:
      "Team spent 4-6 hours per day answering repetitive client queries across email and WhatsApp. Response times stretched 8+ hours. Clients complained about slow turnaround. The team was drowning in busywork, watching their real priorities slip.",
    solution:
      "Built an n8n workflow that routes incoming queries, drafts context-aware responses using AI, and sends them through approved channels. Human reviews only edge cases.",
    patterns: [
      "Mapped 14 repetitive query categories across email and WhatsApp",
      "Drafted 6 reusable response templates with human-review escalation rules",
      "Handed off a runbook plus a 2-person training session for the ops team",
    ],
    timeline: "Built in 5 days",
    index: "01",
  },
  {
    title: "Frictionless Service Purchase Flow",
    client: "Consulting & Advisory Practice",
    problem:
      "Potential clients bounced during service booking. The payment backend required multiple steps, no live chat support, and complex queries went unanswered. High abandonment at checkout. Potential revenue walked away while the checkout flow stood in the way.",
    solution:
      "Redesigned the purchase UX to 2 steps. Added a custom chatbot that handles pricing questions, service comparisons, and booking. Integrated payment backend with one-click checkout.",
    patterns: [
      "Redesigned checkout to a 2-step flow with one-click payment",
      "Built a pricing-comparison chatbot covering the top service questions",
      "Wrote a short sales-script guide for the team to handle chatbot handoffs",
    ],
    timeline: "Delivered in 2 weeks",
    index: "02",
  },
  {
    title: "Automated Meeting-to-Action Pipeline",
    client: "Remote Operations Team",
    problem:
      "Distributed team held many recurring meetings weekly. Action items got lost in notes. Follow-up ate into everyone's week. Critical decisions slipped through gaps between tools. The team was putting in hours but seeing nothing stick.",
    solution:
      "Built a pipeline that transcribes meetings, extracts action items, assigns owners, creates calendar reminders, and sends weekly digests. Connected Slack, Calendar, and project management tools.",
    patterns: [
      "Transcribed and tagged action items from every recurring meeting",
      "Wired owner-assignment, calendar reminders, and a weekly digest to Slack",
      "Ran a 30-minute team walkthrough plus a written handoff doc",
    ],
    timeline: "Built in 10 days",
    index: "03",
  },
];

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
      </div>
    </section>
  );
}
