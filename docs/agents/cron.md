# Cron: Day-3 Audit Nudge

## Endpoint
`GET /api/cron/nudge` — header `x-cron-secret: $CRON_SECRET`.

Finds audit cases: `status == 'submitted'`, no `booking.scheduledAt`,
`createdAt` older than 3 days, `nudgedAt` not set. Sends one honest reminder
email each and stamps `nudgedAt`. Idempotent — safe to run on any schedule.

## Setup (one time)

1. Set `CRON_SECRET` as a Firebase App Hosting secret (same flow as
   RESEND_API_KEY in `apphosting.yaml`).
2. Schedule daily (e.g. 10:00 Europe/Lisbon) either via Cloud Scheduler or
   a Hermes cron job:

```bash
curl -s -H "x-cron-secret: $CRON_SECRET" https://thearmchairfuturist.com/api/cron/nudge
```

## Canary cleanup (one time)

The deploy canary case `audit_mth2c0fr_u0iuul` sits in `audit_cases` with
status `submitted`. Either delete it in the Firebase console, or let it be
— it would receive a nudge email in 3 days (harmless; it was sent to
Alex's own address). Quickest console path: Firestore → audit_cases →
`audit_mth2c0fr_u0iuul` → delete document. Or mark it `dead`.
