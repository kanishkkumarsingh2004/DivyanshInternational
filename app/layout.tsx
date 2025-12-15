import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Divyansh International",
  description: "Premium Quality Dry Fruits & Spices",
  other: {
    "screen-orientation": "portrait",
    "orientation": "portrait"
  },
  icons: {
    icon: "/divyansh-logo.jpg",
    apple: "/divyansh-logo.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${playfair.variable} ${lato.variable}`}
    >
      <body className="antialiased">
        <LanguageProvider>
          <SmoothScrolling>{children}</SmoothScrolling>
        </LanguageProvider>
      </body>
    </html>
  );
}
