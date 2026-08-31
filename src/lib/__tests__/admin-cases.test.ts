import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

const fakeGetDb = vi.fn();
vi.mock('@/lib/firebase-admin', () => ({ getDb: () => fakeGetDb() }));
// Use the real admin-session logic with a known password; compute the cookie
// the same way setAdminSessionCookie would.

import { GET, DELETE } from '@/app/api/admin/cases/route';

function req(method: 'GET' | 'DELETE', query = '', token = 'valid-token') {
  const url = `http://localhost:9002/api/admin/cases${query}`;
  return new NextRequest(url, {
    method,
    headers: token ? { cookie: 'admin_session=valid-token' } : {},
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  process.env.ADMIN_PASSWORD = 'test-admin-password';
});

// The real session token = HMAC-SHA256(ADMIN_SESSION_SECRET || ADMIN_PASSWORD, ADMIN_PASSWORD)
import { createHmac } from 'crypto';
const VALID_TOKEN = createHmac('sha256', 'test-admin-password')
  .update('test-admin-password')
  .digest('hex');

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

  it('400s on a disallowed collection', async () => {
    const res = await GET(req2('GET', '?collection=users', VALID_TOKEN));
    expect(res.status).toBe(400);
  });

  it('400s DELETE without an id', async () => {
    const res = await DELETE(req2('DELETE', '?collection=audit_cases', VALID_TOKEN));
    expect(res.status).toBe(400);
  });

  it('rejects malformed ids (path traversal guard)', async () => {
    const res = await DELETE(req2('DELETE', '?collection=audit_cases&id=../etc', VALID_TOKEN));
    expect(res.status).toBe(400);
  });
});
