# 014 — Stop the section-nav dot from snapping by animating transform, not size

- **Status**: DONE
- **Commit**: 37f73da
- **Severity**: MEDIUM
- **Category**: Physicality & origin
- **Estimated scope**: 1 file, ~6 lines

## Problem

The scroll-progress spine dot animates a size change that was never put in the transition
list, so it snaps.

```tsx
// src/components/ui/SectionNavigator.tsx:108-115 — current
<span
  className={`block rounded transition-[transform,background-color] duration-300 ${
    isActive
      ? "h-2.5 w-2.5 bg-primary"
      : "h-1.5 w-1.5 bg-foreground/30 group-hover:bg-foreground/60 group-hover:h-2 group-hover:w-2"
  }`}
/>
```

The transition list is `transform, background-color`. The hover changes `h-1.5 → h-2` and
`w-1.5 → w-2` — `width` and `height` are **not** in that list, so they change instantly.
The dot jumps from 6px to 8px on the first frame while the background colour takes the full
300ms to catch up. The author clearly intended a smooth grow (hence `transform` in the list
and a duration), but wrote the size change as layout properties.

This dot is on screen for the entire 14,400px scroll and is hovered repeatedly — the
frequency band where motion should be reduced, not extended.

## Target

Give every dot the same fixed box and grow it with `transform: scale()`, which is already in
the transition list and is GPU-composited.

```tsx
// target
<span
  className={`block h-2 w-2 rounded origin-center transition-transform duration-150 ${
    isActive
      ? "scale-125 bg-primary"
      : "scale-100 bg-foreground/30 group-hover:scale-110 group-hover:bg-foreground/60"
  }`}
/>
```

`transition-transform duration-150` replaces the old `transition-[transform,background-color]
duration-300`. Background colour changes instantly alongside the scale, which is correct —
a colour fade at 150ms and a 150ms scale read as one gesture, whereas a 300ms colour over an
instant size change reads as two unrelated things.

## Repo conventions to follow

- `duration-150` is the repo's hover/press convention: see `src/components/ui/button.tsx:8`
  and `src/components/ui/ScrollToTop.tsx:21`, both `duration-150`.
- The Tailwind `transitionTimingFunction.DEFAULT` is already
  `cubic-bezier(0.23, 1, 0.32, 1)` in `tailwind.config.ts`, so a bare `transition-transform`
  picks up the strong ease-out automatically. No `ease-*` class needed.
- The button wrapping this span is `h-10 w-10 min-h-[44px] min-w-[44px]` and must not change.

## Steps

1. In `src/components/ui/SectionNavigator.tsx`, replace the `className` template literal on
   the dot `<span>` (lines 109-114) with the target string above.
2. Do not change the sibling label `<span>` (the hover tooltip), the button, or the
   `motion.span` spine above it.

## Boundaries

- Do NOT change the `group` / `group-hover:` structure — it is shared with the label tooltip
  on the next element.
- Do NOT change the label tooltip's `transition-opacity duration-200`; 200ms is correct for
  a tooltip and is within the 125-200ms budget.
- Do NOT change `scrollTo`, the IntersectionObserver, or the `scaleY` spine.
- Do NOT add new dependencies.
- If the code at lines 109-114 does not match this plan, STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` (no output), `npx vitest run` (159 tests / 29 files
  pass), `npm run build` ("Compiled successfully").
- **Feel check**: run the homepage, scroll past the hero so the navigator appears, and:
  - hover an inactive dot — it grows smoothly with the colour, as one gesture
  - in the DevTools Animations panel, confirm the transition lists `transform` (and only
    layout-free properties); there must be no width/height entry
  - confirm the dots remain visually distinguishable at rest: inactive smaller and dimmer,
    active larger and blue
  - toggle `prefers-reduced-motion` and confirm the dot still changes state (colour/opacity
    only) without the scale
- **Done when**: the dot's growth is a smooth 150ms ease with no visible snap, and the
  active/inactive distinction is still obvious.
