import type { EmailSender } from './email-sender';
import { isValidEmail } from './email-utils';
import { ALEX_EMAIL, FROM_EMAIL } from './email/config';

/**
 * Shared paid-case engine (ADR-004 §Decision-7: audit + identity reuse the
 * same engine).
 *
 * One deep module owns the envelope both paid kinds share: case-id
 * generation, the required-field + email validity preamble, best-effort
 * persistence with the storageFailed flag, the dual-send notify pair, the
 * base document envelope, and the transition-contract mechanics
 * (`canTransitionIn` / `PaidCaseNextAction`).
 *
 * Interface seam: the pipeline and the kind adapters leverage these
 * mechanics; per-kind meaning (maturity enums, URL shapes, nextAction
 * branching, pricing lookup) stays in the adapters. Locality rule: the
 * pipeline owns the full validity contract per kind, the route only
 * shape-parses.
 */

// ── Case-id generation ──────────────────────────────────────────

/** Opaque id: `<prefix>_<time36>_<rand36>`. Prefixes: `audit_`, `id_`. */
export function generateCaseId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

// ── Field normalization ─────────────────────────────────────────

/** Coerce-trim-cap for raw intake strings; non-strings become ''. */
export function cleanField(raw: unknown, max: number): string {
  return typeof raw === 'string' ? raw.trim().slice(0, max) : '';
}

// ── Validity preamble ───────────────────────────────────────────

/** First required field that is missing or blank, or null when all present. */
export function findMissingField(input: unknown, requiredFields: readonly string[]): string | null {
  const record = input as Record<string, unknown>;
  for (const field of requiredFields) {
    const value = record[field];
    if (typeof value !== 'string' || !value.trim()) return field;
  }
  return null;
}

/**
 * Shared validity preamble for paid intakes: required-field loop first,
 * then email format. Returns the 400 message, or null when valid.
 */
export function checkPaidIntakeContact(
  input: unknown,
  requiredFields: readonly string[],
): string | null {
  const missing = findMissingField(input, requiredFields);
  if (missing) return `Missing field: ${missing}.`;
  const email = (input as Record<string, unknown>).email;
  if (typeof email !== 'string' || !isValidEmail(email)) return 'Invalid email address.';
  return null;
}

// ── Best-effort persistence ─────────────────────────────────────

/**
 * Persist without failing the submission. Returns the storageFailed flag;
 * the notify pair still goes out when Firestore is down (the lead is
 * recoverable from the inbox).
 */
export async function persistBestEffort(
  save: () => Promise<void>,
  warnLabel: string,
): Promise<boolean> {
  try {
    await save();
    return false;
  } catch (err) {
    console.warn(warnLabel, err);
    return true;
  }
}

// ── Dual-send notify pair ───────────────────────────────────────

export interface CaseConfirmation {
  to: string;
  subject: string;
  html: string;
}

export interface CaseOwnerNotification {
  subject: string;
  html: string;
}

/**
 * Prospect confirmation first (its id is the pipeline result), then the
 * Alex notification. Returns the confirmation email id.
 */
export async function sendCaseNotificationPair(
  emailSender: EmailSender,
  confirmation: CaseConfirmation,
  ownerNotification: CaseOwnerNotification,
): Promise<string> {
  const sent = await emailSender.send({
    from: FROM_EMAIL,
    to: confirmation.to,
    subject: confirmation.subject,
    html: confirmation.html,
  });
  await emailSender.send({
    from: FROM_EMAIL,
    to: ALEX_EMAIL,
    subject: ownerNotification.subject,
    html: ownerNotification.html,
  });
  return sent.id;
}

// ── Base document envelope ──────────────────────────────────────

export interface PaidCaseBase {
  caseId: string;
  createdAt: string;
  updatedAt: string;
  /** Paid cases are born submitted; the state machine moves them on. */
  status: 'submitted';
  name: string;
  email: string;
}

/** Top-level envelope every paid-case doc shares (queryable w/o joins). */
export function basePaidCase(
  contact: { name: string; email: string },
  caseId: string,
  nowIso: string,
): PaidCaseBase {
  return {
    caseId,
    createdAt: nowIso,
    updatedAt: nowIso,
    status: 'submitted',
    name: contact.name,
    email: contact.email,
  };
}

// ── Transition contract ─────────────────────────────────────────

export interface PaidCaseNextAction<TAction extends string> {
  action: TAction;
  detail: string;
}

/** Shared machine mechanics: legal iff `to` is listed under `from`. */
export function canTransitionIn<TStatus extends string>(
  table: Record<TStatus, readonly TStatus[]>,
  from: TStatus,
  to: TStatus,
): boolean {
  return table[from].includes(to);
}
