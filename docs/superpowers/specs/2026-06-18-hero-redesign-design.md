# Hero Section Redesign — Geometric Grid + Reactive Chevrons

**Date:** 2026-06-18
**Status:** Approved
**Approach:** A — Geometric Grid + Reactive Chevrons

## Motivation

Current hero uses 3MB `header.mp4` + 70KB `header.webp` behind a `bg-black/60` overlay. The video is nearly invisible, the dark aesthetic conflicts with the DESIGN.md HP white-paper direction, and text contrast is suboptimal (~4:1 white over dim video). User requested a minimalist background where text pops better.

## Decision

Light white-paper hero with:
- CSS geometric reference grid (no DOM cost)
- 3 reactive blue SVG chevrons (no network requests)
- Ink-on-white text (19:1 contrast, up from ~4:1)
- Remove all video/poster/overlay/dead code

No new dependencies. `<video>` gone → 3MB saved.

## Technical Design

### CSS Grid Utility (`src/app/globals.css`)

New utility class `.bg-hp-grid`:
- `background-color: #ffffff`
- `repeating-linear-gradient` grid at 80px spacing, 1px lines at 4% black opacity
- `mask-image: radial-gradient(…)` fades grid to transparent at edges (center-visible, edge-clean)

Added to `@layer utilities` block.

### Chevron Accents (inline in HeroSection.tsx)

3 `<motion.div>` wrappers, each containing an inline `<svg>` polyline chevron:

| # | Position | Color token | Opacity | Size | Parallax multiplier |
|---|----------|-------------|---------|------|---------------------|
| 1 | top-[15%] right-[8%] | `primary` (#024ad8) | 0.06 | 120×400px | full (parallaxX/Y) |
| 2 | bottom-[12%] left-[8%] | `primary-bright` (#296ef9) | 0.04 | 80×260px | 0.7× |
| 3 | top-[55%] right-[3%] | `primary-soft` (#c9e0fc) | 0.12 | 60×200px | 0.5× |

All use existing `parallaxX`/`parallaxY` from `useTransform` — no new hooks. `aria-hidden="true"`, `pointer-events-none`.

### Text Color Mapping

| Element | Before | After | Rationale |
|---------|--------|-------|-----------|
| Line 2 (display hero) | no explicit (inherits white) | `text-ink` (#1a1a1a) | 19:1 on white |
| Line 1 (warning label) | `text-white/90` | `text-primary-bright` | Blue accent |
| Subheadline | `text-primary-foreground/95` | `text-charcoal` | Secondary |
| "// end of message" | `text-hp-bright` | `text-primary-bright` | Consistent |
| AI Alert dot | `bg-hp-bright` | `bg-primary-bright` | Consistent |

### Removals

| Item | Location | Lines |
|------|----------|-------|
| `<img src="/header.webp">` | HeroSection.tsx L83-90 | 8 |
| `<video>` + wrapper `<div hidden md:block>` | HeroSection.tsx L93-107 | 15 |
| `bg-black/60` overlay `<div>` | HeroSection.tsx L110 | 1 |
| `isVideoReady` state + `canplay` listener | HeroSection.tsx | ~8 |
| `videoRef` | HeroSection.tsx | 2 |
| `.hero-text-shadow` utility | globals.css L115-118 | 4 |
| `useEffect` (video event binding) | HeroSection.tsx | ~8 |

**Net:** ~ -46 lines, ~ -3MB, +250 bytes CSS, +500 bytes JSX.

### Files Changed
1. `src/components/sections/HeroSection.tsx` — primary
2. `src/app/globals.css` — add `.bg-hp-grid`, remove `.hero-text-shadow`
3. `public/header.mp4` — delete (optional; no references remain)
4. `public/header.webp` — delete (optional; no references remain)

## Remotion Consideration

Remotion (remotion.dev) renders MP4 videos with React at build time. For a live web background, the inline SVG chevrons + CSS grid outperform any video in load time and crispness. If a programmatic hero video is desired later, a Remotion-generated MP4 could replace the SVG chevrons — but current design does not justify the complexity.

## Verification

- [ ] `npm run build` — green, no Turbopack errors
- [ ] `npx tsc --noEmit` — green
- [ ] Browser: L1 shows "AI Won't Replace You." in primary-bright blue
- [ ] Browser: L2 shows "Someone Using AI Better Than You Will." in ink
- [ ] Browser: Subtle grid visible on white background, fades at edges
- [ ] Browser: 3 chevrons shift slightly with mouse movement
- [ ] Browser: No video tag in DOM, no 404 for header.mp4
- [ ] Browser: `hero-text-shadow` class removed from DOM
- [ ] Mobile (375px): Grid and chevrons render cleanly, no overflow
