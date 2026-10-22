import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maison Aurélia — Haute Joaillerie & Exceptional Diamonds",
  description:
    "Enter the royal atelier of Maison Aurélia. Discover rare high-jewellery creations, physically based 3D diamond mastery, and timeless emotional artistry.",
  keywords: [
    "luxury jewellery",
    "diamond ring",
    "haute joaillerie",
    "Maison Aurelia",
    "Cartier style",
    "Bvlgari style",
    "exceptional diamonds",
    "3D jewellery boutique",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F1E8] text-[#392B24] selection:bg-[#EDE2D3] selection:text-[#392B24]">
        {children}
      </body>
    </html>
  );
}
