"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

interface ChevronDividerProps {
  className?: string;
}

export function ChevronDivider({ className = "" }: ChevronDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], prefersReduced ? [1, 1, 1] : [0.3, 1, 0.3]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={`relative h-16 flex items-center justify-center overflow-hidden ${className}`}>
      <motion.div style={{ scaleX, opacity }} className="w-full">
        <svg
          viewBox="0 0 1200 40"
          className="w-full h-10 text-primary/10"
          preserveAspectRatio="none"
        >
          <polyline
            points="0,20 580,20 600,5 620,20 1200,20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <polyline
            points="0,25 570,25 600,10 630,25 1200,25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.5"
          />
        </svg>
      </motion.div>
    </div>
  );
}
