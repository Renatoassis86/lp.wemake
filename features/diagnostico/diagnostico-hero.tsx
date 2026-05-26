"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

const COVER_SRC = "/books/7-principios-cosmovisao-crista.jpg";

/**
 * Hero da LP de diagnóstico — mockup iPad+Notebook com a capa do ebook,
 * headline focado em diagnóstico + ebook, CTA pra iniciar o wizard.
 */
export function DiagnosticoHero() {
  return (
    <Section
      bleed
      className="relative pt-[7rem] sm:pt-[10rem] md:pt-[12rem] pb-16 sm:pb-24 lg:pb-32 bg-[rgb(var(--color-brand-royal))] overflow-hidden"
    >
      <Atmosphere />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 sm:gap-12 lg:gap-16 items-center">

          {/* COPY */}
          <div className="order-1 lg:order-1 relative z-20">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--color-brand-mint))]/20 text-[rgb(var(--color-brand-mint))] font-bold text-sm mb-6">
                <Sparkles className="size-4" />
                MATERIAL GRATUITO + DIAGNÓSTICO
              </div>
            </Reveal>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-white text-[clamp(2rem,4vw+1rem,4rem)] leading-[1.04] tracking-normal text-balance mb-6"
              style={{ textShadow: "0 4px 12px rgba(0,0,0,0.18)" }}
            >
              Qual é a maturidade tecnológica da{" "}
              <span className="text-[rgb(var(--color-brand-mint))]">sua escola cristã?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/90 text-[1.0625rem] sm:text-[1.1875rem] leading-relaxed mb-8 max-w-xl"
            >
              Responda nosso diagnóstico exclusivo e receba gratuitamente o e-book{" "}
              <strong className="text-white">7 Princípios para Ensinar Tecnologia com Cosmovisão Cristã</strong>
              {" "}— um checklist completo para sua liderança avaliar a maturidade
              da educação tecnológica na sua instituição.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <a
                href="#diagnostico-form"
                className="inline-flex items-center justify-center gap-3 h-14 px-7 sm:px-8 rounded-full bg-[rgb(var(--color-brand-mint))] hover:bg-[rgb(var(--color-brand-mint-deep))] text-[rgb(var(--color-brand-navy))] font-bold text-[1.0625rem] tracking-tight shadow-xl hover:-translate-y-0.5 transition-transform"
              >
                Iniciar diagnóstico gratuito
                <ArrowRight className="size-5" />
              </a>
            </motion.div>

            <p className="mt-5 text-[0.8125rem] text-white/65 max-w-md">
              Leva ~6 minutos. Suas respostas são confidenciais e usadas apenas para gerar o
              diagnóstico e direcionar a conversa com nosso time.
            </p>
          </div>

          {/* MOCKUP DEVICES */}
          <div className="order-2 lg:order-2 relative z-10 flex justify-center">
            <DevicesMockup />
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ─── Mockup iPad (vertical) + Notebook (horizontal) com a capa do ebook ─── */
function DevicesMockup() {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[540px] aspect-[5/4]">

      {/* Glow atrás */}
      <div className="absolute inset-0 -z-10 scale-110 blur-[80px] bg-[rgb(var(--color-brand-mint))]/30 rounded-full" />
      <div className="absolute inset-0 -z-10 scale-90 blur-[60px] bg-[rgb(var(--color-brand-royal-soft))]/40 rounded-full" />

      {/* NOTEBOOK (esquerda, atrás) */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -4 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute bottom-0 left-0 w-[72%]"
      >
        {/* Tela do notebook */}
        <div className="relative aspect-[16/10] rounded-t-2xl bg-[#1a2333] p-2 shadow-2xl ring-1 ring-white/10">
          {/* Bezel */}
          <div className="absolute inset-x-1/2 -translate-x-1/2 top-1 size-1 rounded-full bg-white/20" />
          <div className="relative w-full h-full rounded-lg overflow-hidden bg-[rgb(var(--color-brand-navy))]">
            {/* Conteúdo da tela: capa do ebook como "abertura" */}
            <Image
              src={COVER_SRC}
              alt="Capa do ebook 7 Princípios"
              fill
              priority
              className="object-cover object-top"
              sizes="400px"
            />
            {/* Reflexo sutil */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
          </div>
        </div>
        {/* Base do notebook */}
        <div className="relative h-3 bg-gradient-to-b from-[#2a3344] to-[#1a2333] rounded-b-3xl shadow-xl">
          <div className="absolute inset-x-1/2 top-0 -translate-x-1/2 w-[28%] h-[3px] bg-black/40 rounded-b-md" />
        </div>
      </motion.div>

      {/* IPAD (direita, sobreposto) */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: 6 }}
        animate={{ opacity: 1, y: 0, rotate: 6 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute -bottom-2 right-0 w-[38%]"
      >
        <div className="relative aspect-[3/4] rounded-[1.5rem] bg-[#1a2333] p-2 shadow-2xl ring-1 ring-white/10">
          {/* Câmera frontal */}
          <div className="absolute inset-x-1/2 -translate-x-1/2 top-2 size-1.5 rounded-full bg-black/40 ring-1 ring-white/20" />
          <div className="relative w-full h-full rounded-[1.1rem] overflow-hidden bg-[rgb(var(--color-brand-navy))]">
            <Image
              src={COVER_SRC}
              alt=""
              fill
              className="object-cover object-top"
              sizes="200px"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
          </div>
          {/* Home indicator (iPad Pro style) */}
          <div className="absolute inset-x-1/2 -translate-x-1/2 bottom-1 w-[32%] h-[3px] bg-white/30 rounded-full" />
        </div>
      </motion.div>

      {/* Espiral decorativa flutuante */}
      <motion.svg
        aria-hidden
        viewBox="0 0 100 100"
        animate={{ rotate: [0, 8, 0], y: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 -right-4 size-20 sm:size-28 lg:size-32 text-[rgb(var(--color-brand-mint))]/80 pointer-events-none"
      >
        <path
          d="M50 50 C40 30 20 40 30 60 C40 80 80 60 70 30 C60 0 0 20 20 70 C40 120 120 80 90 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Bolinhas decorativas (desktop apenas) */}
      <div aria-hidden className="hidden sm:block absolute top-[10%] left-[-2%] size-3 rounded-full bg-white/70" />
      <div aria-hidden className="hidden sm:block absolute top-[40%] right-[-2%] size-2 rounded-full bg-[rgb(var(--color-brand-mint))]" />
      <div aria-hidden className="hidden sm:block absolute bottom-[8%] left-[12%] size-2.5 rounded-full bg-white/50" />
    </div>
  );
}

function Atmosphere() {
  return (
    <>
      <div
        aria-hidden
        className="hidden md:block absolute -left-[20%] top-0 w-[60%] aspect-square rounded-full border-[60px] lg:border-[100px] border-[rgb(var(--color-brand-royal-deep))]/40 opacity-50"
      />
      <div
        aria-hidden
        className="hidden md:block absolute -right-[35%] top-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full border-[40px] lg:border-[60px] border-[rgb(var(--color-brand-royal-soft))]/30"
      />
    </>
  );
}
