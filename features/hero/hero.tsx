"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Rocket,
  Lightbulb,
  Cpu,
  Code2,
  Bot,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { trackEvent } from "@/lib/analytics";
import { whatsappLink } from "@/constants/site";

export function Hero() {
  return (
    <Section
      id="visao"
      bleed
      className="relative pt-[7rem] sm:pt-[10rem] md:pt-[12rem] pb-[2.5rem] sm:pb-[6rem] md:pb-[8rem] bg-[rgb(var(--color-brand-royal))] overflow-hidden"
    >
      <Atmosphere />

      <Container className="relative z-10 h-full flex flex-col justify-center">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-6 sm:gap-10 lg:gap-16 items-center">
          {/* ─── COPY (Esquerda no desktop, TOPO no mobile) ─────── */}
          <div className="order-1 lg:order-1 relative z-20">
            
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

          {/* ─── FOTO DO ALUNO MAKER (Direita no desktop, abaixo do texto no mobile) ──────────────────── */}
          <div className="order-2 lg:order-2 relative z-10 flex justify-center">
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
      {/* Círculo Grande Fundo Esquerda — escondido no mobile para evitar poluição */}
      <div
        aria-hidden
        className="hidden md:block absolute -left-[20%] top-0 w-[60%] aspect-square rounded-full border-[60px] lg:border-[100px] border-[rgb(var(--color-brand-royal-deep))]/40 opacity-50"
      />
      {/* Arco decorativo direito — escondido no mobile (causa scroll horizontal) */}
      <div
        aria-hidden
        className="hidden md:block absolute -right-[35%] top-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full border-[40px] lg:border-[60px] border-[rgb(var(--color-brand-royal-soft))]/30"
      />
    </>
  );
}

/* ─── Composição Ludica do Aluno — blob orgânico + mosaico ── */
const BLOB_RADIUS = "62% 38% 47% 53% / 45% 60% 40% 55%";

function MakerStudentImage() {
  return (
    <div className="relative w-full max-w-[300px] sm:max-w-[440px] lg:max-w-[520px] mx-auto lg:ml-auto h-[300px] sm:h-[520px] md:h-[600px] lg:h-[640px] flex items-center justify-center overflow-visible">

      {/* Blob de cor vibrante atrás (gradiente mint → royal-deep) */}
      <motion.div
        aria-hidden
        animate={{ rotate: [0, 2, -2, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[6%] left-[8%] w-[84%] aspect-square z-0"
        style={{
          background: "linear-gradient(135deg, rgb(var(--color-brand-mint)) 0%, rgb(var(--color-brand-royal-deep)) 100%)",
          borderRadius: BLOB_RADIUS,
          filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.3))",
        }}
      />

      {/* Espiral decorativa flutuante (estilo Zoom Education) */}
      <motion.svg
        aria-hidden
        viewBox="0 0 100 100"
        animate={{ rotate: [0, 8, 0], y: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-3 -right-3 size-20 sm:size-32 md:size-40 text-[rgb(var(--color-brand-mint))]/80 z-30 pointer-events-none select-none"
      >
        <path
          d="M50 50 C40 30 20 40 30 60 C40 80 80 60 70 30 C60 0 0 20 20 70 C40 120 120 80 90 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Bolinhas decorativas (só em tablet/desktop, mobile fica limpo) */}
      <div aria-hidden className="hidden sm:block absolute top-[18%] left-[4%] size-3 rounded-full bg-white/70 z-20" />
      <div aria-hidden className="hidden sm:block absolute top-[36%] right-[4%] size-2 rounded-full bg-[rgb(var(--color-brand-mint))]/80 z-20" />
      <div aria-hidden className="hidden sm:block absolute bottom-[14%] right-[18%] size-4 rounded-full border-2 border-white/60 z-20" />
      <div aria-hidden className="hidden sm:block absolute bottom-[26%] left-[2%] size-2.5 rounded-full bg-white/50 z-20" />

      {/* Triângulo decorativo (escondido em mobile) */}
      <motion.svg
        aria-hidden
        viewBox="0 0 24 24"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="hidden sm:block absolute top-[6%] left-[24%] size-7 text-[rgb(var(--color-brand-mint))]/60 z-20"
      >
        <path d="M12 2 L22 20 L2 20 Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </motion.svg>

      {/* Mosaico de ícones — mobile mostra só 3 (Cross, Dove, Sparkles), demais sm+ */}
      <FloatingIcon className="top-[4%] right-[22%]" duration={4.2}>
        <CrossIcon className="size-6 sm:size-7 text-white/65" />
      </FloatingIcon>

      <FloatingIcon className="top-[28%] left-[-4%] hidden sm:block" duration={5.2} delay={0.5} rotateRange={-4}>
        <BookOpen className="size-6 sm:size-8 text-white/55" strokeWidth={1.4} />
      </FloatingIcon>

      <FloatingIcon className="top-[60%] right-[-4%] hidden sm:block" duration={4.8} delay={0.9} rotateRange={6}>
        <Bot className="size-7 sm:size-9 text-white/60" strokeWidth={1.4} />
      </FloatingIcon>

      <FloatingIcon className="bottom-[4%] left-[18%] hidden sm:block" duration={5.6} delay={1.4}>
        <Cpu className="size-7 text-[rgb(var(--color-brand-mint))]/75" strokeWidth={1.5} />
      </FloatingIcon>

      <FloatingIcon className="bottom-[16%] right-[8%]" duration={4} delay={0.4}>
        <DoveIcon className="size-7 sm:size-9 text-[rgb(var(--color-brand-mint))]/70" />
      </FloatingIcon>

      <FloatingIcon className="top-[48%] left-[2%] hidden sm:block" duration={5} delay={1.8} rotateRange={5}>
        <Code2 className="size-6 text-white/50" strokeWidth={1.5} />
      </FloatingIcon>

      <FloatingIcon className="top-[14%] right-[4%]" duration={3.8} delay={1.1} scalePulse>
        <Sparkles className="size-5 sm:size-6 text-[rgb(var(--color-brand-mint))]/80" strokeWidth={1.5} />
      </FloatingIcon>

      {/* ── Foto da criança em formato orgânico (foco) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
        className="absolute top-[6%] left-[8%] w-[84%] aspect-square z-10 overflow-hidden"
        style={{ borderRadius: BLOB_RADIUS }}
      >
        <Image
          src="/photos/maker_student.png"
          alt="Estudante Maker de Educação Tecnológica We Make"
          fill
          priority
          sizes="(min-width: 1024px) 520px, 440px"
          className="object-cover object-center select-none"
        />
      </motion.div>

    </div>
  );
}

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
    ? { y: [0, -6, 0], scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }
    : { y: [0, -8, 0], rotate: rotateRange ? [0, rotateRange, 0] : [0, 0, 0] };

  return (
    <motion.div
      aria-hidden
      animate={animate}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute z-20 pointer-events-none ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ─── Símbolos cristãos não inclusos no lucide-react ─── */
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

