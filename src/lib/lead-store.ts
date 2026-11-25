import { getD1, newId } from './d1';
import type { AuditIntake } from './audit/case';
import type { IdentityIntake } from './identity/case';

export interface AssessmentLeadData {
  email: string;
  archetypeSlug: string;
  archetypeName: string;
  scores: { clarity: number; readiness: number; urgency: number };
  individualSignals: number;
}

export interface CaptureLeadData {
  name: string;
  email: string;
  source: string;
}

/** The persisted digital identity case payload (Plan 010). */
export interface IdentityCaseData {
  caseId: string;
  createdAt: string;
  updatedAt: string;
  offer: 'digitalIdentity';
  price: { usd: number; eur: number };
  name: string;
  email: string;
  status: string;
  intake: IdentityIntake;
}

/** The persisted audit case payload (ADR-004), written by the audit intake route. */
export interface AuditCaseData {
  caseId: string;
  createdAt: string;
  updatedAt: string;
  offer: 'roadmapAudit';
  price: { usd: number; eur: number };
  archetypeSlug: string;
  archetypeName: string;
  scores: { clarity: number; readiness: number; urgency: number; individualSignals: number };
  intake: AuditIntake;
  status: string;
  booking?: Record<string, unknown>;
  payment: { status: string };
}

/** A message sent through the contact form. */
export interface ContactMessageData {
  name: string;
  email: string;
  message: string;
}

/** The persisted digital identity case payload (Plan 010). */
export interface LeadStore {
  saveAssessmentLead(data: AssessmentLeadData): Promise<void>;
  saveCaptureLead(data: CaptureLeadData): Promise<void>;
  saveContactMessage(data: ContactMessageData): Promise<void>;
  saveAuditCase(data: AuditCaseData): Promise<void>;
  saveIdentityCase(data: IdentityCaseData): Promise<void>;
}

/** A case payload is written whole into the `doc` column and queried by its columns. */
function caseColumns(data: Record<string, unknown>, nowIso: string) {
  const str = (v: unknown) => (typeof v === 'string' ? v : '');
  return {
    caseId: str(data.caseId),
    status: str(data.status),
    createdAt: str(data.createdAt) || nowIso,
    updatedAt: str(data.updatedAt) || nowIso,
    name: str(data.name),
    email: str(data.email),
    archetypeName: str(data.archetypeName),
  };
}

/**
 * D1-backed intake store (replaced Firestore on 2026-11-17).
 *
 * Same interface as before, so the submission pipeline is untouched. Each write
 * is a single INSERT, which is atomic in D1 without a transaction.
 */
export function createD1LeadStore(): LeadStore {
  return {
    async saveAssessmentLead(data) {
      await getD1()
        .prepare(
          `INSERT INTO assessment_leads
             (id, email, archetypeSlug, archetypeName, scores, individualSignals, createdAt, source)
           VALUES (?, ?, ?, ?, ?, ?, ?, 'assessment')`,
        )
        .bind(
          newId(),
          data.email,
          data.archetypeSlug,
          data.archetypeName,
          JSON.stringify(data.scores),
          data.individualSignals,
          new Date().toISOString(),
        )
        .run();
    },
    async saveCaptureLead(data) {
      await getD1()
        .prepare(
          `INSERT INTO leads (id, name, email, source, createdAt, consulted)
           VALUES (?, ?, ?, ?, ?, 0)`,
        )
        .bind(newId(), data.name, data.email, data.source, new Date().toISOString())
        .run();
    },
    async saveContactMessage(data) {
      // The contact form used a no-op store, so the email was the only copy of
      // the message and a Resend outage lost it outright. Contact enquiries are
      // the highest-intent ones, so they get a row like everything else.
      await getD1()
        .prepare(
          `INSERT INTO contact_messages (id, name, email, message, createdAt, source, handled)
           VALUES (?, ?, ?, ?, ?, 'contact-form', 0)`,
        )
        .bind(newId(), data.name, data.email, data.message, new Date().toISOString())
        .run();
    },
    async saveAuditCase(data) {
      await insertCase('audit_cases', data as unknown as Record<string, unknown>, 'audit-form');
    },
    async saveIdentityCase(data) {
      await insertCase(
        'identity_cases',
        data as unknown as Record<string, unknown>,
        'identity-form',
      );
    },
  };
}

async function insertCase(
  table: 'audit_cases' | 'identity_cases',
  data: Record<string, unknown>,
  source: string,
): Promise<void> {
  const nowIso = new Date().toISOString();
  const cols = caseColumns(data, nowIso);
  if (!cols.caseId) throw new Error('Case payload has no caseId.');
  await getD1()
    .prepare(
      `INSERT INTO ${table} (caseId, status, createdAt, updatedAt, name, email, archetypeName, doc)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(caseId) DO UPDATE SET
         status = excluded.status,
         updatedAt = excluded.updatedAt,
         name = excluded.name,
         email = excluded.email,
         archetypeName = excluded.archetypeName,
         doc = excluded.doc`,
    )
    .bind(
      cols.caseId,
      cols.status,
      cols.createdAt,
      cols.updatedAt,
      cols.name,
      cols.email,
      cols.archetypeName,
      JSON.stringify({ ...data, source }),
    )
    .run();
}
