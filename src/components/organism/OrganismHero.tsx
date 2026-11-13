"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { OrganismCanvas } from "@/components/organism/OrganismCanvas";
import { WHATSAPP_URL } from "@/lib/constants";

import WhatsAppGlyph from "@/components/ui/WhatsAppGlyph";
import { getLenis } from "@/components/ui/lenis-instance";

function scrollToId(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const el = document.getElementById(id);
  if (!el) return;
  /* Lenis owns its own easing; scrollIntoView would jump outside it. */
  const lenis = reduce ? null : getLenis();
  if (lenis) lenis.scrollTo(el, { offset: -80 });
  else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  // Move keyboard focus along with the viewport so screen-reader and
  // keyboard users land where sighted users land.
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

/**
 * The entrance is CSS (.organism-hero__copy in globals.css), not variants.
 * Held here as opacity 0 by framer-motion, the copy stayed invisible until
 * hydration finished, and the H1 is the LCP element: 3.9s on a throttled
 * phone. The stylesheet paints it with the HTML instead.
 */
export function OrganismHero() {
  /* Push-in: the hero dollies toward the viewer as it leaves, so the handoff
     into the first section reads as camera movement. Opacity holds until the
     last third, where the copy would otherwise sit on a shrinking frame. */
  const heroRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0.65, 1], [1, 0.55]);

  return (
    <motion.section
      ref={heroRef}
      id="hero"
      className="organism-hero"
      style={reduce ? undefined : { scale: heroScale, opacity: heroOpacity }}
    >
      <div className="organism-hero__wash" aria-hidden="true" />
      <OrganismCanvas className="organism-canvas" />
      <div className="organism-noise" aria-hidden="true" />
      <div className="organism-hero__copy">
        <h1>
          Your Last
          <br />
          <em>AI Consultant.</em>
        </h1>
        <p className="organism-deck">
          One-to-one AI coaching on your real work. You leave running systems
          you built yourself.
        </p>
        <p className="organism-deck organism-deck--offer">
          Most clients come for the hours back. They stay for what they
          discover they can build, usually the project they put off for a year.
        </p>
        <div className="organism-actions">
          {/* WhatsApp is the primary action. A call is a scheduled event with
              a stranger; a text is a thought you can send in ten seconds.
              Most of Alex's bookings arrive by referral, so the visitor is
              often already warm — the shortest path matters more than the
              most formal one. */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="organism-button organism-button--primary"
          >
            <WhatsAppGlyph
              className="organism-hero__whatsapp-icon"
              tone="inherit"
            />
            Text me on WhatsApp{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <Link
            href="/assessment"
            className="organism-button organism-button--quiet"
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
        </div>
      </div>
      <div className="organism-status"><span>40+ systems deployed</span><span>Self-sufficient in 8&ndash;10 weeks</span></div>
      <div className="organism-hero__hint"><span>Scroll</span><ArrowDown size={14} aria-hidden="true" /></div>
    </motion.section>
  );
}

