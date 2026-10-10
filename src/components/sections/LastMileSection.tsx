"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

/**
 * The homepage statement of the core thesis.
 *
 * The Last Mile concept page existed but was reachable only through the
 * footer link to /concepts, then the hub. The site's central argument was
 * three clicks deep, behind its least-prominent exit. This section states it
 * on the front page, right after the hero, and links to the full argument.
 *
 * Deliberately short. The concept page carries the depth; this carries the
 * claim and the exit.
 */
export default function LastMileSection() {
  return (
    <section className="relative py-16 md:py-24 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <BlurFade inView>
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-hp-electric mb-5">
            The Last Mile
          </p>
          <h2 className="font-display text-display font-medium tracking-tight text-ink mb-6 max-w-[20ch]">
            Access to AI was never the hard part.
          </h2>

          <div className="max-w-2xl space-y-4 text-base md:text-lg leading-relaxed text-charcoal">
            <p>
              There are more capable AI agents than ever, and anyone can get
              one. That was supposed to be the difficult part. It turned out
              not to be.
            </p>
            <p>
              What remains is the last mile: knowing what to ask for, and
              understanding how a model actually works. Most people rewrite
              the same request five times, get something that looks right,
              and quietly give up &mdash; concluding AI does not work for
              them.
            </p>
            <p className="text-ink font-medium">
              The gap is literacy, not capability.
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/concepts/the-last-mile"
              className="inline-flex items-center gap-2 text-sm md:text-base font-medium text-hp-electric hover:underline transition-colors duration-150"
            >
              Read the full argument
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
