"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";

/**
 * A Link that hands the route change to the browser's View Transition API.
 *
 * React 18 has no <ViewTransition> component, so this does the two things
 * that one would: it starts the transition, and it holds the callback open
 * until the new route has actually painted (pathname change), so the browser
 * snapshots the destination rather than the old page again. Browsers without
 * startViewTransition, and readers who ask for reduced motion, get a plain
 * Link — the interception never runs.
 */
export function ViewTransitionLink({
  href,
  className,
  style,
  children,
}: {
  href: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const resolveRef = useRef<(() => void) | null>(null);

  /* Fires when the destination route is committed... and on mount, where the
     ref is null and this is a no-op. */
  useEffect(() => {
    resolveRef.current?.();
    resolveRef.current = null;
  }, [pathname]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const doc = document as Document & {
      startViewTransition?: (callback: () => Promise<void> | void) => unknown;
    };
    if (!doc.startViewTransition) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    event.preventDefault();
    doc.startViewTransition(async () => {
      router.push(href);
      await new Promise<void>((resolve) => {
        resolveRef.current = resolve;
        /* A slow route must not leave the transition stuck on the old frame. */
        window.setTimeout(resolve, 800);
      });
      resolveRef.current = null;
    });
  };

  return (
    <Link href={href} className={className} style={style} onClick={handleClick}>
      {children}
    </Link>
  );
}
