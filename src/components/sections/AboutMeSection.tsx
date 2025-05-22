
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Certification } from '@/types'; 

const certificationsData: Certification[] = [
  { id: "ccmp", name: "Certified Change Management Professional", issuerInitials: "CCMP", link: "https://www.ccmprofessional.org/", imageSrc: "/CCMP.png" },
  { id: "flta", name: "Certified Futurist & Long-Term Analyst", issuerInitials: "FLTA", imageSrc: "/Futurist.jpg" },
  { id: "cebp", name: "Certified Enterprise Blockchain Professional", issuerInitials: "CEBP", imageSrc: "/CEBP.png" },
  { id: "psm", name: "Professional Scrum Master", issuerInitials: "PSM", imageSrc: "/PSM.png" },
  { id: "pal", name: "Professional Agile Leadership", issuerInitials: "PAL", imageSrc: "/PAL.png" },
];

const CertificationItem: React.FC<{ certification: Certification }> = ({ certification }) => (
  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-150">
    {certification.imageSrc ? (
      <Image
        src={certification.imageSrc}
        alt={`${certification.name} badge`}
        width={40}
        height={40}
        className="object-contain shrink-0 rounded-sm"
      />
    ) : (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <span className="font-semibold">{certification.issuerInitials}</span>
      </div>
    )}
    <p className="text-sm text-foreground/80">{certification.name}</p>
  </div>
);

export default function AboutMeSection() {
  return (
    <section id="about-me" className="py-12 md:py-24 bg-sectionBlue scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3">
            <Image
              src="/Standing-Photoroom.png"
              alt="Alex Myers standing"
              width={600}
              height={800}
              className="rounded-xl w-full h-auto border-0"
            />
            <Card className="bg-secondary border-primary/20 shadow-lg mt-8">
              <CardContent className="p-6">
                <blockquote className="text-lg font-medium text-primary italic">
                  "The future is not something to be passively awaited, but actively created. My role is to empower you with the insights and frameworks to build that future, today."
                </blockquote>
                <p className="text-right mt-2 text-sm text-muted-foreground">- Alex Myers</p>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
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
            
            <div className="mt-6">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {certificationsData.map((cert) => (
                  <CertificationItem key={cert.id} certification={cert} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
