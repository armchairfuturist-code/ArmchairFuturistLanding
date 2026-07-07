"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, ExternalLink, Calendar, Newspaper, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/substack');
        if (!response.ok) throw new Error('Failed to fetch feed');
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError('Unable to load latest articles');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'MMM d, yyyy');
    } catch {
      return '';
    }
  };

  const displayedPosts = posts.slice(0, 6);

  return (
    <section id="newsletter" className="py-16 md:py-24 bg-background scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted/30 text-xs font-medium text-muted-foreground mb-4">
            <Newspaper className="h-3.5 w-3.5" />
            Newsletter
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-3">
            The Armchair Futurist
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Weekly essays on AI strategy, organizational change, and the future of work.
            No hype, just signal.
          </p>
        </motion.div>

        {/* Subscribe CTA */}
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
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recent Issues</h3>
          </div>

          {loading && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="flex flex-col shadow-md overflow-hidden">
                  <div className="relative h-36 w-full bg-muted animate-pulse" />
                  <CardContent className="p-4 space-y-2">
                    <div className="h-3 w-24 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-full bg-muted animate-pulse rounded" />
                    <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {error && (
            <p className="text-muted-foreground text-sm">{error}</p>
          )}

          {!loading && !error && (
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
                      className="block group"
                    >
                      <Card className="flex flex-col shadow-sm hover:shadow-lg transition-[box-shadow] duration-300 overflow-hidden border-border/60">
                        <div className="relative h-36 w-full bg-muted overflow-hidden">
                          {post.imageUrl ? (
                            <Image
                              src={post.imageUrl}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300 outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
                            </div>
                          )}
                        </div>
                        <CardContent className="flex-grow p-4 flex flex-col">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(post.pubDate)}</span>
                          </div>
                          <h4 className="font-semibold text-sm leading-tight text-foreground group-hover:text-hp-electric transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                        </CardContent>
                      </Card>
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
