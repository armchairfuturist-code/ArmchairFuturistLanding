"use client";

import Image from "next/image";
import { ArrowUpRight, Users } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/** Community anchor — live-site preview as background, proof-forward. */
export default function CommunityAnchor() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* Real site screenshot as the section background, faded under ink */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/braga-ai-builders-preview.jpg"
          alt=""
          fill
          className="object-cover object-top opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/70" />
      </div>

      <div className="relative container mx-auto px-4 md:px-6 py-16 md:py-24 max-w-4xl">
        <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.35em] text-hp-electric mb-3">
          <Users className="h-3.5 w-3.5" aria-hidden="true" />
          In the room, not just in front of it
        </p>
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium tracking-tight leading-[1.05] mb-4">
          I host Braga AI Builders
        </h2>
        <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mb-8 font-sans">
          An AI community in Braga, Portugal. Every month, I host TechLands
          with{" "}
          <a
            href="https://subvisual.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium underline underline-offset-4 hover:text-hp-bright transition-colors"
          >
            Subvisual
          </a>
          : locals using AI to solve real problems, build useful things, and
          help each other move faster. You don&apos;t need to be advanced —
          you need to be curious.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://luma.com/TechLands"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("braga_ai_builders_events_click", { location: "homepage_community" })}
            className="inline-flex items-center justify-center gap-2 h-11 px-6 text-sm font-semibold uppercase tracking-[0.7px] bg-hp-electric text-white hover:bg-hp-bright transition-colors"
          >
            Upcoming TechLands meetups
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="https://braga-ai-builders.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("braga_ai_builders_click", { location: "homepage_community" })}
            className="inline-flex items-center justify-center gap-2 h-11 px-6 text-sm font-semibold border border-white/40 text-white hover:bg-white/10 hover:border-white transition-colors"
          >
            See the community
          </a>
        </div>
      </div>
    </section>
  );
}
