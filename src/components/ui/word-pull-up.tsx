"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface WordPullUpProps {
  text: string;
  className?: string;
  wordClassName?: string;
  /**
   * Per-word class overrides, keyed by the exact word in the input string.
   * These classes are appended to `wordClassName` so they can extend
   * (e.g. add `italic`) or override the base word style.
   */
  wordClassNames?: Record<string, string>;
  /**
   * Per-word inline style overrides, keyed by the exact word in the input
   * string. Merged into the outer wrapper's inline style (padding/margin).
   * Use this when a specific word needs more breathing room (e.g. an italic
   * tail that extends past the standard right padding).
   */
  wordStyles?: Record<string, React.CSSProperties>;
  delay?: number;
  duration?: number;
  once?: boolean;
}
export function WordPullUp({
  text,
  className,
  wordClassName,
  wordClassNames,
  wordStyles,
  delay = 0,
  duration = 0.5,
  once = true,
}: WordPullUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => {
        const extra = wordClassNames?.[word];
        const wordClasses = ["inline-block", wordClassName, extra]
          .filter(Boolean)
          .join(" ");
        const overrides = wordStyles?.[word];
        return (
          <span
            key={i}
            className="inline-block"
            style={{
              // Room for ascenders, descenders, italic overflow
              paddingTop: "0.30em",
              marginTop: "-0.30em",
              paddingBottom: "0.32em",
              marginBottom: "-0.32em",
              paddingLeft: "0.15em",
              paddingRight: "0.20em",
              marginLeft: "-0.15em",
              marginRight: "0.05em",
              ...overrides,
            }}
          >
            <motion.span
              className={wordClasses}
              initial={{ y: "0.35em", opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration,
                ease: [0.25, 0.1, 0.25, 1],
                delay: delay + i * 0.06,
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
