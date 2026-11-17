import openNext from '../.open-next/worker.js';

export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from '../.open-next/worker.js';

// The API used to be proxied back to Firebase App Hosting, because
// firebase-admin cannot run in workerd. Storage is D1 now, so the whole site
// runs in this Worker and the proxy seam is gone.
export default {
  fetch(request, env, ctx) {
    // Sampled request counter for the daily usage check: one D1 write per
    // SAMPLE_RATE requests, deferred past the response via waitUntil so the
    // hot path never blocks on it. See src/lib/cron/usage-check.ts.
    if (env.DB && Math.random() < 0.1) {
      ctx.waitUntil(
        env.DB.prepare(
          "INSERT INTO daily_requests (day, samples) VALUES (strftime('%Y-%m-%d','now'), 1) " +
          'ON CONFLICT(day) DO UPDATE SET samples = samples + 1',
        ).run().catch(() => {}),
      );
    }
    return openNext.fetch(request, env, ctx);
  },

  // Day-3 nudge cron. Firebase never scheduled this endpoint, so nudges never
  // fired; the Cron Trigger does. It calls the route through the self binding,
  // which is the same path a request takes, secret and all.
  async scheduled(_event, env, ctx) {
    const secret = env.CRON_SECRET ?? '';
    const self = env.WORKER_SELF_REFERENCE;
    const headers = { 'x-cron-secret': secret };

    // Day-3 nudge first: a missed prospect nudge is more urgent than a
    // usage heads-up. A failure here logs but does not stop the usage check.
    const nudge = await self.fetch(
      new Request('https://armchair-futurist.internal/api/cron/nudge', { headers }),
    );
    if (!nudge.ok) {
      console.error('nudge cron failed', nudge.status, await nudge.text().catch(() => ''));
    }

    // Daily Workers usage check: emails the operator past 50% of the free
    // 100k/day request cap. The route reads analytics with CF_ANALYTICS_TOKEN.
    const usage = await self.fetch(
      new Request('https://armchair-futurist.internal/api/cron/usage-check', { headers }),
    );
    if (!usage.ok) {
      console.error('usage cron failed', usage.status, await usage.text().catch(() => ''));
    }
  },
};
