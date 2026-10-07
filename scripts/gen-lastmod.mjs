#!/usr/bin/env node
/**
 * Writes src/content/lastmod.generated.json: URL path -> ISO date of the last
 * git commit touching that page's source files. Run via `npm run lastmod`
 * (also wired to prebuild). Commit the JSON so shallow-clone CI builds
 * (no git history) still get real dates. If git has no history for a path,
 * the previous value in the JSON is kept; sitemap.ts falls back to its
 * legacy date only when the key is absent.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const OUT = 'src/content/lastmod.generated.json';
const prev = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};

// A shallow clone has no real history: `git log -- <path>` reports the shallow
// root for every file, which would stamp every URL with the clone date. Keep
// the committed dates instead — that is why the JSON is committed.
try {
  const shallow = execFileSync('git', ['rev-parse', '--is-shallow-repository'], { encoding: 'utf8' }).trim();
  if (shallow === 'true') {
    console.log(`lastmod: shallow clone, keeping ${Object.keys(prev).length} committed entries`);
    process.exit(0);
  }
} catch {
  /* no git at all: fall through, the loop keeps previous values */
}

// URL path -> source files whose change should bump lastmod. Nonexistent paths are skipped.
const page = (seg) => [`src/app/${seg}/page.tsx`, `src/app/${seg}/page.mdx`];
const MAP = {
  // The homepage sections read their copy from content/ too, so an edit to
  // case studies, testimonials, FAQs or the mentoring pillars changes "/"
  // without touching page.tsx. Left unmapped, those edits never moved the
  // sitemap date and search engines kept seeing a stale page.
  //
  // The section components themselves were unmapped for the same reason: all
  // twelve under components/sections are homepage sections, so editing one
  // changed live copy without moving the date.
  '/': [
    'src/app/page.tsx',
    'src/lib/homepage-sections.tsx',
    'src/lib/pricing.ts',
    'src/components/sections',
    'src/content/case-studies.ts',
    'src/content/testimonials.ts',
    'src/content/faqs.ts',
    'src/content/mentoring-pillars.ts',
  ],
  '/about': page('about'),
  '/assessment': page('assessment'),
  '/assessment/result': ['src/lib/assessment/archetypes.ts', 'src/app/assessment/result/[slug]/page.tsx'],
  '/audit': page('audit'),
  '/privacy-policy': page('privacy-policy'),
  '/terms-of-service': page('terms-of-service'),
  '/concepts': page('concepts'),
  '/concepts/accountability-gap': page('concepts/accountability-gap'),
  '/concepts/the-install-trap': page('concepts/the-install-trap'),
  '/concepts/psychology-led-adoption': page('concepts/psychology-led-adoption'),
  '/concepts/results-thinkers': page('concepts/results-thinkers'),
  '/concepts/human-architect': page('concepts/human-architect'),
  '/concepts/pilot-itis': page('concepts/pilot-itis'),
  '/case-studies': page('case-studies'),
  '/services': [...page('services'), 'src/content/service-catalog.ts', 'src/lib/pricing.ts'],
  // These two pages reuse homepage section components, so the component
  // files belong in their source set as well.
  '/speaking': [
    ...page('speaking'),
    'src/components/sections/SpeakingSection.tsx',
    'src/components/sections/CommunityAnchor.tsx',
  ],
  '/how-i-work': page('how-i-work'),
  '/blog': [...page('blog'), 'src/components/sections/SubstackSection.tsx'],
};

const out = { ...prev };
for (const [url, files] of Object.entries(MAP)) {
  const existing = files.filter((f) => existsSync(f));
  if (!existing.length) continue;
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...existing], { encoding: 'utf8' }).trim();
    if (iso) out[url] = iso.slice(0, 10);
  } catch {
    /* no git available: keep previous value */
  }
}
// Service spokes share the services catalog date.
if (out['/services']) {
  // spokes are keyed by href in sitemap.ts; add them here if per-spoke dates are wanted.
}
writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
console.log(`lastmod: ${Object.keys(out).length} entries -> ${OUT}`);
