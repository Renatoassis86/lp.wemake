"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Rocket, Lightbulb, Blocks, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { trackEvent } from "@/lib/analytics";
import { whatsappLink } from "@/constants/site";

export function Hero() {
  return (
    <Section
      id="topo"
      bleed
      className="relative pt-[10rem] sm:pt-[12rem] pb-[4rem] sm:pb-[8rem] bg-[rgb(var(--color-brand-royal))] overflow-hidden"
    >
      <Atmosphere />

      <Container className="relative z-10 h-full flex flex-col justify-center">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* ─── COPY (Esquerda) ─────── */}
          <div className="order-2 lg:order-1 relative z-20">
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="
                font-display text-white
                text-[clamp(2.5rem,3vw+2rem,4.5rem)] leading-[1.05]
                tracking-normal
                text-balance
              "
              style={{ textShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
            >
              Educação Tecnológica a partir da <br />
              <span className="text-[rgb(var(--color-brand-mint))]">Cosmovisão Cristã.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 max-w-xl text-[1.125rem] sm:text-[1.25rem] leading-[1.5] text-white/90 font-medium"
            >
              A We Make nasceu com o objetivo de pensar, produzir e ensinar tecnologia com propósito. Nos diferenciamos pelo compromisso com uma educação escolar distintamente cristã, primando pela Verdade, Beleza e Bondade.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <a
                href="#reuniao"
                onClick={() =>
                  trackEvent({
                    name: "cta_click",
                    placement: "hero_primary",
                    label: "Agendar reunião",
                  })
                }
                className="
                  inline-flex items-center justify-center gap-2.5
                  h-14 px-8 rounded-full
                  bg-[rgb(var(--color-brand-mint))] hover:bg-[rgb(var(--color-brand-mint-deep))]
                  text-[rgb(var(--color-brand-navy))]
                  font-bold text-[1.0625rem] tracking-wide
                  shadow-xl transition-transform hover:-translate-y-1
                "
              >
                <Rocket className="size-5" />
                Agendar Reunião
              </a>

              <a
                href={whatsappLink("vip")}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center gap-2.5
                  h-14 px-8 rounded-full
                  bg-white text-[rgb(var(--color-brand-royal-deep))]
                  font-bold text-[1.0625rem] tracking-wide
                  shadow-xl transition-transform hover:-translate-y-1
                "
              >
                <Lightbulb className="size-5" />
                Falar com Consultor
              </a>
            </motion.div>
          </div>

          {/* ─── FOTO DO ALUNO MAKER (Direita) ──────────────────── */}
          <div className="order-1 lg:order-2 relative z-10 flex justify-center">
            <MakerStudentImage />
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ─── Atmosfera de Fundo (Ondas e Círculos Estilo Zoom) ────────── */
function Atmosphere() {
  return (
    <>
      {/* Círculo Grande Fundo Esquerda */}
      <div
        aria-hidden
        className="absolute -left-[20%] top-0 w-[60%] aspect-square rounded-full border-[100px] border-[rgb(var(--color-brand-royal-deep))]/40 opacity-50"
      />
      {/* Círculo Médio Direita */}
      <div
        aria-hidden
        className="absolute -right-[10%] -bottom-[20%] w-[50%] aspect-square rounded-full border-[60px] border-[rgb(var(--color-brand-royal-soft))]/30"
      />
    </>
  );
}

/* ─── Composição Ludica do Aluno ── */
const HeroBrushMask = () => (
  <svg width="0" height="0" className="absolute">
    <defs>
      <clipPath id="hero-brush" clipPathUnits="objectBoundingBox">
        {/* Brush orgânico estilizado para o Hero */}
        <path d="M0.04,0.12 C0.1,-0.02 0.88,-0.04 0.96,0.15 C1.06,0.35 1.02,0.82 0.88,0.94 C0.74,1.06 0.12,0.98 0.04,0.85 C-0.04,0.72 0.0,0.25 0.04,0.12 Z" />
      </clipPath>
    </defs>
  </svg>
);

function MakerStudentImage() {
  return (
    <div className="relative w-full max-w-[380px] lg:max-w-[420px] mx-auto lg:ml-auto overflow-visible flex items-center justify-center">
      
      {/* Círculo de Fundo Sólido e Vibrante (sunset complementary gradient) */}
      <div 
        className="absolute w-[80%] aspect-square rounded-full bg-gradient-to-br from-[#ff9e00] to-[#ff5d00] shadow-2xl z-0"
        style={{ filter: "drop-shadow(0 12px 32px rgba(255,109,0,0.3))" }}
      />
      
      {/* Espiral Dourada Decorativa Flutuante (estilo Zoom Education) */}
      <svg viewBox="0 0 100 100" className="absolute -top-10 -right-6 size-40 text-[#ffcc00] opacity-90 z-0 pointer-events-none select-none">
        <path d="M50 50 C40 30 20 40 30 60 C40 80 80 60 70 30 C60 0 0 20 20 70 C40 120 120 80 90 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      
      {/* Ícones Decorativos Maker Flutuantes */}
      <motion.div 
        animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }} 
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} 
        className="absolute top-2 right-4 bg-white text-[rgb(var(--color-brand-navy))] p-3 rounded-full shadow-xl z-20 border border-[rgb(var(--color-brand-mint))]/30"
      >
        <Cpu className="size-7 text-[rgb(var(--color-brand-royal))]" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 8, 0], rotate: [0, -4, 0] }} 
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} 
        className="absolute bottom-12 -left-6 bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))] p-3.5 rounded-2xl shadow-xl z-20 border border-white/20"
      >
        <Blocks className="size-7" />
      </motion.div>

      {/* Imagem do Estudante Maker (Recorte PNG transparente sem clipping) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="relative z-10 w-full aspect-[4/5] overflow-visible flex items-end justify-center"
      >
        <div className="w-[100%] h-[100%] relative overflow-visible">
          <Image
            src="/photos/maker_student.png"
            alt="Estudante Maker de Educação Tecnológica We Make"
            fill
            priority
            sizes="(min-width: 1024px) 400px, 100vw"
            className="object-contain object-bottom hover:scale-[1.02] transition-transform duration-500 select-none pointer-events-none"
          />
        </div>
      </motion.div>
      
    </div>
  );
}

