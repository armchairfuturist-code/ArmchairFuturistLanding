"use client";

import { MotionConfig } from "motion/react";

/**
 * Global motion policy: every JS-driven (motion/react) transform animation is
 * suppressed for users who set prefers-reduced-motion; opacity fades remain.
 * CSS animations/transitions are killed separately in globals.css.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
