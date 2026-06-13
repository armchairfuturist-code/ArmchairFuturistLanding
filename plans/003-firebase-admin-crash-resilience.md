# Plan 003: Firebase Admin Crash Resilience

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report -- do not improvise. When done, update the status row for this plan
> in `plans/README.md` -- unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 68d76a5a..HEAD -- src/lib/firebase-admin.ts`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: correctness + security
- **Planned at**: commit `68d76a5a`, 2026-06-13

## Why this matters

`src/lib/firebase-admin.ts:17` calls `JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)`
inline with no try/catch. If the env var contains invalid JSON (misconfigured
deployment, escaped quotes from a secret manager), the entire request handler
crashes with an uncaught exception. The stack trace may leak the key structure
in logs. In Firebase App Hosting (Cloud Run), `applicationDefault()` is the
recommended path (uses Cloud Run default service account), so the
`FIREBASE_SERVICE_ACCOUNT_KEY` path is a local-development fallback that should
degrade gracefully when broken.

## Current state

**`src/lib/firebase-admin.ts`** lines 7-24:
```
export function getDb(): Firestore {
  if (!_db) {
    let app;
    if (getApps().length > 0) {
      app = getApps()[0];
    } else {
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
```

**Caller** -- `src/app/api/assessment/submit/route.ts:46-61` already wraps
`getDb()` in a try/catch, but the crash in `JSON.parse` happens before the
caller's catch can handle it cleanly.

**Repo conventions**: Server-side code uses lazy-init singletons -- see
`src/lib/resend.ts` for the same pattern (but without the unsafe parse).

## Commands you will need

| Purpose   | Command                  | Expected on success |
|-----------|--------------------------|---------------------|
| Typecheck | `npm run lint`           | exit 0, no errors   |
| Tests     | `npm test`               | all pass            |

## Scope

**In scope** (only file to modify):
- `src/lib/firebase-admin.ts`

**Out of scope** (do NOT touch):
- `src/app/api/assessment/submit/route.ts` -- already handles errors downstream
- Any other file

## Steps

### Step 1: Wrap JSON.parse in try/catch with safe fallback

In `src/lib/firebase-admin.ts`, replace the inline ternary around lines 15-18
with a credential-resolution block.

Change:
```
      app = initializeApp({
        credential: process.env.FIREBASE_SERVICE_ACCOUNT_KEY
          ? cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY))
          : applicationDefault(),
      });
```

To:
```
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
```

This:
1. Wraps `JSON.parse` in try/catch so invalid JSON doesn't crash
2. Logs a clear warning (no key content leaked) and falls through to `applicationDefault()`
3. Avoids calling `cert()` with `undefined`
4. `applicationDefault()` works in Cloud Run production automatically

**Verify**: `npm run lint` -- exit 0, no errors.

### Step 2: Run tests

**Verify**: `npm test` -- all tests pass.

## Test plan

- No behavioral change on the success path -- existing tests cover it.
- The error path can be verified by inspection:
  - Before: `cert(JSON.parse("not-json"))` throws SyntaxError, crashes getDb
  - After: caught, warning logged, falls back to applicationDefault()

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `npm run lint` exits 0
- [ ] `npm test` exits 0
- [ ] `grep -n "JSON.parse" src/lib/firebase-admin.ts` shows parse inside a try block
- [ ] `grep -n "applicationDefault()" src/lib/firebase-admin.ts` shows two calls (one in catch, one in else)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- `firebase-admin.ts` has been substantially rewritten
- `getDb()` has been removed or renamed

## Maintenance notes

- If a third credential source is added, extract `resolveCredential()` as a
  named function and unit-test it.
- `console.warn` is intentional (warning, not error) because the fallback is
  the correct production path.
