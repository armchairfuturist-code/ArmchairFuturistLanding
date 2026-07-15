"use client";

import { motion } from 'motion/react';
import { BlurFade } from '@/components/ui/blur-fade';
import { NumberTicker } from '@/components/ui/number-ticker';
import { staggerContainer, staggerItem } from '@/lib/animation-variants';
import { CheckCircle2 } from 'lucide-react';

const featuredStats = [
  {
    value: "40+",
    numericValue: 40,
    suffix: "+",
    label: "AI systems deployed",
    detail: "From automated response pipelines to meeting-to-action workflows"
  },
  {
    value: "10–20h",
    label: "reclaimed weekly",
    detail: "Average per client"
  },
  {
    value: "6",
    numericValue: 6,
    label: "certifications",
    detail: "Certified Futurist, Change Management Professional, GenAI Expert"
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
              Proof
            </h2>
            <p className="text-foreground/70 font-sans text-lg max-w-xl">
              What happens when AI is actually owned, not just prompted.
            </p>
          </div>
        </BlurFade>

        {/* Featured stats - varied sizing, no card containers */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16"
        >
          {featuredStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="relative"
            >
              {/* Large number - typography doing the work */}
              {stat.numericValue != null ? (
                <p className="text-5xl md:text-6xl font-black text-primary leading-none mb-1">
                  <NumberTicker value={stat.numericValue} suffix={stat.suffix} />
                </p>
              ) : (
                <p className="text-5xl md:text-6xl font-black text-primary leading-none mb-1">
                  {stat.value}
                </p>
              )}
              <p className="text-xl font-semibold text-foreground mb-1">
                {stat.label}
              </p>
              <p className="text-sm text-muted-foreground">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Honest engagements list - no fabricated logo wall */}
        <BlurFade inView className="mb-8">
          <div className="border-t border-border pt-10">
            <p className="text-sm text-foreground/80 font-sans leading-relaxed max-w-2xl">
              Founders, solo operators, and small teams building AI-powered services.
              Names of recent clients withheld by request.
            </p>
          </div>
        </BlurFade>


      </div>
    </section>
  );
}
