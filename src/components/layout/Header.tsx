
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
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52s-.67-.816-.917-.816c-.247 0-.52.074-.669.371-.148.297-.568.666-.568 1.62 0 .953.586 1.886.669 2.034.083.149 1.157 1.848 2.803 2.532.38.16.687.26.912.336.435.144.823.123 1.125.075.347-.049 1.107-.456 1.262-.897.155-.44.155-.815.105-.896-.05-.08-.198-.124-.446-.273zM12.075.0C5.425.0.125 5.302.125 11.95S5.425 23.9 12.075 23.9c1.789 0 3.48-.389 5.02-1.138l5.34 1.14-1.16-5.18c.8-1.57.12-3.37.12-5.22 0-6.648-5.3-11.95-11.85-11.95z"/>
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
