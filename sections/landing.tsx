import dynamic from "next/dynamic";
import { Hero } from "@/features/hero/hero";
import { WorldChanged } from "@/features/world-changed/world-changed";
import { Problem } from "@/features/problem/problem";
import { Principles } from "@/features/principles/principles";
import { VipBanner } from "@/features/vip-group/vip-banner";

/* ============================================================
   Composer da landing — MVP.
   Sequência por cor (navy → ivory → royal → mint) com transições
   suaves via <ModuleSection /> (cantos arredondados + overlap).
   Acima da dobra carrega eager; abaixo carrega dynamic p/ TTFB enxuto.
   ============================================================ */

const CeoVideo = dynamic(
  () => import("@/features/ceo-video/ceo-video").then((m) => ({ default: m.CeoVideo })),
);
const Vision = dynamic(
  () => import("@/features/vision/vision").then((m) => ({ default: m.Vision })),
);
const Services = dynamic(
  () => import("@/features/services/services").then((m) => ({ default: m.Services })),
);
const PresenceMap = dynamic(
  () => import("@/features/presence-map/presence-map").then((m) => ({ default: m.PresenceMap })),
);
const Humans = dynamic(
  () => import("@/features/humans/humans").then((m) => ({ default: m.Humans })),
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
 * Arco narrativo do MVP (com cor por módulo):
 *
 *   I.    Hero                       — navy   (cinema, abertura)
 *   II.   O Mundo Mudou              — ivory  (luz, diagnóstico cultural)
 *   III.  O Problema                 — royal  (institucional, ousadia)
 *   IV.   Os 7 Princípios            — ivory  (núcleo do livro)
 *   V.    Visão (V·B·B)              — navy   (manifesto)
 *   ★     VipBanner pós-princípios   — mint
 *   VI.   Manifesto do CEO           — navy   (player cinemático)
 *   ★     VipBanner pós-vídeo        — navy variant
 *   VII.  Soluções                   — ivory  (catálogo institucional)
 *   VIII. Presença Nacional          — sky    (mapa + 11 escolas/5 estados)
 *   IX.   Humans                     — navy   (sequência cinema)
 *   X.    Material gratuito          — ivory  (livro do CEO + form)
 *   XI.   VIP Group                  — mint   (seção principal do VIP)
 *   XII.  Consultor (WhatsApp)       — ivory
 *   XIII. FAQ                        — ivory
 *   XIV.  CTA estratégica + Reunião  — royal/ivory (fechamento)
 *
 *  Footer entra via app/layout.tsx.
 */
export function LandingPage() {
  return (
    <main className="relative">
      <Hero />
      <WorldChanged />
      <Problem />
      <Principles />
      <Vision />

      <VipBanner
        placement="post_principles"
        variant="mint"
        headline="Está acompanhando os 7 princípios? Receba o que vier antes de todo mundo."
        caption="No grupo VIP no WhatsApp publicamos antes — bastidores, novos capítulos, convites para imersões."
      />

      <CeoVideo />

      <VipBanner
        placement="post_ceo_video"
        variant="navy"
        headline="Quer conversar diretamente com o Dênis e outros gestores?"
        caption="No grupo VIP, o time da We Make e diretores de escolas parceiras dialogam todos os dias."
      />

      <Services />
      <PresenceMap />
      <Humans />
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
