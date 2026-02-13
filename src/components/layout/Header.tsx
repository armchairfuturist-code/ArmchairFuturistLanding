
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu, Mail } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const navItems = [
    { href: '/#strategy', label: 'How I Work' },
    { href: '/#services', label: 'Services' },
    { href: '/#about-me', label: 'Why Alex' },
    { href: '/#thought-leadership', label: 'Insights' },
    { href: 'https://github.com/armchairfuturist-code', label: 'GitHub' },
  ];

  const contactItem = { href: 'mailto:armchairfuturist@gmail.com', label: 'Contact Me' };
  const whatsappItem = { href: 'https://wa.me/15157706902', label: 'WhatsApp' };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image
            src="/img.jpg"
            alt="Site Logo"
            width={32}
            height={32}
            className="rounded-full object-cover border border-border/50"
          />
          <span className="font-bold sm:inline-block font-heading">
            The Armchair Futurist
          </span>
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              {...(item.href.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={contactItem.href}
            className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            aria-label={contactItem.label}
          >
            <Mail className="h-5 w-5" />
          </a>
          <Button asChild size="sm">
            <a href="https://calendar.app.google/nAHHwNMfhDvXGv7P7" target="_blank" rel="noopener noreferrer">
              Start Your Trust Audit.
            </a>
          </Button>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <SheetHeader>
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 p-4">
                <Link href="/" className="flex items-center space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/img.jpg"
                      alt="Site Logo"
                      width={32}
                      height={32}
                      className="rounded-full object-cover border border-border/50"
                    />
                    <span className="font-bold font-heading text-base">The Armchair Futurist</span>
                  </div>
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block text-sm font-medium text-foreground/90 transition-colors hover:text-primary"
                    {...(item.href.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex items-center gap-4">
                  <a
                    href={contactItem.href}
                    className="flex items-center gap-2 text-sm font-medium text-foreground/90 transition-colors hover:text-primary"
                    aria-label={contactItem.label}
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  <a
                    href={whatsappItem.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-foreground/90 transition-colors hover:text-primary"
                    aria-label={whatsappItem.label}
                  >
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-5 w-5">
                      <title>WhatsApp</title>
                      <path d="M12.04 2.02c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.42 1.29 4.88L2.02 22l5.25-1.38c1.38.77 2.95 1.18 4.59 1.18h.01c5.46 0 9.9-4.44 9.9-9.9a9.9 9.9 0 0 0-9.9-9.9zM12.04 21.03h-.01c-1.6 0-3.15-.43-4.52-1.23l-.32-.19-3.35.88.9-3.27-.21-.33c-.86-1.4-1.38-3.03-1.38-4.76 0-4.9 3.98-8.88 8.88-8.88a8.88 8.88 0 0 1 8.88 8.88c0 4.9-3.98 8.88-8.88 8.88zm4.52-6.2c-.25-.12-1.47-.72-1.7-.82s-.39-.12-.56.12c-.17.25-.64.82-.79.99-.15.17-.3.19-.56.07s-1.06-.39-2.02-1.25c-.75-.67-1.25-1.5-1.4-1.75s-.02-.38.1-.51c.11-.11.25-.29.37-.44s.17-.25.25-.41.04-.3-.02-.42c-.06-.12-.56-1.34-.76-1.84s-.4-.42-.56-.42-.3 0-.46.01c-.17 0-.42.06-.64.3s-.86.84-.86 2.05c0 1.2.88 2.37 1 2.54s1.75 2.67 4.24 3.73c.58.25 1.04.4 1.4.52.58.17 1.1.15 1.51.09.46-.06 1.47-.6 1.68-1.18s.21-1.09.15-1.18c-.06-.1-.2-.16-.44-.28z" />
                    </svg>
                  </a>
                </div>
                <Button asChild className="w-full">
                  <a href="https://calendar.app.google/nAHHwNMfhDvXGv7P7" target="_blank" rel="noopener noreferrer">
                    Start Your Trust Audit.
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
