
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Script from 'next/script';
import { Roboto, Geist_Mono, DM_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { cn } from '@/lib/utils';
import FirebaseAnalytics from '@/components/analytics/FirebaseAnalytics';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-sans',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-heading',
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

// Replace 'https://www.your-actual-domain.com' with your website's domain
const siteUrl = 'https://thearmchairfuturist.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), // Important: Set your site's base URL
  title: 'The Armchair Futurist - Alex Myers',
  description: 'Alex Myers – the Armchair Futurist: Advisor to leaders navigating AI, change, and the future of work with grounded, human-first strategy.',
  icons: {
    icon: '/img.jpg', // This is your favicon
  },
  openGraph: {
    title: 'The Armchair Futurist - Alex Myers',
    description: 'Alex Myers – the Armchair Futurist...',
    url: '/', // Can now be relative
    siteName: 'Armchair Futurist',
    images: [
      {
        url: '/floop.jpg', // This will now correctly resolve to https://.../floop.jpg
        width: 1200,
        height: 630,
        alt: 'Alex Myers - The Armchair Futurist',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Armchair Futurist - Alex Myers',
    description: 'Alex Myers – the Armchair Futurist...',
    images: ['/floop.jpg'], // This will also resolve correctly
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(roboto.variable, geistMono.variable, dmSans.variable, "font-sans antialiased flex flex-col min-h-screen")}>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-18FCVPH408"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-18FCVPH408');
          `}
        </Script>
        <Suspense fallback={null}>
          <FirebaseAnalytics />
        </Suspense>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <Toaster />
      </body>
    </html>
  );
}
