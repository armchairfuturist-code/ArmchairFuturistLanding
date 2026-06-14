"use client";

import * as React from "react";
import { ArrowRight, Calendar, CalendarDays } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { CALENDAR_URL } from "@/lib/constants";
import { trackConversion, trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * <BookCallButton /> — the single seam between every "Book a Call" CTA on the
 * site and the Calendly URL. Encapsulates the URL, the icon, the analytics
 * event, and the visual variant. Sections compose it instead of importing
 * `CALENDAR_URL` directly.
 *
 * Before: 9+ components imported `CALENDAR_URL` and re-implemented the same
 * `<Button asChild><a href={CALENDAR_URL}>...</a></Button>` pattern with
 * drifting tracking calls. Changing the booking link or the event name meant
 * 9 file edits.
 *
 * After: one component owns the URL, the icon, the tracking, and the styling.
 * Call sites pass only the data that varies — label, location, value, icon.
 */

export type BookCallIcon = "calendar" | "calendar-days" | "arrow" | "none";

export interface BookCallButtonProps
  extends Omit<ButtonProps, "onClick" | "asChild"> {
  /** Label inside the button. Defaults to "Book a Call". */
  children?: React.ReactNode;
  /**
   * Logical location on the page. Used as the `location` param on the
   * `book_call_click` analytics event. Pick something stable — it's the
   * dimension you'll segment on later.
   */
  location: string;
  /**
   * Optional monetary value passed to `trackConversion`. Use for
   * purchase-intent CTAs (coaching packages, custom builds).
   */
  value?: number;
  /**
   * Currency code for `trackConversion`. Defaults to "USD".
   */
  currency?: string;
  /**
   * Icon shown inside the button. `none` renders no icon.
   * Default: "calendar-days".
   */
  icon?: BookCallIcon;
  /**
   * Size class for the leading icon. Default "h-4 w-4" works inside a
   * `default` or `lg` button. Pass smaller classes (e.g. "h-3.5 w-3.5")
   * when rendering in tight contexts like the footer.
   */
  iconClassName?: string;
  /**
   * When true, render as a bare `<a>` instead of inside a `Button`.
   * Use for text-link CTAs in footers, headers, and inline content.
   * `variant`, `size`, and Button-specific styling are ignored in this mode.
   */
  bare?: boolean;
  /**
   * When false, suppresses the analytics event entirely. Use for the very
   * few cases where the click is already tracked by an enclosing form.
   */
  trackOnClick?: boolean;
  /**
   * Optional additional click handler. Runs AFTER the built-in analytics
   * event fires. Use for section-specific conversion tracking (e.g. a
   * package-specific `trackConversion` call).
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

/**
 * Resolves the icon component for the given `icon` prop. Centralized so
 * adding a new icon is a single-line change.
 */
function IconFor({
  icon,
  className,
}: {
  icon: BookCallIcon;
  className: string;
}) {
  switch (icon) {
    case "calendar":
      return <Calendar className={className} aria-hidden="true" />;
    case "calendar-days":
      return <CalendarDays className={className} aria-hidden="true" />;
    case "arrow":
      return <ArrowRight className={className} aria-hidden="true" />;
    case "none":
      return null;
  }
}

/**
 * Renders a CTA that opens the booking calendar in a new tab and fires a
 * `book_call_click` (and, if `value` is set, a `trackConversion`) event.
 *
 * Pass `location` so analytics can attribute the click. Pass `value` for
 * purchase-intent flows. Everything else (URL, icon, default label) is
 * owned by this component.
 */
export const BookCallButton = React.forwardRef<
  HTMLButtonElement,
  BookCallButtonProps
>(function BookCallButton(
  {
    children = "Book a Call",
    location,
    value,
    currency = "USD",
    icon = "calendar-days",
    iconClassName = "mr-2 h-4 w-4",
    bare = false,
    trackOnClick = true,
    onClick,
    className,
    variant,
    size,
    ...rest
  },
  ref,
) {
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    if (trackOnClick) {
      trackEvent("book_call_click", { location });
      if (typeof value === "number") {
        trackConversion(`book_call_${location}`, value, currency);
      }
    }
    onClick?.(e);
  };

  const ariaLabel =
    typeof children === "string" ? children : "Book a Call";

  if (bare) {
    return (
      <a
        href={CALENDAR_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        onClick={handleClick}
        className={cn(className)}
      >
        {icon !== "none" && <IconFor icon={icon} className={iconClassName} />}
        {children}
      </a>
    );
  }

  return (
    <Button
      ref={ref}
      asChild
      variant={variant}
      size={size}
      onClick={handleClick}
      className={cn(className)}
      {...rest}
    >
      <a
        href={CALENDAR_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {icon !== "none" && <IconFor icon={icon} className={iconClassName} />}
        {children}
      </a>
    </Button>
  );
});
