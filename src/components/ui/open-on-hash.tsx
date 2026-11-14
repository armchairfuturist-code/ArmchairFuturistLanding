"use client";

import { useEffect } from "react";

/**
 * A closed <details> ignores hash navigation: the browser scrolls to it but
 * leaves it shut. This opens the element when its id is the URL hash, and when
 * an in-page link points at it (a repeat click fires no hashchange).
 */
export function OpenOnHash({ id }: { id: string }) {
  useEffect(() => {
    const el = document.getElementById(id);
    if (!(el instanceof HTMLDetailsElement)) return;

    const selector = `a[href="#${id}"]`;
    const openIfTargeted = () => {
      if (window.location.hash === `#${id}`) el.open = true;
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest(selector)) el.open = true;
    };

    openIfTargeted();
    window.addEventListener("hashchange", openIfTargeted);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("hashchange", openIfTargeted);
      document.removeEventListener("click", onClick, true);
    };
  }, [id]);

  return null;
}
