import { NextRequest } from 'next/server';
import { getResend } from '@/lib/resend';
import { ALEX_EMAIL, FROM_EMAIL } from '@/lib/email/config';
import { readUsage, buildUsageWarningEmail } from '@/lib/cron/usage-check';
import { getD1 } from '@/lib/d1';

/**
 * Daily Workers usage check (cron). Authenticated by `x-cron-secret`.
 *
 * Reads the sampled request counter (daily_requests in D1) and emails the
 * operator once the day's estimate crosses half of the 100,000/day free
 * request cap. Fires at 09:00 UTC alongside the day-3 nudge.
 *
 * Query parameter `?force=1` sends the warning email regardless of the
 * threshold, secret-guarded, for a one-off "is it wired up" check.
 */
export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret');
  const expected = process.env.CRON_SECRET;
  if (!expected || !secret || secret !== expected) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const force = req.nextUrl.searchParams.get('force') === '1';
  const day = new Date().toISOString().slice(0, 10);

  try {
    const snapshot = await readUsage(
      { all: (sql: string) => getD1().prepare(sql).all() },
      day,
    );

    let emailSent = false;
    if (snapshot.warn || force) {
      const email = buildUsageWarningEmail(snapshot);
      try {
        await getResend().emails.send({
          from: FROM_EMAIL,
          to: ALEX_EMAIL,
          subject: email.subject,
          html: email.html,
        });
        emailSent = true;
      } catch (err) {
        console.error('Usage check email failed:', err);
      }
    }

    return Response.json({ ...snapshot, emailSent });
  } catch (err) {
    console.error('Usage check failed:', err);
    return Response.json({ error: 'Usage check failed.' }, { status: 500 });
  }
}
