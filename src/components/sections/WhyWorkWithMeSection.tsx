"use client";
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  BrainCircuit, 
  ScanSearch, 
  GraduationCap, 
  Crown, 
  TrendingUp, 
  ShieldCheck, 
  DollarSign, 
  Zap, 
  UserMinus, 
  UserCog, 
  UserCheck, 
  UserRoundSearch, 
  HeartHandshake, 
  FlaskConical, 
  ClipboardList, 
  ChevronDown,
  MonitorCheck,
  Code2,
  Workflow
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface HowIHelpItem {
  icon: React.ReactNode;
  title: string;
  content: string;
  subPoints?: { icon?: React.ReactNode; text: string }[];
  keyBenefit?: string;
}

const howIHelpData: HowIHelpItem[] = [
  {
    icon: <MonitorCheck className="h-5 w-5 text-primary shrink-0" />,
    title: "The Agent Operator Framework",
    content: "I manage your AI systems using a dedicated operational framework that ensures consistency, security, and measurable output:",
    subPoints: [
      { icon: <Zap className="h-5 w-5 text-accent mr-2 shrink-0" />, text: "<strong>Continuous Oversight:</strong> I monitor your assistant's performance daily, catching hallucinations or API failures before they impact your workflow." },
      { icon: <Code2 className="h-5 w-5 text-accent mr-2 shrink-0" />, text: "<strong>Technical Maintenance:</strong> I handle the backend complexity—from updating system prompts to integrating the latest models (Gemini, Claude, Grok)." },
      { icon: <Workflow className="h-5 w-5 text-accent mr-2 shrink-0" />, text: "<strong>Iterative Optimization:</strong> As your business needs evolve, I refine the assistant's logic and add new 'skills' to handle increasingly complex tasks." },
    ],
    keyBenefit: "Maintain high-performance AI infrastructure without ever needing to touch the code yourself."
  },
  {
    icon: <BrainCircuit className="h-5 w-5 text-primary shrink-0" />,
    title: "Efficiency Engineering & Logic Design",
    content: "Clear thinking is the new code. I help you translate your complex business processes into structured AI logic that actually executes:",
    subPoints: [
      { icon: <ClipboardList className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />, text: "Mapping manual workflows to identify the highest-leverage automation targets." },
      { icon: <ClipboardList className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />, text: "Designing custom 'system prompts' that capture your specific voice and business rules." },
      { icon: <ClipboardList className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />, text: "Building reliable 'Proof of Work' audit trails via GitHub and Firebase logs." },
    ],
    keyBenefit: "Turn your unique expertise into an automated, scalable system."
  }
];

const whyItMattersData = [
  {
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    title: "Reclaim Your Time",
    content: "Shift from managing rote administrative tasks to focusing on high-leverage strategic moves."
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    title: "Data Sovereignty",
    content: "Own your systems. I build on stacks that you control, ensuring your data isn't locked in a third-party silo."
  },
  {
    icon: <DollarSign className="h-6 w-6 text-primary" />,
    title: "Extreme ROI",
    content: "Eliminate the overhead of a human hire while achieving 24/7 operational throughput."
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Operational Agility",
    content: "Evolve your systems as fast as the AI landscape changes, guided by an expert operator."
  }
];

export default function WhyWorkWithMeSection() {
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

    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-i-work" className="py-12 md:py-24 bg-background scroll-mt-20">
      <div
        ref={contentRef}
        className={`container mx-auto px-4 md:px-6 scroll-animate ${isContentVisible ? 'is-visible' : ''
          }`}
      >
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            My Approach: Precision AI Operations
          </h2>
          <div className="mt-6 text-lg text-foreground/80 max-w-3xl mx-auto font-sans text-left space-y-4">
            <p>
              I act as the bridge between raw AI potential and <em className="italic">business results</em>. My methodology is focused on reliability, separateness, and performance:
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <Accordion type="single" collapsible className="w-full">
            {howIHelpData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-2 border-primary/10 last:border-b-0">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6 text-left [&[data-state=open]>svg.lucide-chevron-down]:text-accent">
                  <div className="flex items-center gap-3 mr-3">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6 text-base text-foreground/80 font-sans">
                  <p className="mb-4">{item.content}</p>
                  {item.subPoints && item.subPoints.length > 0 && (
                    <ul className="space-y-3 ml-2">
                      {item.subPoints.map((subPoint, i) => (
                        <li key={i} className="flex items-start">
                          {subPoint.icon || <ClipboardList className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />}
                          <span dangerouslySetInnerHTML={{ __html: subPoint.text }} />
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.keyBenefit && (
                    <div className="mt-4 flex items-start gap-2 p-3 bg-secondary/50 rounded-md border border-primary/20">
                      <HeartHandshake className="h-5 w-5 text-accent mt-1 shrink-0" />
                      <p className="text-sm font-medium text-primary">{item.keyBenefit}</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="max-w-3xl mx-auto mb-12 text-center text-lg text-foreground/80 font-sans space-y-4">
          <h4 className="text-xl font-bold text-primary">Direct Implementation Only</h4>
          <p>
            I don't provide speculative RFPs or generic strategy decks. I focus on building functioning systems. Every engagement starts with a direct prototyping phase where we determine the exact logic needed for your specific context.
          </p>
          <p>
            This ensures that the infrastructure I build isn't just technologically sound—it's operationally useful. <strong>I manage a limited number of clients to ensure high-touch implementation.</strong>
          </p>
        </div>

        <div className="text-center mb-12 mt-16 md:mt-24">
          <h3 className="font-heading text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            Why This Matters
          </h3>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {whyItMattersData.map((item) => (
            <Card key={item.title} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-2">
                  {item.icon}
                </div>
                <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground font-sans">{item.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
