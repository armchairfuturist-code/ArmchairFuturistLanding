/**
 * Audit day-3 nudge (Plan 010 Phase C).
 *
 * The nudge is a QUERY, not a task: any scheduler (Cloud Scheduler, Hermes
 * cron, CI) hits GET /api/cron/nudge with the shared secret and this module
 * decides which cases need a nudge. Idempotent via `nudgedAt` on the case
 * doc — a case is nudged at most once until it books.
 *
 * Honest cadence: one nudge, then silence. No drip campaign (design
 * principle 4: no dark patterns).
 */

/** 3 days in ms — the honest nudge window. */
export const NUDGE_WINDOW_MS = 3 * 24 * 60 * 60 * 1000;

/** The subset of an audit case doc the nudge reads. */
export interface NudgeCase {
  status?: string;
  createdAt?: string;
  nudgedAt?: string | null;
  booking?: { scheduledAt?: string };
  name?: string;
  email?: string;
  archetypeName?: string;
}

/**
 * Pure predicate: should this case get the day-3 nudge right now?
 * Rules: status must be 'submitted', no booking scheduled, older than the
 * 3-day window, and not already nudged.
 *
 * The route claims a case before sending by moving it to `status: 'nudged'`,
 * which already excludes it from the query. The `status` and `nudgedAt`
 * checks here stay as belt and braces, and as the guard the transaction
 * re-runs before it will claim anything.
 */
export function isOverdueForNudge(c: NudgeCase, nowIso: string): boolean {
  if (c.status !== 'submitted') return false;
  if (c.booking?.scheduledAt) return false;
  if (c.nudgedAt) return false;
  if (!c.createdAt) return false;
  const created = Date.parse(c.createdAt);
  if (!Number.isFinite(created)) return false;
  return Date.parse(nowIso) - created > NUDGE_WINDOW_MS;
}

/**
 * Firestore query shape for overdue cases. Kept as data (not executed) so
 * the route and any driver share one definition; the route applies it via
 * the admin SDK.
 */
export function buildOverdueQuery(nowIso: string) {
  const cutoff = new Date(Date.parse(nowIso) - NUDGE_WINDOW_MS).toISOString();
  return {
    collection: 'audit_cases',
    filters: [
      { field: 'status', op: '==', value: 'submitted' },
      { field: 'createdAt', op: '<=', value: cutoff },
    ],
    // nudgedAt is also enforced in-memory after fetch, as belt and braces
    // behind the `status: 'nudged'` claim the route writes before sending.
    cutoff,
  };
}
