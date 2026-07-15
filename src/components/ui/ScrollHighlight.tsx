"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "motion/react";

interface ScrollHighlightProps {
  children: React.ReactNode;
  className?: string;
  highlightColor?: string;
}

export function ScrollHighlight({
  children,
  className = "",
  highlightColor = "hsl(220 96% 43% / 0.12)",
}: ScrollHighlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  if (prefersReduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <ScrollHighlightInner progress={scrollYProgress} color={highlightColor}>
        {children}
      </ScrollHighlightInner>
    </div>
  );
}

function ScrollHighlightInner({
  children,
  progress,
  color,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  color: string;
}) {
  const backgroundSize = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <motion.span
      style={{
        background: `linear-gradient(to right, ${color} 100%)`,
        backgroundSize,
        backgroundRepeat: "no-repeat",
      }}
      className="transition-[background-size] duration-0"
    >
      {children}
    </motion.span>
  );
}
