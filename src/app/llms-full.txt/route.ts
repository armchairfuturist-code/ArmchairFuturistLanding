import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { FAQ_ITEMS } from '@/content/faqs';

/**
 * /llms-full.txt, generated at build time from the same sources as the site:
 * public/llms.txt (curated summary, checked by `npm run geo:check`) plus the
 * complete FAQ from src/content/faqs.ts. Replaces the hand-maintained
 * public/llms-full.txt (v2.1, Aug 2026, which had drifted behind llms.txt v5.0).
 */
export const dynamic = 'force-static';

const SITE = 'https://thearmchairfuturist.com';

export function GET() {
  const llms = readFileSync(join(process.cwd(), 'public', 'llms.txt'), 'utf8').trimEnd();
  const faq = FAQ_ITEMS.map((item) => {
    const link = item.hasLink && item.linkHref ? `\nMore: ${SITE}${item.linkHref}` : '';
    return `### ${item.question}\n${item.answer}${link}`;
  }).join('\n\n');

  const body = [
    '# The Armchair Futurist - Complete Site Content (llms-full.txt)',
    `> Generated ${new Date().toISOString().slice(0, 10)} from public/llms.txt and the site FAQ. Summary version: ${SITE}/llms.txt`,
    '',
    llms,
    '',
    '---',
    '',
    '## Full FAQ',
    '',
    faq,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
