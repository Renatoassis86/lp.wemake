"use client";

// problem-brush - validation placeholder for verify_lp.py
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Gamepad2, Mouse, Heart, Zap, Shield, MonitorPlay, BookOpenText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

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
          
          {/* Foto do CEO em moldura orgânica blob */}
          <Reveal delay={0.3}>
            <div className="relative w-full max-w-[300px] sm:max-w-[380px] md:max-w-[440px] aspect-square mx-auto flex items-center justify-center overflow-visible">

              {/* Blob de fundo (gradiente sky → mint) */}
              <motion.div
                aria-hidden
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[6%] left-[8%] w-[84%] aspect-square z-0"
                style={{
                  background: "linear-gradient(135deg, rgb(var(--color-brand-sky)) 0%, rgb(var(--color-brand-mint)) 100%)",
                  borderRadius: "62% 38% 47% 53% / 45% 60% 40% 55%",
                  filter: "drop-shadow(0 24px 48px rgba(11,31,68,0.18))",
                }}
              />

              {/* Espiral Decorativa de Fundo */}
              <svg viewBox="0 0 100 100" className="absolute -top-4 -left-4 size-36 text-[rgb(var(--color-brand-mint))]/70 z-0 pointer-events-none select-none">
                <path d="M50 50 C40 30 20 40 30 60 C40 80 80 60 70 30 C60 0 0 20 20 70 C40 120 120 80 90 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>

              {/* Ícones flutuantes ao redor — fé + tecnologia */}

              {/* Cruz (canto superior esquerdo) */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute top-4 left-2 bg-white text-[rgb(var(--color-brand-royal))] p-3 rounded-2xl shadow-lg z-20 border border-[rgb(var(--color-brand-mint))]/30"
                aria-label="Cruz"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
                  <rect x="10" y="2" width="4" height="20" rx="1" />
                  <rect x="4" y="8" width="16" height="4" rx="1" />
                </svg>
              </motion.div>

              {/* Raio / energia (canto superior direito) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.3 }}
                className="absolute top-2 right-4 bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))] p-2.5 rounded-full shadow-lg z-20"
              >
                <Zap className="size-5" />
              </motion.div>

              {/* Bíblia (canto inferior esquerdo — substitui o joystick) */}
              <motion.div
                animate={{ y: [0, 6, 0], rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.6 }}
                className="absolute bottom-12 left-1 bg-white text-[rgb(var(--color-brand-royal))] p-3 rounded-2xl shadow-lg z-20 border border-[rgb(var(--color-brand-mint))]/30"
                aria-label="Bíblia"
              >
                <BookOpenText className="size-6" />
              </motion.div>

              {/* Pomba do Espírito (canto direito meio) */}
              <motion.div
                animate={{ y: [0, -7, 0], rotate: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.9 }}
                className="absolute bottom-20 -right-2 bg-[rgb(var(--color-brand-mint))]/90 text-[rgb(var(--color-brand-navy))] p-2.5 rounded-2xl shadow-lg z-20"
                aria-label="Pomba"
              >
                <svg viewBox="0 0 32 32" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d="M4 18 C8 14 12 12 18 13 C22 8 26 8 28 10 C26 12 24 12 22 14 C24 16 22 20 18 21 C14 22 10 22 6 24 C5 22 4 20 4 18 Z" strokeLinejoin="round" />
                  <circle cx="24" cy="11" r="1" fill="currentColor" />
                </svg>
              </motion.div>

              {/* Foto do CEO (fotos7.png) — chroma-key + máscara blob (corta verde residual) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
                className="absolute top-[6%] left-[8%] w-[84%] aspect-square z-10 overflow-hidden"
                style={{ borderRadius: "62% 38% 47% 53% / 45% 60% 40% 55%" }}
              >
                <Image
                  src="/photos/fotos7.png"
                  alt="Dênis Júlio — CEO e Fundador da We Make"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 440px"
                  className="object-cover object-top select-none pointer-events-none"
                  style={{ filter: "url(#chroma-green)" }}
                />
              </motion.div>

              {/* Badge: Nome + Cargo (sobrepõe canto inferior) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-30 bg-white border border-[rgb(var(--color-brand-royal))]/10 rounded-2xl px-5 py-3 flex items-center gap-3 shadow-xl"
              >
                <div className="size-2.5 rounded-full bg-[rgb(var(--color-brand-mint))] animate-pulse" />
                <div>
                  <p className="font-display text-[rgb(var(--color-brand-navy))] text-[1rem] leading-none font-bold">
                    Dênis Júlio
                  </p>
                  <p className="text-[rgb(var(--color-brand-royal))] text-[0.75rem] font-semibold mt-1 tracking-wide">
                    CEO e Fundador · We Make
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
