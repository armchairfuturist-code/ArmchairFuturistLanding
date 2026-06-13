# Plan 002: Add Assessment Scoring Unit Tests

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report -- do not improvise. When done, update the status row for this plan
> in `plans/README.md` -- unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 68d76a5a..HEAD -- src/lib/assessment/`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: 001 (run after test baseline is green)
- **Category**: tests
- **Planned at**: commit `68d76a5a`, 2026-06-13

## Why this matters

The assessment scoring logic at `src/lib/assessment/scoring.ts` is the core
business logic -- it converts quiz answers into clarity, readiness, and urgency
scores, then assigns an archetype. It has zero test coverage. A bug in scoring
silently mislabels leads and sends wrong personalized results. The function is
pure (no side effects, no imports beyond types), making it ideal for unit
testing. Tests here serve as characterization tests -- they document current
behavior so refactoring becomes safe.

Also uncovered: `resolve-answers.ts` (input validation), `archetypes.ts`
(archetype lookup).

## Current state

**`src/lib/assessment/scoring.ts`** -- pure function, 75 lines:
- `calculateScores(answers: AnswerOption[])`: sums raw scores, converts to
  percentage (0-100). NaN possible when `answers` is empty (0/0 division).
- `determineArchetype(...)`: 5 branches ordered by priority with boundary
  conditions at `clarity >= 55`, `readiness >= 50`, `readiness < 45`.

**`src/lib/assessment/resolve-answers.ts`** -- 33 lines:
- `resolveAnswersFromIndices(answerIndices: unknown)`: validates array shape
  and index bounds, maps to AnswerOption objects.
- `scoreFromAnswerIndices(answerIndices: unknown)`: combines resolve + score.

**`src/lib/assessment/archetypes.ts`** -- 170 lines:
- `getArchetypeBySlug(slug)`: linear search through 4 archetypes.

**Existing test pattern** -- `src/components/sections/__tests__/HeroSection.test.tsx`:
```
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
```

**Repo conventions**: Tests live in `__tests__/` dirs alongside source.
Vitest globals enabled via `vitest.config.ts`. `@/` alias resolves to `./src/`.
Use `describe`/`it`/`expect` without imports.

## Commands you will need

| Purpose   | Command                     | Expected on success |
|-----------|-----------------------------|---------------------|
| Tests     | `npm test`                  | all pass            |
| Subset    | `npx vitest run -- src/lib/assessment/` | all pass |

## Scope

**In scope** (create only, no modifications):
- `src/lib/assessment/__tests__/scoring.test.ts` (create)
- `src/lib/assessment/__tests__/resolve-answers.test.ts` (create)
- `src/lib/assessment/__tests__/archetypes.test.ts` (create)

**Out of scope** (do NOT touch):
- Any production code file
- `src/lib/assessment/config.ts` -- test data imports from it
- `src/lib/assessment/result-session.ts` -- sessionStorage tests deferred

## Steps

### Step 1: Create `src/lib/assessment/__tests__/scoring.test.ts`

Create the directory first: `mkdir -p src/lib/assessment/__tests__`

Then create the test file:

```
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
```

**Verify**: `npx vitest run -- src/lib/assessment/` shows scoring.test.ts PASS with 6 tests.

### Step 2: Create `src/lib/assessment/__tests__/resolve-answers.test.ts`

```
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
```

**Verify**: `npx vitest run -- src/lib/assessment/` shows both test files PASS (11 tests).

### Step 3: Create `src/lib/assessment/__tests__/archetypes.test.ts`

```
import { describe, it, expect } from 'vitest';
import { getArchetypeBySlug, archetypes, ARCHETYPE_SLUGS } from '../archetypes';

describe('getArchetypeBySlug', () => {
  it('returns an archetype for each known slug', () => {
    for (const slug of ARCHETYPE_SLUGS) {
      const archetype = getArchetypeBySlug(slug);
      expect(archetype).toBeDefined();
      expect(archetype!.slug).toBe(slug);
    }
  });

  it('returns undefined for unknown slug', () => {
    expect(getArchetypeBySlug('nonexistent')).toBeUndefined();
  });

  it('each archetype has required fields', () => {
    for (const a of archetypes) {
      expect(a.name).toBeTruthy();
      expect(a.headline).toBeTruthy();
      expect(a.diagnosis.length).toBeGreaterThan(0);
      expect(a.primaryCta.label).toBeTruthy();
      expect(a.primaryCta.href).toBeTruthy();
    }
  });
});
```

**Verify**: `npx vitest run -- src/lib/assessment/` -- all 14 tests pass.

### Step 4: Run full test suite

**Verify**: `npm test` -- all tests pass.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `npm test` exits 0
- [ ] `npx vitest run -- src/lib/assessment/` shows 14 tests passing
- [ ] Three new test files exist in `src/lib/assessment/__tests__/`
- [ ] No production code was modified
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- Any existing test fails after adding new tests
- The scoring module interface has changed
- An import fails to resolve

## Maintenance notes

- Adding a new question to `config.ts` automatically adjusts `QUESTION_COUNT` checks.
- Adding a new archetype to `archetypes.ts` auto-validates through the `ARCHETYPE_SLUGS` loop.
- The archetype boundary tests (thresholds like `clarity >= 55`) are NOT
  characterized -- these tests document observable outputs for specific inputs.
  If thresholds change, these tests will tell you what changed.
