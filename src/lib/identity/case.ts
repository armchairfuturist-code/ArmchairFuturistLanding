import { SERVICES_PRICING } from '@/lib/pricing';
import { basePaidCase } from '@/lib/paid-case';
import type { IdentityCaseShape } from './state';

/**
 * Digital Identity case construction: thin adapter over the shared
 * paid-case engine (same engine as audit/case.ts per ADR-004 §Decision-7).
 *
 * Pure: builds the canonical `identity_cases` document payload. Envelope
 * comes from `basePaidCase`; price comes from pricing.ts.
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
    ...basePaidCase(contact, caseId, nowIso),
    offer: 'digitalIdentity',
    price: {
      usd: SERVICES_PRICING.digitalIdentity.priceUSD,
      eur: SERVICES_PRICING.digitalIdentity.priceEUR,
    },
    intake,
  };
}
