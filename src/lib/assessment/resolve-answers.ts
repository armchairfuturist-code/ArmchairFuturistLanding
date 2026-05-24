import { questions, type AnswerOption } from './config';
import { calculateScores, type ScoreResult } from './scoring';

const QUESTION_COUNT = questions.length;

/**
 * Resolve client-submitted answer indices into scored answers.
 * Throws if shape or indices are invalid.
 */
export function resolveAnswersFromIndices(answerIndices: unknown): AnswerOption[] {
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
      throw new Error(`Answer index out of range for question ${questionIndex + 1}.`);
    }
    return answers[index];
  });
}

export function scoreFromAnswerIndices(answerIndices: unknown): ScoreResult {
  const answers = resolveAnswersFromIndices(answerIndices);
  return calculateScores(answers);
}

export { QUESTION_COUNT };
