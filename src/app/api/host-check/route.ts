import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/** Temporary probe: reports the host headers the platform passes in. */
export async function GET(request: Request) {
  const headers = Object.fromEntries(request.headers.entries());
  return NextResponse.json({
    host: headers['host'] ?? null,
    forwardedHost: headers['x-forwarded-host'] ?? null,
    forwarded: headers['forwarded'] ?? null,
    fahMiddleware: headers['x-fah-middleware'] ?? null,
  });
}
