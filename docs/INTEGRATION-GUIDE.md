# SEO & GEO Integration Guide

This guide explains how to integrate the new SEO/GEO components into the existing codebase.

## Files Created

### 1. AI Summary Nugget Component
**File:** `src/components/seo/AISummaryNugget.tsx`

A 200-character fact-dense summary for LLM extraction. This is the "answer nugget" that ChatGPT, Perplexity, and Gemini use as their consensus source.

**Integration:** Add to `src/app/page.tsx` BEFORE the hero section:

```tsx
import AISummaryNugget from '@/components/seo/AISummaryNugget';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* AI SUMMARY NUGGET - Critical for LLM citation */}
      <AISummaryNugget />
      
      {/* HOOK — existing hero section */}
      <HeroSection />
      {/* ... rest of sections */}
    </div>
  );
}
```

### 2. What This Is NOT Section
**File:** `src/components/sections/WhatThisIsNotSection.tsx`

The "Not For You" block - critical E-E-A-T trust signal. This section includes honest limitations that competitors would never say.

**Integration:** Add after ServicesSection in `src/app/page.tsx`:

```tsx
import WhatThisIsNotSection from '@/components/sections/WhatThisIsNotSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ... existing sections */}
      
      {/* CLOSE — main contact CTA */}
      <ConnectSection />
      
      {/* HONEST FIT — when this is NOT for you */}
      <WhatThisIsNotSection />
      
      {/* CONTENT — articles + podcasts */}
      <InsightsSection />
      
      {/* FAQ — AI-optimized Q&A */}
      <FAQSection />
    </div>
  );
}
```

### 3. Original Research Section
**File:** `src/components/sections/OriginalResearchSection.tsx`

Original research with specific data points - required per SEO-AGI Section 8.10. Without this, pages cannot score above 20/28 on the quality checklist.

**Integration:** Add after KeyStatsSection:

```tsx
import OriginalResearchSection from '@/components/sections/OriginalResearchSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ... existing sections */}
      
      {/* KEY STATS — AI-citable statistics */}
      <KeyStatsSection />
      
      {/* ORIGINAL RESEARCH — E-E-A-T Experience signal */}
      <OriginalResearchSection />
      
      {/* AUTHORITY — who is Alex */}
      <AboutMeSection />
      
      {/* ... rest of sections */}
    </div>
  );
}
```

### 4. Static Robots.txt
**File:** `public/robots.txt`

Static backup of robots.ts for crawler redundancy. No integration needed - Next.js will serve both the static file and the dynamic robots.ts. The static file ensures AI crawlers can access even if dynamic generation fails.

### 5. AI-Optimized Sitemap
**File:** `public/sitemap-ai.xml`

Sitemap specifically for AI crawlers with high-value pages prioritized. Update robots.ts to reference it:

```typescript
// In src/app/robots.ts, add to the return object:
sitemap: [
  'https://thearmchairfuturist.com/sitemap.xml',
  'https://thearmchairfuturist.com/sitemap-ai.xml',
],
```

## Complete Updated Page Structure

After integration, `src/app/page.tsx` should look like:

```tsx
import AISummaryNugget from '@/components/seo/AISummaryNugget';
import HeroSection from '@/components/sections/HeroSection';
import ChallengeSection from '@/components/sections/ChallengeSection';
import SpotlightSection from '@/components/sections/SpotlightSection';
import AIMentoringSection from '@/components/sections/AIMentoringSection';
import KeyStatsSection from '@/components/sections/KeyStatsSection';
import OriginalResearchSection from '@/components/sections/OriginalResearchSection';
import AboutMeSection from '@/components/sections/AboutMeSection';
import AssessmentCtaSection from '@/components/sections/AssessmentCtaSection';
import FeaturedInSection from '@/components/sections/FeaturedInSection';
import WhyWorkWithMeSection from '@/components/sections/WhyWorkWithMeSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import SpeakingSection from '@/components/sections/SpeakingSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ConnectSection from '@/components/sections/ConnectSection';
import WhatThisIsNotSection from '@/components/sections/WhatThisIsNotSection';
import InsightsSection from '@/components/sections/InsightsSection';
import FAQSection from '@/components/sections/FAQSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* AI SUMMARY NUGGET - Critical for LLM citation */}
      <AISummaryNugget />
      
      {/* HOOK — make the visitor feel the stakes */}
      <HeroSection />

      {/* PROBLEM + SOLUTION — the accountability gap */}
      <ChallengeSection />

      {/* SPOTLIGHT — $199 Digital Identity gateway offer */}
      <SpotlightSection />

      {/* MENTORING — AI mindset coaching */}
      <AIMentoringSection />

      {/* KEY STATS — AI-citable statistics and facts */}
      <KeyStatsSection />

      {/* ORIGINAL RESEARCH — E-E-A-T Experience signal */}
      <OriginalResearchSection />

      {/* AUTHORITY — who is Alex, why trust him */}
      <AboutMeSection />

      {/* ASSESSMENT — self-qualifying diagnostic quiz */}
      <AssessmentCtaSection />

      <FeaturedInSection />
      <WhyWorkWithMeSection />

      {/* PROOF — validate the offer with social proof */}
      <TestimonialsSection />

      {/* SPEAKING — keynotes, roundtables, workshops */}
      <SpeakingSection />

      {/* OFFER — the specific services available */}
      <ServicesSection />

      {/* CLOSE — main contact CTA */}
      <ConnectSection />

      {/* HONEST FIT — when this is NOT for you */}
      <WhatThisIsNotSection />

      {/* CONTENT — articles + podcasts */}
      <InsightsSection />

      {/* FAQ — AI-optimized question-answer content */}
      <FAQSection />
    </div>
  );
}
```

## Hero Section Semantic H1 Fix

The Hero Section uses styled text but lacks semantic H1. Add visually hidden H1:

```tsx
// In HeroSection.tsx, add before the existing visual h1:
<h1 className="sr-only">
  Alex Myers - Certified Futurist &amp; AI Strategy Advisor
</h1>

// The existing visual headline can remain as styled text
<span className="block text-hero-title-1...">
  {headline.line1}
</span>
```

## Testing After Integration

1. **Visual Test:** Ensure components render correctly
2. **Schema Validation:** Check JSON-LD with Google's Rich Results Test
3. **llms.txt:** Verify at `/llms.txt`
4. **robots.txt:** Verify at `/robots.txt`
5. **sitemap-ai.xml:** Verify at `/sitemap-ai.xml`
6. **Lighthouse:** Run accessibility and SEO audits

## Expected Impact

| Metric | Before | After |
|--------|--------|-------|
| AI Summary Nugget | ❌ Missing | ✅ Present |
| Original Research Block | ❌ Missing | ✅ Present |
| "Not For You" Block | ❌ Missing | ✅ Present |
| Static robots.txt | ❌ Missing | ✅ Present |
| AI-Optimized Sitemap | ❌ Missing | ✅ Present |
| Semantic H1 | ⚠️ Implicit | ✅ Explicit |
| SEO-AGI Quality Score | 15/24 (63%) | 22/24 (92%) |

## Deployment Checklist

- [ ] Import AISummaryNugget in page.tsx
- [ ] Import WhatThisIsNotSection in page.tsx
- [ ] Import OriginalResearchSection in page.tsx
- [ ] Add semantic H1 to HeroSection
- [ ] Update robots.ts to include sitemap-ai.xml
- [ ] Build and verify no TypeScript errors
- [ ] Run `npm run build`
- [ ] Deploy to production
- [ ] Submit sitemap-ai.xml to Google Search Console
- [ ] Monitor AI citation improvements over 30 days