"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookCallButton } from "@/components/ui/BookCallButton";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, FileText, MessageCircle, Github } from 'lucide-react';
import Image from "next/image";
import { WHATSAPP_URL } from "@/lib/constants";

export default function Header() {
  const navItems = [
    { href: "/#ai-guidance", label: "Coaching" },
    { href: "/#services", label: "Services" },
    { href: "/#case-studies", label: "Case Studies" },
    { href: "/#roi-calculator", label: "ROI Calculator" },
    { href: "/blog", label: "Blog" },
    { href: "/#about-me", label: "About", icon: FileText },
    { href: "https://github.com/armchairfuturist-code", label: "GitHub", icon: Github, external: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-ink text-white">
      {/* Merged PlayStation + USVC navigation */}
      {/* Black backdrop at every scroll position — PlayStation convention */}
      <div className="bg-ink border-b border-[#b2d5ff]/10">
        <div className="container max-w-screen-2xl mx-auto px-4 h-13 flex items-center justify-between">
          {/* Logo — left-aligned (USVC-style) */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/img.jpg"
              alt=""
              width={32}
              height={32}
              className="rounded-full object-cover border border-white/20"
            />
            <span className="font-medium text-sm tracking-tight text-white font-display">
              The Armchair Futurist
            </span>
          </Link>

          {/* Nav links — center (USVC-style layout) */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-[400] text-white/80 hover:text-hp-electric transition-colors duration-300 underline-animate"
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-[400] text-white/80 hover:text-hp-electric transition-colors duration-300 underline-animate"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTAs — right-aligned (USVC-style) */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/assessment"
              className="text-sm text-white/70 hover:text-hp-electric transition-colors duration-300"
            >
              Free Assessment
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] -m-2 p-2 text-white/70 hover:text-hp-electric transition-colors duration-300"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <BookCallButton location="header_desktop" size="default" variant="default">
              Book Call
            </BookCallButton>
          </div>

          {/* Mobile — compact CTAs always visible, plus hamburger for nav */}
          <div className="md:hidden flex items-center gap-1">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Alex on WhatsApp"
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] -m-1 p-2 text-white/80 hover:text-hp-electric transition-colors duration-300"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <BookCallButton
              location="header_mobile_compact"
              size="sm"
              variant="default"
              icon="none"
              className="text-xs px-3 h-9 min-h-[36px]"
            >
              Book
            </BookCallButton>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-hp-electric h-11 w-11 min-h-[44px] min-w-[44px]"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[260px] sm:w-[300px] bg-ink text-white border-l border-[#b2d5ff]/20"
              >
                <SheetHeader>
                  <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 p-4">
                  <Link href="/" className="flex items-center space-y-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <Image
                        src="/img.jpg"
                        alt=""
                        width={32}
                        height={32}
                        className="rounded-full object-cover border border-white/20"
                      />
                      <span className="font-medium text-sm tracking-tight text-white font-display">
                        The Armchair Futurist
                      </span>
                    </div>
                  </Link>
                  {navItems.map((item) =>
                    item.external ? (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-[400] text-white/80 hover:text-hp-electric transition-colors"
                      >
                        {item.icon && <item.icon className="h-4 w-4" />}
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="inline-flex items-center gap-2 text-sm font-[400] text-white/80 hover:text-hp-electric transition-colors"
                      >
                        {item.icon && <item.icon className="h-4 w-4" />}
                        {item.label}
                      </Link>
                    )
                  )}
                  <Link
                    href="/assessment"
                    className="inline-flex items-center gap-2 text-sm font-medium text-hp-electric hover:text-hp-bright transition-colors mt-2"
                  >
                    Free AI Assessment
                  </Link>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-hp-electric transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                  <BookCallButton
                    location="header_mobile"
                    size="default"
                    variant="default"
                    className="w-full mt-2"
                  >
                    Book a Call
                  </BookCallButton>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
