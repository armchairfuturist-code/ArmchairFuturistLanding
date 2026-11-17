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
 * Storage moved to D1 on 2026-11-17, so the route is mocked at the case-store
 * seam rather than at a Firestore client.
 */

const fakeGetCase = vi.fn();
const fakeBookCase = vi.fn();

vi.mock('@/lib/case-store', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/case-store')>();
  return {
    ...actual,
    getCase: (...args: unknown[]) => fakeGetCase(...args),
    bookCase: (...args: unknown[]) => fakeBookCase(...args),
  };
});

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

interface FakeCase {
  data: Record<string, unknown>;
  updates: Record<string, unknown>[];
}

/** A stand-in for the D1 case table. */
function makeCases(initial: Record<string, Record<string, unknown>>) {
  const docs = new Map<string, FakeCase>(
    Object.entries(initial).map(([id, data]) => [id, { data: { ...data }, updates: [] }]),
  );

  fakeGetCase.mockImplementation(async (_collection: string, id: string) => {
    const doc = docs.get(id);
    return doc ? { ...doc.data } : null;
  });

  fakeBookCase.mockImplementation(
    async (id: string, scheduledAt: string, status: string) => {
      const doc = docs.get(id);
      if (!doc) throw new Error('missing case');
      const patch = { status, 'booking.scheduledAt': scheduledAt };
      doc.updates.push(patch);
      Object.assign(doc.data, patch);
    },
  );

  return { docs };
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
    const db = makeCases({ audit_abc123: { status: 'submitted' } });

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
    const db = makeCases({ id_abc123: { status: 'submitted' } });

    const res = await PATCH(req({ collection: 'identity_cases', id: 'id_abc123', body: { scheduledAt: ISO } }));
    expect(res.status).toBe(400);
    expect(db.docs.get('id_abc123')!.updates).toHaveLength(0);
  });

  it('404s when the case does not exist', async () => {
    makeCases({});
    const res = await PATCH(req({ collection: 'audit_cases', id: 'audit_missing1', body: { scheduledAt: ISO } }));
    expect(res.status).toBe(404);
  });

  it('books a submitted case and moves it to call_booked', async () => {
    const db = makeCases({
      audit_abc123: { status: 'submitted', booking: { url: 'https://cal.example/x' } },
    });

    const res = await PATCH(req({ collection: 'audit_cases', id: 'audit_abc123', body: { scheduledAt: ISO } }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      ok: true,
      collection: 'audit_cases',
      id: 'audit_abc123',
      status: 'call_booked',
      scheduledAt: ISO,
    });

    // bookCase writes one JSON key, so a stored booking.url survives.
    expect(fakeBookCase).toHaveBeenCalledWith('audit_abc123', ISO, 'call_booked');
    expect(db.docs.get('audit_abc123')!.updates[0]).toEqual({
      status: 'call_booked',
      'booking.scheduledAt': ISO,
    });
  });

  it('books a nudged case (the day-3 email already went out)', async () => {
    const db = makeCases({ audit_abc123: { status: 'nudged', nudgedAt: '2026-08-29T00:00:00Z' } });

    const res = await PATCH(req({ collection: 'audit_cases', id: 'audit_abc123', body: { scheduledAt: ISO } }));
    expect(res.status).toBe(200);
    expect(db.docs.get('audit_abc123')!.updates[0]).toMatchObject({ status: 'call_booked' });
  });

  it('allows rescheduling an already-booked case', async () => {
    const db = makeCases({
      audit_abc123: { status: 'call_booked', booking: { scheduledAt: '2026-08-30T09:00:00Z' } },
    });

    const res = await PATCH(req({ collection: 'audit_cases', id: 'audit_abc123', body: { scheduledAt: ISO } }));
    expect(res.status).toBe(200);
    expect(db.docs.get('audit_abc123')!.updates[0]).toMatchObject({ 'booking.scheduledAt': ISO });
  });

  it('409s on an illegal transition (a paid case cannot become call_booked)', async () => {
    const db = makeCases({ audit_abc123: { status: 'paid' } });

    const res = await PATCH(req({ collection: 'audit_cases', id: 'audit_abc123', body: { scheduledAt: ISO } }));
    expect(res.status).toBe(409);
    expect(db.docs.get('audit_abc123')!.updates).toHaveLength(0);
  });

  it('409s on an unknown status instead of throwing a 500', async () => {
    // The latent bug from finding 17: an unrecognised `from` used to make
    // canTransitionIn read a missing table row and throw a TypeError, which
    // the route's catch turns into a 500.
    const db = makeCases({ audit_abc123: { status: 'nudge-ed-typo' } });

    const res = await PATCH(req({ collection: 'audit_cases', id: 'audit_abc123', body: { scheduledAt: ISO } }));
    expect(res.status).toBe(409);
    expect(db.docs.get('audit_abc123')!.updates).toHaveLength(0);
  });

  it('409s when the case has no status at all', async () => {
    makeCases({ audit_abc123: { name: 'Dana' } });

    const res = await PATCH(req({ collection: 'audit_cases', id: 'audit_abc123', body: { scheduledAt: ISO } }));
    expect(res.status).toBe(409);
  });
});
