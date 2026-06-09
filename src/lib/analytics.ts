/**
 * Firebase Analytics Utilities
 * 
 * This module provides utilities for tracking custom events in Firebase Analytics
 * AND sending them to the gtag (GA4) dataLayer for Google Analytics conversion tracking.
 * 
 * Example usage:
 * ```tsx
 * import { trackEvent } from '@/lib/analytics';
 * 
 * // Track a button click
 * trackEvent('button_click', {
 *   button_name: 'subscribe',
 *   location: 'hero_section'
 * });
 * 
 * // Track a form submission
 * trackEvent('form_submit', {
 *   form_name: 'contact_form',
 *   success: true
 * });
 * ```
 */

import { logEvent } from 'firebase/analytics';
import { getAnalyticsInstance } from './firebase';

/**
 * Send event to GA4 dataLayer (if available)
 */
function sendToGA4(eventName: string, params?: Record<string, string | number | boolean | undefined>) {
  if (typeof window === 'undefined') return;
  const dataLayer = (window as any).dataLayer;
  if (dataLayer && Array.isArray(dataLayer)) {
    dataLayer.push({
      event: eventName,
      ...params,
    });
  }
}

/**
 * Track a custom event in Firebase Analytics AND GA4
 * 
 * @param eventName - Name of the event (e.g., 'button_click', 'form_submit')
 * @param eventParams - Optional parameters to include with the event
 */
export function trackEvent(eventName: string, eventParams?: Record<string, string | number | boolean | undefined>) {
    const analytics = getAnalyticsInstance();

    if (analytics) {
        logEvent(analytics, eventName, eventParams);
    }

    // Also send to GA4 dataLayer for Google Analytics conversion tracking
    sendToGA4(eventName, eventParams);
}

/**
 * Track a conversion event in Firebase Analytics and GA4.
 *
 * NOTE: `trackEvent` already sends to GA4 via dataLayer, so we only need
 * the additional generic 'conversion' wrapper event for GA4 conversion tracking.
 * The conversion name is sent as both the primary event (via trackEvent) and
 * nested inside a 'conversion' event for GA4's conversion-marking system.
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

    // Firebase Analytics + GA4 (single sendToGA4 via trackEvent)
    trackEvent(conversionName, params);

    // Also send a generic 'conversion' event wrapper for GA4
    sendToGA4('conversion', {
        conversion_name: conversionName,
        ...params,
    });
}
