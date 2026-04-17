import Link from 'next/link';
import { Linkedin, Mail, Calendar } from 'lucide-react';
import { SUBSTACK_URL, CALENDAR_URL } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main footer */}
        <div className="flex flex-col items-center justify-between gap-8 py-10 md:flex-row md:py-8">
          {/* Left — brand + links */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © {new Date().getFullYear()} Alex Myers Consulting LLC. Based in Portugal.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              <Link href="/#services" className="text-muted-foreground hover:text-foreground transition-colors">
                Services
              </Link>
              <Link href="/#case-studies" className="text-muted-foreground hover:text-foreground transition-colors">
                Case Studies
              </Link>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
            </div>
          </div>

          {/* Right — CTAs + social */}
          <div className="flex flex-col items-center gap-3 md:items-end">
            <div className="flex items-center gap-3">
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <Calendar className="h-3.5 w-3.5" />
                Book a Call
              </a>
              <a
                href="mailto:armchairfuturist@gmail.com"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
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
