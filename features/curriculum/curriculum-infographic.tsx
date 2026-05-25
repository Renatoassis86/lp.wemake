"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    id: "01",
    title: "Cultura Maker",
    desc: "Mais do que montar peças, os alunos aprendem a solucionar problemas reais construindo projetos criativos. Uma abordagem prática de engenharia, física e eletrônica.",
    color: "bg-[#FF7B54]", // laranja vibrante
    photo: "/photos/foto4.png",
    blob: "62% 38% 47% 53% / 45% 60% 40% 55%",
  },
  {
    id: "02",
    title: "Programação",
    desc: "Alfabetização para o futuro. Da criação de narrativas visuais e jogos à automação de projetos físicos e digitais com Scratch, Python e blocos lógicos.",
    color: "bg-[#9333EA]", // roxo profundo
    photo: "/photos/foto2.png",
    blob: "38% 62% 53% 47% / 60% 45% 55% 40%",
  },
  {
    id: "03",
    title: "Robótica",
    desc: "Mão na massa! Construção e programação de robôs que interagem com o ambiente, estimulando o raciocínio lógico e o trabalho em equipe.",
    color: "bg-[#14B8A6]", // teal vibrante
    photo: "/photos/foto1.png",
    blob: "55% 45% 38% 62% / 50% 58% 42% 50%",
  },
  {
    id: "04",
    title: "Pensamento Computacional",
    desc: "O superpoder de decompor problemas complexos em etapas simples. Abstração, reconhecimento de padrões e algoritmos aplicados ao currículo.",
    color: "bg-[#FF6B6B]", // coral
    photo: "/photos/foto5.png",
    blob: "45% 55% 62% 38% / 55% 40% 60% 45%",
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
    <section id="jornada" ref={containerRef} className="relative pt-12 pb-24 sm:pt-16 sm:pb-32 bg-ink-950 overflow-hidden">
      {/* Background Tech Dot Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)", backgroundSize: "32px 32px" }}
      />

      {/* Marca d'água — emblema We Make rotacionado (escondida em mobile pra evitar overflow) */}
      <div aria-hidden className="hidden md:block absolute top-[10%] right-[-6%] w-[320px] md:w-[400px] lg:w-[460px] aspect-square opacity-[0.08] rotate-12 pointer-events-none select-none">
        <Image src="/photos/3.png" alt="" fill className="object-contain" sizes="460px" />
      </div>
      <div aria-hidden className="hidden md:block absolute bottom-[6%] left-[-8%] w-[280px] md:w-[340px] lg:w-[400px] aspect-square opacity-[0.07] -rotate-12 pointer-events-none select-none">
        <Image src="/photos/3.png" alt="" fill className="object-contain" sizes="400px" />
      </div>

      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 relative z-10">
          <Reveal>
            <span className="font-mono text-sm uppercase tracking-widest text-brand-royal font-bold">O Desenvolvimento</span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl text-ink-100 tracking-tight text-balance">
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

          <div className="flex flex-col gap-16 sm:gap-20 md:gap-32">
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
                      <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-ink-100 mb-4 text-balance">{step.title}</h3>
                      <p className="text-ink-500 text-[1.0625rem] leading-relaxed max-w-md ml-auto mr-auto md:mx-0">{step.desc}</p>
                    </Reveal>
                  </div>

                  {/* Imagem em blob + mancha de cor offset */}
                  <div className="flex-1 w-full pl-[80px] md:pl-0 flex justify-center md:justify-start">
                    <Reveal delay={0.4}>
                      <div className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[340px] md:h-[340px]">

                        {/* Mancha de cor sólida atrás, deslocada (estilo "tinta") */}
                        <motion.div
                          aria-hidden
                          animate={{ rotate: [0, 3, -3, 0] }}
                          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                          className={`absolute inset-0 ${step.color} opacity-95 ${isEven ? "translate-x-5 translate-y-5" : "-translate-x-5 translate-y-5"}`}
                          style={{ borderRadius: step.blob }}
                        />

                        {/* Glow sutil bem atrás */}
                        <div
                          aria-hidden
                          className={`absolute inset-0 ${step.color} opacity-30 blur-3xl rounded-full scale-90`}
                        />

                        {/* Foto em formato blob orgânico (sem borda) */}
                        <div
                          className="absolute inset-0 overflow-hidden shadow-2xl"
                          style={{ borderRadius: step.blob }}
                        >
                          <Image
                            src={step.photo}
                            alt={step.title}
                            fill
                            className="object-cover transition-transform duration-1000 hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                        </div>

                        {/* Estrela tecnológica flutuante */}
                        <motion.div
                          aria-hidden
                          className="absolute -top-3 -right-3 w-10 h-10 text-brand-royal opacity-60 drop-shadow-md"
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
