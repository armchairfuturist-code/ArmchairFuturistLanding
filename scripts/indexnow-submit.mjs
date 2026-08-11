#!/usr/bin/env node
/**
 * IndexNow submission script — The Armchair Futurist
 *
 * Fetches the production sitemap, extracts every <loc> URL, and submits them
 * to the IndexNow API (https://api.indexnow.org/indexnow), which fans the
 * notification out to all IndexNow-participating search engines (Bing, Yandex,
 * Naver, Seznam, …). This is the fastest way to tell crawlers that content has
 * changed or new pages exist.
 *
 * Prerequisite: the key file MUST be live at KEY_LOCATION before running.
 *   -> https://thearmchairfuturist.com/<KEY>.txt
 *
 * Usage:
 *   node scripts/indexnow-submit.mjs            # submit all sitemap URLs
 *   node scripts/indexnow-submit.mjs <url> ...  # submit specific URLs only
 *
 * Responses:
 *   200 OK            — URLs accepted / already known
 *   202 Accepted      — accepted, processing async
 *   422 Unprocessable — key file missing or key mismatch (deploy key file first)
 *
 * The KEY is intentionally hardcoded: IndexNow keys are public by design —
 * their only purpose is to prove domain ownership via the key file.
 */
const KEY = "620b61773e6f05a6ec135789ad87ac74";
const HOST = "thearmchairfuturist.com";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function urlsFromSitemap() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function submit(urlList) {
  const body = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  });
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body,
  });
  console.log(`IndexNow responded: ${res.status} ${res.statusText}`);
  console.log(`URLs submitted: ${urlList.length}`);
  if (!res.ok && res.status !== 202) {
    const text = await res.text().catch(() => "");
    console.error(`Body: ${text || "(empty)"}`);
    if (res.status === 422) {
      console.error(
        "422 = key file not found or key mismatch. Verify " +
          KEY_LOCATION +
          " serves exactly the key string, then retry."
      );
    }
    process.exit(1);
  }
}

const argUrls = process.argv.slice(2);
const urlList =
  argUrls.length > 0 ? argUrls : await urlsFromSitemap();
console.log(`Key file: ${KEY_LOCATION}`);
await submit(urlList);
console.log("Done.");
