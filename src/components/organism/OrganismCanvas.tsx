"use client";

import { useEffect, useRef, useState } from "react";
import {
  ParticleOrganism,
  HP_THEMES,
  generateAmbientSpreadPoints,
  generateChaosCloudPoints,
} from "./webgl-engine";

interface OrganismCanvasProps {
  className?: string;
  count?: number;
}

const INTRO_MS = 1800;
const MOBILE_COUNT = 3000;
const LOW_END_COUNT = 1200;

const easeInOut = (t: number) => t * t * (3 - 2 * t);

export function OrganismCanvas({
  className = "organism-canvas",
  count = 14000,
}: OrganismCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    // Low-end devices (little memory, many cores missing) get a lighter swarm
    // instead of a context-loss fallback as the only mercy.
    const lowEnd =
      typeof navigator !== "undefined" &&
      "deviceMemory" in navigator &&
      (navigator as { deviceMemory?: number }).deviceMemory !== undefined &&
      (navigator as { deviceMemory: number }).deviceMemory <= 4;
    const particleCount = lowEnd
      ? Math.min(count, LOW_END_COUNT)
      : coarsePointer || window.innerWidth < 800
        ? Math.min(count, MOBILE_COUNT)
        : count;

    // Small screens get a calmer swarm.
    const theme = coarsePointer
      ? { ...HP_THEMES.hero, turb: HP_THEMES.hero.turb * 0.55, push: HP_THEMES.hero.push * 0.8 }
      : HP_THEMES.hero;

    let organism: ParticleOrganism | null = null;
    let observer: IntersectionObserver | null = null;
    let introFrame = 0;
    let resizeTimer = 0;
    let heroVisible = true;
    let disposed = false;

    const aspectOf = () => {
      const bounds = canvas.getBoundingClientRect();
      return Math.max(0.1, bounds.width / Math.max(bounds.height, 1));
    };

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      organism?.stop();
      setShowFallback(true);
    };

    const initialize = () => {
      if (organism || reducedMotion.matches || disposed) return;

      const aspect = aspectOf();
      const chaos = generateChaosCloudPoints(particleCount, aspect);
      const field = generateAmbientSpreadPoints(particleCount, aspect);

      try {
        organism = new ParticleOrganism(canvas, particleCount, chaos);
      } catch (error) {
        console.warn("WebGL2 hero organism initialization failed:", error);
        setShowFallback(true);
        return;
      }

      organism.setFormations(chaos, field);
      organism.setTheme(theme);
      organism.setMorph(0);
      organism.setOpacity(0.32);
      organism.start();
      setShowFallback(false);

      // Load-in: scattered particles settle into the calm full-hero field.
      const startedAt = performance.now();
      const intro = (now: number) => {
        if (!organism || disposed) return;
        const p = Math.min((now - startedAt) / INTRO_MS, 1);
        const eased = easeInOut(p);
        organism.setMorph(eased);
        organism.setOpacity(0.32 + 0.68 * eased);
        if (p < 1) introFrame = requestAnimationFrame(intro);
      };
      introFrame = requestAnimationFrame(intro);

      if (typeof IntersectionObserver === "function") {
        observer = new IntersectionObserver(
          ([entry]) => {
            heroVisible = entry.isIntersecting;
            if (heroVisible && !document.hidden) organism?.start();
            else organism?.stop();
          },
          { threshold: 0.01 },
        );
        observer.observe(canvas);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden || !heroVisible) organism?.stop();
      else organism?.start();
    };

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        cancelAnimationFrame(introFrame);
        organism?.stop();
        setShowFallback(true);
      } else if (organism) {
        setShowFallback(false);
        organism.setMorph(1);
        organism.setOpacity(1);
        organism.start();
      } else {
        initialize();
      }
    };

    const handleResize = () => {
      if (!organism) return;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!organism || disposed) return;
        organism.resize();
        const aspect = aspectOf();
        organism.setFormations(
          generateChaosCloudPoints(particleCount, aspect),
          generateAmbientSpreadPoints(particleCount, aspect),
        );
      }, 150);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!organism) return;
      const bounds = canvas.getBoundingClientRect();
      const xNorm = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      const yNorm = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
      organism.setPointer(xNorm, yNorm);
    };

    const handlePointerLeave = () => organism?.clearPointer();

    const handleClick = (event: MouseEvent) => {
      if (!organism) return;
      const bounds = canvas.getBoundingClientRect();
      const xNorm = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      const yNorm = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
      organism.triggerTap(xNorm, yNorm);
    };

    // Listen on the hero section, not the canvas: DOM elements stacked above
    // the canvas (copy, buttons, status) would otherwise swallow pointer
    // events and deaden the field wherever they sit. The canvas fills the
    // hero exactly, so the coordinate math below is unchanged.
    const hero: HTMLElement =
      canvas.closest<HTMLElement>(".organism-hero") ?? canvas.parentElement ?? canvas;

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotion.addEventListener?.("change", handleReducedMotionChange);
    canvas.addEventListener("webglcontextlost", handleContextLost);
    if (!coarsePointer) {
      hero.addEventListener("pointermove", handlePointerMove);
      hero.addEventListener("pointerleave", handlePointerLeave);
    }
    hero.addEventListener("click", handleClick);

    initialize();

    return () => {
      disposed = true;
      cancelAnimationFrame(introFrame);
      window.clearTimeout(resizeTimer);
      observer?.disconnect();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotion.removeEventListener?.("change", handleReducedMotionChange);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", handlePointerLeave);
      hero.removeEventListener("click", handleClick);
      organism?.destroy();
    };
  }, [count]);

  return (
    <>
      <canvas ref={canvasRef} className={className} aria-hidden="true" />
      <svg
        className={"organism-fallback" + (showFallback ? " is-visible" : "")}
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M120 360 C260 344 360 356 470 326 S680 276 900 164"
          fill="none"
          stroke="var(--org-warm)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

