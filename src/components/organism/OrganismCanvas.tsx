"use client";

import { useEffect, useRef } from "react";

type OrganismCanvasProps = {
  className?: string;
};

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
};

const TAU = Math.PI * 2;

export function OrganismCanvas({ className }: OrganismCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let scroll = window.scrollY;
    let pointer = { x: 0.72, y: 0.34, active: false };
    const nodes: Node[] = [];

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!nodes.length) {
        const count = width < 600 ? 34 : 58;
        for (let index = 0; index < count; index += 1) {
          const angle = (index / count) * TAU;
          const radius = 0.12 + (index % 7) * 0.021;
          nodes.push({
            x: width * (0.72 + Math.cos(angle) * radius),
            y: height * (0.38 + Math.sin(angle) * radius * 1.35),
            vx: 0,
            vy: 0,
            radius: 1.4 + (index % 3) * 0.8,
            phase: index * 0.73,
          });
        }
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer = {
        x: (event.clientX - bounds.left) / bounds.width,
        y: (event.clientY - bounds.top) / bounds.height,
        active: true,
      };
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onScroll = () => {
      scroll = window.scrollY;
    };

    const draw = () => {
      frame += 1;
      context.clearRect(0, 0, width, height);

      const motion = reducedMotion.matches ? 0.16 : 1;
      const scrollDrift = Math.min(scroll / Math.max(window.innerHeight, 1), 2) * 0.08;
      const centerX = width * (0.72 + Math.sin(frame * 0.002 * motion) * 0.035);
      const centerY = height * (0.4 + scrollDrift + Math.cos(frame * 0.0014 * motion) * 0.04);

      for (let index = 0; index < nodes.length; index += 1) {
        const node = nodes[index];
        const angle = node.phase + frame * 0.002 * motion;
        const orbit = 0.16 + (index % 8) * 0.018;
        const targetX = centerX + Math.cos(angle) * width * orbit;
        const targetY = centerY + Math.sin(angle * 1.17) * height * orbit * 1.35;
        const pointerX = pointer.x * width;
        const pointerY = pointer.y * height;
        const dx = node.x - pointerX;
        const dy = node.y - pointerY;
        const distance = Math.hypot(dx, dy) || 1;
        const influence = pointer.active ? Math.max(0, 1 - distance / 240) : 0;

        node.vx += (targetX - node.x) * 0.0028 * motion + (dx / distance) * influence * 0.08;
        node.vy += (targetY - node.y) * 0.0028 * motion + (dy / distance) * influence * 0.08;
        node.vx *= 0.94;
        node.vy *= 0.94;
        node.x += node.vx;
        node.y += node.vy;
      }

      context.lineWidth = 0.8;
      for (let index = 0; index < nodes.length; index += 1) {
        const node = nodes[index];
        for (let otherIndex = index + 1; otherIndex < nodes.length; otherIndex += 1) {
          const other = nodes[otherIndex];
          const distance = Math.hypot(node.x - other.x, node.y - other.y);
          if (distance > 118) continue;
          context.strokeStyle = `rgba(63, 142, 255, ${(1 - distance / 118) * 0.25})`;
          context.beginPath();
          context.moveTo(node.x, node.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }

      for (const node of nodes) {
        const pulse = 1 + Math.sin(frame * 0.025 * motion + node.phase) * 0.26;
        context.fillStyle = "rgba(94, 161, 255, 0.9)";
        context.shadowColor = "rgba(41, 110, 249, 0.9)";
        context.shadowBlur = 12;
        context.beginPath();
        context.arc(node.x, node.y, node.radius * pulse, 0, TAU);
        context.fill();
      }
      context.shadowBlur = 0;

      const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, width * 0.34);
      gradient.addColorStop(0, "rgba(41, 110, 249, 0.22)");
      gradient.addColorStop(0.45, "rgba(20, 79, 205, 0.08)");
      gradient.addColorStop(1, "rgba(20, 79, 205, 0)");
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(centerX, centerY, width * 0.34, 0, TAU);
      context.fill();

      raf = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
