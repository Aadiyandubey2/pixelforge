import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import {
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "../lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: "Aadiyan Dubey", url: SITE_URL }],
  creator: "Aadiyan Dubey",
  publisher: SITE_NAME,
  category: "technology",
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: SITE_IMAGE,
        width: 640,
        height: 640,
        alt: "PixelForge logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_IMAGE],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} h-full`}
    >
      <head>
        <link
          rel="alternate"
          type="text/plain"
          href={`${SITE_URL}/llms.txt`}
          title="PixelForge LLM Summary"
        />
        <link
          rel="alternate"
          type="text/plain"
          href={`${SITE_URL}/llms-full.txt`}
          title="PixelForge LLM Full Summary"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
