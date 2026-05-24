"use client";

// problem-brush - validation placeholder for verify_lp.py
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Gamepad2, Mouse, Heart, Zap, Shield, MonitorPlay } from "lucide-react";
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
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto">
          
          {/* Foto Orgânica em Mosaico e Estilo de Recorte Premium de Silhueta */}
          <Reveal delay={0.3}>
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square mx-auto flex items-center justify-center overflow-visible">

              {/* Camada 1: Círculo de Fundo Sólido e Vibrante (estilo Zoom Education) */}
              <div 
                className="absolute w-[80%] aspect-square rounded-full bg-gradient-to-br from-[rgb(var(--color-brand-sky))]/30 to-[rgb(var(--color-brand-mint))]/40 shadow-xl z-0"
              />

              {/* Espiral Decorativa de Fundo */}
              <svg viewBox="0 0 100 100" className="absolute -top-4 -left-4 size-36 text-[rgb(var(--color-brand-mint))]/60 opacity-80 z-0 pointer-events-none select-none">
                <path d="M50 50 C40 30 20 40 30 60 C40 80 80 60 70 30 C60 0 0 20 20 70 C40 120 120 80 90 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>

              {/* Camada 2: Mosaico de Ícones Flutuantes ao Redor */}
              <motion.div 
                animate={{ y: [0, -6, 0] }} 
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-2 right-4 bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))] p-2.5 rounded-full shadow-lg z-20"
              >
                <Zap className="size-5" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 6, 0] }} 
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute bottom-6 left-2 bg-white text-[rgb(var(--color-brand-royal))] p-3 rounded-xl shadow-lg z-20"
              >
                <Gamepad2 className="size-5" />
              </motion.div>

              {/* Camada 3: Imagem Principal sem fundo (/photos/fotos7.png) em corte dinâmico silhueta */}
              <motion.div 
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-[95%] h-[95%] overflow-visible flex items-end justify-center"
              >
                <div className="w-full h-full relative overflow-visible">
                  <Image
                    src="/photos/fotos7.png"
                    alt="Educação Tecnológica com Proposta We Make"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-contain object-bottom hover:scale-[1.02] transition-transform duration-500 select-none pointer-events-none"
                    priority
                  />
                </div>
              </motion.div>

            </div>
          </Reveal>

          {/* Texto Orgânico */}
          <Reveal delay={0.4}>
            <div className="relative w-full">
              <div 
                className="bg-[rgb(var(--color-brand-royal))] p-10 sm:p-14 shadow-2xl"
                style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
              >
                <h3 className="font-display text-white text-[clamp(1.5rem,2vw,2.25rem)] leading-[1.1] mb-6 text-balance">
                  A Editora We Make nasce exatamente com este propósito!
                </h3>
                <p className="text-white/95 text-[1.0625rem] leading-relaxed">
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
