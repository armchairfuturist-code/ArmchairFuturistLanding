"use client";
import { useEffect, useState } from "react";
import { getNavigatorItems } from "@/lib/section-registry";

const sections = getNavigatorItems();

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function SectionNavigator() {
  const [activeSection, setActiveSection] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // One observer tracks the active section instead of a scroll handler
    // calling getBoundingClientRect for every section on every event.
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      // A section is active while it crosses the upper-middle band.
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
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
            aria-current={isActive ? "true" : undefined}
            className="group relative flex items-center justify-center h-10 w-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:rounded"
            aria-label={`Scroll to ${section.label}`}
          >
            {/* Dot — visible marker, button itself is a 40x40 hit area */}
            <span
              className={`block rounded transition-[transform,background-color] duration-300 ${
                isActive
                  ? "h-2.5 w-2.5 bg-primary"
                  : "h-1.5 w-1.5 bg-foreground/30 group-hover:bg-foreground/60 group-hover:h-2 group-hover:w-2"
              }`}
            />
            {/* Label on hover and keyboard focus */}
            <span className={`absolute right-12 top-1/2 -translate-y-1/2 transition-opacity duration-200 pointer-events-none whitespace-nowrap text-xs font-medium text-foreground/80 bg-background/90 backdrop-blur-sm px-2 py-1 rounded border border-border/50 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`}>
              {section.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
