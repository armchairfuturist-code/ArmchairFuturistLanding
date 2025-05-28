
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const navItems = [
    { href: '/#how-i-work', label: 'How I Work' },
    { href: '/#services', label: 'Services' },
    { href: '/#about-me', label: 'About Alex' },
    { href: '/#thought-leadership', label: 'Insights' },
    { href: 'mailto:armchairfuturist@gmail.com', label: 'Contact Me' },
  ];

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
