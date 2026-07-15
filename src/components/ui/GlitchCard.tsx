"use client";
import { motion, useReducedMotion } from "motion/react";

interface GlitchCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlitchCard({ children, className = "" }: GlitchCardProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`group relative ${className}`}
      whileHover="hover"
    >
      {/* RGB split layers — visible on hover */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        variants={{
          hover: {
            opacity: [0, 0.4, 0, 0.3, 0],
            x: [0, -2, 1, -1, 0],
            transition: { duration: 0.4, ease: "easeOut" },
          },
        }}
        style={{ mixBlendMode: "screen" }}
      >
        <div className="absolute inset-0 bg-red-500/10" />
      </motion.div>
      <motion.div
        className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        variants={{
          hover: {
            opacity: [0, 0.3, 0, 0.2, 0],
            x: [0, 2, -1, 1, 0],
            transition: { duration: 0.4, ease: "easeOut", delay: 0.02 },
          },
        }}
        style={{ mixBlendMode: "screen" }}
      >
        <div className="absolute inset-0 bg-cyan-500/10" />
      </motion.div>
      {/* Content */}
      {children}
    </motion.div>
  );
}
