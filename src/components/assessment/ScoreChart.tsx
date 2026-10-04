'use client';

import { motion } from 'motion/react';
import { EASE_OUT } from "@/lib/easing";

interface ScoreChartProps {
  clarity: number;
  readiness: number;
  urgency: number;
}

// HP system has no success/warning hues by design (one signal color).
// Encode the three dimensions with in-system lightness steps instead:
// electric blue -> deep blue -> ink. Labels carry the meaning.
const dimensions = [
  { key: 'clarity', label: 'Clarity', color: 'bg-hp-electric' },
  { key: 'readiness', label: 'Readiness', color: 'bg-hp-deep' },
  { key: 'urgency', label: 'Urgency', color: 'bg-ink-soft' },
] as const;

export default function ScoreChart({ clarity, readiness, urgency }: ScoreChartProps) {
  const scores: Record<string, number> = { clarity, readiness, urgency };

  return (
    <div className="space-y-4 w-full">
      {dimensions.map((dim, idx) => (
        <div key={dim.key}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-charcoal font-sans">
              {dim.label}
            </span>
            <span className="text-sm font-mono text-graphite tabular-nums">
              {scores[dim.key]}%
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
            {/* scaleX on a full-width bar, not width — see QuizProgress. */}
            <motion.div
              className={`h-full w-full origin-left rounded-full ${dim.color}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: scores[dim.key] / 100 }}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.15, ease: EASE_OUT }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
