"use client";

import { useEffect, useState, type RefObject } from "react";
import {
  ParticleOrganism,
  HP_THEMES,
  generateAmbientSpreadPoints,
  generateChaosCloudPoints,
} from "./webgl-engine";

interface AmbientVisualRuntimeOptions {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  count?: number;
}

const INTRO_MS = 1800;
const MOBILE_COUNT = 3000;
const LOW_END_COUNT = 1200;

const easeInOut = (t: number) => t * t * (3 - 2 * t);

/**
 * Software rasterizers advertise themselves in the unmasked renderer string.
 * Firefox on Linux without GPU acceleration lands on llvmpipe; Chrome's
 * equivalent (SwiftShader) copes with the full swarm, so this is the check that
 * separates "renders in Chrome, dead in Firefox" into a supported tier rather
 * than a dead hero.
 */
export function isSoftwareRenderer(renderer: string): boolean {
  return /swiftshader|llvmpipe|software|basic render|generic renderer/i.test(renderer);
}

/** Probes on a throwaway canvas — the real canvas must keep its own attributes. */
function detectSoftwareRenderer(): boolean {
  try {
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2");
    if (!gl) return false; // the engine reports "no-webgl2" itself
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = ext
      ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL))
      : "";
    // Free the probe context immediately rather than waiting on GC — browsers
    // cap live WebGL contexts per page.
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return isSoftwareRenderer(renderer);
  } catch {
    return false;
  }
}

export function useAmbientVisualRuntime({
  canvasRef,
  count = 14000,
}: AmbientVisualRuntimeOptions) {
  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    // Low-end devices (little memory, many cores missing) get a lighter swarm
    // instead of a context-loss fallback as the only mercy. Software
    // rasterizers (Firefox + llvmpipe on Linux) join that tier.
    const lowEnd =
      typeof navigator !== "undefined" &&
      "deviceMemory" in navigator &&
      (navigator as { deviceMemory?: number }).deviceMemory !== undefined &&
      (navigator as { deviceMemory: number }).deviceMemory <= 4;
    const software = detectSoftwareRenderer();
    const capped = lowEnd || software;
    const particleCount = capped
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
      // preventDefault is what allows the browser to ever restore the context;
      // without it the hero is dead for the life of the page.
      event.preventDefault();
      organism?.stop();
      // Every GL object this engine holds died with the context, so drop the
      // instance rather than let step()/render() call into invalid objects.
      organism = null;
      canvas.dataset.organism = "fallback";
      canvas.dataset.organismReason = "context-lost";
    };

    const handleContextRestored = () => {
      // No destroy() here: the objects are already gone with the old context.
      // Build a fresh engine against the restored one.
      cancelAnimationFrame(introFrame);
      initialize();
    };

    // Firefox restores pages from bfcache with the canvas context already gone
    // and no effect re-run; without this the hero stays a static scribble.
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted && !organism) initialize();
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
        canvas.dataset.organism = "fallback";
        canvas.dataset.organismReason =
          error instanceof Error && error.message.includes("WebGL2")
            ? "no-webgl2"
            : "init-failed";
        setShowFallback(true);
        return;
      }

      organism.setFormations(chaos, field);
      organism.setTheme(theme);
      organism.setMorph(0);
      organism.setOpacity(0.32);
      organism.start();
      canvas.dataset.organism = "webgl";
      canvas.dataset.organismCount = String(particleCount);
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
      if (document.hidden || !heroVisible) {
        organism?.stop();
        return;
      }
      // A backgrounded tab can come back with its context gone (Firefox
      // recycles the GPU process). Rebuild instead of staying on the fallback.
      if (!organism) {
        initialize();
        return;
      }
      organism.start();
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
    window.addEventListener("pageshow", handlePageShow);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotion.addEventListener?.("change", handleReducedMotionChange);
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);
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
      window.removeEventListener("pageshow", handlePageShow);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotion.removeEventListener?.("change", handleReducedMotionChange);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", handlePointerLeave);
      hero.removeEventListener("click", handleClick);
      organism?.destroy();
    };
  }, [count]);

  return showFallback;
}

