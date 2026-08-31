"use client";

import { ArrowRight, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { motion } from "motion/react";
import QuizProgress from "@/components/assessment/QuizProgress";
import QuizQuestion from "@/components/assessment/QuizQuestion";
import EmailCapture from "@/components/assessment/EmailCapture";
import { useAssessmentFlow } from "@/lib/hooks/useAssessmentFlow";

/**
 * Thin adapter over the Assessment Flow module.
 * Presentation only — phase/answers/scoring live in useAssessmentFlow.
 */
export default function AssessmentPage() {
  const flow = useAssessmentFlow();

  if (flow.phase === "landing") {
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
              10 honest questions. 3 minutes. A personalized diagnosis of where
              you stand and what to do next.
            </p>
          </BlurFade>

          <BlurFade inView delay={0.35}>
            <p className="text-sm text-muted-foreground font-sans mb-8 max-w-lg mx-auto">
              No trick questions, no sales pitch baked into the scoring. Just a
              clear read on your AI clarity, readiness, and urgency, with a
              recommendation that matches where you actually are.
            </p>
          </BlurFade>

          <BlurFade inView delay={0.4}>
            <Button
              size="lg"
              className="font-bold text-base px-8 min-h-[48px]"
              onClick={flow.start}
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

  if (flow.phase === "quiz" && flow.currentQuestionData) {
    return (
      <section className="min-h-[100dvh] flex flex-col items-center justify-center bg-cloud py-20">
        <div className="container mx-auto px-4 md:px-6 w-full">
          <QuizProgress
            current={flow.currentQuestion + 1}
            total={flow.totalQuestions}
          />
          <QuizQuestion
            question={flow.currentQuestionData}
            onAnswer={flow.answer}
            questionIndex={flow.currentQuestion}
            onBack={flow.back}
            isFirstQuestion={flow.currentQuestion === 0}
          />
        </div>
      </section>
    );
  }

  if (flow.phase === "email") {
    return (
      <section className="min-h-[100dvh] flex items-center justify-center bg-cloud py-20">
        <div className="container mx-auto px-4 md:px-6">
          <EmailCapture
            onComplete={flow.finishAndRedirect}
            onSkip={flow.finishAndRedirect}
            answerIndices={flow.answerIndices}
          />
        </div>
      </section>
    );
  }

  // redirecting
  return (
    <section className="min-h-[100dvh] flex items-center justify-center bg-cloud">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <p className="text-muted-foreground font-sans">
          Loading your results...
        </p>
      </motion.div>
    </section>
  );
}
