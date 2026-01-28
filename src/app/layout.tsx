import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gourmet Experience | Experiencias gastronómicas a domicilio",
  description: "Tablas de quesos artesanales, charcutería premium y servicios de chef privado para eventos, celebraciones y momentos especiales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased h-full font-body`}
      >
        {children}
      </body>
    </html>
  );
}
