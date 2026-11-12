import { XMLParser } from 'fast-xml-parser';

export interface SubstackPost {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  imageUrl: string;
}

export const SUBSTACK_FEED_URL = 'https://armchairfuturist.substack.com/feed';

/** Pure: RSS text in, posts out. Kept separate so the route and the server
 *  components share one parser and stay testable without a network call. */
export function parseSubstackFeed(text: string, limit = 3): SubstackPost[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    processEntities: false,
    htmlEntities: false,
  });
  const xml = parser.parse(text);
  const items = xml.rss?.channel?.item || [];
  const itemArray = Array.isArray(items) ? items : [items];
  const posts: SubstackPost[] = [];

  for (const item of itemArray) {
    if (posts.length >= limit) break;

    let imageUrl = '';
    const media = item['media:content'] || item['media:thumbnail'] || {};
    if (media.url) imageUrl = media.url;

    if (!imageUrl && item.enclosure) {
      const enc = item.enclosure;
      if (typeof enc === 'string') imageUrl = enc;
      else if (enc.url && enc.type?.startsWith('image/')) imageUrl = enc.url;
    }

    const description = item.description || '';
    posts.push({
      title: item.title || '',
      description: description
        ? description.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
        : '',
      link: item.link || '',
      pubDate: item.pubDate || '',
      imageUrl,
    });
  }

  return posts;
}

/** Server-side only. Returns [] on any failure so a page can still render. */
export async function fetchSubstackPosts(limit = 3): Promise<SubstackPost[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    let text: string;
    try {
      const response = await fetch(SUBSTACK_FEED_URL, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        signal: controller.signal,
        next: { revalidate: 3600, tags: ['substack'] },
      });
      if (!response.ok) throw new Error('Failed to fetch feed');
      // The abort stays armed through the body read. Clearing it at the
      // headers used to let a stalled server hold the request open.
      text = await response.text();
    } finally {
      clearTimeout(timeout);
    }
    return parseSubstackFeed(text, limit);
  } catch (error) {
    console.error('Error fetching Substack feed:', error);
    return [];
  }
}
