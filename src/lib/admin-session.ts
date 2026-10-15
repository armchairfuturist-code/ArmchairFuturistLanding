import { createHmac } from 'crypto';
import type { NextResponse } from 'next/server';
import { constantTimeEqual } from './secure-compare';

export const ADMIN_SESSION_COOKIE = 'admin_session';

/** How long a session stays valid. Enforced on the server, not just in the browser. */
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

/**
 * Tolerated clock skew, in seconds, when a token claims to come from the
 * future. A few seconds of drift between the machine that signed a cookie and
 * the one verifying it should not log anyone out.
 */
const CLOCK_SKEW_SECONDS = 60;

function sessionSecret(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return process.env.ADMIN_SESSION_SECRET || password;
}

function signatureFor(issuedAt: number, secret: string): string {
  const password = process.env.ADMIN_PASSWORD as string;
  return createHmac('sha256', secret).update(`${password}.${issuedAt}`).digest('hex');
}

/**
 * Builds a session token of the form `<issuedAt>.<hmac>`.
 *
 * The issue time is inside the signed payload and is verified on every
 * request. The previous token was a constant — HMAC(secret, password) — so it
 * never expired on the server, and a cookie copied today still worked months
 * later. The cookie's `maxAge` is only a hint to the browser and cannot be
 * relied on for this.
 */
export function createAdminSessionToken(now: number = Date.now()): string | null {
  const secret = sessionSecret();
  if (!secret) return null;
  const issuedAt = Math.floor(now / 1000);
  return `${issuedAt}.${signatureFor(issuedAt, secret)}`;
}

export function isValidAdminSessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const separator = token.indexOf('.');
  if (separator <= 0 || separator === token.length - 1) return false;

  const issuedAtRaw = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  if (!/^\d{1,12}$/.test(issuedAtRaw)) return false;

  const secret = sessionSecret();
  if (!secret) return false;

  const issuedAt = Number(issuedAtRaw);
  const now = Math.floor(Date.now() / 1000);
  if (!Number.isFinite(issuedAt)) return false;
  if (issuedAt > now + CLOCK_SKEW_SECONDS) return false;
  if (now - issuedAt > ADMIN_SESSION_MAX_AGE_SECONDS) return false;

  return constantTimeEqual(signature, signatureFor(issuedAt, secret));
}

function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
  };
}

export function setAdminSessionCookie(response: NextResponse): void {
  const token = createAdminSessionToken();
  if (!token) return;
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    ...cookieOptions(),
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  });
}

export function clearAdminSessionCookie(response: NextResponse): void {
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    ...cookieOptions(),
    maxAge: 0,
  });
}