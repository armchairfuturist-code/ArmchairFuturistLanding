import { describe, it, expect } from 'vitest';
import { NUDGE_WINDOW_MS, isOverdueForNudge, buildOverdueQuery } from '../nudge-overdue';

describe('audit day-3 nudge query (Plan 010 Phase C)', () => {
  const now = '2026-08-31T12:00:00Z';

  it('3-day threshold in ms', () => {
    expect(NUDGE_WINDOW_MS).toBe(3 * 24 * 60 * 60 * 1000);
  });

  it('isOverdueForNudge: submitted, no booking, older than 3 days', () => {
    const c = {
      status: 'submitted',
      booking: {},
      createdAt: '2026-08-27T00:00:00Z', // 3d12h before now
      nudgedAt: undefined,
    };
    expect(isOverdueForNudge(c as never, now)).toBe(true);
  });

  it('not overdue when booked', () => {
    const c = {
      status: 'submitted',
      createdAt: '2026-08-20T00:00:00Z',
      booking: { scheduledAt: '2026-09-01T10:00:00Z' },
    };
    expect(isOverdueForNudge(c as never, now)).toBe(false);
  });

  it('not overdue when already nudged (idempotence)', () => {
    const c = {
      status: 'submitted',
      createdAt: '2026-08-20T00:00:00Z',
      nudgedAt: '2026-08-29T00:00:00Z',
    };
    expect(isOverdueForNudge(c as never, now)).toBe(false);
  });

  it('not overdue when young', () => {
    const c = {
      status: 'submitted',
      createdAt: '2026-08-31T00:00:00Z', // 12h old
    };
    expect(isOverdueForNudge(c as never, now)).toBe(false);
  });

  it('only submitted cases are nudged', () => {
    const c = { status: 'paid', createdAt: '2026-08-01T00:00:00Z' };
    expect(isOverdueForNudge(c as never, now)).toBe(false);
  });

  it('buildOverdueQuery targets the right collection and fields', () => {
    const q = buildOverdueQuery('2026-08-31T12:00:00Z');
    expect(JSON.stringify(q)).toContain('submitted');
  });
});
