"use client";
import Link from "next/link";
import { Eye, Compass, ArrowRightLeft } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { LetterSpacingReveal } from "@/components/ui/letter-spacing-reveal";
import { motion } from "motion/react";

const signals = [
  {
    icon: Eye,
    title: "Presence",
    body: "Before we move anywhere, we stop. I help you sit with the uncertainty long enough to see what's actually there — not what the noise tells you to see.",
  },
  {
    icon: Compass,
    title: "Perspective",
    body: "Once the fog clears, we map the full landscape. Not just the tools, but the structures, the people, the incentives, and the unspoken fears that keep organizations stuck.",
  },
  {
    icon: ArrowRightLeft,
    title: "Safe Passage",
    body: "AI is a construction crane: it can raise most of the building, but the final finish still needs human tweezers. The bridge from fear to agency is built together, one step at a time.",
  },
];

export default function ChallengeSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <BlurFade inView>
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary mb-5">
              <LetterSpacingReveal
                text="The edge of change is where everything shifts"
                className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary"
                duration={0.8}
              />
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 font-sans leading-relaxed max-w-3xl mx-auto">
              Most organizations know they need to move. What they don&apos;t
              know is where the ground is solid. That&apos;s the
              edge&mdash;the space between what was and what&apos;s next. I
              help you see the full field, so you can move with intention
              instead of reacting to every shift. The result? Fewer false
              starts and more traction where it actually counts.
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
