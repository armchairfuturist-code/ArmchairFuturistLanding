
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
        className={`container mx-auto px-4 md:px-6 scroll-animate ${isContentVisible ? 'is-visible' : ''
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
                For years, I’ve watched a recurring scene: well-intentioned leaders invest heavily in new technology, but the output remains flat because the organization’s "immune system" treats change as a threat. This results in "AI Theatre"—significant activity with zero meaningful ROI.
              </p>
              <p>
                The problem: Most organizations are still run like rigid machines designed for a world that no longer exists. We try to "roll out" AI like it’s a new photocopier, but AI isn't prescriptive; it’s a journey of constant experimentation.
              </p>

              <p className="text-xl font-bold text-primary pt-4">How I help you stop running in place</p>
              <p>
                The bottlenecks aren't technical; it’s linear mindsets attempting to manage an exponential reality. Most firms treat AI like a standard software rollout, but true adoption requires a culture of continuous experimentation and psychological readiness.
              </p>

              <p className="font-bold text-lg text-primary">How I help you move beyond the "Theatre"</p>
              <p>
                I act as a Fractional Change Architect, helping you upgrade your organisation’s "operating system" to achieve 10x growth rather than incremental 10% improvements. My approach focuses on three human pillars:
              </p>
              <ul className="list-disc pl-5 space-y-3">
                <li><strong>Identifying High-Readiness Innovators:</strong> A minority of individuals in your company is naturally wired for uncertainty. Using linguistic behavioral intelligence, I identify "Results" thinkers through their existing communication styles, bypassing friction and politics of traditional surveys.</li>
                <li><strong>Bypassing Organisational Inertia:</strong> I help seed innovation at the "edge" of your company. By building rapid pilots with your high-readiness people, we secure early wins that justify further investment and stop "talent hoarding" in silos.</li>
                <li><strong>From Linear to Adaptive Leadership:</strong> I coach leaders to move from "First-Order" (command-and-control) thinking to "Adaptive Intelligence" (EQ). While IQ handles repeatable work, the age of AI requires the emotional maturity to navigate complex, non-linear problem-solving.</li>
                <li><strong>Aligning Transformational Purpose:</strong> I help craft an Impact-Driven Vision so aspirational that it aligns your team and attracts a wider community, ensuring you stay focused in a world of endless distractions.</li>
              </ul>

              <p className="font-bold text-lg text-primary pt-4">The Goal: Scale Through Autonomy</p>
              <p>
                By implementing distributed authority models and real-time performance dashboards, your teams can operate like independent, high-velocity squads. We stop over-planning for five years and start executing in real-time.
              </p>

              <p className="pt-6"><strong>If you are ready to stop running in place and empower the catalysts already sitting in your building, <a href="https://calendar.app.google.com/v2iqrJhw6AqGjE459" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">let’s talk</a>.</strong></p>
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
