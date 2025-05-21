import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Certification } from '@/types'; // Ensure this type is available or move its definition if necessary

// Copied from the former CertificationsSection.tsx
const certificationsData: Certification[] = [
  { id: "ccmp", name: "Certified Change Management Professional", issuerInitials: "CCMP", link: "https://www.ccmprofessional.org/", imageSrc: "/CCMP.png" },
  { id: "flta", name: "Certified Futurist & Long-Term Analyst", issuerInitials: "FLTA", imageSrc: "/Futurist.jpg" },
  { id: "cebp", name: "Certified Enterprise Blockchain Professional", issuerInitials: "CEBP", imageSrc: "/CEBP.png" },
  { id: "psm", name: "Professional Scrum Master", issuerInitials: "PSM", imageSrc: "/PSM.png" },
  { id: "pal", name: "Professional Agile Leadership", issuerInitials: "PAL", imageSrc: "/PAL.png" },
];

const CertificationItem: React.FC<{ certification: Certification }> = ({ certification }) => (
  <div className="flex flex-col items-center text-center p-4 bg-card rounded-lg shadow-sm"> {/* Changed to bg-card and added shadow-sm for definition */}
    <div className="mb-3">
      {certification.imageSrc ? (
        <Image
          src={certification.imageSrc}
          alt={`${certification.name} badge`}
          width={100}
          height={100}
          className="mx-auto mb-4 object-contain"
        />
      ) : (
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <span className="font-semibold">{certification.issuerInitials}</span>
        </div>
      )}
      <p className="text-sm text-card-foreground font-medium">{certification.name}</p>
    </div>
  </div>
);

export default function AboutMeSection() {
  return (
    <section id="about-me" className="py-12 md:py-24 bg-sectionBlue scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Existing About Me Content */}
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <Image
              src="/Standing-Photoroom.png"
              alt="Alex Myers standing"
              width={600}
              height={800}
              className="rounded-xl w-full h-auto border-0"
            />
          </div>
          <div className="lg:col-span-2 space-y-6">
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

        {/* Credentials Subsection */}
        <div className="mt-16 md:mt-24"> {/* Added margin top for separation */}
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Credentials
            </h3>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              Demonstrating a commitment to expertise and continuous learning in key domains.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {certificationsData.map((cert) => (
              <CertificationItem key={cert.id} certification={cert} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
