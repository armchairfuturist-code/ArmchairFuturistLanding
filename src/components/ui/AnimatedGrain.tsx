"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

interface AnimatedGrainProps {
  speed?: number;
  opacity?: number;
  className?: string;
}

export function AnimatedGrain({ speed = 0.5, opacity = 0.035, className = "" }: AnimatedGrainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const frameRef = useRef(0);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 256;
    let h = 256;
    canvas.width = w;
    canvas.height = h;

    let lastTime = 0;
    const interval = 1000 / (speed * 12);

    const draw = (time: number) => {
      frameRef.current = requestAnimationFrame(draw);
      if (time - lastTime < interval) return;
      lastTime = time;

      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [reduced, speed]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 w-full h-full z-[1] mix-blend-multiply ${className}`}
      style={{ opacity, imageRendering: "pixelated" }}
    />
  );
}
