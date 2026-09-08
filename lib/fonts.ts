import { Fraunces, Geist, Geist_Mono, Baloo_2 } from "next/font/google";

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

/**
 * Fonte de marca We Make — o rounded sans bold usado no logotipo e nas peças
 * de mídia social reais da empresa. Uso restrito a onde a marca precisa
 * aparecer com essa identidade específica (ex.: apresentação institucional),
 * não substitui a fontDisplay editorial usada no restante do site.
 */
export const fontBrand = Baloo_2({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
  variable: "--font-wemake",
  preload: false,
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
  fontBrand.variable,
].join(" ");
