"use client";

import { useEffect, useRef, useState } from "react";
import {
  ParticleOrganism,
  generatePurposeLinePoints,
  generateTangledScribblePoints,
  generateNeuronPoints,
  generateRingsPoints,
  HP_THEMES,
  ParticleTheme,
} from "@/components/organism/webgl-engine";
import { ArrowLeft, Sparkles, Activity, Layers } from "lucide-react";
import Link from "next/link";

interface Chapter {
  id: string;
  name: string;
  label: string;
  subtitle: string;
  theme: ParticleTheme;
  generator: (aspect: number, count: number) => Float32Array;
}

const CHAPTERS: Chapter[] = [
  {
    id: "untangle",
    name: "01 — UNTANGLE",
    label: "Workflow Clarity",
    subtitle: "A tangled signal resolves into one calm line with somewhere to go.",
    theme: HP_THEMES.hero,
    generator: (aspect, count) => generateTangledScribblePoints(count, aspect),
  },
  {
    id: "direction",
    name: "02 — DIRECTION",
    label: "Purposeful Line",
    subtitle: "The resolved system moves forward without losing its human judgment.",
    theme: HP_THEMES.direction,
    generator: (aspect, count) => generatePurposeLinePoints(count, aspect),
  },
  {
    id: "neural",
    name: "03 — ARCHITECT",
    label: "Neural Arbor",
    subtitle: "Multi-branch decision paths for human-centered workflow architecture.",
    theme: HP_THEMES.stats,
    generator: (aspect, count) => generateNeuronPoints(count, aspect),
  },
  {
    id: "rings",
    name: "04 — MASTERY",
    label: "Concentric Systems",
    subtitle: "Vendor-agnostic evaluation rings for real business work.",
    theme: HP_THEMES.services,
    generator: (aspect, count) => generateRingsPoints(count, aspect),
  },
];

export default function ConceptVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const organismRef = useRef<ParticleOrganism | null>(null);

  const [activeChapter, setActiveChapter] = useState(0);
  const [particleCount, setParticleCount] = useState(6000);
  const [morphValue, setMorphValue] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let organism: ParticleOrganism;
    try {
      organism = new ParticleOrganism(canvas, particleCount);
      organismRef.current = organism;
    } catch (e) {
      console.error("Failed to initialize WebGL2 Particle Visualizer", e);
      return;
    }

    const bounds = canvas.getBoundingClientRect();
    const aspect = Math.max(0.1, bounds.width / Math.max(bounds.height, 1));

    const currentGen = CHAPTERS[activeChapter].generator(aspect, particleCount);
    const nextIdx = (activeChapter + 1) % CHAPTERS.length;
    const nextGen = CHAPTERS[nextIdx].generator(aspect, particleCount);

    organism.setFormations(currentGen, nextGen);
    organism.setTheme(CHAPTERS[activeChapter].theme);
    organism.setMorph(morphValue);
    organism.start();

    const handleResize = () => organism.resize();
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const xNorm = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const yNorm = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      organism.setPointer(xNorm, yNorm);
    };
    const handlePointerLeave = () => organism.clearPointer();
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const xNorm = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const yNorm = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      organism.triggerTap(xNorm, yNorm);
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    canvas.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("click", handleClick);
      organism.destroy();
      organismRef.current = null;
    };
  }, [activeChapter, particleCount]);

  useEffect(() => {
    if (organismRef.current) {
      organismRef.current.setMorph(morphValue);
    }
  }, [morphValue]);

  // Auto-rotation timer if enabled
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setActiveChapter((prev) => (prev + 1) % CHAPTERS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [autoRotate]);

  const ch = CHAPTERS[activeChapter];

  return (
    <div className="relative w-full min-h-screen bg-[#080d17] text-[#f0eee8] overflow-hidden flex flex-col justify-between font-sans">
      {/* Top Bar */}
      <header className="relative z-20 flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#080d17]/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9ba2b1] hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <span className="w-1 h-1 rounded-full bg-[#024ad8]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#024ad8] font-bold">
            WebGL2 Particle Engine
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wider flex items-center gap-2 border transition-colors ${
              autoRotate
                ? "bg-[#024ad8]/20 border-[#024ad8] text-[#3d8dff]"
                : "bg-white/5 border-white/10 text-[#9ba2b1] hover:text-white"
            }`}
          >
            <Activity size={13} />
            {autoRotate ? "Auto-Cycling: ON" : "Auto-Cycling: OFF"}
          </button>
        </div>
      </header>

      {/* WebGL2 Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair z-0" />

      {/* Center Interactive Chapter Overlay */}
      <main className="relative z-10 pointer-events-none max-w-4xl mx-auto px-6 py-12 my-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono tracking-widest uppercase text-[#3d8dff] mb-4">
          <Sparkles size={12} />
          {ch.name}
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-4 text-[#f0eee8]">
          {ch.label}
        </h1>
        <p className="text-base md:text-lg text-[#9ba2b1] max-w-xl font-normal leading-relaxed mb-8">
          {ch.subtitle}
        </p>
        <p className="text-xs font-mono tracking-widest text-white/40 uppercase">
          Move pointer to deflect swarm · Click to trigger shockwave impulse
        </p>
      </main>

      {/* Controls & Chapter Switcher Footer */}
      <footer className="relative z-20 px-6 py-6 border-t border-white/10 bg-[#080d17]/85 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Chapter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {CHAPTERS.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setActiveChapter(i);
                  setMorphValue(0);
                }}
                className={`px-4 py-2 rounded-md text-xs font-mono uppercase tracking-wider transition-all ${
                  activeChapter === i
                    ? "bg-[#024ad8] text-white shadow-lg shadow-[#024ad8]/30 font-bold"
                    : "bg-white/5 text-[#9ba2b1] hover:bg-white/10 hover:text-white"
                }`}
              >
                {c.name.split(" — ")[1]}
              </button>
            ))}
          </div>

          {/* Morph & Particle Controls */}
          <div className="flex items-center gap-6 text-xs font-mono text-[#9ba2b1]">
            <div className="flex items-center gap-3">
              <span>Morph:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={morphValue}
                onChange={(e) => setMorphValue(parseFloat(e.target.value))}
                className="w-24 accent-[#024ad8] cursor-pointer"
              />
              <span className="w-8 text-right text-white">{(morphValue * 100).toFixed(0)}%</span>
            </div>

            <div className="flex items-center gap-2">
              <Layers size={14} />
              <span>Particles:</span>
              <select
                value={particleCount}
                onChange={(e) => setParticleCount(parseInt(e.target.value, 10))}
                className="bg-black/40 border border-white/20 rounded px-2 py-1 text-white text-xs font-mono"
              >
                <option value={3000}>3,000 (Light)</option>
                <option value={6000}>6,000 (Balanced)</option>
                <option value={12000}>12,000 (Dense)</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
