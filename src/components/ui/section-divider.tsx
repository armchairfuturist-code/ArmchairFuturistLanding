"use client";
import { motion } from "motion/react";

interface SectionDividerProps {
  /** Light variant for dark sections, dark variant for light sections */
  variant?: "light" | "dark";
  /** Hide on mobile */
  hideMobile?: boolean;
  /** Custom class */
  className?: string;
}

/**
 * USVC-style section divider with square corner markers.
 * A 1px horizontal line with 3x3px squares at each end.
 */
export function SectionDivider({
  variant = "dark",
  hideMobile = true,
  className = "",
}: SectionDividerProps) {
  const lineColor = variant === "dark" ? "bg-usvc-border" : "bg-border-dark";
  const squareColor = variant === "dark" ? "bg-usvc-border" : "bg-border-dark";

  return (
    <motion.div
      className={`relative h-[1px] w-full ${lineColor} ${hideMobile ? "hidden md:block" : ""} ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ transformOrigin: "left center" }}
    >
      {/* Left square marker */}
      <div
        className={`absolute top-[-1px] left-[2rem] md:left-[9.6rem] lg:left-[19.6rem] w-[3px] h-[3px] ${squareColor}`}
      />
      {/* Right square marker */}
      <div
        className={`absolute top-[-1px] right-[2rem] md:right-[9.6rem] lg:right-[19.6rem] w-[3px] h-[3px] ${squareColor}`}
      />
    </motion.div>
  );
}

interface SideLabelProps {
  label: string;
  /** Light variant for dark sections */
  variant?: "light" | "dark";
}

/**
 * USVC-style side label — rotated uppercase text on the left edge.
 * Hidden on mobile.
 */
export function SideLabel({ label, variant = "light" }: SideLabelProps) {
  const bg = variant === "light" ? "bg-usvc-off-white" : "bg-usvc-navy";
  const textColor = "text-usvc-blue";
  const border = variant === "light"
    ? "border-usvc-border"
    : "border border-border-dark border-r-transparent";

  return (
    <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[9.6rem] lg:w-[19.6rem] z-10 pointer-events-none">
      <div className="sticky top-[13rem] [writing-mode:vertical-rl] [transform:rotate(180deg)] whitespace-nowrap z-10 mr-[-1px]">
        <div
          className={`${bg} ${border} ${textColor} text-[0.75rem] font-[500] tracking-[0.06em] uppercase leading-none py-6 px-[0.5rem]`}
          style={{ transformOrigin: "bottom left" }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}
