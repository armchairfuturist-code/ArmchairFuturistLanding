/**
 * Barrel for the email helpers. The implementations live in focused modules:
 * - validation helpers → `./email/validation`
 * - rate limiting → `./email/rate-limit`
 * - brand + wrapper → `./email/brand`
 *
 * This barrel is the established entry point: every production caller imports
 * `@/lib/email-utils`. The focused modules underneath are currently reached
 * only by their own tests. Importing them directly works and is not
 * discouraged, but it is not the pattern the codebase follows, so this comment
 * does not ask you to prefer them. If that should change, move the callers.
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
