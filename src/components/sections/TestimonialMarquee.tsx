"use client";

import Image from "next/image";
import { useRef } from "react";
import { TESTIMONIALS, type Testimonial } from "@/content/testimonials";

/* Short, punchy snippets pulled from the full testimonials. Each entry maps
   a testimonial to its marquee snippet — no more than ~20 words. */
interface MarqueeSnippet {
  quote: string;
  name: string;
  title: string;
  imageSrc?: string;
}

/** Names we keep in the header marquee; everything else stays in ProofSection. */
const MARQUEE_NAMES = new Set([
  "Manny Toribio", "Shannon Myers", "Brenda Fonseca",
  "Maria Fonseca", "Stephan Kerby", "Karrie S.",
]);

/** Excerpt for each marquee testimonial. */
const BY_NAME: Record<string, string> = {
  "Manny Toribio": "A few sessions into my training package with Alex and I'm already working differently. Worth every penny.",
  "Shannon Myers": "He has saved me over $10,000 a year. I save 10 to 20 hours a week now.",
  "Brenda Fonseca": "the sessions with him have been a game changer for me.",
  "Maria Fonseca": "I couldn't advise someone better to guide you in your AI journey.",
  "Stephan Kerby": "Alex is a fantastic communicator who made the website redesign process effortless.",
  "Karrie S.": "one of the best change and program management professionals I've run across in transformation.",
};

function pickSnippets(testimonials: readonly Testimonial[]): MarqueeSnippet[] {
  const snippets: MarqueeSnippet[] = [];

  for (const t of testimonials) {
    if (!MARQUEE_NAMES.has(t.name)) continue;
    const quote = BY_NAME[t.name];
    if (quote) {
      snippets.push({
        quote,
        name: t.name,
        title: t.title,
        imageSrc: t.imageSrc,
      });
    }
  }

  return snippets;
}

const MARQUEE_SNIPPETS = pickSnippets(TESTIMONIALS);

/** The track is duplicated so the CSS translateX(-50%) loop is seamless. */
function MarqueeItems() {
  return (
    <>
      {MARQUEE_SNIPPETS.map((snippet, i) => (
        <article key={`a-${i}`} className="marquee-snippet">
          <p className="marquee-snippet__quote">
            <span className="marquee-snippet__mark">“</span>
            {snippet.quote}
          </p>
          <footer className="marquee-snippet__client">
            {snippet.imageSrc ? (
              <Image
                src={snippet.imageSrc}
                alt=""
                width={28}
                height={28}
                className="marquee-snippet__avatar"
              />
            ) : (
              <span
                className="marquee-snippet__avatar marquee-snippet__avatar--initials"
                aria-hidden="true"
              >
                {snippet.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            )}
            <span className="marquee-snippet__name">{snippet.name}</span>
            {snippet.title ? (
              <span className="marquee-snippet__role">{snippet.title}</span>
            ) : null}
          </footer>
        </article>
      ))}
    </>
  );
}

export default function TestimonialMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="testimonial-marquee"
      aria-label="Client testimonials"
      onMouseEnter={() => {
        trackRef.current?.style.setProperty("animation-play-state", "paused");
      }}
      onMouseLeave={() => {
        trackRef.current?.style.setProperty("animation-play-state", "running");
      }}
    >
      <div className="testimonial-marquee__track" ref={trackRef}>
        <MarqueeItems />
        <div className="testimonial-marquee__duplicate" aria-hidden="true"><MarqueeItems /></div>
      </div>
    </section>
  );
}
