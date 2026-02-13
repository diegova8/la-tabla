import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { ToastProvider } from "@/components/ui/toast";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "La Tabla — Charcutería & Quesos Artesanales | Costa Rica",
    template: "%s | La Tabla",
  },
  description:
    "Tablas de charcutería y quesos artesanales en Costa Rica. Pedí online, armá tu tabla personalizada. Chef privado, eventos y talleres.",
  keywords: [
    "charcutería",
    "quesos",
    "tabla",
    "Costa Rica",
    "chef privado",
    "eventos",
    "catering",
  ],
  authors: [{ name: "Chef Stewart Heigold" }],
  openGraph: {
    type: "website",
    locale: "es_CR",
    siteName: "La Tabla",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
        <body className="font-sans antialiased bg-white text-stone-900">
          <ToastProvider>
            {children}
          </ToastProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
