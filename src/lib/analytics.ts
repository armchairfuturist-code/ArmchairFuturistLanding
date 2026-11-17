/**
 * Analytics utilities (GA4 dataLayer).
 *
 * Cross-site convention: see `analytics-contract.md` at the workspace root
 * for the shared `trackEvent` / `trackConversion` shape used across all
 * three projects. This file is the armchair-specific implementation.
 *
 * The site no longer ships the Firebase JS SDK (removed 2026-11-17 with the
 * move to Cloudflare Workers). Events go to the GA4 dataLayer, which
 * Google Tag Manager or gtag.js consumes when present.
 *
 * Example usage:
 * ```tsx
 * import { trackEvent } from '@/lib/analytics';
 *
 * trackEvent('button_click', { button_name: 'subscribe', location: 'hero_section' });
 * trackEvent('form_submit', { form_name: 'contact_form', success: true });
 * ```
 */

type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Send an event to the GA4 dataLayer (if available)
 */
function sendToGA4(eventName: string, params?: EventParams) {
  if (typeof window === 'undefined') return;
  const dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
  if (dataLayer && Array.isArray(dataLayer)) {
    dataLayer.push({
      event: eventName,
      ...params,
    });
  }
}

/**
 * Track a custom event in GA4.
 *
 * @param eventName - Name of the event (e.g., 'button_click', 'form_submit')
 * @param eventParams - Optional parameters to include with the event
 */
export function trackEvent(eventName: string, eventParams?: EventParams) {
  sendToGA4(eventName, eventParams);
}

/**
 * Track a conversion event in GA4.
 *
 * `trackEvent` already sends the named event; this adds the generic
 * 'conversion' wrapper event that GA4 uses for conversion marking.
 *
 * @param conversionName - Name of the conversion (e.g., 'newsletter_signup', 'purchase')
 * @param value - Optional monetary value
 * @param currency - Optional currency code (default: 'USD')
 */
export function trackConversion(
  conversionName: string,
  value?: number,
  currency: string = 'USD'
) {
  const params = {
    value,
    currency,
    timestamp: new Date().toISOString(),
  };

  trackEvent(conversionName, params);

  sendToGA4('conversion', {
    conversion_name: conversionName,
    ...params,
  });
}
