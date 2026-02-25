"use client";
import { Compass, Bot, ShieldCheck } from 'lucide-react';
import { BlurFade } from '@/components/ui/blur-fade';
import { motion } from 'framer-motion';

const signals = [
  {
    icon: Compass,
    title: 'Human Architect',
    body: 'Direction-setting with business context, decision rights, and measurable ownership.',
  },
  {
    icon: Bot,
    title: 'High-Vocabulary Prompting',
    body: 'Clear intent capture to reduce ambiguity before execution enters production.',
  },
  {
    icon: ShieldCheck,
    title: 'Last Mile Polishing',
    body: 'AI is a construction crane: it can raise most of the building, but the final finish still needs human tweezers. Middle-to-middle, not end-to-end.',
  },
];

export default function ChallengeSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <BlurFade inView>
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary mb-5">
              AI Adoption Stalls Because of People, Not Technology
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 font-sans leading-relaxed max-w-3xl mx-auto">
              Most companies layer AI onto existing processes without rethinking workflows, incentives, or decision rights. The result is an <strong className="text-primary">Accountability Gap</strong> &mdash; the space between an AI output and a business result. I bridge that gap as your Trusted Human Architect.
            </p>
          </div>
        </BlurFade>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {signals.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <motion.article
                key={signal.title}
                className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="inline-flex p-2 rounded-lg bg-primary/10 mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">{signal.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{signal.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
