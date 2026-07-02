"use client";

import { motion } from 'motion/react';
import { BlurFade } from '@/components/ui/blur-fade';
import { CheckCircle2 } from 'lucide-react';

const featuredStats = [
  {
    value: "40+",
    label: "AI systems deployed",
    detail: "Across organizations of all sizes"
  },
  {
    value: "10–20h",
    label: "reclaimed weekly",
    detail: "Average per client"
  },
  {
    value: "6",
    label: "certifications",
    detail: "FLTA, CCMP, GenAI, CEBP, PSM, PAL"
  },
];


export default function KeyStatsSection() {
  return (
    <section id="stats" className="py-16 md:py-20 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        
        {/* Header - left aligned for variety */}
        <BlurFade inView>
          <div className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary mb-3">
              Track record
            </h2>
            <p className="text-foreground/70 font-sans text-lg max-w-xl">
              For founders, operators, and independent professionals building AI-powered services.
            </p>
          </div>
        </BlurFade>

        {/* Featured stats - varied sizing, no card containers */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16">
          {featuredStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
            >
              {/* Large number - typography doing the work */}
              <p className="text-5xl md:text-6xl font-black text-primary leading-none mb-1">
                {stat.value}
              </p>
              <p className="text-xl font-semibold text-foreground mb-1">
                {stat.label}
              </p>
              <p className="text-sm text-muted-foreground">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Honest engagements list - no fabricated logo wall */}
        <BlurFade inView className="mb-8">
          <div className="border-t border-border pt-10">
            <p className="text-sm text-foreground/80 font-sans leading-relaxed max-w-2xl">
              Founders, solo operators, and small teams building AI-powered services.
              Names of recent clients withheld by request.
            </p>
          </div>
        </BlurFade>

        {/* Summary box - E-E-A-T for LLMs */}
        <motion.div
          className="mt-12 p-6 border-l-2 border-primary bg-card"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <h3 className="font-heading font-bold text-foreground mb-2">
                About Alex Myers
              </h3>
              <p className="text-sm text-foreground/80 font-sans leading-relaxed">
                <strong>AI Guide</strong> based in Portugal, serving clients worldwide.
                With <strong>6 professional certifications</strong> and <strong>40+ AI systems deployed</strong>,
                Alex teaches deep AI literacy so you can design, launch, and sell your own AI-powered services.
                No dependency. No retainer. Just understanding.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
