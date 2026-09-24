# Domain Context

Canonical domain language lives in [`docs/GLOSSARY.md`](docs/GLOSSARY.md).
Architecture decisions live in [`docs/adr/`](docs/adr/).

## Key seams (AI-navigability)

| Module | Role |
|--------|------|
| **Assessment Flow** (`src/lib/assessment/flow.ts`) | Deep domain module for quiz phase machine, answer indices, scoring, result session helpers |
| **ROI Calculator** (`src/lib/roi-calculator.ts`) | Pure time-savings projection; section is a thin adapter |
| **Lead Capture** (`src/lib/lead-capture.ts`, `src/lib/hooks/useLeadCapture.ts`) | Shared client transport and validation seam; server Lead Intake stays in `submission-pipeline` |
| **Marketing content** (`src/content/*`) | Presentation-free Case Study / FAQ / Testimonial / Service Path / Service System records |
| **Service Path catalog** (`src/content/service-catalog.ts`) | Canonical records and projections for Service Paths, Service Systems, hub FAQs, spoke pages, and discovery surfaces |
| **Submission pipeline** (`src/lib/submission-pipeline.ts`) | Deep server Lead Intake (ADR-003) — do not shallow-split |
| **Paid Case intake** (`src/lib/paid-case-intake.ts`) | Deep shared paid-case lifecycle with Audit and Digital Identity adapters (ADR-004) |
| **Homepage composition** (`src/components/homepage/HomepageComposition.tsx`) | Owns homepage order, wrapper policy, and the section-to-navigator projection |
| **Audit Case System** (`src/lib/audit/state.ts`) | Audit engagement lifecycle: one `audit_cases` doc per lead, pure `nextAction(case)` state machine, prompt bank in `src/lib/audit/prompts/` (ADR-004) |
| **Pricing** (`src/lib/pricing.ts`) | Single source of pricing truth: canonical dual-label strings (`$X · €Y`), `formatSchemaPriceRange()` for JSON-LD — never hardcode a price in UI, emails, or FAQs |
| **Paid-case engine** (`src/lib/paid-case.ts`) | Shared paid-intake envelope (id gen, best-effort persist, notify pair, transition contract); Audit Case System and Identity case are adapters carrying only enums and prompts |

## ADRs

- ADR-001 Tech stack
- ADR-002 Assessment flow phases
- ADR-003 Email / lead handling
- ADR-004 Audit case system
