import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vishwakarma Jewelers | Purveyors of Royal Heritage & High Fine Jewellery",
  description:
    "Discover handcrafted 22K gold, uncut Polki diamonds, antique temple bridal jewellery, and certified solitaires at Vishwakarma Jewelers. 100% BIS Hallmarked.",
  keywords: [
    "Vishwakarma Jewelers",
    "Bridal Jewellery",
    "22k Gold Necklace",
    "Polki Diamonds",
    "Temple Jewellery",
    "Solitaire Diamond Ring",
    "Kundan Jewellery",
    "BIS Hallmarked Gold",
  ],
  authors: [{ name: "Vishwakarma Jewelers" }],
  openGraph: {
    title: "Vishwakarma Jewelers | Purveyors of Royal Heritage",
    description: "Handcrafted 22K Gold, Solitaires & Regal Bridal Collections.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${montserrat.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
