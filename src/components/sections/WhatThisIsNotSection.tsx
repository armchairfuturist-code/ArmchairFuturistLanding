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
    title: "You want to build it yourself.",
    body: "We work one-on-one on your own business. You learn to build AI workflows and judge whether they work. The 8-to-10-week programme gives you time to put that into practice, with me alongside you.",
  },
  {
    title: "You want me to build it for you.",
    body: "You bring the problem. I build and ship the system. Done-for-you implementation, for when you need the work delivered and don't want to take on the build yourself.",
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
              <h2 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-medium tracking-tight leading-[0.98] text-ink max-w-[14ch]">
                Who this is for
              </h2>
            </div>
            <p className="md:col-span-5 text-lg text-charcoal md:text-right max-w-sm md:ml-auto">
              Both kinds of people are welcome here. What matters is that
              you leave more capable than you arrived.
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-ink/10 bg-cloud rounded-hp-xl px-6 py-8 md:px-10">
            <p className="text-base md:text-lg text-ink font-display font-medium max-w-xl leading-snug">
              Book a 15-minute call to talk through what you need. If I&apos;m
              not the right fit, I&apos;ll tell you and point you toward someone who is.
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
