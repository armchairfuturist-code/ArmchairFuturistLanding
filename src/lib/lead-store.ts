import type { Firestore } from 'firebase-admin/firestore';
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

/** The persisted audit case payload (ADR-004) — written by the audit intake route. */
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

export function createFirestoreLeadStore(getDb: () => Firestore): LeadStore {
  return {
    async saveAssessmentLead(data) {
      const db = getDb();
      const ref = db.collection('assessment_leads').doc();
      await ref.set({
        ...data,
        createdAt: new Date().toISOString(),
        source: 'assessment',
      });
    },
    async saveCaptureLead(data) {
      const db = getDb();
      const ref = db.collection('leads').doc();
      await ref.set({
        ...data,
        createdAt: new Date().toISOString(),
        consulted: false,
      });
    },
    async saveContactMessage(data) {
      // The contact form used a no-op store, so the email was the only copy of
      // the message and a Resend outage lost it outright. Contact enquiries are
      // the highest-intent ones, so they get a document like everything else.
      const db = getDb();
      const ref = db.collection('contact_messages').doc();
      await ref.set({
        ...data,
        createdAt: new Date().toISOString(),
        source: 'contact-form',
        handled: false,
      });
    },
    async saveAuditCase(data) {
      const db = getDb();
      const ref = db.collection('audit_cases').doc(data.caseId);
      await ref.set({
        ...data,
        source: 'audit-form',
      });
    },
    async saveIdentityCase(data) {
      const db = getDb();
      const ref = db.collection('identity_cases').doc(data.caseId);
      await ref.set({
        ...data,
        source: 'identity-form',
      });
    },
  };
}
