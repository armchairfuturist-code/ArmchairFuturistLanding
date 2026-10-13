"use client";

import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import WhatsAppGlyph from "@/components/ui/WhatsAppGlyph";
import {
  buildWhatsAppHref,
  WHATSAPP_DEFAULT_MESSAGE,
} from "@/lib/constants";
import { trackConversion, trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * <WhatsAppButton /> — the single seam between every "text me" CTA and the
 * wa.me URL. Mirrors BookCallButton deliberately: same props, same tracking
 * shape, so a call site can switch between the two by changing the component
 * name and nothing else.
 *
 * Why this exists: a booking calendar asks a stranger to commit to a time.
 * A text asks for ten seconds. Most of Alex's bookings arrive by referral,
 * so there is no cold-start problem to solve with a scheduled call. WhatsApp
 * is the shortest path from "interested" to "in conversation".
 *
 * Pass `message` to pre-fill a specific ask. The pricing cards use it so a
 * click arrives with the package already named, which is the same intent
 * signal the calendar's utm_campaign carried, minus the scheduling step.
 */

export type WhatsAppButtonIcon = "whatsapp" | "none";

export interface WhatsAppButtonProps
  extends Omit<ButtonProps, "onClick" | "asChild"> {
  /** Label inside the button. Defaults to "Text me on WhatsApp". */
  children?: React.ReactNode;
  /**
   * Logical location on the page. Used as the `location` param on the
   * `whatsapp_click` analytics event. Pick something stable — it is the
   * dimension you will segment on later.
   */
  location: string;
  /** Overrides the pre-filled message. Defaults to WHATSAPP_DEFAULT_MESSAGE. */
  message?: string;
  /**
   * Optional monetary value passed to `trackConversion`. Use where the click
   * carries purchase intent, matching BookCallButton's `value`.
   */
  value?: number;
  /** Currency code for `trackConversion`. Defaults to "USD". */
  currency?: string;
  /**
   * Icon shown inside the button. The glyph defaults to currentColor so it
   * reads as part of the button on a coloured background; pass
   * `glyphTone="brand"` to use WhatsApp green on a neutral one.
   */
  icon?: WhatsAppButtonIcon;
  iconClassName?: string;
  glyphTone?: "brand" | "inherit";
  /**
   * When true, render as a bare `<a>` instead of inside a `Button`.
   * Use for text-link CTAs in footers, headers, and inline content.
   */
  bare?: boolean;
  /** When false, suppresses the analytics event entirely. */
  trackOnClick?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export const WhatsAppButton = React.forwardRef<
  HTMLButtonElement,
  WhatsAppButtonProps
>(function WhatsAppButton(
  {
    children = "Text me on WhatsApp",
    location,
    message = WHATSAPP_DEFAULT_MESSAGE,
    value,
    currency = "USD",
    icon = "whatsapp",
    iconClassName = "mr-2 h-4 w-4",
    glyphTone = "inherit",
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
      trackEvent("whatsapp_click", { location });
      if (typeof value === "number") {
        trackConversion(`whatsapp_${location}`, value, currency);
      }
    }
    onClick?.(e);
  };

  const href = buildWhatsAppHref(message);
  const ariaLabel = typeof children === "string" ? children : "WhatsApp";
  const glyph =
    icon === "whatsapp" ? (
      <WhatsAppGlyph className={iconClassName} tone={glyphTone} />
    ) : null;

  if (bare) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        onClick={handleClick}
        className={cn(className)}
      >
        {glyph}
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
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {glyph}
        {children}
      </a>
    </Button>
  );
});
