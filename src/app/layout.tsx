import type { Metadata } from "next";
import ErrorBoundary from "@/components/ErrorBoundary";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Armchair Futurist — AI literacy & implementation",
  description: "A partner in learning for people building a human future with AI.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
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
