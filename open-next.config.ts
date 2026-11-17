import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Static site: prerendered pages are served straight from Workers Static Assets.
// No R2, no Durable Objects, no queue, so the free plan covers it and a request
// for a prerendered page never invokes the Worker.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
