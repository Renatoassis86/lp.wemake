import dynamic from "next/dynamic";
import { Hero } from "@/features/hero/hero";
import { WorldChanged } from "@/features/world-changed/world-changed";
import { Problem } from "@/features/problem/problem";
import { Principles } from "@/features/principles/principles";
import { VipBanner } from "@/features/vip-group/vip-banner";

/* ============================================================
   Composer da landing — MVP / campanha 2027.
   Sequência por cor com cantos arredondados (ModuleSection) e
   distribuição estratégica de CTAs VIP/Consultor em pontos-chave.
   Acima da dobra: eager. Demais: dynamic p/ TTFB enxuto.
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
 * Arco narrativo — 17 momentos (incluindo 5 banners de conversão):
 *
 *   I.    Hero (split com foto do Dênis)
 *   II.   O Mundo Mudou
 *   III.  O Problema das escolas
 *   IV.   Os 7 Princípios (núcleo do livro)
 *   V.    Visão (V·B·B + Mandato)
 *   ★     CTA VIP — pós-princípios (mint)
 *   VI.   Manifesto filmado do CEO
 *   ★     CTA VIP — pós-vídeo (navy)
 *   VII.  Soluções (5 frentes)
 *   VIII. Presença Nacional (mapa)
 *   ★     CTA Consultor — pós-presença (royal)
 *   IX.   Humans (cinema)
 *   ★     CTA VIP — pós-humans (mint)
 *   X.    Trilogia gratuita (3 PDFs + form)
 *   XI.   Grupo VIP (seção principal)
 *   XII.  Consultor (WhatsApp direto)
 *   XIII. FAQ
 *   XIV.  CTA estratégica final
 *   XV.   Reunião (formulário completo)
 *
 *  Floating: ChapterRail (esquerda), FloatingWhatsapp (canto), Nav (topo).
 *  Footer renderizado em app/layout.tsx.
 */
export function LandingPage() {
  return (
    <main className="relative">
      <Hero />
      <WorldChanged />
      <Problem />
      <Principles />
      <Vision />

      {/* CTA 1 — VIP após os princípios (continuação natural da leitura) */}
      <VipBanner
        placement="post_principles"
        variant="mint"
        headline="Está acompanhando os 7 princípios? Receba o que vier antes de todo mundo."
        caption="No grupo VIP no WhatsApp publicamos antes — bastidores, novos capítulos, convites para imersões e o lançamento de cada novo material."
      />

      <CeoVideo />

      {/* CTA 2 — VIP após o vídeo (autoridade reforçada → adesão à comunidade) */}
      <VipBanner
        placement="post_ceo_video"
        variant="navy"
        headline="Quer continuar essa conversa com o Dênis e outros gestores?"
        caption="No grupo VIP, o time da We Make e diretores de escolas parceiras dialogam todos os dias — em ambiente fechado, sem ruído."
      />

      <Services />
      <PresenceMap />

      {/* CTA 3 — Consultor após a presença nacional (curiosidade → atendimento 1:1) */}
      <VipBanner
        placement="post_presence"
        variant="royal"
        headline="Sua cidade ainda não aparece no mapa? Vamos conversar."
        caption="Estamos abrindo vagas por região para a entrada das parcerias em janeiro de 2027 — fale agora com um consultor da We Make."
      />

      <Humans />

      {/* CTA 4 — VIP após Humans (emocional → adesão à comunidade) */}
      <VipBanner
        placement="post_humans"
        variant="mint"
        headline="Reconheceu essas cenas na sua escola? Junte-se a quem faz."
        caption="No grupo VIP você acompanha o dia a dia das escolas parceiras e troca experiências com diretores que vivem o mesmo desafio."
      />

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
