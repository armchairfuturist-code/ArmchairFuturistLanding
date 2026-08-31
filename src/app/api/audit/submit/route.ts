import { createSubmissionRoute } from '@/lib/submission-route';
import { createFirestoreLeadStore } from '@/lib/lead-store';
import { getResend } from '@/lib/resend';
import { getDb } from '@/lib/firebase-admin';
import { RATE_LIMIT_ASSESSMENT } from '@/lib/email-utils';
import type { AuditIntakeInput, AuditIntakeResult } from '@/lib/submission-pipeline';

/**
 * Audit intake (Plan 009 / ADR-004). Reuses the deep route factory:
 * rate limit, JSON parse, pipeline envelope are shared with the other
 * submission routes; only the shape varies.
 */
export const POST = createSubmissionRoute<AuditIntakeInput>({
  kind: 'audit-intake',
  rateLimit: RATE_LIMIT_ASSESSMENT,
  leadStore: createFirestoreLeadStore(() => getDb()),
  parseBody: (body) => {
    const b = body as Record<string, unknown>;
    return {
      kind: 'audit-intake',
      name: typeof b.name === 'string' ? b.name : '',
      email: typeof b.email === 'string' ? b.email : '',
      role: typeof b.role === 'string' ? b.role : '',
      scope: typeof b.scope === 'string' ? b.scope : '',
      aiMaturity: typeof b.aiMaturity === 'string' ? b.aiMaturity : '',
      paidTools: typeof b.paidTools === 'string' ? b.paidTools : '',
      weekEaters: typeof b.weekEaters === 'string' ? b.weekEaters : '',
      win90d: typeof b.win90d === 'string' ? b.win90d : '',
      triedFailed: typeof b.triedFailed === 'string' ? b.triedFailed : '',
      biggestQuestion: typeof b.biggestQuestion === 'string' ? b.biggestQuestion : '',
      availability: typeof b.availability === 'string' ? b.availability : '',
      archetype:
        b.archetype && typeof b.archetype === 'object'
          ? (b.archetype as { slug: string; name: string })
          : undefined,
      scores:
        b.scores && typeof b.scores === 'object'
          ? (b.scores as AuditIntakeInput['scores'])
          : undefined,
    } satisfies AuditIntakeInput;
  },
  project: (data) => {
    const d = data as AuditIntakeResult;
    return { caseId: d.caseId, emailId: d.emailId };
  },
  errorLabel: 'Audit intake error:',
  serverErrorMessage: 'Failed to submit the briefing. Please try again or email Alex directly.',
});
