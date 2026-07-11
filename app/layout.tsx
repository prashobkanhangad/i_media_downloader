import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import {
  GoogleAdSenseScript,
  PublicAdsShell
} from "@/components/ads";
import { GlobalJsonLd } from "@/components/seo/global-json-ld";
import { AppProviders } from "@/lib/providers";
import { createRootMetadata, viewport } from "@/lib/seo/metadata";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

export const metadata = createRootMetadata();
export { viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <GlobalJsonLd />
        <GoogleAdSenseScript />
        <AppProviders>
          <Navbar />
          <PublicAdsShell position="top" className="pt-2" />
          <main className="flex flex-1 flex-col">{children}</main>
          <PublicAdsShell position="bottom" className="pb-2" />
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
