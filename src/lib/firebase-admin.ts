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
      // The FIREBASE_SERVICE_ACCOUNT_KEY path is a local-dev fallback: if the env var
      // is malformed (escaped quotes, partial JSON), fall back to applicationDefault()
      // rather than crashing the request handler.
      let credential;
      if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        try {
          credential = cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY));
        } catch {
          console.warn(
            'FIREBASE_SERVICE_ACCOUNT_KEY is set but invalid JSON. Falling back to applicationDefault().'
          );
          credential = applicationDefault();
        }
      } else {
        credential = applicationDefault();
      }
      app = initializeApp({ credential });
    }
    _db = getFirestore(app);
  }
  return _db;
}
