"use client";

import { useRef } from "react";
import { useAmbientVisualRuntime } from "./ambient-visual-runtime";
import { StaticOrganismFallback } from "./StaticOrganismFallback";

export { isSoftwareRenderer } from "./ambient-visual-runtime";

export function OrganismCanvas({
  className = "organism-canvas",
  count = 14000,
}: {
  className?: string;
  count?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const showFallback = useAmbientVisualRuntime({ canvasRef, count });

  return (
    <>
      <canvas ref={canvasRef} className={className} aria-hidden="true" />
      <StaticOrganismFallback visible={showFallback} />
    </>
  );
}
