import { createHmac, timingSafeEqual } from 'crypto';
import type { NextResponse } from 'next/server';

export const ADMIN_SESSION_COOKIE = 'admin_session';

function sessionToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  const secret = process.env.ADMIN_SESSION_SECRET || password;
  return createHmac('sha256', secret).update(password).digest('hex');
}

export function isValidAdminSessionToken(token: string | undefined): boolean {
  const expected = sessionToken();
  if (!expected || !token) return false;
  try {
    const a = Buffer.from(token, 'utf8');
    const b = Buffer.from(expected, 'utf8');
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function setAdminSessionCookie(response: NextResponse): void {
  const token = sessionToken();
  if (!token) return;
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
}

export function clearAdminSessionCookie(response: NextResponse): void {
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
}
