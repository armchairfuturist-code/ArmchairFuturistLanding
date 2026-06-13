import { describe, it, expect } from 'vitest';
import { calculateScores } from '../scoring';
import { questions } from '../config';

describe('calculateScores', () => {
  it('returns 0-100 percentages for a full answer set', () => {
    const answers = questions.map((q) => q.answers[0]);
    const result = calculateScores(answers);
    expect(result.clarity).toBeGreaterThanOrEqual(0);
    expect(result.clarity).toBeLessThanOrEqual(100);
    expect(typeof result.archetypeSlug).toBe('string');
  });

  it('handles all-minimum answers', () => {
    const answers = questions.map((q) => q.answers[q.answers.length - 1]);
    expect(() => calculateScores(answers)).not.toThrow();
    const result = calculateScores(answers);
    expect(result.clarity).toBeGreaterThanOrEqual(0);
    expect(result.readiness).toBeGreaterThanOrEqual(0);
    expect(result.urgency).toBeGreaterThanOrEqual(0);
  });

  it('computes individualSignals count', () => {
    const answers = questions.map((q) => q.answers[0]);
    const result = calculateScores(answers);
    expect(result.individualSignals).toBeTypeOf('number');
    expect(result.individualSignals).toBeGreaterThanOrEqual(0);
  });

  it('produces consistent scores (no NaN)', () => {
    const answers = questions.map((q) => q.answers[0]);
    const result = calculateScores(answers);
    expect(result.clarity).not.toBeNaN();
    expect(result.readiness).not.toBeNaN();
    expect(result.urgency).not.toBeNaN();
  });

  it('rounds scores to integers', () => {
    const answers = questions.map((q) => q.answers[0]);
    const result = calculateScores(answers);
    expect(Number.isInteger(result.clarity)).toBe(true);
    expect(Number.isInteger(result.readiness)).toBe(true);
    expect(Number.isInteger(result.urgency)).toBe(true);
  });

  it('always returns one of the known archetype slugs', () => {
    const slugs = ['stalled-executive', 'curious-professional', 'ready-builder', 'overwhelmed-leader'];
    const answers = questions.map((q) => q.answers[0]);
    const result = calculateScores(answers);
    expect(slugs).toContain(result.archetypeSlug);
  });
});
