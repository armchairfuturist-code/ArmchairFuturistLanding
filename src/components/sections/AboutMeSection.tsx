
"use client";
import { useEffect, useRef, useState } from 'react';
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
          width={32}
          height={32}
          className="object-contain shrink-0 rounded-sm"
        />
      ) : (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
          <span className="font-semibold text-xs">{certification.issuerInitials}</span>
        </div>
      )}
      <p className="text-xs text-foreground/80 text-left">{certification.name}</p>
    </>
  );

  if (certification.link) {
    return (
      <a
        href={certification.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-row items-center gap-2 p-1 rounded-lg hover:bg-secondary/50 dark:hover:bg-secondary/30 transition-colors duration-150"
        aria-label={certification.name}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className="flex flex-row items-center gap-2 p-1 rounded-lg hover:bg-secondary/50 dark:hover:bg-secondary/30 transition-colors duration-150"
      aria-label={certification.name}
    >
      {content}
    </div>
  );
};


export default function AboutMeSection() {
  const expertCertification = certificationsData.find(c => c.id === 'genaiExpert');
  const otherCertifications = certificationsData.filter(c => c.id !== 'genaiExpert');

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
    <section id="about-me" className="py-12 md:py-24 bg-sectionBlue scroll-mt-20">
      <div
        ref={contentRef}
        className={`container mx-auto px-4 md:px-6 scroll-animate ${
          isContentVisible ? 'is-visible' : ''
        }`}
      >
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Column: Image */}
          <div className="lg:col-span-3 flex flex-col items-center">
            <div className="relative w-full"> {/* Removed max-w constraints */}
              <Image
                src="/Standing-Photoroom.png"
                alt="Alex Myers standing"
                width={1200} 
                height={1600}
                className="rounded-xl w-full h-auto border-0"
              />
            </div>
          </div>

          {/* Right Column: Text and All Credentials */}
          <div className="lg:col-span-2 space-y-6">
            {expertCertification && (
              <div className="flex justify-center mb-6">
                <a
                  key={expertCertification.id}
                  href={expertCertification.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block p-2 rounded-md hover:bg-secondary/70 dark:hover:bg-secondary/50 transition-colors duration-150 bg-card shadow-md"
                  aria-label={expertCertification.name}
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
                    <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <span className="font-semibold text-sm">{expertCertification.issuerInitials}</span>
                    </div>
                  )}
                </a>
              </div>
            )}
            <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl text-center">
              About Me
            </h2>
            <div className="prose prose-lg text-foreground/80 max-w-none font-rubik space-y-4">
              <p>
                Most organizations face an AI paradox: Executives champion AI, but teams feel the pressure—resulting in "AI Theatre": lots of activity, little real progress.
              </p>
              <p>
                The answer isn’t more software. It’s continuous improvement—Kaizen—unlocking the untapped potential within your people. I regularly find unexpected employees using AI to deliver 10x results. These hidden innovators are your future leaders.
              </p>
              
              <p>My mission:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Help organizations and individual leaders identify and empower these internal catalysts</li>
                <li>Remove barriers so innovation can flourish</li>
                <li>Foster a culture of ongoing, team-driven AI adoption</li>
              </ul>

              <p>My approach combines:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Systems thinking to reveal cultural and process dynamics</li>
                <li>Kaizen principles for steady, meaningful improvement</li>
                <li>Futurist insight to prepare you for what’s next</li>
              </ul>
              
              <p><strong>If you're ready for real, people-powered AI transformation, <a href="https://calendar.app.google/v2iqrJhw6AqGjE459" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">let's connect</a>.</strong></p>
            </div>
            
            {/* Other Certifications moved here */}
            {otherCertifications.length > 0 && (
              <div className="mt-8">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-3">
                  {otherCertifications.map((cert) => (
                    <CertificationItem key={cert.id} certification={cert} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

