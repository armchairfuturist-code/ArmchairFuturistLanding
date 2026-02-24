# UX & Conversion Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restructure The Armchair Futurist landing page to spotlight the $199 Digital Identity offer, add AI Mentoring service, reduce enterprise prices 15%, and fix SEO/analytics gaps.

**Architecture:** Single-page Next.js 15 app with Tailwind + shadcn/ui + Framer Motion. All changes are component-level — two new section components, modifications to three existing files, and new SEO config files. No backend changes.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Firebase Analytics

**Design doc:** `docs/plans/2026-02-24-ux-conversion-redesign.md`

**Note:** Skip deep QA/testing — user will review in localhost before deployment.

---

### Task 1: Hero Section — Add $199 CTA + Tighten Subhead

**Files:**
- Modify: `src/components/sections/HeroSection.tsx:89-118`

**Step 1: Tighten the subhead (line 98-100)**

Replace the current 42-word subhead with a tighter version (~28 words):

```tsx
// CURRENT (line 98-100):
<p className="mt-8 text-primary-foreground/95 text-lg md:text-2xl max-w-4xl mx-auto hero-text-shadow font-sans leading-relaxed">
  I architect outcomes where AI can&apos;t. While others get lost in the noise of exponential change, I provide the Vision, Verification, and Resiliency to turn technical chaos into high-signal execution.
</p>

// NEW:
<p className="mt-8 text-primary-foreground/95 text-lg md:text-2xl max-w-4xl mx-auto hero-text-shadow font-sans leading-relaxed">
  I architect outcomes where AI can&apos;t — turning technical chaos into high-signal execution with Vision, Verification, and Resiliency.
</p>
```

**Step 2: Add a third CTA for the $199 offer (after line 117)**

Add a $199 announcement link below the two existing CTA buttons:

```tsx
// After the closing </div> of the CTA flex container (line 118), add:
<div className="mt-4">
  <a
    href="#services"
    className="inline-flex items-center gap-2 text-sm text-blue-200/80 hover:text-white transition-colors font-mono tracking-wide"
  >
    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
    New: Own Your Digital Identity — $199 flat
  </a>
</div>
```

**Step 3: Commit**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "Hero: tighten subhead, add $199 offer CTA link"
```

---

### Task 2: Create SpotlightSection Component

**Files:**
- Create: `src/components/sections/SpotlightSection.tsx`

**Step 1: Create the component**

This is a visually distinct callout card between NavigatorSection and AboutMeSection. It should use the site's existing design language (shadcn Card, Tailwind, Lucide icons) but stand out with a gradient border.

```tsx
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, FileText, Link2, Sparkles } from 'lucide-react';

const benefits = [
  { icon: Globe, text: "A professional site you own — not a Linktree" },
  { icon: FileText, text: "Your LinkedIn vibe + resume, translated into one platform" },
  { icon: Link2, text: "Social links, portfolio, and interview-ready storyline" },
  { icon: Sparkles, text: "Delivered in 2–4 days, $199 flat" },
];

export default function SpotlightSection() {
  return (
    <section className="py-12 md:py-16 px-4 scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <div className="relative rounded-2xl bg-gradient-to-br from-primary/5 via-background to-primary/5 border border-primary/20 p-8 md:p-12 shadow-lg">
          {/* Subtle gradient glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-xl -z-10" />

          <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-3">
            Entry Offer
          </p>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
            Not ready for a strategy call? Start here.
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Your resume is not enough in 2026. I build you an interview-ready digital identity site — one high-signal platform you own.
          </p>

          <ul className="space-y-4 mb-8">
            {benefits.map((b) => (
              <li key={b.text} className="flex items-start gap-3">
                <b.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground">{b.text}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="h-12 px-6 text-base font-bold">
              <a href="#services">
                Claim Your $199 Page
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <p className="text-sm text-muted-foreground self-center">
              No call required — just scroll to services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/sections/SpotlightSection.tsx
git commit -m "feat: add SpotlightSection for $199 Digital Identity offer"
```

---

### Task 3: Evolve Service 3 — "Implementation Library" → "AI Mentoring & Coaching"

**Files:**
- Modify: `src/components/sections/ServicesSection.tsx:99-118`

**Step 1: Replace the Service 3 data object (lines 99-118)**

```tsx
// REPLACE lines 99-118 with:
  {
    path: "SERVICE 3",
    title: "AI Mentoring & Mindset Coaching",
    basePrice: 97,
    maxPrice: 497,
    priceNote: "Per Session / Package",
    duration: "Ongoing",
    description: "AI isn't just a tool problem — it's a thinking problem. Most people aren't overwhelmed by the technology; they're overwhelmed by what it means for their future. I help you move from anxiety to agency.",
    payload: ["1-on-1 Mentoring", "Mindset Reframing", "Practical Tool Guidance", "Future-Optimistic Framework"],
    idealFor: "Anyone who feels personally or professionally overwhelmed by AI and wants to think — and feel — differently about what's coming.",
    details: [
      { title: "Mindset Before Toolset", text: "We start with how you think about AI, not how you use it. The shift from fear to agency unlocks everything else." },
      { title: "Practical & Personal", text: "Every session blends hands-on tool guidance with the bigger picture — how AI changes your role, your industry, and your opportunities." },
      { title: "Optimism Through Understanding", text: "The future isn't something that happens to you. I help you see AI as a lever for your ambitions, not a threat to your relevance." }
    ],
    cta: "Start Your AI Mentoring Journey",
    ctaLink: "https://calendar.app.google/nAHHwNMfhDvXGv7P7",
    highlight: false,
    icon: BookOpen
  }
```

**Step 2: Commit**

```bash
git add src/components/sections/ServicesSection.tsx
git commit -m "feat: evolve Service 3 from Implementation Library to AI Mentoring & Coaching"
```

---

### Task 4: Reduce Enterprise Prices by 15%

**Files:**
- Modify: `src/components/sections/ServicesSection.tsx:121-181`

**Step 1: Update Pillar 1 basePrice (line 125)**

```
12500 → 10625
```

**Step 2: Update Pillar 2 basePrice (line 144)**

```
15000 → 12750
```

**Step 3: Update Pillar 3 prices (lines 163-164)**

```
basePrice: 45000 → 38250
maxPrice: 65000 → 55250
```

**Step 4: Commit**

```bash
git add src/components/sections/ServicesSection.tsx
git commit -m "pricing: reduce enterprise service prices by 15%"
```

---

### Task 5: Create AIMentoringSection Component

**Files:**
- Create: `src/components/sections/AIMentoringSection.tsx`

**Step 1: Create the dedicated AI Mentoring philosophy section**

This section goes after ServicesSection and before EmailCaptureSection. It expands on the mentoring philosophy — empathetic tone, distinct from the "execution-first" voice elsewhere.

```tsx
"use client";

import { Button } from '@/components/ui/button';
import { Heart, Lightbulb, TrendingUp, CalendarDays } from 'lucide-react';

const pillars = [
  {
    icon: Heart,
    title: "From Fear to Understanding",
    description: "AI anxiety is real and valid. We start by acknowledging what you're feeling — then we replace uncertainty with clarity about what AI actually means for your work and life."
  },
  {
    icon: Lightbulb,
    title: "From Understanding to Agency",
    description: "Once the fog lifts, we build your personal AI literacy — not generic training, but the specific skills and mental models that matter for your role and ambitions."
  },
  {
    icon: TrendingUp,
    title: "From Agency to Optimism",
    description: "The future isn't something that happens to you. With the right frame, AI becomes a lever for your goals — more time, more creative output, more impact."
  }
];

export default function AIMentoringSection() {
  return (
    <section id="ai-mentoring" className="py-16 md:py-24 px-4 bg-secondary scroll-mt-20">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-mono text-primary uppercase tracking-widest mb-3">
            AI Mentoring
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            You don&apos;t need another AI course.<br className="hidden sm:block" />
            You need someone in your corner.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Most AI &quot;training&quot; teaches tools. I mentor people. Whether you&apos;re a seasoned executive or early in your career, the real barrier isn&apos;t technical — it&apos;s the story you&apos;re telling yourself about what&apos;s coming.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-background rounded-xl p-6 shadow-sm border border-border"
            >
              <pillar.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            This isn&apos;t for everyone — it&apos;s for people who want to lead their own AI journey, not be dragged along by it. Sessions start at $97.
          </p>
          <Button asChild size="lg" className="h-12 px-8 text-base font-bold">
            <a href="https://calendar.app.google/nAHHwNMfhDvXGv7P7" target="_blank" rel="noopener noreferrer">
              <CalendarDays className="mr-2 h-5 w-5" />
              Book a Mentoring Session
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/sections/AIMentoringSection.tsx
git commit -m "feat: add dedicated AI Mentoring section"
```

---

### Task 6: Wire New Sections into page.tsx

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Add imports for the two new sections**

Add after the existing imports (after line 14):

```tsx
import SpotlightSection from '@/components/sections/SpotlightSection';
import AIMentoringSection from '@/components/sections/AIMentoringSection';
```

**Step 2: Insert SpotlightSection after NavigatorSection (after line 27)**

```tsx
      {/* SPOTLIGHT — $199 Digital Identity gateway offer */}
      <SpotlightSection />
```

**Step 3: Insert AIMentoringSection after ServicesSection (after line 38)**

```tsx
      {/* MENTORING — AI mindset coaching for the overwhelmed */}
      <AIMentoringSection />
```

**Step 4: The final page.tsx should have this render order:**

```
HeroSection
ChallengeSection
AccountabilityGapSection
NavigatorSection
SpotlightSection          ← NEW
AboutMeSection
FeaturedInSection
WhyWorkWithMeSection
TestimonialsSection
ServicesSection
AIMentoringSection        ← NEW
EmailCaptureSection
SubstackSection
ThoughtLeadershipSection
ConnectSection
```

**Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire SpotlightSection and AIMentoringSection into page"
```

---

### Task 7: Fix Firebase debug_mode

**Files:**
- Modify: `src/components/analytics/FirebaseAnalytics.tsx:34-39`

**Step 1: Remove debug_mode and console.logs**

```tsx
// CURRENT (lines 32-41):
console.log('📊 Firebase Analytics: Attempting to log page_view for', url);
logEvent(analytics, 'page_view', {
  page_path: url,
  page_title: document.title,
  page_location: window.location.href,
  debug_mode: true
});
console.log('✅ Firebase Analytics: Page view event sent to SDK queue');

// NEW:
logEvent(analytics, 'page_view', {
  page_path: url,
  page_title: document.title,
  page_location: window.location.href,
});
```

**Step 2: Commit**

```bash
git add src/components/analytics/FirebaseAnalytics.tsx
git commit -m "fix: remove debug_mode and console.logs from Firebase Analytics"
```

---

### Task 8: Wire Analytics Events on CTAs

**Files:**
- Modify: `src/components/sections/HeroSection.tsx` (add trackEvent to CTA clicks)
- Modify: `src/components/sections/ConnectSection.tsx` (add trackConversion to booking CTA)
- Modify: `src/components/sections/SpotlightSection.tsx` (add trackEvent)
- Modify: `src/components/sections/AIMentoringSection.tsx` (add trackEvent)

**Step 1: Add analytics imports and onClick handlers to HeroSection**

At top of HeroSection.tsx, add import:
```tsx
import { trackEvent, trackConversion } from '@/lib/analytics';
```

On the "Book a Free Strategy Call" button `<a>` tag (line 104), add:
```tsx
onClick={() => trackConversion('hero_book_call')}
```

On the "See How I Work" button `<a>` tag (line 114), add:
```tsx
onClick={() => trackEvent('hero_see_services')}
```

On the new $199 announcement link, add:
```tsx
onClick={() => trackEvent('hero_199_spotlight_click')}
```

**Step 2: Add analytics to ConnectSection**

Read ConnectSection.tsx, find the booking CTA `<a>` tag, add:
```tsx
onClick={() => trackConversion('connect_book_call')}
```

**Step 3: Add analytics to SpotlightSection**

On the "Claim Your $199 Page" button:
```tsx
onClick={() => trackEvent('spotlight_claim_199')}
```

**Step 4: Add analytics to AIMentoringSection**

On the "Book a Mentoring Session" button:
```tsx
onClick={() => trackConversion('mentoring_book_session', 97)}
```

**Step 5: Remove console.log from analytics.ts (line 44)**

```tsx
// REMOVE this line:
console.log(`📊 Firebase Analytics: Event tracked - ${eventName}`, eventParams);
```

**Step 6: Commit**

```bash
git add src/components/sections/HeroSection.tsx src/components/sections/ConnectSection.tsx src/components/sections/SpotlightSection.tsx src/components/sections/AIMentoringSection.tsx src/lib/analytics.ts
git commit -m "feat: wire trackEvent/trackConversion on all major CTAs"
```

---

### Task 9: Add sitemap.xml + robots.txt (Next.js native)

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

**Step 1: Create sitemap.ts**

```ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thearmchairfuturist.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
```

**Step 2: Create robots.ts**

```ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://thearmchairfuturist.com/sitemap.xml',
  };
}
```

**Step 3: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts
git commit -m "seo: add sitemap.xml and robots.txt via Next.js metadata API"
```

---

### Task 10: Add JSON-LD Structured Data

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Add JSON-LD script in the `<head>` via metadata export**

After the existing `metadata` export (after line 62), add a JSON-LD component rendered in the body or use Next.js `metadata.other` approach. Simplest: add a `<script>` tag inside the `<body>` before `<Header />`:

```tsx
// Add after line 89 (<FirebaseAnalytics />), before <Header />:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "The Armchair Futurist - Alex Myers",
      "description": "Advisor to leaders navigating AI, change, and the future of work with grounded, human-first strategy.",
      "url": "https://thearmchairfuturist.com",
      "image": "https://thearmchairfuturist.com/floop.jpg",
      "founder": {
        "@type": "Person",
        "name": "Alex Myers",
        "jobTitle": "Certified Futurist & AI Strategy Advisor",
        "url": "https://linkedin.com/in/alex-myers-34572a10/"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "PT"
      },
      "priceRange": "$199 - $65,000",
      "areaServed": "Worldwide"
    })
  }}
/>
```

**Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "seo: add JSON-LD structured data for ProfessionalService"
```

---

### Task 11: Quick Dev Server Smoke Test

**Step 1: Start the dev server**

```bash
cd /c/Users/Administrator/Documents/Projects/ArmchairFuturistLanding
npm run dev
```

**Step 2: Open localhost in browser and verify:**
- Hero shows new $199 announcement link
- SpotlightSection appears between Navigator and About
- Services section shows "AI Mentoring & Mindset Coaching" as Service 3
- Enterprise prices are reduced (Pillar 1: $10,625, Pillar 2: $12,750/mo, Pillar 3: $38,250-$55,250)
- AIMentoringSection appears after Services
- No console errors

**Step 3: User reviews in localhost before deployment**

---

## Summary of All Changes

| # | What | Files | Type |
|---|------|-------|------|
| 1 | Hero: tighten subhead + $199 CTA | HeroSection.tsx | Modify |
| 2 | $199 Spotlight callout card | SpotlightSection.tsx | Create |
| 3 | Service 3 → AI Mentoring | ServicesSection.tsx | Modify |
| 4 | Enterprise prices -15% | ServicesSection.tsx | Modify |
| 5 | Dedicated AI Mentoring section | AIMentoringSection.tsx | Create |
| 6 | Wire new sections into page | page.tsx | Modify |
| 7 | Fix Firebase debug_mode | FirebaseAnalytics.tsx | Modify |
| 8 | Wire analytics on CTAs | Multiple files | Modify |
| 9 | Add sitemap + robots.txt | sitemap.ts, robots.ts | Create |
| 10 | Add JSON-LD structured data | layout.tsx | Modify |
| 11 | Dev server smoke test | — | Verify |
