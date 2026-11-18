"use client";

import Script from "next/script";

/**
 * GA4 gtag.js — loads on interactive when NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
 * Removed: Meta Pixel & LinkedIn Insight Tag (env vars unpopulated; no retargeting).
 */
export default function TrackingPixels() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <>
      {/* Google Analytics 4 (consumes window.dataLayer from src/lib/analytics.ts) */}
      {gaId && gaId !== "G-XXXXXXXXXX" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `,
            }}
          />
        </>
      )}
    </>
  );
}