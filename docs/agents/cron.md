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

## Canary cleanup (one time)

```bash
# Download a service account key first (Firebase console → Project settings
# → Service accounts → Generate new private key), then:
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json node scripts/cleanup-canaries.mjs
rm /path/to/key.json
```
Deletes `audit_mth2c0fr_u0iuul` and `id_mth8en1y_wvtg9z`. Alternatively
delete them by hand: Firebase console → Firestore → `audit_cases` /
`identity_cases`.

## Canary cleanup (one time)

The deploy canary case `audit_mth2c0fr_u0iuul` sits in `audit_cases` with
status `submitted`. Either delete it in the Firebase console, or let it be
— it would receive a nudge email in 3 days (harmless; it was sent to
Alex's own address). Quickest console path: Firestore → audit_cases →
`audit_mth2c0fr_u0iuul` → delete document. Or mark it `dead`.
