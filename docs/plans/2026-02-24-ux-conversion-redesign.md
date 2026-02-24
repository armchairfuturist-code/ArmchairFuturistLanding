# UX & Conversion Redesign — The Armchair Futurist

**Date:** 2026-02-24
**Status:** Approved
**Primary audience:** Solo founders & professionals (LinkedIn/Substack traffic)
**Goal:** Improve UX, increase bookings, add AI Mentoring service, spotlight $199 offer

---

## Context

The site is a single-page Next.js 15 app (Tailwind + shadcn/ui + Framer Motion) with 13 sections following an AIDA funnel pattern. Traffic comes primarily from LinkedIn and Substack. The $199 Digital Identity landing page is the primary entry offer for solo founders.

### Problems Identified

1. **$199 offer is buried** — accordion item in section 9 of 13
2. **No AI Mentoring service** — gap between $199 landing page and $1K+ provisioning
3. **Enterprise prices need 15% reduction** across all three pillars
4. **Missing SEO basics** — no sitemap.xml, robots.txt, or JSON-LD
5. **Analytics not wired** — trackEvent/trackConversion exist but are never called
6. **Firebase debug_mode: true** in production
7. **Favicon is .jpg** — non-standard format

### What's Working (Keep)

- Hero messaging ("Intelligence is cheap. Trust is the new scarcity.")
- Thought leadership sections (Challenge, AccountabilityGap, Navigator)
- About Me section, FeaturedIn logos, WhyWorkWithMe framework
- All 9 testimonials, Substack integration, podcast section
- Video background, scroll animations, overall visual design

---

## Design

### 1. Hero — Minor Tweaks

- Add a **third CTA button** or slim banner below hero: "Start with a $199 Digital Identity"
- Tighten subhead from 42 words to ~25-30 while keeping meaning
- Keep "Intelligence is cheap. Trust is the new scarcity." H1 unchanged
- Keep video background, stats bar, existing primary/secondary CTAs

### 2. New "$199 Spotlight" Card (between NavigatorSection and AboutMeSection)

A visually distinct callout card — not a full-width section, more of an attention-interrupt:
- Headline: "Not ready for a strategy call? Start here."
- 3-4 bullet summary of the $199 offer
- Direct CTA button linking to services section or intake flow
- Styled distinctly (e.g., gradient border, subtle glow) to break the scroll pattern

### 3. Service 3 Evolution: "Implementation Library" → "AI Mentoring & Coaching"

**Current:** "The Implementation Library" — $47-$497 one-time, templates/blueprints
**New:** "AI Mentoring & Mindset Coaching"

- **Framing:** AI isn't just a tool problem — it's a thinking problem. Most people aren't overwhelmed by the technology; they're overwhelmed by what it means.
- **Includes:** 1-on-1 mentoring sessions, mindset reframing (fear → agency → optimism), practical tool guidance, future-optimistic thinking framework
- **Price range:** $97-$497 (per session / package options)
- **Ideal for:** Anyone who feels personally or professionally anxious about AI
- **Tone:** Empathetic, warm — distinct from "execution-first" voice elsewhere
- **CTA:** "Start Your AI Mentoring Journey" or similar

### 4. New Dedicated AI Mentoring Section (after ServicesSection)

Full section expanding the mentoring philosophy:
- Why mentoring, not just training — it's about how you think, not just what tools you use
- The mindset shift: from fear → understanding → agency → optimism
- Who it's for: professionals at any level, not just founders/technical people
- 3 pillars or cards explaining the approach
- CTA to book a mentoring session

### 5. Enterprise Prices — 15% Reduction

| Service | Current | New |
|---------|---------|-----|
| Psychology-Led Adoption Strategy | $12,500 | $10,625 |
| Distributed Authority Architect | $15,000/mo | $12,750/mo |
| AI Infusion Lab | $45,000-$65,000 | $38,250-$55,250 |

Keep the 3-tier variable pricing logic (Standard / Emerging Market PPP / High-Readiness Agile).
Keep the same percentage discounts for PPP (60%) and High-Readiness (85%).

### 6. Technical Fixes

- **sitemap.xml** — auto-generated via Next.js sitemap config
- **robots.txt** — allow all, point to sitemap
- **JSON-LD** — Person schema + ProfessionalService schema in layout
- **Firebase** — set debug_mode to false (or conditional on NODE_ENV)
- **Analytics** — wire trackEvent() on all CTA clicks, trackConversion() on booking link clicks
- **Favicon** — convert to proper .ico or .png with apple-touch-icon

### 7. Updated Page Section Order

```
1.  HeroSection (tweaked — add $199 mention)
2.  ChallengeSection (unchanged)
3.  AccountabilityGapSection (unchanged)
4.  NavigatorSection (unchanged)
5.  ★ NEW: SpotlightSection ($199 Digital Identity callout)
6.  AboutMeSection (unchanged)
7.  FeaturedInSection (unchanged)
8.  WhyWorkWithMeSection (unchanged)
9.  TestimonialsSection (unchanged)
10. ServicesSection (Service 3 → AI Mentoring, enterprise -15%)
11. ★ NEW: AIMentoringSection (dedicated mentoring philosophy section)
12. EmailCaptureSection (unchanged)
13. SubstackSection (unchanged)
14. ThoughtLeadershipSection (unchanged)
15. ConnectSection (unchanged)
```

---

## Out of Scope (Future Work)

- Payment workflow integration (Stripe, etc.)
- Intake form for $199 offer
- Email service for the free report (replacing Substack capture)
- On-site blog (migrating content from Substack)
- Exit-intent or scroll-triggered conversion elements
