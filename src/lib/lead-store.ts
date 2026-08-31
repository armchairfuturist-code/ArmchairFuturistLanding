import type { Firestore } from 'firebase-admin/firestore';

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
  intake: Record<string, string>;
  status: string;
  booking?: Record<string, unknown>;
  payment: { status: string };
}

export interface LeadStore {
  saveAssessmentLead(data: AssessmentLeadData): Promise<void>;
  saveCaptureLead(data: CaptureLeadData): Promise<void>;
  saveAuditCase(data: AuditCaseData): Promise<void>;
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
    async saveAuditCase(data) {
      const db = getDb();
      const ref = db.collection('audit_cases').doc(data.caseId);
      await ref.set({
        ...data,
        source: 'audit-form',
      });
    },
  };
}
