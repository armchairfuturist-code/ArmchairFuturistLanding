"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {Calculator, Menu, FileText, MessageCircle, Github} from 'lucide-react';
import Image from "next/image";
import { CALENDAR_URL } from "@/lib/constants";

export default function Header() {
  const navItems = [
    { href: "/#ai-mentoring", label: "Coaching" },
    { href: "/#services", label: "Services" },
    { href: "/#case-studies", label: "Case Studies" },
    { href: "/#roi-calculator", label: "ROI Calculator" },
    { href: "/blog", label: "Blog" },
    { href: "/#about-me", label: "About", icon: FileText },
    { href: "https://github.com/armchairfuturist-code", label: "GitHub", icon: Github, external: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-console-black text-white">
      {/* Merged PlayStation + USVC navigation */}
      {/* Black backdrop at every scroll position — PlayStation convention */}
      <div className="bg-console-black border-b border-[#b2d5ff]/10">
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
                  className="inline-flex items-center gap-1.5 text-sm font-[400] text-white/80 hover:text-usvc-blue transition-colors duration-300 underline-animate"
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-[400] text-white/80 hover:text-usvc-blue transition-colors duration-300 underline-animate"
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
              className="text-sm text-white/70 hover:text-usvc-blue transition-colors duration-300"
            >
              Free Assessment
            </Link>
            <a
              href="https://wa.me/15157706902"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-usvc-blue transition-colors duration-300"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <Button asChild variant="default" size="default">
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                Book Call
              </a>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-usvc-blue"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[260px] sm:w-[300px] bg-console-black text-white border-l border-[#b2d5ff]/20"
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
                        className="inline-flex items-center gap-2 text-sm font-[400] text-white/80 hover:text-usvc-blue transition-colors"
                      >
                        {item.icon && <item.icon className="h-4 w-4" />}
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="inline-flex items-center gap-2 text-sm font-[400] text-white/80 hover:text-usvc-blue transition-colors"
                      >
                        {item.icon && <item.icon className="h-4 w-4" />}
                        {item.label}
                      </Link>
                    )
                  )}
                  <Link
                    href="/assessment"
                    className="inline-flex items-center gap-2 text-sm font-medium text-usvc-blue hover:text-ps-cyan transition-colors mt-2"
                  >
                    Free AI Assessment
                  </Link>
                  <a
                    href="https://wa.me/15157706902"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-usvc-blue transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                  <Button
                    asChild
                    variant="default"
                    size="default"
                    className="w-full mt-2"
                  >
                    <a
                      href={CALENDAR_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book a Call
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
