/**
 * Backwards-compatibility shim. Implementations live in focused modules:
 * - validation helpers → `./email/validation`
 * - rate limiting → `./email/rate-limit`
 * - brand + wrapper → `./email/brand`
 *
 * Existing `@/lib/email-utils` imports keep working; prefer the focused
 * modules for new code.
 */
export {
  isValidEmail,
  escapeHtml,
  sanitizeEmailHeaderValue,
} from "./email/validation";
export {
  checkRateLimit,
  getRateLimitKey,
  RATE_LIMIT_LEAD_CAPTURE,
  RATE_LIMIT_ASSESSMENT,
  RATE_LIMIT_ADMIN_AUTH,
  type RateLimitConfig,
} from "./email/rate-limit";
export { EMAIL_BRAND, buildEmailWrapper } from "./email/brand";
