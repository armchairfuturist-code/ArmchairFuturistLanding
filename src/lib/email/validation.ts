/**
 * Validate an email address using a simple, permissive regex.
 * Matches the convention used historically across this codebase:
 * one or more non-whitespace, non-`@` chars, an `@`, more non-whitespace,
 * a literal `.`, then more non-whitespace.
 */
export function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

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
