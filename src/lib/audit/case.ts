import { SERVICES_PRICING } from '@/lib/pricing';
import type { AuditCaseShape } from './state';

/**
 * Audit case construction (ADR-004).
 *
 * Pure: builds the canonical `audit_cases` document payload from validated
 * intake input + the assessment context. Money comes from pricing.ts —
 * never hardcoded here. Firestore write lives in lead-store.ts.
 *
 * name + email live at the document top level (not inside intake) so the
 * case list is queryable without opening nested objects.
 */

export type AiMaturity = 'chat' | 'automations' | 'agents' | 'unsure';

export type AuditScope = 'individual' | 'organization';

export interface AuditIntake {
  role: string;
  /** Whose workflows get audited: the individual or their organization. */
  scope: 'individual' | 'organization';
  aiMaturity: AiMaturity;
  paidTools: string;
  weekEaters: string;
  win90d: string;
  triedFailed: string;
  biggestQuestion: string;
  availability: string;
}

/** Build the Firestore payload for a new audit case. Pure. */
export function buildAuditCase(
  contact: { name: string; email: string },
  intake: AuditIntake,
  archetype: { slug: string; name: string },
  scores: { clarity: number; readiness: number; urgency: number; individualSignals: number },
  caseId: string,
  nowIso: string,
): AuditCaseShape & {
  createdAt: string;
  updatedAt: string;
  offer: 'roadmapAudit';
  price: { usd: number; eur: number };
  name: string;
  email: string;
} {
  return {
    caseId,
    createdAt: nowIso,
    updatedAt: nowIso,
    offer: 'roadmapAudit',
    price: {
      usd: SERVICES_PRICING.roadmapAudit.priceUSD,
      eur: SERVICES_PRICING.roadmapAudit.priceEUR,
    },
    name: contact.name,
    email: contact.email,
    archetypeSlug: archetype.slug,
    archetypeName: archetype.name,
    scores,
    intake,
    status: 'submitted',
    booking: {},
    payment: { status: 'none' },
  };
}
