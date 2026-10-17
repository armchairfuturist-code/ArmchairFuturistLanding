"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Linkedin } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { VideoFacade } from "@/components/ui/VideoFacade";
import { SITE_URL } from "@/lib/constants";

/**
 * The Subvisual episode — real footage of how Alex works, published by a
 * third party. It is the only asset on the site where the product (his
 * judgment, live) can be sampled instead of described, so it leads the
 * section and the bio copy supports it.
 */
const EPISODE = {
  videoId: "XTHdjJlJs6o",
  title: "Adapting to an AI-Driven Environment | The Intelligence Series Ep.01",
  source:
    "https://content.subvisual.com/talk-roundtable/the-intelligence-series-ep-01/",
  posterSrc: "/intelligence-series-ep01-poster.jpg",
} as const;

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
        <BlurFade inView>
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-hp-bright mb-4">
            About
          </p>
          <div className="flex items-center gap-3 mb-8">
            <h2 className="font-display text-display font-medium tracking-tight text-white">
              Partner in learning
            </h2>
            <a
              href="https://www.linkedin.com/in/alex-myers-34572a10/"
              target="_blank"
              rel="noopener noreferrer"
              // An icon-only control needs a 44px touch area; the glyph stays
              // 20px and the padding supplies the target. It was 50% white,
              // which reads as decoration rather than a link.
              className="-m-2 inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center p-2 text-white/70 transition-colors hover:text-hp-bright"
              aria-label="Alex Myers LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </BlurFade>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          <BlurFade inView className="md:col-span-7">
            <VideoFacade
              videoId={EPISODE.videoId}
              title={EPISODE.title}
              posterSrc={EPISODE.posterSrc}
              analyticsEvent="intelligence_series_play"
            />
            <p className="mt-4 text-sm md:text-base leading-relaxed text-white/80 max-w-prose">
              The 51-minute conversation: why 80% of the work should be
              planning before execution, how to structure AI context so a
              model actually helps, and what changes when a small team
              adopts AI.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              The Intelligence Series Ep.01, recorded with{" "}
              <a
                href={EPISODE.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 underline underline-offset-4 transition-colors hover:text-hp-bright"
              >
                Subvisual
              </a>
              , September 2026.
            </p>
          </BlurFade>

          <BlurFade inView delay={0.08} className="md:col-span-5">
            <div className="relative h-28 w-28 md:h-32 md:w-32 overflow-hidden border border-white/10 bg-ink-soft">
              <Image
                src="/alexheadshot-nobg.png"
                alt="Alex Myers"
                fill
                className="object-contain object-bottom"
                sizes="128px"
              />
            </div>
            <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed">
              CCMP, Agile Coaching, and four more. I teach founders and
              operators to run AI systems without me.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/55 font-mono">
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
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.7px] text-hp-bright hover:text-white transition-colors"
            >
              Full story, certifications & approach
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </BlurFade>
        </div>
      </div>

      {/* Schema lives with the video so /about and /speaking do not claim it. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: EPISODE.title,
            description:
              "Alex Myers in conversation with Álvaro Bezerra of Subvisual on adapting to an AI-driven environment: planning before execution, structuring AI context, small-team adoption, and the governance and token cost problems teams meet later.",
            thumbnailUrl: [`${SITE_URL}${EPISODE.posterSrc}`],
            uploadDate: "2026-09-10T11:45:17+00:00",
            duration: "PT51M",
            embedUrl: `https://www.youtube-nocookie.com/embed/${EPISODE.videoId}`,
            contentUrl: `https://www.youtube.com/watch?v=${EPISODE.videoId}`,
            publisher: {
              "@type": "Organization",
              name: "Subvisual",
              url: "https://subvisual.com",
            },
          }),
        }}
      />
    </section>
  );
}
