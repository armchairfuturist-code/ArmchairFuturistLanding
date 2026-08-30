import type { Metadata } from "next";
import { DM_Mono, Manrope, Space_Grotesk } from "next/font/google";
import ErrorBoundary from "@/components/ErrorBoundary";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import StructuredData from "@/components/seo/StructuredData";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

// Self-hosted via next/font — no render-blocking Google Fonts @import.
// Space Grotesk = display, Manrope = body/UI, DM Mono = micro-labels.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://thearmchairfuturist.com";

const title = "The Armchair Futurist — AI literacy & implementation";
const description =
  "Alex Myers, AI Technical Literacy & Workflow Strategy Consultant. 40+ AI systems deployed. 1:1 coaching that makes you self-sufficient in 8-10 weeks.";

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
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
            <StructuredData />
            <Header />
            {children}
            <Footer />
            <Toaster />
          </SmoothScrollProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
