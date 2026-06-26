'use client';

import { motion, AnimatePresence } from 'motion/react';
import type { Question, AnswerOption } from '@/lib/assessment/config';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (answer: AnswerOption) => void;
  onBack?: () => void;
  questionIndex: number;
  isFirstQuestion: boolean;
}

export default function QuizQuestion({ question, onAnswer, onBack, questionIndex, isFirstQuestion }: QuizQuestionProps) {
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
          {!isFirstQuestion && onBack && (
            <button
              onClick={onBack}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors mb-2 flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:rounded px-1"
              aria-label="Go back to previous question"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Previous question
            </button>
          )}
          {question.answers.map((answer, idx) => (
            <motion.button
              key={idx}
              onClick={() => onAnswer(answer)}
              className="w-full text-left p-4 md:p-5 rounded-xl border border-border bg-card
                hover:border-primary/40 hover:bg-primary/5
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
                transition-[background-color,border-color] duration-150 cursor-pointer group"
              whileTap={{ scale: 0.96 }}
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
