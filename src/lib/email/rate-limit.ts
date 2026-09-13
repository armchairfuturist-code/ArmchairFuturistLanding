/**
 * Simple in-memory rate limiter.
 * Tracks request counts per key within a sliding window.
 * Per-instance Map: each server instance tracks its own counts.
 */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

const DEFAULT_CONFIG: RateLimitConfig = { maxRequests: 10, windowMs: 60000 };

export const RATE_LIMIT_LEAD_CAPTURE: RateLimitConfig = { maxRequests: 5, windowMs: 60000 };
export const RATE_LIMIT_ASSESSMENT: RateLimitConfig = { maxRequests: 5, windowMs: 60000 };
export const RATE_LIMIT_ADMIN_AUTH: RateLimitConfig = { maxRequests: 5, windowMs: 300000 };

export function checkRateLimit(
  key: string,
  config: RateLimitConfig = DEFAULT_CONFIG,
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + config.windowMs });
    return { allowed: true, remaining: config.maxRequests - 1, resetAt: now + config.windowMs };
  }

  entry.count++;
  if (entry.count > config.maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  return { allowed: true, remaining: config.maxRequests - entry.count, resetAt: entry.resetAt };
}

export function getRateLimitKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  return `ratelimit:${ip}`;
}
