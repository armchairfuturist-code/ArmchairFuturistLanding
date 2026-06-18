"use client";

import { useRef } from "react";
import { motion, type Variants } from "motion/react";

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

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0,
    },
  },
};

const wordVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

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

  const words = text.split(" ");

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      transition={{ delayChildren: delay, staggerChildren: 0.06 }}
    >
      {words.map((word, i) => {
        const extra = wordClassNames?.[word];
        const wordClasses = ["inline-block", wordClassName, extra]
          .filter(Boolean)
          .join(" ");
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
            }}
          >
            <motion.span
              className={wordClasses}
              variants={wordVariants}
              transition={{ duration }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
