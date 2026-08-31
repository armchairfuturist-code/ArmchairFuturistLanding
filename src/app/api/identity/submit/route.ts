import { createSubmissionRoute } from '@/lib/submission-route';
import { createFirestoreLeadStore } from '@/lib/lead-store';
import { getResend } from '@/lib/resend';
import { getDb } from '@/lib/firebase-admin';
import { RATE_LIMIT_ASSESSMENT } from '@/lib/email-utils';
import type { IdentityIntakeInput, IdentityIntakeResult } from '@/lib/submission-pipeline';

/**
 * Digital Identity intake (Plan 010). Same deep-route envelope as the audit.
 */
export const POST = createSubmissionRoute<IdentityIntakeInput>({
  kind: 'identity-intake',
  rateLimit: RATE_LIMIT_ASSESSMENT,
  leadStore: createFirestoreLeadStore(() => getDb()),
  parseBody: (body) => {
    const b = body as Record<string, unknown>;
    const str = (k: string) => (typeof b[k] === 'string' ? (b[k] as string) : '');
    return {
      kind: 'identity-intake',
      name: b.name as string,
      email: b.email as string,
      scope: b.scope as string,
      linkedinUrl: b.linkedinUrl as string,
      resumeUrl: b.resumeUrl as string,
      socialLinks: b.socialLinks as string,
      headline: b.headline as string,
      notes: b.notes as string,
    } satisfies IdentityIntakeInput;
  },
  project: (data) => {
    const d = data as IdentityIntakeResult;
    return { caseId: d.caseId, emailId: d.emailId };
  },
  errorLabel: 'Identity intake error:',
  serverErrorMessage: 'Failed to submit the intake. Please try again or email Alex directly.',
});
