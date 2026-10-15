import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase-admin';
import {
  ADMIN_SESSION_COOKIE,
  isValidAdminSessionToken,
} from '@/lib/admin-session';
import { canTransition, type AuditStatus } from '@/lib/audit/state';

/**
 * Admin case management (Plan 010 follow-up).
 *
 * GET    /api/admin/cases?collection=audit_cases|identity_cases[&limit=20]
 *        → recent cases, newest first (caseId, status, archetype, email, dates)
 * PATCH  /api/admin/cases?collection=...&id=...  body: { scheduledAt }
 *        → records a booking on an audit case: sets booking.scheduledAt and
 *          moves status submitted|nudged -> call_booked through the state
 *          machine. Without this writer the day-3 nudge had no way to know a
 *          client had already booked, so it chased them.
 * DELETE /api/admin/cases?collection=...&id=...
 *        → deletes one case doc. All require the admin session cookie
 *          (POST /api/admin/verify with ADMIN_PASSWORD first).
 */

const ALLOWED_COLLECTIONS = ['audit_cases', 'identity_cases'] as const;
type AllowedCollection = (typeof ALLOWED_COLLECTIONS)[number];

/** The status a booked case moves to. Only audit cases have a call. */
const BOOKED_STATUS: AuditStatus = 'call_booked';

function isAllowed(c: string | null): c is AllowedCollection {
  return c === 'audit_cases' || c === 'identity_cases';
}

function unauthorized(): NextResponse {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!isValidAdminSessionToken(token)) return unauthorized();

  const collection = request.nextUrl.searchParams.get('collection');
  if (!isAllowed(collection)) {
    return NextResponse.json(
      { error: `collection must be one of: ${ALLOWED_COLLECTIONS.join(', ')}` },
      { status: 400 },
    );
  }

  try {
    const db = getDb();
    const limitParam = Number(request.nextUrl.searchParams.get('limit') ?? 25);
    const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 100) : 25;

    const snap = await db
      .collection(collection)
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();

    const cases = snap.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        caseId: d.caseId,
        offer: d.offer,
        status: d.status,
        name: d.name,
        email: d.email,
        archetypeName: d.archetypeName,
        createdAt: d.createdAt,
        booking: d.booking ?? null,
        nudgedAt: d.nudgedAt ?? null,
      };
    });

    return NextResponse.json({ ok: true, collection, cases });
  } catch (err) {
    console.error('Admin cases list error:', err);
    return NextResponse.json({ error: 'Failed to list cases.' }, { status: 500 });
  }
}

/**
 * Records a booking on an audit case.
 *
 * Body: `{ scheduledAt: string }` (ISO). Moves the case to `call_booked`
 * through `canTransition`, so an illegal move (a paid or dead case) is
 * refused rather than silently overwritten. Rescheduling an already-booked
 * case is allowed and just updates the time.
 *
 * This is the writer the day-3 nudge guard was missing. Identity cases have
 * no call, so they are refused.
 */
export async function PATCH(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!isValidAdminSessionToken(token)) return unauthorized();

  const collection = request.nextUrl.searchParams.get('collection');
  const caseId = request.nextUrl.searchParams.get('id');
  if (!isAllowed(collection)) {
    return NextResponse.json(
      { error: `collection must be one of: ${ALLOWED_COLLECTIONS.join(', ')}` },
      { status: 400 },
    );
  }
  if (!caseId || !/^[a-z0-9_]{6,64}$/i.test(caseId)) {
    return NextResponse.json({ error: 'id required' }, { status: 400 });
  }
  if (collection !== 'audit_cases') {
    return NextResponse.json(
      { error: 'Bookings are only recorded for audit_cases.' },
      { status: 400 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }
  const scheduledAt = (body as { scheduledAt?: unknown } | null)?.scheduledAt;
  if (typeof scheduledAt !== 'string' || !Number.isFinite(Date.parse(scheduledAt))) {
    return NextResponse.json(
      { error: 'scheduledAt must be an ISO date string.' },
      { status: 400 },
    );
  }

  try {
    const db = getDb();
    const ref = db.collection(collection).doc(caseId);
    const doc = await ref.get();
    if (!doc.exists) {
      return NextResponse.json({ error: 'Case not found.' }, { status: 404 });
    }

    const from = (doc.data() as { status?: unknown } | undefined)?.status;
    if (typeof from !== 'string') {
      return NextResponse.json({ error: 'Case has no status.' }, { status: 409 });
    }
    if (from !== BOOKED_STATUS && !canTransition(from as AuditStatus, BOOKED_STATUS)) {
      return NextResponse.json(
        { error: `Cannot move a ${from} case to ${BOOKED_STATUS}.` },
        { status: 409 },
      );
    }

    // Dot path, not `booking: {...}` — a whole-map write would drop any
    // booking.url already stored on the case.
    await ref.update({
      status: BOOKED_STATUS,
      'booking.scheduledAt': scheduledAt,
    });

    return NextResponse.json({
      ok: true,
      collection,
      id: caseId,
      status: BOOKED_STATUS,
      scheduledAt,
    });
  } catch (err) {
    console.error('Admin case booking error:', err);
    return NextResponse.json({ error: 'Failed to record booking.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!isValidAdminSessionToken(token)) return unauthorized();

  const collection = request.nextUrl.searchParams.get('collection');
  const caseId = request.nextUrl.searchParams.get('id');
  if (!isAllowed(collection)) {
    return NextResponse.json(
      { error: `collection must be one of: ${ALLOWED_COLLECTIONS.join(', ')}` },
      { status: 400 },
    );
  }
  if (!caseId || !/^[a-z0-9_]{6,64}$/i.test(caseId)) {
    return NextResponse.json({ error: 'id required' }, { status: 400 });
  }

  try {
    const db = getDb();
    const ref = db.collection(collection).doc(caseId);
    const doc = await ref.get();
    if (!doc.exists) {
      return NextResponse.json({ error: 'Case not found.' }, { status: 404 });
    }
    await ref.delete();
    return NextResponse.json({ ok: true, deleted: caseId, collection });
  } catch (err) {
    console.error('Admin case delete error:', err);
    return NextResponse.json({ error: 'Failed to delete case.' }, { status: 500 });
  }
}
