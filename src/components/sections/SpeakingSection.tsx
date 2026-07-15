"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {MessageSquare, Mic, Users, Brain, TrendingUp, Shield} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { BlurFade } from '@/components/ui/blur-fade';
import { motion } from 'motion/react';
import { SPEAKING_FORM_URL } from '@/lib/constants';
import { rotateReveal, slideFromLeft } from '@/lib/animation-variants';

const offerings = [
  { 
    icon: MessageSquare, 
    title: "Executive Roundtables",
    description: "Small groups, high-impact discussions. Alex facilitates conversations about AI strategy, accountability gaps, and organizational readiness."
  },
  { 
    icon: Users, 
    title: "Team Workshops",
    description: "Hands-on sessions where teams identify AI bottlenecks and leave with actionable next steps. Not theory—tactical problem-solving."
  },
  { 
    icon: Brain, 
    title: "Strategy Facilitation",
    description: "Structured sessions to align leadership on AI priorities. Perfect for organizations stuck in 'AI committee' paralysis."
  },
];

const topics = [
  { icon: TrendingUp, text: "From AI Chaos to AI Clarity: what actually works" },
  { icon: Shield, text: "Data Sovereignty & Ending Platform Dependency" },
  { icon: Users, text: "Building Accountability in AI Projects" },
];

export default function SpeakingSection() {
  return (
    <section className="py-12 md:py-16 px-4 scroll-mt-20 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <BlurFade inView>
          <motion.div
            variants={rotateReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-2xl border border-border p-8 md:p-12 bg-card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Mic className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
                Facilitation & Roundtables
              </p>
            </div>

            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
              Need a Facilitator for Your AI Strategy Discussion?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Alex facilitates executive roundtables, strategy workshops, and team problem-solving sessions for organizations ready to move from AI discussions to AI decisions. No keynote fluff—just structured conversations that produce alignment and action.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {/* First offering: spans 2 cols, larger */}
              {(() => {
                const first = offerings[0];
                return (
                  <motion.div
                    key={first.title}
                    className="md:col-span-2 p-6 rounded-xl bg-primary/5 border border-primary/10"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                  >
                    <first.icon className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-heading font-bold text-foreground text-lg mb-2">{first.title}</h3>
                    <p className="text-sm text-foreground/80 max-w-prose">{first.description}</p>
                  </motion.div>
                );
              })()}
              {/* Second offering: 1 col */}
              {(() => {
                const second = offerings[1];
                return (
                  <motion.div
                    key={second.title}
                    className="p-5 rounded-xl bg-background border border-border"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <second.icon className="h-6 w-6 text-primary mb-3" />
                    <h3 className="font-heading font-bold text-foreground mb-2">{second.title}</h3>
                    <p className="text-sm text-muted-foreground">{second.description}</p>
                  </motion.div>
                );
              })()}
              {/* Third offering: full width below */}
              {(() => {
                const third = offerings[2];
                return (
                  <motion.div
                    key={third.title}
                    className="md:col-span-3 p-5 rounded-xl bg-background border border-border"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                        <third.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-foreground mb-1">{third.title}</h3>
                        <p className="text-sm text-muted-foreground">{third.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </div>

            <h3 className="font-heading font-bold text-foreground mb-4">Popular Discussion Topics:</h3>
            <ul className="space-y-2 mb-8">
              {topics.map((t, index) => (
                <li key={t.text} className="flex items-center gap-3">
                  <t.icon className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-foreground/80">{t.text}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button asChild size="lg" className="h-12 px-6 text-base font-bold">
                <a
                  href={SPEAKING_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('speaking_inquiry_click')}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Request a Session
                </a>
              </Button>

            </div>
          </motion.div>
        </BlurFade>

        {/* Event photos — visual proof of speaking engagements */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src="/marketing3.jpeg"
              alt="Alex Myers presenting at Sunsetpreneurs 2026 on AI strategy"
              fill
              className="object-cover object-[60%_35%] outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src="/marketing4.jpeg"
              alt="Alex Myers facilitating at Startup Braga on AI adoption"
              fill
              className="object-cover object-[50%_30%] outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}