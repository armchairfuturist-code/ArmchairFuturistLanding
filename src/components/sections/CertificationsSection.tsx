import type { Certification } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const certificationsData: Certification[] = [
  { id: "ccmp", name: "Certified Change Management Professional", issuerInitials: "CCMP", link: "https://www.ccmprofessional.org/", imageSrc: "/CCMP.png" },
  { id: "flta", name: "Certified Futurist & Long-Term Analyst", issuerInitials: "FLTA", imageSrc: "/Futurist.jpg" },
  { id: "cebp", name: "Certified Enterprise Blockchain Professional", issuerInitials: "CEBP", imageSrc: "/CEBP.png" },
  { id: "psm", name: "Professional Scrum Master", issuerInitials: "PSM", imageSrc: "/PSM.png" },
  { id: "pal", name: "Professional Agile Leadership", issuerInitials: "PAL", imageSrc: "/PAL.png" },
];

const CertificationItem: React.FC<{ certification: Certification }> = ({ certification }) => (
  <div className="flex flex-col items-center text-center p-4 bg-secondary rounded-lg">
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
        // Fallback in case imageSrc is not provided, though it should be
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <span className="font-semibold">{certification.issuerInitials}</span>
        </div>
      )}
      <p className="text-sm text-muted-foreground font-medium">{certification.name}</p>
    </div>
  </div>
);

export default function CertificationsSection() {
  return (
    <section className="py-6 md:py-10 bg-secondary"> {/* Further reduced padding */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8"> {/* Further reduced bottom margin */}
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Credentials
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
