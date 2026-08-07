/**
 * Assessment Flow — deep domain module.
 *
 * Owns phase transitions, a single answer representation (option indices),
 * scoring derivation, and Result Session helpers. UI adapters stay thin.
 *
 * Phases: landing → quiz → email → redirecting (ADR-002 / glossary).
 */

import { questions } from "./config";
import { scoreFromAnswerIndices, type ScoreResult } from "./resolve-answers";
import {
  saveAssessmentResult,
  readAssessmentResult,
  buildResultQueryParams,
  type StoredAssessmentResult,
} from "./result-session";

export type AssessmentPhase = "landing" | "quiz" | "email" | "redirecting";

export interface AssessmentScores {
  clarity: number;
  readiness: number;
  urgency: number;
  individualSignals: number;
}

export interface AssessmentFlowState {
  phase: AssessmentPhase;
  currentQuestion: number;
  /** Source of truth — option indices only. */
  answerIndices: number[];
  resultSlug: string;
  resultScores: AssessmentScores | null;
}

export type AssessmentFlowEvent =
  | { type: "START" }
  | { type: "ANSWER"; optionIndex: number }
  | { type: "BACK" }
  | { type: "BEGIN_REDIRECT" };

export function createInitialAssessmentState(): AssessmentFlowState {
  return {
    phase: "landing",
    currentQuestion: 0,
    answerIndices: [],
    resultSlug: "",
    resultScores: null,
  };
}

export function totalQuestions(): number {
  return questions.length;
}

export function scoresFromResult(result: ScoreResult): AssessmentScores {
  return {
    clarity: result.clarity,
    readiness: result.readiness,
    urgency: result.urgency,
    individualSignals: result.individualSignals,
  };
}

export function reduceAssessmentFlow(
  state: AssessmentFlowState,
  event: AssessmentFlowEvent,
): AssessmentFlowState {
  switch (event.type) {
    case "START":
      return {
        ...createInitialAssessmentState(),
        phase: "quiz",
      };

    case "BACK": {
      if (state.phase !== "quiz" || state.currentQuestion === 0) return state;
      return {
        ...state,
        currentQuestion: state.currentQuestion - 1,
        answerIndices: state.answerIndices.slice(0, -1),
      };
    }

    case "ANSWER": {
      if (state.phase !== "quiz") return state;

      const question = questions[state.currentQuestion];
      if (!question) return state;

      const optionIndex = event.optionIndex;
      if (
        !Number.isInteger(optionIndex) ||
        optionIndex < 0 ||
        optionIndex >= question.answers.length
      ) {
        return state;
      }

      const nextIndices = [...state.answerIndices, optionIndex];
      const isLast = state.currentQuestion >= questions.length - 1;

      if (!isLast) {
        return {
          ...state,
          answerIndices: nextIndices,
          currentQuestion: state.currentQuestion + 1,
        };
      }

      const result = scoreFromAnswerIndices(nextIndices);
      return {
        ...state,
        answerIndices: nextIndices,
        resultSlug: result.archetypeSlug,
        resultScores: scoresFromResult(result),
        phase: "email",
      };
    }

    case "BEGIN_REDIRECT": {
      if (!state.resultSlug || !state.resultScores) return state;
      return { ...state, phase: "redirecting" };
    }

    default:
      return state;
  }
}

/** Clamp a raw score into the 0–100 display range. */
export function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function parseScoreParam(
  raw: string | null | undefined,
  fallback: number,
): number {
  if (raw == null || raw === "") return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n)) return fallback;
  return clampScore(n);
}

/**
 * Build ScoreResult for the result route from URL params + optional session.
 * Session wins when present (matches prior result-route behavior).
 */
export function resolveResultScores(input: {
  slug: string;
  searchParams: { get(name: string): string | null };
  stored?: StoredAssessmentResult | null;
}): ScoreResult {
  const { slug, searchParams, stored = null } = input;

  if (stored) {
    return {
      clarity: stored.scores.clarity,
      readiness: stored.scores.readiness,
      urgency: stored.scores.urgency,
      individualSignals: stored.scores.individualSignals ?? 0,
      archetypeSlug: stored.archetypeSlug,
    };
  }

  return {
    clarity: parseScoreParam(searchParams.get("c"), 50),
    readiness: parseScoreParam(searchParams.get("r"), 50),
    urgency: parseScoreParam(searchParams.get("u"), 50),
    individualSignals: parseScoreParam(searchParams.get("i"), 0),
    archetypeSlug: slug,
  };
}

export function buildResultPath(
  slug: string,
  scores: AssessmentScores,
): string {
  return `/assessment/result/${slug}?${buildResultQueryParams(scores)}`;
}

/** Persist completed flow result (side-effect helper for adapters). */
export function persistFlowResult(state: AssessmentFlowState): void {
  if (!state.resultSlug || !state.resultScores) return;
  saveAssessmentResult({
    archetypeSlug: state.resultSlug,
    scores: state.resultScores,
  });
}

export function loadStoredFlowResult(): StoredAssessmentResult | null {
  return readAssessmentResult();
}

export type { StoredAssessmentResult, ScoreResult };
