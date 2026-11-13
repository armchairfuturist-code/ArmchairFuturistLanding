"use client";

import { useEffect } from "react";
import { setLenis } from "./lenis-instance";

/**
 * Smooth scrolling, split out of the initial bundle. Lenis is ~58KB that does
 * nothing until the visitor's first wheel or touch event, and every request
 * on this domain is uncached, so it is fetched on the first scroll intent
 * instead of on load. Until it arrives the page scrolls natively — which is
 * also what a reader with reduced motion gets forever.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let teardown = () => {};

    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (disposed) return;

      const lenis = new Lenis({
        /* lerp, not duration: a fixed 1.2s duration re-eases every wheel tick,
           so a fast flick and a slow nudge both crawl. lerp tracks the wheel
           and settles in ~10 frames, and it is refresh-rate independent. */
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      let frame = 0;

      function raf(time: number) {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      }
      frame = requestAnimationFrame(raf);
      setLenis(lenis);

      /* A hidden tab still runs rAF at a throttled rate, so Lenis kept
         interpolating toward a scroll target nobody could see, for the whole
         session. Mirrors what ambient-visual-runtime.tsx already does. */
      const onVisibility = () => {
        if (document.hidden) {
          cancelAnimationFrame(frame);
          frame = 0;
        } else if (!frame) {
          frame = requestAnimationFrame(raf);
        }
      };
      document.addEventListener("visibilitychange", onVisibility);

      teardown = () => {
        cancelAnimationFrame(frame);
        document.removeEventListener("visibilitychange", onVisibility);
        setLenis(null);
        lenis.destroy();
      };
    };

    /* The first wheel tick, touch, or key scroll starts it. Passive listeners
       so the native scroll that runs meanwhile is never blocked. */
    const onIntent = () => {
      window.removeEventListener("wheel", onIntent);
      window.removeEventListener("touchstart", onIntent);
      window.removeEventListener("keydown", onIntent);
      void start();
    };
    window.addEventListener("wheel", onIntent, { passive: true });
    window.addEventListener("touchstart", onIntent, { passive: true });
    window.addEventListener("keydown", onIntent, { passive: true });

    return () => {
      disposed = true;
      window.removeEventListener("wheel", onIntent);
      window.removeEventListener("touchstart", onIntent);
      window.removeEventListener("keydown", onIntent);
      teardown();
    };
  }, []);

  return <>{children}</>;
}
