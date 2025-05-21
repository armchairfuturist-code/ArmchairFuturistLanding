import type {Metadata} from 'next';
import { Inter, Oswald, Geist_Mono } from 'next/font/google'; // Added Oswald, removed Anton
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

// Added Oswald font definition for headings
const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Oswald offers various weights
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
      <body className={cn(inter.variable, geistMono.variable, oswald.variable, "font-sans antialiased flex flex-col min-h-screen")}>
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
