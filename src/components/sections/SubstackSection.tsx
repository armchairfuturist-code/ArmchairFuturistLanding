"use client";

import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, Calendar, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';

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
  const contentRef = useRef<HTMLDivElement>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsContentVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
      observer.disconnect();
    };
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'MMM d, yyyy');
    } catch {
      return '';
    }
  };

  return (
    <section id="latest-insights" className="py-12 md:py-24 bg-background scroll-mt-20">
      <div
        ref={contentRef}
        className={`container mx-auto px-4 md:px-6 scroll-animate ${
          isContentVisible ? 'is-visible' : ''
        }`}
      >
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Latest Insights
            </h2>
          </div>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto font-sans">
            Thoughts on technology, meaning, and the future.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {loading && (
            <Card className="flex flex-col shadow-lg">
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">Loading articles...</p>
              </CardContent>
            </Card>
          )}

          {error && (
            <Card className="flex flex-col shadow-lg">
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">{error}</p>
              </CardContent>
            </Card>
          )}

          {!loading && !error && (
            <>
              <div className="grid gap-6 md:grid-cols-3">
                {posts.map((post, index) => (
                  <Card key={index} className="flex flex-col shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <div className="relative h-48 w-full bg-muted overflow-hidden">
                      {post.imageUrl ? (
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    <CardContent className="flex-grow p-5 flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.pubDate)}</span>
                      </div>
                      <h3 className="font-semibold text-base leading-tight text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-2">
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {post.title}
                        </a>
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed font-sans line-clamp-3 flex-grow">
                        {post.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-10 text-center">
                <Button asChild size="lg" className="shadow-lg">
                  <a
                    href="https://armchairfuturist.substack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View All Posts
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
