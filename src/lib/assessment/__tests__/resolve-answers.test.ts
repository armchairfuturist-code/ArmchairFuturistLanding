import { describe, it, expect } from 'vitest';
import { resolveAnswersFromIndices, scoreFromAnswerIndices, QUESTION_COUNT } from '../resolve-answers';

describe('resolveAnswersFromIndices', () => {
  it('resolves valid indices', () => {
    const indices = Array.from({ length: QUESTION_COUNT }, () => 0);
    const answers = resolveAnswersFromIndices(indices);
    expect(answers).toHaveLength(QUESTION_COUNT);
    expect(answers[0]).toHaveProperty('text');
  });

  it('throws on wrong-length array', () => {
    expect(() => resolveAnswersFromIndices([0, 1])).toThrow();
  });

  it('throws on non-array input', () => {
    expect(() => resolveAnswersFromIndices('not-array')).toThrow();
    expect(() => resolveAnswersFromIndices(null)).toThrow();
  });

  it('throws on non-integer index', () => {
    const indices = Array.from({ length: QUESTION_COUNT }, () => 'abc');
    expect(() => resolveAnswersFromIndices(indices)).toThrow();
  });

  it('throws on out-of-range index', () => {
    const indices = Array.from({ length: QUESTION_COUNT }, () => 999);
    expect(() => resolveAnswersFromIndices(indices)).toThrow();
  });
});

describe('scoreFromAnswerIndices', () => {
  it('returns a ScoreResult', () => {
    const indices = Array.from({ length: QUESTION_COUNT }, () => 0);
    const result = scoreFromAnswerIndices(indices);
    expect(result).toHaveProperty('clarity');
    expect(result).toHaveProperty('readiness');
    expect(result).toHaveProperty('urgency');
    expect(result).toHaveProperty('archetypeSlug');
  });
});
