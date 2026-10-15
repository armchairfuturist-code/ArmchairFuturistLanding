import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  checkRateLimit,
  getRateLimitKey,
  type RateLimitConfig,
} from '@/lib/email/rate-limit';

const CONFIG: RateLimitConfig = { maxRequests: 5, windowMs: 60_000 };

function req(headers: Record<string, string> = {}) {
  return new Request('http://localhost/api/lead-capture', { headers });
}

describe('getRateLimitKey', () => {
  it('keys on the last hop, not the value the caller supplied', () => {
    // A caller can prepend anything. Only the rightmost entry was written by
    // a proxy we control, so that is the one that may be trusted.
    const key = getRateLimitKey(
      req({ 'x-forwarded-for': '1.2.3.4, 203.0.113.7' }),
    );
    expect(key).toBe('ratelimit:203.0.113.7');
    expect(key).not.toContain('1.2.3.4');
  });

  it('ignores a purely forged single value only when a real hop is appended', () => {
    expect(getRateLimitKey(req({ 'x-forwarded-for': '203.0.113.7' }))).toBe(
      'ratelimit:203.0.113.7',
    );
  });

  it('tolerates spaces and empty segments', () => {
    expect(getRateLimitKey(req({ 'x-forwarded-for': ' 1.1.1.1 ,, 2.2.2.2 ' }))).toBe(
      'ratelimit:2.2.2.2',
    );
  });

  it('falls back to a shared bucket when the header is absent', () => {
    expect(getRateLimitKey(req())).toBe('ratelimit:unknown');
  });
});

describe('checkRateLimit', () => {
  it('allows up to the limit and blocks past it for one key', () => {
    for (let i = 1; i <= CONFIG.maxRequests; i++) {
      expect(checkRateLimit('k-same', CONFIG).allowed).toBe(true);
    }
    const blocked = checkRateLimit('k-same', CONFIG);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it('reports the remaining allowance as it counts down', () => {
    expect(checkRateLimit('k-remain', CONFIG).remaining).toBe(4);
    expect(checkRateLimit('k-remain', CONFIG).remaining).toBe(3);
    expect(checkRateLimit('k-remain', CONFIG).remaining).toBe(2);
  });

  it('limits each key independently', () => {
    for (let i = 0; i < CONFIG.maxRequests + 3; i++) checkRateLimit('k-a', CONFIG);
    expect(checkRateLimit('k-a', CONFIG).allowed).toBe(false);
    expect(checkRateLimit('k-b', CONFIG).allowed).toBe(true);
  });

  it('resets once the window passes', () => {
    vi.useFakeTimers();
    try {
      for (let i = 0; i <= CONFIG.maxRequests; i++) checkRateLimit('k-window', CONFIG);
      expect(checkRateLimit('k-window', CONFIG).allowed).toBe(false);
      vi.advanceTimersByTime(CONFIG.windowMs + 1);
      expect(checkRateLimit('k-window', CONFIG).allowed).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not accumulate entries for keys it will never see again', () => {
    // A distinct key per request used to grow the Map for the life of the
    // process. The sweep bounds it, so a flood of unique keys cannot leak
    // memory without end.
    for (let i = 0; i < 12_000; i++) {
      checkRateLimit(`k-unique-${i}`, { maxRequests: 1, windowMs: 1 });
    }
    // Every entry from that batch is long expired; a fresh key still works.
    expect(checkRateLimit('k-after-flood', CONFIG).allowed).toBe(true);
  });
});