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
const ChevronIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
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
    <div className="border border-white/20 rounded-xl overflow-hidden backdrop-blur-sm bg-white/5 transition-all duration-300 hover:bg-white/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-sectionBlue"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg md:text-xl font-bold text-primary pr-4">{title}</h3>
        <span className="text-primary shrink-0">
          <ChevronIcon isOpen={isOpen} />
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef} className="p-4 md:p-5 pt-0 md:pt-0">
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

  // Accordion state - start with first one open
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
    <section id="about-me" className="relative py-12 md:py-24 bg-sectionBlue scroll-mt-20 overflow-hidden">
      <div
        ref={contentRef}
        className={`container mx-auto px-4 md:px-6 scroll-animate relative z-10 ${isContentVisible ? 'is-visible' : ''}`}
      >
        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Left Column - Content */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* Expert Badge */}
            {expertCertification && (
              <div className="flex justify-center lg:justify-start">
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

            {/* Title */}
            <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl text-center lg:text-left">
              About Me
            </h2>

            {/* Brief Intro - Always Visible */}
            <div className="prose prose-lg text-foreground/80 max-w-none font-rubik">
              <p>
                For years, I've watched a recurring scene: well-intentioned leaders invest heavily in new technology, but the output remains flat because the organization's "immune system" treats change as a threat. This results in <strong>"AI Theatre"</strong>—significant activity with zero meaningful ROI.
              </p>
              <p>
                The problem: Most organizations are still run like rigid machines designed for a world that no longer exists. We try to "roll out" AI like it's a new photocopier, but AI isn't prescriptive; it's a journey of constant experimentation.
              </p>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-3 pt-2">
              {/* Accordion 1 */}
              <AccordionItem
                title="How I Help You Stop Running in Place"
                isOpen={openAccordion === 0}
                onToggle={() => toggleAccordion(0)}
              >
                <div className="prose prose-lg text-foreground/80 max-w-none font-rubik">
                  <p>
                    The bottlenecks aren't technical; it's linear mindsets attempting to manage an exponential reality. Most firms treat AI like a standard software rollout, but true adoption requires a culture of continuous experimentation and psychological readiness.
                  </p>
                </div>
              </AccordionItem>

              {/* Accordion 2 */}
              <AccordionItem
                title="How I Help You Move Beyond the 'Theatre'"
                isOpen={openAccordion === 1}
                onToggle={() => toggleAccordion(1)}
              >
                <div className="prose prose-lg text-foreground/80 max-w-none font-rubik">
                  <p>
                    I act as a Fractional Change Architect, helping you upgrade your organisation's "operating system" to achieve 10x growth rather than incremental 10% improvements. My approach focuses on three human pillars:
                  </p>
                  <ul className="list-none pl-0 space-y-4 mt-4">
                    <li className="flex gap-3">
                      <span className="text-primary text-xl shrink-0">→</span>
                      <div>
                        <strong className="text-primary">Identifying High-Readiness Innovators:</strong>
                        <span className="block mt-1">A minority of individuals in your company is naturally wired for uncertainty. Using linguistic behavioral intelligence, I identify "Results" thinkers through their existing communication styles, bypassing friction and politics of traditional surveys.</span>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary text-xl shrink-0">→</span>
                      <div>
                        <strong className="text-primary">Bypassing Organisational Inertia:</strong>
                        <span className="block mt-1">I help seed innovation at the "edge" of your company. By building rapid pilots with your high-readiness people, we secure early wins that justify further investment and stop "talent hoarding" in silos.</span>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary text-xl shrink-0">→</span>
                      <div>
                        <strong className="text-primary">From Linear to Adaptive Leadership:</strong>
                        <span className="block mt-1">I coach leaders to move from "First-Order" (command-and-control) thinking to "Adaptive Intelligence" (EQ). While IQ handles repeatable work, the age of AI requires the emotional maturity to navigate complex, non-linear problem-solving.</span>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary text-xl shrink-0">→</span>
                      <div>
                        <strong className="text-primary">Aligning Transformational Purpose:</strong>
                        <span className="block mt-1">I help craft an Impact-Driven Vision so aspirational that it aligns your team and attracts a wider community, ensuring you stay focused in a world of endless distractions.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </AccordionItem>

              {/* Accordion 3 */}
              <AccordionItem
                title="The Goal: Scale Through Autonomy"
                isOpen={openAccordion === 2}
                onToggle={() => toggleAccordion(2)}
              >
                <div className="prose prose-lg text-foreground/80 max-w-none font-rubik">
                  <p>
                    By implementing distributed authority models and real-time performance dashboards, your teams can operate like independent, high-velocity squads. We stop over-planning for five years and start executing in real-time.
                  </p>
                </div>
              </AccordionItem>
            </div>

            {/* CTA - Always Visible */}
            <div className="pt-6">
              <p className="text-lg font-rubik text-foreground/90">
                <strong>If you are ready to stop running in place and empower the catalysts already sitting in your building, </strong>
                <a
                  href="https://calendar.app.google.com/v2iqrJhw6AqGjE459"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-bold hover:underline underline-offset-4 transition-all duration-200 hover:gap-3"
                >
                  let's talk
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </p>
            </div>

            {/* Other Certifications */}
            {otherCertifications.length > 0 && (
              <div className="pt-4">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-3">
                  {otherCertifications.map((cert) => (
                    <CertificationItem key={cert.id} certification={cert} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative background circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl scale-110 opacity-50" />

              {/* Image container with clipping */}
              <div className="relative w-64 h-80 md:w-80 md:h-[420px] lg:w-96 lg:h-[500px] overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl">
                {/* Gradient overlay for blend effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-sectionBlue/40 via-transparent to-transparent z-10 pointer-events-none" />

                <Image
                  src="/Standing-Photoroom.png"
                  alt="Alex Myers - Fractional Change Architect"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
