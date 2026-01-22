import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';

export async function GET() {
  try {
    const response = await fetch('https://armchairfuturist.substack.com/feed', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch feed');
    }
    const text = await response.text();

    // Parse XML with fast-xml-parser (works in Node.js)
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
    });
    const xml = parser.parse(text);
    const items = xml.rss?.channel?.item || [];

    const posts: { title: string; description: string; link: string; pubDate: string; imageUrl: string }[] = [];

    const itemArray = Array.isArray(items) ? items : [items];

    for (const item of itemArray) {
      if (posts.length >= 3) break;

      const title = item.title || '';
      const description = item.description || '';
      const link = item.link || '';
      const pubDate = item.pubDate || '';

      // Get image from media:content or media:thumbnail
      let imageUrl = '';

      // Check various possible image locations
      const media = item['media:content'] || item['media:thumbnail'] || {};
      if (media.url) {
        imageUrl = media.url;
      }

      // Check enclosure
      if (!imageUrl && item.enclosure) {
        const enc = item.enclosure;
        if (typeof enc === 'string') {
          // Already a URL string
          imageUrl = enc;
        } else if (enc.url && enc.type?.startsWith('image/')) {
          imageUrl = enc.url;
        }
      }

      // Clean description
      const cleanDescription = description
        ? description.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
        : '';

      posts.push({ title, description: cleanDescription, link, pubDate, imageUrl });
    }

    return NextResponse.json(posts, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
      },
    });
  } catch (error) {
    console.error('Error fetching Substack feed:', error);
    return NextResponse.json({ error: 'Failed to fetch feed' }, { status: 500 });
  }
}
