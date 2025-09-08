import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Toaster } from "@/components/ui/sonner";
import { dmSans, londinia, sawarabiMincho } from "./styles/fonts";

import "./globals.css";
import FloatingSakura from "@/components/FloatingSakura";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${dmSans.className} ${sawarabiMincho.variable} ${londinia.variable}`}
      >
        <Toaster />
        <FloatingSakura />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
