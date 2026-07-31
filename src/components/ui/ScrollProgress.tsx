"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="scroll-progress-bar fixed top-0 left-0 right-0 h-[3px] bg-hp-electric origin-left z-[60] pointer-events-none"
      aria-hidden="true"
    />
  );
}
