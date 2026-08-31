# Domain Context

Canonical domain language lives in [`docs/GLOSSARY.md`](docs/GLOSSARY.md).
Architecture decisions live in [`docs/adr/`](docs/adr/).

## Key seams (AI-navigability)

| Module | Role |
|--------|------|
| **Assessment Flow** (`src/lib/assessment/flow.ts`) | Deep domain module for quiz phase machine, answer indices, scoring, result session helpers |
| **ROI Calculator** (`src/lib/roi-calculator.ts`) | Pure time-savings projection; section is a thin adapter |
| **Lead Capture** (`src/lib/hooks/useLeadCapture.ts`) | Client form adapter over API routes; server Lead Intake stays in `submission-pipeline` |
| **Marketing content** (`src/content/*`) | Presentation-free Case Study / FAQ / Testimonial / Service Path / Mentoring Pillar records |
| **Submission pipeline** (`src/lib/submission-pipeline.ts`) | Deep server Lead Intake (ADR-003) — do not shallow-split |
| **Audit Case System** (`src/lib/audit/state.ts`) | Audit engagement lifecycle: one `audit_cases` doc per lead, pure `nextAction(case)` state machine, prompt bank in `src/lib/audit/prompts/` (ADR-004) |
| **Pricing** (`src/lib/pricing.ts`) | Single source of pricing truth: canonical dual-label strings (`$X · €Y`), `formatSchemaPriceRange()` for JSON-LD — never hardcode a price in UI, emails, or FAQs |

## ADRs

- ADR-001 Tech stack
- ADR-002 Assessment flow phases
- ADR-003 Email / lead handling
- ADR-004 Audit case system
