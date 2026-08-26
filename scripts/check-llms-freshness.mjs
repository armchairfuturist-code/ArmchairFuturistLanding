#!/usr/bin/env node
/**
 * GEO freshness check — fails when public/llms.txt drifts from source of truth.
 * Sources: src/lib/pricing.ts, src/lib/section-registry.tsx, src/content/faqs.ts
 * Run: npm run geo:check   (cron-friendly: exit 0 fresh, exit 1 drift)
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

const pricing = read('src/lib/pricing.ts');
const registry = read('src/lib/section-registry.tsx');
const faqs = read('src/content/faqs.ts');
const llms = read('public/llms.txt');

const failures = [];
const ok = (name, cond, detail = '') => {
  if (cond) {
    console.log(`  ok   ${name}`);
  } else {
    failures.push(name);
    console.log(`  FAIL ${name} ${detail}`);
  }
};

console.log('prices:');
const usdPrices = [...pricing.matchAll(/totalPriceUSD:\s*(\d+)/g)].map((m) => Number(m[1]));
for (const usd of usdPrices) {
  const withCommas = usd.toLocaleString('en-US');
  ok(
    `coaching $${withCommas} listed`,
    llms.includes(`$${usd}`) || llms.includes(`$${withCommas}`),
  );
}
const digi = pricing.match(/digitalIdentity:[\s\S]*?priceUSD:\s*(\d+)[\s\S]*?priceEUR:\s*(\d+)/);
if (digi) {
  ok(`digital identity €${digi[2]}/$${digi[1]} listed`, llms.includes(`€${digi[2]}`) && llms.includes(`$${digi[1]}`));
}
const prov = pricing.match(/customAiProvisioning:[\s\S]*?minPriceUSD:\s*(\d+)[\s\S]*?maxPriceUSD:\s*(\d+)/);
if (prov) {
  const fmt = (n) => Number(n).toLocaleString('en-US');
  ok(
    `provisioning $${fmt(prov[1])}-$${fmt(prov[2])} range listed`,
    llms.includes(`$${fmt(prov[1])}`) && llms.includes(`$${fmt(prov[2])}`),
  );
}

console.log('anchors:');
ok('#ai-guidance anchor used', llms.includes('#ai-guidance'));
ok('dead #ai-mentoring anchor gone', !llms.includes('#ai-mentoring'));

console.log('sections:');
const registryIds = [...registry.matchAll(/^\s{2}([a-zA-Z]+):/gm)].map((m) => m[1]);
const expectedNames = [
  ['caseStudies', 'Case Studies'],
  ['testimonials', 'Testimonials'],
  ['stats', 'Key Stats'],
  ['whatIsNot', 'What This Is NOT'],
  ['services', 'Services'],
  ['about', 'About Me'],
  ['mentoring', 'AI Guidance'],
  ['roi', 'ROI Calculator'],
  ['speaking', 'Speaking'],
  ['assessment', 'Assessment'],
  ['substack', 'Newsletter'],
  ['faq', 'FAQ'],
  ['connect', 'Connect'],
];
for (const [key, name] of expectedNames) {
  if (!registryIds.includes(key)) continue;
  ok(`${name} mentioned`, llms.toLowerCase().includes(name.toLowerCase()));
}

console.log('faq:');
const faqCount = (faqs.match(/question:/g) || []).length;
const fm = llms.match(/contains (\d+) FAQ items/);
ok(
  'FAQ count matches',
  Boolean(fm) && Number(fm[1]) === faqCount,
  `(llms says ${fm ? fm[1] : '?'}, source has ${faqCount})`,
);

console.log('freshness:');
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const dm = llms.match(/Last updated:\s*(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})/);
if (!dm) {
  failures.push('header date');
  console.log('  FAIL header date missing');
} else {
  const ageDays = Math.floor((Date.now() - new Date(Number(dm[2]), months.indexOf(dm[1]), 1)) / 86400000);
  ok('updated within 60 days', ageDays <= 60, `(header says ${dm[1]} ${dm[2]}, ~${Math.round(ageDays)}d old)`);
}

console.log('');
if (failures.length > 0) {
  console.log(`GEO DRIFT: ${failures.length} stale fact(s) in public/llms.txt — update it.`);
  process.exit(1);
}
console.log('llms.txt is fresh.');
