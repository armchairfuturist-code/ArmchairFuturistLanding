
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu, Mail } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const navItems = [
    { href: '/#how-i-work', label: 'How I Work' },
    { href: '/#services', label: 'Services' },
    { href: '/#about-me', label: 'Why Alex' },
    { href: '/#thought-leadership', label: 'Insights' },
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
              Schedule a Call
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
                      <path d="M12.04 0C5.4 0 0 5.4 0 12.04c0 2.2.6 4.28 1.68 6.09l-1.68 6.13 6.3-1.65A11.95 11.95 0 0 0 12.04 24c6.64 0 12.04-5.4 12.04-12.04S18.68 0 12.04 0zm0 21.9c-1.85 0-3.6-.5-5.1-1.48l-.36-.21-3.8 1 1.02-3.7-.23-.38A9.85 9.85 0 0 1 2.14 12.04c0-5.45 4.43-9.88 9.9-9.88s9.9 4.43 9.9 9.88-4.43 9.86-9.9 9.86zm5.55-7.3c-.3-.15-1.76-.87-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-1 1.16-.18.2-.36.22-.66.07-.3-.15-1.25-.46-2.38-1.48-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.04-.37-.03-.52s-.67-.81-.92-.81c-.24 0-.5.08-.66.38-.17.3-.57.67-.57 1.62 0 .96.58 1.88.66 2.03.08.15 1.15 1.84 2.8 2.52.38.16.68.25.92.33.42.15.82.12 1.12.08.35-.05 1.1-.45 1.26-.9.15-.43.15-.8.1-.88-.05-.08-.2-.13-.44-.27z"/>
                    </svg>
                  </a>
                </div>
                 <Button asChild className="w-full">
                  <a href="https://calendar.app.google/nAHHwNMfhDvXGv7P7" target="_blank" rel="noopener noreferrer">
                    Schedule a Call
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
