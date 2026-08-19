"use client";

import { useEffect, useRef, useState } from "react";
import {
  ParticleOrganism,
  HP_THEMES,
  generateChaosCloudPoints,
  generateWaveStreamPoints,
  sampleWordPoints,
} from "./webgl-engine";

interface OrganismCanvasProps {
  className?: string;
  count?: number;
  words?: string[];
}

const UNTANGLE_MS = 2500;
const HOLD_MS = 5000;
const DREAM_MORPH_MS = 1900;
const DREAM_HOLD_MS = 2400;
const WAKE_MORPH_MS = 1900;
const SCRAMBLE_MS = 500;
const MOBILE_COUNT = 3000;

type Phase = "untangle" | "hold" | "dream" | "dream-hold" | "wake";

const DEFAULT_WORDS = ["LEVERAGE", "CLARITY", "FLOW", "JUDGMENT"];

const easeInOut = (t: number) => t * t * (3 - 2 * t);

export function OrganismCanvas({
  className = "organism-canvas",
  count = 9000,
  words = DEFAULT_WORDS,
}: OrganismCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const particleCount =
      coarsePointer || window.innerWidth < 800 ? Math.min(count, MOBILE_COUNT) : count;

    let organism: ParticleOrganism | null = null;
    let observer: IntersectionObserver | null = null;
    let heroVisible = true;
    let disposed = false;

    let phase: Phase = "untangle";
    let phaseStartedAt = 0;
    let lastMorph = 0;
    let wordIndex = 0;
    let lastInteractionAt = 0;
    let scrambleStartedAt = -1;
    let tickFrame = 0;
    let resizeTimer = 0;

    let chaos: Float32Array | null = null;
    let wave: Float32Array | null = null;
    let wordFormations: Float32Array[] = [];

    // Small screens get a calmer swarm: the word stays legible at rest.
    const heroTheme = coarsePointer
      ? { ...HP_THEMES.hero, turb: HP_THEMES.hero.turb * 0.55, push: HP_THEMES.hero.push * 0.8 }
      : HP_THEMES.hero;
    const dreamTheme = coarsePointer
      ? { ...HP_THEMES.dream, turb: HP_THEMES.dream.turb * 0.55, push: HP_THEMES.dream.push * 0.8 }
      : HP_THEMES.dream;

    const aspectOf = () => {
      const bounds = canvas.getBoundingClientRect();
      return Math.max(0.1, bounds.width / Math.max(bounds.height, 1));
    };

    const wordOptions = () => {
      const bounds = canvas.getBoundingClientRect();
      const mobile = bounds.width < 800;
      return mobile
        ? { widthFactor: 0.86, yCenter: 0.24, xCenter: 0 }
        : { widthFactor: 0.46, yCenter: -0.34, xCenter: 0.42 };
    };

    const buildFormations = () => {
      const aspect = aspectOf();
      const options = wordOptions();
      chaos = generateChaosCloudPoints(particleCount, aspect);
      wave = generateWaveStreamPoints(particleCount, aspect);
      wordFormations = words.map((word) => sampleWordPoints(word, particleCount, aspect, options));
    };

    const wordAt = (index: number) =>
      wordFormations[((index % wordFormations.length) + wordFormations.length) % wordFormations.length];

    const applyPhaseFormations = (morph: number) => {
      if (!organism || wordFormations.length === 0) return;
      const current = wordAt(wordIndex);
      if (phase === "untangle" || phase === "hold") {
        if (chaos && current) organism.setFormations(chaos, current);
      } else if (phase === "dream" || phase === "dream-hold") {
        if (current && wave) organism.setFormations(current, wave);
      } else if (wave) {
        const next = wordAt(wordIndex);
        if (next) organism.setFormations(wave, next);
      }
      organism.setMorph(morph);
      lastMorph = morph;
    };

    const tick = (now: number) => {
      if (disposed || !organism) return;
      const elapsed = now - phaseStartedAt;

      if (phase === "untangle") {
        const p = Math.min(elapsed / UNTANGLE_MS, 1);
        lastMorph = easeInOut(p);
        organism.setMorph(lastMorph);
        organism.setOpacity(0.32 + 0.68 * lastMorph);
        if (p >= 1) {
          phase = "hold";
          phaseStartedAt = now;
          // The word dwells a full hold before the first dream.
          lastInteractionAt = now;
        }
      } else if (phase === "hold") {
        lastMorph = 1;
        organism.setMorph(1);
        if (now - lastInteractionAt >= HOLD_MS && wave && wordFormations.length > 0) {
          organism.setFormations(wordAt(wordIndex), wave);
          organism.setMorph(0);
          lastMorph = 0;
          organism.setTheme(dreamTheme);
          phase = "dream";
          phaseStartedAt = now;
        }
      } else if (phase === "dream") {
        const p = Math.min(elapsed / DREAM_MORPH_MS, 1);
        lastMorph = easeInOut(p);
        organism.setMorph(lastMorph);
        if (p >= 1) {
          phase = "dream-hold";
          phaseStartedAt = now;
        }
      } else if (phase === "dream-hold") {
        if (elapsed >= DREAM_HOLD_MS && wave && wordFormations.length > 0) {
          wordIndex = (wordIndex + 1) % wordFormations.length;
          organism.setFormations(wave, wordAt(wordIndex));
          organism.setMorph(0);
          lastMorph = 0;
          organism.setTheme(heroTheme);
          phase = "wake";
          phaseStartedAt = now;
        }
      } else if (phase === "wake") {
        const p = Math.min(elapsed / WAKE_MORPH_MS, 1);
        lastMorph = easeInOut(p);
        organism.setMorph(lastMorph);
        if (p >= 1) {
          phase = "hold";
          phaseStartedAt = now;
          // Each word dwells a full hold before the next dream.
          lastInteractionAt = now;
        }
      }

      if (scrambleStartedAt >= 0) {
        const s = Math.max(0, 1 - (now - scrambleStartedAt) / SCRAMBLE_MS);
        organism.setScramble(s);
        if (s <= 0) scrambleStartedAt = -1;
      }

      tickFrame = requestAnimationFrame(tick);
    };

    const wakeFromDream = (now: number) => {
      if (!organism || (phase !== "dream" && phase !== "dream-hold")) return;
      if (!wave || wordFormations.length === 0) return;
      organism.setFormations(wave, wordAt(wordIndex));
      organism.setTheme(heroTheme);
      if (phase === "dream") {
        const start = Math.max(0, 1 - lastMorph);
        organism.setMorph(start);
        lastMorph = start;
        phaseStartedAt = now - start * WAKE_MORPH_MS;
      } else {
        organism.setMorph(0);
        lastMorph = 0;
        phaseStartedAt = now;
      }
      phase = "wake";
    };

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      organism?.stop();
      setShowFallback(true);
    };

    const initialize = () => {
      if (organism || reducedMotion.matches || disposed) return;

      buildFormations();
      if (!chaos || wordFormations.length === 0 || !wordAt(0)) {
        setShowFallback(true);
        return;
      }

      try {
        organism = new ParticleOrganism(canvas, particleCount, chaos);
      } catch (error) {
        console.warn("WebGL2 hero organism initialization failed:", error);
        setShowFallback(true);
        return;
      }

      organism.setFormations(chaos, wordAt(0));
      organism.setTheme(heroTheme);
      organism.setMorph(0);
      organism.setOpacity(0.32);
      organism.setScramble(0);
      organism.start();
      setShowFallback(false);

      const now = performance.now();
      phase = "untangle";
      phaseStartedAt = now;
      lastInteractionAt = now;
      tickFrame = requestAnimationFrame(tick);

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
        cancelAnimationFrame(tickFrame);
        organism?.stop();
        setShowFallback(true);
      } else if (organism) {
        setShowFallback(false);
        organism.start();
        const now = performance.now();
        phaseStartedAt = now;
        lastInteractionAt = now;
        tickFrame = requestAnimationFrame(tick);
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
        buildFormations();
        applyPhaseFormations(lastMorph);
      }, 150);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!organism) return;
      const now = performance.now();
      lastInteractionAt = now;
      wakeFromDream(now);
      const bounds = canvas.getBoundingClientRect();
      const xNorm = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      const yNorm = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
      organism.setPointer(xNorm, yNorm);
    };

    const handlePointerLeave = () => organism?.clearPointer();

    const handleClick = (event: MouseEvent) => {
      if (!organism) return;
      const now = performance.now();
      lastInteractionAt = now;
      wakeFromDream(now);
      const bounds = canvas.getBoundingClientRect();
      const xNorm = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      const yNorm = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
      organism.triggerTap(xNorm, yNorm);
      scrambleStartedAt = now;
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotion.addEventListener?.("change", handleReducedMotionChange);
    canvas.addEventListener("webglcontextlost", handleContextLost);
    if (!coarsePointer) {
      canvas.addEventListener("pointermove", handlePointerMove);
      canvas.addEventListener("pointerleave", handlePointerLeave);
    }
    canvas.addEventListener("click", handleClick);

    const fontLoad =
      "fonts" in document
        ? Promise.resolve(document.fonts.load('700 120px "Space Grotesk"')).catch(() => undefined)
        : Promise.resolve();
    void fontLoad.then(() => {
      if (!disposed) initialize();
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(tickFrame);
      window.clearTimeout(resizeTimer);
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
  }, [count, words]);

  return (
    <>
      <canvas ref={canvasRef} className={className} aria-hidden="true" />
      <svg
        className={`organism-fallback ${showFallback ? "is-visible" : ""}`}
        viewBox="0 0 1000 560"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <text x="500" y="316" textAnchor="middle" className="organism-fallback__word">
          LEVERAGE
        </text>
      </svg>
    </>
  );
}
