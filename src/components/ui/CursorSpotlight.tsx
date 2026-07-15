"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

interface SpotlightOptions {
  size?: number;
  color?: string;
  opacity?: number;
}

export function CursorSpotlight({
  size = 400,
  color = "hsl(220 96% 43%)",
  opacity = 0.06,
}: SpotlightOptions) {
  const reduced = useReducedMotion();
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const el = elRef.current;
    if (!el) return;

    let raf: number;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--x", `${e.clientX}px`);
        el.style.setProperty("--y", `${e.clientY}px`);
        el.style.opacity = "1";
      });
    };

    const onLeave = () => {
      el.style.opacity = "0";
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={elRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45] opacity-0 transition-opacity duration-300"
      style={{
        background: `radial-gradient(circle ${size}px at var(--x, -9999px) var(--y, -9999px), ${color} / ${opacity}, transparent 100%)`,
      }}
    />
  );
}
