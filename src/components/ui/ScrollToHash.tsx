"use client";
import { useEffect } from "react";

/**
 * Re-align a cold-loaded `#hash` after the page finishes growing.
 *
 * Sections below the fold are revealed as they come into view and images
 * settle, so the document is taller at `load` than it was when the browser
 * jumped to the anchor. A deep link to `#faq` was measured landing 3,115px
 * short of the section it named.
 *
 * The correction runs once, after layout has settled, and only when the URL
 * actually carries a hash — an ordinary visit does nothing.
 */
export default function ScrollToHash() {
  useEffect(() => {
    const { hash } = window.location;
    if (!hash || hash.length < 2) return;

    const align = () => {
      const el = document.querySelector(hash);
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    };

    // `load` covers images; the timeout covers sections that mount late.
    const onLoad = () => window.setTimeout(align, 250);
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => window.removeEventListener("load", onLoad);
  }, []);

  return null;
}
