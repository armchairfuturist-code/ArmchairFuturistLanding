-- Sampled request counter for the daily Workers usage check.
-- The Worker increments `samples` for 1 in SAMPLE_RATE requests (see
-- cloudflare/worker.mjs); the cron estimates the day's request count from it.
CREATE TABLE IF NOT EXISTS daily_requests (
  day TEXT PRIMARY KEY,
  samples INTEGER NOT NULL DEFAULT 0
);
