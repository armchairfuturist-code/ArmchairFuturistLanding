"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Linkedin, ArrowRight } from 'lucide-react';
import type { Certification } from '@/types';

const certificationsData: Certification[] = [
  { id: "genaiExpert", name: "GenAI Academy Expert", issuerInitials: "GAIE", link: "https://thegenaiacademy.com/expert-hub/alex-myers/", imageSrc: "/expert.png" },
  { id: "ccmp", name: "Certified Change Management Professional", issuerInitials: "CCMP", imageSrc: "/CCMP.png" },
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
        className="w-full flex items-center justify-between py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded group"
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
    <section id="about-me" className="relative py-12 md:py-24 bg-sectionBlue scroll-mt-20 overflow-hidden">

      {/* Desktop portrait — absolute, bleeds to right edge of section */}
      <div className="hidden lg:block absolute top-0 right-0 w-[48%] bottom-0 z-0 pointer-events-none">
        <Image
          src="/alexheadshot-nobg.png"
          alt=""
          fill
          className="object-contain object-right-top"
          style={{
            maskImage: 'linear-gradient(to bottom, black 55%, transparent 88%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 88%)',
          }}
          loading="lazy"
          sizes="48vw"
        />
      </div>

      <div
        ref={contentRef}
        className={`container mx-auto px-4 md:px-6 relative z-10 w-full scroll-animate ${isContentVisible ? 'is-visible' : ''}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-center">

          {/* Left Column — text safely within the left 50% on desktop */}
          <div className="lg:col-span-6 space-y-4">

            <div className="flex flex-col">
              {/* Expert Badge */}
              {expertCertification && (
                <div className="flex justify-center lg:justify-start mb-6">
                  <a
                    key={expertCertification.id}
                    href={expertCertification.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex flex-col items-center p-2 rounded-md bg-white/10 backdrop-blur-sm shadow-md ring-2 ring-primary/35 hover:ring-primary hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                    aria-label={`${expertCertification.name} (opens in new tab)`}
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
                    <span className="mt-2 text-[11px] font-mono uppercase tracking-widest text-primary/75 group-hover:text-primary transition-colors">
                      Click to verify
                    </span>
                  </a>
                </div>
              )}

              {/* Mobile Image — transparent cutout on sectionBlue */}
              <div className="lg:hidden relative w-full h-[320px] mb-8">
                <Image
                  src="/alexheadshot-nobg.png"
                  alt="Alex Myers"
                  fill
                  className="object-contain object-top"
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                  }}
                  loading="lazy"
                  sizes="100vw"
                />
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <h2 className="font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl text-center lg:text-left">
                  About Alex
                </h2>
                <a
                  href="https://www.linkedin.com/in/alex-myers-34572a10/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary/55 hover:text-primary transition-colors"
                  aria-label="Alex Myers LinkedIn Profile"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>

              <div className="space-y-5 md:space-y-6">
                <p className="text-base md:text-lg text-foreground/80 font-sans leading-relaxed">
                  Most people are exhausted by AI because they&apos;re trying to track a moving target. They see a tidal wave of new apps and feel an obligation to keep up. That pressure is a choice, and usually, it&apos;s the wrong one.
                </p>

                <p className="text-base md:text-lg text-foreground/80 font-sans leading-relaxed">
                  I don&apos;t teach people how to use more tools. I help them change how they see the landscape.
                </p>

                <p className="text-base md:text-lg text-foreground/80 font-sans leading-relaxed">
                  When you fix your mental model, the overwhelm disappears. You stop reacting to the noise and start orienting toward agency.
                </p>

                <h3 className="text-lg md:text-xl font-bold text-primary pt-2">For the Executive:</h3>
                <p className="text-base md:text-lg text-foreground/80 font-sans leading-relaxed">
                  Future leadership requires being bilingual. You have to speak the language of organizational design and the language of AI logic in the same breath. I help you bridge that gap so your firm can actually compound its gains rather than just chasing the next demo.
                </p>

                <h3 className="text-lg md:text-xl font-bold text-primary pt-2">For the Individual:</h3>
                <p className="text-base md:text-lg text-foreground/80 font-sans leading-relaxed">
                  I help you find your footing. We work on the questions that matter: How do you live optimistically in a world where intelligence is becoming a cheap utility? How do you reclaim your time for the work that is uniquely yours?
                </p>

                <p className="flex items-center gap-2 text-base md:text-lg text-primary font-bold font-sans">
                  <ArrowRight className="w-4 h-4 shrink-0" />
                  This isn&apos;t about prediction. It&apos;s about moving from a state of &ldquo;what happens next&rdquo; to &ldquo;here is what I am building.&rdquo;
                </p>
              </div>
            </div>

          </div>

          {/* Right Column — spacer for absolute portrait */}
          <div className="hidden lg:block lg:col-span-6" aria-hidden="true" />
        </div>

        {/* Certifications */}
        {otherCertifications.length > 0 && (
          <div className="mt-10 pt-8 border-t border-white/10">
            <p className="text-xs font-mono uppercase tracking-widest text-primary/60 mb-4 text-center lg:text-left">Verified Background</p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3">
              {otherCertifications.map((cert) => (
                <CertificationItem key={cert.id} certification={cert} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
