/**
 * sessionStorage draft for an in-progress assessment quiz.
 * A refresh mid-quiz restores the visitor to their current question
 * instead of erasing their answers.
 */
import { questions } from "./config";

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
  if (d.currentQuestion < 0 || d.currentQuestion >= questions.length) return false;
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
