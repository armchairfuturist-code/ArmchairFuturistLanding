'use client';

import { motion } from 'motion/react';

interface ScoreChartProps {
  clarity: number;
  readiness: number;
  urgency: number;
}

const dimensions = [
  { key: 'clarity', label: 'Clarity', color: 'bg-blue-500' },
  { key: 'readiness', label: 'Readiness', color: 'bg-emerald-500' },
  { key: 'urgency', label: 'Urgency', color: 'bg-amber-500' },
] as const;

export default function ScoreChart({ clarity, readiness, urgency }: ScoreChartProps) {
  const scores: Record<string, number> = { clarity, readiness, urgency };

  return (
    <div className="space-y-4 w-full">
      {dimensions.map((dim, idx) => (
        <div key={dim.key}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-foreground/70 font-sans">
              {dim.label}
            </span>
            <span className="text-sm font-mono text-foreground/50">
              {scores[dim.key]}%
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${dim.color}`}
              initial={{ width: 0 }}
              animate={{ width: `${scores[dim.key]}%` }}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
