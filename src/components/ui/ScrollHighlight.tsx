"use client";
import { useRef } from "react";
import { motion, useScroll, useReducedMotion, MotionValue } from "motion/react";

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
  return (
    /* The highlight is a separate layer scaled from the left, not a
       background-size on the text span. background-size is a paint
       property, so growing it re-rasterised the gradient on every scroll
       frame; scaleX is composited. The text sits in its own span above the
       layer so the highlight reads as a wash behind it, as before. */
    <span className="relative inline-block">
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 origin-left"
        style={{
          scaleX: progress,
          background: `linear-gradient(to right, ${color} 100%)`,
        }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}
