"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface WordPullUpProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function WordPullUp({
  text,
  className,
  wordClassName,
  delay = 0,
  duration = 0.5,
  once = true,
}: WordPullUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.25em]"
          style={{ paddingBottom: "0.18em", marginBottom: "-0.18em" }}
        >
          <motion.span
            className={`inline-block ${wordClassName || ""}`}
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
      ))}
    </span>
  );
}
