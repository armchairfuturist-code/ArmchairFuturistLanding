import { SERVICES_PRICING } from '@/lib/pricing';
import type { IdentityCaseShape } from './state';

/**
 * Digital Identity case construction (Plan 010).
 *
 * Pure: builds the canonical `identity_cases` document payload. Price comes
 * from pricing.ts. Parallel to audit/case.ts by design (rule of two, not a
 * forced generalization).
 */

export type IdentityScope = 'individual' | 'organization';

export interface IdentityIntake {
  scope: 'individual' | 'organization';
  linkedinUrl: string;
  resumeUrl: string;
  socialLinks: string;
  headline: string;
  notes: string;
}

/** Build the Firestore payload for a new identity case. Pure. */
export function buildIdentityCase(
  contact: { name: string; email: string },
  intake: IdentityIntake,
  caseId: string,
  nowIso: string,
): IdentityCaseShape & {
  createdAt: string;
  updatedAt: string;
  offer: 'digitalIdentity';
  price: { usd: number; eur: number };
  name: string;
  email: string;
} {
  return {
    caseId,
    createdAt: nowIso,
    updatedAt: nowIso,
    status: 'submitted',
    offer: 'digitalIdentity',
    price: {
      usd: SERVICES_PRICING.digitalIdentity.priceUSD,
      eur: SERVICES_PRICING.digitalIdentity.priceEUR,
    },
    name: contact.name,
    email: contact.email,
    intake,
  };
}
