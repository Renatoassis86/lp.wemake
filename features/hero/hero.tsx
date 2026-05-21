"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Glow } from "@/components/ui/glow";
import { Section } from "@/components/ui/section";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { trackEvent } from "@/lib/analytics";

/**
 * Cinematic hero — manifesto in motion.
 * Layered glow + grain + editorial display type + restrained CTA.
 */
export function Hero() {
  return (
    <Section
      id="topo"
      bleed
      className="relative pt-[14rem] pb-[var(--space-section)] sm:pt-[18rem]"
    >
      {/* Atmospheric backdrop */}
      <Atmosphere />

      <Container className="relative z-10">
        <div className="mx-auto max-w-[68rem] text-center">
          <Reveal delay={0.05}>
            <Badge tone="glow" className="mx-auto">
              <span className="size-1.5 rounded-full bg-glow-cyan shadow-[0_0_12px] shadow-glow-cyan animate-pulse" />
              Editora de tecnologia para escolas cristãs
            </Badge>
          </Reveal>

          <h1
            className="
              mt-8 font-display font-light text-gradient-cinematic
              text-[clamp(2.75rem,2.3rem+4.5vw,6.5rem)] leading-[0.95]
              tracking-[-0.035em]
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
                mx-auto mt-10 max-w-[44rem]
                text-balance text-[1.0625rem] sm:text-lg
                leading-[1.55] text-foreground/70
              "
            >
              A We Make é uma editora brasileira de soluções tecnológicas para
              escolas cristãs. Pensamos a tecnologia como objeto de formação humana —
              currículo, plataforma e formação continuada ancorados em cosmovisão cristã.
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
                <a href="#contato">Agendar reunião estratégica</a>
              </Button>
              <Button size="xl" variant="secondary" asChild>
                <a href="#manifesto">Ler o manifesto</a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.75}>
            <ScrollHint />
          </Reveal>
        </div>
      </Container>

      {/* Visual specimen — could be replaced by a documentary still or motion piece */}
      <div className="relative z-10 mt-24">
        <Container>
          <HeroVisual />
        </Container>
      </div>
    </Section>
  );
}

function Atmosphere() {
  return (
    <>
      {/* Deep gradient floor */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 50% 100%, rgba(139,92,246,0.10) 0%, transparent 60%), linear-gradient(180deg, rgb(7,12,28) 0%, rgb(4,8,20) 100%)",
        }}
      />
      <Glow color="cyan" size="xl" intensity={0.32} className="top-[-10rem] left-1/2 -translate-x-1/2" />
      <Glow color="violet" size="lg" intensity={0.22} className="top-[20rem] -left-40 hidden sm:block" />
      <Glow color="blue" size="lg" intensity={0.2} className="top-[30rem] -right-40 hidden sm:block" />

      {/* Hairline grid horizon */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-[24rem] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      {/* Grain */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
    </>
  );
}

function ScrollHint() {
  return (
    <motion.div
      className="mt-20 inline-flex flex-col items-center gap-2 text-foreground/40"
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

function HeroVisual() {
  return (
    <div className="relative mx-auto max-w-[64rem]">
      <div className="absolute -inset-x-12 -inset-y-8 -z-10 rounded-[3rem] bg-glow-cyan/10 blur-3xl" />
      <div
        className="
          relative overflow-hidden rounded-[2rem]
          border border-white/10
          bg-gradient-to-br from-ink-850 via-ink-900 to-ink-950
          shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)]
          aspect-[16/9]
        "
      >
        <div className="absolute inset-0 grid grid-cols-12 opacity-[0.06]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-white/30 last:border-r-0" />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="font-mono text-[0.625rem] uppercase tracking-[0.3em] text-foreground/40">
              Documentário Institucional · 2026
            </div>
            <div className="mt-2 font-display text-2xl text-foreground/60">
              Onde a tecnologia encontra a tradição
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
