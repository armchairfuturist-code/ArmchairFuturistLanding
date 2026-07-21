"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Local cursor spotlight — radial gradient follows the mouse
 * within the wrapped section only (not global/document-level).
 *
 * Very subtle: 6% opacity HP Electric Blue glow.
 * Disabled when user prefers reduced motion.
 */
interface SectionSpotlightProps {
  children: React.ReactNode;
  className?: string;
  size?: number;       // px — default 500
  opacity?: number;    // 0–1 — default 0.06
  color?: string;      // default HP Electric Blue
}

export function SectionSpotlight({
  children,
  className = "",
  size = 500,
  opacity = 0.06,
  color = "hsl(220 96% 43%)",
}: SectionSpotlightProps) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    let raf: number;
    const el = section.querySelector("[data-spotlight]") as HTMLDivElement | null;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--sx", `${x}px`);
        el.style.setProperty("--sy", `${y}px`);
        el.style.opacity = "1";
      });
    };

    const onLeave = () => {
      if (el) el.style.opacity = "0";
    };

    section.addEventListener("mousemove", onMove, { passive: true });
    section.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      {!reduced && (
        <div
          data-spotlight
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle ${size}px at var(--sx, -9999px) var(--sy, -9999px), ${color} / ${opacity}, transparent 100%)`,
          }}
        />
      )}
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}
