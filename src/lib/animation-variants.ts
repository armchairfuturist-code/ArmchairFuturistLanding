import type { Variants } from "motion/react";
import { EASE_OUT } from "@/lib/easing";

// Shared stagger primitives
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
};

export const diagonalWipe: Variants = {
  hidden: { clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)" },
  visible: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
  },
};

// Spring-driven stagger — weightier, premium feel on card grids
export const springStaggerItem: Variants = { hidden: { opacity: 0, y: 36, filter: "blur(2px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 120, damping: 18, mass: 0.8 }, }, };
