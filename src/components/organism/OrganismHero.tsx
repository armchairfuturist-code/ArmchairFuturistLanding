"use client";

import Link from "next/link";
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
        <p className="organism-deck">Clients trust me with their real work, not a course. We build on what you do. You leave running systems you built, selling what you know.</p>
        <p className="organism-deck organism-deck--offer">Most clients are self-sufficient in 8&ndash;10 weeks.</p>
        <div className="organism-actions">
          <Link href="/assessment" className="organism-button organism-button--primary">Get my AI plan <ArrowUpRight size={16} aria-hidden="true" /></Link>
          <button type="button" className="organism-button organism-button--quiet" onClick={() => scrollToId("services")}>See coaching &amp; services <ArrowDown size={17} aria-hidden="true" /></button>
        </div>
        <a className="organism-hero__whatsapp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <WhatsAppGlyph className="organism-hero__whatsapp-icon" />
          Text me on WhatsApp &mdash; I reply within hours <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </div>
      <div className="organism-status"><span>40+ systems deployed</span><span>10–20 hrs reclaimed / week</span></div>
      <div className="organism-hero__hint"><span>Scroll</span><ArrowDown size={14} aria-hidden="true" /></div>
    </section>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <title>WhatsApp</title>
      <path
        fill="#25D366"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}
