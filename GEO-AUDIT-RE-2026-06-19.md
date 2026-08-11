# GEO Re-Audit Pass — AI Answer Engine Optimization

**Date:** 2026-06-19
**Scope:** Generative Engine Optimization (GEO) only — ranking in ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews.
**Method:** Independent re-audit. Verified prior audit claims against actual code/rendered output (not docs), then hunted for gaps and fixed them.

---

## Verification of prior claims (all CONFIRMED live, not just documented)

| Claim | Status | Evidence |
|---|---|---|
| `llms.txt` v4.0 comprehensive | ✅ Live | 292 lines, structured, citation guidelines present |
| `llms-full.txt` content dump | ✅ Live | Full site content in markdown |
| Global JSON-LD: WebSite + ProfessionalService + Organization + Person | ✅ Live | Emitted on every page via `StructuredData.tsx`; Person has `credentials`, `knowsAbout`, `sameAs`, `hasOccupation` |
| FAQPage schema on homepage | ✅ Live | `FAQSection.tsx` |
| AI-crawler allowlist in robots | ✅ Live | `robots.ts` allows GPTBot, OAI-SearchBot, ChatGPT-User, Google-Extended, PerplexityBot, ClaudeBot, Applebot; blocks CCBot, anthropic-ai, Bytespider, cohere-ai |
| Concept sub-routes resolve (no 404s) | ✅ Live | All 5 concept routes exist with per-page JSON-LD |
| Case studies + assessment results JSON-LD | ✅ Live | Per-page schema present |
| Content is server-rendered (not client-only) | ✅ Live | Build prerenders 24 static routes |

**Prior "82/100 → all critical gaps resolved" claim: accurate.** The foundation is genuinely strong.

---

## Gaps found this pass + fixes applied

### 🔴 1. `/how-i-work` was orphaned from all AI-discovery surfaces
The highest-value E-E-A-T page on the site — it documents **verifiable, shipped agent infrastructure** (Hermes v0.19, DeepSeek V4 Pro/Flash, ~8 cron jobs, guardrails, public proof) — was referenced in **none** of:
- `sitemap.ts` (the canonical `/sitemap.xml`)
- `public/sitemap-ai.xml`
- `public/llms.txt`
- `public/llms-full.txt`

It was only reachable via the Header nav link. AI engines that prioritize sitemaps/`llms.txt` (most do) would undervalue or miss it entirely. This is exactly the "training.md for how I work" content that should rank for *how does Alex Myers use AI agents* type queries.

**Fixed:** added `/how-i-work` to all four surfaces.

### 🔴 2. `sitemap-ai.xml` was orphaned (not referenced in robots)
The AI-optimized sitemap existed at `/sitemap-ai.xml` but `robots.ts`/`robots.txt` only declared `/sitemap.xml`. AI crawlers reading robots.txt could not discover it.

**Fixed:** `robots.ts` now emits both sitemaps (array); `public/robots.txt` mirror updated. Verified in rendered `robots.txt`.

### 🟡 3. `/blog` missing from `llms.txt`
Present in both sitemaps but absent from `llms.txt` Main Pages.

**Fixed:** added to `llms.txt` Main Pages.

### 🟡 4. `/how-i-work` had no page-specific JSON-LD
Only inherited global schema. Adding `Article` schema gives AI engines explicit authorship attribution + `about` entities for citation.

**Fixed:** inlined `Article` JSON-LD (author = Alex Myers, publisher = The Armchair Futurist, `about` = [AI agent infrastructure, Hermes agent, DeepSeek V4, autonomous AI guardrails, AI consulting methodology]). Verified in built HTML.

### 🟡 5. Contact info was inconsistent + vague across AI files
`llms.txt` said "Calendar: Available for booking directly" / "Email: Available through contact form" (vague); `llms-full.txt` had concrete WhatsApp + calendar URL. AI engines prefer concrete entities and penalize inconsistency.

**Fixed:** `llms.txt` Contact now concrete and consistent: calendar URL, `armchairfuturist@gmail.com`, WhatsApp, LinkedIn, Substack, GitHub.

### 🟢 6. `llms.txt` / `llms-full.txt` lacked ingestible "How I Work" content
The methodology was only parseable from the HTML page. AI engines ingest `llms.txt` directly — adding the facts there maximizes citation probability for methodology/infrastructure queries.

**Fixed:** added a substantive "How I Work — Agent Infrastructure & Methodology" section to both files, drawn **verbatim from the page content** (no fabrication): stack, autopilot schedule, guardrails, shipped proof, cost.

---

## Files changed

| File | Change |
|---|---|
| `src/app/sitemap.ts` | Added `/how-i-work` entry (priority 0.7) |
| `src/app/robots.ts` | `sitemap` string → array incl. `/sitemap-ai.xml` |
| `public/robots.txt` | Added second `Sitemap:` line (mirror kept in sync) |
| `public/sitemap-ai.xml` | Added `/how-i-work` URL entry |
| `src/app/how-i-work/page.tsx` | Inlined `Article` JSON-LD |
| `public/llms.txt` | New "How I Work" section; `/how-i-work` + `/blog` in Main Pages; concrete Contact; updated Last Updated (CRLF preserved) |
| `public/llms-full.txt` | New "How I Work" section |

**Build:** `npm run build` ✅ — 24 routes prerendered, no TypeScript errors.
**Rendered-output verification:** `robots.txt` (both sitemaps + AI allowlist), `sitemap.xml` (how-i-work present), `/how-i-work` HTML (Article JSON-LD with author) — all confirmed in `.next` build output.

---

## Residual risks / recommendations (not auto-applied)

1. **`public/sitemap-ai.xml` is static and must be hand-synced with `sitemap.ts`.** It has already drifted once (this pass caught it). **Recommendation:** convert to a dynamic Next.js route (`sitemap-ai.xml.ts`) so it auto-syncs. Flagged, not forced — it's a structural change to a working file.
2. **Dual `robots` source (`robots.ts` + `public/robots.txt`)** is an intentional mirror but a drift hazard. Currently in sync. Consider dropping the static file and relying on `robots.ts` as single source of truth.
3. **Anthropic nuance:** `ClaudeBot` is allowed (good — powers Claude's web search/citations) while `anthropic-ai` is blocked (training crawler). This is the correct, current recommended split. Re-confirm if Anthropic changes bot semantics.
4. **Freshness:** AI engines weight recently-updated content. The Daily AI Digest + cron output already signal liveness; keep `lastmod` dates honest in sitemaps.

---

## Score (this re-audit)

**~88/100.** The foundation was already strong; this pass closed the single largest gap (the orphaned `/how-i-work` E-E-A-T page) and made the AI-discovery layer internally consistent. Remaining points are structural hygiene (dynamic AI sitemap, single robots source) rather than ranking-blocking.
