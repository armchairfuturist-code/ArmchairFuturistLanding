'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import { motion } from 'motion/react';
import { questions, type AnswerOption } from '@/lib/assessment/config';
import { calculateScores } from '@/lib/assessment/scoring';
import { trackEvent, trackConversion } from '@/lib/analytics';
import QuizProgress from '@/components/assessment/QuizProgress';
import QuizQuestion from '@/components/assessment/QuizQuestion';
import EmailCapture from '@/components/assessment/EmailCapture';

type Phase = 'landing' | 'quiz' | 'email' | 'redirecting';

export default function AssessmentPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('landing');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AnswerOption[]>([]);
  const [resultSlug, setResultSlug] = useState('');
  const [resultScores, setResultScores] = useState<{ clarity: number; readiness: number; urgency: number } | null>(null);

  const handleStart = useCallback(() => {
    trackEvent('assessment_start');
    setPhase('quiz');
  }, []);

  const handleAnswer = useCallback((answer: AnswerOption) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    trackEvent(`assessment_question_${currentQuestion + 1}`, {
      question_id: questions[currentQuestion].id,
    });

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // All questions answered, calculate scores
      const result = calculateScores(newAnswers);
      setResultSlug(result.archetypeSlug);
      setResultScores({ clarity: result.clarity, readiness: result.readiness, urgency: result.urgency });
      setPhase('email');
    }
  }, [answers, currentQuestion]);

  const navigateToResult = useCallback(() => {
    if (!resultSlug) return;
    setPhase('redirecting');
    trackConversion('assessment_complete', undefined);
    router.push(`/assessment/result/${resultSlug}?${buildScoreParams()}`);
  }, [resultSlug, router, answers]);

  function buildScoreParams() {
    if (answers.length === 0) return '';
    const result = calculateScores(answers);
    return new URLSearchParams({
      c: String(result.clarity),
      r: String(result.readiness),
      u: String(result.urgency),
    }).toString();
  }

  // Landing
  if (phase === 'landing') {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-primary/5 py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
          <BlurFade inView delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-6">
              <Brain className="w-3 h-3" />
              <span>Free Assessment</span>
            </div>
          </BlurFade>

          <BlurFade inView delay={0.2}>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary mb-5">
              How Ready Are You for AI?
            </h1>
          </BlurFade>

          <BlurFade inView delay={0.3}>
            <p className="text-lg text-foreground/70 font-sans leading-relaxed mb-4 max-w-xl mx-auto">
              9 honest questions. 3 minutes. A personalized diagnosis of where you stand and what to do next.
            </p>
          </BlurFade>

          <BlurFade inView delay={0.35}>
            <p className="text-sm text-muted-foreground font-sans mb-8 max-w-lg mx-auto">
              No trick questions, no sales pitch baked into the scoring. Just a clear read on your AI clarity, readiness, and urgency, with a recommendation that matches where you actually are.
            </p>
          </BlurFade>

          <BlurFade inView delay={0.4}>
            <Button size="lg" className="font-bold text-base px-8" onClick={handleStart}>
              Start the Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </BlurFade>

          <BlurFade inView delay={0.5}>
            <p className="mt-6 text-xs text-muted-foreground/50 font-mono">
              No email required to start. Results are immediate.
            </p>
          </BlurFade>
        </div>
      </section>
    );
  }

  // Quiz
  if (phase === 'quiz') {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-primary/5 py-20">
        <div className="container mx-auto px-4 md:px-6 w-full">
          <QuizProgress current={currentQuestion + 1} total={questions.length} />
          <QuizQuestion
            question={questions[currentQuestion]}
            onAnswer={handleAnswer}
            questionIndex={currentQuestion}
          />
        </div>
      </section>
    );
  }

  // Email capture
  if (phase === 'email') {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-primary/5 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <EmailCapture
            onComplete={navigateToResult}
            onSkip={navigateToResult}
            archetypeSlug={resultSlug}
            scores={resultScores || { clarity: 50, readiness: 50, urgency: 50 }}
          />
        </div>
      </section>
    );
  }

  // Redirecting
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-primary/5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <p className="text-muted-foreground font-sans">Loading your results...</p>
      </motion.div>
    </section>
  );
}
