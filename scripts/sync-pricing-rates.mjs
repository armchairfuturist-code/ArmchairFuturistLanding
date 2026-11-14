#!/usr/bin/env node
/**
 * Currency rate sync for EUR <-> USD pricing on thearmchairfuturist.com.
 *
 * Policy (decided 2026-11-14):
 *   - EUR stays canonical for coaching, Digital Identity, Custom AI Provisioning.
 *   - USD stays canonical for Roadmap Audit and Self-Sufficiency Program.
 *   - The derived currency is re-priced from the live ECB rate ONLY when the
 *     rate moved >= 2% from the last published EUR_USD_RATE. Smaller moves
 *     are below the customer-visible rounding granule and are ignored.
 *   - Rounding rules are stable (see round* below). Some stored values are
 *     hand-charmed (7-endings, round numbers); expect a small human review
 *     on top of the automated proposal. That review is the PR.
 *
 * Usage:
 *   node scripts/sync-pricing-rates.mjs            # dry run; exits 1 if drift
 *   node scripts/sync-pricing-rates.mjs --apply    # rewrite src/lib/pricing.ts
 *   node scripts/sync-pricing-rates.mjs --self-test  # pin rounding rules
 *
 * Rate source: frankfurter.dev (ECB reference rates, no key, CORS-free).
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const PRICING = join(root, 'src/lib/pricing.ts');
const THRESHOLD = 0.02; // publish only when rate moved >= 2%

// ---------------------------------------------------------------------------
// Stable rounding rules
// ---------------------------------------------------------------------------
const roundNearest = (x, g = 1) => Math.round(x / g) * g;
const roundUp = (x, g) => Math.ceil(x / g) * g;

// ---------------------------------------------------------------------------
// Pricing model — canonical currency + derivation rule per product.
// ---------------------------------------------------------------------------
const MODEL = {
  coaching: {
    kind: 'eur-to-usd',
    packages: [
      { id: 'single', sessions: 1 },
      { id: 'pack-5', sessions: 5 },
      { id: 'pack-10', sessions: 10 },
      { id: 'pack-20', sessions: 20 },
    ],
    total: (rate, eur) => roundUp(eur * rate, 10),
    perSession: (rate, eur, sessions, totalUsd) =>
      roundNearest(totalUsd / sessions, 1),
    savings: (_rate, _eur, sessions, totalUsd) => sessions * 120 - totalUsd,
  },
  digitalIdentity: {
    kind: 'eur-to-usd',
    usd: (rate, eur) => roundNearest(eur * rate, 1),
  },
  customAiProvisioning: {
    kind: 'eur-to-usd',
    usdMin: (rate, eur) => roundUp(eur * rate, 50),
    usdMax: (rate, eur) => roundUp(eur * rate, 50),
  },
  roadmapAudit: {
    kind: 'usd-to-eur',
    eur: (rate, usd) => roundNearest(usd / rate, 1),
    eurList: (rate, usd) => roundNearest(usd / rate, 1),
  },
  selfSufficiency: {
    kind: 'usd-to-eur',
    eur: (rate, usd) => roundNearest(usd / rate, 1),
  },
};

// Hand-charmed exceptions: values that do NOT equal the rate-derived value
// at the pinned rate.  Keep this list in sync with pricing.ts comments.
const SELF_TEST_EXCEPTIONS = new Set([
  'coaching.pack-5.totalPriceUSD',
  'coaching.pack-5.pricePerSessionUSD',
  'coaching.pack-5.savingsUSD',
  'coaching.pack-10.totalPriceUSD',
  'coaching.pack-10.pricePerSessionUSD',
  'coaching.pack-10.savingsUSD',
  'coaching.pack-20.totalPriceUSD',
  'coaching.pack-20.savingsUSD',
  'roadmapAudit.priceEUR',
  'roadmapAudit.listPriceEUR',
  'selfSufficiency.priceEUR',
]);

// ---------------------------------------------------------------------------
// Read pricing.ts  (block-level regex parsing — robust enough for this
// single source; does not handle arbitrary formatting changes.)
// ---------------------------------------------------------------------------
function readPricing() {
  const src = readFileSync(PRICING, 'utf8');

  const block = (name, startPat, re) => {
    const i = src.indexOf(startPat);
    if (i < 0) throw new Error(`block not found: ${name}`);
    const j = src.indexOf('\n  },', i);
    const seg = src.slice(i, j < 0 ? undefined : j);
    const m = seg.match(re);
    return m ? Number(m[1]) : null;
  };

  const publishedRate = (() => {
    const m = src.match(/\bEUR_USD_RATE = ([\d.]+)/);
    if (!m) throw new Error('EUR_USD_RATE not found');
    return Number(m[1]);
  })();

  // Coaching packages — one block per id.
  const coaches = {};
  for (const p of MODEL.coaching.packages) {
    const start = `id: '${p.id}',`;
    const i = src.indexOf(start);
    if (i < 0) throw new Error(`coaching block not found: ${p.id}`);
    const j = src.indexOf('\n  },', i);
    const seg = src.slice(i, j < 0 ? undefined : j);
    const g = (k) => {
      const m = seg.match(new RegExp(k + ':\\s*(\\d+)'));
      return m ? Number(m[1]) : null;
    };
    coaches[p.id] = {
      eur:   g('totalPrice'),
      usd:   g('totalPriceUSD'),
      eps:   g('pricePerSessionUSD'),
      savingsUsd: g('savingsUSD'),
      sessions: p.sessions,
    };
  }

  // Services
  const svc = {
    roadmapAudit: {
      usd:     block('roadmapAudit',   'roadmapAudit: {',   /priceUSD:\s*(\d+)/),
      eur:     block('roadmapAudit',   'roadmapAudit: {',   /priceEUR:\s*(\d+)/),
      usdList: block('roadmapAudit',   'roadmapAudit: {',   /listPriceUSD:\s*(\d+)/),
      eurList: block('roadmapAudit',   'roadmapAudit: {',   /listPriceEUR:\s*(\d+)/),
    },
    selfSufficiency: {
      usd: block('selfSufficiency', 'selfSufficiency: {', /priceUSD:\s*(\d+)/),
      eur: block('selfSufficiency', 'selfSufficiency: {', /priceEUR:\s*(\d+)/),
    },
    digitalIdentity: {
      usd: block('digitalIdentity', 'digitalIdentity: {', /priceUSD:\s*(\d+)/),
      eur: block('digitalIdentity', 'digitalIdentity: {', /priceEUR:\s*(\d+)/),
    },
    customAiProvisioning: {
      usdMin: block('customAiProvisioning', 'customAiProvisioning: {', /minPriceUSD:\s*(\d+)/),
      usdMax: block('customAiProvisioning', 'customAiProvisioning: {', /maxPriceUSD:\s*(\d+)/),
      eurMin: block('customAiProvisioning', 'customAiProvisioning: {', /minPriceEUR:\s*(\d+)/),
      eurMax: block('customAiProvisioning', 'customAiProvisioning: {', /maxPriceEUR:\s*(\d+)/),
    },
  };

  return { src, publishedRate, coaches, svc };
}

// ---------------------------------------------------------------------------
// Compute proposed values at `rate`.  Returns { rows, changed, publishedRate }.
// ---------------------------------------------------------------------------
function compute(rate) {
  const { publishedRate, coaches, svc } = readPricing();
  const m = MODEL;
  const rows = [];

  for (const p of m.coaching.packages) {
    const c = coaches[p.id];
    const totalUsd = m.coaching.total(rate, c.eur);
    const eps = m.coaching.perSession(rate, c.eur, c.sessions, totalUsd);
    const savingsUsd = m.coaching.savings(rate, c.eur, c.sessions, totalUsd);
    rows.push(
      { key: `coaching.${p.id}.totalPriceUSD`,      cur: c.usd, next: totalUsd },
      { key: `coaching.${p.id}.pricePerSessionUSD`,  cur: c.eps, next: eps },
      { key: `coaching.${p.id}.savingsUSD`,          cur: c.savingsUsd, next: savingsUsd },
    );
  }

  const di = svc.digitalIdentity;
  rows.push({ key: 'digitalIdentity.priceUSD', cur: di.usd, next: m.digitalIdentity.usd(rate, di.eur) });

  const ca = svc.customAiProvisioning;
  rows.push(
    { key: 'customAiProvisioning.minPriceUSD', cur: ca.usdMin, next: m.customAiProvisioning.usdMin(rate, ca.eurMin) },
    { key: 'customAiProvisioning.maxPriceUSD', cur: ca.usdMax, next: m.customAiProvisioning.usdMax(rate, ca.eurMax) },
  );

  const ra = svc.roadmapAudit;
  rows.push(
    { key: 'roadmapAudit.priceEUR',     cur: ra.eur,     next: m.roadmapAudit.eur(rate, ra.usd) },
    { key: 'roadmapAudit.listPriceEUR', cur: ra.eurList, next: m.roadmapAudit.eurList(rate, ra.usdList) },
  );

  const ss = svc.selfSufficiency;
  rows.push({ key: 'selfSufficiency.priceEUR', cur: ss.eur, next: m.selfSufficiency.eur(rate, ss.usd) });

  const changed = rows.filter((r) => r.cur !== r.next);
  return { rows, changed, publishedRate };
}

// ---------------------------------------------------------------------------
// Apply: rewrite the numeric fields in src/lib/pricing.ts + the rate.
// ---------------------------------------------------------------------------
function apply(rate, changed, src) {
  const pats = {
    'coaching.single.totalPriceUSD':      ['single',    'totalPriceUSD'],
    'coaching.single.pricePerSessionUSD': ['single',    'pricePerSessionUSD'],
    'coaching.single.savingsUSD':         ['single',    'savingsUSD'],
    'coaching.pack-5.totalPriceUSD':      ['pack-5',    'totalPriceUSD'],
    'coaching.pack-5.pricePerSessionUSD': ['pack-5',    'pricePerSessionUSD'],
    'coaching.pack-5.savingsUSD':         ['pack-5',    'savingsUSD'],
    'coaching.pack-10.totalPriceUSD':     ['pack-10',   'totalPriceUSD'],
    'coaching.pack-10.pricePerSessionUSD':['pack-10',   'pricePerSessionUSD'],
    'coaching.pack-10.savingsUSD':        ['pack-10',   'savingsUSD'],
    'coaching.pack-20.totalPriceUSD':     ['pack-20',   'totalPriceUSD'],
    'coaching.pack-20.pricePerSessionUSD':['pack-20',   'pricePerSessionUSD'],
    'coaching.pack-20.savingsUSD':        ['pack-20',   'savingsUSD'],
    'digitalIdentity.priceUSD':           ['digitalIdentity', 'priceUSD'],
    'customAiProvisioning.minPriceUSD':   ['customAiProvisioning', 'minPriceUSD'],
    'customAiProvisioning.maxPriceUSD':   ['customAiProvisioning', 'maxPriceUSD'],
    'roadmapAudit.priceEUR':              ['roadmapAudit', 'priceEUR'],
    'roadmapAudit.listPriceEUR':          ['roadmapAudit', 'listPriceEUR'],
    'selfSufficiency.priceEUR':           ['selfSufficiency', 'priceEUR'],
  };

  let out = src;
  for (const row of changed) {
    const [blockKey, field] = pats[row.key];
    if (!blockKey) throw new Error(`no write rule for ${row.key}`);
    const start = out.indexOf(
      blockKey.startsWith('coaching.')
        ? `id: '${blockKey.replace('coaching.', '')}',`
        : `${blockKey}: {`,
    );
    if (start < 0) throw new Error(`write target not found: ${blockKey}`);
    const end = out.indexOf('\n  },', start);
    const seg = out.slice(start, end < 0 ? undefined : end);
    const re = new RegExp(`(${field}:\\s*)\\d+`);
    if (!re.test(seg)) throw new Error(`field not found in seg: ${blockKey}.${field}`);
    out = out.slice(0, start)
        + seg.replace(re, `$1${row.next}`)
        + out.slice(end < 0 ? out.length : end);
  }
  out = out.replace(/\bEUR_USD_RATE = [\d.]+/, `EUR_USD_RATE = ${rate.toFixed(4)}`);
  writeFileSync(PRICING, out);
  console.log(`Applied ${changed.length} price change(s) at EUR/USD ${rate.toFixed(4)}.`);
}

// ---------------------------------------------------------------------------
// Self-test: at the pinned rate deterministic rules must reproduce the stored
// values; hand-charmed exceptions must differ (so the list cannot go stale).
// ---------------------------------------------------------------------------
function selfTest() {
  const { publishedRate } = readPricing();
  const { rows } = compute(publishedRate);
  let fail = 0;
  for (const r of rows) {
    const listed = SELF_TEST_EXCEPTIONS.has(r.key);
    if (listed && r.cur === r.next) {
      console.log(`  FAIL  ${r.key}: stored equals derived (${r.cur}) but is marked a charm exception`);
      fail++;
    } else if (!listed && r.cur !== r.next) {
      console.log(`  FAIL  ${r.key}: derived ${r.next} != stored ${r.cur} at rate ${publishedRate}`);
      fail++;
    } else {
      console.log(`  ok    ${r.key}${listed && r.cur !== r.next ? ' (charm exception, differs as expected)' : ''} (${r.cur})`);
    }
  }
  console.log(fail ? `\nself-test: ${fail} failure(s)` : `\nself-test: all ${rows.length} rules pinned (${SELF_TEST_EXCEPTIONS.size} charm exceptions)`);
  process.exit(fail ? 1 : 0);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
if (process.argv.includes('--self-test')) {
  selfTest();
  // unreachable if exit 1
}

const rate = await fetch('https://api.frankfurter.dev/v1/latest?base=EUR&symbols=USD')
  .then((r) => {
    if (!r.ok) throw new Error(`rate API HTTP ${r.status}`);
    return r.json();
  })
  .then((j) => Number(j.rates.USD));
if (!Number.isFinite(rate)) throw new Error('rate API returned no USD rate');

const { rows, changed, publishedRate } = compute(rate);
const drift = Math.abs(rate - publishedRate) / publishedRate;

if (drift < THRESHOLD) {
  console.log(`EUR/USD ${rate.toFixed(4)} vs published ${publishedRate.toFixed(4)}: drift ${(drift * 100).toFixed(1)}% < ${THRESHOLD * 100}% threshold.  No update needed.`);
  process.exit(0);
}

console.log(`EUR/USD ${rate.toFixed(4)} vs published ${publishedRate.toFixed(4)}: drift ${(drift * 100).toFixed(1)}% >= ${THRESHOLD * 100}% threshold.`);
console.log('Proposed changes (derived currency only; canonical side untouched):');
for (const r of changed) {
  if (SELF_TEST_EXCEPTIONS.has(r.key) && r.cur !== r.next) {
    console.log(`  ${r.key.padEnd(42)} ${r.cur} -> ${r.next}  (was hand-charmed)`)
  } else {
    console.log(`  ${r.key.padEnd(42)} ${r.cur} -> ${r.next}`);
  }
}

if (process.argv.includes('--apply')) {
  const { src } = readPricing();
  apply(rate, changed, src);
  process.exit(0);
}

console.log('\nRun with --apply to write src/lib/pricing.ts.');
process.exit(1);
