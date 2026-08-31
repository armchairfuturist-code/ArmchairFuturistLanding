import { describe, it, expect, vi } from 'vitest';
import { createFirestoreLeadStore } from '../lead-store';
import { buildAuditCase } from '../audit/case';

const fakeDoc = { set: vi.fn().mockResolvedValue(undefined) };
const fakeDb = {
  collection: vi.fn().mockReturnValue({ doc: vi.fn().mockReturnValue(fakeDoc) }),
};

describe('saveAuditCase (ADR-004)', () => {
  it('writes one audit_cases doc with intake, archetype, and canonical price', async () => {
    const store = createFirestoreLeadStore(() => fakeDb as never);
    const intake = {
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
    const payload = buildAuditCase(
      { name: 'Test Client', email: 'client@example.com' },
      intake,
      { slug: 'ready-builder', name: 'The Ready Builder' },
      { clarity: 60, readiness: 70, urgency: 40, individualSignals: 2 },
      'case_123',
      '2026-08-31T12:00:00Z',
    );
    await store.saveAuditCase(payload as never);
    expect(fakeDb.collection).toHaveBeenCalledWith('audit_cases');
    expect(fakeDoc.set).toHaveBeenCalledWith(
      expect.objectContaining({
        caseId: 'case_123',
        offer: 'roadmapAudit',
        price: { usd: 297, eur: 247 },
        archetypeSlug: 'ready-builder',
        status: 'submitted',
        source: 'audit-form',
      }),
    );
  });
});
