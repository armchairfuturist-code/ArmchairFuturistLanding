# 011 — Return the ref from `useMagneticHover` so the magnetic tilt actually runs

- **Status**: DONE
- **Commit**: 37f73da
- **Severity**: HIGH
- **Category**: Physicality & origin
- **Estimated scope**: 2 files, ~10 lines

## Problem

The magnetic card tilt has never rendered, on any page, at any point.

`src/hooks/useMagneticHover.ts:16` creates a ref:

```ts
// src/hooks/useMagneticHover.ts:15-16 — current
export function useMagneticHover(strength = 0.3, tiltAmount = 12): MagneticResult {
  const ref = useRef<HTMLDivElement>(null);
```

The `MagneticResult` interface (lines 6-13) has no `ref` member, and the return statement
at line 43 omits it:

```ts
// src/hooks/useMagneticHover.ts:43 — current
return { x: springX, y: springY, rotateX: rotateX, rotateY: rotateY, handleMouseMove, handleMouseLeave };
```

`src/components/ui/MagneticCard.tsx:21-32` therefore attaches no ref to its `motion.div`:

```tsx
// src/components/ui/MagneticCard.tsx:21-32 — current
<motion.div
  className={className}
  style={{ x: magnetic.x, y: magnetic.y, rotateX: magnetic.rotateX, rotateY: magnetic.rotateY, transformPerspective: 800 }}
  onMouseMove={magnetic.handleMouseMove}
  onMouseLeave={magnetic.handleMouseLeave}
>
```

`ref.current` is permanently `null`, so `handleMouseMove` returns at line 28 on every event:

```ts
// src/hooks/useMagneticHover.ts:27-28 — current
const el = ref.current;
if (!el) return;
```

Two call sites pay for a dead effect: `src/components/sections/ServicesSection.tsx:141` and
`src/components/sections/SubstackSection.tsx:95`.

## Target

The hook returns the ref, and the component attaches it:

```ts
// target — useMagneticHover.ts
interface MagneticResult {
  ref: React.RefObject<HTMLDivElement>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseLeave: () => void;
}

// ...
return { ref, x: springX, y: springY, rotateX, rotateY, handleMouseMove, handleMouseLeave };
```

```tsx
// target — MagneticCard.tsx
<motion.div
  ref={magnetic.ref}
  className={className}
  /* style and handlers unchanged */
>
```

## Repo conventions to follow

- `MotionValue` is already imported in the hook. Add `RefObject` to the same import.
- The hook is `"use client"` and already gates on `canFineHover()` from `@/lib/pointer`
  (line 26). Do not add a second guard.
- Reduced motion is already handled by `MagneticCard.tsx:16-18`, which returns a plain
  `<div>` before the motion element is rendered. Leave that branch alone.

## Steps

1. In `src/hooks/useMagneticHover.ts`, add `ref: RefObject<HTMLDivElement>;` as the first
   member of the `MagneticResult` interface (after line 7).
2. In the same file, add `ref` as the first property of the returned object on line 43.
3. In `src/components/ui/MagneticCard.tsx`, add `ref={magnetic.ref}` to the `motion.div`
   opening tag, as the first prop.

## Boundaries

- Do NOT change the spring config (`stiffness: 150, damping: 15`), the `strength`/`tiltAmount`
  defaults, or the `transformPerspective: 800` value.
- Do NOT change any call site in `ServicesSection` or `SubstackSection`.
- Do NOT add new dependencies.
- If the code at lines 15-16 or 43 does not match this plan, STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` (expect no output), `npx vitest run` (expect 159 tests
  in 29 files passing), `npm run build` (expect "Compiled successfully").
- **Feel check**: run `npm run dev` (port 9002), open the homepage, scroll to the Services
  section. Hover a service card with a mouse and confirm:
  - the card translates toward the cursor and tilts (rotateX/rotateY), then springs back
    on mouse-leave — not a static card
  - at 10% playback in the DevTools Animations panel the spring settles rather than snapping
  - the effect is springy on the way out, not linear
  - toggle `prefers-reduced-motion` (Rendering panel) and confirm the card does NOT tilt
    (the plain-`<div>` branch should render instead)
- **Done when**: moving the mouse over either call site visibly moves the card, and a
  reduced-motion session shows no movement.
