import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  getRateLimitKey,
  RATE_LIMIT_ADMIN_AUTH,
} from '@/lib/email-utils';
import {
  ADMIN_SESSION_COOKIE,
  isValidAdminSessionToken,
  setAdminSessionCookie,
  clearAdminSessionCookie,
} from '@/lib/admin-session';

export async function GET(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const authenticated = isValidAdminSessionToken(token);
  return NextResponse.json({ authenticated });
}

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = checkRateLimit(
      `${getRateLimitKey(request)}:admin`,
      RATE_LIMIT_ADMIN_AUTH,
    );
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { authenticated: false, error: 'Too many attempts. Please try again later.' },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { password } = body;

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        { authenticated: false, error: 'Admin password not configured.' },
        { status: 500 },
      );
    }

    if (password === adminPassword) {
      const response = NextResponse.json({ authenticated: true });
      setAdminSessionCookie(response);
      return response;
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  clearAdminSessionCookie(response);
  return response;
}
