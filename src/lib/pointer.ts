"use client";
import { useEffect, useState } from "react";

/**
 * Does this device actually have a hovering, precise pointer?
 *
 * Touch devices emit an emulated :hover on tap and never emit the matching
 * :hover-out, so anything gated on hover sticks once tapped. CSS handles its
 * own hover rules via Tailwind's `hoverOnlyWhenSupported`; JavaScript-driven
 * motion (`whileHover`, magnetic tilt) has to ask this explicitly.
 */
export function canFineHover(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

/**
 * SSR-safe `canFineHover`. Starts false so the server and first client render
 * agree, then corrects on mount. Safe for animation props: a hover state can
 * only be reached by a real interaction, which happens long after hydration.
 */
export function useFineHover(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return fine;
}
