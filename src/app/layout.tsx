import type { Metadata } from "next";
import localFont from "next/font/local";
import ErrorBoundary from "@/components/ErrorBoundary";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { MotionProvider } from "@/components/ui/MotionProvider";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollToHash from "@/components/ui/ScrollToHash";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import StructuredData from "@/components/seo/StructuredData";
import "./globals.css";

// ISR: revalidate prerendered pages every 60s so deploys propagate at the CDN edge.
export const revalidate = 60;

// Self-hosted woff2 files — zero font network calls at build time and runtime
// (the next/font/google fetch flaked intermittently in CI; this removes it).
// Space Grotesk = display, Manrope = body/UI, DM Mono = micro-labels.
const spaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk-Variable.woff2",
  variable: "--font-display",
  display: "swap",
});
const manrope = localFont({
  src: "./fonts/Manrope-Variable.woff2",
  variable: "--font-body",
  display: "swap",
});
const dmMono = localFont({
  src: [
    { path: "./fonts/DMMono-Regular.woff2", weight: "400" },
    { path: "./fonts/DMMono-Medium.woff2", weight: "500" },
  ],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://thearmchairfuturist.com";

const title = "The Armchair Futurist — AI literacy & implementation";
const description =
  "Alex Myers, AI Technical Literacy & Workflow Strategy Consultant. 40+ AI systems deployed. 1:1 coaching that makes you self-sufficient in 8–10 weeks.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "The Armchair Futurist",
    locale: "en_US",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${dmMono.variable}`}
    >
      <body>
        <ErrorBoundary>
          <SmoothScrollProvider>
            <MotionProvider>
              <StructuredData />
              <ScrollProgress />
              <ScrollToHash />
              <Header />
              {children}
              <Footer />
            </MotionProvider>
          </SmoothScrollProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
