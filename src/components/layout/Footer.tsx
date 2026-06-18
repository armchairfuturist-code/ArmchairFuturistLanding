"use client";
import Link from "next/link";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { Linkedin, Mail, MessageCircle } from 'lucide-react';
import { SUBSTACK_URL } from "@/lib/constants";

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
                href="/#services"
                className="text-white/70 hover:text-hp-electric transition-colors duration-300 underline-animate"
              >
                Services
              </Link>
              <Link
                href="/#case-studies"
                className="text-white/70 hover:text-hp-electric transition-colors duration-300 underline-animate"
              >
                Case Studies
              </Link>
              <Link
                href="/blog"
                className="text-white/70 hover:text-hp-electric transition-colors duration-300 underline-animate"
              >
                Blog
              </Link>
              <Link
                href="/privacy-policy"
                className="text-white/60 hover:text-hp-electric transition-colors duration-300 text-xs"
              >
                Privacy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-white/60 hover:text-hp-electric transition-colors duration-300 text-xs"
              >
                Terms
              </Link>
            </div>
          </div>

          {/* Right — CTAs + social */}
          <div className="flex flex-col items-center gap-3 md:items-end">
            <BookCallButton
              location="footer"
              bare
              icon="calendar"
              iconClassName="h-3.5 w-3.5"
              className="inline-flex items-center gap-1.5 min-h-[44px] px-2 text-sm text-white/70 hover:text-hp-electric transition-colors duration-300 font-body"
            >
              Book a Call
            </BookCallButton>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <a
                href="mailto:armchairfuturist@gmail.com"
                className="inline-flex items-center gap-1.5 min-h-[44px] px-2 text-sm text-white/70 hover:text-hp-electric transition-colors duration-300 font-body"
              >
                <Mail className="h-3.5 w-3.5" />
                Email
              </a>
              <a
                href="https://wa.me/15157706902"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 min-h-[44px] px-2 text-sm text-white/70 hover:text-hp-electric transition-colors duration-300 font-body"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/alex-myers-34572a10/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] -m-2 p-2 text-white/60 hover:text-hp-electric transition-colors duration-300"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] -m-2 p-2 text-white/60 hover:text-hp-electric transition-colors duration-300"
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
