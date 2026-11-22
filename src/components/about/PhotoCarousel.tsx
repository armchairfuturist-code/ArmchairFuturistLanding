"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/easing";

export interface CarouselPhoto {
  src: string;
  alt: string;
  caption: string;
}

/**
 * Photo carousel — one slide at a time, driven by arrows, dots, keyboard,
 * or swipe. No autoplay: the reader moves it. Motion is a single expo-out
 * translate; reduced motion snaps instead of gliding.
 */
export default function PhotoCarousel({ photos }: { photos: CarouselPhoto[] }) {
  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const reduced = useReducedMotion();
  const regionRef = useRef<HTMLDivElement>(null);
  const last = photos.length - 1;

  const go = useCallback(
    (next: number) => setIndex(Math.min(last, Math.max(0, next))),
    [last],
  );

  useEffect(() => {
    const el = regionRef.current;
    if (!el || !focused) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((current) => Math.min(last, current + 1));
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((current) => Math.max(0, current - 1));
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [focused, last]);

  const active = photos[index];

  return (
    <div
      ref={regionRef}
      role="group"
      aria-roledescription="carousel"
      aria-label="Photos of Alex leading sessions and workshops"
      tabIndex={0}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hp-electric focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f3f3]"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-ink">
        <motion.div
          className="flex"
          drag={reduced ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onDragEnd={(_, info) => {
            const swipe = info.offset.x + info.velocity.x * 0.2;
            if (swipe < -80) go(index + 1);
            else if (swipe > 80) go(index - 1);
          }}
          animate={{ x: `-${index * 100}%` }}
          transition={reduced ? { duration: 0 } : { duration: 0.8, ease: EASE_OUT }}
        >
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              className="relative aspect-[4/3] w-full shrink-0 sm:aspect-[16/10]"
              aria-hidden={i !== index}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                draggable={false}
                priority={i === 0}
                className="select-none object-cover"
                sizes="(max-width: 768px) 100vw, 1024px"
              />
            </div>
          ))}
        </motion.div>

        {/* Caption sits on a vignette so it stays legible on any photo. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent px-5 pb-5 pt-16"
        >
          <p className="font-display text-base font-medium text-white md:text-lg">
            {active.caption}
          </p>
        </div>

        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink transition-colors duration-200 hover:bg-white disabled:pointer-events-none disabled:opacity-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hp-electric sm:flex"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === last}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink transition-colors duration-200 hover:bg-white disabled:pointer-events-none disabled:opacity-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hp-electric sm:flex"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hp-electric focus-visible:ring-offset-2 ${
                i === index
                  ? "w-8 bg-hp-electric"
                  : "w-1.5 bg-charcoal/30 hover:bg-charcoal/50"
              }`}
            />
          ))}
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-charcoal">
          <span aria-live="polite">
            {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </span>
        </p>
      </div>
    </div>
  );
}
