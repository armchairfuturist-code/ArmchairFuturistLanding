"use client";
import { motion } from "motion/react";

/**
 * Scroll-reveal wrapper using Framer Motion whileInView.
 *
 * NOTE: Native CSS animation-timeline: view() was tested but caused
 * content to render invisible on Chromium due to fill-mode: both
 * keeping elements at opacity: 0 when the timeline didn't catch up.
 * Sticking with the proven Framer Motion path until browsers stabilize.
 */
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Initial Y offset in px (default: 24) */
  y?: number;
  /** Blur amount (default: 0 = no blur) */
  blur?: number;
}

export function ScrollReveal({
  children,
  className,
  y = 24,
  blur = 0,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: blur ? `blur(${blur}px)` : "none" }}
      whileInView={{ opacity: 1, y: 0, filter: "none" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
