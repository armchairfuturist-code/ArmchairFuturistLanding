"use client";

import { BlurFade } from '@/components/ui/blur-fade';
import { XCircle, AlertTriangle, Users, Clock, Wrench, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CALENDAR_URL } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

/**
 * What This Is NOT Section
 * 
 * Per SEO-AGI guidelines, every page should include a section honestly
 * telling the reader when this option is a BAD fit. This is the ultimate
 * E-E-A-T trust signal - it shows honesty and builds credibility.
 * 
 * This section should include at least one line a competitor would never
 * say because it might scare off a lead.
 */
const notForYou = [
  {
    icon: Users,
    title: "Not for organizations seeking a deck for the board",
    description: "I execute. I provision infrastructure, write prompts, and build workflows myself. If you need slides to show leadership, other consultants are better suited.",
    bold: true
  },
  {
    icon: Clock,
    title: "Not for leaders still evaluating whether AI matters",
    description: "If you're still forming committees to study AI, start elsewhere. I work with organizations and individuals who are ready to execute—not to write reports."
  },
  {
    icon: Wrench,
    title: "Not for teams who want AI to do the work for them",
    description: "I build systems you understand and operate. If you want AI magic that runs on its own, this isn't the right fit. Someone on your team needs to own the process."
  },
  {
    icon: AlertTriangle,
    title: "Not if you expect AI to fix team dysfunction",
    description: "AI amplifies what's already there. If your team struggles with accountability, trust, or decision rights, AI won't fix that—it will expose it. I can help you address it, but you have to be willing to do the work.",
    bold: true
  }
];

const betterOptions = [
  {
    scenario: "You need a keynote speaker who delivers polished, non-technical talks",
    recommendation: "Consider traditional management consultants or industry futurists who specialize in presentations"
  },
  {
    scenario: "You want a fixed-price project with guaranteed ROI before we start",
    recommendation: "Large strategy consulting firms offer packaged assessments—you'll pay more, but you'll get the structure you're used to"
  },
  {
    scenario: "Your organization is looking for a vendor to blame if things go wrong",
    recommendation: "This work requires shared ownership. I can't care more about your outcomes than you do."
  }
];

export default function WhatThisIsNotSection() {
  return (
    <section id="what-this-is-not" className="py-16 md:py-24 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <BlurFade inView>
          <div className="max-w-2xl mb-12">
            <p className="text-xs text-muted-foreground/60 font-mono mb-2 uppercase tracking-widest">
              Honest Fit Assessment
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
              What this is NOT for
            </h2>
            <p className="text-lg text-foreground/80 font-sans max-w-2xl mx-auto">
              I'd rather lose a sale than take on work I can't deliver. If these describe you, there are better options.
            </p>
          </div>
        </BlurFade>

        <div className="grid gap-5 md:grid-cols-2 mb-12">
          {notForYou.map((item, index) => {
            const Icon = item.icon;
            return (
              <BlurFade inView key={item.title} delay={index * 0.1}>
                <div className={`rounded-xl border ${item.bold ? 'border-primary/30 bg-primary/5' : 'border-border/60 bg-card'} p-6 h-full`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${item.bold ? 'bg-primary/10' : 'bg-muted'}`}>
                      <Icon className={`w-5 h-5 ${item.bold ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <h3 className={`font-heading font-bold text-foreground mb-2 ${item.bold ? 'text-lg' : 'text-base'}`}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </BlurFade>
            );
          })}
        </div>

        <BlurFade inView delay={0.4}>
          <div className="rounded-xl border border-border/60 bg-secondary/50 p-6 mb-8">
            <h3 className="font-heading font-bold text-foreground mb-4 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary" />
              Better Options If...
            </h3>
            <div className="space-y-4">
              {betterOptions.map((item, index) => (
                <div key={index} className="pl-4 border-l-2 border-border">
                  <p className="text-sm text-foreground/80 mb-1">
                    <span className="font-semibold">{item.scenario}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">{item.recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.5}>
          <div className="text-center">
            <p className="text-base text-foreground/80 mb-6 max-w-xl mx-auto">
              Still not sure? Book a 15-minute call. If I'm not the right fit, I'll tell you—and point you toward someone who is.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="font-bold"
              onClick={() => trackEvent('what_this_is_not_cta_click')}
            >
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                Book a Free Strategy Call
              </a>
            </Button>
          </div>
        </BlurFade>
      </div>

      {/* Structured data for LLM extraction */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Alex Myers' consulting service NOT for?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Alex Myers' services are not for: organizations seeking presentation theatre rather than execution, leaders who want AI 'in theory' without readiness to act, teams who won't touch the tools themselves, or organizations expecting AI to solve culture problems. He works best with clients at the point of execution—where readiness meets action."
                }
              },
              {
                "@type": "Question",
                "name": "Who should not hire Alex Myers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You should not hire Alex Myers if you: need polished slide decks for board meetings theatre, expect AI to solve underlying culture or accountability problems, want a black-box solution you never have to understand, or are still forming committees to evaluate whether AI is relevant. Other consultants are better suited for those needs."
                }
              }
            ]
          })
        }}
      />
    </section>
  );
}