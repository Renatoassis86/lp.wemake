import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/* ============================================================
   Shared domain & UI types.
   ============================================================ */

export type AccentColor = "cyan" | "violet" | "amber" | "blue" | "rose" | "emerald";

/** A single vision principle: Verdade · Beleza · Bondade · Mandato Cultural. */
export type VisionPrinciple = {
  id: string;
  number: string;
  title: string;
  greek?: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  accent: AccentColor;
};

/** Cultural force reshaping education ("O Mundo Mudou"). */
export type WorldShift = {
  id: string;
  number: string;
  signal: string;
  headline: string;
  body: string;
  icon: LucideIcon;
};

/** Honest diagnosis of what's failing in school technology adoption. */
export type SchoolProblem = {
  id: string;
  number: string;
  title: string;
  diagnosis: string;
  consequence: string;
  icon: LucideIcon;
};

/** Service / product in the maker portfolio. */
export type Service = {
  id: string;
  number: string;
  category: "curriculo" | "formacao" | "plataforma" | "espaco" | "assessoria";
  name: string;
  headline: string;
  description: string;
  features: string[];
  icon: LucideIcon;
};

/** Free educational asset offered as a lead magnet. */
export type FreeMaterial = {
  id: string;
  kind: "livro" | "ebook" | "guia" | "estudo";
  title: string;
  description: string;
  pages?: number;
  author?: string;
};

/** Partner school presence by state. */
export type StatePresence = {
  uf: string;
  name: string;
  /** Approximate position on a 1000×1100 SVG canvas of Brazil. */
  x: number;
  y: number;
  partners: number;
  highlight?: boolean;
};

/** Testimonial — kept for future use. */
export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  institution: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type WithChildren<T = unknown> = T & { children: ReactNode };
