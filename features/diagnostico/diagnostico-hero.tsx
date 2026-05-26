"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

const COVER_SRC = "/books/7-principios-cosmovisao-crista.jpg";

/**
 * Hero da LP /diagnostico — estilo Poliedro: 1 coluna centralizada,
 * capa do ebook em destaque acima do título, CTA leva direto ao form abaixo.
 * Identidade We Make: cores brand, font-display, kicker mono, glows.
 */
export function DiagnosticoHero() {
  return (
    <Section
      bleed
      className="relative pt-[7rem] sm:pt-[9rem] md:pt-[11rem] pb-16 sm:pb-20 bg-[rgb(var(--color-brand-royal))] overflow-hidden"
    >
      <Atmosphere />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--color-brand-mint))]/20 text-[rgb(var(--color-brand-mint))] font-bold text-[0.8125rem] mb-6 border border-[rgb(var(--color-brand-mint))]/30">
              <Sparkles className="size-4" />
              EBOOK GRATUITO PARA LIDERANÇAS ESCOLARES
            </div>
          </Reveal>

          {/* Capa do ebook em perspectiva leve */}
          <Reveal delay={0.1}>
            <div className="relative mx-auto mb-10 w-[220px] sm:w-[260px] md:w-[300px]">
              {/* Glow atrás */}
              <div className="absolute inset-0 -z-10 scale-[1.4] blur-[80px] bg-[rgb(var(--color-brand-mint))]/40 rounded-full" />
              <div className="absolute inset-0 -z-10 scale-[1.1] blur-[50px] bg-[rgb(var(--color-brand-sky))]/40 rounded-full" />

              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -8 }}
                animate={{ opacity: 1, y: 0, rotate: -4 }}
                whileHover={{ rotate: 0, scale: 1.04 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="relative aspect-[2/3] rounded-md overflow-hidden ring-1 ring-white/15"
                style={{
                  boxShadow:
                    "-22px 28px 64px rgba(0,0,0,0.45), -6px 8px 16px rgba(0,0,0,0.3), 2px 0 8px rgba(255,255,255,0.12)",
                }}
              >
                <Image
                  src={COVER_SRC}
                  alt="Capa do ebook 7 Princípios para Ensinar Tecnologia com Cosmovisão Cristã"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 260px, 300px"
                />
                {/* Lombada esquerda */}
                <div className="absolute inset-y-0 left-0 w-[4px] bg-gradient-to-b from-white/40 via-white/15 to-transparent" />
                {/* Reflexo top */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Mini selo "Grátis" */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5, ease: "backOut" }}
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-6 size-16 sm:size-20 rounded-full bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))] flex items-center justify-center font-display text-[0.8125rem] sm:text-base font-bold shadow-xl rotate-12"
              >
                <span className="text-center leading-tight">
                  GRÁTIS
                </span>
              </motion.div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="font-display text-white text-[clamp(2rem,4vw+1rem,3.75rem)] leading-[1.05] tracking-normal text-balance mb-5"
              style={{ textShadow: "0 4px 12px rgba(0,0,0,0.18)" }}
            >
              7 Princípios para ensinar tecnologia com{" "}
              <span className="text-[rgb(var(--color-brand-mint))]">cosmovisão cristã</span>
            </motion.h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-white/90 text-[1.0625rem] sm:text-[1.1875rem] leading-relaxed mb-8 max-w-2xl mx-auto">
              Um material exclusivo para diretores, mantenedores e coordenadores pedagógicos
              avaliarem a maturidade tecnológica da sua escola — e prepararem alunos para o mundo
              digital sem abrir mão da fé.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <a
              href="#diagnostico-form"
              className="inline-flex items-center justify-center gap-2.5 h-14 px-8 rounded-full bg-[rgb(var(--color-brand-mint))] hover:bg-[rgb(var(--color-brand-mint-deep))] text-[rgb(var(--color-brand-navy))] font-bold text-[1.0625rem] shadow-xl hover:-translate-y-0.5 transition-transform"
            >
              Quero baixar o ebook
              <ArrowDown className="size-5" />
            </a>
            <p className="mt-4 text-[0.8125rem] text-white/65">
              Download imediato · suas informações são confidenciais
            </p>
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
        className="hidden md:block absolute -left-[20%] top-0 w-[60%] aspect-square rounded-full border-[60px] lg:border-[100px] border-[rgb(var(--color-brand-royal-deep))]/40 opacity-50"
      />
      <div
        aria-hidden
        className="hidden md:block absolute -right-[35%] top-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full border-[40px] lg:border-[60px] border-[rgb(var(--color-brand-royal-soft))]/30"
      />
    </>
  );
}
