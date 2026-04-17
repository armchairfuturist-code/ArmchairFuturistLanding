import type { AnswerOption } from './config';

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

  const archetypeSlug = determineArchetype(clarity, readiness, urgency, individualSignals);

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
    if (readiness >= 50 && clarity >= 50) return 'ready-builder';
    return 'curious-professional';
  }

  // High clarity + high urgency + low readiness = overwhelmed leader
  if (clarity >= 55 && urgency >= 55 && readiness < 45) {
    return 'overwhelmed-leader';
  }

  // High urgency + low clarity + low readiness = stalled executive
  if (urgency >= 50 && clarity < 50 && readiness < 45) {
    return 'stalled-executive';
  }

  // High clarity + high readiness = ready builder
  if (clarity >= 50 && readiness >= 50) {
    return 'ready-builder';
  }

  // Default: curious professional (most common)
  return 'curious-professional';
}
