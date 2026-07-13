"use client";

import { BlurFade } from '@/components/ui/blur-fade';
import Image from 'next/image';
import { BookCallButton } from '@/components/ui/BookCallButton';
import { trackEvent } from '@/lib/analytics';

/**
 * What This Is NOT Section
 *
 * Simplified version — keeps the hero image, distills to one core message:
 * Alex works with people ready to execute, not those paying a consultant
 * to validate what they already know but won't change.
 */

export default function WhatThisIsNotSection() {
  return (
    <section id="what-this-is-not" className="py-16 md:py-24 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <BlurFade inView>
          <div className="max-w-2xl mb-12">
            <p className="hp-chevron text-sm text-hp-electric font-medium mb-2">
              Honest Fit Assessment
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
              What this is NOT for
            </h2>
            <p className="text-lg text-foreground/80 font-sans max-w-2xl mx-auto">
              I&apos;d rather lose a sale than take on work I can&apos;t deliver.
            </p>
          </div>
        </BlurFade>

        {/* Image — real-world credibility signal */}
        <BlurFade inView delay={0.1}>
          <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-12 border border-border/60">
            <Image
              src="/marketing2.webp"
              alt="Alex Myers speaking to a group — real AI guidance in practice"
              fill
              className="object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
              sizes="100vw"
              priority
            />
          </div>
        </BlurFade>

        {/* Core message — one block, not four */}
        <BlurFade inView delay={0.2}>
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 mb-12">
            <h3 className="font-heading font-bold text-lg text-foreground mb-4">
              Not for you if...
            </h3>
            <div className="space-y-4 text-foreground/80">
              <p>
                <strong>You already know what to do — you just want someone to confirm it.</strong>{" "}
                I work with people ready to execute, not organizations paying a consultant
                to articulate what they already believe but won&apos;t change.
              </p>
              <p>
                <strong>You need a vendor to manage change for you.</strong>{" "}
                I build systems you own and operate. If you want AI magic that runs on its own
                without your team touching it, other consultants are better suited.
              </p>
              <p>
                <strong>You&apos;re still evaluating whether AI matters.</strong>{" "}
                If you&apos;re forming committees to study the opportunity, start elsewhere.
                I work with people who are ready — not those building consensus.
              </p>
            </div>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.3}>
          <div className="text-center">
            <p className="text-base text-foreground/80 mb-6 max-w-xl mx-auto">
              Still not sure? Book a 15-minute call. If I&apos;m not the right fit, I&apos;ll tell you
              — and point you toward someone who is.
            </p>
            <BookCallButton
              location="what_this_is_not"
              size="lg"
              className="font-bold"
              trackOnClick={false}
              onClick={() => trackEvent('what_this_is_not_cta_click')}
            >
              Book a Call
            </BookCallButton>
          </div>
        </BlurFade>
      </div>

      {/* Structured data for LLM extraction */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Alex Myers' consulting service NOT for?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Alex Myers' services are not for organizations that want a consultant to confirm what they already know but won't change, teams that want AI to run without their involvement, or leaders still evaluating whether AI matters. He works with founders, operators, and small teams ready to execute."
                }
              }
            ]
          })
        }}
      />
    </section>
  );
}
