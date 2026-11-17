import openNext from '../.open-next/worker.js';
import { proxyApi } from './api-proxy.mjs';

export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from '../.open-next/worker.js';

export default {
  fetch(request, env, ctx) {
    return proxyApi(request) ?? openNext.fetch(request, env, ctx);
  },
};
