import { initializeApp, getApps, cert, applicationDefault } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

// Lazy-init to avoid crashing at build time when credentials aren't available
let _db: Firestore | null = null;

export function getDb(): Firestore {
  if (!_db) {
    let app;
    if (getApps().length > 0) {
      app = getApps()[0];
    } else {
      // Firebase App Hosting provides default credentials automatically.
      // For local dev, set GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_SERVICE_ACCOUNT_KEY.
      app = initializeApp({
        credential: process.env.FIREBASE_SERVICE_ACCOUNT_KEY
          ? cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY))
          : applicationDefault(),
      });
    }
    _db = getFirestore(app);
  }
  return _db;
}
