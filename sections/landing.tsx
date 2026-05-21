import dynamic from "next/dynamic";
import { Hero } from "@/features/hero/hero";
import { WorldChanged } from "@/features/world-changed/world-changed";
import { Problem } from "@/features/problem/problem";
import { Vision } from "@/features/vision/vision";

/* ============================================================
   Scroll-storytelling composer — 14 atos.
   Acts I–IV ship eagerly (above the fold + first scroll).
   Below-the-fold acts are dynamically imported so the first
   paint stays under 100kB JS while preserving the narrative weight.
   ============================================================ */

const CeoVideo = dynamic(
  () => import("@/features/ceo-video/ceo-video").then((m) => ({ default: m.CeoVideo })),
);
const Services = dynamic(
  () => import("@/features/services/services").then((m) => ({ default: m.Services })),
);
const PresenceMap = dynamic(
  () => import("@/features/presence-map/presence-map").then((m) => ({ default: m.PresenceMap })),
);
const Gallery = dynamic(
  () => import("@/features/gallery/gallery").then((m) => ({ default: m.Gallery })),
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
const Faq = dynamic(
  () => import("@/features/faq/faq").then((m) => ({ default: m.Faq })),
);
const CtaStrategic = dynamic(
  () => import("@/features/cta/cta-strategic").then((m) => ({ default: m.CtaStrategic })),
);
const Contact = dynamic(
  () => import("@/features/contact/contact").then((m) => ({ default: m.Contact })),
);
const FloatingWhatsapp = dynamic(
  () =>
    import("@/features/consultor/floating-whatsapp").then((m) => ({
      default: m.FloatingWhatsapp,
    })),
  { ssr: false },
);

/**
 * The 14-act narrative arc:
 *
 *   I.    Hero cinematográfica            — vídeo do CEO + 3 CTAs
 *   II.   O mundo mudou                   — diagnóstico cultural
 *   III.  O problema das escolas          — diagnóstico institucional
 *   IV.   A visão da We Make              — Verdade · Beleza · Bondade · Mandato
 *   V.    Vídeo do CEO                    — player cinematográfico
 *   VI.   Produtos e serviços             — 5 frentes integradas
 *   VII.  Presença nacional               — mapa interativo do Brasil
 *   VIII. Galeria humana                  — frames temáticos
 *   IX.   Material gratuito               — livro + e-books
 *   X.    Grupo VIP                       — comunidade WhatsApp
 *   XI.   Consultor comercial             — WhatsApp direto
 *   XII.  FAQ premium                     — perguntas estratégicas
 *   XIII. CTA final + Reunião             — agendamento institucional
 *   XIV.  Footer                          — rendered no layout.tsx
 */
export function LandingPage() {
  return (
    <main className="relative">
      <Hero />
      <WorldChanged />
      <Problem />
      <Vision />
      <CeoVideo />
      <Services />
      <PresenceMap />
      <Gallery />
      <FreeMaterial />
      <VipGroup />
      <Consultor />
      <Faq />
      <CtaStrategic />
      <Contact />
      <FloatingWhatsapp />
    </main>
  );
}
