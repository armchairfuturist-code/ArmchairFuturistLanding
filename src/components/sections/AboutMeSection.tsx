import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutMeSection() {
  return (
    <section id="about-me" className="py-12 md:py-24 bg-sectionBlue scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <Image
              src="/Standing.jpg"
              alt="Alex Myers standing"
              width={375} 
              height={500} 
              className="rounded-xl shadow-lg object-cover w-full h-auto aspect-[3/4] border-0"
            />
          </div>
          <div className="lg:col-span-3 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              About Me
            </h2>
            <div className="prose prose-lg text-foreground/80 max-w-none">
              <p>
                “I’m a certified futurist who doesn’t believe in hype. I help people shape change, not just talk about it.”
                This is the core of my philosophy as the "Armchair Futurist." My work is grounded in practical application,
                translating complex future trends and AI advancements into actionable strategies for leaders and organizations.
              </p>
              <p>
                As the founder of Alex Myers Consulting (Portugal, 2023), I bring a wealth of experience in AI, human capital,
                and systems design. My journey includes hosting the "Mission Driven You" podcast, where I explore purpose-driven
                careers and the evolving landscape of work.
              </p>
              <p>
                My approach is built on deep expertise combined with an authentic desire to partner. I don't offer one-size-fits-all
                solutions; instead, I work collaboratively to understand your unique challenges and co-create strategies that deliver
                real, lasting impact.
              </p>
            </div>
            <Card className="bg-secondary border-primary/20 shadow-lg">
              <CardContent className="p-6">
                <blockquote className="text-lg font-medium text-primary italic">
                  "The future is not something to be passively awaited, but actively created. My role is to empower you with the insights and frameworks to build that future, today."
                </blockquote>
                <p className="text-right mt-2 text-sm text-muted-foreground">- Alex Myers</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
