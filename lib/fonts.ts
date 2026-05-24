import { Lilita_One, Geist, Geist_Mono } from "next/font/google";

/**
 * Ludic display font — used for bold, playful headlines like SAS/Zoom.
 */
export const fontDisplay = Lilita_One({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-fraunces", /* mantemos o nome da variável no CSS pra não quebrar referências */
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
