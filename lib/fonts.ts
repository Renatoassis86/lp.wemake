import { Fraunces, Geist, Geist_Mono } from "next/font/google";

/**
 * Editorial display serif — used for manifesto / hero / institutional headlines.
 * Fraunces carries a literary, contemplative quality that fits a Christian-educational voice.
 */
export const fontDisplay = Fraunces({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  axes: ["opsz", "SOFT"],
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
