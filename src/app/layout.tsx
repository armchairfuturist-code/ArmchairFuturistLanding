
import type {Metadata} from 'next';
import { Roboto, Geist_Mono } from 'next/font/google'; // Import Roboto
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

// Configure Roboto for body text
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'], 
  variable: '--font-sans', 
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

// Replace 'https://www.your-actual-domain.com' with your website's domain
const siteUrl = 'https://www.your-actual-domain.com'; 

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), // Important: Set your site's base URL
  title: 'The Armchair Futurist - Alex Myers',
  description: 'Alex Myers – the Armchair Futurist: Advisor to leaders navigating AI, change, and the future of work with grounded, human-first strategy.',
  icons: {
    icon: '/img.jpg', // This is your favicon
  },
  openGraph: {
    title: 'The Armchair Futurist - Alex Myers',
    description: 'Alex Myers – the Armchair Futurist: Advisor to leaders navigating AI, change, and the future of work with grounded, human-first strategy.',
    url: siteUrl, // The canonical URL of your site
    siteName: 'Armchair Futurist',
    images: [
      {
        url: '/img.jpg', // Path to your preview image (relative to /public)
                         // Recommended dimensions: 1200x630px. 
                         // Your img.jpg might be a profile picture; consider a dedicated preview image.
        width: 1200,     // Example width, adjust if using a different image
        height: 630,    // Example height, adjust if using a different image
        alt: 'Alex Myers - The Armchair Futurist',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image', // Use 'summary' if your image is small or square
    title: 'The Armchair Futurist - Alex Myers',
    description: 'Alex Myers – the Armchair Futurist: Advisor to leaders navigating AI, change, and the future of work with grounded, human-first strategy.',
    // creator: '@YourTwitterHandle', // Optional: Your Twitter handle
    images: ['/img.jpg'], // Path to your preview image. Next.js resolves this using metadataBase.
                           // Must be a suitable image for a large card.
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(roboto.variable, geistMono.variable, "font-sans antialiased flex flex-col min-h-screen")}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
