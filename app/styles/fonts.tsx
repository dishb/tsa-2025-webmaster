import localFont from "next/font/local";
import { DM_Sans, Sawarabi_Mincho } from "next/font/google";

const londinia = localFont({
  src: [
    {
      path: "./fonts/LondiniaMedium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-londinia",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const sawarabiMincho = Sawarabi_Mincho({
  subsets: ["latin"],
  variable: "--font-sawarabi-mincho",
  weight: "400",
});

export { londinia, dmSans, sawarabiMincho };
