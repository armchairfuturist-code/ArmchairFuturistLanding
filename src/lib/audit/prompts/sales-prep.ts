/**
 * Sales-prep prompt builder (ADR-004 prompt bank).
 *
 * Adapted from the Dino template for the fit-call context: the intake IS the
 * discovery, so this brief is built from the case doc before the 15-min
 * call. Any agent (or Alex) runs it with the case data; no chat archaeology.
 */

import type { AuditCaseShape } from '../state';

export function buildSalesPrepPrompt(c: AuditCaseShape): string {
  const i = c.intake;
  return `You are preparing Alex Myers for a 15-minute fit call with a prospective AI Roadmap Audit client. Use the case data below. Be specific; quote the client's own words where they matter.

## Case
- Archetype from assessment: ${c.archetypeName} (${c.archetypeSlug})
- Assessment scores: clarity ${c.scores.clarity}, readiness ${c.scores.readiness}, urgency ${c.scores.urgency}
- Audit price discussed on the call: $297 · €247 (launch rate; normally $497 · €417)

## Intake (their words)
- Role and who they serve: ${i.role}
- Audit scope: ${i.scope === 'organization' ? 'their organization (workflows involve a team; factor coordination and adoption into the plan)' : 'them individually (personal workflows and leverage)'}
- Where AI sits in their work today: ${i.aiMaturity}
- Tools they already pay for: ${i.paidTools}
- Work that eats their week: ${i.weekEaters}
- What a 90-day win looks like to them: ${i.win90d}
- What they tried that didn't stick: ${i.triedFailed}
- Their biggest AI question right now: ${i.biggestQuestion}
- Availability: ${i.availability}

## Produce
1. The client's 3 biggest pain points, ranked by emotional weight (use their words for #1).
2. Their stated goals with any concrete numbers attached (hours, money, deadlines).
3. Which intake answers suggest they are (or are not) a fit for a $297 audit that converts into the 8-week Self-Sufficiency Program — and what to say honestly if this is a session-pack conversation instead.
4. A suggested call flow: open by answering their biggest question with one current, specific observation; connect every recommendation to their 90-day win; end with the two-path close (roadmap is theirs to implement with anyone — or with us).
5. One opening line for the call that demonstrates current bleeding-edge knowledge relevant to their biggest question. Concrete, no hype.`;
}
