'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getAnalyticsInstance } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';

/**
 * FirebaseAnalytics Component
 * 
 * This component automatically tracks page views in your Next.js application.
 * It uses Next.js navigation hooks to detect route changes and log them to Firebase Analytics.
 * 
 * Usage: Add <FirebaseAnalytics /> to your root layout.tsx
 */
export default function FirebaseAnalytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Initialize analytics on component mount
        const analytics = getAnalyticsInstance();

        if (!analytics) {
            console.warn('Firebase Analytics is not available');
            return;
        }

        // Track initial page view
        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

        console.log('📊 Firebase Analytics: Attempting to log page_view for', url);

        logEvent(analytics, 'page_view', {
            page_path: url,
            page_title: document.title,
            page_location: window.location.href,
            debug_mode: true // Enable debug mode to force immediate upload and visible network requests
        });

        console.log('✅ Firebase Analytics: Page view event sent to SDK queue');
    }, [pathname, searchParams]);

    // This component doesn't render anything
    return null;
}
