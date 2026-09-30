"use client";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * Top scroll-progress rule.
 *
 * The homepage runs ~14,000px across 15 sections. Without a position
 * indicator a reader cannot tell section three from section eleven — the
 * page reads as endless rather than as a document with a shape.
 *
 * Constant motion (progress tracking) is the one case that genuinely wants
 * `linear`. The spring only smooths the sampling of scroll events, it does
 * not shape the perceived rate, and it is dropped under reduced motion so
 * the bar tracks the scrollbar 1:1.
 *
 * Not animated in or out: it is chrome, present from the first paint. Any
 * transition here would lag the scroll it is supposed to describe.
 */
export default function ScrollProgress() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    mass: 0.4,
  });
  const progress = reducedMotion ? scrollYProgress : smooth;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX: progress,
        // Fill from the left edge, like the text it sits above.
        transformOrigin: "0 50%",
      }}
      className="scroll-progress"
    />
  );
}
