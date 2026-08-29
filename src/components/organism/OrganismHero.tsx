"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { OrganismCanvas } from "@/components/organism/OrganismCanvas";
import { WHATSAPP_URL } from "@/lib/constants";

function scrollToId(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
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
        <p className="organism-deck">One-on-one AI mastery, proven on 40+ deployed systems. Learn by building on your real work. Leave with custom systems you run without me, and a service you can sell.</p>
        <p className="organism-deck organism-deck--offer">Most clients are self-sufficient in 8&ndash;10 weeks.</p>
        <div className="organism-actions">
          <button type="button" className="organism-button organism-button--primary" onClick={() => scrollToId("connect")}>Get my AI plan <ArrowUpRight size={16} aria-hidden="true" /></button>
          <button type="button" className="organism-button organism-button--quiet" onClick={() => scrollToId("services")}>See coaching &amp; services <ArrowDown size={17} aria-hidden="true" /></button>
        </div>
        <a className="organism-hero__whatsapp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Text me on WhatsApp &mdash; I reply within hours <ArrowUpRight size={13} aria-hidden="true" /></a>
      </div>
      <div className="organism-status"><span>40+ systems deployed</span><span>10–20 hrs reclaimed / week</span></div>
      <div className="organism-hero__hint"><span>Scroll</span><ArrowDown size={14} aria-hidden="true" /></div>
    </section>
  );
}
