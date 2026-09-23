"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { OrganismCanvas } from "@/components/organism/OrganismCanvas";
import { WHATSAPP_URL } from "@/lib/constants";
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

export function OrganismHero() {
  return (
    <section id="hero" className="organism-hero">
      <div className="organism-hero__wash" aria-hidden="true" />
      <OrganismCanvas className="organism-canvas" />
      <div className="organism-noise" aria-hidden="true" />
      <div className="organism-hero__copy">
        <p className="organism-kicker"><span /> AI literacy &amp; implementation</p>
        <h1>The last AI consultant<br /><em>you&apos;ll ever hire.</em></h1>
        <p className="organism-deck">1:1 AI mastery built on your real work. You leave running systems you built yourself.</p>
        <p className="organism-deck organism-deck--offer">Most clients are self-sufficient in 8&ndash;10 weeks.</p>
        <div className="organism-actions">
          <Link href="/assessment" className="organism-button organism-button--primary">Take the free assessment <ArrowUpRight size={16} aria-hidden="true" /></Link>
          <button type="button" className="organism-button organism-button--quiet" onClick={() => scrollToId("what-this-is-not")}>See if it&apos;s a fit <ArrowDown size={17} aria-hidden="true" /></button>
        </div>
        <a className="organism-hero__whatsapp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <WhatsAppGlyph className="organism-hero__whatsapp-icon" />
          Prefer text? WhatsApp me <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </div>
      <div className="organism-status"><span>40+ systems deployed</span><span>10–20 hrs reclaimed / week</span></div>
      <div className="organism-hero__hint"><span>Scroll</span><ArrowDown size={14} aria-hidden="true" /></div>
    </section>
  );
}

