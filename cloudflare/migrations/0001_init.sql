-- Armchair Futurist intake storage. Replaces Firestore (2026-11-17).
-- Every write happens from a route handler inside the Worker; nothing reads
-- these tables from the browser, so there are no row-level rules to express.

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL,
  source TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  consulted INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS leads_created_idx ON leads (createdAt DESC);

CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  source TEXT NOT NULL,
  handled INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS contact_messages_created_idx ON contact_messages (createdAt DESC);

CREATE TABLE IF NOT EXISTS assessment_leads (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  archetypeSlug TEXT NOT NULL,
  archetypeName TEXT NOT NULL,
  scores TEXT NOT NULL,
  individualSignals INTEGER NOT NULL,
  createdAt TEXT NOT NULL,
  source TEXT NOT NULL
);

-- Paid cases keep the whole document in `doc` so the admin list and the nudge
-- cron read the same shape Firestore served. The columns beside it exist for
-- querying: the nudge cron filters on (status, createdAt), the admin list
-- orders by createdAt.
CREATE TABLE IF NOT EXISTS audit_cases (
  caseId TEXT PRIMARY KEY,
  status TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  archetypeName TEXT NOT NULL DEFAULT '',
  doc TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS audit_cases_status_created_idx ON audit_cases (status, createdAt);
CREATE INDEX IF NOT EXISTS audit_cases_created_idx ON audit_cases (createdAt DESC);

CREATE TABLE IF NOT EXISTS identity_cases (
  caseId TEXT PRIMARY KEY,
  status TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  archetypeName TEXT NOT NULL DEFAULT '',
  doc TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS identity_cases_created_idx ON identity_cases (createdAt DESC);
