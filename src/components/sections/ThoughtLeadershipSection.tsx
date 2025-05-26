
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Podcast, Users, MessageCircle, Linkedin, ExternalLink } from 'lucide-react'; // Changed Presentation to Users for testimonials

const thoughtLeadershipItems = [
  {
    icon: <Podcast className="h-6 w-6 text-primary" />,
    title: "Podcasts & Interviews",
    description: "Listen to insights on AI, future of work, and strategy.",
    items: [
      { name: "Mission Driven You", link: "#" }, // Replace with actual links
      { name: "Marketing Quacks", link: "#" },
      { name: "You Don’t Need This Podcast", link: "#" },
    ],
    cta: null,
    testimonials: [], // Added to maintain consistent data structure
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />, // Changed icon
    title: "What Clients Are Saying",
    description: "Hear directly from leaders I've partnered with.",
    items: [], // Will be ignored for this section type
    cta: null, // CTA removed
    testimonials: [ // Placeholder testimonials
      "Alex's insights were instrumental in navigating our AI strategy. Highly recommend! - CEO, Tech Solutions",
      "The mindset shift Alex facilitated in our team was transformative. We're seeing real results. - VP of HR, Innovate Corp",
      "A truly engaging speaker who brought clarity and actionable advice to complex topics. - Event Organizer",
      "Working with Alex on our change program was a game-changer. Our team adoption rates soared. - Director of Ops",
      "The 1-on-1 mentoring provided by Alex gave me the confidence and frameworks to lead effectively. - Startup Founder",
    ],
  },
];

export default function ThoughtLeadershipSection() {
  return (
    <section id="thought-leadership" className="py-12 md:py-24 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Insights in Action
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Sharing knowledge and experience through various platforms and engagements.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2"> {/* Changed to lg:grid-cols-2 */}
          {thoughtLeadershipItems.map((section, index) => (
            <Card key={index} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  {section.icon}
                  <CardTitle className="text-xl font-semibold">{section.title}</CardTitle>
                </div>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                {section.title === "Podcasts & Interviews" && section.items.length > 0 && (
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {section.items.map((item, itemIndex) => (
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
                {section.title === "What Clients Are Saying" && section.testimonials.length > 0 && (
                  <div className="overflow-x-auto pb-4 -mx-2 px-2"> {/* Added negative margin and padding to extend scroll area nicely */}
                    <div className="flex gap-4 whitespace-nowrap">
                      {section.testimonials.map((testimonial, testimonialIndex) => (
                        <Card key={testimonialIndex} className="w-72 md:w-80 flex-shrink-0 bg-secondary/50 shadow-sm">
                          <CardContent className="p-4 text-sm text-foreground/80">
                            <p className="whitespace-normal leading-relaxed">"{testimonial}"</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                {section.cta && (
                  <Button asChild variant="outline" className="mt-6 w-full border-accent text-accent hover:bg-accent/10 hover:text-accent">
                    <Link href={section.cta.link} target="_blank" rel="noopener noreferrer">
                      {section.cta.text} <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
