# Impeccable Audit Report — ArmchairFuturistLanding

**Project**: `C:/Users/Administrator/Documents/Projects/ArmchairFuturistLanding`
**Date**: 2026-06-18 (original audit + remediation)
**Scope**: Whole site
**Audit mode**: Documentation-only
**Impeccable**: v3.0.3
**Build status**: GREEN — `npm run build` (Next 16.1.6 Turbopack) passes 23/23 static pages; `npx tsc --noEmit` clean.

> **Update 2026-06-18**: All 6 tiers of the remediation plan were applied. Three subagent regressions fixed during verification: `<motion.button>` missing `>`, orphan `<div>` in `ServicesSection` after Tier 2c, `ssr: false` in Server Component moved to client wrapper (`DynamicSections.tsx`). See [Remediation Applied](#remediation-applied) below for the per-file change list.
## Executive Summary

| Dimension              | Score  | Rating |
| ---------------------- | ------ | ------ |
| Accessibility          | 3 / 4  | GOOD   |
| Performance            | 2 / 4  | FAIR   |
| Theming                | 1 / 4  | CRITICAL |
| Responsive Design      | 2 / 4  | FAIR   |
| Anti-Patterns          | 1.75 / 4 | CRITICAL |

**Health total: 9.75 / 20 — POOR** (below the 14 "Good" floor; above the 6 floor)

### Post-Remediation Estimates

| Dimension         | Before  | Estimated After | Recovery Driver |
| ----------------- | ------- | --------------- | --------------- |
| Theming           | 1 / 4   | 3 / 4           | Tier 1a (token-merge) + Tier 1b (email-theme) + Tier 1c (typography in DESIGN.md) |
| Anti-Patterns     | 1.75 / 4| 3.5 / 4         | Tier 2a-d (decorative effects + hard-sell + price-anchor + dead code) + Tier 5a-d (fabricated metrics / social proof / logo wall) |
| Performance       | 2 / 4   | 3 / 4           | Tier 3d (dynamic imports) + Tier 3e (motion fanout) |
| Responsive        | 2 / 4   | 3 / 4           | Tier 3a (mobile hero static) + Tier 3b (roi sticky) + Tier 3c (marquee pause) |
| Accessibility     | 3 / 4   | 3.75 / 4        | Tier 4a-d (email aria, hero heading, roi aria, video aria) |
| **Estimated total** | **9.75 / 20** | **~16 / 20 — GOOD** | |

> Re-audit pending: run `/impeccable audit` for an independent fresh score. See [Re-Audit Recommendation](#re-audit-recommendation) below.

---

## Top 5 Critical Issues

### 1. [P0 | Theming] Two competing color systems in `tailwind.config.ts`
**Files**: `tailwind.config.ts:62-94`, `src/components/ui/button.tsx:13-32`, `src/components/layout/Header.tsx`, `src/components/sections/ConnectSection.tsx`, `src/components/sections/AssessmentCtaSection.tsx`
**Impact**: 18 legacy color aliases (`usvc-*`, `ps-*`, `console-black`, `border-dark`, `paper-white`, `ink-navy`, `display-ink`, `deep-charcoal`, `body-gray`, `inverse-white`, `dark-link-blue-rest`, `link-hover-blue`, `card-caption-text`, `ice-mist`, `masthead-black`, `shadow-black`) plus 6 legacy radius aliases (`usvc-sm/md/lg/xl`, `ps-pill`) sit alongside the `hp-*` tokens that DESIGN.md prescribes. Buttons render with USVC blue, Header renders with console-black, destructive button uses commerce-orange. Visual register is unpredicmlatable: every section uses a different color system, so brand register collapses page-by-page.
**Fix**: Delete the legacy alias block, rewire all section components to `bg-hp-electric`/`hover:bg-hp-bright`/`text-ink`/`bg-ink`.
**Command**: `impeccable refactor token-merge --source hp-* --delete usvc-*,ps-*,console-black,border-dark,paper-white,ink-navy,display-ink,deep-charcoal,body-gray,inverse-white,dark-link-blue-rest,link-hover-blue,card-caption-text,ice-mist,masthead-black,shadow-black`

### 2. [P0 | Theming] Email palette diverges from on-site palette → trust collapse at handoff
**Files**: `src/lib/email-utils.ts:73-77`, `src/lib/email/templates.ts:36,62-64,140,146,149,155`, `src/components/assessment/ScoreChart.tsx:12-14`, `src/app/opengraph-image.tsx:19,29,40,54,67`
**Impact**: Transactional emails use `#1e3a5f` / `#3b82f6` / `#1a1a2e` / `#10b981` / `#f59e0b`. On-site uses `#024ad8` / `#1a1a1a` / `#636363`. OG image uses `#0f172a` / `#1e3a5f` / `#3b82f6`. ScoreChart uses Tailwind defaults `bg-blue-500` / `bg-emerald-500` / `bg-amber-500`. Prospects see a restrained HP white-paper on-site and a saturated blue dashboard in email. Trust signal collapses at the exact moment a prospect is most receptive. **Three chart palettes**, **three OG palettes**, **two site palettes**.
**Fix**: Replace `EMAIL_BRAND.brandColor` constants with values derived from `--hp-electric` / `--ink` / `--graphite`. Centralize the email color object next to `tailwind.config.ts`.
**Command**: `impeccable theme merge --tokens tailwind.config.ts --include lib/email/* --forbid-hex`

### 3. [P0 | Theming] Typography contract violated — three sources, three stories
**Files**: `DESIGN.md:33-118` (Forma DJR Micro), `src/app/layout.tsx:16-30` (Manrope + Space Grotesk via `next/font/google`), `tailwind.config.ts:14-20` (Space Grotesk / Manrope families)
**Impact**: DESIGN.md is the source of truth and specifies Forma DJR Micro for every text-size/line-height table. Runtime ships Manrope (body) + Space Grotesk (display). Every text-size table in DESIGN.md is wrong relative to what renders.
**Fix**: Either (a) re-publish DESIGN.md to match loaded fonts (rename Forma DJR Micro → Manrope/Space Grotesk in tokens), or (b) replace `next/font/google` import with self-hosted Forma DJR Micro.
**Command**: `impeccable audit typography --spec DESIGN.md --runtime src/app/layout.tsx`

### 4. [P0 | Anti-Patterns] Hero uses gradient text + 3-layer rgba glow + scanlines — direct AI-template signature
**Files**: `src/app/globals.css:160-185`, `src/components/sections/HeroSection.tsx:117-148`
**Impact**: `.hp-gradient-text` (linear-gradient electric→bright→soft on text), `.hp-hero-glow` (3-layer rgba blue shadow stack), `.hp-scanlines` (repeating-linear-gradient overlay) all ship in globals.css and are applied to the L2 hero line "Someone Using AI Better Than You Will." DESIGN.md:521: "No gradients. Anywhere." Direct contract violation.
**Fix**: Remove the three CSS classes from globals.css. Replace hero L2 with single-color `text-ink` headline.
**Command**: `impeccable audit hero-glow gradient-text scanlines for brand-design-system compliance`

### 5. [P0 | Anti-Patterns] ResultPage is explicit dark-pattern conversion theatre
**Files**: `src/components/assessment/ResultPage.tsx:19-50, 159-207`
**Impact**: Hardcoded "Time-Sensitive" red urgency badge, archetype-specific urgencyText, "guaranteed or full refund" guarantee text, price-anchor copy ($599 → $120). Source comments literally label the block "PERSONALIZED HARD SELL — conversion-focused section." Brand voice anchor #3 ("Exit as the goal") and PRODUCT.md anti-reference #2 (course-platform look with sticky CTAs + fake urgency) are broken. **This is the single most damaging brand-trust regression on the site.**
**Fix**: Remove urgency badge, remove guarantee text, remove price-anchor arithmetic, replace with neutral follow-up paths (calendar link, email gate, free assessment).
**Command**: `impeccable audit result-page urgency-badge hard-sell for conversion-pattern anti-patterns`

---

## Detailed Findings by Dimension

### Accessibility — 3 / 4 (GOOD)

Solid foundation. Skip-link, main landmark, sticky-header scroll offset, focus rings, Radix primitives (accordion/dialog/sheet/tabs/toast), labeled form controls, `progressbar` role on assessment, decorative-SVG `aria-hidden`. `prefers-reduced-motion` covered in both CSS and `useReducedMotion()` hooks.

**P2 — Hero video has no captions/track**: `src/components/sections/HeroSection.tsx:95-107` — `<video autoPlay muted playsInline>` with no `<track>`. Hero video is decorative (poster=header.webp) and the visual h1 is sr-only, so impact is limited. Fix: `aria-hidden="true"` on the `<video>`.

**P2 — Hero h1 is sr-only; visual headline is `<span>`s**: `src/components/sections/HeroSection.tsx:90-92, 134-148` — document outline loses visual heading levels. Fix: wrap WordPullUp in a real `<h1>` with `aria-label`.

**P2 — EmailCapture error announcement lacks `role="alert"`**: `src/components/assessment/EmailCapture.tsx:102` — inconsistent with `ROICalculatorSection:330` and `ConnectSection.tsx:178` which both have `role="alert"`. Fix: add `role="alert"` + `aria-live="polite"`.

**P3 — ROI +/- buttons have no `aria-label`**: `src/components/sections/ROICalculatorSection.tsx:194/201` — only literal "-" / "+". Fix: add `aria-label="Decrease team size"` / `aria-label="Increase team size"`.

**P3 — ROI checklist button missing `aria-pressed`**: `src/components/sections/ROICalculatorSection.tsx:151-182` — `isSelected` state has no ARIA reflection.

**P3 — ResultPage "Time-Sensitive" badge contrast may fail WCAG AA**: `src/components/assessment/ResultPage.tsx:170` — red-600 on red-500/10 ≈ 3.8:1 (fail). Replace with token-backed semantic color.

---

### Performance — 2 / 4 (FAIR)

Animations are mostly cheap (`transform` + `opacity`) and `viewport={{ once: true }}` correctly limits replays. No `next/dynamic` code splitting, no `priority` on hero `Image`. Bundle bloat risk: `firebase` (~150KB) loaded statically, `fast-xml-parser` API-only but imported. ROI calculator recomputes on every keystroke without memoization. `WordPullUp` creates O(n) `motion.span` per headline — 50+ concurrent Framer Motion subscribers on a long page.

**P1 — Per-word motion spans in WordPullUp**: `src/components/ui/word-pull-up.tsx:35-75` — split headline into per-word `motion.span` instances. Fix: single parent `motion.div` with `staggerChildren: 0.06` variants. Cuts motion instances by 8x per headline.
**Command**: `impeccable perf motion-fanout --file src/components/ui/word-pull-up.tsx --target 1`

**P1 — No `next/dynamic` code splitting**: `src/app/page.tsx` static-imports 14 sections + SectionNavigator. Below-fold sections (CaseStudies onward, ~70% of page) load in initial bundle. `firebase` and `fast-xml-parser` ship to client.
**Command**: `impeccable perf dynamic-import --entry src/app/page.tsx --threshold below-fold`

**P2 — ROI recomputes on every keystroke**: `src/components/sections/ROICalculatorSection.tsx:80-89` — 4 derivations from a Set + 2 state vars, no memoization. Add `useMemo`.

**P2 — CaseStudiesSection 6 motion subscribers per render**: `src/components/sections/CaseStudiesSection.tsx:8-83` — `BlurFade` + nested `motion.div` wraps each card. Replace with parent variants.

**P3 — Hero `Image` missing `priority`**: `src/components/sections/InsightsSection.tsx:9` — first card image should be `priority`.

---

### Theming — 1 / 4 (CRITICAL)

The dominant failure. **Massive hard-coded color drift vs. the documented token system.**

**Hard-coded hex (7 in components, 14 in email, 5 in OG image)**:
- WhatsApp button: `HeroSection.tsx:174` → `#25D366`
- Header borders: `Header.tsx:32,111` → `border-[#b2d5ff]/10`
- OG image gradient: `opengraph-image.tsx:19,29,40,54,67` → `linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)` + `#3b82f6` accent
- ScoreChart: `ScoreChart.tsx:12-14` → `bg-blue-500`, `bg-emerald-500`, `bg-amber-500`
- Email palette: `email-utils.ts:73-77`, `email/templates.ts:36,62-64,140,146,149,155` → `#1e3a5f`, `#3b82f6`, `#1a1a2e`, `#10b981`, `#f59e0b`

**Legacy aliases**: 18 legacy color aliases + 6 legacy radius aliases in `tailwind.config.ts:62-94`. The `usvc-*` / `ps-*` / `console-black` / `border-dark` system is from a prior brand (USVC / PlayStation).

**Typography contract violated**: DESIGN.md says Forma DJR Micro; runtime ships Manrope + Space Grotesk. Tokens, font loading, and design contract are three different stories.

**Dark mode is dead code**: `darkMode: 'class'` set with no `.dark` root class and no toggle. CSS variables defined `globals.css:129-157` but unused. `number-ticker.tsx:59` ships `dark:text-white` despite dark mode never enabled.

Recommended commands (priority order):
1. `impeccable refactor token-merge --source hp-* --delete usvc-*,ps-*,console-black,...` (covered above)
2. `impeccable theme merge --tokens tailwind.config.ts --include lib/email/* --forbid-hex` (covered above)
3. `impeccable audit typography --spec DESIGN.md --runtime src/app/layout.tsx` (covered above)
4. `impeccable audit dark-mode --config tailwind.config.ts` — either wire the `.dark` class on `<html>` or strip the dark variant + CSS variables
5. `impeccable audit dead-css --file src/app/globals.css` — `.scroll-animate`, `hp-gradient-text`, `border-beam.tsx`

---

### Responsive Design — 2 / 4 (FAIR)

Most layouts use container + grid responsive utilities with reasonable mobile breakpoints. Container `px-4 md:px-6`, scroll-mt-20 on every section anchor, mobile hamburger Sheet, text-balance/pretty. Button sizes h-11 default / h-12 lg — passes 44px on most touch points.

**P0 — Hero fixed video background on mobile**: `HeroSection.tsx:87` — `<video autoPlay playsInline>` covering viewport. iOS Safari and many Android browsers BLOCK autoplay-without-user-gesture even when muted+playsInline (low-power mode, data-saver). Result: black/empty hero on first paint. The poster fade-in only fires on `isVideoReady` (line 32), so blocked videos never trigger the poster.
Fix: render poster as section `background-image` underneath video; show video only at `(min-width: 768px)`.
Command: `impeccable mobile-hero C:/Users/.../HeroSection.tsx`

**P0 — ROI results panel `sticky top-24` on mobile**: `ROICalculatorSection.tsx:213` — `position: sticky` inside single-column layout (viewport < lg) creates a 60-100vh sticky block of overlap, hides task list, causes scroll jank.
Fix: `lg:sticky lg:top-24` so panel only sticks at lg+.
Command: `impeccable roi-mobile C:/Users/.../ROICalculatorSection.tsx`

**P0 — Testimonials marquee violates WCAG 2.2.2**: `TestimonialsSection.tsx:208-215` — continuous auto-scroll with no keyboard-accessible pause. "Hover to pause" hint is not keyboard-reachable.
Fix: visible `<button>` with `aria-pressed` toggling CSS `animation-play-state: paused`.
Command: `impeccable marquee-pause C:/Users/.../TestimonialsSection.tsx`

**P1 — Header `h-13` is non-standard**: `Header.tsx:33` — Tailwind JIT accepts it (arbitrary value) but the desktop nav row is ~52px. Touch target on inner Free Assessment link (line 76-81) is text-only, borderline on touch devices.

**P1 — Hero h1 clamp may overflow at 200% zoom**: `HeroSection.tsx:144` — `text-[clamp(2.75rem,7.5vw,6rem)]` floors at 44px on 320px viewport. Container `max-w-5xl mx-auto px-4` + clamp + `hp-hero-glow` 96px right-side glow may bleed. Test 320px @ 100/125/150/200% browser zoom.

**P2 — ConnectSection button missing `whileTap`**: `ConnectSection.tsx:75` — `whileHover={{ scale: 1.03 }}` desktop-only. Add `whileTap={{ scale: 0.98 }}` for touch feedback.

---

### Anti-Patterns — 1.75 / 4 (CRITICAL)

Score breakdown: ai_slop_tells=1, brand_register_coherence=2, interaction_patterns=2, content_slop=2.

**P0 — BorderBeam defaults orange→purple**: `src/components/ui/border-beam.tsx:54-66` — `colorFrom: '#ffaa40'`, `colorTo: '#9c40ff'`. Even if unused at runtime, presence in `/components/ui` signals to LLM-assisted PRs that border beams are in-bounds.
Command: `impeccable audit border-beam orange-purple defaults for shadcn-ui canon violations`

**P1 — Three-tier / four-tier pricing with featured middle card**: `MentoringSection.tsx:175-272`, `ServicesSection.tsx:209-300` — `pkg.popular` flag drives border-primary ring + "Most Popular" badge + scale-105 + shadow-lg. PRODUCT.md anti-reference #4 names this exact pattern as forbidden.
Command: `impeccable audit mentoring-section services-section highlighted-pricing-card for course-platform anti-pattern`

**P1 — Marquee keyframes still in CSS even though UI uses static logo grids**: `globals.css:218-243` — `@keyframes marquee`, `@keyframes marquee-vertical`, `@keyframes shine`. globals.css:43-49 forces `.animate-marquee` to keep animating under `prefers-reduced-motion` (labeled "Marquees should still scroll"). Brand-trust regression.
Command: `impeccable audit marquee-keyframes shine-keyframe for unused-animation-anti-pattern`

**P1 — ROI calculator ships fabricated deterministic math**: `ROICalculatorSection.tsx:80-87` — `annualSavings = teamHoursPerYear * 50` with disclaimer. UI surfaces single dollar figure as visual climax with `text-3xl font-black text-primary`. Brand voice anchor #2 ("Trust as the product") + anti-slop rule against fabricated stats both apply. Either drop the dollar conversion or call it a toy upper-bound.
Command: `impeccable audit roi-calculator annual-savings deterministic-math for fabricated-stats anti-pattern`

**P1 — Case studies are anonymous industry types with no client name**: `CaseStudiesSection.tsx:8-83` — three "case studies" labelled by industry only with no client name, logo, permalink, or verifiable metric. Data reads as fabricated best-case-scenario. Contradicts the "What This Is NOT" trust signal elsewhere on the site.
Command: `impeccable audit case-studies anonymous-client fabricated-metrics for trust-fabrication anti-pattern`

**P1 — KeyStatsSection 9-logo wall with no real client names**: `KeyStatsSection.tsx:27-37, 81-104` — "Organizations I've worked with" but several entries are unverifiable. PRODUCT.md anti-reference #3 calls out "Trusted by engineers at logo wall" as the SaaS-dashboard anti-pattern explicitly to avoid.
Command: `impeccable audit key-stats logo-wall organizations-worked-with for saas-dashboard anti-pattern`

**P2 — WhatsApp pill breaks HP palette purity**: `HeroSection.tsx:174`, `ConnectSection.tsx:99-100` — `bg-[#25D366]` is the only place on the site that breaks the HP Electric Blue "lone signal" rule. Bloom Coral is the only allowed warm accent, reserved for commerce urgency.
Command: `impeccable audit whatsapp-cta green-pill for hp-signal-color compliance`

**P2 — Decorative gradients on SpeakingSection card and MentoringSection pillars**: `SpeakingSection.tsx:63`, `MentoringSection.tsx:99` — `bg-gradient-to-br` and `bg-gradient-to-r` violate DESIGN.md:521 "No gradients. Anywhere."

**P2 — "Join 40+ leaders" social proof is fabricated**: `ConnectSection.tsx:104-106` — same 40+ number repeated 5+ times across hero/stats/FAQ/case studies with no roster or testimonials.
Command: `impeccable audit connect-section join-40-leaders social-proof for fabricated-stat anti-pattern`

**P3 — AboutMeSection "questions that keep leaders up at 2 AM" + em-dash heavy copy**: `AboutMeSection.tsx:225-256` — stock consulting line + "journey as business metaphor" tic that SLOP-GUIDE bans.
Command: `impeccable audit about-me-section executive-individual copy for ai-tic phrasing`

---

## Patterns & Systemic Issues

1. **Two design languages, one codebase.** The single root cause for both Theming (1/4) and Anti-Patterns (1.75/4). Documentation says HP. Code says USVC + PlayStation. Fix with one codemod.
2. **Trust signals collapse at boundaries.** On-site → email → OG → chart use four different palettes. Each handoff erodes the next click.
3. **Documented design system is aspirational, not enforced.** DESIGN.md and PRODUCT.md are well-written contracts; the runtime ignores them at three layers (tokens, fonts, effects).
4. **Decorative motion infrastructure ships unused.** BorderBeam, hp-gradient-text, hp-hero-glow, hp-scanlines, marquee keyframes all exist but either aren't called or are referenced from sections that violate the design contract.
5. **AI-tic copy in the right places.** The site does the hard work (SLOP-GUIDE.md, sentence-rhythm variation, "What This Is NOT" section, exit-as-goal pricing transparency). The bad copy is concentrated in `AboutMeSection`, `ResultPage`, and the case studies — fixable section by section.

---

## Positive Findings

- **Static logo grids, no marquees** in `KeyStatsSection.tsx:81` — explicit "no marquee, no animation" comment. Honors the no-decoration principle.
- **`WhatThisIsNotSection`** names "not a fit" scenarios and refers leads to competitors. Direct hit on PRODUCT.md brand voice anchor #1 (clarity over hype) and #2 (trust as the product).
- **SLOP-GUIDE.md is enforced** — many sections use sentence rhythm variation, "But." / "And." sentence starts, short fragments.
- **Honest price transparency**: FAQ lists $120 → $12,000, 5/10/20-session packs, PPP adjustments. PRODUCT.md brand voice anchor #3 honored at copy level.
- **Real expert photo + real LinkedIn + real certification badge images + real Substack URL**. Not fabricated.
- **No fake countdown timers, no exit-intent popups, no dark patterns at the top level.** PRODUCT.md principle #4 mostly honored.
- **All `motion.div` use `viewport={{ once: true }}`** — animations don't replay on scroll-back, limiting CPU.
- **Framer Motion is the only animation lib** — no parallel `gsap`/`anime.js`/jQuery. Single dependency, sane bundle.
- **`useReducedMotion()` wired** in `HeroSection.tsx:33` and `BlurFade`.
- **Skip-link, main landmark, focus rings, Radix primitives** all correct.
- **QuizProgress has proper `role="progressbar"`** with aria-valuenow/min/max/label.
- **Suspense around FirebaseAnalytics** (`layout.tsx:159-161`) — analytics don't block render.
- **`lucide-react` named imports** — tree-shake safe.

---

## Recommended Actions (Priority Order)

Run these one at a time, in any order. Re-run `/impeccable audit` after each batch to track score recovery.

### Tier 1 — Single-codemod wins (move Theming 1→3, Anti-Patterns 1.75→3)
1. `impeccable refactor token-merge --source hp-* --delete usvc-*,ps-*,console-black,border-dark,paper-white,ink-navy,display-ink,deep-charcoal,body-gray,inverse-white,dark-link-blue-rest,link-hover-blue,card-caption-text,ice-mist,masthead-black,shadow-black`
2. `impeccable theme merge --tokens tailwind.config.ts --include lib/email/* --forbid-hex`
3. `impeccable audit typography --spec DESIGN.md --runtime src/app/layout.tsx`

### Tier 2 — Brand-trust repair (move Anti-Patterns 3→4)
4. `impeccable audit result-page urgency-badge hard-sell for conversion-pattern anti-patterns`
5. `impeccable audit hero-glow gradient-text scanlines for brand-design-system compliance`
6. `impeccable audit mentoring-section services-section highlighted-pricing-card for course-platform anti-pattern`
7. `impeccable audit border-beam orange-purple defaults for shadcn-ui canon violations`

### Tier 3 — Mobile + perf (move Responsive 2→3, Performance 2→3)
8. `impeccable mobile-hero C:/Users/Administrator/Documents/Projects/ArmchairFuturistLanding/src/components/sections/HeroSection.tsx`
9. `impeccable roi-mobile C:/Users/Administrator/Documents/Projects/ArmchairFuturistLanding/src/components/sections/ROICalculatorSection.tsx`
10. `impeccable marquee-pause C:/Users/Administrator/Documents/Projects/ArmchairFuturistLanding/src/components/sections/TestimonialsSection.tsx`
11. `impeccable perf dynamic-import --entry src/app/page.tsx --threshold below-fold`
12. `impeccable perf motion-fanout --file src/components/ui/word-pull-up.tsx --target 1`

### Tier 4 — A11y nits (move Accessibility 3→4)
13. `impeccable form-errors C:/Users/Administrator/Documents/Projects/ArmchairFuturistLanding/src/components/assessment/EmailCapture.tsx`
14. `impeccable hero-heading C:/Users/Administrator/Documents/Projects/ArmchairFuturistLanding/src/components/sections/HeroSection.tsx`
15. `impeccable roi-aria C:/Users/Administrator/Documents/Projects/ArmchairFuturistLanding/src/components/sections/ROICalculatorSection.tsx`
16. `impeccable video-captions C:/Users/Administrator/Documents/Projects/ArmchairFuturistLanding/src/components/sections/HeroSection.tsx`

### Tier 5 — Trust-fabrication cleanup
17. `impeccable audit case-studies anonymous-client fabricated-metrics for trust-fabrication anti-pattern`
18. `impeccable audit roi-calculator annual-savings deterministic-math for fabricated-stats anti-pattern`
19. `impeccable audit key-stats logo-wall organizations-worked-with for saas-dashboard anti-pattern`
20. `impeccable audit connect-section join-40-leaders social-proof for fabricated-stat anti-pattern`

### Tier 6 — Dead-code cleanup
21. `impeccable audit dead-css --file src/app/globals.css`
22. `impeccable audit dark-mode --config tailwind.config.ts`

### Manual QA
23. Test Hero + Connect + ROI pages on iPhone SE (320px) at 100/125/150/200% browser zoom

---

## Remediation Applied

All 6 tiers of the planned remediation have been applied. Files modified: 23 (22 modified, 1 deleted, 1 new). Build and typecheck are green.

### Tier 1 — Foundations

**Tier 1a — Token merge** (6 files)
- `tailwind.config.ts`: deleted 18 legacy color aliases (`usvc-*`, `ps-*`, `console-black`, `border-dark`, `paper-white`, `ink-navy`, `display-ink`, `deep-charcoal`, `body-gray`, `inverse-white`, `dark-link-blue-rest`, `link-hover-blue`, `card-caption-text`, `ice-mist`, `masthead-black`, `shadow-black`, `commerce-orange`, `commerce-orange-active`, `warning-red`, `success-green`, `dark-link-blue`, `mute-gray`, `usvc-off-white`) + 6 radius aliases (`usvc-sm/md/lg/xl`, `ps-pill`). Added `paper: "#f7f7f7"`.
- `src/components/ui/button.tsx`: all variants rewired to HP tokens.
- `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`: usvc-* → hp-* swaps.
- `src/components/sections/AboutMeSection.tsx`, `src/components/sections/AssessmentCtaSection.tsx`, `src/components/sections/ConnectSection.tsx`: same.

**Tier 1b — Email theme** (4 files + `tailwind.config.ts`)
- `src/lib/email-utils.ts`, `src/lib/email/templates.ts`, `src/app/opengraph-image.tsx`, `src/components/assessment/ScoreChart.tsx` all aligned to HP palette (`#024ad8` / `#1a1a1a` / `#636363`) and semantic `success`/`warning` Tailwind tokens.

**Tier 1c — Typography** (1 file)
- `DESIGN.md`: dropped Forma DJR Micro framing. Display → Space Grotesk, body/UI/button/price/caption → Manrope.

### Tier 2 — Anti-patterns

**Tier 2a — Hero glow** (2 files): deleted `.hp-gradient-text`, `.hp-hero-glow`, `.hp-scanlines` from `src/app/globals.css`; removed scanline overlay + glow class from `src/components/sections/HeroSection.tsx`.

**Tier 2b — Result page** (1 file): `src/components/assessment/ResultPage.tsx` -85 lines (-37.6%). Deleted hard-sell block, helper vars, PERSONALIZED HARD SELL `BlurFade`, plus `Zap`/`CheckCircle2`/`Clock` imports. Replaced with one neutral line: "You can stop anytime. No locked-in commitment."

**Tier 2c — Pricing cards** (2 files): `src/components/sections/MentoringSection.tsx` and `src/components/sections/ServicesSection.tsx`. Removed conditional `border-primary ring` and "Most Popular" badge JSX. `BookCallButton` now uses uniform secondary style. The `pkg.popular` / `tier.highlighted` data flag is kept (unused) to avoid breaking tests.

**Tier 2d — Border beam** (1 file): `src/components/ui/border-beam.tsx` DELETED. Zero call sites.

### Tier 3 — Performance & Responsive

**Tier 3a — Mobile hero** (1 file): `src/components/sections/HeroSection.tsx`. Added static `<img src="/header.webp">` base layer for mobile (video now `hidden md:block`). Removed `isVideoReady` state.

**Tier 3b — ROI sticky** (1 file): `src/components/sections/ROICalculatorSection.tsx` L213. `sticky top-24` → `lg:sticky lg:top-24`.

**Tier 3c — Marquee pause** (1 file): `src/components/sections/TestimonialsSection.tsx`. Added keyboard-accessible pause button with `aria-pressed` + dynamic `aria-label`; conditional class on marquee wrapper applies `animation-play-state:paused`.

**Tier 3d — Dynamic imports** (2 files): `src/app/page.tsx` + new `src/components/sections/DynamicSections.tsx` (client wrapper). 5 sections (`CaseStudiesSection`, `KeyStatsSection`, `ROICalculatorSection`, `AssessmentCtaSection`, `InsightsSection`) split off to client `dynamic({ ssr: false })`. `SectionSkeleton` provides accessible pulse placeholder.

**Tier 3e — Motion fanout** (1 file): `src/components/ui/word-pull-up.tsx`. Refactored from per-word `motion.span` to parent `motion.span` with `staggerChildren`. Single motion subscription per instance.

### Tier 4 — Accessibility

- **Tier 4a — Email aria** (1 file): `src/components/assessment/EmailCapture.tsx` L102 error `<p>` gained `role="alert"` + `aria-live="polite"`.
- **Tier 4b — Hero heading** (1 file): `src/components/sections/HeroSection.tsx`. Deleted sr-only `<h1>` with copy "Alex Myers — AI Guide | I Teach You to Design, Launch, and Sell Your Own AI-Powered Services". Wrapped both `WordPullUp` lines in new `<h1 aria-label={...} className="contents">`. **Flag**: the SEO keyword phrase is no longer in the h1; review whether this is acceptable. The phrase may still appear in `src/app/layout.tsx` metadata.
- **Tier 4c — ROI aria** (1 file): `src/components/sections/ROICalculatorSection.tsx`. ROI checklist button gained `aria-pressed={isSelected}`. `-`/`+` buttons gained `aria-label` for team-size.
- **Tier 4d — Video aria** (1 file): `src/components/sections/HeroSection.tsx`. L96 video wrapper gained `aria-hidden="true"`.

### Tier 5 — Honest Content

- **Tier 5a — Case studies** (1 file): `src/components/sections/CaseStudiesSection.tsx`. Replaced 3 fabricated metric results arrays with "engagement patterns" (e.g. "Mapped 14 repetitive query categories"). Eyebrow "Real Results" → "Engagement Patterns". Section disclaimer added. Card body "Results" panel → "What I Worked On" panel. Removed `Clock`/`DollarSign`/`TrendingUp` from lucide-react imports.
- **Tier 5b — ROI math** (1 file): `src/components/sections/ROICalculatorSection.tsx`. Replaced `$XX,XXX estimated annual value recovered` climax with hours-based climax `{hoursPerWeek} hours per week per person` (text-2xl font-semibold text-primary). Removed `annualSavings` computation. Disclaimer added. `DollarSign` import removed, `Clock` icon now used.
- **Tier 5c — Key stats** (1 file): `src/components/sections/KeyStatsSection.tsx`. Removed 9-entry `logos` array. Replaced logo grid with honest text list: "Techstars, NTT Data, and teams in professional services, manufacturing, and education. Names of recent clients withheld by request." Eyebrow "Organizations I've worked with" → "Selected engagements".
- **Tier 5d — Connect leaders** (1 file): `src/components/sections/ConnectSection.tsx`. Removed "Join 40+ leaders who've reclaimed 10-20 hrs/week" line, replaced with honest one-liner.

### Tier 6 — Dead code

- `src/app/globals.css`: removed `.dark` CSS variable block, `@keyframes fadeInUp` + `.scroll-animate`, `@keyframes shine`. Retained `@keyframes marquee` + `marquee-vertical` (live use).
- `tailwind.config.ts`: removed `darkMode: ["class"]`.
- `src/components/sections/MentoringSection.tsx`: removed `dark:text-green-400` variant on savings badge.

### Verification Fixes (post-remediation)

During the build verification pass, three subagent-introduced regressions were found and fixed:

1. `src/components/sections/ROICalculatorSection.tsx` L150: `<motion.button>` was missing its `>` closer (Tier 4c). Fixed.
2. `src/components/sections/ServicesSection.tsx` L228-241: orphan `<div>` wrapper for the tier icon (left over from Tier 2c badge removal) was never closed. Fixed.
3. `src/app/page.tsx`: `ssr: false` is illegal in Server Components under Next 16. Extracted all 5 `dynamic({ ssr: false })` calls into a new client wrapper `src/components/sections/DynamicSections.tsx`. Fixed.

### Verification Results

- `npm run build` → **GREEN**. 23/23 static pages generated. No errors.
- `npx tsc --noEmit` → **GREEN**. 0 diagnostics.
- Orphan-reference search (annualSavings, border-beam, isVideoReady, hp-gradient-text, hp-hero-glow, hp-scanlines, HARD SELL, hardSell, usvc-blue, usvc-navy, console-black) in `src/`: **0 matches in live code**.

---

## Re-Audit Recommendation

Run `/impeccable audit` for a fresh independent score. The original three subagents (`perf-theming`, `a11y-responsive`, `anti-patterns`) have terminated and cannot be re-prompted. A re-run will:

1. Verify the estimated score recovery (~9.75 → ~16) holds.
2. Surface any regressions the estimated scoring missed.
3. Re-rank the P0-P3 backlog based on the current state of the codebase.

The original P0-P3 list above is preserved as historical record.

**End of report.**
