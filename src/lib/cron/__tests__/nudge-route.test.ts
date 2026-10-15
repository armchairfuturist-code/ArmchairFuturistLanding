import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

/**
 * Tests for the day-3 nudge cron route.
 *
 * Findings 8 (the query re-read every nudged case forever) and 9 (two
 * overlapping runs both sent) both live in this route, and neither had a test.
 *
 * The fake below models two things a real Firestore gives us:
 *  - a transaction that re-reads the doc and only commits if the case is
 *    still un-nudged;
 *  - serializable transactions. The fake runs them through a promise-chain
 *    mutex so that two concurrent runs cannot both read 'submitted' before
 *    either writes. Real Firestore gets the same result from optimistic
 *    locking with retry; the mutex is how we express that here.
 */

const fakeGetDb = vi.fn();
const fakeSend = vi.fn();

vi.mock('@/lib/firebase-admin', () => ({ getDb: () => fakeGetDb() }));
vi.mock('@/lib/resend', () => ({
  getResend: () => ({ emails: { send: fakeSend } }),
}));
vi.mock('@/lib/email/templates', () => ({
  buildNudgeEmail: () => '<p>nudge</p>',
}));

import { GET } from '@/app/api/cron/nudge/route';

type DocData = Record<string, unknown>;

interface FakeDoc {
  id: string;
  data: DocData;
  updates: DocData[];
}

/** Minimal Firestore stand-in for the shape this route uses. */
function makeFakeDb(initial: Record<string, DocData>) {
  const docs = new Map<string, FakeDoc>(
    Object.entries(initial).map(([id, data]) => [
      id,
      { id, data: { ...data }, updates: [] },
    ]),
  );

  let chain: Promise<unknown> = Promise.resolve();
  const serialize = <T>(fn: () => Promise<T>): Promise<T> => {
    const run = chain.then(fn, fn);
    chain = run.then(
      () => undefined,
      () => undefined,
    );
    return run;
  };

  const refFor = (id: string) => ({
    id,
    update(patch: DocData) {
      const doc = docs.get(id)!;
      doc.updates.push(patch);
      Object.assign(doc.data, patch);
      return Promise.resolve();
    },
    async get() {
      const doc = docs.get(id);
      return { exists: !!doc, data: () => (doc ? { ...doc.data } : undefined) };
    },
  });

  const query = {
    where: () => query,
    async get() {
      return {
        docs: [...docs.values()].map((d) => ({
          id: d.id,
          ref: refFor(d.id),
          data: () => ({ ...d.data }),
        })),
      };
    },
  };

  return {
    docs,
    collection: () => query,
    runTransaction: <T>(fn: (tx: unknown) => Promise<T>): Promise<T> =>
      serialize(() =>
        fn({
          async get(ref: { id: string }) {
            const doc = docs.get(ref.id);
            return {
              exists: !!doc,
              data: () => (doc ? { ...doc.data } : undefined),
            };
          },
          update(ref: { id: string }, patch: DocData) {
            const doc = docs.get(ref.id)!;
            doc.updates.push(patch);
            Object.assign(doc.data, patch);
          },
        }),
      ),
  };
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
const OVERDUE: DocData = {
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
    const db = makeFakeDb({ case_1: OVERDUE });
    fakeGetDb.mockReturnValue(db);

    expect((await GET(req())).status).toBe(401);
    expect((await GET(req({ secret: 'nope' }))).status).toBe(401);
    expect(fakeSend).not.toHaveBeenCalled();
  });

  it('401s when CRON_SECRET is not configured', async () => {
    delete process.env.CRON_SECRET;
    fakeGetDb.mockReturnValue(makeFakeDb({ case_1: OVERDUE }));
    expect((await GET(req({ secret: 'test-cron-secret' }))).status).toBe(401);
  });

  it('claims a case by moving it to nudged, then sends', async () => {
    const db = makeFakeDb({ case_1: OVERDUE });
    fakeGetDb.mockReturnValue(db);

    const res = await GET(req({ secret: 'test-cron-secret' }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, nudged: 1, skipped: 0, failed: 0 });

    // The claim is what takes the case out of every future query.
    expect(db.docs.get('case_1')!.updates[0]).toMatchObject({ status: 'nudged' });
    expect(db.docs.get('case_1')!.updates[0].nudgedAt).toEqual(expect.any(String));
    expect(fakeSend).toHaveBeenCalledTimes(1);
  });

  it('sends once when two runs overlap on the same case', async () => {
    const db = makeFakeDb({ case_1: OVERDUE });
    fakeGetDb.mockReturnValue(db);

    const [a, b] = await Promise.all([
      GET(req({ secret: 'test-cron-secret' })),
      GET(req({ secret: 'test-cron-secret' })),
    ]);

    const bodies = [await a.json(), await b.json()];
    const totalNudged = bodies.reduce((n, x) => n + x.nudged, 0);
    const totalSkipped = bodies.reduce((n, x) => n + x.skipped, 0);

    expect(fakeSend).toHaveBeenCalledTimes(1);
    expect(totalNudged).toBe(1);
    expect(totalSkipped).toBe(1);
  });

  it('does not nudge a case that already booked', async () => {
    const db = makeFakeDb({
      case_1: { ...OVERDUE, booking: { scheduledAt: '2026-09-01T10:00:00Z' } },
    });
    fakeGetDb.mockReturnValue(db);

    const res = await GET(req({ secret: 'test-cron-secret' }));
    expect(await res.json()).toEqual({ ok: true, nudged: 0, skipped: 1, failed: 0 });
    expect(fakeSend).not.toHaveBeenCalled();
  });

  it('skips an already-nudged case that the query somehow returned', async () => {
    // The fake does not apply `where` filters, so this doc reaches the route
    // even though a real query for status == 'submitted' would exclude it.
    // That is the point: the in-memory guard is the belt and braces behind
    // the claim, and it must hold on its own.
    const db = makeFakeDb({
      case_1: { ...OVERDUE, status: 'nudged', nudgedAt: '2026-08-29T00:00:00Z' },
    });
    fakeGetDb.mockReturnValue(db);

    const res = await GET(req({ secret: 'test-cron-secret' }));
    expect(await res.json()).toEqual({ ok: true, nudged: 0, skipped: 1, failed: 0 });
    expect(fakeSend).not.toHaveBeenCalled();
  });

  it('skips a case with no createdAt rather than sending', async () => {
    const db = makeFakeDb({
      case_1: { ...OVERDUE, createdAt: undefined },
    });
    fakeGetDb.mockReturnValue(db);

    const res = await GET(req({ secret: 'test-cron-secret' }));
    expect(await res.json()).toEqual({ ok: true, nudged: 0, skipped: 1, failed: 0 });
    expect(fakeSend).not.toHaveBeenCalled();
  });

  it('releases the claim when the send fails, so a later run can retry', async () => {
    const db = makeFakeDb({ case_1: OVERDUE });
    fakeGetDb.mockReturnValue(db);
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
    const db = makeFakeDb({
      case_1: OVERDUE,
      case_2: { ...OVERDUE, email: 'sam@example.com' },
    });
    fakeGetDb.mockReturnValue(db);
    fakeSend.mockRejectedValueOnce(new Error('resend down'));

    const res = await GET(req({ secret: 'test-cron-secret' }));
    expect(await res.json()).toEqual({ ok: true, nudged: 1, skipped: 0, failed: 1 });
    expect(fakeSend).toHaveBeenCalledTimes(2);
  });
});