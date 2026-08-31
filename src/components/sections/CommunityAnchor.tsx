"use client";

import Image from "next/image";
import { ArrowUpRight, Users } from "lucide-react";
import { BRAGA_AI_BUILDERS_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

/** Community anchor — reputational proof alongside stage work. */
export default function CommunityAnchor() {
  return (
    <section className="bg-ink py-16 md:py-20 text-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.35em] text-hp-electric mb-3">
          <Users className="h-3.5 w-3.5" aria-hidden="true" />
          In the room, not just in front of it
        </p>
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium tracking-tight leading-[1.05] mb-4">
          Curious about AI? Come meet your people.
        </h2>
        <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mb-8 font-sans">
          I host <strong className="text-white">Braga AI Builders</strong>, a
          monthly in-person AI meetup here in Braga. Locals using AI to solve
          real problems, build useful things, and help each other move faster.
          You don&apos;t need to be advanced — you need to be curious.
        </p>
        <a
          href={BRAGA_AI_BUILDERS_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent("braga_ai_builders_click", {
              location: "speaking_page",
            })
          }
          className="group relative block mb-8 rounded-hp-xl overflow-hidden border border-white/20"
          aria-label="Preview of the Braga AI Builders site"
        >
          <Image
            src="/braga-ai-builders-preview.jpg"
            alt="Braga AI Builders community website preview"
            width={1200}
            height={750}
            className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 896px"
          />
          <span className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/90 bg-ink/70 px-2.5 py-1.5">
            Live site
          </span>
        </a>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={BRAGA_AI_BUILDERS_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("braga_ai_builders_click", {
                location: "speaking_page",
              })
            }
            className="inline-flex items-center justify-center gap-2 h-11 px-6 text-sm font-semibold uppercase tracking-[0.7px] bg-hp-electric text-white hover:bg-hp-bright transition-colors"
          >
            Visit Braga AI Builders
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={`${BRAGA_AI_BUILDERS_URL}/events`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("braga_ai_builders_events_click", {
                location: "speaking_page",
              })
            }
            className="inline-flex items-center justify-center gap-2 h-11 px-6 text-sm font-semibold border border-white/40 text-white hover:bg-white/10 hover:border-white transition-colors"
          >
            Upcoming meetups
          </a>
        </div>
      </div>
    </section>
  );
}
