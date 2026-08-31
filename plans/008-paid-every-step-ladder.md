# Plan 008: Paid-Every-Step Ladder (Audit Rung)

> Adds a paid middle rung between the free assessment and the Self-Sufficiency
> Program, per the Paid-Every-Step Ladder analysis (Dino model). Does NOT
> change the underlying model: free assessment stays free and ungated; program
> and session packs unchanged.
>
> **Drift check (run first)**:
> `git log --oneline -1 -- src/content/service-paths.ts src/components/assessment/ResultPage.tsx`
> If either file changed after 2026-08-31, re-read it before editing.

## Status

- **Priority**: P1 (conversion)
- **Effort**: M (code) + ops checklist
- **Risk**: LOW-MED (new copy + one new tier; no flow/ADR changes)
- **Depends on**: none
- **Planned at**: 2026-08-31

## Why this matters

Current paid ladder: $0 (assessment) -> $570-$2,497. That cliff is the
conversion leak. The Dino model inserts a paid assessment rung
($497-$997) that (a) filters retainer-quality clients, (b) pays for trust
building, (c) produces the deliverable that sells the high-ticket program.
Here the equivalent rung is a paid "AI Roadmap Audit" that feeds both
existing paths: Guidance & Education (program) and Done-For-You
(provisioning). The free 3-min quiz remains the *filter*; the audit is the
*application* of the filter to the client's business.

## Offer definition (fixed decisions)

- Name: **AI Roadmap Audit**
- Price: **$297** launch rate, anchored against **$497**. Honest scarcity
  only ("launch pricing while the format is new"), never countdown timers
  (design principle 4).
- Deliverable: 90-min discovery call -> scored roadmap mapped to the
  client's workflows, ranked by impact/effort, ending in a priced next
  step. Written report + ~7-min explainer video.
- Voice: the audit deliverable is *theirs to keep* — "blueprint is yours"
  is the on-brand version of Dino's two-path close.

## Phase A — Site changes (code)

### A1. Add audit tier to `src/content/service-paths.ts`

- Insert as first tier of the `together` path, above "1-on-1 AI Guidance".
- `priceKey: "roadmapAudit"`, `highlighted: false`, icon `Compass` (check
  the section adapter's icon map; add the mapping if missing).
- Features: 90-minute deep discovery call; scored roadmap mapped to your
  actual workflows; ranked by time saved / revenue impact; the roadmap is
  yours to implement with anyone (two-path framing in the description).
- STOP condition: do not change prices or copy of existing tiers.

### A2. Post-results audit offer on the result page

- File: `src/components/assessment/ResultPage.tsx`.
- New card below the archetype CTA block (after the booking fallback):
  headline, 2-sentence description, single CTA to the audit intake URL,
  price shown as $297 ~~$497~~ strikethrough-free plain text (per
  SLOP-GUIDE restraint; no countdown, no urgency badge).
- Analytics: `trackEvent("audit_offer_view")` on mount,
  `trackEvent("audit_offer_click")` on click, mirroring
  `assessment_primary_cta` naming.
- Tests: extend `src/components/assessment/__tests__/` with a render test
  asserting the offer card and both tracked events. Keep the existing
  fallback test green.

### A3. Post-assessment email sequence (Resend templates)

- Rewrite the follow-up ladder: day 0 results recap (unchanged), day 2
  audit offer, day 6 program invitation referencing audit findings.
- Copy owner: Alex. Implementation: Resend template IDs in the existing
  email pipeline (`submission-pipeline`); no new infra.

**Verification for Phase A**: `npm test` (vitest) and `npx tsc --noEmit`
pass; `npm run build` succeeds. Manual: `/assessment` -> result page shows
offer card; events fire in Firebase Analytics debug view.

## Phase B — Ops checklist (non-code)

1. [ ] Build the audit intake form (Google Form is fine; existing pattern:
       GOOGLE_FORM_URL in `src/lib/constants`).
2. [ ] Write the roadmap-report prompt bank (discovery transcript ->
       scored report; adapt the archetype/scoring vocabulary so results
       page and audit read as one system).
3. [ ] Explainer video step: run finished report through Notebook LM,
       ~7 min, client's own words, projected savings up front. Label all
       projections as estimates (honest-numbers rule).
4. [ ] Sales-prep prompt from each report: top 3 pains by emotional
       weight, financial goals with numbers, which report sections to
       slow down on, call flow tied to their #1 goal.
5. [ ] Two-path close script (adapted, on-voice): "The blueprint is
       yours. Implement it yourself, hand it to anyone you trust, or do
       it with us." Quote monthly where recurring; anchor against
       projected savings.
6. [ ] Collect 2 free audits for existing contacts first -> testimonials
       -> anonymized video clips for `src/content/testimonials.ts`.
7. [ ] (Later, only after Phase A+B validate) $97 workshop: teach the
       evaluation framework, 20 personal invites or Substack email,
       audit upsell on the registration confirmation page.

## Out of scope / guardrails

- Never gate or de-grade the free assessment (it is the filter and a GEO
  asset scoring 82/100).
- No three-tier pricing page redesign, no dark patterns, no fake
  countdowns (SLOP-GUIDE + design principle 4).
- The audit serves the *program audience* (consultants, coaches, agency
  owners). If the $233 landing-page tier audience starts buying audits,
  revisit pricing then.

## Local build status (2026-08-31)

Phase A implemented and verified on localhost:

- [x] A1 — audit tier added to `service-paths.ts` (first tier of `together`,
      icon `Compass` added to ICON_MAP, `AUDIT_INTAKE_URL` placeholder in
      `constants.ts` reusing the existing Google Form).
- [x] A2 — post-results offer card in `ResultPage.tsx` with
      `audit_offer_view` / `audit_offer_click` tracking. Plain-text
      $297 / normally $497, no urgency devices. New test:
      `ResultPage.audit-offer.test.tsx`.
- [x] A3 — `buildAuditOfferEmail` (day 2) and `buildProgramInvitationEmail`
      (day 6) added to `src/lib/email/templates.ts`. Day 0 already exists
      (`buildProspectResultEmail`, sent by the submit route). Scheduling
      left to Alex: cron job or Resend Broadcasts + `RESEND_API_KEY`.
- [x] Quiz tweak (user request): added Q10 "Where does AI actually sit in
      your work right now?" — chat-only / automations / agents / can't-tell
      — mapping respondents onto the chat→automation→agent edge curve.
      `QUESTION_COUNT` derives from `questions.length` everywhere; the
      submission-pipeline test now derives its indices from `QUESTION_COUNT`
      instead of hardcoding 9. Assessment meta copy updated 9→10 questions.
- [x] Research: `_capture/trust-model-analysis.md` +
      `_capture/substack-research.md` (bleeding-edge themes for the audit).

Verification: `vitest run` 86/86 pass; `tsc --noEmit` clean;
`npm run dev` on :9002 — `/`, `/assessment`,
`/assessment/result/ready-builder`, `/how-i-work` all 200 with the audit
tier and offer card rendering.

Still TODO (Alex): replace `AUDIT_INTAKE_URL` with the dedicated audit
form, wire the day-2/day-6 scheduler, Phase B ops checklist.
## Conversion refinement pass 2 (2026-08-31, Hormozi noise reduction)

- [x] Hero primary CTA now links to `/assessment` (was: scroll to contact
      form 13 sections down). One front-door action: quiz.
- [x] Free "AI Readiness Assessment" card removed from the services grid
      (7 cards -> 6, one decision per screen). Replaced by a per-path text
      link ("Take the free 3-minute assessment first") with
      `services_assessment_link` tracking. The existing closing line
      ("Not sure which path fits?") below the grid was already present and
      kept.
- [x] WhatsApp brand-green glyph (#25D366, official path) added in hero,
      footer, and Connect section (was generic MessageCircle bubble).
- [x] Result page untouched: free call primary, audit card secondary —
      the one screen where two money-CTAs is correct.

Verification: vitest 86/86, tsc clean, localhost HTML checks pass.
## Currency unification pass (2026-08-31, impeccable critique)

Dual-label policy (user decision): every price shows "$X · €Y" from
pricing.ts. No toggle, no locale flash. Canonical EUR prices
charm-rounded at the 1.17 rate, 7-endings to match the USD brand:
audit 297/247 (list 497/417), program 2497/2147, provisioning max
4275→4250. Fixed schema priceRange (was mixing EUR+USD), added audit +
program offers to JSON-LD, generated FAQ dual-price strings from
pricing.ts, unified CTA labels ("Take the free assessment"), 9→10
quiz copy everywhere, deleted CurrencyToggle + usePreferredCurrency,
documented drift colors + whatsapp-green in DESIGN.md.
Score: 28/40 → 33/40. Remaining points gated on the dedicated audit
intake form (Alex's TODO).
