import type { EmailSender, EmailMessage } from './email-sender';
import type { LeadStore, AuditCaseData } from './lead-store';
import { getArchetypeBySlug } from './assessment/archetypes';
import { scoreFromAnswerIndices } from './assessment/resolve-answers';
import { buildProspectResultEmail, buildAlexNotificationEmail, buildLeadProspectEmail, buildLeadNotificationEmail, buildContactNotificationEmail, buildContactAutoReplyEmail, buildAuditConfirmationEmail, buildAuditLeadNotificationEmail } from './email/templates';
import { buildAuditCase } from './audit/case';
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

export type SubmissionInput = AssessmentInput | LeadCaptureInput | ContactInput | AuditIntakeInput;

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
  | { ok: true; data: AssessmentResult | LeadResult | ContactResult | AuditIntakeResult }
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
      case 'audit-intake':
        return submitAuditIntake(input, emailSender, leadStore);
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

// ── Audit intake (Plan 009 / ADR-004) ────────────────────────

const AI_MATURITY_VALUES = ['chat', 'automations', 'agents', 'unsure'] as const;

const AUDIT_REQUIRED_FIELDS = [
  'name',
  'email',
  'role',
  'aiMaturity',
  'paidTools',
  'weekEaters',
  'win90d',
  'triedFailed',
  'biggestQuestion',
  'availability',
] as const;

function auditField(raw: unknown, max: number): string {
  return typeof raw === 'string' ? raw.trim().slice(0, max) : '';
}

async function submitAuditIntake(
  input: AuditIntakeInput,
  emailSender: EmailSender,
  leadStore: LeadStore,
): Promise<SubmissionResult> {
  // Required fields (triedFailed may be empty — "nothing yet" is an answer,
  // so it is validated for presence of the key but allowed to be blank).
  for (const field of AUDIT_REQUIRED_FIELDS) {
    const value = (input as unknown as Record<string, unknown>)[field];
    if (typeof value !== 'string' || !value.trim()) {
      return { ok: false, error: `Missing field: ${field}.`, status: 400 };
    }
  }

  if (!isValidEmail(input.email)) {
    return { ok: false, error: 'Invalid email address.', status: 400 };
  }

  const maturity = input.aiMaturity as 'chat' | 'automations' | 'agents' | 'unsure';
  if (!['chat', 'automations', 'agents', 'unsure'].includes(maturity)) {
    return { ok: false, error: 'Invalid AI maturity value.', status: 400 };
  }

  if (input.scope !== 'individual' && input.scope !== 'organization') {
    return { ok: false, error: 'Invalid scope value.', status: 400 };
  }

  const caseId = `audit_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const nowIso = new Date().toISOString();
  const archetype = input.archetype ?? { slug: 'unknown', name: 'Direct' };
  const scores = input.scores ?? { clarity: 0, readiness: 0, urgency: 0, individualSignals: 0 };

  const casePayload = buildAuditCase(
    { name: input.name.trim().slice(0, MAX_NAME_LENGTH), email: input.email },
    {
      role: input.role.trim().slice(0, 500),
      scope: input.scope as 'individual' | 'organization',
      aiMaturity: maturity,
      paidTools: input.paidTools.trim().slice(0, 500),
      weekEaters: input.weekEaters.trim().slice(0, 2000),
      win90d: input.win90d.trim().slice(0, 500),
      triedFailed: input.triedFailed.trim().slice(0, 1000),
      biggestQuestion: input.biggestQuestion.trim().slice(0, 500),
      availability: input.availability.trim().slice(0, 300),
    },
    archetype,
    scores,
    caseId,
    nowIso,
  );

  // Persist (best-effort)
  let storageFailed = false;
  try {
    await leadStore.saveAuditCase(casePayload as AuditCaseData);
  } catch (err) {
    console.warn('Audit case storage failed:', err);
    storageFailed = true;
  }

  const confirmation = await emailSender.send({
    from: FROM_EMAIL,
    to: input.email,
    subject: `Your audit briefing is in — book the fit call`,
    html: buildAuditConfirmationEmail({
      name: input.name.trim().slice(0, MAX_NAME_LENGTH),
      archetypeName: input.archetype?.name,
      biggestQuestion: casePayload.intake.biggestQuestion,
      availability: casePayload.intake.availability,
      aiMaturity: maturity,
    }),
  });

  await emailSender.send({
    from: FROM_EMAIL,
    to: ALEX_EMAIL,
    subject: `New Audit Intake: ${sanitizeEmailHeaderValue(input.name.trim().slice(0, MAX_NAME_LENGTH))} <${input.email}>`,
    html: buildAuditLeadNotificationEmail({
      name: input.name.trim().slice(0, MAX_NAME_LENGTH),
      email: input.email,
      archetypeName: input.archetype?.name,
      intake: {
        Role: casePayload.intake.role,
        Scope: casePayload.intake.scope,
        'AI maturity': casePayload.intake.aiMaturity,
        'Paid tools': casePayload.intake.paidTools,
        'Week-eaters': casePayload.intake.weekEaters,
        '90-day win': casePayload.intake.win90d,
        'Tried and dropped': casePayload.intake.triedFailed,
        'Biggest question': casePayload.intake.biggestQuestion,
        Availability: casePayload.intake.availability,
        'Case ID': caseId,
      },
    }),
  });

  return {
    ok: true,
    data: {
      emailId: confirmation.id,
      caseId,
      storageFailed,
    },
  };
}
