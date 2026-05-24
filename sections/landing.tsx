"use client";

import dynamic from "next/dynamic";
import { WaveDivider } from "@/components/ui/wave-divider";

/* ============================================================
   Mapa de cores reais de fundo por módulo:
   Hero          → #4c8ade  (color-brand-royal)
   Problem       → #ffffff  (bg-white)
   CeoVideo      → #0b1f44  (color-brand-navy)
   Authority     → #021014  (Manifesto) → #010c12 (BookShowcase)
   Services      → #ffffff  (bg-white)
   Curriculum    → #ffffff  (bg-ink-950 = branco)
   PresenceMap   → #ffffff  (bg-white)
   FreeMaterial  → #ecfdf8  (mint/10 ≈)
   VipGroup      → #0b1f44  (color-brand-navy)
   Consultor     → #2a69ba  (color-brand-royal-deep)
   Footer        → #0b1f44  (color-brand-navy)
   ============================================================ */

const Hero = dynamic(
  () => import("@/features/hero/hero").then((m) => ({ default: m.Hero })),
  { ssr: false },
);
const Problem = dynamic(
  () => import("@/features/problem/problem").then((m) => ({ default: m.Problem })),
  { ssr: false },
);
const Authority = dynamic(
  () => import("@/features/authority/authority").then((m) => ({ default: m.Authority })),
  { ssr: false },
);
const CeoVideo = dynamic(
  () => import("@/features/ceo-video/ceo-video").then((m) => ({ default: m.CeoVideo })),
  { ssr: false },
);
const Services = dynamic(
  () => import("@/features/services/services").then((m) => ({ default: m.Services })),
);
const CurriculumInfographic = dynamic(
  () => import("@/features/curriculum/curriculum-infographic").then((m) => ({ default: m.CurriculumInfographic })),
);
const Testimonials = dynamic(
  () => import("@/features/testimonials/testimonials").then((m) => ({ default: m.Testimonials })),
  { ssr: false },
);
const FreeMaterial = dynamic(
  () => import("@/features/free-material/free-material").then((m) => ({ default: m.FreeMaterial })),
);
const VipGroup = dynamic(
  () => import("@/features/vip-group/vip-group").then((m) => ({ default: m.VipGroup })),
);
const Consultor = dynamic(
  () => import("@/features/consultor/consultor").then((m) => ({ default: m.Consultor })),
);
const FloatingWhatsapp = dynamic(
  () => import("@/features/consultor/floating-whatsapp").then((m) => ({ default: m.FloatingWhatsapp })),
  { ssr: false },
);

export function LandingPage() {
  return (
    <main className="relative">

      {/* 1 ── Hero (azul royal #4c8ade) */}
      <Hero />
      {/* Hero azul → Problem branco | forma: S largo */}
      <WaveDivider fromColor="#4c8ade" toColor="#ffffff" variant={3} height={90} shadowColor="#3b7bc7" />

      {/* 2 ── Problem (branco) */}
      <Problem />
      {/* Problem branco → CeoVideo navy | forma: assimétrico fundo */}
      <WaveDivider fromColor="#ffffff" toColor="#0b1f44" variant={5} height={100} shadowColor="#e2e8f0" />

      {/* 3 ── CeoVideo (navy #0b1f44) */}
      <CeoVideo />
      {/* CeoVideo navy → Manifesto dark | forma: dois picos */}
      <WaveDivider fromColor="#0b1f44" toColor="#021014" variant={4} height={80} shadowColor="#061530" />

      {/* 4 ── Authority: Manifesto (#021014) + Biography (branco) + BookShowcase (#010c12) */}
      <Authority />
      {/* BookShowcase dark → Services royal blue | forma: três ondas */}
      <WaveDivider fromColor="#021014" toColor="#4c8ade" variant={6} height={95} shadowColor="#0c264e" />

      {/* 5 ── Services (royal blue) */}
      <Services />
      {/* Services royal blue → Curriculum branco | forma: curva lenta */}
      <WaveDivider fromColor="#4c8ade" toColor="#f8fafc" variant={1} height={70} shadowColor="#3b7bc7" />

      {/* 6 ── CurriculumInfographic (branco/#f8fafc) */}
      <CurriculumInfographic />
      {/* Curriculum → Testimonials branco | forma: S clássico invertido */}
      <WaveDivider fromColor="#f8fafc" toColor="#ffffff" variant={2} height={75} shadowColor="#f1f5f9" />

      {/* 7 ── Testimonials (branco) */}
      <Testimonials />
      {/* Testimonials branco → FreeMaterial mint | forma: assimétrico */}
      <WaveDivider fromColor="#ffffff" toColor="#ecfdf8" variant={5} height={85} shadowColor="#f1f5f9" />

      {/* 8 ── FreeMaterial (mint suave #ecfdf8) */}
      <FreeMaterial />
      {/* FreeMaterial mint → VipGroup navy | forma: três ondas agitado */}
      <WaveDivider fromColor="#ecfdf8" toColor="#0b1f44" variant={6} height={100} shadowColor="#ccfbf1" />

      {/* 9 ── VipGroup (navy #0b1f44) */}
      <VipGroup />
      {/* VipGroup navy → Consultor royal-deep | forma: picos duplos */}
      <WaveDivider fromColor="#0b1f44" toColor="#2a69ba" variant={4} height={85} shadowColor="#061530" />

      {/* 10 ── Consultor (royal-deep #2a69ba) */}
      <Consultor />
      {/* Consultor → Footer navy | forma: S largo */}
      <WaveDivider fromColor="#2a69ba" toColor="#0b1f44" variant={3} height={80} shadowColor="#1b539c" />

      {/* ── FLUTUANTE */}
      <FloatingWhatsapp />
    </main>
  );
}
