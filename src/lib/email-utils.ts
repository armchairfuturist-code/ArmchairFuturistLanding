/**
 * HTML-escape user-supplied strings for safe email/content rendering.
 * Prevents XSS via interpolation into HTML templates.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/** Strip CR/LF to prevent email header injection in subjects and display names. */
export function sanitizeEmailHeaderValue(str: string): string {
  return str.replace(/[\r\n]/g, " ").trim().slice(0, 200);
}

/**
 * Simple in-memory rate limiter.
 * Tracks request counts per key within a sliding window.
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

export const EMAIL_BRAND = {
  brandColor: "#1e3a5f",
  accentColor: "#3b82f6",
  textColor: "#1a1a2e",
  mutedColor: "#6b7280",
  bgColor: "#f8fafc",
  calendarUrl: "https://calendar.app.google/nAHHwNMfhDvXGv7P7",
} as const;

export function buildEmailWrapper(opts: {
  headerTitle: string;
  bodyHtml: string;
  footerHtml?: string;
}): string {
  const { headerTitle, bodyHtml, footerHtml } = opts;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:${EMAIL_BRAND.bgColor};font-family:Arial,Helvetica,sans-serif;color:${EMAIL_BRAND.textColor};">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${EMAIL_BRAND.bgColor};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background:${EMAIL_BRAND.brandColor};padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:14px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.7);">The Armchair Futurist</p>
              <h1 style="margin:12px 0 0;font-size:24px;font-weight:700;color:#ffffff;">${headerTitle}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              ${bodyHtml}
            </td>
          </tr>
          ${footerHtml ? `<tr><td style="padding:24px 40px;border-top:1px solid #e5e7eb;text-align:center;">${footerHtml}</td></tr>` : ""}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
