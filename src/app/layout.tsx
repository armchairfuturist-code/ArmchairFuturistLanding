import type {Metadata} from 'next';
import { Roboto, Montserrat, Geist_Mono } from 'next/font/google'; // Added Roboto, removed Open_Sans
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

// Configure Roboto for body text
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Roboto offers various weights
  variable: '--font-sans', // Standard variable for sans-serif body text
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

// Configure Montserrat for headings
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'Armchair Futurist - Alex Myers',
  description: 'Alex Myers – the Armchair Futurist: Advisor to leaders navigating AI, change, and the future of work with grounded, human-first strategy.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(roboto.variable, geistMono.variable, montserrat.variable, "font-sans antialiased flex flex-col min-h-screen")}>
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
