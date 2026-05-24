"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

// Máscaras orgânicas (brush strokes) para as fotos - estilo Lúdico e Tecnológico
const BrushMasks = () => (
  <svg width="0" height="0" className="absolute">
    <defs>
      {/* Brush 1: Dinâmico e assimétrico */}
      <clipPath id="brush-1" clipPathUnits="objectBoundingBox">
        <path d="M0.05,0.1 C0.1,-0.05 0.8,-0.05 0.95,0.1 C1.1,0.25 1.05,0.8 0.9,0.95 C0.75,1.1 0.1,1.1 0.02,0.9 C-0.06,0.7 0,0.25 0.05,0.1 Z" />
      </clipPath>
      {/* Brush 2: Mais horizontal e ondulado */}
      <clipPath id="brush-2" clipPathUnits="objectBoundingBox">
        <path d="M0.1,0.05 C0.3,-0.02 0.7,-0.02 0.9,0.1 C1.05,0.2 1.1,0.7 0.95,0.9 C0.8,1.1 0.2,1.1 0.05,0.95 C-0.1,0.8 -0.05,0.2 0.1,0.05 Z" />
      </clipPath>
      {/* Brush 3: Formato de gota inclinada orgânica */}
      <clipPath id="brush-3" clipPathUnits="objectBoundingBox">
        <path d="M0.08,0.15 C0.15,0.02 0.85,-0.05 0.95,0.12 C1.05,0.3 0.98,0.85 0.85,0.95 C0.7,1.05 0.1,0.98 0.02,0.85 C-0.06,0.7 0,0.3 0.08,0.15 Z" />
      </clipPath>
    </defs>
  </svg>
);

const steps = [
  {
    id: "01",
    title: "Cultura Maker",
    desc: "Mais do que montar peças, os alunos aprendem a solucionar problemas reais construindo projetos criativos. Uma abordagem prática de engenharia, física e eletrônica.",
    color: "bg-brand-mint", 
    photo: "/photos/foto4.png",
    brush: "brush-1",
  },
  {
    id: "02",
    title: "Programação",
    desc: "Alfabetização para o futuro. Da criação de narrativas visuais e jogos à automação de projetos físicos e digitais com Scratch, Python e blocos lógicos.",
    color: "bg-brand-sky", 
    photo: "/photos/foto2.png",
    brush: "brush-2",
  },
  {
    id: "03",
    title: "Robótica",
    desc: "Mão na massa! Construção e programação de robôs que interagem com o ambiente, estimulando o raciocínio lógico e o trabalho em equipe.",
    color: "bg-brand-royal",
    photo: "/photos/foto1.png",
    brush: "brush-3",
  },
  {
    id: "04",
    title: "Pensamento Computacional",
    desc: "O superpoder de decompor problemas complexos em etapas simples. Abstração, reconhecimento de padrões e algoritmos aplicados ao currículo.",
    color: "bg-[rgb(255,107,107)]", // Coral/Lúdico
    photo: "/photos/foto5.png",
    brush: "brush-1",
  }
];

export function CurriculumInfographic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative pt-12 pb-24 sm:pt-16 sm:pb-32 bg-ink-950 overflow-hidden">
      <BrushMasks />
      
      {/* Background Tech Dot Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)", backgroundSize: "32px 32px" }}
      />

      <Container>
        <div className="text-center max-w-3xl mx-auto mb-24 relative z-10">
          <Reveal>
            <span className="font-mono text-sm uppercase tracking-widest text-brand-royal font-bold">O Desenvolimento</span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl text-ink-100 tracking-tight">
              Uma Jornada Contínua de Aprendizagem
            </h2>
            <p className="mt-6 text-lg text-ink-500">
              Desenvolvemos habilidades fundamentais conectadas às diretrizes da BNCC. Cada etapa do currículo é uma nova aventura tecnológica e criativa para os alunos.
            </p>
          </Reveal>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* A linha central do Infográfico */}
          <div className="absolute left-[36px] md:left-1/2 top-0 bottom-0 w-[4px] bg-ink-800 rounded-full -translate-x-1/2" />
          
          {/* A linha animada (progresso) */}
          <motion.div 
            className="absolute left-[36px] md:left-1/2 top-0 w-[4px] bg-brand-royal rounded-full -translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />

          <div className="flex flex-col gap-20 md:gap-32">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={step.id} className={`relative flex flex-col md:flex-row items-center gap-10 md:gap-16 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  
                  {/* Marcador na linha do tempo */}
                  <div className="absolute left-[36px] md:left-1/2 top-8 md:top-1/2 md:-translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-brand-royal z-10 shadow-lg" />

                  {/* Conteúdo (Texto) */}
                  <div className={`flex-1 pl-[80px] md:pl-0 w-full ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <Reveal delay={0.2}>
                      <span className="font-mono text-3xl text-brand-royal/20 font-black tracking-widest block mb-2">{step.id}</span>
                      <h3 className="font-display text-3xl sm:text-4xl text-ink-100 mb-4">{step.title}</h3>
                      <p className="text-ink-500 text-[1.0625rem] leading-relaxed max-w-md ml-auto mr-auto md:mx-0">{step.desc}</p>
                    </Reveal>
                  </div>

                  {/* Imagem Lúdica com Brush/Blob */}
                  <div className="flex-1 w-full pl-[80px] md:pl-0 flex justify-center md:justify-start">
                    <Reveal delay={0.4}>
                      <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px]">
                        {/* Fundo Decorativo Lúdico (brilho colorido) */}
                        <motion.div 
                          className={`absolute inset-0 ${step.color} opacity-40 blur-3xl rounded-full`}
                          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
                          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />
                        
                        {/* Imagem recortada no brush */}
                        <div 
                          className="relative w-full h-full bg-white p-2"
                          style={{ clipPath: `url(#${step.brush})` }}
                        >
                          <div 
                            className="w-full h-full relative overflow-hidden bg-ink-200"
                            style={{ clipPath: `url(#${step.brush})` }}
                          >
                            <Image
                              src={step.photo}
                              alt={step.title}
                              fill
                              className="object-cover transition-transform duration-1000 hover:scale-110"
                              sizes="(max-width: 768px) 100vw, 400px"
                            />
                            {/* Overlay sutil para tecnologia */}
                            <div className={`absolute inset-0 ${step.color} mix-blend-overlay opacity-20`} />
                          </div>
                        </div>

                        {/* Detalhe tecnológico (ícones flutuantes) */}
                        <motion.div 
                          className="absolute -top-4 -right-4 w-12 h-12 text-brand-royal opacity-60 drop-shadow-md"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        >
                          <svg viewBox="0 0 100 100" fill="currentColor">
                            <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
                          </svg>
                        </motion.div>
                      </div>
                    </Reveal>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
