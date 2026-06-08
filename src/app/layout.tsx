import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { cn } from "@/lib/utils";
import FirebaseAnalytics from "@/components/analytics/FirebaseAnalytics";
import StructuredData from "@/components/seo/StructuredData";
import TrackingPixels from "@/components/analytics/TrackingPixels";
import ErrorBoundary from "@/components/ErrorBoundary";

// Fonts: Manrope (body/UI) + Space Grotesk (display/headlines)
import { Manrope, Space_Grotesk } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = "https://thearmchairfuturist.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alex Myers - AI Guide",
    template: "%s | Alex Myers - AI Guide",
  },
  description:
    "Alex Myers is an AI guide who teaches you to design, launch, and sell your own AI-powered services. No dependency. No retainer. Just understanding.",
  authors: [
    {
      name: "Alex Myers",
      url: "https://www.linkedin.com/in/alex-myers-34572a10/",
    },
  ],
  creator: "Alex Myers",
  publisher: "The Armchair Futurist",
  keywords: [
    "AI Strategy",
    "AI Adoption",
    "Change Management",
    "Future of Work",
    "Organizational Design",
    "Digital Transformation",
    "AI Guidance",
    "Workflow Automation",
    "Accountability Gap",
    "Psychology-Led Adoption",
    "Alex Myers",
    "Certified Futurist",
    "AI Consultant",
    "AI literacy",
    "AI guidance",
    "AI training",
    "AI education",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Alex Myers - AI Guide",
    description:
      "Alex Myers is an AI guide who teaches you to design, launch, and sell your own AI-powered services. No dependency. No retainer. Just understanding.",
    url: "/",
    siteName: "AI Guide",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Alex Myers - AI Guide",
        type: "image/jpeg",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Myers - AI Guide",
    description:
      "Alex Myers is an AI guide who teaches you to design, launch, and sell your own AI-powered services. No dependency. No retainer. Just understanding.",
    images: ["/og-default.jpg"],
    creator: "@armchairfuturist",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Structured data (JSON-LD) for SEO */}
        <StructuredData />
      </head>
      <body
        className={cn(
          manrope.variable,
          spaceGrotesk.variable,
          "font-sans antialiased flex flex-col min-h-[100dvh]",
        )}
      >
        <ErrorBoundary>
          {/* Skip to content — first focusable element for keyboard users */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-primary focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Skip to content
          </a>

          {/* Google Analytics */}
          {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
          )}
          {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          )}

          <Suspense fallback={null}>
            <FirebaseAnalytics />
          </Suspense>

          <Header />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <Toaster />

          {/* Retargeting pixels */}
          <TrackingPixels />
        </ErrorBoundary>
      </body>
    </html>
  );
}
