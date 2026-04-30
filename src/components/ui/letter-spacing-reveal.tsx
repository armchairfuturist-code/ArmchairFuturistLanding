"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface LetterSpacingRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function LetterSpacingReveal({
  text,
  className,
  delay = 0,
  duration = 0.8,
  once = true,
}: LetterSpacingRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ letterSpacing: "-0.06em", opacity: 0.6 }}
      animate={isInView ? { letterSpacing: "var(--target-ls, -0.015em)", opacity: 1 } : {}}
      transition={{
        duration,
        ease: [0.25, 0.1, 0.25, 1],
        delay,
      }}
    >
      {text}
    </motion.span>
  );
}
