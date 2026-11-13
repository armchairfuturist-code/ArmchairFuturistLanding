import type Lenis from "lenis";

/**
 * The live Lenis instance, for code that must ride the same easing the
 * page does: hero anchor jumps and the agent-field parallax. Null before
 * mount, and after unmount or under reduced motion (Lenis never starts).
 */
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis() {
  return instance;
}
