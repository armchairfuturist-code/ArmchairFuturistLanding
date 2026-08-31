/**
 * Audit case status machine (ADR-004).
 *
 * Pure: no Firestore, no clocks except the optional `nowIso` argument to
 * `nextAction`. The machine answers ONE question — "what is the single
 * highest-leverage next move for this case?" — so any driver (Alex, an
 * admin page, or a cron agent) gets the same answer for the same data.
 *
 * Legal transitions live in one map; `nextAction` never invents state.
 * LLM effort is spent on judgment (prep, report), never on state recall.
 */

export const AUDIT_STATUSES = [
  'submitted',
  'call_booked',
  'call_done',
  'payment_sent',
  'paid',
  'audited',
  'converted',
  'dead',
] as const;

export type AuditStatus = (typeof AUDIT_STATUSES)[number];

export type NextActionName =
  | 'await_booking'
  | 'nudge_booking'
  | 'prep_call'
  | 'send_payment'
  | 'await_payment'
  | 'schedule_session'
  | 'deliver_report'
  | 'convert_or_close';

export interface NextAction {
  action: NextActionName;
  detail: string;
}

/** Legal status transitions. Anything not listed is illegal. */
export const legalTransitions: Record<AuditStatus, readonly AuditStatus[]> = {
  submitted: ['call_booked', 'dead'],
  call_booked: ['call_done', 'dead'],
  call_done: ['payment_sent', 'paid', 'dead'],
  payment_sent: ['paid', 'dead'],
  paid: ['audited', 'dead'],
  audited: ['converted'],
  converted: [],
  dead: [],
};

export function canTransition(from: AuditStatus, to: AuditStatus): boolean {
  return legalTransitions[from].includes(to);
}

/** The subset of the case doc the state machine reads. */
export interface AuditCaseShape {
  caseId: string;
  createdAt: string;
  status: AuditStatus;
  name?: string;
  email?: string;
  archetypeSlug: string;
  archetypeName: string;
  scores: { clarity: number; readiness: number; urgency: number; individualSignals: number };
  offer?: 'roadmapAudit';
  price?: { usd: number; eur: number };
  intake: {
    role: string;
    scope: 'individual' | 'organization';
    aiMaturity: 'chat' | 'automations' | 'agents' | 'unsure';
    paidTools: string;
    weekEaters: string;
    win90d: string;
    triedFailed: string;
    biggestQuestion: string;
    availability: string;
  };
  booking?: { scheduledAt?: string; url?: string };
  payment?: { status?: 'none' | 'sent' | 'paid' | 'waived'; paidAt?: string; method?: string };
  deliverable?: { reportUrl?: string; videoUrl?: string; deliveredAt?: string };
  outcome?: { programPitched?: boolean; notes?: string };
}

/** 3 days in ms — the honest nudge window (no dark-pattern urgency). */
const NUDGE_WINDOW_MS = 3 * 24 * 60 * 60 * 1000;

/**
 * The single highest-leverage next move for a case, or null when the case
 * needs nothing (terminal states). This is the one function an agent or a
 * cron asks to drive the pipeline; it never guesses from history.
 */
export function nextAction(
  c: AuditCaseShape,
  nowIso?: string,
): { action: NextActionName; detail: string } | null {
  switch (c.status) {
    case 'submitted': {
      if (c.booking?.scheduledAt) {
        return { action: 'prep_call', detail: 'Call scheduled — run the sales-prep prompt on this case before the call.' };
      }
      const created = Date.parse(c.createdAt);
      if (Number.isFinite(created) && nowIso) {
        const age = Date.parse(nowIso) - created;
        if (Number.isFinite(age) && age > NUDGE_WINDOW_MS) {
          return { action: 'nudge_booking', detail: 'No booking after 3 days — send the day-3 nudge email.' };
        }
      }
      return { action: 'await_booking', detail: 'The booking link was sent in the confirmation email. Nothing to do until they book or 3 days pass.' };
    }
    case 'call_booked':
      return { action: 'prep_call', detail: 'Run the sales-prep prompt on this case before the fit call.' };
    case 'call_done':
      return nextActionAfterCallDone(c);
    case 'payment_sent':
      return { action: 'await_payment', detail: 'Payment link sent. Follow up if unpaid after a few days.' };
    case 'paid':
      return { action: 'schedule_session', detail: 'Payment received — schedule the 90-minute audit session.' };
    case 'audited':
      return nextActionAfterAudited(c);
    case 'converted':
    case 'dead':
      return null;
  }
}

function nextActionAfterCallDone(c: AuditCaseShape): { action: NextActionName; detail: string } {
  if (c.payment?.status === 'waived' || c.payment?.status === 'paid') {
    return { action: 'schedule_session', detail: 'Payment handled — schedule the 90-minute audit session.' };
  }
  return {
    action: 'send_payment',
    detail: 'Call done. Send the payment link (or record a waiver) and set the case to payment_sent / paid.',
  };
}

function nextActionAfterAudited(c: AuditCaseShape): { action: NextActionName; detail: string } | null {
  const delivered = c.deliverable?.reportUrl && c.deliverable?.deliveredAt;
  return delivered
    ? { action: 'convert_or_close', detail: 'Deliverable sent — run the two-path close conversation.' }
    : { action: 'deliver_report', detail: 'Generate the roadmap report and explainer video from the case doc.' };
}
