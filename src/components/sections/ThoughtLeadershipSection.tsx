
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Podcast, MessageCircle, ExternalLink } from 'lucide-react';

interface PodcastItem {
  name: string;
  link: string;
  description: string; // Added description field
}

interface ThoughtLeadershipCategory {
  title: string;
  description: string;
  items: PodcastItem[];
  cta: { text: string; link: string } | null;
  icon: JSX.Element;
}

const thoughtLeadershipItems: ThoughtLeadershipCategory[] = [
  {
    title: "Podcasts & Interviews",
    description: "Listen to insights on AI, future of work, and strategy.",
    icon: <Podcast className="h-8 w-8 text-primary" />,
    items: [
      { 
        name: "Mission Driven You", 
        link: "#", // Replace with actual link
        description: "Alex discussing how AI, blockchain, and mindfulness can empower humanity, exploring the intersection of technology and personal growth." 
      },
      { 
        name: "Marketing Quacks", 
        link: "#", // Replace with actual link
        description: "Insights on modern marketing strategies and industry trends." // Placeholder
      },
      { 
        name: "You Don’t Need This Podcast", 
        link: "#", // Replace with actual link
        description: "Exploring unconventional ideas and thought-provoking discussions." // Placeholder
      },
    ],
    cta: null,
  },
];

export default function ThoughtLeadershipSection() {
  const podcastSection = thoughtLeadershipItems.find(cat => cat.title === "Podcasts & Interviews");

  return (
    <section id="thought-leadership" className="py-12 md:py-24 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        {podcastSection && (
          <>
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

            <div className="max-w-lg mx-auto"> {/* Centering the single card */}
              <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="flex-grow p-6">
                  {podcastSection.items.length > 0 && (
                    <ul className="space-y-4"> {/* Increased space-y for better separation */}
                      {podcastSection.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <div className="flex items-center mb-1">
                            <MessageCircle className="h-4 w-4 mr-2 text-accent shrink-0" />
                            <Link href={item.link} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:text-accent hover:underline">
                              {item.name}
                              <ExternalLink className="inline-block h-3 w-3 ml-1 opacity-70" />
                            </Link>
                          </div>
                          <p className="text-sm text-muted-foreground ml-6">{item.description}</p> {/* Added description rendering */}
                        </li>
                      ))}
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
          </>
        )}
      </div>
    </section>
  );
}
