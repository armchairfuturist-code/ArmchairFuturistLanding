
import type {Metadata} from 'next';
import { Lato, Montserrat, Geist_Mono, Rubik } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

// Configure Lato for body text
const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'], 
  variable: '--font-sans', 
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

// Configure Rubik for specific sections
const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-rubik',
});

export const metadata: Metadata = {
  title: 'Armchair Futurist - Alex Myers',
  description: 'Alex Myers – the Armchair Futurist: Advisor to leaders navigating AI, change, and the future of work with grounded, human-first strategy.',
  icons: {
    icon: '/img.jpg', // Updated favicon path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(lato.variable, geistMono.variable, montserrat.variable, rubik.variable, "font-sans antialiased flex flex-col min-h-screen")}>
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
