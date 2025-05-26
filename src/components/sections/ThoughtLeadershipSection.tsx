
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Podcast, MessageCircle, ExternalLink } from 'lucide-react';

const thoughtLeadershipItems = [
  {
    // Icon removed from here as it's moved to the section title
    title: "Podcasts & Interviews",
    description: "Listen to insights on AI, future of work, and strategy.",
    items: [
      { name: "Mission Driven You", link: "#" }, // Replace with actual links
      { name: "Marketing Quacks", link: "#" },
      { name: "You Don’t Need This Podcast", link: "#" },
    ],
    cta: null,
  },
];

export default function ThoughtLeadershipSection() {
  const podcastSection = thoughtLeadershipItems[0]; // Assuming podcasts are always the first/only item

  return (
    <section id="thought-leadership" className="py-12 md:py-24 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Podcast className="h-8 w-8 text-primary" />
            <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Podcasts & Interviews
            </h2>
          </div>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Sharing knowledge and experience through various platforms and engagements.
          </p>
        </div>

        {podcastSection && (
          <div className="max-w-lg mx-auto"> {/* Centering the single card */}
            <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  {/* Icon removed from here */}
                  <CardTitle className="text-xl font-semibold">{podcastSection.title}</CardTitle>
                </div>
                <CardDescription>{podcastSection.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                {podcastSection.items.length > 0 && (
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {podcastSection.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-2 text-accent shrink-0" />
                        <Link href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:underline">
                          {item.name}
                          <ExternalLink className="inline-block h-3 w-3 ml-1 opacity-70" />
                        </Link>
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
        )}
      </div>
    </section>
  );
}
