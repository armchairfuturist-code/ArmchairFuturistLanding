"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "./lenis-instance";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisibility);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
