import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import { SUBSTACK_URL } from '@/lib/constants';

const siteUrl = 'https://thearmchairfuturist.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Blog - AI Strategy, Adoption & The Future of Work | The Armchair Futurist',
  description: 'Weekly insights from Alex Myers on AI adoption, organizational change, and navigating the future of work. Practical guidance for leaders who want results, not hype.',
  openGraph: {
    title: 'Blog - AI Strategy & The Future of Work | The Armchair Futurist',
    description: 'Weekly insights on AI adoption, organizational change, and the future of work.',
    url: `${siteUrl}/blog`,
    siteName: 'The Armchair Futurist',
    type: 'website',
  },
};

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

async function getSubstackPosts(): Promise<SubstackPost[]> {
  try {
    const res = await fetch('https://armchairfuturist.substack.com/feed', {
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) return [];
    
    const xml = await res.text();
    const posts: SubstackPost[] = [];
    
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    
    while ((match = itemRegex.exec(xml)) !== null) {
      const item = match[1];
      const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
      const linkMatch = item.match(/<link>(.*?)<\/link>/);
      const dateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);
      const descMatch = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/);
      
      if (titleMatch && linkMatch) {
        posts.push({
          title: titleMatch[1],
          link: linkMatch[1],
          pubDate: dateMatch ? dateMatch[1] : '',
          description: descMatch 
            ? descMatch[1].replace(/<[^>]*>/g, '').slice(0, 200) + '...'
            : '',
        });
      }
    }
    
    return posts.slice(0, 12);
  } catch {
    return [];
  }
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch {
    return dateStr;
  }
}

export default async function BlogPage() {
  const posts = await getSubstackPosts();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <BlurFade inView>
            <p className="text-xs text-muted-foreground/60 font-mono mb-3">The Armchair Futurist Blog</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary mb-6">
              AI Strategy & The Future of Work
            </h1>
            <p className="text-lg text-foreground/80 font-sans leading-relaxed max-w-2xl mx-auto mb-8">
              Weekly insights on AI adoption, organizational change, and navigating the future of work. 
              No hype. No tool reviews. Just practical guidance for leaders who want results.
            </p>
            <Button asChild size="lg" variant="outline">
              <a href={`${SUBSTACK_URL}/subscribe`} target="_blank" rel="noopener noreferrer">
                <Mail className="mr-2 h-4 w-4" />
                Subscribe on Substack
              </a>
            </Button>
          </BlurFade>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/70 mb-4">Unable to load posts right now.</p>
              <Button asChild>
                <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
                  Read on Substack <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post, i) => (
                <BlurFade inView key={post.link} delay={Math.min(i * 0.05, 0.3)}>
                  <article className="group p-6 rounded-xl border border-border/60 bg-card hover:border-primary/30 transition-colors">
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h2 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                            {post.title}
                          </h2>
                          {post.pubDate && (
                            <p className="text-xs text-muted-foreground font-mono mb-2">
                              {formatDate(post.pubDate)}
                            </p>
                          )}
                          {post.description && (
                            <p className="text-sm text-foreground/70 font-sans line-clamp-3">
                              {post.description}
                            </p>
                          )}
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary shrink-0 mt-1 transition-colors" />
                      </div>
                    </a>
                  </article>
                </BlurFade>
              ))}
            </div>
          )}

          {posts.length > 0 && (
            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline">
                <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
                  Read All Posts on Substack <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
