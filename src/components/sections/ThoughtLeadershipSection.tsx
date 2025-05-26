
"use client"; // Add this if not already present for state and effects

import type { FC } from 'react'; // if you use FC
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
    cta: null, // Example: { text: "View All Articles", link: "/blog" }
  },
  // ... other categories if you had them
];

const PREVIEW_LINE_HEIGHT_PODCAST = 'max-h-16'; // Approx 2-3 lines
const EXPANDED_MAX_HEIGHT_PODCAST = 'max-h-96'; // Sufficiently large for full text
const DESCRIPTION_TRUNCATE_LENGTH = 100; // Character count to show "Read More"

export default function ThoughtLeadershipSection() {
  const [expandedPodcastIndex, setExpandedPodcastIndex] = useState<number | null>(null);

  const podcastSection = thoughtLeadershipData.find(cat => cat.title === "Podcasts & Interviews");

  const togglePodcastExpand = (index: number) => {
    setExpandedPodcastIndex(expandedPodcastIndex === index ? null : index);
  };

  if (!podcastSection) {
    return null;
  }

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

        <div className="max-w-2xl mx-auto"> {/* Centering the single card for podcasts */}
          <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex-grow p-6">
              {podcastSection.items.length > 0 && (
                <ul className="space-y-6">
                  {podcastSection.items.map((item, itemIndex) => {
                    const isExpanded = expandedPodcastIndex === itemIndex;
                    const needsReadMore = item.description.length > DESCRIPTION_TRUNCATE_LENGTH;

                    return (
                      <li key={itemIndex}>
                        <div className="flex items-center mb-1">
                          <MessageCircle className="h-4 w-4 mr-2 text-accent shrink-0" />
                          <Link href={item.link} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:text-accent hover:underline">
                            {item.name}
                            <ExternalLink className="inline-block h-3 w-3 ml-1 opacity-70" />
                          </Link>
                        </div>
                        <div className="ml-6">
                          <div 
                            className={`relative overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? EXPANDED_MAX_HEIGHT_PODCAST : PREVIEW_LINE_HEIGHT_PODCAST}`}
                          >
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {item.description}
                            </p>
                            {!isExpanded && needsReadMore && (
                              <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                            )}
                          </div>
                          {needsReadMore && (
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="mt-1 px-0 text-xs text-primary hover:text-accent"
                              onClick={() => togglePodcastExpand(itemIndex)}
                              aria-expanded={isExpanded}
                            >
                              {isExpanded ? "Show Less" : "Read More"}
                              {isExpanded ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />}
                            </Button>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
              {podcastSection.cta && (
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
