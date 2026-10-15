import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

import { GET } from '@/app/api/substack/route';

/**
 * Finding 10: `clearTimeout(timeout)` used to run right after `fetch`
 * resolved, so the 5s abort covered the response headers only. A server that
 * returned headers and then stalled the body held the request until the
 * platform killed it.
 *
 * The "stalled body" test is the regression test: with the old ordering the
 * timer was already cleared, advancing the clock aborts nothing, and the
 * promise never settles. With the fix the abort fires and the route degrades
 * to a 500, which is what leaves the newsletter section empty rather than
 * hanging.
 */

// Substack sends post bodies as CDATA, so the parser yields literal tags and
// the route strips them. Entity-escaped tags are not decoded, because the
// route configures the parser with processEntities: false.
const FEED = `<?xml version="1.0"?><rss><channel>
  <item><title>One</title><description><![CDATA[<p>Hi <b>there</b></p>]]></description>
  <link>https://example.com/1</link><pubDate>Mon, 01 Sep 2026 00:00:00 GMT</pubDate></item>
  <item><title>Two</title><description>Second</description>
  <link>https://example.com/2</link><pubDate>Sun, 31 Aug 2026 00:00:00 GMT</pubDate></item>
</channel></rss>`;

function req() {
  return new NextRequest('http://localhost:9002/api/substack', { method: 'GET' });
}

beforeEach(() => {
  vi.restoreAllMocks();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('substack feed route', () => {
  it('returns the first posts from a healthy feed', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, text: async () => FEED }),
    );

    const res = await GET(req());
    expect(res.status).toBe(200);
    const posts = await res.json();
    expect(posts.map((p: { title: string }) => p.title)).toEqual(['One', 'Two']);
    expect(posts[0].description).toBe('Hi there');
  });

  it('degrades to 500 when the response is not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, text: async () => '' }));
    const res = await GET(req());
    expect(res.status).toBe(500);
  });

  it('aborts and degrades when the body stalls, instead of hanging', async () => {
    vi.useFakeTimers();

    // Headers arrive at once; the body only settles when the signal aborts.
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((_url: string, init: { signal: AbortSignal }) =>
        Promise.resolve({
          ok: true,
          text: () =>
            new Promise((_resolve, reject) => {
              init.signal.addEventListener('abort', () =>
                reject(new Error('The operation was aborted.')),
              );
            }),
        }),
      ),
    );

    const pending = GET(req());
    await vi.advanceTimersByTimeAsync(5000);

    const res = await pending;
    expect(res.status).toBe(500);
  });
});