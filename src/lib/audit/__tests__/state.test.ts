import { describe, it, expect } from 'vitest';
import {
  AUDIT_STATUSES,
  legalTransitions,
  canTransition,
  nextAction,
  type AuditStatus,
  type AuditCaseShape,
} from '../state';

function makeCase(overrides: Partial<AuditCaseShape> = {}): AuditCaseShape {
  return {
    caseId: 'case_1',
    createdAt: '2026-08-31T12:00:00Z',
    status: 'submitted',
    archetypeSlug: 'ready-builder',
    archetypeName: 'The Ready Builder',
    scores: { clarity: 60, readiness: 70, urgency: 40, individualSignals: 2 },
    intake: {
      role: 'Consultant',
      scope: 'individual',
      aiMaturity: 'automations',
      paidTools: 'ChatGPT Plus',
      weekEaters: 'Client proposals',
      win90d: 'Save 10 hours a week',
      triedFailed: 'Some prompting course',
      biggestQuestion: 'Can agents do my client research?',
      availability: 'Mornings, WET',
    },
    ...overrides,
  };
}

describe('audit state machine', () => {
  it('exposes the full status set', () => {
    expect(AUDIT_STATUSES).toEqual([
      'submitted',
      'call_booked',
      'call_done',
      'payment_sent',
      'paid',
      'audited',
      'converted',
      'dead',
    ]);
  });

  it('moves submitted -> call_booked -> call_done -> payment_sent -> paid -> audited -> converted', () => {
    const happyPath: AuditStatus[] = [
      'submitted',
      'call_booked',
      'call_done',
      'payment_sent',
      'paid',
      'audited',
      'converted',
    ];
    for (let i = 0; i < happyPath.length - 1; i++) {
      expect(canTransition(happyPath[i], happyPath[i + 1])).toBe(true);
    }
  });

  it('allows skipping payment tracking steps honestly (call_done -> paid via waiver)', () => {
    expect(canTransition('call_done', 'paid')).toBe(true);
  });

  it('allows dead from any pre-terminal status', () => {
    for (const s of ['submitted', 'call_booked', 'call_done', 'payment_sent'] as AuditStatus[]) {
      expect(canTransition(s, 'dead')).toBe(true);
    }
    // Terminal states do not transition to dead (nothing left to lose)
    expect(canTransition('paid', 'dead')).toBe(true);
    expect(canTransition('audited', 'dead')).toBe(false);
    expect(canTransition('converted', 'dead')).toBe(false);
  });

  it('rejects illegal jumps (submitted -> paid, call_booked -> audited)', () => {
    expect(canTransition('submitted', 'paid')).toBe(false);
    expect(canTransition('call_booked', 'audited')).toBe(false);
    expect(canTransition('converted', 'paid')).toBe(false);
  });

  it('nextAction: fresh case -> await_booking', () => {
    const c = makeCase();
    expect(nextAction(c)).toEqual({
      action: 'await_booking',
      detail: expect.stringContaining('booking link was sent'),
    });
  });

  it('nextAction: booked case -> prep_call', () => {
    const c = makeCase({
      status: 'call_booked',
      booking: { scheduledAt: '2026-09-02T10:00:00Z' },
    });
    expect(nextAction(c)!.action).toBe('prep_call');
  });

  it('nextAction: call done, nothing sent -> send_payment', () => {
    const c = makeCase({ status: 'call_done' });
    expect(nextAction(c)!.action).toBe('send_payment');
  });

  it('nextAction: payment sent -> await_payment', () => {
    const c = makeCase({ status: 'payment_sent' });
    expect(nextAction(c)!.action).toBe('await_payment');
  });

  it('nextAction: paid -> schedule_session', () => {
    const c = makeCase({ status: 'paid' });
    expect(nextAction(c)!.action).toBe('schedule_session');
  });

  it('nextAction: audited -> deliver_report only when deliverable missing', () => {
    const audited = makeCase({ status: 'audited' });
    expect(nextAction(audited)!.action).toBe('deliver_report');
    const delivered = makeCase({
      status: 'audited',
      deliverable: { reportUrl: 'https://example.com/report', deliveredAt: '2026-09-05T00:00:00Z' },
    });
    expect(nextAction(delivered)!.action).toBe('convert_or_close');
  });

  it('nextAction: converted and dead cases need nothing', () => {
    expect(nextAction(makeCase({ status: 'converted' }))).toBeNull();
    expect(nextAction(makeCase({ status: 'dead' }))).toBeNull();
  });

  it('nextAction: day-3 no-booking nudge surfaces on fresh old cases', () => {
    const threeDaysAgo = '2026-08-28T00:00:00Z';
    const c = makeCase({ createdAt: threeDaysAgo });
    expect(nextAction(c, nowIso())).toEqual({
      action: 'nudge_booking',
      detail: expect.stringContaining('3 days'),
    });
    // A fresh case does NOT trigger the nudge.
    expect(nextAction(makeCase(), nowIso())!.action).toBe('await_booking');
  });
});

function nowIso(): string {
  return '2026-08-31T12:00:00Z';
}

function threeDaysAgo(): string {
  return '2026-08-28T11:00:00Z';
}
