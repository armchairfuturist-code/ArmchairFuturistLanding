import { NextResponse } from 'next/server';
import { fetchSubstackPosts } from '@/lib/substack-feed';

export async function GET() {
  const posts = await fetchSubstackPosts(3);
  if (posts.length === 0) {
    return NextResponse.json({ error: 'Failed to fetch feed' }, { status: 500 });
  }
  return NextResponse.json(posts, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
    },
  });
}
