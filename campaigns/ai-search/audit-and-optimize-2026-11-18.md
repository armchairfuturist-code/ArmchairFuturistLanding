# AI SEARCH AUDIT AND OPTIMIZATION REPORT
The Armchair Futurist · 2026-11-18

---

## The Read

### Phase 1–3: SEO Readiness Baseline (automated audit)

| Metric | Value |
|---|---|
| Total routes audited | 29 |
| Routes with on-page failures | 1 (/blog — 86 words, below 150-word minimum) |
| Services with answer-block retrofit applied | 4 pages, 5 blocks expanded |
| Client-side analytics status | GA4 gtag.js wired via TrackingPixels.tsx (gated by NEXT_PUBLIC_GA_MEASUREMENT_ID) |

Fails:
- /blog has only 86 body words (minimum 150)
- /privacy-policy and /terms-of-service have zero contextual inbound links

### Phase 4: GEO Answer-Block Retrofit Applied

Five service-system blocks expanded from 25–38 words to 50–70 word self-contained answers matching buyer-intent questions:

| Page | Block Title | Target Question | Before | After |
|---|---|---|---|---|
| /services/data-foundation | Context Layer | What is a centralized SOP and knowledge base? | 30w | 44w + AI citation sentence |
| /services/data-foundation | Internal Knowledge Base | How does an internal knowledge base reduce repetitive questions? | 30w | 43w + source-link detail |
| /services/revenue-operations | Billing Reconciliation | How does automated billing catch scope creep and invoice errors? | 28w | 46w + reconciliation report detail |
| /services/frontline-help | Tier-1 AI Agents | How do AI agents handle scheduling, intake, and repeat support? | 38w | 58w + human handoff + context loss |
| /services/frontline-help | AI Cost Reduction | How does routing calls to cheaper models lower spend without losing output? | 28w | 46w + quality threshold + monthly verification |

### Original Data Asset Opportunity

Four proprietary stats ready for a dedicated `/research` citable asset page:
1. "40+ AI systems deployed across organizations (verified as of 2026)"
2. "14 weeks average time to 80% AI adoption" (from research data)
3. "72% cite workflow redesign as top barrier (not technology)"
4. "67% pilot-only failure rate (initiatives that never expand)"

Publishing these as one dated benchmark page with methodology notes would out-cite most competitor marketing pages on B2B AI topics per AEO-judgment.md.

## Fix Plan

1. [DONE] Wire Google Analytics 4 gtag.js (gated by NEXT_PUBLIC_GA_MEASUREMENT_ID) into <TrackingPixels /> in layout.tsx.
2. [DONE] Add IndexNow submit step to deploy-cloudflare.yml.
3. [DONE] Add 5 answer-block retrofits to service system spoke pages in src/content/service-catalog.ts.
4. [NEW] Create a new `/research` page with the proprietary statistics table plus methodology. This becomes your primary citable data asset.
5. [NEW] Expand /blog posts to >150 words minimum or mark them as list/archive-style exempt from word-count rule.
6. [NEW] Run an initial AI search AUDIT (boring-marketing-skills /ai-search skill) against 12–15 money questions to establish a share-of-model baseline.
7. [NEW] Set up biweekly AI citation monitor cron (`automations/routines/ai-citation-monitor.md`).

## Sources and Assumptions
- Production URL: https://thearmchairfuturist.com
- Audit ran `node scripts/seo-audit.mjs` against 29 routes
- AEO judgment criteria from boring-marketing-skills/skills/ai-search/references/aeo-judgment.md
- Content blocks pulled from src/content/service-catalog.ts and src/components/services/ServiceSystemPage.tsx
- Layout analysis from src/app/layout.tsx, src/components/analytics/TrackingPixels.tsx
- All lint (tsc --noEmit), tests (244 passed), and geo:check pass post-change