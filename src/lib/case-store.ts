import { getD1 } from './d1';

/**
 * Reads and writes on the paid-case tables (`audit_cases`, `identity_cases`).
 *
 * These replaced the Firestore document calls in the admin route and the nudge
 * cron. The whole case document lives in the `doc` JSON column, so the API
 * keeps returning the shape it always did, while the columns beside it carry
 * the fields the queries filter on.
 */

export const CASE_COLLECTIONS = ['audit_cases', 'identity_cases'] as const;
export type CaseCollection = (typeof CASE_COLLECTIONS)[number];

export function isCaseCollection(value: string | null): value is CaseCollection {
  return value === 'audit_cases' || value === 'identity_cases';
}

export interface CaseListRow {
  id: string;
  caseId?: unknown;
  offer?: unknown;
  status?: unknown;
  name?: unknown;
  email?: unknown;
  archetypeName?: unknown;
  createdAt?: unknown;
  booking: unknown;
  nudgedAt: unknown;
}

interface CaseRow {
  caseId: string;
  doc: string;
}

function parseDoc(raw: string): Record<string, unknown> {
  try {
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

/** Newest first, capped like the Firestore query was. */
export async function listCases(
  collection: CaseCollection,
  limit: number,
): Promise<CaseListRow[]> {
  const { results } = await getD1()
    .prepare(`SELECT caseId, doc FROM ${collection} ORDER BY createdAt DESC LIMIT ?`)
    .bind(limit)
    .all<CaseRow>();

  return (results ?? []).map((row) => {
    const d = parseDoc(row.doc);
    return {
      id: row.caseId,
      caseId: d.caseId,
      offer: d.offer,
      status: d.status,
      name: d.name,
      email: d.email,
      archetypeName: d.archetypeName,
      createdAt: d.createdAt,
      booking: d.booking ?? null,
      nudgedAt: d.nudgedAt ?? null,
    };
  });
}

/** One case document, or null when it does not exist. */
export async function getCase(
  collection: CaseCollection,
  caseId: string,
): Promise<Record<string, unknown> | null> {
  const row = await getD1()
    .prepare(`SELECT doc FROM ${collection} WHERE caseId = ?`)
    .bind(caseId)
    .first<{ doc: string }>();
  return row ? parseDoc(row.doc) : null;
}

export async function deleteCase(collection: CaseCollection, caseId: string): Promise<void> {
  await getD1().prepare(`DELETE FROM ${collection} WHERE caseId = ?`).bind(caseId).run();
}

/**
 * Records a booking without dropping an existing `booking.url`.
 *
 * Firestore did this with the dot path `booking.scheduledAt`. Here `json_set`
 * writes one key inside the stored JSON, which is the same guarantee.
 */
export async function bookCase(caseId: string, scheduledAt: string, status: string): Promise<void> {
  await getD1()
    .prepare(
      `UPDATE audit_cases
          SET status = ?,
              doc = json_set(doc, '$.status', ?, '$.booking.scheduledAt', ?)
        WHERE caseId = ?`,
    )
    .bind(status, status, scheduledAt, caseId)
    .run();
}

/**
 * Claims a case for a nudge. One conditional UPDATE instead of a read-then-write
 * transaction: the `status = 'submitted'` guard means two cron runs racing the
 * same case cannot both get `changes = 1`, and only the claimer sends mail.
 */
export async function claimNudge(caseId: string, nowIso: string): Promise<boolean> {
  const result = await getD1()
    .prepare(
      `UPDATE audit_cases
          SET status = 'nudged',
              doc = json_set(doc, '$.status', 'nudged', '$.nudgedAt', ?)
        WHERE caseId = ? AND status = 'submitted' AND createdAt <= ?`,
    )
    .bind(nowIso, caseId, nowIso)
    .run();
  return (result.meta?.changes ?? 0) === 1;
}

/** Hands a case back after a failed send so a later run retries it. */
export async function releaseNudge(caseId: string): Promise<void> {
  await getD1()
    .prepare(
      `UPDATE audit_cases
          SET status = 'submitted',
              doc = json_set(doc, '$.status', 'submitted', '$.nudgedAt', null)
        WHERE caseId = ? AND status = 'nudged'`,
    )
    .bind(caseId)
    .run();
}

/**
 * Overdue, still-unbooked cases. Replaces the Firestore compound query; the
 * cutoff is the day-3 boundary the caller computes.
 */
export async function listOverdueCases(
  cutoffIso: string,
): Promise<Array<{ caseId: string; doc: Record<string, unknown> }>> {
  const { results } = await getD1()
    .prepare(
      `SELECT caseId, doc FROM audit_cases
        WHERE status = 'submitted' AND createdAt <= ?
        ORDER BY createdAt ASC`,
    )
    .bind(cutoffIso)
    .all<CaseRow>();
  return (results ?? []).map((row) => ({ caseId: row.caseId, doc: parseDoc(row.doc) }));
}
