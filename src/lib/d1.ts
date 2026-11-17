import { getCloudflareContext } from '@opennextjs/cloudflare';

/**
 * The slice of D1 this app uses.
 *
 * Declared here rather than left to `wrangler types`: that generator also
 * writes the whole workerd global scope, which re-types `Request.json()` as
 * `unknown` and breaks unrelated files. Three methods cover every query.
 */
export interface D1Statement {
  bind(...values: unknown[]): D1Statement;
  run(): Promise<{ meta?: { changes?: number } }>;
  all<T = Record<string, unknown>>(): Promise<{ results?: T[] }>;
  first<T = Record<string, unknown>>(): Promise<T | null>;
}

export interface D1Database {
  prepare(query: string): D1Statement;
}

/**
 * The Worker's D1 binding.
 *
 * Storage moved off Firestore because `firebase-admin` cannot run in workerd:
 * google-gax loads grpc at module scope and reads `__dirname`, which workerd
 * does not define. D1 needs no client library, so the API routes run where
 * they are deployed instead of proxying to Firebase App Hosting.
 */
export function getD1(): D1Database {
  const env = getCloudflareContext().env as { DB?: D1Database };
  const db = env.DB;
  if (!db) {
    throw new Error('D1 binding "DB" is missing. Run `npm run preview` or deploy.');
  }
  return db;
}

/** A document id with the shape Firestore auto-ids had. */
export function newId(): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 20);
}
