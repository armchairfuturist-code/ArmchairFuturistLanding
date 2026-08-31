import { describe, it, expect } from 'vitest';
import {
  IDENTITY_STATUSES,
  canTransition,
  nextAction,
  type IdentityStatus,
  type IdentityCaseShape,
} from '../state';

function makeCase(overrides: Partial<IdentityCaseShape> = {}): IdentityCaseShape {
  return {
    caseId: 'id_1',
    createdAt: '2026-08-31T12:00:00Z',
    status: 'submitted',
    name: 'Test Client',
    email: 'client@example.com',
    intake: {
      scope: 'individual',
      linkedinUrl: 'https://linkedin.com/in/test',
      resumeUrl: 'https://example.com/resume.pdf',
      socialLinks: '',
      headline: 'Ops director, scaling to VP',
      notes: '',
    },
    ...overrides,
  };
}

describe('identity case state machine (Plan 010)', () => {
  it('exposes the status set', () => {
    expect(IDENTITY_STATUSES).toEqual([
      'submitted',
      'in_review',
      'building',
      'delivered',
      'dead',
    ]);
  });

  it('walks the happy path submitted -> in_review -> building -> delivered', () => {
    const path: IdentityStatus[] = ['submitted', 'in_review', 'building', 'delivered'];
    for (let i = 0; i < path.length - 1; i++) {
      expect(canTransition(path[i], path[i + 1])).toBe(true);
    }
  });

  it('allows dead from submitted/in_review (not a fit), not from delivered', () => {
    expect(canTransition('submitted', 'dead')).toBe(true);
    expect(canTransition('in_review', 'dead')).toBe(true);
    expect(canTransition('building', 'dead')).toBe(true);
    expect(canTransition('delivered', 'dead')).toBe(false);
    expect(canTransition('delivered', 'building')).toBe(false);
  });

  it('rejects skipping review (submitted -> building)', () => {
    expect(canTransition('submitted', 'building')).toBe(false);
    expect(canTransition('submitted', 'delivered')).toBe(false);
  });

  it('nextAction: fresh case -> review_intake', () => {
    expect(nextAction(makeCase())!.action).toBe('review_intake');
  });

  it('nextAction: in_review + approved -> send_payment_request', () => {
    expect(nextAction(makeCase({ status: 'in_review' }))!.action).toBe('send_payment_request');
  });

  it('nextAction: building -> build_page', () => {
    expect(nextAction(makeCase({ status: 'building' }))!.action).toBe('build_page');
  });

  it('nextAction: building with delivery url -> deliver_page', () => {
    const c = makeCase({
      status: 'building',
      deliverable: { pageUrl: 'https://client.example.com' },
    });
    expect(nextAction(c)!.action).toBe('deliver_page');
  });

  it('nextAction: delivered -> null', () => {
    expect(nextAction(makeCase({ status: 'delivered' }))).toBeNull();
    expect(nextAction(makeCase({ status: 'dead' }))).toBeNull();
  });
});
