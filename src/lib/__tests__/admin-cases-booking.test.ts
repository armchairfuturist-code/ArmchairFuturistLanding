import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Tests for the booking writer added by finding 7.
 *
 * The day-3 nudge guard skipped booked cases, but nothing in the codebase
 * wrote `booking.scheduledAt`, so the guard had no writer and booked clients
 * were chased. This is that writer's contract: same admin cookie as GET and
 * DELETE, validated collection and id, a real ISO timestamp, and the status
 * moved through the audit state machine rather than set arbitrarily.
 *
 * The cookie is produced by calling the real `setAdminSessionCookie`, not by
 * recomputing the HMAC here, so the test keeps working if the token scheme
 * changes.
 *
 * Kept in its own file because another worker is editing
 * `admin-cases.test.ts` for the GET/DELETE paths.
 */

const fakeGetDb = vi.fn();
vi.mock('@/lib/firebase-admin', () => ({ getDb: () => fakeGetDb() }));

import { PATCH } from '@/app/api/admin/cases/route';
import {
  ADMIN_SESSION_COOKIE,
  setAdminSessionCookie,
} from '@/lib/admin-session';

/** Build a valid session cookie value using the production helper. */
function validToken(): string {
  const res = NextResponse.json({});
  setAdminSessionCookie(res);
  const raw = res.headers.get('set-cookie') ?? '';
  const match = raw.match(new RegExp(`${ADMIN_SESSION_COOKIE}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : '';
}

interface FakeDoc {
  data: Record<string, unknown>;
  updates: Record<string, unknown>[];
}

function makeFakeDb(initial: Record<string, Record<string, unknown>>) {
  const docs = new Map<string, FakeDoc>(
    Object.entries(initial).map(([id, data]) => [
      id,
      { data: { ...data }, updates: [] },
    ]),
  );

  return {
    docs,
    collection: () => ({
      doc: (id: string) => ({
        async get() {
          const doc = docs.get(id);
          return { exists: !!doc, data: () => (doc ? { ...doc.data } : undefined) };
        },
        async update(patch: Record<string, unknown>) {
          const doc = docs.get(id);
          if (!doc) throw new Error('missing doc');
          doc.updates.push(patch);
          Object.assign(doc.data, patch);
        },
      }),
    }),
  };
}

function req(opts: {
  collection?: string;
  id?: string;
  body?: unknown;
  rawBody?: string;
  token?: string | null;
}) {
  const params = new URLSearchParams({ limit: '25' });
  if (opts.collection !== undefined) params.set('collection', opts.collection);
  if (opts.id !== undefined) params.set('id', opts.id);

  const headers: Record<string, string> = {
    'content-type': 'application/json',
  };
  const token = opts.token === undefined ? validToken() : opts.token;
  if (token) headers.cookie = `${ADMIN_SESSION_COOKIE}=${token}`;

  return new NextRequest(
    `http://localhost:9002/api/admin/cases?${params.toString()}`,
    {
      method: 'PATCH',
      headers,
      body: opts.rawBody ?? JSON.stringify(opts.body ?? {}),
    },
  );
}

const ISO = '2026-09-01T10:00:00Z';

beforeEach(() => {
  vi.clearAllMocks();
  process.env.ADMIN_PASSWORD = 'test-admin-password';
});

describe('admin cases PATCH (record a booking)', () => {
  it('401s without a valid session', async () => {
    const db = makeFakeDb({ audit_abc123: { status: 'submitted' } });
    fakeGetDb.mockReturnValue(db);

    const noCookie = await PATCH(
      req({ collection: 'audit_cases', id: 'audit_abc123', body: { scheduledAt: ISO }, token: null }),
    );
    expect(noCookie.status).toBe(401);

    const badCookie = await PATCH(
      req({ collection: 'audit_cases', id: 'audit_abc123', body: { scheduledAt: ISO }, token: 'wrong' }),
    );
    expect(badCookie.status).toBe(401);

    expect(db.docs.get('audit_abc123')!.updates).toHaveLength(0);
  });

  it('400s on a disallowed collection', async () => {
    const res = await PATCH(req({ collection: 'users', id: 'audit_abc123', body: { scheduledAt: ISO } }));
    expect(res.status).toBe(400);
  });

  it('400s on a missing or malformed id', async () => {
    expect((await PATCH(req({ collection: 'audit_cases', body: { scheduledAt: ISO } }))).status).toBe(400);
    expect(
      (await PATCH(req({ collection: 'audit_cases', id: '../etc/passwd', body: { scheduledAt: ISO } }))).status,
    ).toBe(400);
  });

  it('400s on an unparseable body', async () => {
    const res = await PATCH(
      req({ collection: 'audit_cases', id: 'audit_abc123', rawBody: '{not json' }),
    );
    expect(res.status).toBe(400);
  });

  it('400s when scheduledAt is missing or not a date', async () => {
    expect(
      (await PATCH(req({ collection: 'audit_cases', id: 'audit_abc123', body: {} }))).status,
    ).toBe(400);
    expect(
      (await PATCH(req({ collection: 'audit_cases', id: 'audit_abc123', body: { scheduledAt: 'soon' } }))).status,
    ).toBe(400);
  });

  it('400s for identity_cases, which have no call to book', async () => {
    const db = makeFakeDb({ id_abc123: { status: 'submitted' } });
    fakeGetDb.mockReturnValue(db);

    const res = await PATCH(req({ collection: 'identity_cases', id: 'id_abc123', body: { scheduledAt: ISO } }));
    expect(res.status).toBe(400);
    expect(db.docs.get('id_abc123')!.updates).toHaveLength(0);
  });

  it('404s when the case does not exist', async () => {
    fakeGetDb.mockReturnValue(makeFakeDb({}));
    const res = await PATCH(req({ collection: 'audit_cases', id: 'audit_missing1', body: { scheduledAt: ISO } }));
    expect(res.status).toBe(404);
  });

  it('books a submitted case: sets the dot path and moves to call_booked', async () => {
    const db = makeFakeDb({
      audit_abc123: { status: 'submitted', booking: { url: 'https://cal.example/x' } },
    });
    fakeGetDb.mockReturnValue(db);

    const res = await PATCH(req({ collection: 'audit_cases', id: 'audit_abc123', body: { scheduledAt: ISO } }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      ok: true,
      collection: 'audit_cases',
      id: 'audit_abc123',
      status: 'call_booked',
      scheduledAt: ISO,
    });

    const patch = db.docs.get('audit_abc123')!.updates[0];
    // Dot path, not a whole-map write, so booking.url survives.
    expect(patch).toEqual({ status: 'call_booked', 'booking.scheduledAt': ISO });
  });

  it('books a nudged case (the day-3 email already went out)', async () => {
    const db = makeFakeDb({ audit_abc123: { status: 'nudged', nudgedAt: '2026-08-29T00:00:00Z' } });
    fakeGetDb.mockReturnValue(db);

    const res = await PATCH(req({ collection: 'audit_cases', id: 'audit_abc123', body: { scheduledAt: ISO } }));
    expect(res.status).toBe(200);
    expect(db.docs.get('audit_abc123')!.updates[0]).toMatchObject({ status: 'call_booked' });
  });

  it('allows rescheduling an already-booked case', async () => {
    const db = makeFakeDb({
      audit_abc123: { status: 'call_booked', booking: { scheduledAt: '2026-08-30T09:00:00Z' } },
    });
    fakeGetDb.mockReturnValue(db);

    const res = await PATCH(req({ collection: 'audit_cases', id: 'audit_abc123', body: { scheduledAt: ISO } }));
    expect(res.status).toBe(200);
    expect(db.docs.get('audit_abc123')!.updates[0]).toMatchObject({ 'booking.scheduledAt': ISO });
  });

  it('409s on an illegal transition (a paid case cannot become call_booked)', async () => {
    const db = makeFakeDb({ audit_abc123: { status: 'paid' } });
    fakeGetDb.mockReturnValue(db);

    const res = await PATCH(req({ collection: 'audit_cases', id: 'audit_abc123', body: { scheduledAt: ISO } }));
    expect(res.status).toBe(409);
    expect(db.docs.get('audit_abc123')!.updates).toHaveLength(0);
  });

  it('409s on an unknown status instead of throwing a 500', async () => {
    // The latent bug from finding 17: an unrecognised `from` used to make
    // canTransitionIn read a missing table row and throw a TypeError, which
    // the route's catch turns into a 500.
    const db = makeFakeDb({ audit_abc123: { status: 'nudge-ed-typo' } });
    fakeGetDb.mockReturnValue(db);

    const res = await PATCH(req({ collection: 'audit_cases', id: 'audit_abc123', body: { scheduledAt: ISO } }));
    expect(res.status).toBe(409);
    expect(db.docs.get('audit_abc123')!.updates).toHaveLength(0);
  });

  it('409s when the case has no status at all', async () => {
    const db = makeFakeDb({ audit_abc123: { name: 'Dana' } });
    fakeGetDb.mockReturnValue(db);

    const res = await PATCH(req({ collection: 'audit_cases', id: 'audit_abc123', body: { scheduledAt: ISO } }));
    expect(res.status).toBe(409);
  });
});