import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase-admin';
import {
  ADMIN_SESSION_COOKIE,
  isValidAdminSessionToken,
} from '@/lib/admin-session';

/**
 * Admin case management (Plan 010 follow-up).
 *
 * GET  /api/admin/cases?collection=audit_cases|identity_cases[&limit=20]
 *      → recent cases, newest first (caseId, status, archetype, email, dates)
 * DELETE /api/admin/cases?collection=...&id=...
 *      → deletes one case doc. Both require the admin session cookie
 *        (POST /api/admin/verify with ADMIN_PASSWORD first).
 */

const ALLOWED_COLLECTIONS = ['audit_cases', 'identity_cases'] as const;
type AllowedCollection = (typeof ALLOWED_COLLECTIONS)[number];

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
