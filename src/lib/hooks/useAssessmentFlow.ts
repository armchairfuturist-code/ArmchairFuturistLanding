"use client";

import { useCallback, useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import { questions, type AnswerOption } from "@/lib/assessment/config";
import {
  buildResultPath,
  createInitialAssessmentState,
  persistFlowResult,
  reduceAssessmentFlow,
  totalQuestions,
  type AssessmentFlowState,
} from "@/lib/assessment/flow";
import {
  clearQuizDraft,
  readQuizDraft,
  saveQuizDraft,
} from "@/lib/assessment/quiz-session";
import { trackConversion, trackEvent } from "@/lib/analytics";

export interface UseAssessmentFlow extends AssessmentFlowState {
  totalQuestions: number;
  currentQuestionData: (typeof questions)[number] | null;
  start: () => void;
  /** Accept option index (preferred) or AnswerOption (legacy UI / tests). */
  answer: (option: number | AnswerOption) => void;
  back: () => void;
  finishAndRedirect: () => void;
}

/**
 * React adapter over the pure Assessment Flow module.
 * Side effects (analytics, session, navigation) live here — not in the reducer.
 */
export function useAssessmentFlow(): UseAssessmentFlow {
  const router = useRouter();
  const [state, dispatch] = useReducer(
    reduceAssessmentFlow,
    undefined,
    createInitialAssessmentState,
  );

  const start = useCallback(() => {
    // A saved draft resumes the visitor at their current question.
    const draft = readQuizDraft();
    if (draft) {
      trackEvent("assessment_start", { resumed: "true" });
      dispatch({ type: "START", resume: draft });
    } else {
      trackEvent("assessment_start");
      dispatch({ type: "START" });
    }
  }, []);

  const answer = useCallback(
    (option: number | AnswerOption) => {
      const question = questions[state.currentQuestion];
      if (!question) return;

      let optionIndex: number;
      if (typeof option === "number") {
        optionIndex = option;
      } else {
        optionIndex = question.answers.findIndex((a) => a.text === option.text);
      }
      if (optionIndex < 0) return;

      trackEvent(`assessment_question_${state.currentQuestion + 1}`, {
        question_id: question.id,
      });
      dispatch({ type: "ANSWER", optionIndex });
    },
    [state.currentQuestion],
  );

  const back = useCallback(() => {
    dispatch({ type: "BACK" });
  }, []);

  const finishAndRedirect = useCallback(() => {
    if (!state.resultSlug || !state.resultScores) return;

    dispatch({ type: "BEGIN_REDIRECT" });
    trackConversion("assessment_complete", undefined);
    persistFlowResult(state);
    router.push(buildResultPath(state.resultSlug, state.resultScores));
  }, [router, state]);

  // Mirror quiz progress to sessionStorage so a refresh never erases answers.
  // Completion clears the draft; the result session takes over.
  useEffect(() => {
    if (state.phase === "quiz") {
      saveQuizDraft({
        currentQuestion: state.currentQuestion,
        answerIndices: state.answerIndices,
      });
    } else if (state.phase === "email" || state.phase === "redirecting") {
      clearQuizDraft();
    }
  }, [state.phase, state.currentQuestion, state.answerIndices]);

  const total = totalQuestions();

  return {
    ...state,
    totalQuestions: total,
    currentQuestionData:
      state.phase === "quiz" ? (questions[state.currentQuestion] ?? null) : null,
    start,
    answer,
    back,
    finishAndRedirect,
  };
}
