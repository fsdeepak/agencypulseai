import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Provider from "./providers";
import { Toaster } from "sonner";
import Nav from "@/components/nav/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AgencyPulse AI — Real-Time App Performance Monitoring",
  description:
    "Install our lightweight SDK in minutes. Get deep performance insights, error tracking, and user analytics — all in one beautiful dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0A12] font-[family-name:var(--font-inter)]">
        <Provider>
          <Nav />
          {children}
          <Toaster position="top-right" richColors theme="dark" closeButton />
        </Provider>
      </body>
    </html>
  );
}
