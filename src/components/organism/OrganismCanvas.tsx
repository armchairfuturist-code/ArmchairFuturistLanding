"use client";

import { useEffect, useRef, useState } from "react";
import {
  ParticleOrganism,
  generatePurposeLinePoints,
  generateTangledScribblePoints,
  HP_THEMES,
} from "./webgl-engine";

interface OrganismCanvasProps {
  className?: string;
  count?: number;
}

const REVEAL_DURATION_MS = 3000;

export function OrganismCanvas({
  className = "organism-canvas",
  count = 6000,
}: OrganismCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const particleCount = window.innerWidth < 800 ? Math.min(count, 4200) : count;
    let organism: ParticleOrganism | null = null;
    let revealFrame = 0;
    let heroVisible = true;
    let observer: IntersectionObserver | null = null;

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      organism?.stop();
      setShowFallback(true);
    };

    const getFormations = () => {
      const bounds = canvas.getBoundingClientRect();
      const aspect = Math.max(0.1, bounds.width / Math.max(bounds.height, 1));
      return [
        generateTangledScribblePoints(particleCount, aspect),
        generatePurposeLinePoints(particleCount, aspect),
      ] as const;
    };

    const initialize = () => {
      if (organism || reducedMotion.matches) return;

      try {
        organism = new ParticleOrganism(canvas, particleCount);
      } catch (error) {
        console.warn("WebGL2 hero organism initialization failed:", error);
        setShowFallback(true);
        return;
      }

      const [tangledFormation, purposeFormation] = getFormations();
      organism.setFormations(tangledFormation, purposeFormation, true);
      organism.setTheme(HP_THEMES.hero);
      organism.setMorph(0);
      organism.start();
      setShowFallback(false);

      const revealStartedAt = performance.now();
      const reveal = (now: number) => {
        if (!organism) return;
        const progress = Math.min((now - revealStartedAt) / REVEAL_DURATION_MS, 1);
        const eased = progress * progress * (3 - 2 * progress);
        organism.setMorph(eased);
        if (progress < 1) revealFrame = window.requestAnimationFrame(reveal);
      };
      revealFrame = window.requestAnimationFrame(reveal);

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
        organism?.stop();
        setShowFallback(true);
      } else if (organism) {
        setShowFallback(false);
        organism.start();
      } else {
        initialize();
      }
    };

    const handleResize = () => {
      if (!organism) return;
      organism.resize();
      const [nextTangled, nextPurpose] = getFormations();
      organism.setFormations(nextTangled, nextPurpose);
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

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotion.addEventListener?.("change", handleReducedMotionChange);
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    canvas.addEventListener("click", handleClick);

    initialize();

    return () => {
      window.cancelAnimationFrame(revealFrame);
      observer?.disconnect();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotion.removeEventListener?.("change", handleReducedMotionChange);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("click", handleClick);
      organism?.destroy();
    };
  }, [count]);

  return (
    <>
      <canvas ref={canvasRef} className={className} aria-hidden="true" />
      <svg
        className={`organism-fallback ${showFallback ? "is-visible" : ""}`}
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
