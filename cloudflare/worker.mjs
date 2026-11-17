import openNext from '../.open-next/worker.js';

export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from '../.open-next/worker.js';

// The API used to be proxied back to Firebase App Hosting, because
// firebase-admin cannot run in workerd. Storage is D1 now, so the whole site
// runs in this Worker and the proxy seam is gone.
export default {
  fetch(request, env, ctx) {
    return openNext.fetch(request, env, ctx);
  },

  // Day-3 nudge cron. Firebase never scheduled this endpoint, so nudges never
  // fired; the Cron Trigger does. It calls the route through the self binding,
  // which is the same path a request takes, secret and all.
  async scheduled(_event, env, ctx) {
    const res = await env.WORKER_SELF_REFERENCE.fetch(
      new Request('https://armchair-futurist.internal/api/cron/nudge', {
        headers: { 'x-cron-secret': env.CRON_SECRET ?? '' },
      }),
    );
    if (!res.ok) {
      console.error('nudge cron failed', res.status, await res.text().catch(() => ''));
    }
  },
};
