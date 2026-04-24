import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu, Brain, BookOpen, BarChart3, FileText } from 'lucide-react';
import Image from 'next/image';
import { CALENDAR_URL } from '@/lib/constants';

export default function Header() {
  const navItems = [
    { href: '/#services', label: 'Services' },
    { href: '/#case-studies', label: 'Case Studies' },
    { href: '/#roi-calculator', label: 'ROI Calculator' },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/#about-me', label: 'About', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-masthead-black text-white">
      {/* Main navigation - PlayStation style */}
      <div className="bg-masthead-black">
        <div className="container max-w-screen-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/img.jpg"
              alt="Site Logo"
              width={32}
              height={32}
              className="rounded-full object-cover border border-white/20"
            />
            <span className="font-bold text-base" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
              The Armchair Futurist
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-white hover:text-link-hover-blue transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/assessment"
              className="text-sm text-white hover:text-link-hover-blue transition-colors"
            >
              Free Assessment
            </Link>
            <Button
              asChild
              className="bg-ps-blue text-white hover:bg-ps-cyan hover:scale-110 transition-all duration-180 rounded-full"
            >
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                Book Call
              </a>
            </Button>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-ps-cyan">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px] bg-masthead-black text-white">
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
                        className="rounded-full object-cover border border-white/20"
                      />
                      <span className="font-bold text-base" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                        The Armchair Futurist
                      </span>
                    </div>
                  </Link>
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-ps-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ps-blue focus-visible:ring-offset-2 focus-visible:rounded-sm"
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/assessment"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-ps-blue hover:text-ps-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ps-blue focus-visible:ring-offset-2 focus-visible:rounded-sm"
                  >
                    <Brain className="h-4 w-4" />
                    Free AI Assessment
                  </Link>
                  <Button asChild className="w-full bg-ps-blue text-white hover:bg-ps-cyan hover:scale-110 transition-all duration-180 rounded-full">
                    <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                      Book a Free Strategy Call
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
