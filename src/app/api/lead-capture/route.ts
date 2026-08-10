import { createSubmissionRoute } from '@/lib/submission-route';
import { createFirestoreLeadStore } from '@/lib/lead-store';
import { getDb } from '@/lib/firebase-admin';
import { RATE_LIMIT_LEAD_CAPTURE } from '@/lib/email-utils';
import type { LeadCaptureInput } from '@/lib/submission-pipeline';

export const POST = createSubmissionRoute<LeadCaptureInput>({
  kind: 'lead-capture',
  rateLimit: RATE_LIMIT_LEAD_CAPTURE,
  leadStore: createFirestoreLeadStore(() => getDb()),
  parseBody: (body) => {
    const { name, email, source = 'hero-lead-capture' } = body as {
      name?: string;
      email?: string;
      source?: string;
    };
    return { kind: 'lead-capture', name, email, source } as LeadCaptureInput;
  },
  project: () => ({}),
  errorLabel: 'Lead capture error:',
  serverErrorMessage: 'Something went wrong. Please try again.',
});
