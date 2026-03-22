import type { Metadata } from 'next';
import Image from 'next/image';
import { Linkedin, Mail, Calendar, Award, BookOpen, Users, Globe, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BlurFade } from '@/components/ui/blur-fade';
import { CALENDAR_URL } from '@/lib/constants';

const siteUrl = 'https://thearmchairfuturist.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'About Alex Myers - Certified Futurist & AI Strategy Advisor',
  description: 'Alex Myers is a certified futurist and AI strategy advisor with 6 professional certifications and 40+ AI systems deployed. Based in Portugal, serving clients worldwide.',
  openGraph: {
    title: 'About Alex Myers - Certified Futurist & AI Strategy Advisor',
    description: 'Alex Myers is a certified futurist and AI strategy advisor with 6 professional certifications and 40+ AI systems deployed.',
    url: '/about',
    siteName: 'The Armchair Futurist',
    images: [
      {
        url: '/alexheadshot-nobg.png',
        width: 800,
        height: 800,
        alt: 'Alex Myers - Certified Futurist & AI Strategy Advisor',
        type: 'image/png',
      },
    ],
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Alex Myers',
    description: 'Certified Futurist & AI Strategy Advisor with 6 professional certifications and 40+ AI systems deployed.',
    images: ['/alexheadshot-nobg.png'],
  },
};

const certifications = [
  {
    name: "Certified Futurist & Long-Term Analyst (FLTA)",
    issuer: "Futures Institute",
    description: "Futures thinking, scenario planning, and long-term strategic analysis",
    icon: "🔮"
  },
  {
    name: "Certified Change Management Professional (CCMP)",
    issuer: "ACMP",
    description: "Organizational change management methodology and implementation",
    icon: "🔄"
  },
  {
    name: "GenAI Academy Expert",
    issuer: "GenAI Academy",
    description: "Generative AI implementation and enterprise deployment",
    icon: "🤖"
  },
  {
    name: "Certified Enterprise Blockchain Professional (CEBP)",
    issuer: "Blockchain Council",
    description: "Distributed systems architecture and blockchain strategy",
    icon: "⛓️"
  },
  {
    name: "Professional Scrum Master (PSM)",
    issuer: "Scrum.org",
    description: "Agile methodology and Scrum framework expertise",
    icon: "📋"
  },
  {
    name: "Professional Agile Leadership (PAL)",
    issuer: "Scrum.org",
    description: "Organizational agility and adaptive leadership",
    icon: "🎯"
  },
];

const expertiseAreas = [
  "AI Strategy & Adoption",
  "Change Management",
  "Future of Work",
  "Organizational Design",
  "Digital Transformation",
  "Data Sovereignty",
  "Agile & Scrum",
  "AI Mentoring",
  "Psychology-Led Adoption",
  "Human-Machine Workflow Design",
  "Blockchain & Web3",
  "Complexity Thinking",
];

const timelineEvents = [
  {
    year: "2026",
    title: "40+ AI Systems Deployed",
    description: "Reached milestone of production AI implementations across diverse organizations"
  },
  {
    year: "2025",
    title: "GenAI Academy Expert Certification",
    description: "Recognized as expert in generative AI implementation and enterprise deployment"
  },
  {
    year: "2024",
    title: "The Armchair Futurist Practice Launch",
    description: "Launched advisory practice focused on bridging the Accountability Gap in AI adoption"
  },
  {
    year: "2023",
    title: "Certified Change Management Professional",
    description: "Earned CCMP certification for organizational change expertise"
  },
  {
    year: "2022",
    title: "Certified Futurist & Long-Term Analyst",
    description: "Completed FLTA certification in futures thinking and scenario planning"
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <BlurFade inView>
              <div className="relative">
                <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden shadow-2xl border border-primary/20">
                  <Image
                    src="/alexheadshot-nobg.png"
                    alt="Alex Myers - Certified Futurist & AI Strategy Advisor"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg">
                  <p className="text-sm font-bold">6 Certifications</p>
                  <p className="text-xs opacity-90">Verified Expert</p>
                </div>
              </div>
            </BlurFade>

            <BlurFade inView delay={0.2}>
              <div>
                <p className="text-xs text-muted-foreground/60 font-mono mb-2">About Alex Myers</p>
                <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary mb-6">
                  Certified Futurist & AI Strategy Advisor
                </h1>
                <p className="text-lg text-foreground/80 font-sans leading-relaxed mb-6">
                  Alex Myers helps leaders and organizations navigate AI adoption by bridging the <strong className="text-primary">Accountability Gap</strong>—the space between AI outputs and business results.
                </p>
                <p className="text-lg text-foreground/80 font-sans leading-relaxed mb-8">
                  Based in <strong className="text-primary">Portugal</strong>, serving clients <strong className="text-primary">worldwide</strong> through remote advisory, mentoring, and hands-on implementation.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="h-12 px-6">
                    <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Free Strategy Call
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12 px-6">
                    <a href="https://www.linkedin.com/in/alex-myers-34572a10/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-4 w-4" />
                      Connect on LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { value: "40+", label: "AI Systems Deployed" },
              { value: "10-20h", label: "Reclaimed Per Week" },
              { value: "6", label: "Certifications" },
              { value: "4.9/5", label: "Client Rating" },
            ].map((stat, i) => (
              <BlurFade inView key={stat.label} delay={i * 0.1}>
                <div className="text-center p-6 rounded-xl bg-card border border-border/60">
                  <p className="text-3xl md:text-4xl font-black text-primary mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <BlurFade inView>
            <div className="text-center mb-12">
              <p className="text-xs text-muted-foreground/60 font-mono mb-2">Credentials</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
                Professional Certifications
              </h2>
              <p className="text-lg text-foreground/80 font-sans max-w-2xl mx-auto">
                Six professional certifications spanning futures thinking, change management, AI implementation, and agile leadership.
              </p>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <BlurFade inView key={cert.name} delay={i * 0.1}>
                <Card className="border-border/60 hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{cert.icon}</span>
                      <div>
                        <h3 className="font-heading font-bold text-foreground mb-1">{cert.name}</h3>
                        <p className="text-xs text-muted-foreground font-mono mb-2">{cert.issuer}</p>
                        <p className="text-sm text-foreground/80">{cert.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <BlurFade inView>
            <div className="text-center mb-12">
              <p className="text-xs text-muted-foreground/60 font-mono mb-2">Expertise</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
                Areas of Expertise
              </h2>
            </div>
          </BlurFade>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {expertiseAreas.map((area, i) => (
              <BlurFade inView key={area} delay={i * 0.05}>
                <div className="flex items-center gap-2 p-4 rounded-lg bg-card border border-border/60">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-sm font-medium text-foreground">{area}</span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <BlurFade inView>
            <div className="text-center mb-12">
              <p className="text-xs text-muted-foreground/60 font-mono mb-2">Journey</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
                Career Highlights
              </h2>
            </div>
          </BlurFade>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30" />

            {timelineEvents.map((event, i) => (
              <BlurFade inView key={event.year} delay={i * 0.1}>
                <div className={`relative flex items-start gap-8 mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 mt-1.5 ring-4 ring-primary/20" />
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="p-6 rounded-xl bg-card border border-border/60 shadow-sm">
                      <p className="text-sm font-bold text-primary mb-1">{event.year}</p>
                      <h3 className="font-heading font-bold text-foreground mb-2">{event.title}</h3>
                      <p className="text-sm text-foreground/80">{event.description}</p>
                    </div>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <BlurFade inView>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary mb-6">
                Ready to Bridge Your Accountability Gap?
              </h2>
              <p className="text-lg text-foreground/80 font-sans mb-8 max-w-2xl mx-auto">
                Schedule a free 15-minute strategy call to discuss your AI adoption challenges and opportunities.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="h-12 px-8">
                  <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Free Strategy Call
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-8">
                  <a href="/assessment">
                    <Award className="mr-2 h-4 w-4" />
                    Take Free Assessment
                  </a>
                </Button>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "https://thearmchairfuturist.com/#person",
            "name": "Alex Myers",
            "givenName": "Alex",
            "familyName": "Myers",
            "jobTitle": "Certified Futurist & AI Strategy Advisor",
            "url": "https://thearmchairfuturist.com",
            "image": "https://thearmchairfuturist.com/alexheadshot-nobg.png",
            "description": "Alex Myers is a certified futurist, AI strategy advisor, and change management professional who helps leaders and organizations bridge the accountability gap between AI outputs and business results.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "PT",
              "addressLocality": "Portugal"
            },
            "sameAs": [
              "https://www.linkedin.com/in/alex-myers-34572a10/",
              "https://armchairfuturist.substack.com/",
              "https://thegenaiacademy.com/expert-hub/alex-myers/"
            ],
            "knowsAbout": expertiseAreas,
            "hasCredential": certifications.map(cert => ({
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "certification",
              "name": cert.name,
              "description": cert.description
            }))
          })
        }}
      />
    </div>
  );
}
