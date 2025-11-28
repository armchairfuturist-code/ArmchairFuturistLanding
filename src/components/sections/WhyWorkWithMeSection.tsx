
"use client";
import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react'; // Added FC import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BrainCircuit, ScanSearch, GraduationCap, Crown, TrendingUp, ShieldCheck, DollarSign, Zap, UserMinus, UserCog, UserCheck, UserRoundSearch, HeartHandshake, FlaskConical, ClipboardList, ChevronDown } from 'lucide-react';
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
    icon: <BrainCircuit className="h-5 w-5 text-primary shrink-0" />,
    title: "Cultivating the Four Essential Mindsets for AI Success",
    content: "I guide your organization in understanding and fostering these key mindset segments, identified through AI-driven language analysis and developmental psychology:",
    subPoints: [
      { icon: <UserMinus className="h-5 w-5 text-accent mr-2 shrink-0" />, text: "<strong>Resistant (5-10%):</strong> Those deeply skeptical or obstructive toward AI change. I help leaders manage this group with compassion and accountability, minimizing disruption without stalling progress." },
      { icon: <UserCog className="h-5 w-5 text-accent mr-2 shrink-0" />, text: "<strong>Reluctant (70-75%):</strong> The cautious majority who need evidence, time, and peer support to embrace AI. I design tailored communications and training to build their confidence and desire." },
      { icon: <UserCheck className="h-5 w-5 text-accent mr-2 shrink-0" />, text: "<strong>Resilient (15%):</strong> Adaptable employees who quickly move to experimentation once given direction. I empower them as change agents and champions." },
      { icon: <UserRoundSearch className="h-5 w-5 text-accent mr-2 shrink-0" />, text: "<strong>Results (5%):</strong> Natural second order thinkers who thrive on ambiguity and lead AI experimentation. Identifying and liberating these “needle-in-the-haystack” talents accelerates pilot success and creates momentum." },
    ],
    keyBenefit: "Accelerate adoption by tailoring strategies to your team's unique psychological profiles."
  },
  {
    icon: <Users className="h-5 w-5 text-primary shrink-0" />, 
    title: "Embedding Second Order Thinking and Emotional Intelligence (EQ)",
    content: "I help leaders and teams evolve from first order (linear, control-driven) to second order thinking—holistic, adaptive, and emotionally mature approaches essential for navigating AI’s complexity. This shift enables:",
    subPoints: [
      { icon: <ClipboardList className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />, text: "Embracing uncertainty and iterative experimentation rather than rigid playbooks." },
      { icon: <ClipboardList className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />, text: "Anticipating AI’s ripple effects on workflows, morale, and strategy." },
      { icon: <ClipboardList className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />, text: "Leading with psychological safety, fostering innovation and ethical AI use." },
    ],
    keyBenefit: "Build sustainable internal momentum and overcome resistance through holistic strategies." 
  },
  {
    icon: <ScanSearch className="h-5 w-5 text-primary shrink-0" />,
    title: "Leveraging AI-Powered Psychological Assessment for Precision Change Management",
    content: "Using AI to analyze language from existing employee communications, I provide frictionless, data-driven insights into mindset distributions across your workforce. This enables:",
    subPoints: [
      { icon: <ClipboardList className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />, text: "Targeted interventions tailored to each mindset segment." },
      { icon: <ClipboardList className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />, text: "Avoiding the “lowest common denominator” approach that slows adoption." },
      { icon: <ClipboardList className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />, text: "Annual rescoring to track psychological growth and adapt strategies dynamically." },
    ],
    keyBenefit: "Get objective, customized solutions that truly fit your organization's context and goals."
  },
  {
    icon: <GraduationCap className="h-5 w-5 text-primary shrink-0" />,
    title: "Designing AI Adoption as an Organizational Learning Challenge, Not Just a Technical Rollout",
    content: "I help you:",
    subPoints: [
      { icon: <ClipboardList className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />, text: "Build pilot teams from the Resilient and Results segments to rapidly test and refine AI tools." },
      { icon: <ClipboardList className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />, text: "Showcase quick wins to convert Reluctant employees and reduce resistance." },
      { icon: <ClipboardList className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />, text: "Manage Resistant employees with clear expectations and compassionate accountability." },
      { icon: <ClipboardList className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />, text: "Avoid “talent hoarding” by enabling high performers to spread innovation cross-functionally." },
      { icon: <ClipboardList className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />, text: "Integrate AI into workflows with user-centric design and hybrid models bridging legacy systems." },
    ],
    keyBenefit: "Unlock real organizational performance by focusing on learning and adaptation."
  },
  {
    icon: <Crown className="h-5 w-5 text-primary shrink-0" />,
    title: "Partnering Leadership, Lab, and Crowd for Sustainable AI Transformation",
    content: "I emphasize the triad of:",
    subPoints: [
      { icon: <Crown className="h-5 w-5 text-accent mr-2 shrink-0" />, text: "<strong>Leadership:</strong> Setting a vivid AI vision, modeling AI use, and creating safe spaces for experimentation." },
      { icon: <FlaskConical className="h-5 w-5 text-accent mr-2 shrink-0" />, text: "<strong>Lab:</strong> Centralized teams that rapidly build, benchmark, and iterate AI solutions informed by frontline insights." },
      { icon: <Users className="h-5 w-5 text-accent mr-2 shrink-0" />, text: "<strong>Crowd:</strong> Empowered employees who discover and share AI use cases, fueling decentralized innovation." },
    ],
    keyBenefit: "Foster a culture of innovation by aligning leadership, expert teams, and empowered employees."
  }
];

const whyItMattersData = [
  {
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    title: "Unlock Real Organizational Performance",
    content: "Move beyond isolated productivity gains to systemic transformation."
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    title: "Future-Proof Your Workforce",
    content: "Equip your people with the mindsets and skills to thrive alongside AI."
  },
  {
    icon: <DollarSign className="h-6 w-6 text-primary" />,
    title: "Maximize AI ROI",
    content: "Accelerate adoption and scale by focusing on the right people and cultural shifts."
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Lead with Confidence",
    content: "Navigate complexity with emotionally intelligent leadership and adaptive strategies."
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

  return (
    <section id="how-i-work" className="py-12 md:py-24 bg-background scroll-mt-20">
      <div
        ref={contentRef}
        className={`container mx-auto px-4 md:px-6 scroll-animate ${
          isContentVisible ? 'is-visible' : ''
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            How I Work: Mindset-Centered AI Adoption
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto font-sans">
            My human-centered approach to AI success prioritizes mindset, integrating AI-driven psychological insights with proven change leadership. This empowers your people to solve more vital problems and ensures customers feel a distinctly positive difference, ultimately forging a stronger, more adaptive culture that accelerates change without burnout.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <Accordion type="single" collapsible className="w-full">
            {howIHelpData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-2 border-primary/10 last:border-b-0">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6 text-left [&[data-state=open]>svg.lucide-chevron-down]:text-accent">
                  <div className="flex items-center gap-3 mr-3"> {/* Added mr-3 for spacing before chevron */}
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6 text-base text-foreground/80 font-sans">
                  <p className="mb-4">{item.content}</p>
                  {item.subPoints && item.subPoints.length > 0 && (
                    <ul className="space-y-3 ml-2"> {/* Added ml-2 for slight indent */}
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
