/**
 * Daily Workers usage check (added 2026-11-17).
 *
 * Cloudflare's Free plan caps the Worker at 100,000 requests/day and does not
 * email anyone when the cap nears: going over fails requests with Error 1027
 * rather than billing a card. The Worker counts a 1-in-10 sample of its own
 * requests into the `daily_requests` D1 table (see cloudflare/worker.mjs);
 * this module reads that counter and emails the operator once the estimate
 * crosses half of the cap.
 *
 * Sampling keeps the hot path cheap: one D1 write per ten requests. At the
 * 50k-warning threshold the sampled count is ~5,000, so the estimate's
 * relative error is about 1.4% — plenty for a heads-up.
 */

export const FREE_REQUEST_LIMIT = 100_000;
export const WARNING_FRACTION = 0.5;
/** The Worker samples 1 in SAMPLE_RATE requests. */
export const SAMPLE_RATE = 10;

export interface UsageSnapshot {
  /** UTC date the estimate covers. */
  day: string;
  /** Estimated requests for that day. */
  estimatedRequests: number;
  warn: boolean;
}

/** Rows as the `daily_requests` table stores them. */
export type DailyRequestRow = { day: string; samples: number };

export function estimateRequests(samples: number, sampleRate = SAMPLE_RATE): number {
  return Math.round(samples * sampleRate);
}

export function shouldWarn(estimated: number, threshold = Math.round(FREE_REQUEST_LIMIT * WARNING_FRACTION)): boolean {
  return estimated >= threshold;
}

export function buildUsageWarningEmail(s: UsageSnapshot): { subject: string; html: string } {
  const pct = Math.round((s.estimatedRequests / FREE_REQUEST_LIMIT) * 100);
  const subject = `Worker usage at ${pct}% of the free daily cap`;
  const html = `<div style="font-family:system-ui,sans-serif;max-width:560px">
  <h2 style="margin:0 0 12px">Worker usage at ${pct}% of the free daily cap</h2>
  <p style="margin:0 0 8px">thearmchairfuturist.com is estimated at <b>${s.estimatedRequests.toLocaleString()}</b> of its 100,000 free daily requests for ${s.day} (UTC).</p>
  <p style="margin:12px 0 0;color:#666">If traffic keeps climbing, requests past 100,000/day fail with Error 1027 on the Free plan. Workers Paid ($5/month, dash.cloudflare.com &rarr; Manage Account &rarr; Billing) removes the cap.</p>
</div>`;
  return { subject, html };
}

/** Minimal DB seam the check needs; D1 satisfies it. */
export interface UsageDb {
  all(sql: string): Promise<{ results?: DailyRequestRow[] }>;
}

/** Sum today's (and any late-written yesterday) samples for a UTC day. */
export async function readUsage(db: UsageDb, day: string): Promise<UsageSnapshot> {
  const { results } = await db.all(
    `SELECT day, SUM(samples) AS samples FROM daily_requests WHERE day = '${day}' GROUP BY day`,
  );
  const samples = Number(results?.[0]?.samples ?? 0);
  const estimatedRequests = estimateRequests(samples);
  return { day, estimatedRequests, warn: shouldWarn(estimatedRequests) };
}
