import type {Metadata} from 'next';
import { Open_Sans, Montserrat, Geist_Mono } from 'next/font/google'; // Added Montserrat, Open_Sans, removed Oswald, Inter
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

// Configure Open Sans for body text
const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-sans', // Standard variable for sans-serif body text
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

// Configure Montserrat for headings
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Montserrat offers various weights
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
      <body className={cn(openSans.variable, geistMono.variable, montserrat.variable, "font-sans antialiased flex flex-col min-h-screen")}>
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
