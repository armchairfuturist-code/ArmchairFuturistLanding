/**
 * Assessment Flow — deep domain module.
 *
 * Single seam for answer representation, scoring, session precedence, and
 * canonicalization. The module owns the phase machine interface; React
 * adapters stay thin and leverage this root instead of satellite modules.
 *
 * Locality: quiz draft + result session + answer resolution + scoring live
 * here. The former satellite files re-export from this root.
 *
 * Phases: landing → quiz → email → redirecting (ADR-002 / glossary).
 */

import { questions, type AnswerOption } from "./config";

// ---------------------------------------------------------------------------
// Scoring seam (canonical; scoring.ts re-exports this root)
// ---------------------------------------------------------------------------

export interface ScoreResult {
  clarity: number;
  readiness: number;
  urgency: number;
  individualSignals: number;
  archetypeSlug: string;
}

const MAX_SCORE_PER_QUESTION = 3;

/**
 * Calculate assessment scores from selected answers.
 * Returns normalized percentages (0-100) for each dimension
 * and determines the matching archetype.
 */
export function calculateScores(answers: AnswerOption[]): ScoreResult {
  const totalQuestions = answers.length;
  const maxPossible = totalQuestions * MAX_SCORE_PER_QUESTION;

  let rawClarity = 0;
  let rawReadiness = 0;
  let rawUrgency = 0;
  let individualSignals = 0;

  for (const answer of answers) {
    rawClarity += answer.scores.clarity;
    rawReadiness += answer.scores.readiness;
    rawUrgency += answer.scores.urgency;
    if (answer.individual) individualSignals++;
  }

  const clarity = Math.round((rawClarity / maxPossible) * 100);
  const readiness = Math.round((rawReadiness / maxPossible) * 100);
  const urgency = Math.round((rawUrgency / maxPossible) * 100);

  const archetypeSlug = determineArchetype(
    clarity,
    readiness,
    urgency,
    individualSignals,
  );

  return { clarity, readiness, urgency, individualSignals, archetypeSlug };
}

function determineArchetype(
  clarity: number,
  readiness: number,
  urgency: number,
  individualSignals: number,
): string {
  // Individual-heavy respondents who want personal development
  // tend toward curious-professional or ready-builder
  const isIndividual = individualSignals >= 4;

  if (isIndividual) {
    if (readiness >= 50 && clarity >= 50) return "ready-builder";
    return "curious-professional";
  }

  // High clarity + high urgency + low readiness = overwhelmed leader
  if (clarity >= 55 && urgency >= 55 && readiness < 45) {
    return "overwhelmed-leader";
  }

  // High urgency + low clarity + low readiness = stalled executive
  if (urgency >= 50 && clarity < 50 && readiness < 45) {
    return "stalled-executive";
  }

  // High clarity + high readiness = ready builder
  if (clarity >= 50 && readiness >= 50) {
    return "ready-builder";
  }

  // Default: curious professional (most common)
  return "curious-professional";
}

// ---------------------------------------------------------------------------
// Answer representation seam (canonical; resolve-answers.ts re-exports root)
// Source of truth: zero-based option indices.
// ---------------------------------------------------------------------------

export const QUESTION_COUNT = questions.length;

/**
 * Resolve client-submitted answer indices into scored answers.
 * Throws if shape or indices are invalid.
 */
export function resolveAnswersFromIndices(
  answerIndices: unknown,
): AnswerOption[] {
  if (!Array.isArray(answerIndices) || answerIndices.length !== QUESTION_COUNT) {
    throw new Error(`Expected ${QUESTION_COUNT} answer indices.`);
  }

  return answerIndices.map((rawIndex, questionIndex) => {
    const index = Number(rawIndex);
    if (!Number.isInteger(index)) {
      throw new Error(`Invalid answer index for question ${questionIndex + 1}.`);
    }
    const answers = questions[questionIndex].answers;
    if (index < 0 || index >= answers.length) {
      throw new Error(
        `Answer index out of range for question ${questionIndex + 1}.`,
      );
    }
    return answers[index];
  });
}

export function scoreFromAnswerIndices(answerIndices: unknown): ScoreResult {
  const answers = resolveAnswersFromIndices(answerIndices);
  return calculateScores(answers);
}

// ---------------------------------------------------------------------------
// Quiz session seam (canonical; quiz-session.ts re-exports this root)
// sessionStorage draft for an in-progress assessment quiz.
// ---------------------------------------------------------------------------

export const ASSESSMENT_QUIZ_DRAFT_KEY = "assessment_quiz_draft_v1";

export interface QuizDraft {
  currentQuestion: number;
  answerIndices: number[];
}

/** True when the draft matches the live question config. */
export function isValidQuizDraft(draft: unknown): draft is QuizDraft {
  if (typeof draft !== "object" || draft === null) return false;
  const d = draft as QuizDraft;
  if (!Number.isInteger(d.currentQuestion)) return false;
  if (d.currentQuestion < 0 || d.currentQuestion >= questions.length)
    return false;
  if (!Array.isArray(d.answerIndices)) return false;
  if (d.answerIndices.length !== d.currentQuestion) return false;
  return d.answerIndices.every((index, i) => {
    if (!Number.isInteger(index)) return false;
    const question = questions[i];
    return Boolean(question) && index >= 0 && index < question.answers.length;
  });
}

export function saveQuizDraft(draft: QuizDraft): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(ASSESSMENT_QUIZ_DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // sessionStorage unavailable (private mode, quota) — quiz still works.
  }
}

export function readQuizDraft(): QuizDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(ASSESSMENT_QUIZ_DRAFT_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isValidQuizDraft(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function clearQuizDraft(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(ASSESSMENT_QUIZ_DRAFT_KEY);
  } catch {
    // ignore — nothing to clean up.
  }
}

// ---------------------------------------------------------------------------
// Result session seam (canonical; result-session.ts re-exports this root)
// sessionStorage payload written after completing the assessment quiz.
// ---------------------------------------------------------------------------

export const ASSESSMENT_RESULT_STORAGE_KEY = "assessment_result_v1";

export interface StoredAssessmentResult {
  archetypeSlug: string;
  scores: {
    clarity: number;
    readiness: number;
    urgency: number;
    individualSignals: number;
  };
}

export function saveAssessmentResult(result: StoredAssessmentResult): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(
      ASSESSMENT_RESULT_STORAGE_KEY,
      JSON.stringify(result),
    );
  } catch {
    // sessionStorage unavailable (private mode quota, etc.)
  }
}

export function readAssessmentResult(): StoredAssessmentResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(ASSESSMENT_RESULT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredAssessmentResult;
    if (
      typeof parsed.archetypeSlug !== "string" ||
      typeof parsed.scores?.clarity !== "number" ||
      typeof parsed.scores?.readiness !== "number" ||
      typeof parsed.scores?.urgency !== "number"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function buildResultQueryParams(scores: {
  clarity: number;
  readiness: number;
  urgency: number;
  individualSignals: number;
}): string {
  return new URLSearchParams({
    c: String(scores.clarity),
    r: String(scores.readiness),
    u: String(scores.urgency),
    i: String(scores.individualSignals),
  }).toString();
}

// ---------------------------------------------------------------------------
// Phase machine (ADR-002 — unchanged)
// ---------------------------------------------------------------------------

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
  | { type: "START"; resume?: QuizDraft }
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
    case "START": {
      const base = createInitialAssessmentState();
      // Resume a saved mid-quiz draft when it matches the live question set.
      if (event.resume && isValidQuizDraft(event.resume)) {
        return {
          ...base,
          phase: "quiz",
          currentQuestion: event.resume.currentQuestion,
          answerIndices: event.resume.answerIndices,
        };
      }
      return { ...base, phase: "quiz" };
    }

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
 * Single statement of the session-wins rule: stored slug beats the URL slug.
 * resolveResultScores delegates here so precedence lives in one place.
 */
export function resolveResultSlug(input: {
  slug: string;
  stored?: StoredAssessmentResult | null;
}): string {
  return input.stored?.archetypeSlug ?? input.slug;
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
      archetypeSlug: resolveResultSlug({ slug, stored }),
    };
  }

  return {
    clarity: parseScoreParam(searchParams.get("c"), 50),
    readiness: parseScoreParam(searchParams.get("r"), 50),
    urgency: parseScoreParam(searchParams.get("u"), 50),
    individualSignals: parseScoreParam(searchParams.get("i"), 0),
    archetypeSlug: resolveResultSlug({ slug, stored }),
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
