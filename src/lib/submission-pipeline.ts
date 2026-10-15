import type { EmailSender } from './email-sender';
import type { LeadStore } from './lead-store';
import { getArchetypeBySlug } from './assessment/archetypes';
import { scoreFromAnswerIndices } from './assessment/resolve-answers';
import { buildProspectResultEmail, buildAlexNotificationEmail, buildLeadProspectEmail, buildLeadNotificationEmail, buildContactNotificationEmail, buildContactAutoReplyEmail } from './email/templates';
import { isValidEmail, sanitizeEmailHeaderValue } from './email-utils';
import { ALEX_EMAIL, FROM_EMAIL } from './email/config';
import {
  AUDIT_PAID_CASE,
  IDENTITY_PAID_CASE,
  submitPaidCaseIntake,
} from './paid-case-intake';

// ── Input types ──────────────────────────────────────────────

export interface AssessmentInput {
  kind: 'assessment';
  email: string;
  answerIndices: unknown;
}

export interface LeadCaptureInput {
  kind: 'lead-capture';
  name: string;
  email: string;
  source: string;
}

export interface AuditIntakeInput {
  kind: 'audit-intake';
  name: string;
  email: string;
  role: string;
  scope: string;
  aiMaturity: string;
  paidTools: string;
  weekEaters: string;
  win90d: string;
  triedFailed: string;
  biggestQuestion: string;
  availability: string;
  /** Assessment context, optional: present when arriving from the result page. */
  archetype?: { slug: string; name: string };
  scores?: { clarity: number; readiness: number; urgency: number; individualSignals: number };
}

export interface IdentityIntakeInput {
  kind: 'identity-intake';
  name: string;
  email: string;
  scope: string;
  linkedinUrl: string;
  resumeUrl: string;
  socialLinks: string;
  headline: string;
  notes: string;
}

export interface ContactInput {
  kind: 'contact';
  name: string;
  email: string;
  message: string;
}

export interface AuditIntakeResult {
  emailId: string;
  caseId: string;
  storageFailed?: boolean;
}

export type SubmissionInput = AssessmentInput | LeadCaptureInput | ContactInput | AuditIntakeInput | IdentityIntakeInput;

// ── Result types ─────────────────────────────────────────────

export interface AssessmentResult {
  emailId: string;
  archetypeSlug: string;
  scores: { clarity: number; readiness: number; urgency: number };
  individualSignals: number;
  storageFailed?: boolean;
}

export interface LeadResult {
  storageFailed?: boolean;
}

export interface ContactResult {
  emailId: string;
}

export interface IdentityIntakeResult {
  emailId: string;
  caseId: string;
  storageFailed?: boolean;
}

export type SubmissionResult =
  | { ok: true; data: AssessmentResult | LeadResult | ContactResult | AuditIntakeResult | IdentityIntakeResult }
  | { ok: false; error: string; status: 400 | 429 | 500 };

// ── Pipeline deps ────────────────────────────────────────────

export interface PipelineDeps {
  emailSender: EmailSender;
  leadStore: LeadStore;
}

// ── Delivery policy ──────────────────────────────────────────

/**
 * One rule for every pipeline, because having several was the bug.
 *
 * A submission is accepted once its input is validated and (where the
 * pipeline stores anything) persisted. Email delivery is a separate concern:
 * a Resend hiccup must not turn a stored, successful submission into a 500,
 * because the visitor then resubmits and creates a second lead and a second
 * email — while the owner is never told the notification failed.
 *
 * So both sends are attempted, failures are logged, and the request only
 * errors when the submission left no trace at all: nothing stored AND nothing
 * sent. That is the one case where retrying is genuinely the right advice.
 */
type SendOutcome = { sent: boolean; id: string };

async function attemptSend(
  emailSender: EmailSender,
  message: Parameters<EmailSender['send']>[0],
  label: string,
): Promise<SendOutcome> {
  try {
    const result = await emailSender.send(message);
    return { sent: true, id: result.id };
  } catch (err) {
    console.error(`${label} failed:`, err);
    return { sent: false, id: '' };
  }
}

/** True when the submission has no durable record: nothing stored, nothing sent. */
function isTotalLoss(storageFailed: boolean, ...sends: SendOutcome[]): boolean {
  return storageFailed && sends.every((outcome) => !outcome.sent);
}

const TOTAL_LOSS_ERROR = 'We could not save your submission. Please try again, or reach out directly.';

// ── Pipeline factory ─────────────────────────────────────────

const MAX_MESSAGE_LENGTH = 5000;
const MAX_NAME_LENGTH = 100;

export function createSubmissionPipeline(deps: PipelineDeps) {
  const { emailSender, leadStore } = deps;

  return async function submit(input: SubmissionInput): Promise<SubmissionResult> {
    switch (input.kind) {
      case 'assessment':
        return submitAssessment(input, emailSender, leadStore);
      case 'lead-capture':
        return submitLeadCapture(input, emailSender, leadStore);
      case 'contact':
        return submitContact(input, emailSender, leadStore);
      case 'audit-intake':
        return submitPaidCaseIntake(input, AUDIT_PAID_CASE, { emailSender, leadStore });
      case 'identity-intake':
        return submitPaidCaseIntake(input, IDENTITY_PAID_CASE, { emailSender, leadStore });
    }
  };
}

// ── Assessment ───────────────────────────────────────────────

async function submitAssessment(
  input: AssessmentInput,
  emailSender: EmailSender,
  leadStore: LeadStore,
): Promise<SubmissionResult> {
  if (!input.email || !isValidEmail(input.email)) {
    return { ok: false, error: 'Invalid email address.', status: 400 };
  }

  let scored;
  try {
    scored = scoreFromAnswerIndices(input.answerIndices);
  } catch {
    return { ok: false, error: 'Invalid assessment answers.', status: 400 };
  }

  const { archetypeSlug, clarity, readiness, urgency, individualSignals } = scored;
  const scores = { clarity, readiness, urgency };

  const archetype = getArchetypeBySlug(archetypeSlug);
  if (!archetype) {
    return { ok: false, error: 'Invalid archetype.', status: 400 };
  }

  // Persist (best-effort)
  let storageFailed = false;
  try {
    await leadStore.saveAssessmentLead({
      email: input.email,
      archetypeSlug,
      archetypeName: archetype.name,
      scores,
      individualSignals,
    });
  } catch (err) {
    console.warn('Lead storage failed:', err);
    storageFailed = true;
  }

  // Send emails
  const prospectHtml = buildProspectResultEmail({ archetype, scores, email: input.email });
  const ownerHtml = buildAlexNotificationEmail({ archetype, scores, email: input.email });

  const prospectSend = await attemptSend(
    emailSender,
    {
      from: FROM_EMAIL,
      to: input.email,
      subject: `Your AI Readiness Profile: ${archetype.name}`,
      html: prospectHtml,
    },
    'Assessment prospect email',
  );

  const ownerSend = await attemptSend(
    emailSender,
    {
      from: FROM_EMAIL,
      to: ALEX_EMAIL,
      subject: `New Assessment Lead: ${archetype.name}`,
      html: ownerHtml,
    },
    'Assessment owner notification',
  );

  if (isTotalLoss(storageFailed, prospectSend, ownerSend)) {
    return { ok: false, error: TOTAL_LOSS_ERROR, status: 500 };
  }

  return {
    ok: true,
    data: {
      emailId: prospectSend.id,
      archetypeSlug,
      scores,
      individualSignals,
      storageFailed,
    },
  };
}

// ── Lead capture ─────────────────────────────────────────────

async function submitLeadCapture(
  input: LeadCaptureInput,
  emailSender: EmailSender,
  leadStore: LeadStore,
): Promise<SubmissionResult> {
  if (!input.email || !isValidEmail(input.email)) {
    return { ok: false, error: 'Valid email is required.', status: 400 };
  }

  const rawName = typeof input.name === 'string' ? input.name.trim().slice(0, MAX_NAME_LENGTH) : '';
  const storedName = rawName || input.email.split('@')[0];
  const safeSource = typeof input.source === 'string' ? input.source.trim().slice(0, 80) : 'hero-lead-capture';

  // Persist (best-effort)
  let storageFailed = false;
  try {
    await leadStore.saveCaptureLead({ name: storedName, email: input.email, source: safeSource });
  } catch (err) {
    console.warn('Lead storage failed:', err);
    storageFailed = true;
  }

  // Send emails
  const visitorSend = await attemptSend(
    emailSender,
    {
      from: FROM_EMAIL,
      to: input.email,
      subject: "Your AI Quick Wins — let's get started",
      html: buildLeadProspectEmail({ displayName: storedName }),
    },
    'Lead capture prospect email',
  );

  const ownerSend = await attemptSend(
    emailSender,
    {
      from: FROM_EMAIL,
      to: ALEX_EMAIL,
      subject: `New Lead: ${sanitizeEmailHeaderValue(storedName)} <${input.email}>`,
      html: buildLeadNotificationEmail({ name: storedName, email: input.email, source: safeSource }),
    },
    'Lead capture owner notification',
  );

  if (isTotalLoss(storageFailed, visitorSend, ownerSend)) {
    return { ok: false, error: TOTAL_LOSS_ERROR, status: 500 };
  }

  return { ok: true, data: { storageFailed } };
}

// ── Contact ──────────────────────────────────────────────────

async function submitContact(
  input: ContactInput,
  emailSender: EmailSender,
  leadStore: LeadStore,
): Promise<SubmissionResult> {
  if (!input.name || !input.email || !input.message) {
    return { ok: false, error: 'Name, email, and message are required.', status: 400 };
  }

  if (typeof input.name !== 'string' || typeof input.email !== 'string' || typeof input.message !== 'string') {
    return { ok: false, error: 'Invalid form data.', status: 400 };
  }

  const trimmedName = input.name.trim().slice(0, MAX_NAME_LENGTH);
  const trimmedMessage = input.message.trim().slice(0, MAX_MESSAGE_LENGTH);

  if (!trimmedName || !trimmedMessage) {
    return { ok: false, error: 'Name, email, and message are required.', status: 400 };
  }

  if (!isValidEmail(input.email)) {
    return { ok: false, error: 'Invalid email address.', status: 400 };
  }

  // Persist first. This path used to write nothing, so the owner email was the
  // only record and a Resend failure lost the message with no way to recover it.
  let storageFailed = false;
  try {
    await leadStore.saveContactMessage({
      name: trimmedName,
      email: input.email,
      message: trimmedMessage,
    });
  } catch (err) {
    console.warn('Contact storage failed:', err);
    storageFailed = true;
  }

  // Owner notification — this is how Alex learns the message exists.
  const ownerSend = await attemptSend(
    emailSender,
    {
      from: FROM_EMAIL,
      to: ALEX_EMAIL,
      subject: `New Contact: ${sanitizeEmailHeaderValue(trimmedName)} - ${input.email}`,
      html: buildContactNotificationEmail({ name: trimmedName, email: input.email, message: trimmedMessage }),
    },
    'Contact owner notification',
  );

  // Auto-reply (best-effort)
  const autoReplySend = await attemptSend(
    emailSender,
    {
      from: FROM_EMAIL,
      to: input.email,
      subject: 'Thanks for reaching out - Alex will be in touch soon',
      html: buildContactAutoReplyEmail({ name: trimmedName }),
    },
    'Contact auto-reply',
  );

  // The stored document is the record, so one failed send is survivable. Only
  // losing both the record and the notification means the message is gone.
  if (isTotalLoss(storageFailed, ownerSend, autoReplySend)) {
    return { ok: false, error: TOTAL_LOSS_ERROR, status: 500 };
  }

  return { ok: true, data: { emailId: ownerSend.id } };
}
