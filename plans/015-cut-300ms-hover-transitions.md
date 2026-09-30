# 015 — Cut nav and footer hover transitions from 300ms to 150ms

- **Status**: DONE
- **Commit**: 37f73da
- **Severity**: MEDIUM
- **Category**: Purpose & frequency
- **Estimated scope**: 2 files, ~19 line edits

## Problem

Nineteen hover transitions across the two most-hovered surfaces on the site run at 300ms,
while the rest of the codebase uses 150ms for the same kind of interaction.

```tsx
// src/components/layout/Header.tsx:52 — current
className="text-sm font-[400] text-white/80 hover:text-hp-bright transition-colors duration-300 underline-animate"
```

```tsx
// src/components/layout/Footer.tsx:101 — current
className="inline-flex items-center gap-1.5 min-h-[44px] px-2 text-sm text-white/70 hover:text-hp-bright transition-colors duration-300 font-body"
```

Occurrences:

- `src/components/layout/Header.tsx` — lines 52, 63, 71 (3)
- `src/components/layout/Footer.tsx` — lines 26, 32, 38, 44, 50, 56, 101, 108, 117, 128, 137
  and 4 more (16 total)

These are hover colour changes. Per the frequency table, hover is a "tens of times/day"
interaction where the guidance is to **remove or drastically reduce** the motion. 300ms for
a text colour that a cursor is sweeping across is on the wrong end — the pointer is usually
on the next link before the first one finishes changing.

There is a second 300ms on the header nav specifically: the `underline-animate` utility's
own `::after` transition.

```css
/* src/app/globals.css:172 — current */
transition: transform 300ms var(--ease-out);
```

So a header nav link runs **two stacked 300ms transitions** — the colour and the underline.

## Target

All nineteen `transition-colors duration-300` become `transition-colors duration-150`, and the
`underline-animate` underline becomes 150ms.

```tsx
// target — Header.tsx:52
className="text-sm font-[400] text-white/80 hover:text-hp-bright transition-colors duration-150 underline-animate"
```

```css
/* target — globals.css:172 */
transition: transform 150ms var(--ease-out);
```

## Repo conventions to follow

- `duration-150` is already the established hover/press value in this codebase:
  - `src/components/ui/button.tsx:8` — `duration-150`
  - `src/components/ui/ScrollToTop.tsx:21` — `duration-150`
  - `src/components/assessment/QuizQuestion.tsx:69` — `duration-150`
  - `src/components/sections/FAQSection.tsx` accordion trigger — `duration-150`
- `src/app/globals.css` defines `--duration-press: 150ms` and `--duration-small: 200ms`
  in `:root`. For the `underline-animate` rule, prefer the existing
  `var(--duration-press)` token over a bare `150ms`, so the value has one home:

```css
transition: transform var(--duration-press) var(--ease-out);
```

## Steps

1. In `src/components/layout/Header.tsx`, replace every `duration-300` with `duration-150`
   (3 occurrences). Use a whole-file replace restricted to that file.
2. In `src/components/layout/Footer.tsx`, replace every `duration-300` with `duration-150`
   (16 occurrences). Same approach.
3. In `src/app/globals.css`, on the `.underline-animate::after` rule, change
   `transition: transform 300ms var(--ease-out);` to
   `transition: transform var(--duration-press) var(--ease-out);`.
4. Verify no other `duration-300` remains in either file. If one does, inspect it: a
   `duration-300` that is NOT a hover colour (for example an entrance or a deliberate
   longer move) is out of scope — leave it and report it.

## Boundaries

- Do NOT change any class other than the duration value. No colour, spacing, or structural
  edits.
- Do NOT touch `src/components/sections/*` — the `duration-300` instances there
  (`ServicesSection`, `SubstackSection`, `MentoringSection`) are on card hover/entrance
  transitions and are a separate, lower-leverage finding.
- Do NOT change `src/components/ui/sheet.tsx` or `SectionNavigator.tsx`; those are covered
  by plans 014 and the sheet duration work already committed.
- Do NOT change the `hoverOnlyWhenSupported` Tailwind gate.
- Do NOT add new dependencies.
- If `Header.tsx` or `Footer.tsx` no longer contains `duration-300`, STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` (no output), `npx vitest run` (159 tests / 29 files
  pass — `Header.test.tsx` asserts the desktop/mobile nav layout, so watch this one),
  `npm run build` ("Compiled successfully").
- **Feel check**: run the homepage and:
  - sweep the cursor across the header nav links — the colour and underline should read as
    one quick gesture, and should be finished before the cursor reaches the next link
  - confirm the underline still appears on keyboard focus (the `:focus-visible::after` rule
    is separate and must not regress)
  - hover footer links and confirm the same snappiness
  - at 10% playback in the DevTools Animations panel, confirm no transition on a nav link
    exceeds 150ms
  - toggle `prefers-reduced-motion` and confirm hover states still appear (instantly)
- **Done when**: no `duration-300` remains in `Header.tsx` or `Footer.tsx`, hover feels
  immediate, and keyboard focus rings/underlines are unchanged.
