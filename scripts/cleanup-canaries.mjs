#!/usr/bin/env node
/**
 * One-time canary cleanup: deletes the two deploy-canary cases from Firestore.
 *
 * Usage (from the repo root, with a service account key JSON):
 *   GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json \
 *     node scripts/cleanup-canaries.mjs
 *
 * Get the key: Firebase console → Project settings → Service accounts →
 * Generate new private key. Delete the key file afterwards.
 */
import { initializeApp, cert, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const CANARIES = ['audit_mth2c0fr_u0iuul', 'id_mth8en1y_wvtg9z'];

try {
  initializeApp({ credential: applicationDefault() });
} catch {
  // already initialized
}
const db = getFirestore();

for (const id of CANARIES) {
  for (const collection of ['audit_cases', 'identity_cases']) {
    const ref = db.collection(collection).doc(id);
    const doc = await ref.get();
    if (doc.exists) {
      await ref.delete();
      console.log(`deleted ${collection}/${id}`);
    } else {
      console.log(`not found in ${collection}: ${id}`);
    }
  }
}
console.log('done.');
