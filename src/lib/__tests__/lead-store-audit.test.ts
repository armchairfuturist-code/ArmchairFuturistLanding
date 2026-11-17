import { describe, it, expect, vi, beforeEach } from 'vitest';
import { buildAuditCase } from '../audit/case';

const { fakeRun, fakeBind, fakePrepare, prepareSql, bindArgs } = vi.hoisted(() => {
  const fakeRun = vi.fn(async () => ({ meta: { changes: 1 } }));
  const bindArgs: unknown[][] = [];
  const prepareSql: string[] = [];
  const fakeBind = vi.fn((...args: unknown[]) => {
    bindArgs.push(args);
    return { run: fakeRun };
  });
  const fakePrepare = vi.fn((sql: string) => {
    prepareSql.push(sql);
    return { bind: fakeBind };
  });
  return { fakeRun, fakeBind, fakePrepare, prepareSql, bindArgs };
});

vi.mock('@/lib/d1', () => ({
  getD1: () => ({ prepare: fakePrepare }),
  newId: () => 'generated_id',
}));

import { createD1LeadStore } from '../lead-store';

beforeEach(() => {
  vi.clearAllMocks();
  prepareSql.length = 0;
  bindArgs.length = 0;
});

const INTAKE = {
  role: 'Consultant',
  scope: 'individual' as const,
  aiMaturity: 'automations' as const,
  paidTools: 'ChatGPT Plus',
  weekEaters: 'Proposals',
  win90d: '10 hours back',
  triedFailed: 'A course',
  biggestQuestion: 'Can agents help?',
  availability: 'Mornings',
};

describe('saveAuditCase (ADR-004)', () => {
  it('writes one audit_cases row with intake, archetype, and canonical price', async () => {
    const store = createD1LeadStore();
    const payload = buildAuditCase(
      { name: 'Test Client', email: 'client@example.com' },
      INTAKE,
      { slug: 'ready-builder', name: 'The Ready Builder' },
      { clarity: 60, readiness: 70, urgency: 40, individualSignals: 2 },
      'case_123',
      '2026-08-31T12:00:00Z',
    );

    await store.saveAuditCase(payload as never);

    expect(fakePrepare).toHaveBeenCalledTimes(1);
    expect(prepareSql[0]).toContain('INSERT INTO audit_cases');

    // Columns carry what the queries filter on; doc carries the whole case.
    const args = bindArgs[0];
    expect(args.slice(0, 7)).toEqual([
      'case_123',
      'submitted',
      '2026-08-31T12:00:00Z',
      '2026-08-31T12:00:00Z',
      'Test Client',
      'client@example.com',
      'The Ready Builder',
    ]);
    expect(JSON.parse(String(args[7]))).toMatchObject({
      caseId: 'case_123',
      offer: 'roadmapAudit',
      price: { usd: 297, eur: 247 },
      archetypeSlug: 'ready-builder',
      status: 'submitted',
      source: 'audit-form',
    });
  });

  it('refuses a case payload with no caseId', async () => {
    const store = createD1LeadStore();
    await expect(
      store.saveAuditCase({ status: 'submitted' } as never),
    ).rejects.toThrow('no caseId');
    expect(fakeRun).not.toHaveBeenCalled();
  });
});

describe('contact and lead writes', () => {
  it('stores a contact message so a Resend outage cannot lose it', async () => {
    const store = createD1LeadStore();
    await store.saveContactMessage({ name: 'Dana', email: 'dana@example.com', message: 'hello' });

    expect(prepareSql[0]).toContain('INSERT INTO contact_messages');
    const args = bindArgs[0];
    expect(args[0]).toEqual(expect.any(String));
    expect(args.slice(1, 4)).toEqual(['Dana', 'dana@example.com', 'hello']);
  });

  it('stores a captured lead as not consulted', async () => {
    const store = createD1LeadStore();
    await store.saveCaptureLead({ name: 'Sam', email: 'sam@example.com', source: 'footer' });

    expect(prepareSql[0]).toContain('INSERT INTO leads');
    const args = bindArgs[0];
    expect(args.slice(1, 4)).toEqual(['Sam', 'sam@example.com', 'footer']);
  });

  it('stores an assessment lead with its scores as JSON', async () => {
    const store = createD1LeadStore();
    await store.saveAssessmentLead({
      email: 'k@example.com',
      archetypeSlug: 'curious-professional',
      archetypeName: 'The Curious Professional',
      scores: { clarity: 1, readiness: 2, urgency: 3 },
      individualSignals: 4,
    });

    expect(prepareSql[0]).toContain('INSERT INTO assessment_leads');
    const args = bindArgs[0];
    expect(JSON.parse(String(args[4]))).toEqual({ clarity: 1, readiness: 2, urgency: 3 });
    expect(args[5]).toBe(4);
  });
});
