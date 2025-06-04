"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image'; // Added Image import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, UsersRound, GraduationCap, Presentation, MessageCircle, UserCheck, ChevronDown } from 'lucide-react';

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
    title: "Speaking & Thought Leadership",
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
    <section id="services" className="py-12 md:py-24 bg-background scroll-mt-20">
      <div
        ref={contentRef}
        className={`container mx-auto px-4 md:px-6 scroll-animate ${
          isContentVisible ? 'is-visible' : ''
        }`}
      >
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Services
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto font-sans">
            Explore ways I work with individuals, groups, teams and organizations to transform how to think about AI adoption, organizational design, and how outmoded mental models limit our potential.
          </p>
        </div>

        <div className="flex justify-center my-8 md:my-12">
          <Image
            src="/IMG_3458.png"
            alt="Services overview image showing strategic collaboration"
            width={800}
            height={500}
            className="rounded-xl shadow-lg w-full max-w-3xl h-auto"
            data-ai-hint="strategy collaboration"
          />
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service) => (
            <Card
              key={service.title}
              className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl bg-card"
            >
              <CardHeader className="items-center text-center pt-6 px-6 pb-6 cursor-pointer">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-primary font-heading text-center flex items-center justify-center gap-2">
                  <span>{service.title}</span>
                  <ChevronDown className="h-5 w-5 text-primary/70 transition-transform duration-300 group-hover:rotate-180" />
                </CardTitle>
              </CardHeader>
              <CardContent
                className="px-6 max-h-0 opacity-0 invisible group-hover:max-h-48 group-hover:opacity-100 group-hover:visible group-hover:pb-6 group-hover:pt-2 transition-all duration-500 ease-in-out text-center"
              >
                <p className="text-base text-muted-foreground font-sans">
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
