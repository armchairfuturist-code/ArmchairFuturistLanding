
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
                My work inside organizations reveals a common AI paradox: executives champion it, while teams quietly feel the pressure, leading to "AI Theatre"—activity without real transformation. Many crave the feeling of change, not the profound shift itself.
              </p>
              <p>
                The true antidote isn't buying more software; it's empowering the human capability already within your walls. I consistently find individuals—often unexpected—using AI to deliver remarkable 10x results. These are your hidden innovators, your future leaders.
              </p>
              <p>
                The pivotal question I help leaders answer: Are you equipped to find, nurture, and scale these internal catalysts, or are your structures unintentionally hindering them?
              </p>
              <p>
                This is where my distinct approach makes the difference. As a systems-thinker, I map the cultural and process dynamics. As an Agile expert, I champion rapid, bottom-up innovation. As a Certified Futurist, I guide you to build resilient, adaptive organizations prepared for what's next.
              </p>
              <p>
                My mission is to shift you from "AI Theatre" to authentic, sustainable results. I achieve this by helping you:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Uncover your "AI results mindset" innovators and their high-impact methods.</li>
                <li>Architect the culture and strategy for genuine, team-driven AI adoption.</li>
                <li>Build anti-fragile teams that thrive on AI-driven change, moving beyond hype to lasting value.</li>
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

