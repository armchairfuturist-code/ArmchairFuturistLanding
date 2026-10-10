"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { OrganismCanvas } from "@/components/organism/OrganismCanvas";
import { WHATSAPP_URL } from "@/lib/constants";
import { EASE_OUT } from "@/lib/easing";
import WhatsAppGlyph from "@/components/ui/WhatsAppGlyph";

function scrollToId(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  // Move keyboard focus along with the viewport so screen-reader and
  // keyboard users land where sighted users land.
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

/**
 * Hero entrance choreography.
 *
 * This is the one guaranteed first-impression moment on the site, so it is
 * the only place that earns a staged entrance. Everything below the fold
 * shares one scroll-reveal; here the order follows reading priority —
 * claim, then explanation, then the promise, then the ask.
 *
 * Deliberately no blur. The headline is 106px outlined type, and a filter
 * repaint over `-webkit-text-stroke` is both muddy and expensive.
 *
 * y + opacity only, so the entrance never blocks the main thread while the
 * WebGL canvas is still compiling its first frames. MotionConfig
 * reducedMotion="user" (in layout.tsx) drops the transform and keeps the
 * opacity fade, which is the behaviour we want — not zero animation.
 */
const copyVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
};

const copyContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

export function OrganismHero() {
  return (
    <section id="hero" className="organism-hero">
      <div className="organism-hero__wash" aria-hidden="true" />
      <OrganismCanvas className="organism-canvas" />
      <div className="organism-noise" aria-hidden="true" />
      <motion.div
        className="organism-hero__copy"
        variants={copyContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="organism-kicker" variants={copyVariants}>
          <span /> AI literacy &amp; implementation
        </motion.p>
        <motion.h1 variants={copyVariants}>
          The last AI consultant
          <br />
          <em>you&apos;ll ever hire.</em>
        </motion.h1>
        <motion.p className="organism-deck" variants={copyVariants}>
          1:1 AI mastery built on your real work. You leave running systems you
          built yourself.
        </motion.p>
        <motion.p
          className="organism-deck organism-deck--offer"
          variants={copyVariants}
        >
          Most clients come for the hours back. They stay for what they realize
          they can build.
        </motion.p>
        <motion.div className="organism-actions" variants={copyVariants}>
          <Link
            href="/assessment"
            className="organism-button organism-button--primary"
          >
            Take the free assessment{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="organism-button organism-button--quiet"
            onClick={() => scrollToId("what-this-is-not")}
          >
            See if it&apos;s a fit <ArrowDown size={17} aria-hidden="true" />
          </button>
        </motion.div>
        <motion.a
          className="organism-hero__whatsapp"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          variants={copyVariants}
        >
          <WhatsAppGlyph className="organism-hero__whatsapp-icon" />
          Prefer text? WhatsApp me{" "}
          <ArrowUpRight size={13} aria-hidden="true" />
        </motion.a>
      </motion.div>
      <div className="organism-status"><span>40+ systems deployed</span><span>Self-sufficient in 8&ndash;10 weeks</span></div>
      <div className="organism-hero__hint"><span>Scroll</span><ArrowDown size={14} aria-hidden="true" /></div>
    </section>
  );
}

