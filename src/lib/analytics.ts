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
function sendToGA4(eventName: string, params?: Record<string, any>) {
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
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
    const analytics = getAnalyticsInstance();

    if (analytics) {
        logEvent(analytics, eventName, eventParams);
    }

    // Also send to GA4 dataLayer for Google Analytics conversion tracking
    sendToGA4(eventName, eventParams);
}

/**
 * Track a conversion event (useful for tracking goals)
 * Sends to both Firebase Analytics AND GA4 as a conversion event.
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

    // Firebase Analytics
    trackEvent(conversionName, params);

    // GA4 conversion event — this is what GA4 marks as a conversion
    // GA4 automatically treats events with these names as conversions:
    // purchase, generate_lead, sign_up, login, etc.
    // For custom conversions, mark them in GA4 admin.
    sendToGA4(conversionName, params);

    // Also send a generic 'conversion' event that GA4 can catch
    sendToGA4('conversion', {
        conversion_name: conversionName,
        ...params,
    });
}
