"use client";
import { motion } from "motion/react";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import { useReducedMotion } from "motion/react";

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticCard({ children, className = "", strength = 0.15 }: MagneticCardProps) {
  const prefersReduced = useReducedMotion();
  const magnetic = useMagneticHover(strength, 8);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{
        x: magnetic.x,
        y: magnetic.y,
        rotateX: magnetic.rotateX,
        rotateY: magnetic.rotateY,
        transformPerspective: 800,
      }}
      onMouseMove={magnetic.handleMouseMove}
      onMouseLeave={magnetic.handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
