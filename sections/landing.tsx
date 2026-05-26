"use client";

import { WaveDivider } from "@/components/ui/wave-divider";

/* ============================================================
   Mapa de cores reais de fundo por módulo:
   Hero          → #4c8ade  (color-brand-royal)
   Problem       → #ffffff  (bg-white)
   CeoVideo      → #0b1f44  (color-brand-navy)
   Authority     → #021014  (FounderIntro) → #010c12 (BookShowcase)
   Services      → #ffffff  (bg-white)
   Curriculum    → #ffffff  (bg-ink-950 = branco)
   PresenceMap   → #ffffff  (bg-white)
   FreeMaterial  → #ecfdf8  (mint/10 ≈)
   VipGroup      → #0b1f44  (color-brand-navy)
   Consultor     → #2a69ba  (color-brand-royal-deep)
   Footer        → #0b1f44  (color-brand-navy)
   ============================================================

   Estratégia de carregamento:
   - Above-the-fold (Hero + Problem) → import direto (SSR), zero flash
   - Mid-page (CeoVideo, Authority, Services, Curriculum) → SSR também
     para que o HTML completo chegue ao browser no primeiro byte
   - Below-the-fold pesados (FloatingWhatsapp) → dynamic ssr:false
     pois só importa após interação
   ============================================================ */

import { Hero } from "@/features/hero/hero";
import { Problem } from "@/features/problem/problem";
import { CeoVideo } from "@/features/ceo-video/ceo-video";
import { Authority } from "@/features/authority/authority";
import { Services } from "@/features/services/services";
import { CurriculumInfographic } from "@/features/curriculum/curriculum-infographic";
import { Testimonials } from "@/features/testimonials/testimonials";
import { FreeMaterial } from "@/features/free-material/free-material";
import { VipGroup } from "@/features/vip-group/vip-group";
import { Consultor } from "@/features/consultor/consultor";
import { MaturidadeTeaser } from "@/features/diagnostico/maturidade-teaser";
import dynamic from "next/dynamic";

const FloatingWhatsapp = dynamic(
  () => import("@/features/consultor/floating-whatsapp").then((m) => ({ default: m.FloatingWhatsapp })),
  { ssr: false },
);

export function LandingPage() {
  return (
    <main className="relative">

      {/* 1 ── Hero (azul royal #4c8ade) */}
      <Hero />
      {/* Hero azul → Problem branco | curva suave */}
      <WaveDivider fromColor="#4c8ade" toColor="#ffffff" variant={1} height={70} />

      {/* 2 ── Problem (branco) */}
      <Problem />
      {/* Problem branco → CeoVideo navy | curva suave */}
      <WaveDivider fromColor="#ffffff" toColor="#0b1f44" variant={1} height={70} />

      {/* 3 ── CeoVideo (navy #0b1f44) */}
      <CeoVideo />
      {/* CeoVideo navy → Authority dark | curva suave */}
      <WaveDivider fromColor="#0b1f44" toColor="#021014" variant={1} height={60} />

      {/* 4 ── Authority: FounderIntro (#021014) + BookShowcase (#010c12) */}
      <Authority />
      {/* BookShowcase dark → Services royal blue | curva suave alta para esconder vazamento de glow */}
      <WaveDivider fromColor="#021014" toColor="#4c8ade" variant={1} height={90} />

      {/* 5 ── Services (royal blue) */}
      <Services />
      {/* Services royal blue → Curriculum branco | curva suave */}
      <WaveDivider fromColor="#4c8ade" toColor="#f8fafc" variant={1} height={60} />

      {/* 6 ── CurriculumInfographic (branco/#f8fafc) */}
      <CurriculumInfographic />
      {/* Curriculum branco → Maturidade royal | curva suave */}
      <WaveDivider fromColor="#f8fafc" toColor="#4c8ade" variant={1} height={60} />

      {/* 6.5 ── Teaser do Diagnóstico (CTA leva pra /diagnostico-maturidade) */}
      <MaturidadeTeaser />
      {/* Maturidade → Testimonials navy | curva suave */}
      <WaveDivider fromColor="#4c8ade" toColor="#0b1f44" variant={1} height={60} />

      {/* 7 ── Testimonials (navy #0b1f44) */}
      <Testimonials />
      {/* Testimonials navy → FreeMaterial mint | curva suave */}
      <WaveDivider fromColor="#0b1f44" toColor="#ecfdf8" variant={1} height={60} />

      {/* 8 ── FreeMaterial (mint suave #ecfdf8) */}
      <FreeMaterial />
      {/* FreeMaterial mint → VipGroup navy | curva suave */}
      <WaveDivider fromColor="#ecfdf8" toColor="#0b1f44" variant={1} height={70} />

      {/* 9 ── VipGroup (navy #0b1f44) */}
      <VipGroup />
      {/* VipGroup navy → Consultor royal-deep | curva suave */}
      <WaveDivider fromColor="#0b1f44" toColor="#2a69ba" variant={1} height={60} />

      {/* 10 ── Consultor (royal-deep #2a69ba) */}
      <Consultor />
      {/* Consultor → Footer navy | curva suave */}
      <WaveDivider fromColor="#2a69ba" toColor="#0b1f44" variant={1} height={60} />

      {/* ── FLUTUANTE */}
      <FloatingWhatsapp />
    </main>
  );
}
