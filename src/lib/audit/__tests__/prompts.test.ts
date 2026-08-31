import { describe, it, expect } from 'vitest';
import { buildSalesPrepPrompt } from '../prompts/sales-prep';
import { buildRoadmapReportPrompt } from '../prompts/roadmap-report';
import { buildExplainerVideoPrompt } from '../prompts/explainer-video';
import type { AuditCaseShape } from '../state';

const c: AuditCaseShape = {
  caseId: 'case_1',
  createdAt: '2026-08-31T12:00:00Z',
  status: 'call_booked',
  archetypeSlug: 'ready-builder',
  archetypeName: 'The Ready Builder',
  scores: { clarity: 60, readiness: 70, urgency: 40, individualSignals: 2 },
  intake: {
    role: 'Consultant serving agency owners',
    scope: 'individual',
    aiMaturity: 'automations',
    paidTools: 'ChatGPT Plus, Zapier',
    weekEaters: 'Writing client proposals',
    win90d: 'Reclaim 10 hours a week',
    triedFailed: 'A prompting course',
    biggestQuestion: 'Can agents do client research end to end?',
    availability: 'Mornings WET',
  },
};

describe('audit prompt bank (ADR-004)', () => {
  it("sales-prep embeds archetype, scores, and the client's own words", () => {
    const p = buildSalesPrepPrompt(c);
    expect(p).toContain('The Ready Builder');
    expect(p).toContain('clarity 60');
    expect(p).toContain('Writing client proposals');
    expect(p).toContain('Can agents do client research end to end?');
    expect(p).toContain('$297 · €247');
    expect(p).toContain('two-path close');
  });

  it('roadmap-report embeds the transcript and the honest-numbers rule', () => {
    const p = buildRoadmapReportPrompt(c, 'TRANSCRIPT TEXT');
    expect(p).toContain('TRANSCRIPT TEXT');
    expect(p).toContain('label all projections as estimates');
    expect(p).toContain('First we');
    expect(p).toContain('open-weights');
  });

  it('explainer-video follows the Notebook LM pattern with own-words playback', () => {
    const p = buildExplainerVideoPrompt(c, 'REPORT BODY');
    expect(p).toContain('~7 minute explainer video');
    expect(p).toContain('Writing client proposals');
    expect(p).toContain('REPORT BODY');
    expect(p).toContain('labeled as an estimate');
  });
});
