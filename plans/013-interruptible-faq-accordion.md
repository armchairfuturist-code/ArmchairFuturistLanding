# 013 — Make the FAQ accordion interruptible without breaking Radix's height contract

- **Status**: DONE
- **Commit**: 37f73da
- **Severity**: HIGH
- **Category**: Interruptibility & performance
- **Estimated scope**: 2 files, ~20 lines

## Problem

The FAQ accordion is the most-toggled element on the site — 14 items, reopened constantly —
and it animates in the one way that is both expensive and un-interruptible.

```tsx
// src/components/ui/accordion.tsx:54-58 — current
<AccordionPrimitive.Content
  className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
>
```

Those classes resolve to `@keyframes` in the Tailwind config:

```ts
// tailwind.config.ts:173-181 — current
keyframes: {
  "accordion-down": {
    from: { height: "0" },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  "accordion-up": {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: "0" },
  },
```

Two problems:

1. **Non-interruptible.** CSS keyframes restart from zero. A reader who re-toggles an item
   mid-open sees the panel jump back to collapsed and replay. A transition retargets from
   whatever height the panel currently is.
2. **`height` is a layout property**, so every frame runs layout + paint + composite.

**Do NOT switch to `transform: scaleY()`.** That is the usual advice and it is wrong here:
Radix measures the content and exposes `--radix-accordion-content-height`, and its
open/close state is announced to assistive technology. A `scaleY` panel either needs a
wrapper to measure, or breaks the announced height. This plan deliberately keeps `height`
and fixes only the interruptibility. The layout cost stays; that is an accepted trade against
accessibility, and it is the same trade `shadcn/ui` ships.

## Target

Replace the keyframes with transitions on `height`, so re-toggling retargets. Keep the
keyframes defined in the Tailwind config (other code may reference them; they are not
removed, just no longer applied here).

```ts
// target — accordion.tsx, new module-level constant
// CSS transitions interpolate height, so a re-toggle retargets from the
// current height instead of restarting from zero. The `auto` case is the
// open direction: Radix sets --radix-accordion-content-height on mount.
const ACCORDION_CONTENT_HEIGHT = {
  "[--radix-accordion-content-height]:0": { height: "0" },
  "[--radix-accordion-content-height]:auto": { height: "var(--radix-accordion-content-height)" },
};
```

```tsx
// target — accordion.tsx:54-58
<AccordionPrimitive.Content
  className={cn(
    "overflow-hidden text-sm",
    "transition-[height] duration-200 ease-out data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
  )}
>
```

That is only half the fix and the class string is contradictory. The correct target replaces
the two `animate-*` utilities entirely with the transition-driven height map, applied only
when Radix reports the content is open or animating. The simplest correct implementation
keeps Radix's data attributes and switches the animation to transitions using arbitrary
properties:

```tsx
// target — accordion.tsx:54-58
<AccordionPrimitive.Content
  className={cn(
    "overflow-hidden text-sm transition-[height] duration-200 ease-out",
    "data-[state=closed]:[--radix-accordion-content-height:0]",
    "data-[state=closed]:h-0",
    "data-[state=open]:h-[var(--radix-accordion-content-height)]",
  )}
>
```

`h-0` and `h-[var(--radix-accordion-content-height)]` are ordinary height utilities, so the
`transition-[height]` declared on the same element interpolates between them. A re-toggle
retargets from the current computed height.

## Repo conventions to follow

- Easing tokens: use the existing `ease-out` behaviour. In Tailwind class terms this repo
  has already set `transitionTimingFunction.DEFAULT` to `cubic-bezier(0.23, 1, 0.32, 1)` in
  `tailwind.config.ts`, so a bare `transition-[height] duration-200` picks up the strong
  ease-out with no extra class.
- Duration: accordions are in the "dropdowns, selects 150-250ms" band. Use `duration-200`.
- `cn` is already imported in `accordion.tsx`.

## Steps

1. In `src/components/ui/accordion.tsx`, replace the `className` string on
   `AccordionPrimitive.Content` (line 56) with the target string above, keeping `cn(...)`
   only if needed (a plain string is fine — do not add the wrapper unnecessarily).
2. Leave `AccordionTrigger` (lines 23-41) untouched.
3. Do NOT edit `tailwind.config.ts`. The `accordion-down` / `accordion-up` keyframes stay
   defined; they are simply no longer applied by this component.

## Boundaries

- Do NOT change the `height` property to `transform` / `scaleY`. Radix's
  `--radix-accordion-content-height` and its a11y announcement depend on real height.
- Do NOT edit `tailwind.config.ts`, and do NOT delete the accordion keyframes.
- Do NOT change `AccordionTrigger`, the `py-4`, or the chevron rotation.
- Do NOT change the FAQ data or markup in `src/components/sections/FAQSection.tsx`.
- Do NOT add new dependencies.
- If the code at line 56 does not match this plan, STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` (no output), `npx vitest run` (159 tests / 29 files
  pass — note `Header.test.tsx` exercises the mobile sheet, not the accordion),
  `npm run build` ("Compiled successfully").
- **Feel check**: run the homepage, scroll to the FAQ ("Real questions people ask me"), and:
  - open an item — it expands smoothly and the content is fully visible at the end
  - **the key test**: click an item to close it, and click it again ~100ms later, mid-close.
    It must reverse smoothly from its current height. It must NOT snap to 0 and replay.
  - do the same mid-open
  - in the DevTools Animations panel, confirm the panel shows a `transition`, not an
    `animation` (keyframes) entry
  - toggle `prefers-reduced-motion` and confirm the panel still opens (it may appear
    instant) and the content is readable
  - with a screen reader or DevTools' accessibility tree, confirm the expanded state is
    still announced (`aria-expanded`) and the panel is not hidden
- **Done when**: rapid re-toggling never produces a jump, and the FAQ content remains
  fully readable and correctly announced at rest.
