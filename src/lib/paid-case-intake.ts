import type { EmailSender } from "./email-sender";
import type { LeadStore, AuditCaseData } from "./lead-store";
import type { AuditIntakeInput, IdentityIntakeInput } from "./submission-pipeline";
import { buildAuditCase } from "./audit/case";
import { buildIdentityCase } from "./identity/case";
import {
  buildAuditConfirmationEmail,
  buildAuditLeadNotificationEmail,
  buildIdentityConfirmationEmail,
  buildIdentityLeadNotificationEmail,
} from "./email/templates";
import { sanitizeEmailHeaderValue } from "./email-utils";
import {
  checkPaidIntakeContact,
  cleanField,
  generateCaseId,
  persistBestEffort,
  sendCaseNotificationPair,
  type CaseConfirmation,
  type CaseOwnerNotification,
} from "./paid-case";

export interface PaidCaseIntakeResult {
  emailId: string;
  caseId: string;
  storageFailed: boolean;
}

export interface PaidCaseIntakeSuccess {
  ok: true;
  data: PaidCaseIntakeResult;
}

export interface PaidCaseIntakeFailure {
  ok: false;
  error: string;
  status: 400;
}

export type PaidCaseIntakeResponse = PaidCaseIntakeSuccess | PaidCaseIntakeFailure;

export interface PaidCaseContext {
  caseId: string;
  nowIso: string;
  name: string;
}

export interface PaidCaseDefinition<TInput, TPayload> {
  readonly idPrefix: "audit" | "id";
  readonly requiredFields: readonly string[];
  readonly validate?: (input: TInput) => string | null;
  readonly buildCase: (input: TInput, context: PaidCaseContext) => TPayload;
  readonly persist: (store: LeadStore, payload: TPayload) => Promise<void>;
  readonly confirmation: (input: TInput, payload: TPayload, context: PaidCaseContext) => CaseConfirmation;
  readonly ownerNotification: (input: TInput, payload: TPayload, context: PaidCaseContext) => CaseOwnerNotification;
  readonly storageWarning: string;
}

export interface PaidCaseDependencies {
  emailSender: EmailSender;
  leadStore: LeadStore;
}

/** One deep lifecycle for paid intake; each kind supplies only meaning-specific data. */
export async function submitPaidCaseIntake<TInput, TPayload>(
  input: TInput,
  definition: PaidCaseDefinition<TInput, TPayload>,
  deps: PaidCaseDependencies,
): Promise<PaidCaseIntakeResponse> {
  const contactError = checkPaidIntakeContact(input as Record<string, unknown>, definition.requiredFields);
  if (contactError) return { ok: false, error: contactError, status: 400 };

  const definitionError = definition.validate?.(input);
  if (definitionError) return { ok: false, error: definitionError, status: 400 };

  const caseId = generateCaseId(definition.idPrefix);
  const nowIso = new Date().toISOString();
  const name = cleanField((input as Record<string, unknown>).name, 100);
  const context: PaidCaseContext = { caseId, nowIso, name };
  const payload = definition.buildCase(input, context);

  const storageFailed = await persistBestEffort(
    () => definition.persist(deps.leadStore, payload),
    definition.storageWarning,
  );
  const emailId = await sendCaseNotificationPair(
    deps.emailSender,
    definition.confirmation(input, payload, context),
    definition.ownerNotification(input, payload, context),
  );

  return { ok: true, data: { emailId, caseId, storageFailed } };
}

const AUDIT_REQUIRED_FIELDS = [
  "name",
  "email",
  "role",
  "aiMaturity",
  "paidTools",
  "weekEaters",
  "win90d",
  "triedFailed",
  "biggestQuestion",
  "availability",
] as const;
const AI_MATURITY_VALUES = ["chat", "automations", "agents", "unsure"] as const;

export const AUDIT_PAID_CASE: PaidCaseDefinition<AuditIntakeInput, ReturnType<typeof buildAuditCase>> = {
  idPrefix: "audit",
  requiredFields: AUDIT_REQUIRED_FIELDS,
  validate: (input) => {
    const maturity = input.aiMaturity as (typeof AI_MATURITY_VALUES)[number];
    if (!AI_MATURITY_VALUES.includes(maturity)) return "Invalid AI maturity value.";
    if (input.scope !== "individual" && input.scope !== "organization") return "Invalid scope value.";
    return null;
  },
  buildCase: (input, context) => {
    const maturity = input.aiMaturity as (typeof AI_MATURITY_VALUES)[number];
    return buildAuditCase(
      { name: context.name, email: input.email },
      {
        role: cleanField(input.role, 500),
        scope: input.scope as "individual" | "organization",
        aiMaturity: maturity,
        paidTools: cleanField(input.paidTools, 500),
        weekEaters: cleanField(input.weekEaters, 2000),
        win90d: cleanField(input.win90d, 500),
        triedFailed: cleanField(input.triedFailed, 1000),
        biggestQuestion: cleanField(input.biggestQuestion, 500),
        availability: cleanField(input.availability, 300),
      },
      input.archetype ?? { slug: "unknown", name: "Direct" },
      input.scores ?? { clarity: 0, readiness: 0, urgency: 0, individualSignals: 0 },
      context.caseId,
      context.nowIso,
    );
  },
  persist: (store, payload) => store.saveAuditCase(payload as AuditCaseData),
  confirmation: (input, payload, context) => ({
    to: input.email,
    subject: "Your audit briefing is in — book the fit call",
    html: buildAuditConfirmationEmail({
      name: context.name,
      archetypeName: input.archetype?.name,
      biggestQuestion: payload.intake.biggestQuestion,
      availability: payload.intake.availability,
      aiMaturity: payload.intake.aiMaturity,
    }),
  }),
  ownerNotification: (input, payload, context) => ({
    subject: `New Audit Intake: ${sanitizeEmailHeaderValue(context.name)} <${input.email}>`,
    html: buildAuditLeadNotificationEmail({
      name: context.name,
      email: input.email,
      archetypeName: input.archetype?.name,
      intake: {
        Role: payload.intake.role,
        Scope: payload.intake.scope,
        "AI maturity": payload.intake.aiMaturity,
        "Paid tools": payload.intake.paidTools,
        "Week-eaters": payload.intake.weekEaters,
        "90-day win": payload.intake.win90d,
        "Tried and dropped": payload.intake.triedFailed,
        "Biggest question": payload.intake.biggestQuestion,
        Availability: payload.intake.availability,
        "Case ID": payload.caseId,
      },
    }),
  }),
  storageWarning: "Audit case storage failed:",
};

const IDENTITY_REQUIRED_FIELDS = ["name", "email", "scope", "linkedinUrl", "resumeUrl", "headline"] as const;

function looksLikeUrl(raw: string): boolean {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export const IDENTITY_PAID_CASE: PaidCaseDefinition<IdentityIntakeInput, ReturnType<typeof buildIdentityCase>> = {
  idPrefix: "id",
  requiredFields: IDENTITY_REQUIRED_FIELDS,
  validate: (input) => {
    if (input.scope !== "individual" && input.scope !== "organization") return "Invalid scope value.";
    if (!looksLikeUrl(input.linkedinUrl.trim())) return "LinkedIn link must be a full URL (https://...).";
    if (!looksLikeUrl(input.resumeUrl)) return "Resume link must be a full URL.";
    return null;
  },
  buildCase: (input, context) =>
    buildIdentityCase(
      { name: context.name, email: input.email },
      {
        scope: input.scope as "individual" | "organization",
        linkedinUrl: cleanField(input.linkedinUrl, 300),
        resumeUrl: cleanField(input.resumeUrl, 300),
        socialLinks: cleanField(input.socialLinks, 500),
        headline: cleanField(input.headline, 300),
        notes: cleanField(input.notes, 1000),
      },
      context.caseId,
      context.nowIso,
    ),
  persist: (store, payload) => store.saveIdentityCase(payload),
  confirmation: (input, _payload, context) => ({
    to: input.email,
    subject: "Your digital identity intake is in — next steps",
    html: buildIdentityConfirmationEmail({
      name: context.name,
      headline: cleanField(input.headline, 200),
      scope: input.scope,
    }),
  }),
  ownerNotification: (input, _payload, context) => ({
    subject: `New Digital Identity Intake: ${sanitizeEmailHeaderValue(context.name)} <${input.email}>`,
    html: buildIdentityLeadNotificationEmail({
      name: context.name,
      email: input.email,
      intake: {
        Scope: input.scope,
        LinkedIn: input.linkedinUrl,
        Resume: input.resumeUrl,
        "Social links": input.socialLinks || "(none)",
        Headline: input.headline,
        Notes: input.notes || "(none)",
        "Case ID": context.caseId,
      },
    }),
  }),
  storageWarning: "Identity case storage failed:",
};
