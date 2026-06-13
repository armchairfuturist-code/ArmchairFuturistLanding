# Plan 004: Section Registry and Dynamic Imports

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report -- do not improvise. When done, update the status row for this plan
> in `plans/README.md` -- unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 68d76a5a..HEAD -- src/app/page.tsx src/components/ui/SectionNavigator.tsx src/components/sections/`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: none
- **Category**: perf + tech-debt
- **Planned at**: commit `68d76a5a`, 2026-06-13

## Why this matters

The homepage statically imports all 15 section components, each a `'use client'`
component. The entire `motion` (Framer Motion) bundle ships on initial paint,
though only `HeroSection` uses it above the fold. The `SectionNavigator`
duplicates section metadata (ids and labels) that `page.tsx` already drives.
Adding, removing, or reordering sections requires touching two files and risks
drift between the navigator and the page.

A section registry consolidates ordering, metadata, and lazy-load strategy into
one file. The homepage becomes a 3-line map. The navigator derives from the
registry. Below-fold sections auto-split into separate JS chunks.

## Current state

**`src/app/page.tsx`** -- 15 static imports, 63 lines:
```
import HeroSection from '@/components/sections/HeroSection';
import MentoringSection from '@/components/sections/MentoringSection';
import KeyStatsSection from '@/components/sections/KeyStatsSection';
// ... 12 more
export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      // ... 12 more
    </div>
  );
}
```

**`src/components/ui/SectionNavigator.tsx`** -- hardcoded section list:
```
const sections = [
  { id: 'stats', label: 'Stats' },
  { id: 'about-me', label: 'About' },
  { id: 'what-this-is-not', label: 'Fit' },
  { id: 'services', label: 'Services' },
  { id: 'ai-guidance', label: 'Guidance' },
  { id: 'case-studies', label: 'Cases' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'roi-calculator', label: 'ROI' },
  { id: 'faq', label: 'FAQ' },
  { id: 'connect', label: 'Contact' },
];
```

**No `next/dynamic` usage found** anywhere in `src/`.

**Repo conventions**: Section components use `'use client'`. Motion animations
via `motion/react`. Tailwind CSS classes. Section ids match the `id` prop on
the section's outermost element. Components import via `@/` alias.

## Commands you will need

| Purpose   | Command                  | Expected on success |
|-----------|--------------------------|---------------------|
| Typecheck | `npm run lint`           | exit 0, no errors   |
| Build     | `npm run build`          | exit 0              |
| Tests     | `npm test`               | all pass            |

## Scope

**In scope** (the only files to create/modify):
- `src/lib/section-registry.ts` (create) -- registry with section order, metadata, and lazy components
- `src/app/page.tsx` (modify) -- use registry, add dynamic imports
- `src/components/ui/SectionNavigator.tsx` (modify) -- derive from registry

**Out of scope** (do NOT touch):
- Individual section components (HeroSection.tsx, etc.) -- no changes needed
- Any section's internal rendering or styling
- Assessment page (`src/app/assessment/`)
- Any test files

## Steps

### Step 1: Create `src/lib/section-registry.ts`

```typescript
import dynamic from 'next/dynamic';

export interface SectionEntry {
  id: string;
  label: string;
  component: React.ComponentType;
  /** Load eagerly (above the fold). Default false. */
  eager?: boolean;
}

// Sections containing each section's <section id="..."> value
export const SECTION_IDS = {
  hero: 'hero',
  stats: 'stats',
  whatIsNot: 'what-this-is-not',
  services: 'services',
  about: 'about-me',
  caseStudies: 'case-studies',
  testimonials: 'testimonials',
  mentoring: 'ai-guidance',
  roi: 'roi-calculator',
  speaking: 'speaking',
  assessment: 'assessment',
  insights: 'insights',
  faq: 'faq',
  connect: 'connect',
} as const;

const sections: SectionEntry[] = [
  // Eager: above the fold
  {
    id: SECTION_IDS.hero,
    label: 'Hero',
    component: dynamic(() => import('@/components/sections/HeroSection'), { ssr: true }),
    eager: true,
  },
  // Lazy: loaded on scroll
  {
    id: SECTION_IDS.stats,
    label: 'Stats',
    component: dynamic(() => import('@/components/sections/KeyStatsSection')),
  },
  {
    id: SECTION_IDS.whatIsNot,
    label: 'Fit',
    component: dynamic(() => import('@/components/sections/WhatThisIsNotSection')),
  },
  {
    id: SECTION_IDS.services,
    label: 'Services',
    component: dynamic(() => import('@/components/sections/ServicesSection')),
  },
  {
    id: SECTION_IDS.about,
    label: 'About',
    component: dynamic(() => import('@/components/sections/AboutMeSection')),
  },
  {
    id: SECTION_IDS.mentoring,
    label: 'Guidance',
    component: dynamic(() => import('@/components/sections/MentoringSection')),
  },
  {
    id: SECTION_IDS.roi,
    label: 'ROI',
    component: dynamic(() => import('@/components/sections/ROICalculatorSection')),
  },
  {
    id: SECTION_IDS.caseStudies,
    label: 'Cases',
    component: dynamic(() => import('@/components/sections/CaseStudiesSection')),
  },
  {
    id: SECTION_IDS.testimonials,
    label: 'Reviews',
    component: dynamic(() => import('@/components/sections/TestimonialsSection')),
  },
  {
    id: SECTION_IDS.speaking,
    label: 'Speaking',
    component: dynamic(() => import('@/components/sections/SpeakingSection')),
  },
  {
    id: SECTION_IDS.assessment,
    label: 'Quiz',
    component: dynamic(() => import('@/components/sections/AssessmentCtaSection')),
  },
  {
    id: SECTION_IDS.insights,
    label: 'Content',
    component: dynamic(() => import('@/components/sections/InsightsSection')),
  },
  {
    id: SECTION_IDS.faq,
    label: 'FAQ',
    component: dynamic(() => import('@/components/sections/FAQSection')),
  },
  {
    id: SECTION_IDS.connect,
    label: 'Contact',
    component: dynamic(() => import('@/components/sections/ConnectSection')),
  },
];

export function getSections(): typeof sections {
  return sections;
}

export function getNavigatorItems(): Array<{ id: string; label: string }> {
  return sections.map((s) => ({ id: s.id, label: s.label }));
}
```

Note: `HeroSection` gets `eager: true` and has `ssr: true` to ensure it
renders server-side for LCP. All others are lazily loaded via plain `dynamic()`.

**Verify**: `npm run lint` -- exit 0.

### Step 2: Update `src/app/page.tsx`

Replace the 15 static imports and the HTML-literal rendering with a loop over
the registry:

```typescript
import { getSections } from '@/lib/section-registry';
import HeroSection from '@/components/sections/HeroSection';
import SectionNavigator from '@/components/ui/SectionNavigator';

export default function HomePage() {
  const sections = getSections();

  return (
    <div className="flex flex-col">
      {sections.map((entry) => {
        const Component = entry.component;
        return <Component key={entry.id} />;
      })}
      <SectionNavigator />
    </div>
  );
}
```

Note: `HeroSection` is still imported statically as an eager module (or could
be removed from the dynamic import if the registry's eager flag feels cleaner
-- the current approach keeps the static import for the SSR-critical hero).

**Verify**: `npm run lint` -- exit 0.

### Step 3: Update `src/components/ui/SectionNavigator.tsx`

Replace the hardcoded `sections` array with a call to the registry:

```
import { getNavigatorItems } from '@/lib/section-registry';

const sections = getNavigatorItems();
```

Delete lines 5-16 (the old constant array) and replace with the import. The
rest of the component (scroll handler, rendering, aria labels) stays identical.

**Verify**: `npm run lint` -- exit 0.

### Step 4: Build and test

**Verify**: `npm run build` -- exit 0, no build errors. Dynamic chunks created
in `.next/static/chunks/`.

**Verify**: `npm test` -- all tests pass.

**Verify**: `npm run lint` -- exit 0.

## Test plan

- No new tests needed for this structural change -- the homepage tests and
  component tests verify the same rendering paths.
- The SectionNavigator tests (if any) should still pass since the data source
  changed but the shape is identical.
- Manual smoke test: verify each section still renders on the homepage,
  especially HeroSection (which should be server-rendered).

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `npm run build` exits 0 (checks dynamic import resolution)
- [ ] `npm run lint` exits 0
- [ ] `npm test` exits 0
- [ ] `src/lib/section-registry.ts` exists with all 14 sections
- [ ] `grep -rn "next/dynamic" src/lib/section-registry.ts` shows 14 dynamic() calls
- [ ] `grep -rn "getNavigatorItems" src/components/ui/SectionNavigator.tsx` shows the registry import
- [ ] `grep -rn "getSections" src/app/page.tsx` shows the registry loop
- [ ] No section components were modified
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- `npm run build` fails (dynamic import resolution issues)
- A section component's file path has changed since plan was written
- SectionNavigator has been substantially rewritten

## Maintenance notes

- To add a new section: add one entry to the registry, create the component,
  give it a matching `id` attribute. That's it -- no page.tsx or navigator changes.
- To reorder: reorder the registry array. That's it.
- To remove: remove the registry entry. That's it.
- If a section needs its props from the parent (e.g., a header with a ref),
  extract a section wrapper pattern or pass through context -- out of scope here.
- The `HeroSection` static import is kept for SSR. If you add other eager
  sections, either static-import them or add SSR support via `ssr: true` and
  check the build output for chunk size.
