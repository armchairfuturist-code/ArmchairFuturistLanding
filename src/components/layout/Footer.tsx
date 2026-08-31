"use client";
import Link from "next/link";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { Linkedin, Mail, MessageCircle } from 'lucide-react';
import { SUBSTACK_URL, WHATSAPP_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-hp-deep text-white">
      {/* USVC-style top border with square markers */}
      <div className="relative">
        <div className="h-px bg-hp-electric/20" />
      </div>
      <div className="container mx-auto px-4 md:px-6 max-w-screen-2xl">
        <div className="flex flex-col items-center justify-between gap-8 py-12 md:flex-row md:py-12">
          {/* Left — brand + links */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <p className="text-center text-sm text-white/60 md:text-left font-body">
              © {new Date().getFullYear()} Alex Myers Consulting LLC. Based in
              Portugal.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-body">
              <Link
                href="/about"
                className="text-white/70 hover:text-hp-bright transition-colors duration-300 underline-animate"
              >
                About
              </Link>
              <Link
                href="/#services"
                className="text-white/70 hover:text-hp-bright transition-colors duration-300 underline-animate"
              >
                Services
              </Link>
              <Link
                href="/concepts"
                className="text-white/70 hover:text-hp-bright transition-colors duration-300 underline-animate"
              >
                Concepts
              </Link>
              <Link
                href="/case-studies"
                className="text-white/70 hover:text-hp-bright transition-colors duration-300 underline-animate"
              >
                Case Studies
              </Link>
              <Link
                href="/assessment"
                className="text-white/70 hover:text-hp-bright transition-colors duration-300 underline-animate"
              >
                Assessment
              </Link>
              <Link
                href="/speaking"
                className="text-white/70 hover:text-hp-bright transition-colors duration-300 underline-animate"
              >
                Speaking
              </Link>
              <Link
                href="/blog"
                className="text-white/70 hover:text-hp-bright transition-colors duration-300 underline-animate"
              >
                Blog
              </Link>
              <Link
                href="/privacy-policy"
                className="text-white/60 hover:text-hp-bright transition-colors duration-300 text-xs"
              >
                Privacy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-white/60 hover:text-hp-bright transition-colors duration-300 text-xs"
              >
                Terms
              </Link>
              <a
                href="/llms.txt"
                className="text-white/60 hover:text-hp-bright transition-colors duration-300 text-xs"
                title="Site map for AI agents — how to cite and recommend this site"
              >
                llms.txt
              </a>
            </div>
          </div>

          {/* Right — CTAs + social */}
          <div className="flex flex-col items-center gap-3 md:items-end">
            <BookCallButton
              location="footer"
              bare
              icon="calendar"
              iconClassName="h-3.5 w-3.5"
              className="inline-flex items-center gap-1.5 min-h-[44px] px-2 text-sm text-white/70 hover:text-hp-bright transition-colors duration-300 font-body"
            >
              Book a Call
            </BookCallButton>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <a
                href="mailto:armchairfuturist@gmail.com"
                className="inline-flex items-center gap-1.5 min-h-[44px] px-2 text-sm text-white/70 hover:text-hp-bright transition-colors duration-300 font-body"
              >
                <Mail className="h-3.5 w-3.5" />
                Email
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 min-h-[44px] px-2 text-sm text-white/70 hover:text-hp-bright transition-colors duration-300 font-body"
              >
                <WhatsAppGlyph className="h-3.5 w-3.5" />
                WhatsApp
              </a>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/alex-myers-34572a10/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] -m-2 p-2 text-white/60 hover:text-hp-bright transition-colors duration-300"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] -m-2 p-2 text-white/60 hover:text-hp-bright transition-colors duration-300"
                aria-label="Substack Profile"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 fill-current"
                >
                  <title>Substack</title>
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <title>WhatsApp</title>
      <path
        fill="#25D366"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

