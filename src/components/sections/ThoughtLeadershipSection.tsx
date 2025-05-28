
"use client"; 
import type { FC } from 'react'; 
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Podcast, MessageCircle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface PodcastItemData {
  name: string;
  link: string;
  description: string;
}

const podcastItemsData: PodcastItemData[] = [
  {
    name: "Mission Driven You",
    link: "https://www.boomplay.com/episode/8956216",
    description: "Alex discussing how AI, blockchain, and mindfulness can empower humanity, exploring the intersection of technology and personal growth"
  },
  {
    name: "Mission Driven You (Psychedelics & Presence)",
    link: "https://www.boomplay.com/episode/9501654",
    description: "Alex Myers joins Will Samson to delve into psychedelics, presence, and the search for meaning, addressing deeper human experiences and consciousness"
  },
  {
    name: "You Don't Need This Podcast",
    link: "https://benmcdougal.com/still-united/",
    description: "with Ben McDougal and Alex Myers covers AI evolution, neurotech, web3, blockchain versus corporate networks, and thriving amidst information overload in a futuristic discussion"
  },
  {
    name: "Roundtable on Web3 Remote Work Challenges",
    link: "https://x.com/i/spaces/1dRKZdVrpAvJB",
    description: "@Givepraise hosts a roundtable with Web3 HR experts on Web3 Remote Work Challenges"
  },
  {
    name: "DAOs, Life Extension, and Transhumanism",
    link: "https://benmcdougal.com/united-we-are/",
    description: "Alex and Ben discuss the reasoning behind DAOs, and touch on life extension, nurturing AI, and the challenges with transhumanism"
  },
  {
    name: "Marketing Quacks Podcast",
    link: "https://open.spotify.com/episode/6SKCP0oDBfJFBGetFME4Mq?si=fQh53kaTTKiNx2u_HpQm7w&nd=1&dlsi=32576c16b8454030",
    description: "discussing the impact of AI-generated content on the quality and integrity of the internet. Alex will discuss the implications of widespread AI content creation, exploring whether it enhances or undermines the information ecosystem online."
  },
  {
    name: "AI's Impact on Humanity: A Futurist Lens",
    link: "https://open.spotify.com/episode/5ZzAJ9TnklmL8DbxlLjU2o?si=ee18521b2f8c4a26",
    description: "Sam and Alex discuss the impact of AI on humanity from a futurist lens"
  }
];

const INITIAL_PODCASTS_TO_SHOW = 1;

export default function ThoughtLeadershipSection() {
  const [isPodcastListExpanded, setIsPodcastListExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

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

  const podcastsToShow = isPodcastListExpanded 
    ? podcastItemsData 
    : podcastItemsData.slice(0, INITIAL_PODCASTS_TO_SHOW);

  const togglePodcastListExpansion = () => {
    setIsPodcastListExpanded(!isPodcastListExpanded);
  };

  return (
    <section id="thought-leadership" className="py-12 md:py-24 bg-background scroll-mt-20">
      <div
        ref={contentRef}
        className={`container mx-auto px-4 md:px-6 scroll-animate ${
          isContentVisible ? 'is-visible' : ''
        }`}
      >
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Podcast className="h-8 w-8 text-primary" />
            <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Podcasts & Interviews
            </h2>
          </div>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Listen to insights on AI, future of work, and strategy.
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

              {podcastItemsData.length > INITIAL_PODCASTS_TO_SHOW && (
                <Button 
                  variant="link" 
                  size="sm" 
                  className="mt-6 w-full text-primary hover:text-accent"
                  onClick={togglePodcastListExpansion}
                  aria-expanded={isPodcastListExpanded}
                >
                  {isPodcastListExpanded ? "Show Less Podcasts" : `Show ${podcastItemsData.length - INITIAL_PODCASTS_TO_SHOW} More Podcast${podcastItemsData.length - INITIAL_PODCASTS_TO_SHOW !== 1 ? 's' : ''}`}
                  {isPodcastListExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
