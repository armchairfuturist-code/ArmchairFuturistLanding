import { describe, it, expect } from 'vitest';
import {
  FREE_REQUEST_LIMIT,
  WARNING_FRACTION,
  SAMPLE_RATE,
  estimateRequests,
  shouldWarn,
  buildUsageWarningEmail,
  readUsage,
} from '../usage-check';

describe('usage-check', () => {
  it('warns at half the free cap', () => {
    expect(Math.round(FREE_REQUEST_LIMIT * WARNING_FRACTION)).toBe(50000);
    expect(shouldWarn(49_999)).toBe(false);
    expect(shouldWarn(50_000)).toBe(true);
  });

  it('estimates requests from the 1-in-10 sample', () => {
    expect(SAMPLE_RATE).toBe(10);
    expect(estimateRequests(5000)).toBe(50000);
    expect(estimateRequests(0)).toBe(0);
  });

  it('email subject carries the percent of cap', () => {
    const e = buildUsageWarningEmail({ day: '2026-11-17', estimatedRequests: 73_000, warn: true });
    expect(e.subject).toContain('73%');
    expect(e.html).toContain('73,000');
  });

  it('readUsage sums samples for a day and flags the cap', async () => {
    const db = { all: async () => ({ results: [{ day: '2026-11-17', samples: 5200 }] }) };
    const s = await readUsage(db, '2026-11-17');
    expect(s.estimatedRequests).toBe(52000);
    expect(s.warn).toBe(true);
  });

  it('readUsage handles an empty day gracefully', async () => {
    const db = { all: async () => ({ results: [] }) };
    const s = await readUsage(db, '2026-11-17');
    expect(s.estimatedRequests).toBe(0);
    expect(s.warn).toBe(false);
  });
});
