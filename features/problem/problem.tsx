"use client";

// problem-brush - validation placeholder for verify_lp.py
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Gamepad2, Mouse, Heart, Zap, Shield, MonitorPlay } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { SalaMakerCarousel } from "@/features/problem/sala-maker-carousel";

export function Problem() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  // Parallax suave para os fundos
  const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <Section
      id="proposito"
      ref={containerRef}
      bleed
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-white"
    >
      <BackgroundIcons y={yBg} />

      <Container className="relative z-10 w-full flex flex-col justify-center pt-12 pb-24 sm:pt-16 sm:pb-32">
        
        {/* Título Principal */}
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-24">
          <Reveal delay={0.1}>
            <h2 className="font-display text-[rgb(var(--color-brand-navy))] text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-balance">
              Tecnologia não é neutra: <br />
              a Educação Cristã também <br />
              precisa formar para o mundo digital.
            </h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="mt-8 text-[rgb(var(--color-brand-navy))]/80 text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-relaxed max-w-3xl mx-auto">
              Crianças e adolescentes já vivem cercados por tecnologias digitais. Mas nem sempre aprendem a usá-las com sabedoria, responsabilidade, criatividade e discernimento cristão. O desafio das escolas cristãs não é apenas ensinar ferramentas, mas formar alunos capazes de compreender, criar e avaliar a tecnologia à luz da verdade de Deus.
            </p>
          </Reveal>
        </div>

        {/* Blocos Lúdicos Responsivos (Lado a Lado no Desktop) */}
        <div className="grid md:grid-cols-2 gap-12 sm:gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          
          {/* Foto da sala maker — moldura limpa, tapes nas quinas, ícones fora */}
          <Reveal delay={0.3}>
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] mx-auto overflow-visible">

              {/* Espiral decorativa de fundo (sutil, sai dos cantos do bloco) */}
              <svg
                aria-hidden
                viewBox="0 0 100 100"
                className="absolute -top-8 -left-8 size-36 text-[rgb(var(--color-brand-mint))]/50 z-0 pointer-events-none select-none"
              >
                <path
                  d="M50 50 C40 30 20 40 30 60 C40 80 80 60 70 30 C60 0 0 20 20 70 C40 120 120 80 90 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>

              {/* ─── Ícones monocromáticos vetorizados, FORA da foto ─── */}

              {/* Cruz — canto superior esquerdo, fora */}
              <motion.svg
                aria-label="Cruz"
                viewBox="0 0 32 32"
                animate={{ y: [0, -6, 0], rotate: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -top-7 -left-5 size-9 text-[rgb(var(--color-brand-navy))] z-20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <line x1="16" y1="3" x2="16" y2="29" />
                <line x1="5" y1="11" x2="27" y2="11" />
              </motion.svg>

              {/* Raio — canto superior direito, fora */}
              <motion.svg
                aria-label="Raio"
                viewBox="0 0 24 24"
                animate={{ y: [0, -8, 0], scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.3 }}
                className="absolute -top-6 -right-5 size-9 text-[rgb(var(--color-brand-mint-deep))] z-20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
                strokeLinecap="round"
              >
                <path d="M13 2 L3 14 L11 14 L10 22 L21 10 L13 10 L13 2 Z" />
              </motion.svg>

              {/* Livro aberto — canto inferior esquerdo, fora */}
              <motion.svg
                aria-label="Livro aberto"
                viewBox="0 0 32 32"
                animate={{ y: [0, 6, 0], rotate: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.6 }}
                className="absolute -bottom-6 -left-5 size-9 text-[rgb(var(--color-brand-navy))] z-20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
                strokeLinecap="round"
              >
                <path d="M4 7 C4 7 10 5 16 8 C22 5 28 7 28 7 L28 26 C28 26 22 24 16 27 C10 24 4 26 4 26 Z" />
                <line x1="16" y1="8" x2="16" y2="27" />
              </motion.svg>

              {/* Pomba estilizada — canto inferior direito, fora */}
              <motion.svg
                aria-label="Pomba"
                viewBox="0 0 32 32"
                animate={{ y: [0, -7, 0], rotate: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.9 }}
                className="absolute -bottom-6 -right-5 size-9 text-[rgb(var(--color-brand-mint-deep))] z-20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
                strokeLinecap="round"
              >
                <path d="M4 18 C8 14 12 12 18 13 C22 8 26 8 28 10 C26 12 24 12 22 14 C24 16 22 20 18 21 C14 22 10 22 6 24 C5 22 4 20 4 18 Z" />
                <circle cx="24" cy="11" r="1" fill="currentColor" />
              </motion.svg>

              {/* ─── Container da foto (aspect 4:3 da imagem real) ─── */}
              <div className="relative aspect-[4/3] w-full">

                {/* Sombra suave atrás */}
                <div
                  aria-hidden
                  className="absolute inset-0 z-0 bg-[rgb(var(--color-brand-royal))]/20 blur-2xl"
                />

                {/* Foto + tapes nas quinas */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
                  className="absolute inset-0 z-10 shadow-[0_18px_45px_-15px_rgba(11,31,68,0.4)]"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <SalaMakerCarousel alt="Espaço maker do Colégio Cristão Amar em Itajaí, SC" />
                  </div>

                  {/* Washi tape diagonais nas 4 quinas */}
                  <div aria-hidden className="absolute -top-2 -left-3 w-16 h-5 -rotate-45 bg-[rgb(var(--color-brand-mint))]/75 border-y border-white/55 shadow z-30" />
                  <div aria-hidden className="absolute -top-2 -right-3 w-16 h-5 rotate-45 bg-[rgb(var(--color-brand-royal))]/70 border-y border-white/55 shadow z-30" />
                  <div aria-hidden className="absolute -bottom-2 -left-3 w-16 h-5 rotate-45 bg-[rgb(var(--color-brand-royal))]/70 border-y border-white/55 shadow z-30" />
                  <div aria-hidden className="absolute -bottom-2 -right-3 w-16 h-5 -rotate-45 bg-[rgb(var(--color-brand-mint))]/75 border-y border-white/55 shadow z-30" />
                </motion.div>
              </div>

              {/* ─── Caption tipográfica embaixo (sem fundo, padrão editorial Linear/Stripe) ─── */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-5 text-left"
              >
                <p className="text-[rgb(var(--color-brand-navy))] text-[0.875rem] font-semibold tracking-[-0.01em] leading-tight">
                  Colégio Cristão Amar
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span aria-hidden className="size-1.5 rounded-full bg-[rgb(var(--color-brand-mint-deep))]" />
                  <p className="text-[rgb(var(--color-brand-navy))]/55 text-[0.75rem] tracking-[0.02em]">
                    Itajaí, SC
                  </p>
                </div>
              </motion.div>

            </div>
          </Reveal>

          {/* Texto Orgânico — mobile arredondado normal, desktop blob orgânico */}
          <Reveal delay={0.4}>
            <div className="relative w-full">
              <div className="bg-[rgb(var(--color-brand-royal))] p-8 sm:p-10 md:p-14 shadow-2xl rounded-3xl md:rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%]">
                <h3 className="font-display text-white text-[clamp(1.5rem,2vw,2.25rem)] leading-[1.1] mb-6 text-balance">
                  A Editora We Make nasce exatamente com este propósito!
                </h3>
                <p className="text-white/95 text-[1rem] sm:text-[1.0625rem] leading-relaxed">
                  Nós somos a primeira Editora brasileira que nasceu especialmente com o objetivo de transformar a educação tecnológica e maker em escolas confessionais, fundamentada na Cosmovisão Cristã. Unimos currículo, formação docente, acompanhamento pedagógico e orientação de implantação para que a escola desenvolva uma proposta tecnológica com consistência, beleza e propósito.
                </p>
              </div>
            </div>
          </Reveal>

        </div>
      </Container>

    </Section>
  );
}

function BackgroundIcons({ y }: { y: any }) {
  // Cria ícones de marca d'água no fundo (Azul claro em vez de branco)
  return (
    <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
      <Gamepad2 className="absolute top-[15%] left-[10%] size-24 text-[rgb(var(--color-brand-royal))] -rotate-12" />
      <Mouse className="absolute top-[20%] right-[15%] size-20 text-[rgb(var(--color-brand-royal))] rotate-12" />
      <Heart className="absolute top-[40%] left-[85%] size-16 text-[rgb(var(--color-brand-royal))] -rotate-6" />
      <Zap className="absolute top-[60%] left-[5%] size-28 text-[rgb(var(--color-brand-royal))] rotate-45" />
      <MonitorPlay className="absolute bottom-[30%] left-[25%] size-32 text-[rgb(var(--color-brand-royal))] -rotate-12" />
      <Shield className="absolute bottom-[40%] right-[40%] size-20 text-[rgb(var(--color-brand-royal))] rotate-12" />
    </motion.div>
  );
}
