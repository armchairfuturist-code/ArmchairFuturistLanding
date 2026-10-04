'use client';

import { motion } from 'motion/react';
import { EASE_OUT } from "@/lib/easing";

interface QuizProgressProps {
  current: number;
  total: number;
}

export default function QuizProgress({ current, total }: QuizProgressProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto mb-8" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total} aria-label={`Question ${current} of ${total}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-hp-electric/60">
          Question {current} of {total}
        </span>
        <span className="text-xs font-mono text-hp-electric/60 tabular-nums">
          {percent}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-hp-electric/10 overflow-hidden">
        {/* scaleX on a full-width bar, not width: the inner must be w-full or
            the scale no longer maps to the percentage. width is a layout
            property — it re-runs layout every frame of the 400ms. */}
        <motion.div
          className="h-full w-full origin-left rounded-full bg-hp-electric"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: percent / 100 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        />
      </div>
    </div>
  );
}
