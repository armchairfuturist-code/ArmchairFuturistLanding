import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase, Users, Mic, BookOpen, MessageSquare } from 'lucide-react';

const services = [
  {
    icon: <Briefcase className="h-8 w-8 text-accent" />,
    title: "Advisory & Mentoring",
    whoIsItFor: "Leaders, executives, and innovation teams.",
    whatYouGet: [
      "1-on-1 or org-level strategic guidance.",
      "Focus on ROI and sustainable transformation.",
      "Customized roadmaps for AI integration and change."
    ],
  },
  {
    icon: <Users className="h-8 w-8 text-accent" />,
    title: "AI Change Programs",
    whoIsItFor: "Organizations implementing AI technologies.",
    whatYouGet: [
      "Human-centric programs for AI onboarding.",
      "Strategies to foster adoption and manage resistance.",
      "Workshops on ethical AI and future skills."
    ],
  },
  {
    icon: <Mic className="h-8 w-8 text-accent" />,
    title: "Speaking & Roundtables",
    whoIsItFor: "Event organizers, podcast hosts, executive groups.",
    whatYouGet: [
      "Engaging keynotes on AI, futurism, and work.",
      "Expert facilitation for executive roundtables.",
      "Thought-provoking content for diverse audiences."
    ],
  },
  {
    icon: <BookOpen className="h-8 w-8 text-accent" />,
    title: "Education & Training",
    whoIsItFor: "Teams needing to upskill in AI and future-readiness.",
    whatYouGet: [
      "Customized workshops and training modules.",
      "Critical thinking skills for AI evaluation.",
      "Practical frameworks for navigating change."
    ],
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-accent" />,
    title: "Facilitation",
    whoIsItFor: "Teams needing alignment and strategic dialogue.",
    whatYouGet: [
      "Expert facilitation for strategic planning sessions.",
      "Workshops to align teams through authentic dialogue.",
      "Frameworks for co-creating solutions and fostering innovation."
    ],
  },
];

export default function AdvisoryServicesSection() {
  return (
    <section id="advisory-services" className="py-12 md:py-24 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Advisory Services & Speaking Engagements
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Partner with me to navigate change, implement AI effectively, and inspire your teams.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-3 rounded-full bg-accent/10 mb-3">{service.icon}</div>
                <CardTitle className="text-xl font-semibold text-primary">{service.title}</CardTitle> {/* Changed from text-2xl to text-xl */}
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <div className="mb-4">
                  <h4 className="font-semibold text-foreground/90 mb-1">Who it's for:</h4>
                  <p className="text-sm text-muted-foreground">{service.whoIsItFor}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground/90 mb-1">What you get:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {service.whatYouGet.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
