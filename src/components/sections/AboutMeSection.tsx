"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Linkedin } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

/**
 * Homepage teaser — full bio, certs, and story live on /about.
 */
export default function AboutMeSection() {
  return (
    <section
      className="relative py-16 md:py-20 bg-ink text-white scroll-mt-20 overflow-hidden"
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1.5 md:w-2 bg-hp-electric z-10"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          <BlurFade inView className="md:col-span-4">
            <div className="relative mx-auto md:mx-0 w-40 h-40 md:w-48 md:h-48 overflow-hidden border border-white/10 bg-ink-soft">
              <Image
                src="/alexheadshot-nobg.png"
                alt="Alex Myers"
                fill
                className="object-contain object-bottom"
                sizes="192px"
              />
            </div>
          </BlurFade>

          <BlurFade inView delay={0.08} className="md:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-hp-bright mb-4">
              About
            </p>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight leading-[1.05] text-white">
                Partner in learning
              </h2>
              <a
                href="https://www.linkedin.com/in/alex-myers-34572a10/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-hp-bright transition-colors shrink-0"
                aria-label="Alex Myers LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl mb-6">
              Six certifications. 40+ AI systems deployed. I teach founders and
              operators to build vendor-agnostic judgment — mental models first,
              live practice on real work, exit as the goal.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/55 font-mono mb-8">
              <span>
                <strong className="text-white font-display text-base">40+</strong>{" "}
                systems
              </span>
              <span className="text-white/20" aria-hidden="true">
                /
              </span>
              <span>
                <strong className="text-white font-display text-base">6</strong>{" "}
                certs
              </span>
              <span className="text-white/20" aria-hidden="true">
                /
              </span>
              <span>
                <strong className="text-white font-display text-base">
                  10–20h
                </strong>{" "}
                /wk reclaimed
              </span>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.7px] text-hp-bright hover:text-white transition-colors"
            >
              Full story, certifications & approach
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
