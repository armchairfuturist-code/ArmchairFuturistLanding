"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, Calendar, Image as ImageIcon, Podcast, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { BlurFade } from '@/components/ui/blur-fade';
import { motion } from 'framer-motion';

interface SubstackPost {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  imageUrl: string;
}

interface PodcastItemData {
  name: string;
  link: string;
  description: string;
}

const podcastItems: PodcastItemData[] = [
  {
    name: "Mission Driven You",
    link: "https://www.boomplay.com/episode/8956216",
    description: "How AI, blockchain, and mindfulness can empower humanity"
  },
  {
    name: "Mission Driven You (Psychedelics & Presence)",
    link: "https://www.boomplay.com/episode/9501654",
    description: "Psychedelics, presence, and the search for meaning"
  },
  {
    name: "You Don't Need This Podcast",
    link: "https://benmcdougal.com/still-united/",
    description: "AI evolution, neurotech, web3, and thriving amidst information overload"
  },
  {
    name: "Roundtable on Web3 Remote Work Challenges",
    link: "https://x.com/i/spaces/1dRKZdVrpAvJB",
    description: "Web3 HR experts discuss remote work challenges"
  },
  {
    name: "DAOs, Life Extension, and Transhumanism",
    link: "https://benmcdougal.com/united-we-are/",
    description: "The reasoning behind DAOs, life extension, and transhumanism"
  },
  {
    name: "Marketing Quacks Podcast",
    link: "https://open.spotify.com/episode/6SKCP0oDBfJFBGetFME4Mq?si=fQh53kaTTKiNx2u_HpQm7w",
    description: "AI-generated content and the integrity of the internet"
  },
  {
    name: "AI's Impact on Humanity: A Futurist Lens",
    link: "https://open.spotify.com/episode/5ZzAJ9TnklmL8DbxlLjU2o?si=ee18521b2f8c4a26",
    description: "The impact of AI on humanity from a futurist lens"
  }
];

const INITIAL_PODCASTS = 3;

export default function InsightsSection() {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllPodcasts, setShowAllPodcasts] = useState(false);

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

  const visiblePodcasts = showAllPodcasts ? podcastItems : podcastItems.slice(0, INITIAL_PODCASTS);

  return (
    <section id="latest-insights" className="py-12 md:py-20 bg-background scroll-mt-20">
      <motion.div
        className="container mx-auto px-4 md:px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <BlurFade inView>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              What Does the Armchair Futurist Write and Talk About?
            </h2>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto font-sans">
              Alex Myers publishes weekly articles and appears on podcasts about AI strategy, the future of work, and human-first technology adoption.
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Written — takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">Latest Articles</h3>
            </div>

            {loading && (
              <p className="text-muted-foreground">Loading articles...</p>
            )}
            {error && (
              <p className="text-muted-foreground">{error}</p>
            )}
            {!loading && !error && (
              <>
                <div className="grid gap-5 sm:grid-cols-3">
                  {posts.map((post, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.08 }}
                    >
                      <Card className="flex flex-col shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                        <div className="relative h-36 w-full bg-muted overflow-hidden">
                          {post.imageUrl ? (
                            <Image
                              src={post.imageUrl}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, 33vw"
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
                          <h4 className="font-semibold text-sm leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            <a href={post.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              {post.title}
                            </a>
                          </h4>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button asChild variant="outline" size="sm">
                    <a href="https://armchairfuturist.substack.com" target="_blank" rel="noopener noreferrer">
                      View All Posts
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Audio — takes 1 column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Podcast className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">Podcasts &amp; Interviews</h3>
            </div>

            <ul className="space-y-4">
              {visiblePodcasts.map((item, i) => (
                <li key={i} className="border-b border-border/50 pb-4 last:border-0 last:pb-0">
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-sm text-primary hover:text-accent hover:underline flex items-center gap-1"
                  >
                    <MessageCircle className="h-3.5 w-3.5 shrink-0" />
                    {item.name}
                    <ExternalLink className="h-3 w-3 opacity-50" />
                  </Link>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1 font-sans">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>

            {podcastItems.length > INITIAL_PODCASTS && (
              <Button
                variant="link"
                size="sm"
                className="mt-4 px-0 text-primary hover:text-accent"
                onClick={() => setShowAllPodcasts(!showAllPodcasts)}
                aria-expanded={showAllPodcasts}
              >
                {showAllPodcasts ? 'Show Less' : `Show ${podcastItems.length - INITIAL_PODCASTS} More`}
                {showAllPodcasts ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
