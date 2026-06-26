'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import { motion } from 'motion/react';
import { questions, type AnswerOption } from '@/lib/assessment/config';
import { calculateScores } from '@/lib/assessment/scoring';
import {
  saveAssessmentResult,
  buildResultQueryParams,
} from '@/lib/assessment/result-session';
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
  const [answerIndices, setAnswerIndices] = useState<number[]>([]);
  const [resultSlug, setResultSlug] = useState('');
  const [resultScores, setResultScores] = useState<{
    clarity: number;
    readiness: number;
    urgency: number;
    individualSignals: number;
  } | null>(null);

  const handleStart = useCallback(() => {
    trackEvent('assessment_start');
    setPhase('quiz');
  }, []);

  const handleBack = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
      setAnswerIndices(answerIndices.slice(0, -1));
    }
  }, [currentQuestion, answers, answerIndices]);

  const handleAnswer = useCallback(
    (answer: AnswerOption) => {
      const question = questions[currentQuestion];
      const answerIndex = question.answers.findIndex((a) => a.text === answer.text);
      if (answerIndex < 0) return;

      const newAnswers = [...answers, answer];
      const newIndices = [...answerIndices, answerIndex];
      setAnswers(newAnswers);
      setAnswerIndices(newIndices);
      trackEvent(`assessment_question_${currentQuestion + 1}`, {
        question_id: question.id,
      });

      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        const result = calculateScores(newAnswers);
        setResultSlug(result.archetypeSlug);
        setResultScores({
          clarity: result.clarity,
          readiness: result.readiness,
          urgency: result.urgency,
          individualSignals: result.individualSignals,
        });
        setPhase('email');
      }
    },
    [answers, answerIndices, currentQuestion],
  );

  const navigateToResult = useCallback(() => {
    if (!resultSlug || !resultScores) return;
    setPhase('redirecting');
    trackConversion('assessment_complete', undefined);

    saveAssessmentResult({
      archetypeSlug: resultSlug,
      scores: resultScores,
    });

    const query = buildResultQueryParams(resultScores);
    router.push(`/assessment/result/${resultSlug}?${query}`);
  }, [resultSlug, resultScores, router]);

  if (phase === 'landing') {
    return (
      <section className="min-h-[100dvh] flex items-center justify-center bg-cloud py-20">
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
            <Button
              size="lg"
              className="font-bold text-base px-8 min-h-[48px]"
              onClick={handleStart}
            >
              See My AI Readiness
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </BlurFade>

          <BlurFade inView delay={0.5}>
            <p className="mt-4 text-xs text-muted-foreground font-mono">
              Free. No credit card. Email used only to send your results.
            </p>
          </BlurFade>
          <BlurFade inView delay={0.6}>
            <p className="mt-2 text-xs text-muted-foreground/60 font-mono">
              No signup required to see results.
            </p>
          </BlurFade>
        </div>
      </section>
    );
  }

  if (phase === 'quiz') {
    return (
      <section className="min-h-[100dvh] flex flex-col items-center justify-center bg-cloud py-20">
        <div className="container mx-auto px-4 md:px-6 w-full">
          <QuizProgress current={currentQuestion + 1} total={questions.length} />
          <QuizQuestion
            question={questions[currentQuestion]}
            onAnswer={handleAnswer}
            questionIndex={currentQuestion}
            onBack={handleBack}
            isFirstQuestion={currentQuestion === 0}
          />
        </div>
      </section>
    );
  }

  if (phase === 'email') {
    return (
      <section className="min-h-[100dvh] flex items-center justify-center bg-cloud py-20">
        <div className="container mx-auto px-4 md:px-6">
          <EmailCapture
            onComplete={navigateToResult}
            onSkip={navigateToResult}
            answerIndices={answerIndices}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[100dvh] flex items-center justify-center bg-cloud">
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
