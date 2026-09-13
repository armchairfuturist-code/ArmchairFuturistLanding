import { SERVICES_PRICING } from '@/lib/pricing';
import { basePaidCase } from '@/lib/paid-case';
import type { AuditCaseShape } from './state';

/**
 * Audit case construction (ADR-004): thin adapter over the shared
 * paid-case engine.
 *
 * Pure: builds the canonical `audit_cases` document payload from validated
 * intake input + the assessment context. Envelope (ids, timestamps,
 * submitted status, contact) comes from `basePaidCase`; money comes from
 * pricing.ts — never hardcoded here. Firestore write lives in lead-store.ts.
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
    ...basePaidCase(contact, caseId, nowIso),
    offer: 'roadmapAudit',
    price: {
      usd: SERVICES_PRICING.roadmapAudit.priceUSD,
      eur: SERVICES_PRICING.roadmapAudit.priceEUR,
    },
    archetypeSlug: archetype.slug,
    archetypeName: archetype.name,
    scores,
    intake,
    booking: {},
    payment: { status: 'none' },
  };
}
