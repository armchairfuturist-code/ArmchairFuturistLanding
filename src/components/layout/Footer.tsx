import Link from 'next/link';
import { Linkedin, Mail, Calendar } from 'lucide-react';
import { SUBSTACK_URL, CALENDAR_URL } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-ps-blue text-white">
      <div className="container mx-auto px-4 md:px-6 max-w-screen-2xl">
        <div className="flex flex-col items-center justify-between gap-8 py-12 md:flex-row md:py-10">
          {/* Left — brand + links */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <p className="text-center text-sm text-white md:text-left" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
              © {new Date().getFullYear()} Alex Myers Consulting LLC. Based in Portugal.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <Link href="/#services" className="text-white hover:text-ps-cyan transition-colors">
                Services
              </Link>
              <Link href="/#case-studies" className="text-white hover:text-ps-cyan transition-colors">
                Case Studies
              </Link>
              <Link href="/blog" className="text-white hover:text-ps-cyan transition-colors">
                Blog
              </Link>
              <Link href="/privacy-policy" className="text-white hover:text-ps-cyan transition-colors">
                Privacy
              </Link>
              <Link href="/terms-of-service" className="text-white hover:text-ps-cyan transition-colors">
                Terms
              </Link>
            </div>
          </div>

          {/* Right — CTAs + social */}
          <div className="flex flex-col items-center gap-3 md:items-end">
            <div className="flex items-center gap-4">
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-white hover:text-ps-cyan transition-colors"
                style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
              >
                <Calendar className="h-3.5 w-3.5" />
                Book a Call
              </a>
              <a
                href="mailto:armchairfuturist@gmail.com"
                className="inline-flex items-center gap-1.5 text-sm text-white hover:text-ps-cyan transition-colors"
                style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
              >
                <Mail className="h-3.5 w-3.5" />
                Email
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/alex-myers-34572a10/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-ps-cyan transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-ps-cyan transition-colors"
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
