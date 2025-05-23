
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, BotMessageSquare } from 'lucide-react'; // Restored BotMessageSquare
import Image from 'next/image'; // Keeping Image for mobile menu

export default function Header() {
  const navItems = [
    { href: '/#how-we-help', label: 'How I Help' },
    { href: '/#services', label: 'Services' },
    { href: '/#about-me', label: 'About' },
    { href: '/#thought-leadership', label: 'Insights' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          {/* Reverted to BotMessageSquare icon */}
          <BotMessageSquare className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block font-heading">
            Armchair Futurist
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
            <a href="https://cal.com/alex-myers/discovery" target="_blank" rel="noopener noreferrer">
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
                <Link href="/" className="flex items-center space-x-2 mb-4">
                  {/* Using Hero.webp in mobile menu as it was previously */}
                  <Image
                    src="/Hero.webp"
                    alt="Alex Myers logo"
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                  <span className="font-bold font-heading">Armchair Futurist</span>
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
                  <a href="https://cal.com/alex-myers/discovery" target="_blank" rel="noopener noreferrer">
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
