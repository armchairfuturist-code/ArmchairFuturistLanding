/**
 * Simple in-memory rate limiter.
 * Tracks request counts per key within a sliding window.
 * Per-instance Map: each server instance tracks its own counts.
 *
 * Two limits worth knowing about:
 *
 * 1. Per-instance. On a serverless platform that scales out, N instances mean
 *    roughly N times the allowance, and a cold start forgets everything. This
 *    is a speed bump, not a defence. Anything that genuinely needs limiting
 *    (auth attempts, paid email sends) needs shared state.
 * 2. Keys are only as trustworthy as the header they come from. See
 *    getRateLimitKey.
 */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

/**
 * When the store passes this many keys, expired entries are swept.
 *
 * Without a sweep the Map only ever grows: an entry is replaced when the same
 * key is seen again, but nothing removes keys that are never seen again, so
 * every distinct caller adds one permanently. A slow trickle of unique keys
 * leaks memory for the life of the process.
 */
const PRUNE_THRESHOLD = 10_000;

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

const DEFAULT_CONFIG: RateLimitConfig = { maxRequests: 10, windowMs: 60000 };

export const RATE_LIMIT_LEAD_CAPTURE: RateLimitConfig = { maxRequests: 5, windowMs: 60000 };
export const RATE_LIMIT_ASSESSMENT: RateLimitConfig = { maxRequests: 5, windowMs: 60000 };
export const RATE_LIMIT_ADMIN_AUTH: RateLimitConfig = { maxRequests: 5, windowMs: 300000 };

function pruneExpired(now: number): void {
  for (const [key, entry] of rateLimitStore) {
    if (now > entry.resetAt) rateLimitStore.delete(key);
  }
}

export function checkRateLimit(
  key: string,
  config: RateLimitConfig = DEFAULT_CONFIG,
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  if (rateLimitStore.size > PRUNE_THRESHOLD) pruneExpired(now);

  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    const resetAt = now + config.windowMs;
    rateLimitStore.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: config.maxRequests - 1, resetAt };
  }

  entry.count++;
  if (entry.count > config.maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  return { allowed: true, remaining: config.maxRequests - entry.count, resetAt: entry.resetAt };
}

/**
 * Derives the rate-limit key from the request.
 *
 * `x-forwarded-for` is a list, and the caller can send their own value for it.
 * Each proxy on the path appends the address it saw. So the LEFTMOST entry is
 * whatever the client claimed, and only the RIGHTMOST entry was written by a
 * party we control. Reading the leftmost entry — as this did — let any caller
 * pick their own bucket and bypass the limit entirely by sending one forged
 * header per request. Measured: 500 requests with 500 forged values against a
 * limit of 5 were all allowed.
 *
 * This assumes the platform's proxy appends (Google Cloud Load Balancing and
 * Firebase Hosting do). If that ever changes, the rightmost entry stops being
 * trustworthy and this needs a platform-provided client-IP header instead.
 */
export function getRateLimitKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const hops = forwarded
    ?.split(",")
    .map((hop) => hop.trim())
    .filter(Boolean);
  const ip = hops && hops.length > 0 ? hops[hops.length - 1] : "unknown";
  return `ratelimit:${ip}`;
}