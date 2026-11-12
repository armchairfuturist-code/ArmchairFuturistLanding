import { NextRequest, NextResponse } from 'next/server';

const CANONICAL_HOST = 'thearmchairfuturist.com';
const WWW_HOST = `www.${CANONICAL_HOST}`;

/**
 * The www host served 200 for every path, so Search Console filed 17 pages
 * as duplicates of the apex and crawled the apex only rarely. A permanent
 * host redirect collapses the two names into one.
 */
export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') || '').toLowerCase();
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
