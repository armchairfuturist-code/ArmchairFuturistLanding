"use client";

import { Button } from '@/components/ui/button';
import { Heart, Lightbulb, TrendingUp, CalendarDays } from 'lucide-react';
import { trackConversion } from '@/lib/analytics';
import { BlurFade } from '@/components/ui/blur-fade';
import { motion } from 'framer-motion';

const pillars = [
  {
    icon: Heart,
    title: "From Fear to Understanding",
    description: "AI anxiety is real and valid. We start by acknowledging what you're feeling — then we replace uncertainty with clarity about what AI actually means for your work and life."
  },
  {
    icon: Lightbulb,
    title: "From Understanding to Agency",
    description: "Once the fog lifts, we build your personal AI literacy — not generic training, but the specific skills and mental models that matter for your role and ambitions."
  },
  {
    icon: TrendingUp,
    title: "From Agency to Optimism",
    description: "The future isn't something that happens to you. With the right frame, AI becomes a lever for your goals — more time, more creative output, more impact."
  }
];

export default function AIMentoringSection() {
  return (
    <section id="ai-mentoring" className="py-16 md:py-24 px-4 bg-secondary scroll-mt-20">
      <div className="container max-w-5xl mx-auto">
        <BlurFade inView>
          <div className="text-center mb-12">
            <p className="text-xs text-muted-foreground/60 font-mono mb-2">Last updated: February 2026</p>
            <p className="text-sm font-mono text-primary uppercase tracking-widest mb-3">
              AI Mentoring
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              What Is AI Mentoring and Who Is It For?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              AI mentoring is one-on-one coaching that helps you move from AI anxiety to agency. Most AI &quot;training&quot; teaches tools &mdash; Alex mentors people. Whether you&apos;re a seasoned executive or early in your career, the real barrier isn&apos;t technical &mdash; it&apos;s the story you&apos;re telling yourself about what&apos;s coming.
            </p>
          </div>
        </BlurFade>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              className="bg-background rounded-xl p-6 shadow-sm border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.15 }}
              whileHover={{ scale: 1.02 }}
            >
              <pillar.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        <BlurFade inView delay={0.3}>
          <div className="text-center">
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              This isn&apos;t for everyone — it&apos;s for people who want to lead their own AI journey, not be dragged along by it. Sessions start at $97.
            </p>
            <Button asChild size="lg" className="h-12 px-8 text-base font-bold">
              <a href="https://calendar.app.google/nAHHwNMfhDvXGv7P7" target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('mentoring_book_session', 97)}>
                <CalendarDays className="mr-2 h-5 w-5" />
                Book a Mentoring Session
              </a>
            </Button>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
