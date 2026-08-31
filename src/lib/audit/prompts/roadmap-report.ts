/**
 * Roadmap report prompt builder (ADR-004 prompt bank).
 *
 * Run after the 90-minute audit session with the call transcript attached.
 * Produces the scored roadmap document that sells the program by being
 * genuinely theirs to keep.
 */

import type { AuditCaseShape } from '../state';

export function buildRoadmapReportPrompt(c: AuditCaseShape, callTranscript: string): string {
  const i = c.intake;
  return `Write the AI Roadmap Audit report for ${c.archetypeName} below. Structure and rules:

## Client case
- Role and who they serve: ${i.role}
- AI maturity today: ${i.aiMaturity}
- Paid tools: ${i.paidTools}
- Work that eats their week: ${i.weekEaters}
- 90-day win they named: ${i.win90d}
- Tried and abandoned: ${i.triedFailed}
- Their biggest AI question: ${i.biggestQuestion}
- Assessment scores: clarity ${c.scores.clarity}, readiness ${c.scores.readiness}, urgency ${c.scores.urgency}

## Call transcript
${callTranscript}

## Report rules
1. Open with the single biggest outcome in hours-per-week or money, stated as an estimate (honest numbers; label all projections as estimates).
2. Map their workflows to current-generation tooling: name specific models, agent runtimes, and frameworks where relevant. This report must demonstrate bleeding-edge knowledge, not generic AI advice.
3. Every recommendation is scored on impact (time saved / revenue) and effort, then ranked. First we'll do X, second Y, third Z.
4. Flag the open-weights vs frontier tradeoff, runtime pinning, and skill-lift testing where relevant — judgment, not tool tutorials.
5. End with the two-path close in writing: the roadmap is theirs to keep; implement it yourself, hand it to anyone, or do it with us.
6. Plain English. No hype. Label every estimate as an estimate.`;
}
