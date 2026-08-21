"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'motion/react';
import { SUBSTACK_URL } from '@/lib/constants';

interface SubstackPost {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  imageUrl: string;
}

export default function SubstackSection() {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/substack');
        if (!response.ok) throw new Error('Failed to fetch feed');
        const data = await response.json();
        if (!cancelled) setPosts(data);
      } catch (err) {
        if (!cancelled) setError('Unable to load latest articles');
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchPosts();
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'MMM d, yyyy');
    } catch {
      return '';
    }
  };

  const displayedPosts = posts.slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-canvas scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Section header — mono kicker on the HP pattern, not a pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.35em] text-hp-electric mb-4">
            Newsletter
          </p>
          <h2 className="font-heading text-3xl font-medium tracking-tight text-ink sm:text-4xl mb-3">
            Signal, not hype
          </h2>
          <p className="text-charcoal max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Weekly essays on AI strategy, organizational change, and the future of work,
            from the Armchair Futurist newsletter.
          </p>
        </motion.div>

        {/* Subscribe CTA — the one signal color action */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex justify-center mb-14"
        >
          <Button asChild size="lg" className="gap-2">
            <a href={`${SUBSTACK_URL}/subscribe`} target="_blank" rel="noopener noreferrer">
              Subscribe for Free
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>

        {/* Recent articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-medium font-heading text-ink mb-6">Recent Issues</h3>

          {loading && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite" aria-busy="true">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-hp-xl border border-hairline overflow-hidden">
                  <div className="relative h-36 w-full bg-cloud animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 w-24 bg-cloud animate-pulse rounded" />
                    <div className="h-4 w-full bg-cloud animate-pulse rounded" />
                    <div className="h-4 w-3/4 bg-cloud animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="flex flex-col items-start gap-3 border border-hairline rounded-hp-xl p-6">
              <p className="text-charcoal text-sm">{error}. The essays are all on Substack.</p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" onClick={retry} className="gap-2">
                  <RotateCcw className="h-3 w-3" />
                  Retry
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
                    Read on Substack
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          )}

          {!loading && !error && displayedPosts.length === 0 && (
            <div className="border border-hairline rounded-hp-xl p-8 text-center">
              <p className="text-charcoal text-sm mb-4">No issues to show here yet. The archive lives on Substack.</p>
              <Button asChild variant="outline" size="sm">
                <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
                  Browse the archive
                  <ExternalLink className="ml-2 h-3 w-3" />
                </a>
              </Button>
            </div>
          )}

          {!loading && !error && displayedPosts.length > 0 && (
            <>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {displayedPosts.map((post, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                  >
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group rounded-hp-xl border border-hairline hover:border-hp-electric/50 transition-colors duration-300 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hp-electric"
                    >
                      <div className="relative h-36 w-full bg-cloud overflow-hidden">
                        {post.imageUrl ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={post.imageUrl}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover outline outline-1 -outline-offset-1 outline-black/10"
                          />
                        ) : null}
                      </div>
                      <div className="p-4">
                        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-graphite mb-2">
                          {formatDate(post.pubDate)}
                        </p>
                        <h4 className="font-medium text-sm leading-snug text-ink group-hover:text-hp-electric transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-8 flex justify-center"
              >
                <Button asChild variant="outline" size="sm">
                  <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
                    View All Posts
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
