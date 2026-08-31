# Plan 009: Native Audit Intake + Case System

> Native `/audit` page replacing the Google Form placeholder, backed by the
> audit case system (ADR-004). Designed agent-first: the case doc + pure
> status machine make the funnel drivable by Hermes/cron without chat
> archaeology.
>
> **Drift check**: read `src/lib/submission-route.ts` and
> `src/lib/lead-store.ts` before editing; both are deep modules — extend,
> don't split.

## Status

- **Priority**: P1 (launch blocker — AUDIT_INTAKE_URL placeholder)
- **Effort**: M
- **Risk**: LOW (new surfaces only; existing routes untouched)
- **Depends on**: Plan 008 (done)
- **Planned at**: 2026-08-31

## Settled decisions (grilling, 2026-08-31)

| Decision | Outcome |
|---|---|
| Vehicle | Native `/audit` page, shared submission engine; Google Form stays only for legacy paths until migrated |
| Payment | Free intake → 15-min fit call (instant booking) → Alex closes → payment link after. Demand-first; no paywall |
| Routing | Archetype-aware: result page → `/audit?arch=slug`, form pre-fills profile from `readAssessmentResult()` |
| Fields | 9: name, email, role+who-served, AI maturity (enum, mirrors quiz Q10), paid tools, week-eaters, 90-day win, tried-and-failed, biggest AI question, availability/timezone |
| Booking | Success page embeds the calendar (15-min fit call); form does not schedule |
| Emails | Buyer confirmation (prep questions + price recap + booking link), Alex lead notification, day-3 no-booking nudge (cron/Broadcast, Alex wires) |
| Screener | AI-maturity question doubles as soft screener; "mostly chat / unsure" routes the confirmation email toward session packs honestly |
| Guarantee | "If the audit doesn't map at least 3 concrete ranked actions, you don't pay" — stated on the form + confirmation email |
| Slug | `/audit`; events: `audit_intake_view`, `audit_intake_submit`, `audit_booking_click` |
| Spam | Honeypot + existing rate limiter (identical to assessment route) |

## The case doc (shape, `audit_cases` collection)

```
{
  caseId, createdAt, updatedAt,
  offer: 'roadmapAudit',
  price: { usd: 297, eur: 247 },
  archetypeSlug, archetypeName,
  scores: { clarity, readiness, urgency, individualSignals },
  intake: {
    role, aiMaturity: 'chat'|'automations'|'agents'|'unsure',
    paidTools, weekEaters, win90d, triedFailed, biggestQuestion, availability
  },
  status: 'submitted'|'call_booked'|'call_done'|'payment_sent'|'paid'|'audited'|'converted'|'dead',
  booking: { scheduledAt?, url? },
  payment: { status: 'none'|'sent'|'paid'|'waived', paidAt?, method? },
  deliverable: { reportUrl?, videoUrl?, deliveredAt? },
  outcome: { programPitched?: bool, notes? }
}
```

## Phase A — Domain layer (build first, test-first) — DONE 2026-08-31

- [x] `src/lib/audit/state.ts` — `AuditStatus` union, legal transitions,
      `nextAction(case)` pure function. 13 unit tests pass (state machine is
      the crown jewel; built before any UI).
- [x] `src/lib/audit/case.ts` — `buildAuditCase(intake, archetype, scores,
      caseId, nowIso)` pure payload builder, price from `pricing.ts`.
- [x] `lead-store.ts` — `saveAuditCase` added to the `LeadStore` seam
      (writes `audit_cases/{caseId}`); fakes + contact-route stub updated.
- [x] `src/lib/audit/prompts/` — sales-prep, roadmap-report, explainer-video
      builders, each embedding the case as structured markdown.

Original Phase A spec below for reference:

- [ ] `src/lib/audit/state.ts` — `AuditStatus` union, legal-transition map,
      `nextAction(case)` pure function + unit tests.
- [ ] `src/lib/audit/case.ts` — types + `buildAuditCase(...)`.
- [ ] Extend `lead-store.ts` with `saveAuditCase`.
- [ ] `src/lib/audit/prompts/sales-prep.ts`.
- [ ] `roadmap-report.ts` + `explainer-video.ts` prompt builders.

## Phase B — Route + emails

- [ ] `src/app/api/audit/submit/route.ts` via `createSubmissionRoute`:
      `kind: 'audit-intake'`, validation, honeypot, rate limit
      (reuse `RATE_LIMIT_ASSESSMENT`), Firestore write, 2 emails.
- [ ] `buildAuditConfirmationEmail(data)` — "what happens next" + prep
      questions + `$297 · €247` recap + guarantee + booking link.
      `buildAuditLeadNotificationEmail(data)` — full intake, formatted.
      Templates in `src/lib/email/templates.ts`; pipeline kinds in
      `submission-pipeline.ts`; tests with FakeEmailSender/FakeLeadStore.

## Phase C — Page + flow

- [ ] `/audit` page: pitch summary (dual-label price, guarantee), archetype
      pre-fill from `readAssessmentResult()`, 9-field form (fields per
      settled decisions), honeypot, submit → success state.
- [ ] Success state (same page, no redirect): booking CTA →
      `CALENDAR_URL` (Alex creates a "15-min Audit Fit Call" event;
      `audit_booking_click` event), recap of what happens next.
- [ ] Wire the result page audit CTA + services card + header CTAs to
      `/audit` (replace `AUDIT_INTAKE_URL` Google-Form placeholder; delete
      the constant).
- [ ] Copy drafted in SLOP-GUIDE voice (see Phase D). Analytics events:
      `audit_intake_submit` (conversion), `audit_booking_click`.

## Phase D — Ops (Alex)

- [ ] Create the 15-min fit-call event type in the same Google Calendar
      (or separate appointment schedule) and paste the URL as
      `AUDIT_BOOKING_URL` in `constants.ts`.
- [ ] Create the Stripe Payment Link for $297 (sent after the fit call).
- [ ] Cron or Resend Broadcast for the day-3 nudge: query
      `audit_cases` where `status=='submitted' && !booking.scheduledAt &&
      createdAt < now-3d`.

## Verification

`npm test` (new: state machine tests, pipeline tests, template tests,
page render test) + `tsc --noEmit` + `npm run build` + manual localhost
pass of the full flow: `/assessment` → result → audit CTA → form →
success → calendar click. Then the Digital Identity migration reuses this
engine (Plan 010, not yet written).

## Phase B+C completion notes (2026-08-31)

- [x] Pipeline: `AuditIntakeInput` / `AuditIntakeResult` kinds in
      `submission-pipeline.ts`; validates all 10 fields, email, aiMaturity
      enum; builds the case via `buildAuditCase(contact, intake, ...)` —
      name + email at doc top level for query ergonomics; sends
      confirmation + lead notification; returns `{ caseId }`.
- [x] Route: `/api/audit/submit` via `createSubmissionRoute` (rate limit,
      honeypot passthrough, error mapping). Live-tested on localhost:
      validation + envelope behave identically to the assessment route
      (500s on localhost are the known missing-RESEND_API_KEY env, same
      for assessment route).
- [x] Emails: `buildAuditConfirmationEmail` (prep-question hook, dual
      price, guarantee, booking CTA, honest screener for chat/unsure) +
      `buildAuditLeadNotificationEmail` (full intake table, sales-prep
      pointer). Tests cover screener branching + guarantee + dual label.
- [x] Page: `/audit` — pitch (dual-label price, guarantee line), 10-field
      form with per-field validation + helper text, honeypot, archetype
      pre-fill from `readAssessmentResult()`, success state with
      `audit_booking_click` calendar CTA. Copy per
      `_capture/audit-form-copy-draft.md`.
- [x] Entry points rewired: result-page CTA, services card, and both
      nurture emails now point to `/audit` (internal). `AUDIT_INTAKE_URL`
      constant deleted; `SITE_URL` added to constants for email links.
- [x] Analytics: `audit_intake_view`, `audit_intake_submit` (conversion),
      `audit_booking_click`.

Verification: vitest 112/112, tsc clean, `/audit` renders 200 with pitch +
form, API smoke-tested (validation via unit tests; live 500 on localhost
is the known no-RESEND_API_KEY env limitation shared by all submission
routes).

## Post-implementation decisions (2026-08-31, Alex)

- Fit call = his existing 15-minute Google appointments schedule; wired as
  `AUDIT_BOOKING_URL` in constants.ts (form success page uses it).
- Payment = Venmo business request after the call closes (no Stripe for
  now; revisit automation later).
- Scope field added post-grill: `scope: 'individual' | 'organization'` in
  AuditIntake + case doc + sales-prep prompt + form radio pair — answers
  the "who" flexibility question for the pipeline.

## Pre-deploy finding (production)

Both `forms.gle` links on the site (the $233 archetype CTA AND the Digital
Identity services card) resolve to the SAME Google Form, and that form
returns **401** for logged-out visitors — the $233 Digital Identity path is
broken in production right now. Fix is in Alex's Google account (re-enable
link sharing on the form) or accelerate the native intake migration
(Plan 010). Flagged to Alex.
