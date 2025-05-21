import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle, Users, Lightbulb } from "lucide-react";

const challenges = [
  {
    icon: <AlertTriangle className="h-6 w-6 text-muted-foreground" />,
    title: "AI Tools Without Behavior Change",
    description: "Investing in cutting-edge AI tools often yields no ROI if underlying behaviors and workflows don't adapt.",
  },
  {
    icon: <Users className="h-6 w-6 text-muted-foreground" />,
    title: "Struggles with Culture Shift",
    description: "Leaders find it challenging to shift organizational culture towards embracing new technologies and agile adoption.",
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-muted-foreground" />,
    title: "Internal Resistance to Transformation",
    description: "Significant transformation initiatives can face internal resistance, slowing progress and diluting impact.",
  },
];

export default function ChallengeSection() {
  return (
    <section className="py-12 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Navigating the Complexities of Change
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Many organizations face common barriers when trying to implement transformative strategies.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                <div className="p-2 bg-muted/50 rounded-md">{challenge.icon}</div>
                <CardTitle className="text-xl font-semibold">{challenge.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{challenge.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="inline-block bg-card shadow-md">
            <CardContent className="p-6">
              <p className="text-xl font-medium text-foreground/90">
                "You’re not alone. Change is complex. <span className="text-accent">Let's decode it together.</span>"
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
