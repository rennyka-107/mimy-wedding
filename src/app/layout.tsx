import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/wedding/Header";
import Footer from "@/components/wedding/Footer";
import localFont from "next/font/local";
import Providers from "@/components/Providers";
import { VisitTracker } from "@/components/VisitTracker";

const thePoisonedHeart = localFont({
  src: "../../public/fonts/ThePoisonedHeart.otf",
  variable: "--font-poisoned",
});

const pecita = localFont({
  src: "../../public/fonts/Pecita.otf",
  variable: "--font-pecita",
});

const postNoBillsJaffnaExtraBold = localFont({
  src: "../../public/fonts/PostNoBillsJaffnaExtraBold.ttf",
  variable: "--font-post-no-bills-jaffna-extra-bold",
});

const postNoBillsJaffnaSemiBold = localFont({
  src: "../../public/fonts/PostNoBillsJaffnaSemiBold.ttf",
  variable: "--font-post-no-bills-jaffna-semi-bold",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mimy Wedding",
  description: "Mimy Wedding",
  icons: {
    icon: "/images/logo-icon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${thePoisonedHeart.variable} ${geistMono.variable} ${postNoBillsJaffnaSemiBold.variable} ${pecita.variable} ${postNoBillsJaffnaExtraBold.variable} overflow-y-auto antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <VisitTracker />
          <Header />
          <main className="flex-1 bg-white">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
