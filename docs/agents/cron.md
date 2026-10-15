# Cron: Day-3 Audit Nudge

## Endpoint
`GET /api/cron/nudge` — header `x-cron-secret: $CRON_SECRET`.

Finds audit cases: `status == 'submitted'`, no `booking.scheduledAt`,
`createdAt` older than 3 days, `nudgedAt` not set. Sends one honest reminder
email each and stamps `nudgedAt`. Idempotent — safe to run on any schedule.

## Setup (one time)

The secret value is already generated and waiting in `.cron-secret.txt`
(repo root, gitignored). Three commands:

```bash
# 1. Authenticate (skip if already logged in)
npx firebase-tools login

# 2. Set the secret (paste the value from .cron-secret.txt when prompted)
npx firebase-tools apphosting:secrets:set CRON_SECRET --project armchair-futurist

# 3. Trigger a redeploy so the new secret binds (any push works, or:)
git commit --allow-empty -m "chore: bind CRON_SECRET" && git push
```

Then delete `.cron-secret.txt`.

## Scheduling

Daily at 10:00 Europe/Lisbon, either:

**Cloud Scheduler** (gcloud):
```bash
gcloud scheduler jobs create http audit-day3-nudge \
  --location us-central1 \
  --schedule "0 10 * * *" \
  --time-zone "Europe/Lisbon" \
  --uri "https://thearmchairfuturist.com/api/cron/nudge" \
  --http-method GET \
  --oauth-service-account-email "" \
  --headers "x-cron-secret=$(cat .cron-secret.txt)"
```
(If `--headers` isn't supported in your gcloud version, set the header via
an OAuth-free Cloud Function wrapper or use the Hermes cron below.)

**Hermes cron** (already-running agent infra):
```bash
curl -s -H "x-cron-secret: $(cat /home/alex/Projects/ArmchairFuturistLanding/.cron-secret.txt)" \
  https://thearmchairfuturist.com/api/cron/nudge
```

## Canary cleanup (one time, already done)

Two deploy canaries were created by hand to prove the pipeline end to end:
`audit_mth2c0fr_u0iuul` in `audit_cases` and `id_mth8en1y_wvtg9z` in
`identity_cases`. Both are Alex's own address.

The two helper scripts that used to do this (`scripts/cleanup-canaries.mjs`
and `scripts/cleanup-canaries-curl.sh`) were deleted: the job is one time, it
had already been done, and the two scripts did the same work by two different
transports.

Delete them by hand in the Firebase console — Firestore → `audit_cases` or
`identity_cases` → the document above → delete.

If the audit canary is left in place it will receive a nudge email, which is
harmless here because it goes to Alex. The nudge only selects cases whose
status is still `submitted`, so marking it any other status also excludes it.
