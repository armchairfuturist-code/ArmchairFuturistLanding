import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// Storage moved to D1 (2026-11-17); the route is mocked at the case-store seam.
const fakeListCases = vi.fn();
const fakeDeleteCase = vi.fn();
const fakeGetCase = vi.fn();

vi.mock('@/lib/case-store', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/case-store')>();
  return {
    ...actual,
    listCases: (...args: unknown[]) => fakeListCases(...args),
    getCase: (...args: unknown[]) => fakeGetCase(...args),
    deleteCase: (...args: unknown[]) => fakeDeleteCase(...args),
  };
});

// Use the real admin-session logic with a known password, and mint the cookie
// with the same function setAdminSessionCookie uses. Computing it by hand here
// once let the accept path go unasserted while the format drifted underneath.

import { GET, DELETE } from '@/app/api/admin/cases/route';
import {
  createAdminSessionToken,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  isValidAdminSessionToken,
} from '@/lib/admin-session';

beforeEach(() => {
  vi.clearAllMocks();
  process.env.ADMIN_PASSWORD = 'test-admin-password';
  delete process.env.ADMIN_SESSION_SECRET;
});

/** The token the route will accept right now. */
const VALID_TOKEN = () => createAdminSessionToken() as string;

function req2(method: 'GET' | 'DELETE', query = '', token?: string) {
  const url = `http://localhost:9002/api/admin/cases${query}`;
  const headers: Record<string, string> = {};
  if (token !== undefined) headers.cookie = `admin_session=${token}`;
  return new NextRequest(url, { method, headers });
}

describe('admin cases route', () => {
  it('401s without a valid session', async () => {
    const res = await GET(req2('GET', '?collection=audit_cases', 'wrong-token'));
    expect(res.status).toBe(401);
    const res2 = await GET(req2('GET', '?collection=audit_cases'));
    expect(res2.status).toBe(401);
  });

  it('accepts a freshly minted session', async () => {
    fakeListCases.mockResolvedValue([]);
    const res = await GET(req2('GET', '?collection=audit_cases', VALID_TOKEN()));
    expect(res.status).toBe(200);
    expect(fakeListCases).toHaveBeenCalledWith('audit_cases', 25);
  });

  it('400s on a disallowed collection', async () => {
    const res = await GET(req2('GET', '?collection=users', VALID_TOKEN()));
    expect(res.status).toBe(400);
  });

  it('400s DELETE without an id', async () => {
    const res = await DELETE(req2('DELETE', '?collection=audit_cases', VALID_TOKEN()));
    expect(res.status).toBe(400);
  });

  it('rejects malformed ids (path traversal guard)', async () => {
    const res = await DELETE(
      req2('DELETE', '?collection=audit_cases&id=../etc', VALID_TOKEN()),
    );
    expect(res.status).toBe(400);
  });
});

describe('admin session token expiry', () => {
  it('accepts a token issued now', () => {
    expect(isValidAdminSessionToken(VALID_TOKEN())).toBe(true);
  });

  it('rejects a token issued before the session window', () => {
    const now = Date.now();
    const stale = createAdminSessionToken(
      now - (ADMIN_SESSION_MAX_AGE_SECONDS + 60) * 1000,
    ) as string;
    expect(isValidAdminSessionToken(stale)).toBe(false);
  });

  it('rejects a token whose issue time was tampered with', () => {
    // Take a signature minted for an older issue time and pair it with a
    // fresh one. The timestamp is inside the signed payload, so moving it
    // invalidates the signature — this is what stops someone extending their
    // own session by editing the cookie.
    const older = createAdminSessionToken(Date.now() - 60 * 60 * 1000) as string;
    const signature = older.slice(older.indexOf('.') + 1);
    const forged = `${Math.floor(Date.now() / 1000)}.${signature}`;
    expect(isValidAdminSessionToken(forged)).toBe(false);
    expect(isValidAdminSessionToken(older)).toBe(true);
  });

  it('rejects malformed tokens without throwing', () => {
    for (const bad of ['', '.', 'abc', '.abc', '123.', '9999999999999999999.x']) {
      expect(isValidAdminSessionToken(bad)).toBe(false);
    }
  });
});
