'use client';

import { motion, AnimatePresence } from 'motion/react';
import type { Question, AnswerOption } from '@/lib/assessment/config';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (answer: AnswerOption) => void;
  questionIndex: number;
}

export default function QuizQuestion({ question, onAnswer, questionIndex }: QuizQuestionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-2xl mx-auto"
      >
        <h2 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-foreground mb-8 text-center leading-snug">
          {question.text}
        </h2>

        <div className="space-y-3">
          {question.answers.map((answer, idx) => (
            <motion.button
              key={idx}
              onClick={() => onAnswer(answer)}
              className="w-full text-left p-4 md:p-5 rounded-xl border border-border bg-card
                hover:border-primary/40 hover:bg-primary/5
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
                transition-colors duration-150 cursor-pointer group"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-mono font-bold
                  flex items-center justify-center mt-0.5 group-hover:bg-primary group-hover:text-white transition-colors">
                  {String.fromCharCode(97 + idx)}
                </span>
                <span className="text-sm md:text-base text-foreground/80 leading-relaxed font-sans">
                  {answer.text}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
