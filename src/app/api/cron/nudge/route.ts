import { NextRequest } from 'next/server';
import { getResend } from '@/lib/resend';
import { claimNudge, listOverdueCases, releaseNudge } from '@/lib/case-store';
import { buildOverdueQuery, isOverdueForNudge, type NudgeCase } from '@/lib/cron/nudge-overdue';
import { buildNudgeEmail } from '@/lib/email/templates';
import { ALEX_EMAIL, FROM_EMAIL } from '@/lib/email/config';

/**
 * Day-3 nudge cron endpoint (Plan 010 Phase C).
 *
 * GET /api/cron/nudge with header `x-cron-secret: $CRON_SECRET`.
 * Finds audit cases submitted >3 days ago with no booking and no prior
 * nudge; sends one honest nudge email each and stamps `nudgedAt`.
 *
 * Idempotent, and safe against overlapping runs. Each case is CLAIMED in a
 * transaction before its email is sent, so two runs racing the same case
 * cannot both send. The claim also moves `status` to `nudged`, which takes
 * the case out of the query, previously a nudged case matched every future
 * run forever and was filtered in memory afterwards. If the send throws the
 * claim is released so a later run retries, and the loop continues to the
 * other cases rather than abandoning the run.
 */

export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret');
  const expected = process.env.CRON_SECRET;
  if (!expected || !secret || secret !== expected) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const resend = getResend();
    const nowIso = new Date().toISOString();
    const query = buildOverdueQuery(nowIso);

    const overdue = await listOverdueCases(query.cutoff);

    let nudged = 0;
    let skipped = 0;
    let failed = 0;

    for (const { caseId, doc } of overdue) {
      try {
        const c = doc as NudgeCase;
        if (!isOverdueForNudge(c, nowIso)) {
          skipped++;
          continue;
        }

        // Claim first, send second. The claim is one conditional UPDATE, so a
        // concurrent run that already claimed the case gets no changed row.
        const claimed = await claimNudge(caseId, nowIso);
        if (!claimed) {
          skipped++;
          continue;
        }

        try {
          await resend.emails.send({
            from: FROM_EMAIL,
            to: c.email ?? ALEX_EMAIL,
            subject: 'Still want the roadmap?',
            html: buildNudgeEmail({
              name: c.name ?? 'there',
              archetypeName: c.archetypeName ?? '',
            }),
          });
          nudged++;
        } catch (sendErr) {
          // Hand the case back so a later run retries it. Releasing must not
          // abort the run, the remaining cases still deserve their email.
          console.error('Nudge send failed:', sendErr);
          await releaseNudge(caseId);
          failed++;
        }
      } catch (caseErr) {
        console.error('Nudge case failed:', caseErr);
        failed++;
      }
    }

    return Response.json({ ok: true, nudged, skipped, failed });
  } catch (err) {
    console.error('Nudge cron error:', err);
    return Response.json({ error: 'Nudge run failed.' }, { status: 500 });
  }
}
