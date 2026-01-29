import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "La Tabla | Artisanal Charcuterie Experiences",
  description: "Artisanal charcuterie experiences for the discerning host. Curated boards for every occasion, from intimate gatherings to grand celebrations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased h-full font-body`}
      >
        {children}
      </body>
    </html>
  );
}
