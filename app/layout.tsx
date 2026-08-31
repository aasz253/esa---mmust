import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { siteConfig } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ESA MMUST | Engineering Students Association",
    template: "%s | ESA MMUST",
  },
  description: siteConfig.description,
  keywords: [
    "ESA",
    "Engineering Students Association",
    "MMUST",
    "Masinde Muliro University",
    "Engineering",
    "engineering students",
  ],
  openGraph: {
    title: "ESA MMUST | Engineering Students Association",
    description: siteConfig.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body className="bg-white text-[#0f2a4a] antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
