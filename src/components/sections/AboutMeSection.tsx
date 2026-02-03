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
        className="flex flex-row items-center gap-2 p-1 rounded-lg hover:bg-white/20 transition-colors duration-150"
        aria-label={certification.name}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className="flex flex-row items-center gap-2 p-1 rounded-lg hover:bg-white/20 transition-colors duration-150"
      aria-label={certification.name}
    >
      {content}
    </div>
  );
};

// Chevron Icon Component
const ChevronIcon: { (props: { isOpen: boolean }): JSX.Element } = ({ isOpen }) => (
  <svg
    className={`w-5 h-5 transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : ''}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

// Accordion Item Component
interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, isOpen, onToggle, children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-white/20 last:border-0 transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left focus:outline-none group"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg md:text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">{title}</h3>
        <span className="text-primary shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
          <ChevronIcon isOpen={isOpen} />
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef} className="pb-4 pr-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function AboutMeSection() {
  const expertCertification = certificationsData.find(c => c.id === 'genaiExpert');
  const otherCertifications = certificationsData.filter(c => c.id !== 'genaiExpert');

  const contentRef = useRef<HTMLDivElement>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

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

    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about-me" className="relative py-12 md:py-24 bg-sectionBlue scroll-mt-20 overflow-hidden min-h-[800px] flex items-center">

      {/* Blended Portrait Background - Desktop Only */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[55%] pointer-events-none z-0">
        <div className="relative h-full w-full">
          <Image
            src="/Standing-Photoroom.png"
            alt="Alex Myers"
            fill
            className="object-contain object-bottom-right"
            style={{
              objectPosition: 'right bottom',
              maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 5%, rgba(0,0,0,0.8) 20%, black 40%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 5%, rgba(0,0,0,0.8) 20%, black 40%)',
            }}
            priority
            sizes="50vw"
          />
        </div>
      </div>

      <div
        ref={contentRef}
        className={`container mx-auto px-4 md:px-6 relative z-10 w-full ${isContentVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left Column - Content */}
          <div className="lg:col-span-7 space-y-4">

            <div className="flex flex-col">
              {/* Expert Badge */}
              {expertCertification && (
                <div className="flex justify-center lg:justify-start mb-6">
                  <a
                    key={expertCertification.id}
                    href={expertCertification.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block p-2 rounded-md hover:bg-white/20 transition-colors duration-150 bg-white/10 backdrop-blur-sm shadow-md"
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

              {/* Mobile Image */}
              <div className="lg:hidden relative w-full h-[400px] mb-8 -mx-4 w-[calc(100%+2rem)]">
                <div className="absolute inset-0 bg-gradient-to-b from-sectionBlue via-transparent to-transparent z-10 pointer-events-none h-20" />
                <Image
                  src="/Standing-Photoroom.png"
                  alt="Alex Myers"
                  fill
                  className="object-contain object-bottom"
                  priority
                  sizes="100vw"
                />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sectionBlue to-transparent z-10" />
              </div>

              <h2 className="font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl text-center lg:text-left mb-6">
                About Alex
              </h2>

              <div className="prose prose-lg text-foreground/80 max-w-none font-rubik">
                <p>
                  I optimize human and financial capital using autonomous systems. My background in <strong>Systems Thinking</strong> and <strong>Change Management</strong> allows me to build AI infrastructure that actually executes, rather than just adding to the technical noise.
                </p>
              </div>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-2 pt-4">
              <AccordionItem
                title="Systems Optimization"
                isOpen={openAccordion === 0}
                onToggle={() => toggleAccordion(0)}
              >
                <div className="prose prose-lg text-foreground/80 max-w-none font-rubik">
                  <p>
                    I view every business process as a series of interconnected loops. Most bottlenecks aren't technical; they are structural. I rebuild those workflows using AI to collapse operational costs and increase throughput.
                  </p>
                </div>
              </AccordionItem>

              <AccordionItem
                title="Direct Execution (No 'Theatre')"
                isOpen={openAccordion === 1}
                onToggle={() => toggleAccordion(1)}
              >
                <div className="prose prose-lg text-foreground/80 max-w-none font-rubik">
                  <p>
                    I act as your direct <strong>Agent Operator</strong>. I don't hand you a 50-page strategy deck; I provision the servers, write the system prompts, and manage the model integrations myself. My approach is focused on three pillars:
                  </p>
                  <ul className="list-none pl-0 space-y-4 mt-4">
                    <li className="flex gap-3">
                      <span className="text-primary text-xl shrink-0">→</span>
                      <div>
                        <strong className="text-primary">Architecting Autonomy:</strong>
                        <span className="block mt-1">Building systems that handle rote drafting, scheduling, and research without human intervention.</span>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary text-xl shrink-0">→</span>
                      <div>
                        <strong className="text-primary">Managed Operations:</strong>
                        <span className="block mt-1">Providing ongoing oversight to ensure your AI assistant evolves as fast as the models do.</span>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary text-xl shrink-0">→</span>
                      <div>
                        <strong className="text-primary">Measurable ROI:</strong>
                        <span className="block mt-1">Focusing exclusively on workflows that reclaim at least 10-20 hours of your week.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </AccordionItem>

              <AccordionItem
                title="Data & Privacy Sovereignty"
                isOpen={openAccordion === 2}
                onToggle={() => toggleAccordion(2)}
              >
                <div className="prose prose-lg text-foreground/80 max-w-none font-rubik">
                  <p>
                    In the era of AI, your data is your competitive edge. I build on high-performance, open-standard stacks that ensure you own your logic and your data. No platform taxes, no digital anchors.
                  </p>
                </div>
              </AccordionItem>
            </div>

            {/* CTA */}
            <div className="pt-8">
              <p className="text-lg font-rubik text-foreground/90">
                <strong>Ready to reclaim your time and focus on high-leverage work? </strong>
                <a
                  href="https://calendar.app.google/nAHHwNMfhDvXGv7P7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-bold hover:underline underline-offset-4 transition-all duration-200 hover:gap-3"
                >
                  Provision your system
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </p>
            </div>

            {/* Certifications */}
            {otherCertifications.length > 0 && (
              <div className="pt-8 border-t border-white/10">
                <p className="text-xs font-mono uppercase tracking-widest text-primary/60 mb-4 text-center lg:text-left">Verified Background</p>
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
