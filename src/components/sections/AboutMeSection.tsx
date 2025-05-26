
import Image from 'next/image';
import type { Certification } from '@/types'; 

const certificationsData: Certification[] = [
  { id: "genaiExpert", name: "GenAI Academy Expert", issuerInitials: "GAIE", link: "https://thegenaiacademy.com/expert-hub/alex-myers/", imageSrc: "/expert.png" },
  { id: "ccmp", name: "Certified Change Management Professional", issuerInitials: "CCMP", link: "https://www.ccmprofessional.org/", imageSrc: "/CCMP.png" },
  { id: "flta", name: "Certified Futurist & Long-Term Analyst", issuerInitials: "FLTA", imageSrc: "/Futurist.jpg" },
  { id: "cebp", name: "Certified Enterprise Blockchain Professional", issuerInitials: "CEBP", imageSrc: "/CEBP.png" },
  { id: "psm", name: "Professional Scrum Master", issuerInitials: "PSM", imageSrc: "/PSM.png" },
  { id: "pal", name: "Professional Agile Leadership", issuerInitials: "PAL", imageSrc: "/PAL.png" },
];

const CertificationItem: React.FC<{ certification: Certification }> = ({ certification }) => {
  const content = (
    <>
      {certification.imageSrc ? (
        <Image
          src={certification.imageSrc}
          alt={`${certification.name} badge`}
          width={32} // Reduced size
          height={32} // Reduced size
          className="object-contain shrink-0 rounded-sm"
        />
      ) : (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"> {/* Adjusted size */}
          <span className="font-semibold text-xs">{certification.issuerInitials}</span>
        </div>
      )}
      <p className="text-xs text-foreground/80 text-center">{certification.name}</p> {/* Reduced text size */}
    </>
  );

  if (certification.link) {
    return (
      <a
        href={certification.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-2 p-1 rounded-lg border-0 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-150" // Reduced padding and gap
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 p-1 rounded-lg border-0 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-150"> {/* Reduced padding and gap */}
      {content}
    </div>
  );
};

export default function AboutMeSection() {
  const expertCertification = certificationsData.find(c => c.id === 'genaiExpert');
  const otherCertifications = certificationsData.filter(c => c.id !== 'genaiExpert');

  return (
    <section id="about-me" className="py-12 md:py-24 bg-sectionBlue scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Column: Image and other certifications */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start">
            <Image
              src="/Standing-Photoroom.png"
              alt="Alex Myers standing"
              width={1200}
              height={1600}
              className="rounded-xl w-full max-w-md lg:max-w-full h-auto border-0"
            />
            <div className="mt-4 w-full max-w-md lg:max-w-full grid grid-cols-2 gap-x-3 gap-y-1"> {/* Reduced margin-top and gaps */}
              {otherCertifications.map((cert) => (
                <CertificationItem key={cert.id} certification={cert} />
              ))}
            </div>
          </div>

          {/* Right Column: Text and expert certification */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              About Me
            </h2>
            <div className="prose prose-lg text-foreground/80 max-w-none font-rubik text-center space-y-4">
              <p>
                I operate at the intersection of technology and culture, guiding organizations through profound technological shifts by building authentic, enduring partnerships.
              </p>
              <p>
                My leverage: Systems thinking. An intuitive grasp of group dynamics. The ability to pose questions that catalyze real change.
              </p>
              <p>
                The challenge facing leaders today runs deeper than AI adoption—it's building hybrid competence in both organizational design and AI system engineering. Firms that fail here will struggle to compound AI gains or safeguard their culture as automation accelerates.
              </p>
              <p>
                I work with leaders confronting uncertainty around actually useful AI adoption. My mission: help you understand the full consequences of your innovations—technical and cultural—and architect for anti-fragility: teams that grow stronger and more adaptive in an increasingly complex world.
              </p>
              <p>
                This approach is grounded in deep understanding of both the technology itself and the human psychology of transformative change. The result is earned confidence in your chosen direction, anchored in trust and a clear line to tangible outcomes.
              </p>
            </div>
            
            <div className="mt-8 md:mt-10">
              {expertCertification && (
                <a
                  key={expertCertification.id}
                  href={expertCertification.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-6 col-span-2 flex flex-col items-center gap-2 p-3 rounded-lg border border-primary/30 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-150 shadow-md hover:shadow-lg"
                >
                  {expertCertification.imageSrc ? (
                    <Image
                      src={expertCertification.imageSrc}
                      alt={`${expertCertification.name} badge`}
                      width={80} 
                      height={80}
                      className="object-contain shrink-0 rounded-md"
                    />
                  ) : (
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <span className="font-semibold">{expertCertification.issuerInitials}</span>
                    </div>
                  )}
                  <p className="text-base font-medium text-primary/90 text-center">{expertCertification.name}</p>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
