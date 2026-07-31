"use client";

import { useTextScramble } from "@/hooks/useTextScramble";
import { useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** Scramble only when the element enters the viewport. Default true. */
  inView?: boolean;
  speed?: number;
  as?: "span" | "p" | "h2" | "h3";
}

/**
 * Text that decodes into place — literacy metaphor for The Armchair Futurist.
 * Respects prefers-reduced-motion via useTextScramble.
 * Renders final text immediately so layout never collapses before scramble runs.
 */
export function ScrambleText({
  text,
  className,
  inView = true,
  speed = 28,
  as: Tag = "span",
}: ScrambleTextProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(rootRef, { once: true, margin: "-10% 0px" });
  const scrambleRef = useTextScramble(text, {
    trigger: inView ? isInView : true,
    speed,
  });

  return (
    <Tag
      ref={(node) => {
        rootRef.current = node;
      }}
      className={cn("relative", className)}
    >
      <span ref={scrambleRef}>{text}</span>
    </Tag>
  );
}
