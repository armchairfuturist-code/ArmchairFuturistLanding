import type { Certification } from '@/types';
import Link from 'next/link';
import { ExternalLink, Award } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Import the actual Button component

const certificationsData: Certification[] = [
  { id: "ccmp", name: "Certified Change Management Professional", issuerInitials: "CCMP", link: "https://www.ccmprofessional.org/" }, // Replace with actual link
  { id: "flta", name: "Certified Futurist & Long-Term Analyst", issuerInitials: "FLTA" },
  { id: "cebp", name: "Certified Enterprise Blockchain Professional", issuerInitials: "CEBP" },
  { id: "psm", name: "Professional Scrum Master", issuerInitials: "PSM" },
  { id: "pal", name: "Professional Agile Leadership", issuerInitials: "PAL" },
];

const CertificationItem: React.FC<{ certification: Certification }> = ({ certification }) => (
  <div className="flex flex-col items-center text-center p-4 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 min-h-[180px] justify-between">
    <div className="mb-3">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Award className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-primary">{certification.issuerInitials}</h3>
      <p className="text-sm text-muted-foreground mt-1">{certification.name}</p>
    </div>
    {certification.link ? (
      <Button asChild variant="link" size="sm" className="text-accent hover:text-accent/80">
        <Link href={certification.link} target="_blank" rel="noopener noreferrer">
          Verify Credential <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
        </Link>
      </Button>
    ) : (
      <div className="h-[36px] sm:h-[28px]"></div> /* Adjusted placeholder height for consistency with Button line height */
    )}
  </div>
);

export default function CertificationsSection() {
  return (
    <section className="py-12 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Certifications & Credentials
          </h2>
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
    </section>
  );
}
