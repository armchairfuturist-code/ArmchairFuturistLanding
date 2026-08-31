# ADR-004: Audit Case System

## Status

Accepted, 2026-08-31

## Context

The Paid-Every-Step Ladder (Plan 008) adds a paid audit rung between the free
assessment and the Self-Sufficiency Program. The audit engagement spans days:
intake -> fit call -> payment -> 90-min session -> report -> video -> program
decision. Unlike the assessment (one-shot submission), the audit is a *case*
with a lifecycle.

The existing funnel scatters engagement state across `assessment_leads`,
`leads` (Firestore), client sessionStorage, email side effects, and Alex's
memory. An agent (Hermes/cron) driving this system would need chat archaeology
or Alex's memory to answer "what should happen next with this person?" That is
the resource leak this ADR closes.

## Decision

1. **The audit case document is the central abstraction.** One Firestore doc
   in `audit_cases` holds the entire engagement: intake answers (structured,
   enum where possible), archetype + scores (carried from the assessment
   result session), booking, payment, deliverable, and outcome. One doc = full
   situation awareness for any reader, human or agent.

2. **A pure status machine owns "what's next".** `src/lib/audit/state.ts`
   exports `nextAction(case)` returning the single highest-leverage next
   move (`await_booking`, `prep_call`, `send_payment`, `schedule_session`,
   `run_report`, `follow_up`). State transitions are deterministic and
   unit-tested. LLM tokens are spent only where judgment adds value (prep,
   report) — never on recall of state.

3. **Intake answers are structured at capture.** AI maturity is an enum
   mirroring assessment Q10 (chat / automations / agents / unsure) so the
   sales-prep prompt never parses free text for facts the funnel already
   knows. Free text is reserved for what only the client can say
   (week-eaters, win-90d, biggest question).

4. **The prompt bank lives in the repo**: `src/lib/audit/prompts/` —
   `sales-prep.ts`, `roadmap-report.ts`, `explainer-video.ts`. Each exports
   `buildPrompt(case): string`, embedding the case as structured markdown.
   Report generation is reproducible and version-controlled, not artisanal.

5. **Submission reuses the deep route factory** (`submission-route.ts`,
   ADR-003): `kind: 'audit-intake'`, rate-limited, honeypot, pipeline
   validation. The route writes the case, fires confirmation + lead
   notification, and returns `{ ok, caseId }`.

6. **The form is archetype-aware.** `/audit` reads the stored assessment
   result (`readAssessmentResult()`) and opens with the visitor's profile
   pre-filled — the audit reads as a continuation of the assessment, not a
   new form.

## Consequences

- An agent or cron can drive the pipeline by querying `nextAction(case)`:
  the day-3 nudge is "cases where status=submitted, no booking, older than
  3 days" — no chat archaeology, no memory files.
- Alex's post-call updates are single-field writes (status, payment, links)
  from any interface — console, admin page, or agent.
- The deliverable pipeline (report, video) becomes regenerable from the case
  doc, not artisanal.
- Digital Identity intake (later) reuses the same engine with a different
  route config; the case pattern generalizes to every paid offer.
