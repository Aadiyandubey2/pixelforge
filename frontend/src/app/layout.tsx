import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PixelForge — Premium Image Converter",
  description:
    "Convert PNG, JPG, GIF, BMP, TIFF to WebP & AVIF instantly. Blazing-fast, beautiful, and free.",
  keywords: ["image converter", "webp", "avif", "png to webp", "image optimization"],
  openGraph: {
    title: "PixelForge — Premium Image Converter",
    description: "Convert images to WebP & AVIF with premium quality.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
