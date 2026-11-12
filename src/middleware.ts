import { NextRequest, NextResponse } from 'next/server';

const CANONICAL_HOST = 'thearmchairfuturist.com';
const WWW_HOST = `www.${CANONICAL_HOST}`;

/**
 * The www host served 200 for every path, so Search Console filed 17 pages as
 * duplicates of the apex. Firebase forwards the public host in
 * x-forwarded-host and rewrites Host itself, so both are checked.
 */
export function middleware(request: NextRequest) {
  const host = (
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    ''
  )
    .split(',')[0]
    .trim()
    .toLowerCase();

  if (host !== WWW_HOST) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.host = CANONICAL_HOST;
  url.protocol = 'https:';
  url.port = '';
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: '/:path*',
};
