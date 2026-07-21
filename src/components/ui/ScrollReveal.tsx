"use client";
import { motion } from "motion/react";

/**
 * Progressive scroll-reveal wrapper.
 *
 * Browsers with `animation-timeline: view()` get native CSS-only reveals
 * (zero JS overhead, no layout thrashing).
 *
 * Older browsers fall back to Framer Motion `whileInView`.
 */
const HAS_NATIVE_TIMELINE =
  typeof window !== "undefined" &&
  "CSS" in window &&
  CSS.supports?.("animation-timeline: view()");

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Use the blur-fade variant (default: plain fade-up) */
  blur?: boolean;
  /** Initial Y offset in px (default: 24) */
  y?: number;
}

export function ScrollReveal({
  children,
  className,
  blur = false,
  y = 24,
}: ScrollRevealProps) {
  // Native CSS path — zero JS, GPU-composited
  if (HAS_NATIVE_TIMELINE) {
    const nativeClass = blur ? "view-reveal-blur" : "view-reveal";
    return (
      <div className={className ? `${className} ${nativeClass}` : nativeClass}>
        {children}
      </div>
    );
  }

  // Fallback: Framer Motion (already bundled, already working)
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
