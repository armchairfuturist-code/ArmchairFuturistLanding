import { NextRequest } from 'next/server';
import { getResend } from '@/lib/resend';
import { getDb } from '@/lib/firebase-admin';
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
 * the case out of the query — previously a nudged case matched every future
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
    const db = getDb();
    const resend = getResend();
    const nowIso = new Date().toISOString();
    const query = buildOverdueQuery(nowIso);

    const snap = await db
      .collection('audit_cases')
      .where('status', '==', 'submitted')
      .where('createdAt', '<=', query.cutoff)
      .get();

    let nudged = 0;
    let skipped = 0;
    let failed = 0;

    for (const doc of snap.docs) {
      try {
        // Claim first, send second. The transaction re-reads the doc, so a
        // concurrent run that already claimed it sees `nudged` and backs off.
        const claimed = await db.runTransaction(async (tx) => {
          const fresh = await tx.get(doc.ref);
          const data = fresh.data() as NudgeCase | undefined;
          if (!fresh.exists || !isOverdueForNudge(data ?? {}, nowIso)) {
            return false;
          }
          tx.update(doc.ref, { status: 'nudged', nudgedAt: nowIso });
          return true;
        });

        if (!claimed) {
          skipped++;
          continue;
        }

        let c: NudgeCase = {};
        try {
          c = (doc.data() as NudgeCase) ?? {};
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
          // abort the run — the remaining cases still deserve their email.
          console.error('Nudge send failed:', sendErr);
          await doc.ref.update({ status: 'submitted', nudgedAt: null });
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
