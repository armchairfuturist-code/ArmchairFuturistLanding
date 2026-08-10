import { createSubmissionRoute } from '@/lib/submission-route';
import { createFirestoreLeadStore } from '@/lib/lead-store';
import { getResend } from '@/lib/resend';
import { getDb } from '@/lib/firebase-admin';
import { RATE_LIMIT_ASSESSMENT } from '@/lib/email-utils';
import type { AssessmentInput, AssessmentResult } from '@/lib/submission-pipeline';

export const POST = createSubmissionRoute<AssessmentInput>({
  kind: 'assessment',
  rateLimit: RATE_LIMIT_ASSESSMENT,
  leadStore: createFirestoreLeadStore(() => getDb()),
  parseBody: (body) => {
    const { email, answerIndices } = body as { email?: string; answerIndices?: unknown };
    return { kind: 'assessment', email, answerIndices } as AssessmentInput;
  },
  project: (data) => {
    const d = data as AssessmentResult;
    return {
      emailId: d.emailId,
      archetypeSlug: d.archetypeSlug,
      scores: d.scores,
      individualSignals: d.individualSignals,
    };
  },
  errorLabel: 'Assessment submission error:',
  serverErrorMessage: 'Failed to process assessment. Please try again.',
});
