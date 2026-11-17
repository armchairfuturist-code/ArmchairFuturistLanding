import { describe, expect, it, vi } from 'vitest';
import { proxyApi } from './api-proxy.mjs';

describe('Firebase API proxy', () => {
  it('preserves method, query, headers and body when forwarding', async () => {
    const upstream = vi.fn(async () => new Response('accepted', { status: 202 }));
    const request = new Request('https://example.com/api/contact?source=test', {
      method: 'POST', headers: { 'content-type': 'application/json', 'x-test': 'value' }, body: '{"name":"Alex"}',
    });
    const response = await proxyApi(request, upstream);
    const [forwarded, options] = upstream.mock.calls[0] as unknown as [Request, RequestInit];
    expect(forwarded.url).toBe('https://studio--armchair-futurist.us-central1.hosted.app/api/contact?source=test');
    expect(forwarded.method).toBe('POST');
    expect(forwarded.headers.get('x-test')).toBe('value');
    expect(await forwarded.text()).toBe('{"name":"Alex"}');
    expect(options.redirect).toBe('manual');
    expect(response?.status).toBe(202);
  });

  it('leaves site pages and similarly named paths to OpenNext', () => {
    expect(proxyApi(new Request('https://example.com/about'))).toBeNull();
    expect(proxyApi(new Request('https://example.com/apiculture'))).toBeNull();
  });
});
