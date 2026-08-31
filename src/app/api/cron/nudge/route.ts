import { NextRequest } from 'next/server';
import { getResend } from '@/lib/resend';
import { getDb } from '@/lib/firebase-admin';
import { buildOverdueQuery, isOverdueForNudge } from '@/lib/cron/nudge-overdue';
import { buildNudgeEmail } from '@/lib/email/templates';
import { ALEX_EMAIL, FROM_EMAIL } from '@/lib/email/config';

/**
 * Day-3 nudge cron endpoint (Plan 010 Phase C).
 *
 * GET /api/cron/nudge with header `x-cron-secret: $CRON_SECRET`.
 * Finds audit cases submitted >3 days ago with no booking and no prior
 * nudge; sends one honest nudge email each and stamps `nudgedAt`.
 * Idempotent: a case is nudged at most once until it books or dies.
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
    const query = buildOverdueQuery(new Date().toISOString());

    const snap = await db
      .collection('audit_cases')
      .where('status', '==', 'submitted')
      .where('createdAt', '<=', query.cutoff)
      .get();

    let nudged = 0;
    let skipped = 0;

    for (const doc of snap.docs) {
      const c = doc.data() as {
        name?: string;
        email?: string;
        archetypeName?: string;
        nudgedAt?: string;
        booking?: { scheduledAt?: string };
        status?: string;
        createdAt?: string;
      };

      if (!isOverdueForNudge(c, new Date().toISOString())) {
        skipped++;
        continue;
      }

      await resend.emails.send({
        from: FROM_EMAIL,
        to: c.email ?? ALEX_EMAIL,
        subject: 'Still want the roadmap?',
        html: buildNudgeEmail({
          name: c.name ?? 'there',
          archetypeName: c.archetypeName ?? '',
        }),
      });

      await doc.ref.update({ nudgedAt: new Date().toISOString() });
      nudged++;
    }

    return Response.json({ ok: true, nudged, skipped });
  } catch (err) {
    console.error('Nudge cron error:', err);
    return Response.json({ error: 'Nudge run failed.' }, { status: 500 });
  }
}
