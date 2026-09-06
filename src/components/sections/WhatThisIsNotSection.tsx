"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { ScrollHighlight } from "@/components/ui/ScrollHighlight";
import { diagonalWipe } from "@/lib/animation-variants";
import { motion } from "motion/react";
import Image from "next/image";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { trackEvent } from "@/lib/analytics";

const fitRows = [
  {
    title: "You want someone to just do it for you.",
    body: "I don't build it and hand it over. I teach you to build and judge it yourself, so you stop hiring consultants. If you want hands-off magic, hire an agency.",
  },
  {
    title: "You want a course or prompt pack.",
    body: "This is 1:1 over 8 to 10 weeks, built around your work. If you want cheap and fast, this will feel slow and expensive.",
  },
  {
    title: "You're still deciding if AI matters.",
    body: "My clients already use AI and feel the gap between output and real results. If you're still on the fence, start elsewhere. Come back when you're ready to move.",
  },
];

export default function WhatThisIsNotSection() {
  return (
    <section
      className="py-20 md:py-28 bg-background scroll-mt-20"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <BlurFade inView>
          <div className="mb-12 md:mb-16 grid md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-hp-electric mb-4">
                Honest fit
              </p>
              <h2 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-medium tracking-tight leading-[0.98] text-ink max-w-[12ch]">
                What this is NOT for
              </h2>
            </div>
            <p className="md:col-span-5 text-lg text-charcoal md:text-right max-w-sm md:ml-auto">
              I&apos;d rather lose a sale than take on work I can&apos;t
              deliver.
            </p>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.1}>
          <motion.div
            variants={diagonalWipe}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative w-full h-[280px] md:h-[400px] overflow-hidden mb-12 border border-ink/10"
            style={{ position: "relative" }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-1.5 bg-hp-electric z-10"
              aria-hidden="true"
            />
            <Image
              src="/marketing2.webp"
              alt="Alex Myers speaking to a group — real AI guidance in practice"
              fill
              className="object-cover outline outline-1 -outline-offset-1 outline-black/10"
              sizes="100vw"
              loading="lazy"
            />
          </motion.div>
        </BlurFade>

        <div className="mb-12 border-t border-ink/15">
          {fitRows.map((row, i) => (
            <div
              key={row.title}
              className="fit-row grid md:grid-cols-12 gap-4 md:gap-8 py-7 md:py-9 border-b border-ink/15 px-3 md:px-5"
            >
              <span className="md:col-span-1 font-display text-2xl font-bold text-hp-electric/30 leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="md:col-span-11 space-y-2">
                <ScrollHighlight highlightColor="hsl(220 96% 43% / 0.14)">
                  <strong className="font-display text-lg md:text-xl text-ink tracking-tight">
                    {row.title}
                  </strong>
                </ScrollHighlight>
                <p className="text-charcoal leading-relaxed max-w-3xl">
                  {row.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <BlurFade inView delay={0.2}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-ink/10 bg-cloud px-6 py-8 md:px-10">
            <p className="text-base md:text-lg text-ink font-display font-medium max-w-xl leading-snug">
              Still not sure? Book a 15-minute call. If I&apos;m not the right
              fit, I&apos;ll tell you — and point you toward someone who is.
            </p>
            <BookCallButton
              location="what_this_is_not"
              size="lg"
              className="font-bold shrink-0"
              trackOnClick={false}
              onClick={() => trackEvent("what_this_is_not_cta_click")}
            >
              Book a Call
            </BookCallButton>
          </div>
        </BlurFade>
      </div>

    </section>
  );
}
