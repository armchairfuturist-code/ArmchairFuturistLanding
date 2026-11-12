"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import SameAgentTwice from "./SameAgentTwice";

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
          <h2 className="font-display text-display font-medium tracking-tight text-ink mb-6 max-w-[20ch]">
            Access to AI was never the hard part.
          </h2>

          <div className="max-w-2xl space-y-4 text-base md:text-lg leading-relaxed text-charcoal">
            <p>
              More capable AI agents are available now than at any point in the
              last three years, and anyone with a card can get one. That was
              supposed to be the difficult part of all this, but getting one
              turned out to be easy.
            </p>
            <p>
              The last mile asks for skill rather than model access. New models
              can infer plenty from a weak prompt, which is why most people
              paste a request, retry it twice, and then trust the first clean
              answer they get. That habit is expensive in ways you do not notice
              at first, because the results vary week to week and nothing is
              repeatable.
            </p>
            <p>
              Skilled users save the recipe, route the cheap checks first,
              spend the strong thought once, run cheap models on triggers, and
              log each run, so the same task costs less and repeats next week
              without them.
            </p>
            <p className="text-ink font-medium">
              The answer is literacy, and no tool ships with it.
            </p>
          </div>

          <SameAgentTwice />

          <div className="mt-8">
            <Link
              href="/concepts/the-last-mile"
              className="-my-3 inline-flex min-h-[44px] items-center gap-2 py-3 text-sm md:text-base font-medium text-hp-electric hover:underline transition-colors duration-150"
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
