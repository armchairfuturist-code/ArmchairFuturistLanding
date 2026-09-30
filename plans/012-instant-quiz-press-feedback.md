# 012 — Give quiz answer press feedback an instant, undelayed trigger

- **Status**: DONE
- **Commit**: 37f73da
- **Severity**: HIGH
- **Category**: Physicality & origin
- **Estimated scope**: 1 file, ~3 lines

## Problem

Press feedback on the quiz answer buttons is delayed by the entrance stagger and runs twice
as long as the press budget allows.

```tsx
// src/components/assessment/QuizQuestion.tsx:65-72 — current
<motion.button
  key={idx}
  onClick={() => onAnswer(idx)}
  className="w-full text-left p-4 md:p-5 rounded-hp-md border border-hairline-strong bg-canvas hover:border-hp-electric/40 hover:bg-hp-electric/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hp-electric/40 transition-[background-color,border-color] duration-150 cursor-pointer group"
  whileTap={{ scale: 0.96 }}
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: idx * 0.06 }}
>
```

A `transition` prop in Framer Motion is the **default transition for every animation on that
element** — including `whileTap`, not just the entrance. So the press scale inherits both
`duration: 0.3` and `delay: idx * 0.06`. For the fourth answer (`idx === 3`) the press
feedback waits **180ms** before it starts and then takes 300ms to complete. The press budget
is 100-160ms and it must feel instant.

## Target

Move press feedback to CSS so it cannot be delayed, and scope the JS transition to the
entrance only. CSS `:active` fires on pointer-down with no delay path:

```tsx
// target
<motion.button
  key={idx}
  onClick={() => onAnswer(idx)}
  className="w-full text-left p-4 md:p-5 rounded-hp-md border border-hairline-strong bg-canvas hover:border-hp-electric/40 hover:bg-hp-electric/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hp-electric/40 transition-[background-color,border-color,transform] duration-150 active:scale-[0.96] cursor-pointer group"
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: idx * 0.06, ease: EASE_OUT }}
>
```

Three changes: add `transform` to the CSS transition list, add `active:scale-[0.96]`, delete
the `whileTap` prop. The entrance keeps its stagger.

## Repo conventions to follow

`src/components/ui/button.tsx:8` is the exemplar for press feedback in this codebase:

```
transition-[background-color,color,box-shadow,transform] duration-150 ... active:not-disabled:scale-[0.96]
```

Press feedback is CSS `:active` with `transform` in the transition list at `duration-150`.
Match that exactly. `transform` MUST be in the transition-property list or the scale will
snap rather than ease.

`EASE_OUT` is imported from `@/lib/easing` in this file already (line 3, added for the
`word-pull-up`-style token swap) — verify it is still imported before using it.

## Steps

1. In `src/components/assessment/QuizQuestion.tsx`, replace `transition-[background-color,border-color] duration-150`
   with `transition-[background-color,border-color,transform] duration-150 active:scale-[0.96]`
   inside the `className` string on line 69.
2. Delete the `whileTap={{ scale: 0.96 }}` line (line 69).
3. Add `ease: EASE_OUT` to the `transition` object on line 72, so the entrance uses the
   shared token rather than Framer Motion's default `cubic-bezier(0.25, 0.1, 0.25, 1)`.
4. If `EASE_OUT` is not imported at the top of the file, add
   `import { EASE_OUT } from "@/lib/easing";` after the `motion/react` import.

## Boundaries

- Do NOT change the entrance values: `initial={{ opacity: 0, y: 12 }}`,
  `animate={{ opacity: 1, y: 0 }}`, `duration: 0.3`, `delay: idx * 0.06`. The stagger is
  intentional and the answers must not all appear at once.
- Do NOT change `src/components/sections/ROICalculatorSection.tsx:88` — its `whileTap` has
  no `transition` prop, so it is already instant. That is a separate, lower-severity finding.
- Do NOT change markup or the answer list structure.
- Do NOT add new dependencies.
- If the code at lines 65-72 does not match this plan, STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` (no output), `npx vitest run` (159 tests / 29 files
  pass), `npm run build` ("Compiled successfully").
- **Feel check**: run the assessment (`/assessment`), and on a question with four answers,
  press the **fourth** answer and confirm:
  - the press scale begins the instant the pointer goes down — there is no perceptible
    lag before the card shrinks
  - the scale completes in roughly 150ms
  - answers still fade+rise in one after another, not all at once
  - in the DevTools Animations panel, pressing the fourth answer mid-entrance-stagger does
    not restart the entrance animation
- **Done when**: pressing any answer index feels identical, with no index-dependent delay.
