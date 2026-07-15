"use client";
import { motion, useReducedMotion } from "motion/react";

interface GradientTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

export function GradientText({
  children,
  className = "",
  as: Tag = "span",
}: GradientTextProps) {
  const prefersReduced = useReducedMotion();

  return (
    <Tag className={`relative inline-block ${className}`}>
      <span
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage: prefersReduced
            ? "linear-gradient(to right, hsl(220 96% 43%), hsl(217 95% 57%))"
            : undefined,
        }}
      >
        {children}
      </span>
      {!prefersReduced && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 bg-clip-text text-transparent pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(90deg, hsl(220 96% 43%) 0%, hsl(217 95% 57%) 25%, hsl(198 32% 61%) 50%, hsl(217 95% 57%) 75%, hsl(220 96% 43%) 100%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {children}
        </motion.span>
      )}
    </Tag>
  );
}
