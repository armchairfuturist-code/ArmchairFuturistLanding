
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
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52s-.67-.816-.923-.816c-.247 0-.5.074-.665.371-.165.298-.666.816-.666 1.959 0 1.142.688 2.272.787 2.421.099.149 1.408 2.132 3.427 3.023.442.19.789.303 1.061.385.542.16 1.023.149 1.413.092.426-.06.756-.186.992-.372.236-.186.371-.426.446-.666.075-.24.038-.448-.012-.598zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.6c-5.302 0-9.6-4.298-9.6-9.6s4.298-9.6 9.6-9.6 9.6 4.298 9.6 9.6-4.298 9.6-9.6 9.6z"/>
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
