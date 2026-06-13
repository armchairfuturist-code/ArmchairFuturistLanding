# Plan 001: Fix Stale Tests and Answer Identity Bug

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 68d76a5a..HEAD -- src/app/assessment/page.tsx src/app/assessment/__tests__/ src/components/assessment/`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug + tests
- **Planned at**: commit `68d76a5a`, 2026-06-13

## Why this matters

Two of the 8 existing tests are failing, which means the project has no reliable
test signal. The root cause is that the `QuizQuestion` mock creates synthetic
`AnswerOption` objects, but the production `handleAnswer` callback at
`src/app/assessment/page.tsx:52` uses `question.answers.indexOf(answer)` --
a reference-identity check that fails when the mock passes freshly-allocated
objects. Fixing both the test mock (to use actual array references) and the
production code (to use index-based lookup, which the server-side
`resolve-answers.ts` already uses) restores the passing test baseline and
eliminates a latent production bug.

## Current state

**Failing tests** -- `src/app/assessment/__tests__/AssessmentPage.test.tsx`:

- Test "allows answering quiz questions" -- the mock `QuizQuestion` at lines 27-36
  calls `onAnswer({ text: 'Yes', scores: { clarity: 0, readiness: 0, urgency: 0 } })`.
  This is a new object, so `indexOf` at `page.tsx:52` returns `-1` and the handler
  returns early (line 53: `if (answerIndex < 0) return;`).
- Test "validates email input before proceeding" -- because questions never advance
  (same root cause), the page never reaches the `email` phase, so `email-input`
  testid is never rendered.

**Production code** -- `src/app/assessment/page.tsx:49-53`:
```
const handleAnswer = useCallback(
  (answer: AnswerOption) => {
    const question = questions[currentQuestion];
    const answerIndex = question.answers.indexOf(answer);
    if (answerIndex < 0) return;
```

**Mock QuizQuestion** -- `src/app/assessment/__tests__/AssessmentPage.test.tsx:27-36`:
```
vi.mock('@/components/assessment/QuizQuestion', () => ({
  default: ({ question, onAnswer, questionIndex }: any) => (
    <div data-testid="quiz-question">
      <h3>{question.text}</h3>
      <button onClick={() => onAnswer({ text: 'Yes', scores: { clarity: 0, readiness: 0, urgency: 0 } })}>
        Yes
      </button>
    </div>
  ),
}));
```

**Repo conventions**: Tests use `@testing-library/react` with `fireEvent` and
`waitFor` -- see `src/components/sections/__tests__/HeroSection.test.tsx` for
a passing test pattern. This project uses `vitest` with `vi.mock()` for module
mocks. Components use `'use client'` directives.

## Commands you will need

| Purpose   | Command                  | Expected on success |
|-----------|--------------------------|---------------------|
| Install   | `npm install`            | exit 0              |
| Typecheck | `npm run lint`           | exit 0, no errors   |
| Tests     | `npm test`               | all pass            |

## Scope

**In scope** (the only files you should modify):
- `src/app/assessment/__tests__/AssessmentPage.test.tsx`
- `src/app/assessment/page.tsx`

**Out of scope** (do NOT touch, even though they look related):
- Other test files (`src/components/sections/__tests__/HeroSection.test.tsx`)
- Other assessment components (`QuizQuestion.tsx`, `QuizProgress.tsx`, `EmailCapture.tsx`)
- Any file outside the two listed above

## Steps

### Step 1: Fix the quiz question mock to use real AnswerOption references

Replace the synthetic mock object with a reference to the actual
`questions[0].answers[0]` object from the config module.

In `src/app/assessment/__tests__/AssessmentPage.test.tsx`, change the
`QuizQuestion` mock (around line 27-36):

Change: In the `button`'s `onClick`, pass the first real answer from the
question object instead of a synthetic object.

```
vi.mock('@/components/assessment/QuizQuestion', () => ({
  default: ({ question, onAnswer, questionIndex }: any) => (
    <div data-testid="quiz-question">
      <h3>{question.text}</h3>
      <button onClick={() => onAnswer(question.answers[0])}>
        Yes
      </button>
    </div>
  ),
}));
```

The difference: `question.answers[0]` is the actual `AnswerOption` object from
the config module -- `indexOf` will find it by reference identity.

**Verify**: `npx vitest run -- src/app/assessment/__tests__/AssessmentPage.test.tsx`

### Step 2: Fix the production code to use index-based lookup (defense in depth)

In `src/app/assessment/page.tsx` lines 49-53, replace the `indexOf`
reference-identity check with an index-based lookup that matches the
server-side pattern in `src/lib/assessment/resolve-answers.ts:15-16`.

Replace lines 49-53:
```
const handleAnswer = useCallback(
  (answer: AnswerOption) => {
    const question = questions[currentQuestion];
    const answerIndex = question.answers.findIndex((a) => a.text === answer.text);
    if (answerIndex < 0) return;
```

This uses `findIndex` with a `text` comparison -- the text field is unique
within each question, so there's no identity dependency.

**Verify**: `npm run lint` -- exit 0, no errors.

### Step 3: Run full test suite

**Verify**: `npm test` -- all tests pass.

## Test plan

- No new tests needed -- this plan repairs existing tests.
- The existing AssessmentPage tests now verify the full quiz flow end-to-end
  within the test harness, including the transition to the email phase.
- The `findIndex` change is regression-proofed by the same tests.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `npm test` -- all tests pass
- [ ] `npm run lint` -- exit 0, no errors
- [ ] `grep -rn "indexOf" src/app/assessment/page.tsx` returns no matches
- [ ] No files outside the in-scope list are modified (`git diff --stat` lists only 2 files)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The code at the locations in "Current state" doesn't match the excerpts
  (the codebase has drifted since this plan was written).
- A step's verification fails twice after a reasonable fix attempt.
- The fix appears to require touching an out-of-scope file.
- You discover that more than 2 tests were failing when you started.

## Maintenance notes

- If `AnswerOption` grows an `id` field in the future, switch `findIndex`
  comparison from `.text` to `.id` for a more stable lookup.
- The mock QuizQuestion using `question.answers[0]` will break if the test
  needs to verify different answer values -- at that point, the mock should
  expose a controllable answer, or the test should render the real component.
