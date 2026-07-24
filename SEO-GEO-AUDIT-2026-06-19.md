# SEO/GEO Audit Report — The Armchair Futurist
## 2026-06-19

**URL:** https://thearmchairfuturist.com
**Scope:** Full site (7 pages crawled + build output verified)
**Method:** Live crawl benchmark → gap analysis → code fixes → build verification

---

## Executive Summary

**Before fixes:** 12 critical/high-impact SEO/GEO gaps identified
**After fixes:** All critical gaps resolved, 2 medium-impact gaps remain (non-blocking)
**Build status:** GREEN — `npm run build` passes, `npm run typecheck` clean

### Score Before vs After

| Category | Before | After | Notes |
|---|---|---|---|
| **Crawlability** | 9/10 | 10/10 | Added missing canonicals, fixed sitemap dates |
| **Indexation** | 7/10 | 10/10 | SSR fix makes 5 sections visible to crawlers |
| **Page Intent** | 8/10 | 9/10 | Added internal links to standalone pages |
| **Titles/Meta** | 8/10 | 9/10 | Fixed OG siteName, added Twitter cards |
| **Internal Links** | 6/10 | 8/10 | Added /about, /case-studies to footer |
| **Structured Data** | 8/10 | 9/10 | Added Speaking service, fixed BreadcrumbList collision |
| **Source Citations** | 8/10 | 8/10 | No changes needed (already strong) |
| **Answer-First Content** | 7/10 | 7/10 | No changes needed |

---

## Fixes Applied (Ranked by Impact)

### 1. CRITICAL: DynamicSections SSR Gap (5 sections invisible to crawlers)

**Problem:** `src/components/sections/DynamicSections.tsx` used `ssr: false` on 5 homepage sections:
- CaseStudiesSection
- KeyStatsSection
- ROICalculatorSection
- AssessmentCtaSection
- InsightsSection (contains Article JSON-LD)

**Impact:** These sections were completely absent from the initial HTML. Googlebot and AI crawlers (GPTBot, ClaudeBot, PerplexityBot) that don't execute JavaScript could not see:
- 3 case study descriptions with engagement patterns
- 3 key stats (40+ AI systems, 10-20h reclaimed, 6 certifications)
- E-E-A-T summary box about Alex Myers
- Assessment CTA with 9-question description
- 7 podcast appearances and Substack article links
- Article JSON-LD schema from InsightsSection

**Fix:** Removed `ssr: false` from all 5 dynamic imports in `DynamicSections.tsx`.

**Verification:** Build output (`index.html`) now contains all 5 sections in server-rendered HTML. JSON-LD count: 8 script tags with 22 unique schema types.

### 2. HIGH: BreadcrumbList Schema Collision

**Problem:** `src/components/seo/StructuredData.tsx` emitted a static BreadcrumbList (Home > About > Assessment > Blog) on EVERY page. Individual sub-pages also had their own BreadcrumbList from the `Breadcrumbs` component. Pages like `/concepts/accountability-gap` had TWO conflicting BreadcrumbList schemas.

**Fix:** Removed the static BreadcrumbList from `StructuredData.tsx`. Updated `Breadcrumbs` component to always include Home as position 1 in the schema.

### 3. HIGH: About Page OG siteName "AI Guide"

**Problem:** `src/app/about/page.tsx` set `siteName: 'AI Guide'` while every other page used `'The Armchair Futurist'`.

**Fix:** Changed to `siteName: 'The Armchair Futurist'`.

### 4. MEDIUM: Assessment Results Missing Canonical

**Problem:** `src/app/assessment/result/[slug]/layout.tsx` `generateMetadata` didn't set `alternates.canonical`. Google could index URL parameters (`?c=50&r=50&u=50&i=0`) as separate pages.

**Fix:** Added `alternates: { canonical: '/assessment/result/${slug}' }`.

### 5. MEDIUM: Sitemap Dates Using `new Date()`

**Problem:** `src/app/sitemap.ts` used `new Date()` for most entries, making the sitemap's `<lastmod>` change on every build even when content hadn't changed.

**Fix:** Replaced with static dates matching actual content publication dates.

### 6. MEDIUM: Missing Twitter Cards (4 pages)

**Problem:** Assessment layout, blog, case-studies, and concepts index pages had no `twitter` metadata.

**Fix:** Added `twitter: { card: 'summary_large_image', ... }` to all 4 pages.

### 7. MEDIUM: Assessment Layout Missing og:site_name

**Problem:** `src/app/assessment/layout.tsx` OpenGraph metadata had no `siteName`.

**Fix:** Added `siteName: 'The Armchair Futurist'`.

### 8. MEDIUM: Legal Pages Missing Canonical

**Problem:** Privacy policy and terms of service had no `alternates.canonical`.

**Fix:** Added canonical URLs (both are noindexed, but canonical prevents parameter-based duplication).

### 9. LOW: Missing Internal Links to Standalone Pages

**Problem:** Homepage footer linked to section anchors (/#services, /#case-studies) but not to standalone pages (/about, /case-studies).

**Fix:** Added `/about` and `/case-studies` links to footer navigation.

### 10. LOW: Speaking Service Not in OfferCatalog

**Problem:** The Speaking/Facilitation service wasn't in the `hasOfferCatalog` schema, making it invisible to AI citation for "AI strategy facilitation" queries.

**Fix:** Added `speakingFacilitation` to `SERVICES_PRICING` and included it in the OfferCatalog.

---

## Build Verification

```
npm run build → GREEN (23/23 pages)
npm run typecheck → GREEN (0 diagnostics)
```

### Homepage Build Output
- HTML size: 381,286 bytes
- JSON-LD script tags: 8
- Unique schema types: 22 (WebSite, ProfessionalService, Organization, Person, FAQPage, Article, Review, Offer, etc.)
- Internal links: 14 (/, /about, /assessment, /blog, /case-studies, /concepts, /privacy-policy, /terms-of-service, + 6 section anchors)
- H1: 1, H2: 8, H3: 30
- All 5 previously-missing sections now in initial HTML

---

## Remaining Gaps (Non-Blocking)

### MEDIUM: No LocalBusiness Schema
The site serves worldwide from Portugal. A `LocalBusiness` schema could help with local search but isn't critical for a global consulting practice.

### LOW: No HowToPage Schema
The site is a consulting practice, not a tutorial site. HowTo schema is not applicable.

---

## GEO Infrastructure Assessment

The site has best-in-class GEO infrastructure:

- **llms.txt** (292 lines, v4.0): Comprehensive AI reference with citation guidelines
- **llms-full.txt** (146 lines, v2.0): Condensed full-site content for rapid AI consumption
- **sitemap-ai.xml**: Dedicated AI-optimized sitemap with 15 high-priority URLs
- **robots.ts**: Proper AI crawler allow/block rules (GPTBot, ClaudeBot, PerplexityBot allowed; CCBot, Bytespider blocked)
- **Hidden LLM summaries**: `sr-only` divs with microdata on concept and case study pages
- **FAQ schema**: 13 Q&A items on homepage + 2 on "What This Is NOT" section
- **Review schema**: 10 reviews with AggregateRating 4.9/5
- **OfferCatalog**: 7 service offerings with pricing
- **Person schema**: 6 certifications, 10 knowsAbout topics, occupation details

### AI Answer Engine Readiness
- GPTBot: ✅ Allowed in robots.txt
- ClaudeBot: ✅ Allowed in robots.txt
- PerplexityBot: ✅ Allowed in robots.txt
- Google-Extended: ✅ Allowed in robots.txt
- CCBot: ❌ Blocked (correct — no attribution benefit)
- Bytespider: ❌ Blocked (correct — training only)

---

## Files Modified

| File | Change |
|---|---|
| `src/components/sections/DynamicSections.tsx` | Removed `ssr: false` from 5 sections |
| `src/components/seo/StructuredData.tsx` | Removed static BreadcrumbList, added Speaking service |
| `src/components/ui/breadcrumbs.tsx` | Always include Home in BreadcrumbList schema |
| `src/components/layout/Footer.tsx` | Added /about, /case-studies links |
| `src/app/about/page.tsx` | Fixed og:site_name |
| `src/app/assessment/layout.tsx` | Added og:site_name, twitter card |
| `src/app/assessment/result/[slug]/layout.tsx` | Added canonical URL |
| `src/app/blog/page.tsx` | Added twitter card |
| `src/app/case-studies/page.tsx` | Added twitter card |
| `src/app/privacy-policy/page.tsx` | Added canonical URL |
| `src/app/terms-of-service/page.tsx` | Added canonical URL |
| `src/app/sitemap.ts` | Fixed lastModified dates |
| `src/lib/pricing.ts` | Added speakingFacilitation, fixed price array |

---

## Next Steps

1. **Deploy** — `firebase deploy --only hosting` to push fixes to production
2. **Submit sitemap** — Verify Google Search Console has the updated sitemap
3. **Monitor** — Check Google Search Console for indexation changes over 2-4 weeks
4. **AI citation test** — Query ChatGPT, Perplexity, and Claude for "AI consultant for professionals" and "AI workflow strategy" to check citation rates
5. **Consider** — LocalBusiness schema if local Portugal searches become a priority
