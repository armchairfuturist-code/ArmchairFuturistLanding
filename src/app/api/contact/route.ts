import { createSubmissionRoute } from '@/lib/submission-route';
import type { ContactInput, ContactResult } from '@/lib/submission-pipeline';
import { createD1LeadStore } from '@/lib/lead-store';

export const POST = createSubmissionRoute<ContactInput>({
  kind: 'contact',
  leadStore: createD1LeadStore(),
  parseBody: (body) => {
    const { name, email, message } = body as {
      name?: string;
      email?: string;
      message?: string;
    };
    return { kind: 'contact', name, email, message } as ContactInput;
  },
  project: (data) => ({ emailId: (data as ContactResult).emailId }),
  errorLabel: 'Contact form error:',
  serverErrorMessage: 'Failed to send message. Please try again or reach out directly.',
});
