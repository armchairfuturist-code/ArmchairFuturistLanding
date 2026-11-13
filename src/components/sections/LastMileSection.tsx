"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { motion, useReducedMotion } from "motion/react";
import "blobatar/motion.css";
import { Blobatar } from "@blobatar/react";
import { surprised, thinking, unsure } from "blobatar/expression";
import SameAgentTwice from "./SameAgentTwice";

/**
 * Confused agents in the margins.
 *
 * Positions are percentages of the section and stay outside the lg'd text
 * column: content is max-w-2xl inside max-w-4xl, so the field only mounts at
 * xl (gutters >= 190px) and never crosses x=12% / x=88%. Low opacity keeps
 * them texture, not subject; the workflow diagram below stays the focus.
 */
const CONFUSED_AGENTS = [
  { name: "agent-confused-01", size: 88, x: 2, y: 6, delay: 0, expression: unsure },
  { name: "agent-confused-02", size: 64, x: 9, y: 22, delay: 1.6, expression: thinking },
  { name: "agent-confused-03", size: 72, x: 3, y: 42, delay: 3.1, expression: surprised },
  { name: "agent-confused-04", size: 96, x: 9.5, y: 64, delay: 0.8, expression: unsure },
  { name: "agent-confused-05", size: 60, x: 2.5, y: 84, delay: 2.4, expression: thinking },
  { name: "agent-confused-06", size: 92, x: 88, y: 4, delay: 1.1, expression: thinking },
  { name: "agent-confused-07", size: 68, x: 94, y: 20, delay: 2.9, expression: unsure },
  { name: "agent-confused-08", size: 104, x: 88, y: 44, delay: 0.4, expression: surprised },
  { name: "agent-confused-09", size: 72, x: 93, y: 68, delay: 3.7, expression: unsure },
  { name: "agent-confused-10", size: 64, x: 88.5, y: 86, delay: 1.9, expression: thinking },
] as const;

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
/**
 * One-shot electric wash behind a phrase, swept once when it enters view.
 * Composited scaleX, matching ScrollHighlight's reasoning; reduced motion
 * renders the wash at rest instead of animating it.
 */
function Wash({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative inline-block">
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 origin-left rounded-sm bg-hp-electric opacity-25"
        initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={reduce ? { duration: 0 } : { duration: 0.7, delay: 0.15, ease: "easeOut" }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}

export default function LastMileSection() {
  return (
    <section className="relative py-16 md:py-24 bg-background scroll-mt-20 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden select-none xl:block"
      >
        {CONFUSED_AGENTS.map((agent) => (
          <div
            key={agent.name}
            className="lm-drift absolute opacity-25"
            style={{
              left: `${agent.x}%`,
              top: `${agent.y}%`,
              animationDelay: `${agent.delay}s`,
            }}
          >
            <Blobatar
              name={agent.name}
              size={agent.size}
              animate="always"
              expression={agent.expression}
            />
          </div>
        ))}
      </div>
      <div className="relative container mx-auto px-4 md:px-6 max-w-4xl">
        <BlurFade inView>
          <h2 className="font-display text-display font-medium tracking-tight text-ink mb-6 max-w-[20ch]">
            Access to AI was never the hard part.
          </h2>

          <div className="max-w-2xl space-y-4 text-base md:text-lg leading-relaxed text-charcoal">
            <p>
              Anyone with a credit card can get a capable agent. That was supposed
              to be the hard part. It turned out easy.
            </p>
            <p>
              The last mile is a skill problem. Most people pay for the
              expensive model and use it badly.{" "}
              <strong className="font-medium text-ink">
                A strong model on a bad process burns money.
              </strong>
            </p>
            <p>
              Fancy models cover for weak prompts. So most people type a
              request, retry twice, and trust the first good answer. Results
              vary week to week.{" "}
              <Wash>Nothing is ever automated.</Wash>
            </p>
            <p>
              Skilled users save the recipe and step back:{" "}
              <em>what here can run without me?</em>{"\u00A0"}They plan on the strong
              model, route execution to cheap ones, and iterate until the
              workflow holds. Then it runs on a schedule, while they sleep or
              see friends. Every run costs less.
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
