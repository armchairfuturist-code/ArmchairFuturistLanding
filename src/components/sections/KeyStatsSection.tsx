"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ScrambleText } from "@/components/ui/scramble-text";
import { trackEvent } from "@/lib/analytics";
import { springStaggerContainer, springStaggerItem } from "@/lib/animation-variants";

const featuredStats = [
  {
    value: "40+",
    numericValue: 40,
    suffix: "+",
    label: "AI systems deployed",
    detail: "From automated response pipelines to meeting-to-action workflows",
  },
  {
    value: "10–20h",
    label: "reclaimed weekly",
    detail: "Average per client",
  },
  {
    value: "6",
    numericValue: 6,
    label: "certifications",
    detail: "Certified Futurist, Change Management Professional, GenAI Expert",
  },
];

export default function KeyStatsSection() {
  return (
    <section
      id="stats"
      className="relative py-20 md:py-28 bg-hp-electric text-white scroll-mt-20 overflow-hidden"
    >
      {/* Soft diagonal hatch — texture without gradient slop */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #fff 0 1px, transparent 1px 14px)",
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-6xl">
        <BlurFade inView>
          <div className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/70 mb-3">
                Evidence
              </p>
              <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight leading-[0.95] text-white max-w-[12ch]">
                <ScrambleText text="Proof, not promises." />
              </h2>
              {/* Scroll-driven scan line under the claim */}
              <div
                className="mt-5 h-1 w-full max-w-[12ch] bg-white/90"
                aria-hidden="true"
              />
            </div>
            <p className="text-white/80 font-sans text-lg md:text-xl max-w-sm md:text-right leading-snug">
              What happens when you own the system.
            </p>
          </div>
        </BlurFade>

        <motion.div
          variants={springStaggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-10 md:gap-6 lg:gap-12"
        >
          {featuredStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={springStaggerItem}
              className={`relative ${i > 0 ? "md:border-l md:border-white/20 md:pl-8 lg:pl-12" : ""}`}
            >
              {stat.numericValue != null ? (
                <p className="font-display text-[clamp(4rem,10vw,7rem)] font-bold text-white leading-[0.85] tracking-tight mb-3">
                  <NumberTicker value={stat.numericValue} suffix={stat.suffix} />
                </p>
              ) : (
                <p className="font-display text-[clamp(3.25rem,8vw,5.5rem)] font-bold text-white leading-[0.9] tracking-tight mb-3">
                  {stat.value}
                </p>
              )}
              <p className="text-xl md:text-2xl font-semibold text-white mb-2">
                <ScrambleText text={stat.label} speed={22} />
              </p>
              <p className="text-sm md:text-base text-white/70 max-w-[28ch]">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <BlurFade inView className="mt-16 md:mt-20">
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <p className="text-sm md:text-base text-white/75 font-sans leading-relaxed max-w-2xl">
              Founders, solo operators, and small teams building AI-powered
              services. Names of recent clients withheld by request.
            </p>
            <Link
              href="/assessment"
              className="inline-flex items-center justify-center h-11 px-6 text-sm font-semibold uppercase tracking-[0.7px] border border-white/40 text-white hover:bg-white/10 hover:border-white transition-colors shrink-0"
              onClick={() => trackEvent("stats_assessment_click")}
            >
              Take the Assessment
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
