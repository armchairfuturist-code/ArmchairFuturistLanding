import Link from 'next/link';
import { Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-20 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Alex Myers Consulting LLC. Based in Portugal | Founded 2023.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground">
            Terms
          </Link>
          <a
            href="https://www.linkedin.com/in/alexmyers/" // Replace with actual LinkedIn profile URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}