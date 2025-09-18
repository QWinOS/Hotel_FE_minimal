import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Hotel Sweet Home International",
  description: "Hotel Sweet Home International",
};
export const dynamic = "error";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-black dark:text-white min-h-screen flex flex-col`}
      >
        <Navbar />
        <div className="mt-16 sm:mt-20">
          <main className="flex-1 flex flex-col">{children}</main>
          <Toaster
            position="top-center"
            theme="light"
            duration={5000}
            mobileOffset={64}
            richColors={true}
          />
        </div>
        <Footer />
      </body>
    </html>
  );
}
