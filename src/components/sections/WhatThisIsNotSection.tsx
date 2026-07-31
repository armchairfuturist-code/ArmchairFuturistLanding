"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { ScrollHighlight } from "@/components/ui/ScrollHighlight";
import { diagonalWipe } from "@/lib/animation-variants";
import { motion } from "motion/react";
import Image from "next/image";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { ScrambleText } from "@/components/ui/scramble-text";
import { trackEvent } from "@/lib/analytics";

const fitRows = [
  {
    title: "You already know what to do — you just want someone to confirm it.",
    body: "I work with people ready to move, not organizations paying a consultant to articulate what they already believe but won't change.",
  },
  {
    title: "You need a vendor to manage change for you.",
    body: "I build systems you own and operate. If you want AI magic that runs on its own without your team touching it, other consultants are better suited.",
  },
  {
    title: "You're still evaluating whether AI matters.",
    body: "If you're forming committees to study the opportunity, start elsewhere. I work with people who are ready — not those building consensus.",
  },
];

export default function WhatThisIsNotSection() {
  return (
    <section
      id="what-this-is-not"
      className="py-20 md:py-28 bg-background scroll-mt-20"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <BlurFade inView>
          <div className="mb-12 md:mb-16 grid md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-hp-electric mb-4">
                Honest fit
              </p>
              <h2 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-tight leading-[0.98] text-ink max-w-[12ch]">
                <ScrambleText text="What this is NOT for" />
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
              priority
            />
          </motion.div>
        </BlurFade>

        <div className="mb-12 border-t border-ink/15">
          {fitRows.map((row, i) => (
            <div
              key={row.title}
              className="fit-row view-unlock grid md:grid-cols-12 gap-4 md:gap-8 py-7 md:py-9 border-b border-ink/15 px-3 md:px-5"
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
              className="cta-electric font-bold shrink-0"
              trackOnClick={false}
              onClick={() => trackEvent("what_this_is_not_cta_click")}
            >
              Book a Call
            </BookCallButton>
          </div>
        </BlurFade>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is Alex Myers' consulting service NOT for?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Alex Myers' services are not for organizations that want a consultant to confirm what they already know but won't change, teams that want AI to run without their involvement, or leaders still evaluating whether AI matters. He works with founders, operators, and small teams ready.",
                },
              },
            ],
          }),
        }}
      />
    </section>
  );
}
