import type { EmailSender, EmailMessage } from './email-sender';
import type { LeadStore } from './lead-store';
import { getArchetypeBySlug } from './assessment/archetypes';
import { scoreFromAnswerIndices } from './assessment/resolve-answers';
import { buildProspectResultEmail, buildAlexNotificationEmail, buildLeadProspectEmail, buildLeadNotificationEmail, buildContactNotificationEmail, buildContactAutoReplyEmail } from './email/templates';
import { isValidEmail, sanitizeEmailHeaderValue } from './email-utils';
import { ALEX_EMAIL, FROM_EMAIL } from './email/config';

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

export interface ContactInput {
  kind: 'contact';
  name: string;
  email: string;
  message: string;
}

export type SubmissionInput = AssessmentInput | LeadCaptureInput | ContactInput;

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

export type SubmissionResult =
  | { ok: true; data: AssessmentResult | LeadResult | ContactResult }
  | { ok: false; error: string; status: 400 | 429 | 500 };

// ── Pipeline deps ────────────────────────────────────────────

export interface PipelineDeps {
  emailSender: EmailSender;
  leadStore: LeadStore;
}

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
        return submitContact(input, emailSender);
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

  const prospectResult = await emailSender.send({
    from: FROM_EMAIL,
    to: input.email,
    subject: `Your AI Readiness Profile: ${archetype.name}`,
    html: prospectHtml,
  });

  await emailSender.send({
    from: FROM_EMAIL,
    to: ALEX_EMAIL,
    subject: `New Assessment Lead: ${archetype.name}`,
    html: ownerHtml,
  });

  return {
    ok: true,
    data: {
      emailId: prospectResult.id,
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
  await emailSender.send({
    from: FROM_EMAIL,
    to: input.email,
    subject: "Your AI Quick Wins — let's get started",
    html: buildLeadProspectEmail({ displayName: storedName }),
  });

  await emailSender.send({
    from: FROM_EMAIL,
    to: ALEX_EMAIL,
    subject: `New Lead: ${sanitizeEmailHeaderValue(storedName)} <${input.email}>`,
    html: buildLeadNotificationEmail({ name: storedName, email: input.email, source: safeSource }),
  });

  return { ok: true, data: { storageFailed } };
}

// ── Contact ──────────────────────────────────────────────────

async function submitContact(
  input: ContactInput,
  emailSender: EmailSender,
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

  // Send owner notification
  const ownerResult = await emailSender.send({
    from: FROM_EMAIL,
    to: ALEX_EMAIL,
    subject: `New Contact: ${sanitizeEmailHeaderValue(trimmedName)} - ${input.email}`,
    html: buildContactNotificationEmail({ name: trimmedName, email: input.email, message: trimmedMessage }),
  });

  // Auto-reply (best-effort)
  try {
    await emailSender.send({
      from: FROM_EMAIL,
      to: input.email,
      subject: 'Thanks for reaching out - Alex will be in touch soon',
      html: buildContactAutoReplyEmail({ name: trimmedName }),
    });
  } catch (err) {
    console.warn('Contact auto-reply failed:', err);
  }

  return { ok: true, data: { emailId: ownerResult.id } };
}
