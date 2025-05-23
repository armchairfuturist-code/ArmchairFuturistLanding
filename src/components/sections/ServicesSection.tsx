
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, UsersRound, GraduationCap, Presentation, MessageCircle, UserCheck } from 'lucide-react';

const servicesData = [
  {
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    title: "AI Strategy",
    description: "Developing your clear and practical AI roadmap, grounded in ROI-generating use cases and psychographic insights for adoption.",
  },
  {
    icon: <UsersRound className="h-8 w-8 text-primary" />,
    title: "AI Adoption & Change Management",
    description: "Navigating AI's human side, using psychographic segmentation and Kaizen principles to ensure your team confidently integrates AI.",
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: "Education & Training",
    description: "Equipping your team with practical AI knowledge and capabilities for an AI-driven world, fostering a culture of continuous improvement.",
  },
  {
    icon: <Presentation className="h-8 w-8 text-primary" />,
    title: "Public Speaking & Thought Leadership",
    description: "Inspiring talks that ignite action and spark breakthrough conversations on AI, organizational design, and the future of work.",
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-primary" />,
    title: "Group 'Vibe Facilitation'",
    description: "Creating authentic, no-BS environments for deep connection, shared understanding, and innovative problem-solving to unlock your team's potential.",
  },
  {
    icon: <UserCheck className="h-8 w-8 text-primary" />,
    title: "1-on-1 Mentoring",
    description: "Personalized guidance to amplify your impact, navigate critical decisions, and strategically leverage AI & human capital.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-12 md:py-24 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Services
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Explore the ways we can work together to transform your organization through effective AI adoption and strategic organizational design.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service) => (
            <Card key={service.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
              <CardHeader className="items-start pt-6 pb-4 px-6">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-primary font-heading">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow px-6 pb-6">
                <p className="text-base text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
