import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/* ============================================================
   Shared domain & UI types.
   Keep this surface narrow — feature-specific shapes live with
   their feature, not here.
   ============================================================ */

export type Pillar = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  accent: "cyan" | "violet" | "amber" | "blue";
};

export type Product = {
  id: string;
  category: "curriculo" | "plataforma" | "formacao" | "consultoria";
  name: string;
  headline: string;
  description: string;
  features: string[];
  audience: ("fundamental-1" | "fundamental-2" | "medio" | "institucional")[];
};

export type School = {
  id: string;
  name: string;
  city: string;
  state: string;
  denomination?: string;
  logo?: string;
};

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

export type AccentColor = "cyan" | "violet" | "amber" | "blue";

export type WithChildren<T = unknown> = T & { children: ReactNode };
