/** sessionStorage payload written after completing the assessment quiz */
export const ASSESSMENT_RESULT_STORAGE_KEY = 'assessment_result_v1';

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
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(ASSESSMENT_RESULT_STORAGE_KEY, JSON.stringify(result));
  } catch {
    // sessionStorage unavailable (private mode quota, etc.)
  }
}

export function readAssessmentResult(): StoredAssessmentResult | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(ASSESSMENT_RESULT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredAssessmentResult;
    if (
      typeof parsed.archetypeSlug !== 'string' ||
      typeof parsed.scores?.clarity !== 'number' ||
      typeof parsed.scores?.readiness !== 'number' ||
      typeof parsed.scores?.urgency !== 'number'
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
