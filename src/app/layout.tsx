import type { Metadata } from "next";
import { Geist, Geist_Mono, Quicksand } from "next/font/google";
import "./globals.css";
// import { ApolloProvider } from "@apollo/client";
// import { getClient } from "@/lib/apollo";
// import QueryProvider from "@/components/QueryProvider";
// import { Session } from "inspector/promises";
// import { SessionProvider } from "next-auth/react";

import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
// ("@/lib/apollo");

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const quickSand = Quicksand({
  variable: "--font-quick-sans",
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
        className={`${quickSand.variable} ${quickSand.variable} antialiased bg-[#E0E0E0] dark:bg-[#FAF9F6] text-black dark:text-white min-h-screen flex flex-col`}
      >
        {/* <ApolloProvider client={getClient}> */}
        {/* <SessionProvider> */}
        {/* <Navbar /> */}
        <Navbar />
        <div className="mt-16 sm:mt-20">
          {/* <QueryProvider> */}
          <main className="flex-1 flex flex-col">{children}</main>
        </div>
        {/* </QueryProvider> */}
        {/* </SessionProvider> */}

        {/* </ApolloProvider> */}
        <Footer />
      </body>
    </html>
  );
}
