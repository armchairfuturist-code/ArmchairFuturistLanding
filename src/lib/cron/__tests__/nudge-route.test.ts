import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

/**
 * Tests for the day-3 nudge cron route.
 *
 * Findings 8 (the query re-read every nudged case forever) and 9 (two
 * overlapping runs both sent) both live in this route, and neither had a test.
 *
 * Storage moved to D1 on 2026-11-17, so the fake models the case-store seam:
 *  - `claimNudge` is one conditional UPDATE, so it flips `submitted -> nudged`
 *    and reports whether it won. A second caller gets false.
 *  - `listOverdueCases` deliberately returns every row, ignoring its filter.
 *    That keeps the in-memory guard under test on its own.
 */

const { fakeList, fakeClaim, fakeRelease, fakeSend } = vi.hoisted(() => ({
  fakeList: vi.fn(),
  fakeClaim: vi.fn(),
  fakeRelease: vi.fn(),
  fakeSend: vi.fn(),
}));

vi.mock('@/lib/case-store', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/case-store')>();
  return {
    ...actual,
    listOverdueCases: (...args: unknown[]) => fakeList(...args),
    claimNudge: (...args: unknown[]) => fakeClaim(...args),
    releaseNudge: (...args: unknown[]) => fakeRelease(...args),
  };
});

vi.mock('@/lib/resend', () => ({
  getResend: () => ({ emails: { send: fakeSend } }),
}));
vi.mock('@/lib/email/templates', () => ({
  buildNudgeEmail: () => '<p>nudge</p>',
}));

import { GET } from '@/app/api/cron/nudge/route';

type CaseData = Record<string, unknown>;

interface FakeCase {
  data: CaseData;
  updates: CaseData[];
}

/** Minimal stand-in for the audit_cases table. */
function makeCases(initial: Record<string, CaseData>) {
  const docs = new Map<string, FakeCase>(
    Object.entries(initial).map(([id, data]) => [id, { data: { ...data }, updates: [] }]),
  );

  fakeList.mockImplementation(async () =>
    [...docs.entries()].map(([caseId, doc]) => ({ caseId, doc: { ...doc.data } })),
  );

  fakeClaim.mockImplementation(async (caseId: string) => {
    const doc = docs.get(caseId);
    // Conditional UPDATE: only a still-submitted row is claimed. JS runs this
    // check-and-set without interleaving, which is the atomicity D1 gives.
    if (!doc || doc.data.status !== 'submitted') return false;
    const patch = { status: 'nudged' };
    doc.updates.push(patch);
    Object.assign(doc.data, patch);
    return true;
  });

  fakeRelease.mockImplementation(async (caseId: string) => {
    const doc = docs.get(caseId);
    if (!doc) return;
    const patch = { status: 'submitted', nudgedAt: null };
    doc.updates.push(patch);
    Object.assign(doc.data, patch);
  });

  return { docs };
}

function req(opts: { secret?: string } = {}) {
  const headers: Record<string, string> = {};
  if (opts.secret !== undefined) headers['x-cron-secret'] = opts.secret;
  return new NextRequest('http://localhost:9002/api/cron/nudge', {
    method: 'GET',
    headers,
  });
}

/** Older than the 3-day window, un-booked, un-nudged. */
const OVERDUE: CaseData = {
  status: 'submitted',
  createdAt: '2026-08-20T00:00:00Z',
  name: 'Dana',
  email: 'dana@example.com',
  archetypeName: 'Results Thinker',
};

beforeEach(() => {
  vi.clearAllMocks();
  process.env.CRON_SECRET = 'test-cron-secret';
  fakeSend.mockResolvedValue({ id: 'sent' });
});

describe('nudge cron route', () => {
  it('401s without the secret, and with the wrong one', async () => {
    makeCases({ case_1: OVERDUE });

    expect((await GET(req())).status).toBe(401);
    expect((await GET(req({ secret: 'nope' }))).status).toBe(401);
    expect(fakeSend).not.toHaveBeenCalled();
  });

  it('401s when CRON_SECRET is not configured', async () => {
    delete process.env.CRON_SECRET;
    makeCases({ case_1: OVERDUE });
    expect((await GET(req({ secret: 'test-cron-secret' }))).status).toBe(401);
  });

  it('claims a case by moving it to nudged, then sends', async () => {
    const db = makeCases({ case_1: OVERDUE });

    const res = await GET(req({ secret: 'test-cron-secret' }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, nudged: 1, skipped: 0, failed: 0 });

    // The claim is what takes the case out of every future query.
    expect(db.docs.get('case_1')!.updates[0]).toMatchObject({ status: 'nudged' });
    expect(fakeSend).toHaveBeenCalledTimes(1);
  });

  it('sends once when two runs overlap on the same case', async () => {
    makeCases({ case_1: OVERDUE });

    const [a, b] = await Promise.all([
      GET(req({ secret: 'test-cron-secret' })),
      GET(req({ secret: 'test-cron-secret' })),
    ]);

    const bodies = [await a.json(), await b.json()] as Array<Record<string, number>>;
    const totalNudged = bodies.reduce((n, x) => n + x.nudged, 0);
    const totalSkipped = bodies.reduce((n, x) => n + x.skipped, 0);

    expect(fakeSend).toHaveBeenCalledTimes(1);
    expect(totalNudged).toBe(1);
    expect(totalSkipped).toBe(1);
  });

  it('does not nudge a case that already booked', async () => {
    makeCases({
      case_1: { ...OVERDUE, booking: { scheduledAt: '2026-09-01T10:00:00Z' } },
    });

    const res = await GET(req({ secret: 'test-cron-secret' }));
    expect(await res.json()).toEqual({ ok: true, nudged: 0, skipped: 1, failed: 0 });
    expect(fakeSend).not.toHaveBeenCalled();
  });

  it('skips an already-nudged case that the query somehow returned', async () => {
    makeCases({
      case_1: { ...OVERDUE, status: 'nudged', nudgedAt: '2026-08-29T00:00:00Z' },
    });

    const res = await GET(req({ secret: 'test-cron-secret' }));
    expect(await res.json()).toEqual({ ok: true, nudged: 0, skipped: 1, failed: 0 });
    expect(fakeSend).not.toHaveBeenCalled();
  });

  it('skips a case with no createdAt rather than sending', async () => {
    makeCases({ case_1: { ...OVERDUE, createdAt: undefined } });

    const res = await GET(req({ secret: 'test-cron-secret' }));
    expect(await res.json()).toEqual({ ok: true, nudged: 0, skipped: 1, failed: 0 });
    expect(fakeSend).not.toHaveBeenCalled();
  });

  it('releases the claim when the send fails, so a later run can retry', async () => {
    const db = makeCases({ case_1: OVERDUE });
    fakeSend.mockRejectedValueOnce(new Error('resend down'));

    const first = await GET(req({ secret: 'test-cron-secret' }));
    expect(await first.json()).toEqual({ ok: true, nudged: 0, skipped: 0, failed: 1 });

    // Claimed, then handed back.
    const updates = db.docs.get('case_1')!.updates;
    expect(updates[0]).toMatchObject({ status: 'nudged' });
    expect(updates[1]).toMatchObject({ status: 'submitted', nudgedAt: null });

    // The retry succeeds and sends exactly one email.
    const retry = await GET(req({ secret: 'test-cron-secret' }));
    expect(await retry.json()).toEqual({ ok: true, nudged: 1, skipped: 0, failed: 0 });
    expect(fakeSend).toHaveBeenCalledTimes(2);
  });

  it('keeps going for other cases when one send fails', async () => {
    makeCases({
      case_1: OVERDUE,
      case_2: { ...OVERDUE, email: 'sam@example.com' },
    });
    fakeSend.mockRejectedValueOnce(new Error('resend down'));

    const res = await GET(req({ secret: 'test-cron-secret' }));
    expect(await res.json()).toEqual({ ok: true, nudged: 1, skipped: 0, failed: 1 });
    expect(fakeSend).toHaveBeenCalledTimes(2);
  });
});
