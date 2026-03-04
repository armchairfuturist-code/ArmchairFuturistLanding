'use client';

import { motion } from 'motion/react';

interface QuizProgressProps {
  current: number;
  total: number;
}

export default function QuizProgress({ current, total }: QuizProgressProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-primary/60">
          Question {current} of {total}
        </span>
        <span className="text-xs font-mono text-primary/60">
          {percent}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-primary/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    </div>
  );
}
