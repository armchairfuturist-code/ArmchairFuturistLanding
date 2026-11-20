"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
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

/** ~48px/s at 60fps: a card every five seconds, full cycle ~30s. */
const SCROLL_SPEED = 0.8;

/** Threshold before the track commits to a drag instead of page-scroll. */
const DRAG_THRESHOLD = 10;

/** The track is duplicated so the wrap-around loop is seamless. */
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
  const offsetRef = useRef(0);
  /** Pending drag state while we measure if movement exceeds the threshold. */
  const pendingRef = useRef<{ startX: number; startOffset: number } | null>(null);
  const pausedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  const setPaused = useCallback((next: boolean) => {
    pausedRef.current = next;
    setIsPaused(next);
  }, []);

  /** Width of one copy of the list plus the gap after it. */
  const loopWidth = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return (el.scrollWidth + gap) / 2;
  }, []);

  /** Keep the offset inside one loop, so the duplicate copy lines up. */
  const wrap = useCallback(
    (offset: number) => {
      const width = loopWidth();
      if (!width) return offset;
      let next = offset % width;
      if (next > 0) next -= width;
      return next;
    },
    [loopWidth],
  );

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = Math.min(now - last, 32);
      last = now;
      if (!pausedRef.current && !pendingRef.current) {
        offsetRef.current = wrap(
          offsetRef.current - SCROLL_SPEED * (delta / 16.67),
        );
        el.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [wrap]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pendingRef.current = { startX: event.clientX, startOffset: offsetRef.current };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pendingRef.current) return;
    const dx = Math.abs(event.clientX - pendingRef.current.startX);
    if (dx < DRAG_THRESHOLD) return; // not enough horizontal travel yet
    // Commit to drag: snap to the exact starting position minus any drift
    const drag = pendingRef.current;
    pendingRef.current = null;
    const delta = event.clientX - drag.startX;
    offsetRef.current = wrap(drag.startOffset + delta);
    const el = trackRef.current;
    if (el) el.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pendingRef.current && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    pendingRef.current = null;
  };

  return (
    <section
      className={`testimonial-marquee${isPaused ? " is-paused" : ""}`}
      aria-label="Client testimonials"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setPaused(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setPaused(false);
      }}
    >
      <div
        className="testimonial-marquee__track"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <MarqueeItems />
        <div className="testimonial-marquee__duplicate" aria-hidden="true">
          <MarqueeItems />
        </div>
      </div>
      <button
        type="button"
        className="testimonial-marquee__toggle"
        onClick={(event) => {
          event.stopPropagation();
          setPaused(!pausedRef.current);
        }}
        aria-label={isPaused ? "Resume testimonials" : "Pause testimonials"}
        aria-pressed={isPaused}
      >
        {isPaused ? (
          <Play size={13} aria-hidden="true" />
        ) : (
          <Pause size={13} aria-hidden="true" />
        )}
        <span>{isPaused ? "Play" : "Pause"}</span>
      </button>
    </section>
  );
}
