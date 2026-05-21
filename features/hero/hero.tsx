"use client";

import { motion } from "framer-motion";
import { ArrowDown, Calendar, BookOpen, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Glow } from "@/components/ui/glow";
import { Section } from "@/components/ui/section";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { AmbientVideo } from "@/components/effects/ambient-video";
import { Particles } from "@/components/effects/particles";
import { trackEvent } from "@/lib/analytics";
import { siteConfig, whatsappLink } from "@/constants/site";

/**
 * Hero cinematográfica — Ato I.
 *
 * Camadas, de baixo para cima:
 *   1. Vídeo do CEO em loop silencioso (ambient)
 *   2. Vinheta + gradiente cinematográfico
 *   3. Glow orbs + partículas
 *   4. Tipografia editorial + 3 CTAs estratégicos
 */
export function Hero() {
  return (
    <Section
      id="topo"
      bleed
      className="relative min-h-[100svh] pt-[12rem] sm:pt-[16rem] pb-[8rem]"
    >
      <AmbientVideo
        src={siteConfig.ceo.videoHero}
        poster={siteConfig.ceo.videoHeroPoster}
        className="absolute inset-0 -z-20"
      />
      <Atmosphere />
      <Particles count={56} className="-z-10" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-[72rem] text-center">
          <Reveal delay={0.05}>
            <Badge tone="glow" className="mx-auto">
              <span className="size-1.5 rounded-full bg-glow-cyan shadow-[0_0_12px] shadow-glow-cyan animate-pulse" />
              Movimento de educação cristã · 2026
            </Badge>
          </Reveal>

          <h1
            className="
              mt-10 font-display font-light text-gradient-cinematic
              text-[clamp(2.75rem,2.2rem+5vw,7rem)] leading-[0.94]
              tracking-[-0.038em]
            "
          >
            <SplitText text="Formamos pessoas" />
            <br />
            <SplitText text="para o futuro," delay={0.2} />{" "}
            <em className="font-display italic text-ivory-100">
              <SplitText text="com raiz." delay={0.4} />
            </em>
          </h1>

          <Reveal delay={0.4}>
            <p
              className="
                mx-auto mt-10 max-w-[46rem]
                text-balance text-[1.0625rem] sm:text-lg
                leading-[1.55] text-foreground/70
              "
            >
              A We Make é uma editora brasileira de soluções tecnológicas para
              escolas cristãs. Currículo maker, formação docente, plataforma,
              espaço maker e assessoria institucional —{" "}
              <span className="text-foreground/90">
                ancorados em Verdade, Beleza e Bondade.
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.55}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="xl"
                trailingIcon
                asChild
                onClick={() =>
                  trackEvent({
                    name: "cta_click",
                    placement: "hero",
                    label: "Agendar reunião estratégica",
                  })
                }
              >
                <a href="#reuniao">
                  <Calendar className="size-[1.05em] mr-1 opacity-80" aria-hidden />
                  Agendar reunião
                </a>
              </Button>
              <Button
                size="xl"
                variant="secondary"
                asChild
                onClick={() =>
                  trackEvent({
                    name: "cta_click",
                    placement: "hero",
                    label: "Material gratuito",
                  })
                }
              >
                <a href="#material">
                  <BookOpen className="size-[1.05em] mr-1 opacity-80" aria-hidden />
                  Material gratuito
                </a>
              </Button>
              <Button
                size="xl"
                variant="outline"
                asChild
                onClick={() =>
                  trackEvent({
                    name: "cta_click",
                    placement: "hero",
                    label: "Grupo VIP",
                  })
                }
              >
                <a href={whatsappLink("vip")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-[1.05em] mr-1 opacity-80" aria-hidden />
                  Grupo VIP
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.75}>
            <HeroSignals />
          </Reveal>

          <Reveal delay={0.9}>
            <ScrollHint />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function Atmosphere() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.16) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 50% 100%, rgba(139,92,246,0.10) 0%, transparent 60%)",
        }}
      />
      <Glow color="cyan" size="xl" intensity={0.32} className="top-[-12rem] left-1/2 -translate-x-1/2" />
      <Glow color="violet" size="lg" intensity={0.2} className="top-[22rem] -left-40 hidden sm:block" />
      <Glow color="blue" size="lg" intensity={0.18} className="top-[32rem] -right-40 hidden sm:block" />

      <div
        aria-hidden
        className="absolute inset-x-0 top-[28rem] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
    </>
  );
}

function HeroSignals() {
  const signals = [
    { label: "escolas parceiras", value: `${siteConfig.presence.schools}+` },
    { label: "estados brasileiros", value: `${siteConfig.presence.states}` },
    { label: "estudantes alcançados", value: `${(siteConfig.presence.students / 1000).toFixed(0)}k` },
    { label: "educadores formados", value: `${(siteConfig.presence.educators / 1000).toFixed(1)}k` },
  ];
  return (
    <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] mx-auto max-w-3xl">
      {signals.map((s) => (
        <div key={s.label} className="bg-ink-900/70 backdrop-blur-md px-4 py-5 text-center">
          <div className="font-display text-2xl tracking-[-0.02em]">{s.value}</div>
          <div className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-foreground/45">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function ScrollHint() {
  return (
    <motion.div
      className="mt-16 inline-flex flex-col items-center gap-2 text-foreground/40"
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.3em]">
        Continue lendo
      </span>
      <ArrowDown className="size-3.5" aria-hidden />
    </motion.div>
  );
}
