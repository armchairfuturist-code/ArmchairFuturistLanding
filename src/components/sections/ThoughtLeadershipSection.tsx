"use client"; 

import type { FC } from 'react'; 
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Podcast, MessageCircle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface PodcastItemData {
  name: string;
  link: string;
  description: string;
}

interface ThoughtLeadershipCategory {
  title: string;
  description: string;
  items: PodcastItemData[];
  cta: { text: string; link: string } | null;
  icon: JSX.Element;
}

const thoughtLeadershipData: ThoughtLeadershipCategory[] = [
  {
    title: "Podcasts & Interviews",
    description: "Listen to insights on AI, future of work, and strategy.",
    icon: <Podcast className="h-8 w-8 text-primary" />,
    items: [
      {
        name: "Mission Driven You",
        link: "#", // Replace with actual link
        description: "Alex discussing how AI, blockchain, and mindfulness can empower humanity, exploring the intersection of technology and personal growth. This is a longer description to test the read more functionality and see how it behaves with multiple lines of text that should be truncated initially."
      },
      {
        name: "Marketing Quacks",
        link: "#", // Replace with actual link
        description: "Insights on modern marketing strategies and industry trends. This podcast delves into the nitty-gritty of digital marketing, SEO, content creation, and social media engagement, offering actionable tips for businesses of all sizes looking to make an impact."
      },
      {
        name: "You Don’t Need This Podcast",
        link: "#", // Replace with actual link
        description: "Exploring unconventional ideas and thought-provoking discussions. A podcast that challenges norms, questions assumptions, and invites listeners to think differently about work, life, and everything in between. Short description here."
      },
    ],
    cta: null, 
  },
];

const INITIAL_PODCASTS_TO_SHOW = 1;

export default function ThoughtLeadershipSection() {
  const [isPodcastListExpanded, setIsPodcastListExpanded] = useState(false);

  const podcastSection = thoughtLeadershipData.find(cat => cat.title === "Podcasts & Interviews");

  if (!podcastSection) {
    return null;
  }

  const podcastsToShow = isPodcastListExpanded 
    ? podcastSection.items 
    : podcastSection.items.slice(0, INITIAL_PODCASTS_TO_SHOW);

  const togglePodcastListExpansion = () => {
    setIsPodcastListExpanded(!isPodcastListExpanded);
  };

  return (
    <section id="thought-leadership" className="py-12 md:py-24 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            {podcastSection.icon}
            <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              {podcastSection.title}
            </h2>
          </div>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            {podcastSection.description}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex-grow p-6">
              {podcastsToShow.length > 0 && (
                <ul className="space-y-6">
                  {podcastsToShow.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <div className="flex items-center mb-1">
                        <MessageCircle className="h-4 w-4 mr-2 text-accent shrink-0" />
                        <Link href={item.link} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:text-accent hover:underline">
                          {item.name}
                          <ExternalLink className="inline-block h-3 w-3 ml-1 opacity-70" />
                        </Link>
                      </div>
                      <div className="ml-6">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {podcastSection.items.length > INITIAL_PODCASTS_TO_SHOW && (
                <Button 
                  variant="link" 
                  size="sm" 
                  className="mt-6 w-full text-primary hover:text-accent"
                  onClick={togglePodcastListExpansion}
                  aria-expanded={isPodcastListExpanded}
                >
                  {isPodcastListExpanded ? "Show Less Podcasts" : "Show More Podcasts"}
                  {isPodcastListExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                </Button>
              )}

              {podcastSection.cta && !isPodcastListExpanded && podcastSection.items.length <= INITIAL_PODCASTS_TO_SHOW && (
                <Button asChild variant="outline" className="mt-6 w-full border-accent text-accent hover:bg-accent/10 hover:text-accent">
                  <Link href={podcastSection.cta.link} target="_blank" rel="noopener noreferrer">
                    {podcastSection.cta.text} <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
