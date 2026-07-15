"use client";

import { useEffect, useState } from 'react';
import { getNavigatorItems } from '@/lib/section-registry';

const sections = getNavigatorItems();

export default function SectionNavigator() {
  const [activeSection, setActiveSection] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navigator after scrolling past the hero (past 80vh)
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      setVisible(scrollY > viewportHeight * 0.7);

      // Determine which section is in view
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportHeight * 0.35) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!visible) return null;

  return (
    <nav
      aria-label="Section navigation"
      className="hidden lg:flex fixed right-3 top-1/2 -translate-y-1/2 z-50 flex-col gap-2"
    >
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="group relative flex items-center justify-center h-10 w-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:rounded-full"
            aria-label={`Scroll to ${section.label}`}
          >
            {/* Dot — 12px visible, button itself is 40x40 hit area */}
            <span
              className={`block rounded-full transition-[transform,background-color] duration-300 ${
                isActive
                  ? 'h-2.5 w-2.5 bg-primary'
                  : 'h-1.5 w-1.5 bg-foreground/30 group-hover:bg-foreground/60 group-hover:h-2 group-hover:w-2'
              }`}
            />
            {/* Label on hover */}
            <span className="absolute right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap text-xs font-medium text-foreground/80 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md border border-border/50">
              {section.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
