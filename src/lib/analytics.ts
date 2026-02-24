/**
 * Firebase Analytics Utilities
 * 
 * This module provides utilities for tracking custom events in Firebase Analytics.
 * The FirebaseAnalytics component automatically tracks page views, but you can use
 * these utilities to track custom events throughout your application.
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
 * Track a custom event in Firebase Analytics
 * 
 * @param eventName - Name of the event (e.g., 'button_click', 'form_submit')
 * @param eventParams - Optional parameters to include with the event
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
    const analytics = getAnalyticsInstance();

    if (!analytics) {
        console.warn('Firebase Analytics is not available');
        return;
    }

    logEvent(analytics, eventName, eventParams);
}

/**
 * Track a conversion event (useful for tracking goals)
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
    trackEvent(conversionName, {
        value,
        currency,
        timestamp: new Date().toISOString(),
    });
}
