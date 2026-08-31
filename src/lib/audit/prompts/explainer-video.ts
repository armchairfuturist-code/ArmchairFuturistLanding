/**
 * Explainer-video prompt builder (ADR-004 prompt bank).
 *
 * Dino's Notebook LM pattern: a ~7-minute animated walkthrough of the
 * client's own report — their pain points in their words, the plan as
 * "first X, second Y, third Z", the projected impact up front. The video
 * sells in rooms Alex is not in.
 */

import type { AuditCaseShape } from '../state';

export function buildExplainerVideoPrompt(c: AuditCaseShape, report: string): string {
  return `Take this completed AI Roadmap Audit report and write a prompt for Notebook LM that will generate a ~7 minute explainer video.

The video must:

- Address the client by name in the opening line (client archetype: ${c.archetypeName})
- Lead with the single biggest estimated outcome from the report
- Replay the client's own stated pain points in their own words (from the intake: "${c.intake.weekEaters}")
- Walk the plan as: "First we'll do X. Second, Y. Third, Z." following the report's ranked order
- End with the projected annual savings figure from the report, labeled as an estimate

## The report
${report}
`;
}
