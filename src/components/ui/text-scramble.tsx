"use client";

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
  scrambleDuration?: number;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export function TextScramble({
  text,
  className,
  speed = 30,
  scrambleDuration = 1200,
}: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayText, setDisplayText] = useState(text);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !isInView || hasAnimated.current) return;

    hasAnimated.current = true;
    let iteration = 0;
    const totalIterations = Math.ceil(scrambleDuration / speed);

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            const revealThreshold = (index / text.length) * totalIterations;
            if (iteration > revealThreshold) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration++;
      if (iteration > totalIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isInView, text, speed, scrambleDuration]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}
