"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Calendar, BookOpen, MessageCircle, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Glow } from "@/components/ui/glow";
import { Section } from "@/components/ui/section";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { Particles } from "@/components/effects/particles";
import { trackEvent } from "@/lib/analytics";
import { siteConfig, whatsappLink } from "@/constants/site";
import { cn } from "@/lib/utils";

/**
 * Hero — Capítulo I.
 *
 * Layout split inspirado em landings premium (MEI Nunca Mais / TED Talk):
 *
 *   Desktop (lg+)         Mobile
 *   ┌──────────┬──────┐   ┌──────────┐
 *   │  COPY    │ FOTO │   │   FOTO   │
 *   │  (60%)   │ (40%)│   │          │
 *   └──────────┴──────┘   ├──────────┤
 *                         │   COPY   │
 *                         └──────────┘
 *
 * Camadas:
 *   1. Atmosfera navy + glow mint/royal + partículas
 *   2. Copy editorial à esquerda (pergunta-disparo + headline + CTAs)
 *   3. Retrato do Dênis à direita com halo mint e identificação sobreposta
 *   4. Badges qualitativos no rodapé (sem números absolutos)
 */
export function Hero() {
  return (
    <Section
      id="topo"
      bleed
      className="relative min-h-[100svh] pt-[10rem] sm:pt-[12rem] pb-[6rem]"
    >
      <Atmosphere />
      <Particles count={48} className="-z-10" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          {/* ─── COPY (esquerda no desktop, embaixo no mobile) ─────── */}
          <div className="order-2 lg:order-1">
            <Reveal delay={0.05}>
              <Badge tone="glow" className="bg-[rgb(var(--color-brand-mint))]/10 border-[rgb(var(--color-brand-mint))]/40 text-[rgb(var(--color-brand-mint))]">
                <span className="size-1.5 rounded-full bg-[rgb(var(--color-brand-mint))] shadow-[0_0_12px] shadow-[rgb(var(--color-brand-mint))] animate-pulse" />
                Editora de tecnologia para escolas cristãs
              </Badge>
            </Reveal>

            <Reveal delay={0.12}>
              <p
                className="
                  mt-6 max-w-xl
                  font-mono text-[0.75rem] sm:text-[0.8125rem] uppercase
                  tracking-[0.22em] text-foreground/55
                "
              >
                Sua escola ensina tecnologia com cosmovisão cristã?
              </p>
            </Reveal>

            <h1
              className="
                mt-5 font-display font-light text-white
                text-[clamp(2.5rem,1.8rem+4.5vw,5.5rem)] leading-[0.98]
                tracking-[-0.035em]
                text-balance
              "
            >
              <SplitText text="Formamos pessoas" />
              <br />
              <SplitText text="para o futuro," delay={0.2} />{" "}
              <em
                className="
                  font-display italic
                  text-[rgb(var(--color-brand-mint))]
                  drop-shadow-[0_0_24px_rgba(94,230,184,0.35)]
                "
              >
                <SplitText text="com raiz." delay={0.4} />
              </em>
            </h1>

            <Reveal delay={0.45}>
              <p className="mt-8 max-w-xl text-[1.0625rem] sm:text-lg leading-[1.55] text-foreground/75">
                Currículo maker, formação docente, plataforma, espaço maker e
                assessoria institucional — desenvolvidos a partir da{" "}
                <span className="text-white font-medium">cosmovisão reformada</span>{" "}
                e ancorados em Verdade, Beleza e Bondade sob o Mandato Cultural.
              </p>
            </Reveal>

            {/* CTA primário em mint (verde brand) — destaque máximo */}
            <Reveal delay={0.6}>
              <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="#reuniao"
                  onClick={() =>
                    trackEvent({
                      name: "cta_click",
                      placement: "hero_primary",
                      label: "Agendar reunião estratégica",
                    })
                  }
                  className="
                    group inline-flex items-center justify-center gap-2.5
                    h-14 px-7 rounded-full
                    bg-[rgb(var(--color-brand-mint))] hover:bg-[rgb(var(--color-brand-mint-deep))]
                    text-[rgb(var(--color-brand-navy))]
                    font-semibold text-[1rem]
                    shadow-[0_18px_40px_-12px_rgba(94,230,184,0.55)]
                    transition-all duration-300 ease-[var(--ease-cinematic)]
                    hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-12px_rgba(94,230,184,0.7)]
                  "
                >
                  <Calendar className="size-[1.15em] opacity-80" aria-hidden />
                  Quero agendar reunião
                </a>

                <a
                  href={whatsappLink("vip")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent({
                      name: "cta_click",
                      placement: "hero_secondary",
                      label: "Grupo VIP",
                    })
                  }
                  className="
                    inline-flex items-center justify-center gap-2.5
                    h-14 px-6 rounded-full
                    border border-white/20 hover:border-white/40
                    bg-white/[0.04] hover:bg-white/[0.08]
                    text-white font-medium text-[0.9375rem]
                    transition-colors duration-300
                  "
                >
                  <Users className="size-4 opacity-80" aria-hidden />
                  Entrar no grupo VIP
                </a>
              </div>
            </Reveal>

            {/* CTA terciário em link sutil */}
            <Reveal delay={0.7}>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <a
                  href="#material"
                  onClick={() =>
                    trackEvent({
                      name: "cta_click",
                      placement: "hero_tertiary",
                      label: "Material gratuito",
                    })
                  }
                  className="inline-flex items-center gap-1.5 text-foreground/70 hover:text-white transition-colors"
                >
                  <BookOpen className="size-3.5 opacity-70" aria-hidden />
                  Baixar a trilogia gratuita
                </a>
                <a
                  href={whatsappLink("consultor")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent({
                      name: "cta_click",
                      placement: "hero_tertiary",
                      label: "Consultor WhatsApp",
                    })
                  }
                  className="inline-flex items-center gap-1.5 text-foreground/70 hover:text-white transition-colors"
                >
                  <MessageCircle className="size-3.5 opacity-70" aria-hidden />
                  Falar com consultor
                </a>
              </div>
            </Reveal>

            {/* Badges institucionais qualitativos (sem números) */}
            <Reveal delay={0.85}>
              <HeroBadges />
            </Reveal>
          </div>

          {/* ─── FOTO DO CEO (direita no desktop) ──────────────────── */}
          <div className="order-1 lg:order-2 relative">
            <CeoPortrait />
          </div>
        </div>

        <Reveal delay={1}>
          <ScrollHint />
        </Reveal>
      </Container>
    </Section>
  );
}

/* ─── Atmosfera de fundo ──────────────────────────────────────── */
function Atmosphere() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 75% 35%, rgba(94,230,184,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 15% 65%, rgba(59,122,229,0.16) 0%, transparent 60%), linear-gradient(180deg, rgb(7,12,28) 0%, rgb(4,8,20) 100%)",
        }}
      />
      <Glow color="cyan" size="xl" intensity={0.20} className="-top-32 left-1/4 -translate-x-1/2" />
      <Glow color="violet" size="lg" intensity={0.18} className="-bottom-32 -left-32 hidden sm:block" />

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-[6rem] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
    </>
  );
}

/* ─── Retrato do CEO com halo mint + identificação sobreposta ── */
function CeoPortrait() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* Halo mint atrás do retrato */}
      <div
        aria-hidden
        className="
          absolute -inset-10
          rounded-full
          bg-[rgb(var(--color-brand-mint))]/25
          blur-[64px]
          motion-reduce:hidden
        "
      />
      <div
        aria-hidden
        className="
          absolute -inset-6 -z-10
          rounded-full
          bg-gradient-to-tr from-[rgb(var(--color-brand-royal))]/30 via-transparent to-[rgb(var(--color-brand-mint))]/20
          blur-3xl
        "
      />

      {/* Moldura do retrato */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="
          relative aspect-[4/5] overflow-hidden
          rounded-[2rem]
          border border-white/12
          bg-ink-900
          shadow-[0_60px_120px_-32px_rgba(94,230,184,0.35),0_40px_80px_-40px_rgba(0,0,0,0.7)]
        "
      >
        <Image
          src={siteConfig.founder.portrait}
          alt={`Retrato de ${siteConfig.founder.name}, ${siteConfig.founder.role}`}
          fill
          priority
          sizes="(min-width: 1024px) 28rem, 100vw"
          className="object-cover object-center"
        />

        {/* Gradiente inferior para legibilidade do nome */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background:
              "linear-gradient(0deg, rgba(4,8,20,0.95) 0%, rgba(4,8,20,0.55) 45%, rgba(4,8,20,0) 100%)",
          }}
        />

        {/* Identificação institucional sobreposta */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[rgb(var(--color-brand-mint))]">
                CEO & Fundador
              </div>
              <div className="mt-1 font-display text-[1.5rem] leading-[1.1] tracking-[-0.02em] text-white">
                Dênis Júlio
              </div>
              <div className="mt-0.5 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-white/55">
                We Make Educação Tecnológica
              </div>
            </div>
            <span
              aria-hidden
              className="
                inline-flex items-center gap-1.5 rounded-full
                border border-[rgb(var(--color-brand-mint))]/40
                bg-[rgb(var(--color-brand-mint))]/12 backdrop-blur
                px-2.5 py-1
                font-mono text-[0.5625rem] uppercase tracking-[0.18em]
                text-[rgb(var(--color-brand-mint))]
              "
            >
              <span className="size-1 rounded-full bg-[rgb(var(--color-brand-mint))] animate-pulse" />
              ao vivo
            </span>
          </div>
        </div>
      </motion.div>

      {/* Tags de credenciais (lado direito flutuando) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -right-3 sm:-right-6 top-8 hidden sm:flex flex-col gap-1.5"
      >
        {siteConfig.founder.credentials.slice(0, 3).map((c) => (
          <span
            key={c.short}
            className="
              inline-flex items-center gap-1.5 rounded-full
              border border-white/15 bg-ink-950/80 backdrop-blur-md
              px-3 py-1.5
              font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/85
              shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)]
            "
          >
            <span className="size-1 rounded-full bg-[rgb(var(--color-brand-mint))]" />
            {c.short}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Badges institucionais ───────────────────────────────────── */
function HeroBadges() {
  const badges = [
    { label: "Currículo maker",       value: "CRISTÃO" },
    { label: "Início das parcerias",  value: "JAN 2027" },
    { label: "Vagas",                 value: "LIMITADAS" },
    { label: "Cobertura",             value: "NACIONAL" },
  ];
  return (
    <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] max-w-2xl">
      {badges.map((b) => (
        <div key={b.label} className="bg-ink-900/70 backdrop-blur-md px-4 py-3.5">
          <div className="font-display text-base tracking-[-0.01em] text-white">
            {b.value}
          </div>
          <div className="mt-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-foreground/45">
            {b.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Scroll hint inferior ────────────────────────────────────── */
function ScrollHint() {
  return (
    <motion.div
      className={cn(
        "mt-16 inline-flex flex-col items-center gap-2 text-foreground/40",
        "absolute left-1/2 -translate-x-1/2 bottom-4 hidden lg:flex",
      )}
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
