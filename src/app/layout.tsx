import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import { Toaster } from "react-hot-toast";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display"
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Personal Store",
  description: "Modern e-commerce frontend powered by Next.js 14"
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
        <SiteNavbar />
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 pt-8 pb-16">
          {children}
        </main>
        <SiteFooter />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
