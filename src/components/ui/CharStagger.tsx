"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

interface CharStaggerProps {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function CharStagger({
  text,
  className = "",
  charClassName = "",
  delay = 0,
  staggerDelay = 0.02,
  once = true,
}: CharStaggerProps) {
  const prefersReduced = useReducedMotion();
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReduced) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [prefersReduced, once]);

  const chars = text.split("");

  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className={`inline-block ${charClassName}`}
          initial={{ opacity: 0, y: 30, rotateX: -90 }}
          animate={
            inView
              ? { opacity: 1, y: 0, rotateX: 0 }
              : { opacity: 0, y: 30, rotateX: -90 }
          }
          transition={{
            duration: 0.5,
            delay: prefersReduced ? 0 : delay + i * staggerDelay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}
