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

export interface LeadStore {
  saveAssessmentLead(data: AssessmentLeadData): Promise<void>;
  saveCaptureLead(data: CaptureLeadData): Promise<void>;
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
  };
}
