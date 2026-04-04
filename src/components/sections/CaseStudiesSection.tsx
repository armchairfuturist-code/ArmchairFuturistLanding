"use client";

import { BlurFade } from '@/components/ui/blur-fade';
import { motion } from 'motion/react';
import { ArrowRight, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CALENDAR_URL } from '@/lib/constants';

const caseStudies = [
  {
    title: "Automated Client Response System",
    client: "Professional Services Firm",
    problem: "Team spent 3-4 hours daily answering repetitive client queries across email and WhatsApp. Response times averaged 6 hours. Clients complained about slow turnaround.",
    solution: "Built an n8n workflow that routes incoming queries, drafts context-aware responses using AI, and sends them through approved channels. Human reviews only edge cases.",
    results: [
      { metric: "18 hrs/week", label: "Saved on email & WhatsApp", icon: Clock },
      { metric: "6 hrs -> 15 min", label: "Average response time", icon: TrendingUp },
      { metric: "$4,200/mo", label: "Equivalent staff time saved", icon: DollarSign },
    ],
    timeline: "Built in 5 days",
  },
  {
    title: "Frictionless Service Purchase Flow",
    client: "Consulting & Advisory Practice",
    problem: "Potential clients bounced during service booking. The payment backend required 4 steps, no live chat support, and complex queries went unanswered. 60% drop-off at checkout.",
    solution: "Redesigned the purchase UX to 2 steps. Added a custom chatbot that handles pricing questions, service comparisons, and booking. Integrated payment backend with one-click checkout.",
    results: [
      { metric: "60% -> 18%", label: "Checkout drop-off rate", icon: TrendingUp },
      { metric: "12 hrs/week", label: "Saved on pre-sales queries", icon: Clock },
      { metric: "3.2x", label: "Increase in completed bookings", icon: DollarSign },
    ],
    timeline: "Delivered in 2 weeks",
  },
  {
    title: "Automated Meeting-to-Action Pipeline",
    client: "Remote Operations Team",
    problem: "Team of 12 held 40+ meetings weekly. Action items got lost in notes. Follow-up took 2 hours per person per week. Critical decisions slipped through gaps between tools.",
    solution: "Built a pipeline that transcribes meetings, extracts action items, assigns owners, creates calendar reminders, and sends weekly digests. Connected Slack, Calendar, and project management tools.",
    results: [
      { metric: "24 hrs/week", label: "Saved across the team", icon: Clock },
      { metric: "94%", label: "Action items completed on time", icon: TrendingUp },
      { metric: "$6,800/mo", label: "Recovered productivity value", icon: DollarSign },
    ],
    timeline: "Built in 10 days",
  },
];

export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="py-16 md:py-24 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <BlurFade inView>
          <div className="text-center mb-16">
            <p className="text-xs text-muted-foreground/60 font-mono mb-3">Real Results</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
              What Happens When AI Actually Works
            </h2>
            <p className="text-lg text-foreground/80 font-sans max-w-2xl mx-auto">
              Three recent projects. Measurable outcomes. No strategy decks.
            </p>
          </div>
        </BlurFade>

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
                      <p className="text-sm text-muted-foreground">{study.client}</p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-3 py-1.5 rounded-full shrink-0">
                      {study.timeline}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
                  {/* Left: Problem + Solution */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-mono text-muted-foreground mb-1">The Problem</p>
                      <p className="text-sm text-foreground/80 leading-relaxed">{study.problem}</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-muted-foreground mb-1">What I Built</p>
                      <p className="text-sm text-foreground/80 leading-relaxed">{study.solution}</p>
                    </div>
                  </div>

                  {/* Right: Results */}
                  <div>
                    <p className="text-xs font-mono text-muted-foreground mb-4">Results</p>
                    <div className="space-y-4">
                      {study.results.map((result) => (
                        <div key={result.metric} className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <result.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-lg font-bold text-primary">{result.metric}</p>
                            <p className="text-xs text-muted-foreground">{result.label}</p>
                          </div>
                        </div>
                      ))}
                    </div>
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
              These are typical outcomes. Your situation is different - but the math usually works out similar.
            </p>
            <Button asChild size="lg">
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                See What You Could Save
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
