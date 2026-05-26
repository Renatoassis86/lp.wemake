"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Clock, CheckCircle2, Sparkles, BookOpen, Bot, Cpu } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

const PHOTO_SRC = "/photos/formacao_docente.png";

/**
 * Hero da LP /diagnostico/maturidade.
 * Layout split: explicação + CTA à esquerda, foto da equipe maker em blob
 * orgânico à direita (mesmo padrão das outras seções do site — blob,
 * ícones flutuantes monocromáticos tech+fé, marca d'água sutil).
 */
export function MaturidadeHero({ onStart }: { onStart?: () => void } = {}) {
  return (
    <Section
      bleed
      className="relative pt-[7rem] sm:pt-[9rem] md:pt-[10rem] lg:pt-[11rem] pb-14 sm:pb-20 bg-[rgb(var(--color-brand-royal))] overflow-hidden"
    >
      {/* Atmosfera de fundo */}
      <Atmosphere />

      {/* Marca d'água W */}
      <div
        aria-hidden
        className="hidden md:block absolute -bottom-16 -right-16 w-[360px] lg:w-[440px] aspect-square opacity-[0.06] rotate-12 pointer-events-none select-none z-0"
      >
        <Image src="/photos/3.png" alt="" fill className="object-contain" sizes="440px" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">

          {/* ─── COLUNA ESQUERDA: explicação + CTA ─── */}
          <div className="order-1">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgb(var(--color-brand-mint))]/20 text-[rgb(var(--color-brand-mint))] font-bold text-[0.75rem] mb-5 border border-[rgb(var(--color-brand-mint))]/30">
                <BarChart3 className="size-3.5" />
                DIAGNÓSTICO GRATUITO
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1
                className="font-display text-white text-[clamp(2rem,4vw+0.5rem,3.75rem)] leading-[1.05] tracking-normal text-balance mb-5"
                style={{ textShadow: "0 4px 12px rgba(0,0,0,0.18)" }}
              >
                Qual o nível de{" "}
                <span className="text-[rgb(var(--color-brand-mint))]">maturidade tecnológica</span>{" "}
                da sua escola cristã?
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-white/85 text-[1rem] sm:text-[1.0625rem] leading-relaxed mb-8 max-w-xl">
                Um diagnóstico estruturado para diretores, coordenadores e professores
                avaliarem onde sua escola está em educação tecnológica fundamentada na
                cosmovisão cristã — e por onde começar.
              </p>
            </Reveal>

            {/* Bullets de benefícios */}
            <Reveal delay={0.2}>
              <ul className="space-y-3 mb-9">
                {[
                  { icon: Clock, text: "8 blocos curtos — leva cerca de 6 minutos" },
                  { icon: BarChart3, text: "Identifica forças e dores da escola em currículo, formação e infraestrutura" },
                  { icon: CheckCircle2, text: "Você recebe recomendações personalizadas ao final" },
                ].map(({ icon: Icon, text }, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-3 text-white/90 text-[0.9375rem] sm:text-[1rem] leading-snug"
                  >
                    <div className="flex-shrink-0 size-9 rounded-lg bg-[rgb(var(--color-brand-mint))]/15 border border-[rgb(var(--color-brand-mint))]/30 flex items-center justify-center">
                      <Icon className="size-4 text-[rgb(var(--color-brand-mint))]" />
                    </div>
                    <span className="pt-1.5">{text}</span>
                  </motion.li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.3}>
              <button
                type="button"
                onClick={onStart}
                className="inline-flex items-center justify-center gap-3 h-14 px-7 sm:px-8 rounded-full bg-[rgb(var(--color-brand-mint))] hover:bg-[rgb(var(--color-brand-mint-deep))] text-[rgb(var(--color-brand-navy))] font-bold text-[1.0625rem] tracking-tight shadow-xl hover:-translate-y-0.5 transition-transform"
              >
                Iniciar diagnóstico agora
                <ArrowRight className="size-5" />
              </button>
              <p className="mt-4 text-[0.8125rem] text-white/65 max-w-md">
                Suas respostas são confidenciais e usadas apenas para gerar o diagnóstico.
              </p>
            </Reveal>
          </div>

          {/* ─── COLUNA DIREITA: foto em blob + ícones ─── */}
          <Reveal delay={0.25} className="order-2 w-full">
            <PhotoBlob />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ─── Foto em blob orgânico + ícones flutuantes (estilo We Make) ─── */
function PhotoBlob() {
  const blobRadius = "62% 38% 47% 53% / 45% 60% 40% 55%";

  return (
    <div className="relative w-full max-w-[460px] aspect-square mx-auto lg:ml-auto">
      {/* Glow atrás */}
      <div className="absolute inset-0 -z-10 scale-110 blur-[80px] bg-[rgb(var(--color-brand-mint))]/30 rounded-full" />
      <div className="absolute inset-0 -z-10 scale-90 blur-[60px] bg-[rgb(var(--color-brand-royal-soft))]/35 rounded-full" />

      {/* Espiral decorativa */}
      <motion.svg
        aria-hidden
        viewBox="0 0 100 100"
        animate={{ rotate: [0, 8, 0], y: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -right-2 size-24 sm:size-32 text-[rgb(var(--color-brand-mint))]/80 pointer-events-none z-20"
      >
        <path
          d="M50 50 C40 30 20 40 30 60 C40 80 80 60 70 30 C60 0 0 20 20 70 C40 120 120 80 90 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Foto recortada no blob */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
        className="absolute top-[6%] left-[6%] w-[88%] aspect-square z-10 overflow-hidden ring-2 ring-white/20"
        style={{
          borderRadius: blobRadius,
          filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.35))",
        }}
      >
        <Image
          src={PHOTO_SRC}
          alt="Equipe de educadores em uma sala maker com kits de robótica, Arduino e tablet"
          fill
          priority
          sizes="(max-width: 1024px) 460px, 460px"
          className="object-cover object-center"
        />
        {/* Overlay azul suave pra integrar à paleta */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[rgb(var(--color-brand-navy))]/30 via-transparent to-[rgb(var(--color-brand-mint))]/10 mix-blend-multiply pointer-events-none" />
      </motion.div>

      {/* Bolinhas decorativas (acentos geométricos) */}
      <div aria-hidden className="hidden sm:block absolute top-[14%] left-[2%] size-3 rounded-full bg-white/70 z-20" />
      <div aria-hidden className="hidden sm:block absolute top-[40%] right-[2%] size-2 rounded-full bg-[rgb(var(--color-brand-mint))]/80 z-20" />
      <div aria-hidden className="hidden sm:block absolute bottom-[12%] right-[18%] size-4 rounded-full border-2 border-white/60 z-20" />
      <div aria-hidden className="hidden sm:block absolute bottom-[28%] left-[3%] size-2.5 rounded-full bg-white/50 z-20" />

      {/* Ícones flutuantes: fé + tecnologia (estilo das outras seções) */}
      <FloatingIcon className="top-[2%] left-[18%]" duration={4.5}>
        <CrossIcon className="size-6 sm:size-7 text-white/75" />
      </FloatingIcon>

      <FloatingIcon className="top-[24%] left-[-3%] hidden sm:block" duration={5.2} delay={0.5} rotateRange={-4}>
        <BookOpen className="size-7 text-white/65" strokeWidth={1.4} />
      </FloatingIcon>

      <FloatingIcon className="top-[58%] right-[-3%] hidden sm:block" duration={4.8} delay={0.9} rotateRange={6}>
        <Bot className="size-8 text-white/70" strokeWidth={1.4} />
      </FloatingIcon>

      <FloatingIcon className="bottom-[6%] left-[20%]" duration={5.6} delay={1.4}>
        <Cpu className="size-6 sm:size-7 text-[rgb(var(--color-brand-mint))]/80" strokeWidth={1.5} />
      </FloatingIcon>

      <FloatingIcon className="bottom-[20%] right-[4%]" duration={4} delay={0.4}>
        <DoveIcon className="size-7 sm:size-8 text-[rgb(var(--color-brand-mint))]/75" />
      </FloatingIcon>

      <FloatingIcon className="top-[14%] right-[6%]" duration={3.8} delay={1.1} scalePulse>
        <Sparkles className="size-5 sm:size-6 text-[rgb(var(--color-brand-mint))]/85" strokeWidth={1.5} />
      </FloatingIcon>
    </div>
  );
}

/* ─── Floating icon helper ─── */
type FloatingIconProps = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  rotateRange?: number;
  scalePulse?: boolean;
};

function FloatingIcon({
  children,
  className = "",
  duration = 5,
  delay = 0,
  rotateRange = 0,
  scalePulse = false,
}: FloatingIconProps) {
  const animate = scalePulse
    ? { y: [0, -6, 0], scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }
    : { y: [0, -8, 0], rotate: rotateRange ? [0, rotateRange, 0] : [0, 0, 0] };

  return (
    <motion.div
      aria-hidden
      animate={animate}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute z-30 pointer-events-none ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ─── Símbolos cristãos não inclusos no lucide ─── */
function CrossIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="10" y="2" width="4" height="20" rx="1" fill="currentColor" />
      <rect x="4" y="8" width="16" height="4" rx="1" fill="currentColor" />
    </svg>
  );
}

function DoveIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path
        d="M4 18 C8 14 12 12 18 13 C22 8 26 8 28 10 C26 12 24 12 22 14 C24 16 22 20 18 21 C14 22 10 22 6 24 C5 22 4 20 4 18 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="24" cy="11" r="1" fill="currentColor" />
    </svg>
  );
}

function Atmosphere() {
  return (
    <>
      <div
        aria-hidden
        className="hidden md:block absolute -left-[15%] top-0 w-[45%] aspect-square rounded-full border-[50px] lg:border-[70px] border-[rgb(var(--color-brand-royal-deep))]/40 opacity-50"
      />
      <div
        aria-hidden
        className="hidden md:block absolute -right-[25%] bottom-[10%] w-[55%] aspect-square rounded-full border-[35px] lg:border-[45px] border-[rgb(var(--color-brand-royal-soft))]/30"
      />
    </>
  );
}
