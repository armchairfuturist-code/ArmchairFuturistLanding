import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Users, Settings2, Target } from 'lucide-react';

const capabilities = [
  {
    icon: <Brain className="h-5 w-5 text-primary" />,
    title: "Psychometric Insight for AI Adoption",
    content: "Identify early adopters and clear ROI pathways by understanding the psychographic makeup of your teams. This allows for targeted interventions and maximizes engagement with AI tools.",
    benefit: "Accelerate adoption by tailoring strategies to your team's unique psychological profiles."
  },
  {
    icon: <Users className="h-5 w-5 text-primary" />,
    title: "Systems Thinking + Group Dynamics",
    content: "Leverage behaviorally aware strategies to build internal momentum. By understanding how groups interact and how systems function, we can design interventions that foster collaboration and drive change organically.",
    benefit: "Build sustainable internal momentum and overcome resistance through holistic strategies."
  },
  {
    icon: <Settings2 className="h-5 w-5 text-primary" />,
    title: "Tech-Agnostic Frameworks",
    content: "Receive unbiased advice focused solely on what works best for your organization. My approach is not tied to specific tools or vendors, ensuring solutions are genuinely tailored to your needs.",
    benefit: "Get objective, customized solutions that truly fit your organization's context and goals."
  }
];

export default function WhyWorkWithMeSection() {
  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Not Just AI Answers — Real Organizational Transformation
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            My approach goes beyond technology, focusing on the human elements crucial for lasting change and measurable impact.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {capabilities.map((capability, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="border-b-2 border-primary/10 last:border-b-0">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6 text-left [&[data-state=open]>svg]:text-accent">
                  <div className="flex items-center gap-3">
                    {capability.icon}
                    <span>{capability.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6 text-base text-foreground/80">
                  <p className="mb-3">{capability.content}</p>
                  <div className="flex items-start gap-2 p-3 bg-secondary/50 rounded-md border border-primary/20">
                    <Target className="h-5 w-5 text-accent mt-1 shrink-0" />
                    <p className="text-sm font-medium text-primary">{capability.benefit}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 text-center">
          <Card className="inline-block bg-card shadow-md">
            <CardContent className="p-6">
              <p className="text-xl font-semibold text-foreground/90">
                “I don’t push pre-packaged solutions. <span className="text-accent">I co-create lasting ones.</span>”
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
