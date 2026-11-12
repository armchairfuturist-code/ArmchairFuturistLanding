#!/usr/bin/env node
/**
 * On-page SEO audit for every route in the production sitemap.
 *
 *   node scripts/seo-audit.mjs                  # audits production
 *   node scripts/seo-audit.mjs http://localhost:9002   # audits a dev server
 *
 * Checks per route: status, title length, description length, H1 count,
 * H2 count, body word count, and contextual inbound link count (links from
 * body copy, not from the nav or footer). Exits 1 when any hard rule fails,
 * so CI or a pre-deploy hook can gate on it.
 *
 * Hard rules: reachable (2xx), exactly one H1, title 30-60 chars,
 * description 80-165 chars, body >= 150 words for content routes.
 */
const BASE = (process.argv[2] || 'https://thearmchairfuturist.com').replace(/\/+$/, '');

const TITLE = [30, 60];
const DESC = [80, 165];
const MIN_WORDS = 150;

const stripTags = (html) => html.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/g, ' ');
const words = (text) => (text.trim().match(/[A-Za-z0-9']+/g) || []).length;
const count = (html, re) => (html.match(re) || []).length;

/** Links inside <nav>, <header>, or <footer> are chrome, not contextual. */
function bodyWithoutChrome(html) {
  return html
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ');
}

function inspect(path, html) {
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1].trim();
  const desc = (
    html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i) || [, '']
  )[1].trim();
  const body = bodyWithoutChrome(html);
  const main = (html.match(/<main[\s\S]*?<\/main>/i) || [html])[0];

  return {
    path,
    title,
    titleLen: title.length,
    descLen: desc.length,
    h1: count(main, /<h1[\s>]/gi),
    h2: count(main, /<h2[\s>]/gi),
    bodyWords: words(stripTags(body.replace(/<script[\s\S]*?<\/script>/gi, ' '))),
    links: [...body.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]),
  };
}

const hard = (row) => {
  const fails = [];
  if (row.status < 200 || row.status >= 300) fails.push(`status ${row.status}`);
  if (row.h1 !== 1) fails.push(`h1=${row.h1}`);
  if (row.titleLen < TITLE[0] || row.titleLen > TITLE[1]) fails.push(`title ${row.titleLen}`);
  if (row.descLen < DESC[0] || row.descLen > DESC[1]) fails.push(`desc ${row.descLen}`);
  if (row.bodyWords < MIN_WORDS) fails.push(`words ${row.bodyWords}`);
  return fails;
};

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  new URL(m[1]).pathname === '/' ? '/' : new URL(m[1]).pathname.replace(/\/$/, ''),
);

const rows = [];
for (const path of paths) {
  const res = await fetch(`${BASE}${path}`, { headers: { 'user-agent': 'seo-audit' } });
  const html = await res.text();
  rows.push({ ...inspect(path, html), status: res.status });
}

const inbound = new Map(paths.map((p) => [p, 0]));
for (const row of rows) {
  const seen = new Set(row.links.map((l) => (l === '' ? '/' : l.replace(/\/$/, ''))));
  for (const target of seen) if (inbound.has(target) && target !== row.path) inbound.set(target, inbound.get(target) + 1);
}

const pad = (v, n) => String(v).padEnd(n);
console.log(`${pad('path', 34)}${pad('st', 4)}${pad('title', 7)}${pad('desc', 6)}${pad('h1', 4)}${pad('h2', 4)}${pad('words', 7)}${pad('in', 4)}fails`);
let failing = 0;
for (const row of rows) {
  const fails = hard(row);
  if (fails.length) failing += 1;
  console.log(
    `${pad(row.path, 34)}${pad(row.status, 4)}${pad(row.titleLen, 7)}${pad(row.descLen, 6)}` +
      `${pad(row.h1, 4)}${pad(row.h2, 4)}${pad(row.bodyWords, 7)}${pad(inbound.get(row.path), 4)}${fails.join(', ')}`,
  );
}

const orphans = [...inbound.entries()].filter(([p, n]) => n === 0 && p !== '/').map(([p]) => p);
console.log(`\n${rows.length} routes, ${failing} with on-page failures`);
if (orphans.length) console.log(`no contextual inbound links: ${orphans.join(', ')}`);
process.exit(failing ? 1 : 0);
