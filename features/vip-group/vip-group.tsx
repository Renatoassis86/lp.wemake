"use client";

import { motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Glow } from "@/components/ui/glow";
import { Particles } from "@/components/effects/particles";
import { Reveal } from "@/components/motion/reveal";
import { whatsappLink } from "@/constants/site";
import { trackEvent } from "@/lib/analytics";

const perks = [
  "Convites para imersões e eventos institucionais",
  "Acesso antecipado a cadernos editoriais",
  "Discussões pedagógicas com diretores de todo o Brasil",
  "Conteúdos exclusivos do CEO",
  "Convites para mesas-redondas com o conselho consultivo",
];

/**
 * Ato X — Grupo VIP (WhatsApp).
 * Convite premium, restrito, com tom de comunidade institucional.
 */
export function VipGroup() {
  return (
    <Section id="vip" bleed tight>
      <Particles count={32} density="subtle" seed={313} className="-z-10" />

      <Container>
        <Reveal>
          <div
            className="
              relative isolate overflow-hidden
              rounded-[2.5rem] border border-white/12
              bg-gradient-to-br from-ink-850 via-ink-900 to-ink-950
              p-10 sm:p-16
              shadow-[0_60px_120px_-40px_rgba(0,0,0,0.85)]
            "
          >
            <Glow color="violet" size="xl" intensity={0.32} className="-top-40 left-1/3" />
            <Glow color="cyan" size="lg" intensity={0.22} className="-right-32 bottom-0" />

            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <Eyebrow>Capítulo X · Comunidade restrita</Eyebrow>
                <h2 className="mt-5 font-display font-light text-gradient-cinematic text-[clamp(2rem,1.6rem+2.2vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
                  Um lugar para diretores que pensam dez anos à frente.
                </h2>
                <p className="mt-6 max-w-prose text-[1rem] leading-[1.65] text-foreground/70">
                  O grupo VIP da We Make é uma comunidade restrita no WhatsApp
                  para diretores, mantenedores e coordenadores de escolas
                  cristãs que querem caminhar conosco de perto.
                </p>

                <ul className="mt-10 grid sm:grid-cols-2 gap-3">
                  {perks.map((perk) => (
                    <motion.li
                      key={perk}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-start gap-3 text-[0.9375rem] text-foreground/80"
                    >
                      <span className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-glow-violet/20 ring-1 ring-glow-violet/40">
                        <Check className="size-3 text-glow-violet" />
                      </span>
                      {perk}
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <Button
                    size="xl"
                    asChild
                    onClick={() =>
                      trackEvent({
                        name: "cta_click",
                        placement: "vip_group",
                        label: "Entrar no grupo VIP",
                      })
                    }
                  >
                    <a
                      href={whatsappLink("vip")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="size-[1.05em] mr-1 opacity-80" aria-hidden />
                      Entrar no grupo VIP
                    </a>
                  </Button>
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-foreground/45">
                    Aprovação manual · Sem custo
                  </span>
                </div>
              </div>

              {/* WhatsApp visual mock */}
              <div className="lg:col-span-5">
                <ChatPreview />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function ChatPreview() {
  const lines = [
    { from: "denis", text: "Bom dia, comunidade! Hoje publicamos a nova diretriz de IA na Educação Básica." },
    { from: "diretor", text: "Excelente, Dênis. Vou levar para a próxima reunião pedagógica." },
    { from: "denis", text: "Convite: imersão presencial em SP, dia 14. Vagas restritas." },
  ];
  return (
    <div
      className="
        relative mx-auto max-w-md
        rounded-[2rem] border border-white/15
        bg-ink-950/80 backdrop-blur-xl
        p-5
        shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]
      "
    >
      <div className="flex items-center gap-3 pb-4 border-b border-white/10">
        <div className="size-9 rounded-full bg-gradient-to-br from-glow-violet/40 to-glow-cyan/40 ring-1 ring-white/15" />
        <div>
          <div className="font-display text-base">We Make · VIP</div>
          <div className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-foreground/45">
            Grupo restrito · 240 membros
          </div>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.18, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={l.from === "denis" ? "" : "ml-10"}
          >
            <div
              className={
                l.from === "denis"
                  ? "inline-block max-w-[85%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.05] px-4 py-2.5 text-[0.875rem] text-foreground/85"
                  : "inline-block max-w-[85%] rounded-2xl rounded-tr-sm bg-glow-cyan/15 border border-glow-cyan/25 px-4 py-2.5 text-[0.875rem] text-foreground/90"
              }
            >
              {l.text}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
