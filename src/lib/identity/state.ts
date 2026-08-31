/**
 * Digital Identity case state machine (Plan 010).
 *
 * Parallel to the audit machine (ADR-004 pattern) but simpler: the DI
 * lifecycle is intake review -> build -> deliver. Same contract: pure,
 * deterministic, one `nextAction` entry point so any driver (Alex, cron,
 * agent) gets the same answer from the same data.
 */

export const IDENTITY_STATUSES = [
  'submitted',
  'in_review',
  'building',
  'delivered',
  'dead',
] as const;

export type IdentityStatus = (typeof IDENTITY_STATUSES)[number];

export type NextActionName =
  | 'review_intake'
  | 'send_payment_request'
  | 'build_page'
  | 'deliver_page';

export interface NextAction {
  action: NextActionName;
  detail: string;
}

/** Legal status transitions. Anything not listed is illegal. */
export const legalTransitions: Record<IdentityStatus, readonly IdentityStatus[]> = {
  submitted: ['in_review', 'dead'],
  in_review: ['building', 'dead'],
  building: ['delivered', 'dead'],
  delivered: [],
  dead: [],
};

export function canTransition(from: IdentityStatus, to: IdentityStatus): boolean {
  return legalTransitions[from].includes(to);
}

/** The subset of the identity case doc the state machine reads. */
export interface IdentityCaseShape {
  caseId: string;
  createdAt: string;
  status: IdentityStatus;
  name?: string;
  email?: string;
  intake: {
    scope: 'individual' | 'organization';
    linkedinUrl: string;
    resumeUrl: string;
    socialLinks: string;
    headline: string;
    notes: string;
  };
  deliverable?: { pageUrl?: string; deliveredAt?: string };
}

/**
 * The single highest-leverage next move for an identity case, or null when
 * the case needs nothing.
 */
export function nextAction(
  c: IdentityCaseShape,
): { action: NextActionName; detail: string } | null {
  switch (c.status) {
    case 'submitted':
      return { action: 'review_intake', detail: 'Review the intake: is this a fit for the $233 · €199 product? Set in_review or dead.' };
    case 'in_review':
      return { action: 'send_payment_request', detail: 'Fit confirmed — send the Venmo request, then move to building.' };
    case 'building': {
      if (c.deliverable?.pageUrl) {
        return { action: 'deliver_page', detail: 'Page is built — send the delivery email with the handoff doc.' };
      }
      return { action: 'build_page', detail: 'Build the landing page from the intake assets (2-4 day window).' };
    }
    case 'delivered':
    case 'dead':
      return null;
  }
}
