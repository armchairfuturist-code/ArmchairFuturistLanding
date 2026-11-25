import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BookCallButton } from '@/components/ui/BookCallButton';
import { Card, CardContent } from '@/components/ui/card';
import { BlurFade } from '@/components/ui/blur-fade';
import PhotoCarousel from '@/components/about/PhotoCarousel';
import { LINKEDIN_URL } from '@/lib/constants';
import { ArrowRight, ArrowUpRight, CheckCircle2, Linkedin, MessageSquareQuote, Trophy } from 'lucide-react';

const siteUrl = 'https://thearmchairfuturist.com';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'About Alex Myers | AI Consultant & Instructor',
  description: 'Alex Myers is an AI consultant who teaches you to design, launch, and sell your own AI services. 6 certifications and 40+ AI systems deployed.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Alex Myers - AI Guide',
    description: 'Alex Myers is an AI guide who teaches you to design, launch, and sell your own AI-powered services. Certified Futurist with 40+ AI systems deployed.',
    url: '/about',
    siteName: 'The Armchair Futurist',
    images: [
      {
        url: '/alexheadshot-nobg.png',
        width: 800,
        height: 800,
        alt: 'Alex Myers - AI Guide',
        type: 'image/png',
      },
    ],
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Alex Myers',
    description: 'AI guide who teaches you to design, launch, and sell your own AI-powered services.',
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
    description: "Generative AI implementation and AI-powered service design",
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
  "AI Guidance",
  "Psychology-Led Adoption",
  "Human-Machine Workflow Design",
  "Blockchain & Web3",
  "Complexity Thinking",
];

const inTheRoom = [
  {
    src: "/session-table.jpg",
    alt: "Alex working through a build session with a client at a table",
    caption: "1-on-1 build session: turning a stuck workflow into a working system",
  },
  {
    src: "/session-room.jpg",
    alt: "Alex coaching a client one-on-one in a session room",
    caption: "Coaching a solo founder through their first AI workflow",
  },
  {
    src: "/session-workshop.jpg",
    alt: "Alex running a hands-on AI workshop",
    caption: "Hands-on workshop: everyone leaves with something running",
  },
  {
    src: "/marketing3.jpeg",
    alt: "Alex presenting at Sunsetpreneurs on AI strategy",
    caption: "Sunsetpreneurs: AI strategy for founders",
  },
  {
    src: "/marketing4.jpeg",
    alt: "Alex leading a session at Startup Braga on AI adoption",
    caption: "Startup Braga: AI adoption, room by room",
  },
  {
    src: "/marketing1.webp",
    alt: "Alex working with a group on AI strategy",
    caption: "Group strategy session: ending in a decision, not a deck",
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-[100dvh] bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <BlurFade inView>
              <div className="relative">
                <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden shadow-2xl border border-primary/20">
                  <Image
                    src="/alexheadshot-nobg.png"
                    alt="Alex Myers - AI Guide"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </BlurFade>

            <BlurFade inView delay={0.2}>
              <div>
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
                  AI Guide
                </h1>
                <p className="text-lg text-foreground/80 font-sans leading-relaxed mb-6">
                  Alex Myers teaches you to design, launch, and sell your own AI-powered services. No dependency. No retainer. The understanding runs deep enough that you never need another expert.
                </p>
                <p className="text-lg text-foreground/80 font-sans leading-relaxed mb-8">
                  Certified Futurist &amp; AI Guide with <strong className="text-primary">6 professional certifications</strong> and <strong className="text-primary">40+ AI systems deployed</strong>. Based in <strong className="text-primary">Portugal</strong>, serving clients <strong className="text-primary">worldwide</strong>.
                </p>
                <div className="flex flex-wrap gap-4">
                  <BookCallButton
                    location="about_hero"
                    size="lg"
                    icon="calendar"
                    iconClassName="mr-2 h-4 w-4"
                    className="h-12 px-6"
                  >
                    Book Free Strategy Call
                  </BookCallButton>
                  <Button asChild size="lg" variant="outline" className="h-12 px-6">
                    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
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
              { value: "10–20h", label: "Reclaimed Per Week" },
              { value: "6", label: "Certifications" },
              { value: "4.9/5", label: "Client Rating" },
            ].map((stat, i) => (
              <BlurFade inView key={stat.label} delay={i * 0.1}>
                <div className="text-center p-6 rounded-xl bg-card border border-border/60">
                  <p className="type-value text-primary mb-2">{stat.value}</p>
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
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
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
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
                Areas of Expertise
              </h2>
            </div>
          </BlurFade>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {expertiseAreas.map((area, i) => (
              <BlurFade inView key={area} delay={i * 0.05}>
                <div className="flex items-center gap-2 p-4 rounded-lg bg-card border border-border/60 min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-sm font-medium text-foreground break-words min-w-0">{area}</span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* In the room, every photo of Alex working lives here, nowhere else */}
      <section className="border-y border-border/60 bg-[#f3f3f3] py-20 md:py-28">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <div className="mb-8 grid items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <h2 className="font-display text-3xl font-medium text-ink md:text-4xl">
                In the room
              </h2>
            </div>
            <p className="text-charcoal md:col-span-5 md:text-right">
              Workshops, strategy sessions, and build sprints are the work. This is what it looks like.
            </p>
          </div>

          <BlurFade inView>
            <PhotoCarousel photos={inTheRoom} />
          </BlurFade>
        </div>
      </section>

      {/* The career, in one paragraph, then the two places worth going next */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <BlurFade inView>
            <div className="grid items-start gap-10 md:grid-cols-12">
              <div className="md:col-span-6">
                <h2 className="font-display text-3xl font-medium text-ink md:text-4xl">
                  Certified across futures, change, and generative AI.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-charcoal md:text-lg">
                  Six certifications, including Certified Futurist (FLTA), Change
                  Management Professional (CCMP), and GenAI Academy Expert. 40+ AI
                  systems in production since. The practice opened in 2024 and has
                  run on one rule since: you leave able to do the work without me.
                </p>
              </div>

              <div className="grid gap-4 md:col-span-6">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-6 transition-colors duration-200 hover:border-hp-electric/50"
                >
                  <Linkedin className="mt-0.5 h-5 w-5 shrink-0 text-hp-electric" aria-hidden="true" />
                  <span>
                    <span className="flex items-center gap-1.5 font-display text-lg font-medium text-ink">
                      Connect on LinkedIn
                      <ArrowUpRight
                        className="h-4 w-4 text-charcoal transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-charcoal">
                      Client wins, objections, and the messy middle of adoption: posted
                      as they happen, not polished into case studies.
                    </span>
                  </span>
                </a>

                <a
                  href="/testimonials"
                  className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-6 transition-colors duration-200 hover:border-hp-electric/50"
                >
                  <MessageSquareQuote className="mt-0.5 h-5 w-5 shrink-0 text-hp-electric" aria-hidden="true" />
                  <span>
                    <span className="flex items-center gap-1.5 font-display text-lg font-medium text-ink">
                      Read what clients wrote
                      <ArrowRight
                        className="h-4 w-4 text-charcoal transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-charcoal">
                      Every client quote, at full length, including the parts too long
                      for a homepage.
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <BlurFade inView>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="about-cta-title font-heading text-3xl md:text-4xl font-bold text-primary mb-6">
                Bring Your AI Adoption Questions
              </h2>
              <p className="text-lg text-foreground/80 font-sans mb-8 max-w-2xl mx-auto">
                Schedule a free 15-minute strategy call to discuss your AI adoption challenges and opportunities.
              </p>
              <p className="text-sm text-charcoal mb-6 max-w-xl mx-auto">
                Or read first: <a href="/speaking" className="underline decoration-primary/30 underline-offset-4 hover:decoration-primary">how I run executive roundtables</a>,
                the <a href="/glossary" className="underline decoration-primary/30 underline-offset-4 hover:decoration-primary">glossary of the terms I use</a>,
                and <a href="/case-studies" className="underline decoration-primary/30 underline-offset-4 hover:decoration-primary">what the work shipped</a>.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <BookCallButton
                  location="about_bottom_cta"
                  size="lg"
                  icon="calendar"
                  iconClassName="mr-2 h-4 w-4"
                  className="h-12 px-8"
                >
                  Book Free Strategy Call
                </BookCallButton>
                <Button asChild size="lg" variant="outline" className="h-12 px-8">
                  <a href="/assessment">
                    <Trophy className="mr-2 h-4 w-4" />
                    Take the Free Assessment
                  </a>
                </Button>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

    </main>
  );
}
