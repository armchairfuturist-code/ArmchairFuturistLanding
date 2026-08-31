# Plan 010: Native Digital Identity Intake + Day-3 Nudge Cron

> Replaces the broken Google Form (401 for logged-out visitors) with a
> native `/intake/digital-identity` page, and builds the audit day-3 nudge
> cron. Reuses the Plan-009 patterns end to end.
>
> **Drift check**: `src/lib/audit/` and `submission-pipeline.ts` are the
> reference patterns. DI gets a parallel simple pipeline (different
> lifecycle), not a forced generalization of the audit state machine.

## Status: ALL PHASES DONE (2026-08-31)

- **Priority**: P0 → DONE (the broken $233 path is fixed: Google Form removed, native intake live)
- **Effort**: M
- **Risk**: LOW (new surfaces; CTA rewires only)
- **Depends on**: Plan 009 (done)
- **Planned at**: 2026-08-31

## Settled decisions

| Decision | Outcome |
|---|---|
| Vehicle | Native `/intake/digital-identity`, no Google Form |
| Scope field | Required radio: individual / organization (same pattern as audit) |
| Payment | Free intake → Alex reviews → Venmo request → build in 2-4 days (matches audit posture; Alex automates later) |
| Lifecycle | `submitted → in_review → building → delivered` (+ `dead`) — simpler than the audit machine |
| Fields | name, email, scope, LinkedIn URL, resume link, other social links (optional), target role/headline, notes (optional) |
| Slug + events | `/intake/digital-identity`; `di_intake_submit` (conversion) |
| Firestore | `identity_cases` collection (parallel to `audit_cases`, not forced into it) |
| Emails | Buyer confirmation (what happens next + Venmo heads-up) + Alex lead notification |
| Day-3 cron | Firestore query + nudge email, documented for Hermes/cron |

## Phase A — Domain + pipeline

- [x] `src/lib/identity/state.ts` — status union + `nextAction(case)` +
      tests (submitted → in_review → building → delivered; in_review →
      dead when not a fit; building → dead allowed).
- [x] `src/lib/identity/case.ts` — `buildIdentityCase(contact, intake,
      caseId, nowIso)`, price from `SERVICES_PRICING.digitalIdentity`.
- [x] `lead-store.saveIdentityCase` (`identity_cases/{caseId}`) + fakes.
- [x] Pipeline kind `identity-intake`: validates 8 fields, URL sanity for
      linkedin/resume (must look like URLs), scope enum; 2 emails; returns
      `{ caseId }`.
- [x] Emails: `buildIdentityConfirmationEmail` + extend lead notification.

## Phase B — Page + wiring

- [x] `/intake/digital-identity` page: pitch (dual-label price), 8-field
      form, honeypot, success state ("what happens next": review → Venmo
      request → build in 2-4 days).
- [x] CTA rewires: services card (`/intake/digital-identity`), ready-builder
      archetype CTA (was the broken forms.gle), FAQ link if present.
- [x] Google Form removal: `GOOGLE_FORM_URL` constant deleted from
      constants.ts and all usages (archetypes.ts now points to the native
      intake).

## Phase C — Day-3 nudge cron (audit)

- [x] `src/lib/cron/nudge-overdue.ts` — exported `findOverdueAuditCases(db,
      nowIso)`: query `audit_cases` where `status == 'submitted'`,
      `booking.scheduledAt` missing, `createdAt` older than 3 days. Pure
      query builder + tested threshold logic.
- [x] `GET /api/cron/nudge` — runs the query, sends the nudge email per
      overdue case (reuses `buildNudgeEmail`), marks `nudgedAt` on the case
      (idempotent: skips cases already nudged). Protected by a shared
      secret header (`x-cron-secret` vs `CRON_SECRET` env), so Hermes or
      any scheduler can hit it: `curl -H "x-cron-secret: ..." ...`.
- [x] Nudge email template: honest, no dark patterns — "still want the
      audit? here's the booking link" + one-click reschedule.
- [x] `docs/agents/cron.md` — how to schedule it (Cloud Scheduler or
      Hermes cron), the secret setup, and what idempotence guarantees.

## Verification

vitest (new: identity state machine, pipeline, templates, cron query +
idempotence), tsc, build, live canary of `/intake/digital-identity` +
`/api/cron/nudge` post-deploy.
