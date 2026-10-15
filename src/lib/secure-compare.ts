import { createHash, timingSafeEqual } from "crypto";

/**
 * Compares two strings without leaking their contents through timing.
 *
 * Both sides are hashed first, so the compared buffers are always 32 bytes.
 * That matters: `timingSafeEqual` throws when the lengths differ, and a
 * length check before it would itself leak the expected length.
 *
 * Use this for every secret comparison — passwords, session tokens, cron
 * secrets. `===` stops at the first differing byte, so response time grows
 * with the length of the matching prefix and the value can be recovered one
 * byte at a time.
 */
export function constantTimeEqual(a: string, b: string): boolean {
  const ah = createHash("sha256").update(a, "utf8").digest();
  const bh = createHash("sha256").update(b, "utf8").digest();
  try {
    return timingSafeEqual(ah, bh);
  } catch {
    return false;
  }
}