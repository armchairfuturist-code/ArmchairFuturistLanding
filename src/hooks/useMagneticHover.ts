"use client";
import { useRef, useCallback } from "react";
import { useMotionValue, useSpring, useTransform, MotionValue } from "motion/react";

interface MagneticResult {
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseLeave: () => void;
}

export function useMagneticHover(strength = 0.3, tiltAmount = 12): MagneticResult {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useSpring(useTransform(y, (v) => (v / 50) * tiltAmount), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(x, (v) => -(v / 50) * tiltAmount), { stiffness: 150, damping: 15 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    },
    [x, y, strength]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { x: springX, y: springY, rotateX, rotateY, handleMouseMove, handleMouseLeave };
}
