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

function pickSnippets(testimonials: readonly Testimonial[]): MarqueeSnippet[] {
  const snippets: MarqueeSnippet[] = [];

  const byName: Record<string, string | undefined> = {
    "Shannon Myers": "He has saved me over $10,000 a year. I save 10 to 20 hours a week now.",
    "Brenda Fonseca": "the sessions with him have been a game changer for me.",
    "Stephan Kerby": "Alex is a fantastic communicator who made the website redesign process effortless.",
    "Alex A.": "Alex has a strong work ethic and real attention to detail.",
    "Karrie S.": "one of the best change and program management professionals I've run across in transformation.",
    "Marco": "He pushed our team toward continuous improvement without making it feel forced.",
    "Evan H.": "He is extraordinarily proactive, doesn't wait to be told what to do",
    "Lia S.": "ensuring every member of the team felt heard and seen",
    "Tessa M.": "Alex is calm, patient, and is very generous with his knowledge.",
    "Sepehr S.": "The whole team runs better when he's involved.",
    "Jasper": "Alex is the best SCRUM master I've worked with.",
    "Maria Fonseca": "I couldn't advise someone better to guide you in your AI journey.",
  };

  for (const t of testimonials) {
    const quote = byName[t.name];
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
      <p className="testimonial-marquee__note">
        * Short excerpts.{" "}
        <a href="#proof-heading">Read the full testimonials below</a>
      </p>
    </section>
  );
}
