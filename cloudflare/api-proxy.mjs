const FIREBASE_ORIGIN = 'https://studio--armchair-futurist.us-central1.hosted.app';

// Keep the browser on the site origin. Remove this seam as APIs move to Workers.
export function proxyApi(request, fetchOrigin = fetch) {
  const url = new URL(request.url);
  if (url.pathname !== '/api' && !url.pathname.startsWith('/api/')) return null;
  const target = new URL(url.pathname + url.search, FIREBASE_ORIGIN);
  const forwarded = new Request(target, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    duplex: 'half',
  });
  return fetchOrigin(forwarded, { redirect: 'manual' });
}
