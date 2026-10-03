import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vishwakarma Jewelers | High Fine Jewellery & Heritage Atelier",
  description: "Handcrafted 22K Gold, Polki Diamonds, and Certified Solitaires.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${montserrat.variable}`}>
      <body className="antialiased bg-[#07080b] text-[#f8fafc] font-sans selection:bg-amber-400/20 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
