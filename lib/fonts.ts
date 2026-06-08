import { Fraunces, Geist, Geist_Mono } from "next/font/google";

/**
 * Serif display font — used for bold, elegant headlines.
 */
export const fontDisplay = Fraunces({
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK"],
  variable: "--font-fraunces",
  preload: true,
});

/** Primary UI / body sans — Geist for technical clarity. */
export const fontSans = Geist({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist-sans",
  preload: true,
});

/** Eyebrow / numerals / micro-typography. */
export const fontMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  preload: false,
});

export const fontVariables = [
  fontDisplay.variable,
  fontSans.variable,
  fontMono.variable,
].join(" ");
