
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeOff, LightbulbOff, UsersRound, TrendingDown, PlugZap } from "lucide-react";

const challenges = [
  {
    icon: <EyeOff className="h-6 w-6 text-muted-foreground" />,
    title: "Hidden AI Use and Fear",
    description: "Many employees secretly use AI to boost productivity but fear disclosure due to unclear policies or concerns about job security. Without leadership creating a safe environment for experimentation, AI’s potential remains under-leveraged.",
  },
  {
    icon: <LightbulbOff className="h-6 w-6 text-muted-foreground" />,
    title: "Incomplete Organizational Innovation",
    description: "AI adoption is not just about technology rollout. It demands rethinking workflows, incentives, and the nature of work itself. Most companies lack the internal muscle for this kind of organizational innovation.",
  },
  {
    icon: <UsersRound className="h-6 w-6 text-muted-foreground" />,
    title: "Diverse Employee Responses to Change",
    description: "People vary widely in their willingness and ability to adopt AI—from resistant skeptics to eager experimenters. Traditional change management treats everyone the same, slowing progress.",
  },
  {
    icon: <TrendingDown className="h-6 w-6 text-muted-foreground" />,
    title: "Leadership and Culture Gaps",
    description: "Many leaders remain stuck in first order thinking—linear, control-focused—hindering agile responses. EQ and second order thinking are rare but critical for leading AI transformation.",
  },
  {
    icon: <PlugZap className="h-6 w-6 text-muted-foreground" />,
    title: "Technical and Integration Barriers",
    description: "AI tools often don’t seamlessly fit existing workflows or legacy systems, frustrating users and reducing adoption rates.",
  },
];

export default function ChallengeSection() {
  return (
    <section className="py-12 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            The Challenge: Why AI Adoption Often Stalls Despite Promising Technology
          </h2>
          {/* Optional: Add a short intro paragraph here if desired */}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                <div className="p-2 bg-muted/50 rounded-md mt-1">{challenge.icon}</div>
                <CardTitle className="text-xl font-semibold">{challenge.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{challenge.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
