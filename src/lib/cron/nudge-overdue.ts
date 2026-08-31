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

interface NudgeCheckCase {
  status?: string;
  createdAt?: string;
  nudgedAt?: string;
  booking?: { scheduledAt?: string };
}

/**
 * Pure predicate: should this case get the day-3 nudge right now?
 * Rules: status must be 'submitted', no booking scheduled, older than the
 * 3-day window, and not already nudged.
 */
export function isOverdueForNudge(c: {
  status?: string;
  createdAt?: string;
  nudgedAt?: string;
  booking?: { scheduledAt?: string };
}, nowIso: string): boolean {
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
    // nudgedAt missing is enforced in-memory after fetch (Firestore can't
    // combine "field missing" with range filters portably).
    cutoff,
  };
}
