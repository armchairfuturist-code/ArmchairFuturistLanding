import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Armchair Futurist — AI literacy & implementation",
  description: "A partner in learning for people building a human future with AI.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
