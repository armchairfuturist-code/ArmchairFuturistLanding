import openNext from '../.open-next/worker.js';

export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from '../.open-next/worker.js';

// The API used to be proxied back to Firebase App Hosting, because
// firebase-admin cannot run in workerd. Storage is D1 now, so the whole site
// runs in this Worker and the proxy seam is gone.

/** Call a cron route through the self binding; log failures, never throw. */
async function callCron(self, name, headers) {
  try {
    const res = await self.fetch(new Request(`https://armchair-futurist.internal/api/cron/${name}`, { headers }));
    if (!res.ok) {
      console.error(`${name} cron failed`, res.status, await res.text().catch(() => ''));
    }
  } catch (err) {
    console.error(`${name} cron threw`, err);
  }
}

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

  // Cron Trigger entry. Two jobs run in order and each one is isolated: a
  // throw from either logs and the next still runs. Both call their route
  // through the self binding, so the request takes the same path as a real
  // visit, secret header and all.
  async scheduled(_event, env, ctx) {
    const headers = { 'x-cron-secret': env.CRON_SECRET ?? '' };
    const self = env.WORKER_SELF_REFERENCE;

    // Day-3 nudge first: a missed prospect nudge is more urgent than a
    // usage heads-up.
    await callCron(self, 'nudge', headers);

    // Daily Workers usage check: emails the operator past 50% of the free
    // 100k/day request cap, read from the sampled `daily_requests` counter
    // this Worker fills in `fetch`. No analytics token is involved.
    await callCron(self, 'usage-check', headers);
  },
};
