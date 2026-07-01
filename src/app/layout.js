import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Crystal Seer | Ethereal Crystals & Astrology",
  description: "Curated collection of ethically sourced, energized crystals and spiritual guidance services.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} h-full antialiased bg-white scroll-smooth`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col font-inter bg-soft-purple-50">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
