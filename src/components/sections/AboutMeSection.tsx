"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {ArrowRight} from 'lucide-react';
import { Linkedin } from 'lucide-react';
import type { Certification } from "@/types";
import { BlurFade } from "@/components/ui/blur-fade";
import { motion } from "motion/react";

const certificationsData: Certification[] = [
  {
    id: "genaiExpert",
    name: "GenAI Academy Expert",
    issuerInitials: "GAIE",
    link: "https://thegenaiacademy.com/expert-hub/alex-myers/",
    imageSrc: "/expert.png",
  },
  {
    id: "ccmp",
    name: "Certified Change Management Professional",
    issuerInitials: "CCMP",
    imageSrc: "/CCMP.png",
  },
  {
    id: "flta",
    name: "Certified Futurist & Long-Term Analyst",
    issuerInitials: "FLTA",
    imageSrc: "/Futurist.jpg",
  },
  {
    id: "cebp",
    name: "Certified Enterprise Blockchain Professional",
    issuerInitials: "CEBP",
    imageSrc: "/CEBP.png",
  },
  {
    id: "psm",
    name: "Professional Scrum Master",
    issuerInitials: "PSM",
    imageSrc: "/PSM.png",
  },
  {
    id: "pal",
    name: "Professional Agile Leadership",
    issuerInitials: "PAL",
    imageSrc: "/PAL.png",
  },
];

const CertificationItem: React.FC<{ certification: Certification }> = ({
  certification,
}) => {
  const content = (
    <>
      {certification.imageSrc ? (
        <Image
          src={certification.imageSrc}
          alt={`${certification.name} badge`}
          width={32}
          height={32}
          className="object-contain shrink-0 rounded-sm"
        onError={(e) => { e.currentTarget.style.display = "none"; }} />
      ) : (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/20 text-primary-foreground/70">
          <span className="font-semibold text-xs">
            {certification.issuerInitials}
          </span>
        </div>
      )}
      <p className="text-xs text-primary-foreground/80 text-left">
        {certification.name}
      </p>
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

export default function AboutMeSection() {
  const expertCertification = certificationsData.find(
    (c) => c.id === "genaiExpert",
  );
  const otherCertifications = certificationsData.filter(
    (c) => c.id !== "genaiExpert",
  );

  return (
    <section
      id="about-me"
      className="relative py-12 md:py-24 bg-usvc-navy text-primary-foreground scroll-mt-20 overflow-hidden"
    >
      {/* Desktop portrait — absolute, bleeds to right edge of section */}
      <div className="hidden lg:block absolute top-0 right-0 w-[48%] bottom-0 z-0 pointer-events-none">
        <Image
          src="/alexheadshot-nobg.png"
          alt=""
          fill
          className="object-contain object-bottom"
          style={{
            maskImage: "linear-gradient(to top, black 70%, transparent 95%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 70%, transparent 95%)",
          }}
          loading="lazy"
          sizes="48vw"
        />
      </div>

      <motion.div
        className="container mx-auto px-4 md:px-6 relative z-10 w-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex flex-col">
              {/* Expert Badge */}
              {expertCertification && (
                <BlurFade inView delay={0.1}>
                  <div className="flex justify-center lg:justify-start mb-6">
                    <a
                      key={expertCertification.id}
                      href={expertCertification.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex flex-col items-center p-2 rounded-md bg-white/10 backdrop-blur-sm shadow-md ring-2 ring-usvc-blue/35 hover:ring-usvc-blue hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-usvc-blue cursor-pointer"
                      aria-label={`${expertCertification.name} (opens in new tab)`}
                    >
                      {expertCertification.imageSrc ? (
                        <Image
                          src={expertCertification.imageSrc}
                          alt={`${expertCertification.name} badge`}
                          width={80}
                          height={80}
                          className="object-contain shrink-0 rounded-md"
                        onError={(e) => { e.currentTarget.style.display = "none"; }} />
                      ) : (
                        <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-md bg-white/20 text-primary-foreground/70">
                          <span className="font-semibold text-sm">
                            {expertCertification.issuerInitials}
                          </span>
                        </div>
                      )}
                      <span className="mt-2 text-[11px] font-mono uppercase tracking-widest text-usvc-blue/75 group-hover:text-usvc-blue transition-colors">
                        Click to verify
                      </span>
                    </a>
                  </div>
                </BlurFade>
              )}

              {/* Mobile Image */}
              <div className="lg:hidden relative w-full h-[320px] mb-8">
                <Image
                  src="/alexheadshot-nobg.png"
                  alt="Alex Myers"
                  fill
                  className="object-contain object-bottom"
                  style={{
                    maskImage:
                      "linear-gradient(to top, black 65%, transparent 95%)",
                    WebkitMaskImage:
                      "linear-gradient(to top, black 65%, transparent 95%)",
                  }}
                  loading="lazy"
                  sizes="100vw"
                />
              </div>

              <BlurFade inView delay={0.2}>
                <div className="mb-6 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-usvc-blue">
                      Who Is Alex Myers?
                    </h2>
                    <a
                      href="https://www.linkedin.com/in/alex-myers-34572a10/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-usvc-blue/55 hover:text-usvc-blue transition-colors"
                      aria-label="Alex Myers LinkedIn Profile"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                  <p className="text-sm text-usvc-blue/60 font-mono mt-1 uppercase tracking-widest">
                    AI Guide
                  </p>
                </div>
              </BlurFade>

              <div className="space-y-5 md:space-y-6">
                <p className="text-base md:text-lg text-primary-foreground/85 font-sans leading-relaxed">
                  The questions that keep leaders up at 2 AM aren&apos;t about which API to use. They&apos;re about whether they&apos;ll still matter five years from now. That&apos;s not a technology problem. I speak two languages: organizational architecture and human experience. The space between them is where real transformation lives.
                </p>

                <p className="text-base md:text-lg text-primary-foreground/85 font-sans leading-relaxed">
                  Clarity isn&apos;t about knowing everything. It&apos;s about knowing what actually matters to you. When you fix your mental model, the overwhelm dissolves. You stop reacting to noise and start making decisions from genuine conviction.
                </p>

                <p className="text-base md:text-lg text-primary-foreground/85 font-sans leading-relaxed">
                  My work draws on systems thinking, group dynamics, and a knack for asking the questions nobody else will. I tell you what I actually think, not what you want to hear. That&apos;s the foundation of solutions that stick.
                </p>

                <h3 className="text-lg md:text-xl font-bold text-usvc-blue pt-2">
                  For the Executive:
                </h3>
                <p className="text-base md:text-lg text-primary-foreground/85 font-sans leading-relaxed">
                  The edge you&apos;re standing at isn&apos;t just technological. It&apos;s structural, cultural, and deeply human. I help you see the whole field, not just the tools — so your organization moves with intention instead of reacting to every shift.
                </p>

                <h3 className="text-lg md:text-xl font-bold text-usvc-blue pt-2">
                  For the Individual:
                </h3>
                <p className="text-base md:text-lg text-primary-foreground/85 font-sans leading-relaxed">
                  I help you find your footing on shifting ground. How do you live optimistically when intelligence is becoming a cheap utility? How do you reclaim your time for the work that is uniquely yours?
                </p>

                <p className="flex items-center gap-2 text-base md:text-lg text-usvc-blue font-bold font-sans">
                  <ArrowRight className="w-4 h-4 shrink-0" />
                  Forget prediction. The goal is to move you from &ldquo;what
                  happens next&rdquo; to &ldquo;here is what I am
                  building.&rdquo;
                </p>

                {/* How I Work — absorbed from WhyWorkWithMeSection */}
                <div className="pt-6 mt-6 border-t border-white/10">
                  <p className="text-xs font-mono uppercase tracking-widest text-usvc-blue/70 mb-4">
                    How I Work
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="shrink-0 w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-primary-foreground">First principles, not tool tutorials</p>
                        <p className="text-sm text-primary-foreground/75 leading-relaxed mt-1">I teach you the underlying logic so you can evaluate any new tool yourself, long after our work together ends.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="shrink-0 w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-primary-foreground">Teach you to fish, not fish for you</p>
                        <p className="text-sm text-primary-foreground/75 leading-relaxed mt-1">Every engagement leaves you more capable, never more dependent. The measure of my work is how little you need me next.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="shrink-0 w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-primary-foreground">Your data, your stack, your call</p>
                        <p className="text-sm text-primary-foreground/75 leading-relaxed mt-1">Open-standard infrastructure, no platform lock-in, no vendor tax. You own your logic, your data, and your infrastructure.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — contains portrait and certifications */}
          <div className="hidden lg:block lg:col-span-6 relative">
            {/* Certifications - positioned in the light space below the image */}
            {otherCertifications.length > 0 && (
              <motion.div
                className="absolute bottom-12 right-8 max-w-md bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <p className="text-xs font-mono uppercase tracking-widest text-usvc-blue/70 mb-3">
                  Verified Background
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {otherCertifications.map((cert) => (
                    <CertificationItem key={cert.id} certification={cert} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile-only certifications (below content) */}
        {otherCertifications.length > 0 && (
          <motion.div
            className="lg:hidden mt-10 pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <p className="text-xs font-mono uppercase tracking-widest text-usvc-blue/60 mb-4 text-center lg:text-left">
              Verified Background
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3">
              {otherCertifications.map((cert) => (
                <CertificationItem key={cert.id} certification={cert} />
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
