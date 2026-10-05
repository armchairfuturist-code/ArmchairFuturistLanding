#!/usr/bin/env node
/**
 * GEO maps drift check — fails when the static crawler-facing files drift
 * from their source of truth:
 *   public/robots.txt       removed; src/app/robots.ts is the single source
 *   public/llms-full.txt    removed; src/app/llms-full.txt/route.ts generates it
 *   public/sitemap-ai.xml   <- src/app/sitemap.ts + service-catalog.ts + assessment/archetypes.ts
 *   booking URL             <- src/lib/constants.ts (StructuredData + llms.txt)
 * Run: node scripts/check-geo-maps.mjs   (exit 0 fresh, exit 1 drift)
 */
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

const robotsTs = read('src/app/robots.ts');
const sitemapTs = read('src/app/sitemap.ts');
const serviceCatalog = read('src/content/service-catalog.ts');
const sitemapAi = read('public/sitemap-ai.xml');
const archetypes = read('src/lib/assessment/archetypes.ts');
const constants = read('src/lib/constants.ts');
const structuredData = read('src/components/seo/StructuredData.tsx');
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

// --- robots.ts is the single source of robots rules ---------------------
// robots.ts rule objects: userAgent first, then allow/disallow (string or array).
function parseRobotsTs(src) {
  const rules = new Map(); // ua -> Set of "allow:/path"
  const chunks = src.split(/userAgent:/).slice(1);
  for (const chunk of chunks) {
    const ua = chunk.match(/^\s*'([^']+)'/)?.[1];
    if (!ua) continue;
    // Collect every allow/disallow under this userAgent (a rule object can have both).
    const rulesFound = [...chunk.matchAll(/\b(allow|disallow):\s*(\[[^\]]*\]|'[^']+')/gi)];
    const set = rules.get(ua) ?? new Set();
    for (const rule of rulesFound) {
      const paths = [...rule[2].matchAll(/'([^']+)'/g)].map((m) => m[1]);
      for (const p of paths) set.add(`${rule[1].toLowerCase()}:${p}`);
    }
    if (rulesFound.length) rules.set(ua, set);
  }
  const sitemaps = [...src.matchAll(/'(https:\/\/[^']*\/sitemap[^']*)'/g)].map((m) => m[1]);
  return { rules, sitemaps };
}

console.log('robots:');
// robots.ts is the single source; public/robots.txt must stay deleted.
const tsR = parseRobotsTs(robotsTs);
const normList = (l) => [...l].sort().join(',');
ok(
  'public/robots.txt absent (robots.ts is the single source)',
  !existsSync(join(root, 'public/robots.txt')),
);
ok('robots.ts declares crawler rules', tsR.rules.size > 0, '(parse yielded 0 user agents)');
const expectedSitemaps = [
  'https://thearmchairfuturist.com/sitemap.xml',
  'https://thearmchairfuturist.com/sitemap-ai.xml',
];
ok(
  'robots.ts declares both sitemaps',
  normList(tsR.sitemaps) === normList(expectedSitemaps),
  `(ts: ${normList(tsR.sitemaps)})`,
);

console.log('single source:');
ok(
  'public/llms-full.txt absent (route src/app/llms-full.txt/route.ts generates it)',
  !existsSync(join(root, 'public/llms-full.txt')),
);

// --- sitemap.ts -> sitemap-ai.xml --------------------------------------
console.log('sitemap-ai:');
const paths = new Set();
// sitemap.ts routes every page through page('<path>', ...); '' is the home page.
for (const m of sitemapTs.matchAll(/\bpage\(\s*'([^']*)'/g)) {
  paths.add(m[1] || '/');
}
for (const m of sitemapTs.matchAll(/`\$\{baseUrl\}([^`]*)`/g)) {
  if (!m[1].includes('${')) paths.add(m[1] || '/');
}
if (/\burl:\s*baseUrl\b/.test(sitemapTs)) paths.add('/');
for (const m of serviceCatalog.matchAll(/href:\s*['"](\/services\/[^'"]+)/g)) {
  paths.add(m[1]);
}
const slugs = [...archetypes.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
for (const m of sitemapTs.matchAll(/`\$\{baseUrl\}([^`]*\$\{slug\}[^`]*)`/g)) {
  for (const s of slugs) paths.add(m[1].replace('${slug}', s));
}
const aiPaths = new Set(
  [...sitemapAi.matchAll(/<loc>https:\/\/thearmchairfuturist\.com([^<]*)/g)].map((m) => m[1] || '/'),
);
const onlyTs = [...paths].filter((p) => !aiPaths.has(p)).sort();
const onlyAi = [...aiPaths].filter((p) => !paths.has(p)).sort();
ok('no URLs missing from sitemap-ai.xml', onlyTs.length === 0, `(missing: ${onlyTs.join(', ')})`);
ok('no stale URLs in sitemap-ai.xml', onlyAi.length === 0, `(stale: ${onlyAi.join(', ')})`);
ok('archetype slugs found', slugs.length > 0, '(archetypes.ts parse yielded 0)');
const servicePaths = [...serviceCatalog.matchAll(/href:\s*['"](\/services\/[^'"]+)/g)].map((m) => m[1]);
ok('service catalog paths found', servicePaths.length > 0, '(service-catalog.ts parse yielded 0)');
for (const path of servicePaths) {
  ok(`llms carries ${path}`, llms.includes(path));
}
const serviceSummaries = [...serviceCatalog.matchAll(
  /slug:\s*['"][^'"]+['"][\s\S]*?href:\s*['"](\/services\/[^'"]+)['"][\s\S]*?hubSummary:\s*['"]([^'"]+)['"]/g,
)];
ok('service catalog summaries found', serviceSummaries.length > 0, '(service-catalog.ts parse yielded 0)');
for (const [, path, summary] of serviceSummaries) {
  ok(`llms carries summary for ${path}`, llms.includes(summary));
}

// --- booking URL --------------------------------------------------------
console.log('booking:');
const cal = constants.match(/CALENDAR_URL\s*=\s*'([^']+)'/)?.[1];
ok('CALENDAR_URL parsed from constants', Boolean(cal));
if (cal) {
  ok('StructuredData references CALENDAR_URL', structuredData.includes('CALENDAR_URL'));
  ok('StructuredData has ReserveAction', structuredData.includes('"ReserveAction"'));
  ok('llms.txt carries the calendar URL', llms.includes(cal));
}

console.log('');
if (failures.length > 0) {
  console.log(`GEO DRIFT: ${failures.length} stale map fact(s) — sync the static file with its source.`);
  process.exit(1);
}
console.log('robots, sitemap-ai, and booking signals are fresh.');
