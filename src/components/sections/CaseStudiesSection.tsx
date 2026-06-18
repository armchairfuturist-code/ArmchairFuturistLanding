"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { motion } from "motion/react";
import { BookCallButton } from "@/components/ui/BookCallButton";

const caseStudies = [
  {
    title: "Automated Client Response System",
    client: "Professional Services Firm",
    problem:
      "Team spent a large share of the day answering repetitive client queries across email and WhatsApp. Response times stretched across the working day. Clients complained about slow turnaround.",
    solution:
      "Built an n8n workflow that routes incoming queries, drafts context-aware responses using AI, and sends them through approved channels. Human reviews only edge cases.",
    patterns: [
      "Mapped 14 repetitive query categories across email and WhatsApp",
      "Drafted 6 reusable response templates with human-review escalation rules",
      "Handed off a runbook plus a 2-person training session for the ops team",
    ],
    timeline: "Built in 5 days",
  },
  {
    title: "Frictionless Service Purchase Flow",
    client: "Consulting & Advisory Practice",
    problem:
      "Potential clients bounced during service booking. The payment backend required multiple steps, no live chat support, and complex queries went unanswered. High abandonment at checkout.",
    solution:
      "Redesigned the purchase UX to 2 steps. Added a custom chatbot that handles pricing questions, service comparisons, and booking. Integrated payment backend with one-click checkout.",
    patterns: [
      "Redesigned checkout to a 2-step flow with one-click payment",
      "Built a pricing-comparison chatbot covering the top service questions",
      "Wrote a short sales-script guide for the team to handle chatbot handoffs",
    ],
    timeline: "Delivered in 2 weeks",
  },
  {
    title: "Automated Meeting-to-Action Pipeline",
    client: "Remote Operations Team",
    problem:
      "Distributed team held many recurring meetings weekly. Action items got lost in notes. Follow-up ate into everyone's week. Critical decisions slipped through gaps between tools.",
    solution:
      "Built a pipeline that transcribes meetings, extracts action items, assigns owners, creates calendar reminders, and sends weekly digests. Connected Slack, Calendar, and project management tools.",
    patterns: [
      "Transcribed and tagged action items from every recurring meeting",
      "Wired owner-assignment, calendar reminders, and a weekly digest to Slack",
      "Ran a 30-minute team walkthrough plus a written handoff doc",
    ],
    timeline: "Built in 10 days",
  },
];

export default function CaseStudiesSection() {
  return (
    <section
      id="case-studies"
      className="py-16 md:py-24 bg-background scroll-mt-20"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <BlurFade inView>
          <div className="text-center mb-12">
            <p className="text-xs font-mono mb-3 text-foreground/60">
              Engagement Patterns
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
              What Happens When AI Actually Works
            </h2>
            <p className="text-lg text-foreground/80 font-sans max-w-2xl mx-auto">
              Three recent projects. Anonymized and composited. No strategy decks.
            </p>
          </div>
        </BlurFade>

        <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto mb-12 italic">
          Composite, anonymized — illustrative patterns from real engagements, not specific client outcomes.
        </p>

        <div className="space-y-12">
          {caseStudies.map((study, i) => (
            <BlurFade inView key={study.title} delay={i * 0.1}>
              <motion.div
                className="rounded-2xl border border-border/60 bg-card overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-border/40 bg-secondary/50">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-1">
                        {study.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {study.client}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-foreground/60 bg-muted/80 px-3 py-1.5 rounded-full shrink-0">
                      {study.timeline}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
                  {/* Left: Problem + Solution */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-mono text-foreground/60 mb-1">
                        The Problem
                      </p>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {study.problem}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-foreground/60 mb-1">
                        What I Built
                      </p>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {study.solution}
                      </p>
                    </div>
                  </div>

                  {/* Right: Engagement patterns */}
                  <div>
                    <p className="text-xs font-mono text-foreground/60 mb-4">
                      What I Worked On
                    </p>
                    <ul className="space-y-3">
                      {study.patterns.map((pattern) => (
                        <li
                          key={pattern}
                          className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0"
                          />
                          <span>{pattern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </BlurFade>
          ))}
        </div>

        {/* CTA */}
        <BlurFade inView>
          <div className="text-center mt-12">
            <p className="text-lg text-foreground/80 mb-6">
              Every engagement is different. Bring your situation and we will work out what fits.
            </p>
            <BookCallButton
              location="case_studies"
              size="lg"
              icon="arrow"
              iconClassName="ml-2 h-4 w-4"
            >
              Talk Through Your Situation
            </BookCallButton>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
