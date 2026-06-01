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
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function WordPullUp({
  text,
  className,
  wordClassName,
  wordClassNames,
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
        return (
          <span
            key={i}
            className="inline-block overflow-hidden"
          style={{
            // Vertical room for BOTH ascenders (top) and descenders (bottom)
            // because line-height:0.98 makes letter ink overflow the line-box
            // in both directions; overflow:hidden would otherwise clip them.
            paddingTop: "0.2em",
            marginTop: "-0.2em",
            paddingBottom: "0.28em",
            marginBottom: "-0.28em",
            // Horizontal room for italic / oblique letter overflow on both
            // edges (e.g. the 'r' tail on 'Better', the 'B' lead on 'Better')
            paddingLeft: "0.08em",
            paddingRight: "0.12em",
            marginLeft: "-0.08em",
            marginRight: "0.13em", // 0.25em nominal - 0.12em pad
          }}
          >
            <motion.span
              className={wordClasses}
              initial={{ y: "100%", opacity: 0 }}
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
