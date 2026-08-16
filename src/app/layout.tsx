import type { Metadata } from "next";
import ErrorBoundary from "@/components/ErrorBoundary";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const siteUrl = "https://thearmchairfuturist.com";

const title = "The Armchair Futurist — AI literacy & implementation";
const description =
  "A partner in learning for people building a human future with AI.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ErrorBoundary>
          <SmoothScrollProvider>
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
