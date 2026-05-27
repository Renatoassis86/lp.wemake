"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export function DiagnosticoAutor() {
  return (
    <Section bleed className="py-16 sm:py-24 bg-[#143358] relative overflow-hidden">
      {/* Glow de fundo */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-[rgb(var(--color-brand-mint))]/[0.06] blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[420px] h-[420px] bg-[rgb(var(--color-brand-sky))]/[0.05] blur-[130px] rounded-full" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-center max-w-5xl mx-auto">

          {/* Foto em molde blob + anel girando + ícones flutuantes */}
          <Reveal>
            <div className="relative flex items-center justify-center h-[380px] sm:h-[440px] lg:h-[500px]">

              {/* Blob de fundo (anel de contorno) */}
              <div
                className="absolute top-[6%] left-1/2 -translate-x-1/2 w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px]"
                style={{
                  background: "linear-gradient(135deg, rgba(76,138,222,0.20) 0%, rgba(118,243,205,0.14) 100%)",
                  borderRadius: "62% 38% 47% 53% / 45% 60% 40% 55%",
                  border: "2px solid rgba(118,243,205,0.28)",
                }}
              />

              {/* Anel decorativo girando */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute top-[6%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] lg:w-[400px] lg:h-[400px] rounded-full border border-dashed border-[rgb(var(--color-brand-mint))]/22 pointer-events-none"
              />

              {/* Foto do Dênis (CEO, terno azul) — chroma-key remove o verde */}
              <div
                className="absolute top-[6%] left-1/2 -translate-x-1/2 w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px] overflow-hidden"
                style={{ borderRadius: "62% 38% 47% 53% / 45% 60% 40% 55%" }}
              >
                <Image
                  src="/photos/fotos7.png"
                  alt="Dênis Júlio — CEO e Fundador We Make"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 280px, 360px"
                  style={{ filter: "url(#chroma-green)" }}
                />
              </div>

              {/* Ícone: Cruz — acima direita */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[2%] right-[8%]"
              >
                <svg width="34" height="34" viewBox="0 0 36 36" fill="none" className="opacity-40">
                  <rect x="15" y="2" width="6" height="32" rx="2" fill="rgb(var(--color-brand-mint))" />
                  <rect x="2" y="15" width="32" height="6" rx="2" fill="rgb(var(--color-brand-mint))" />
                </svg>
              </motion.div>

              {/* Ícone: Livro aberto — esquerda meio */}
              <motion.div
                animate={{ y: [0, 6, 0], rotate: [-3, 3, -3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-[42%] left-[2%]"
              >
                <svg width="38" height="38" viewBox="0 0 40 40" fill="none" className="opacity-30">
                  <path d="M4 8 C4 8 12 6 20 10 C28 6 36 8 36 8 L36 32 C36 32 28 30 20 34 C12 30 4 32 4 32 Z" stroke="rgb(var(--color-brand-mint))" strokeWidth="1.5" />
                  <line x1="20" y1="10" x2="20" y2="34" stroke="rgb(var(--color-brand-mint))" strokeWidth="1.5" />
                </svg>
              </motion.div>

              {/* Ícone: Nó de circuito — direita meio */}
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[44%] right-[2%]"
              >
                <svg width="42" height="42" viewBox="0 0 44 44" fill="none" className="opacity-35">
                  <circle cx="22" cy="22" r="5" stroke="white" strokeWidth="1.5" />
                  <circle cx="22" cy="22" r="12" stroke="white" strokeWidth="0.8" strokeDasharray="3 3" />
                  <line x1="22" y1="4" x2="22" y2="10" stroke="white" strokeWidth="1.5" />
                  <line x1="22" y1="34" x2="22" y2="40" stroke="white" strokeWidth="1.5" />
                  <line x1="4" y1="22" x2="10" y2="22" stroke="white" strokeWidth="1.5" />
                  <line x1="34" y1="22" x2="40" y2="22" stroke="white" strokeWidth="1.5" />
                  <circle cx="22" cy="4" r="2" fill="white" />
                  <circle cx="22" cy="40" r="2" fill="white" />
                  <circle cx="4" cy="22" r="2" fill="white" />
                  <circle cx="40" cy="22" r="2" fill="white" />
                </svg>
              </motion.div>

              {/* Ícone: Pena/caneta — canto superior esquerdo */}
              <motion.div
                animate={{ y: [0, 5, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute top-[8%] left-[8%]"
              >
                <svg width="30" height="30" viewBox="0 0 32 32" fill="none" className="opacity-30">
                  <path d="M6 26 L14 10 L24 6 L20 18 Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M14 10 L20 18" stroke="white" strokeWidth="1" />
                  <path d="M6 26 L4 28 L8 28 Z" fill="white" opacity="0.5" />
                </svg>
              </motion.div>

              {/* Ícone: Estrela/faísca — canto inferior direito */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute bottom-[12%] right-[6%]"
              >
                <svg width="26" height="26" viewBox="0 0 28 28" fill="none" className="opacity-40">
                  <path d="M14 2 L16 12 L26 14 L16 16 L14 26 L12 16 L2 14 L12 12 Z" stroke="rgb(var(--color-brand-mint))" strokeWidth="1.2" fill="none" />
                </svg>
              </motion.div>

              {/* Ícone: Arco/bracket — inferior esquerdo */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[14%] left-[4%]"
              >
                <svg width="28" height="28" viewBox="0 0 30 30" fill="none" className="opacity-25">
                  <path d="M8 4 C4 4 2 8 2 15 C2 22 4 26 8 26" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M22 4 C26 4 28 8 28 15 C28 22 26 26 22 26" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </motion.div>

              {/* Badge inferior — sobrepõe o canto inferior da foto */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute bottom-[8%] left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-xl"
              >
                <div className="w-2 h-2 rounded-full bg-[rgb(var(--color-brand-mint))] animate-pulse" />
                <div>
                  <p className="text-white font-bold text-[0.8125rem] leading-none">Dênis Júlio</p>
                  <p className="text-white/50 text-[0.65rem] mt-0.5">Fundador · We Make</p>
                </div>
              </motion.div>

            </div>
          </Reveal>

          {/* Bio */}
          <Reveal delay={0.15}>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--color-brand-mint))]/15 text-[rgb(var(--color-brand-mint))] font-bold text-sm mb-5 border border-[rgb(var(--color-brand-mint))]/30">
                <BookOpen className="size-4" />
                SOBRE O AUTOR
              </div>
              <h2 className="font-display text-white text-[clamp(1.875rem,3vw,2.75rem)] leading-[1.1] mb-5 text-balance">
                Dênis Júlio
              </h2>
              <p className="text-white/85 text-[1.0625rem] leading-relaxed mb-4">
                Fundador da <strong className="text-white">We Make</strong>, a primeira editora brasileira de Educação
                Tecnológica e Maker fundamentada na Cosmovisão Cristã.
              </p>
              <p className="text-white/75 text-[1rem] leading-relaxed mb-4">
                Graduado em Teologia, especialista em Educação Clássica (FICV) e mestre pelo
                Programa de Pós-Graduação em Inovação e Tecnologias Educacionais da UFRN. Atua há
                mais de 10 anos como professor de Educação Tecnológica, Robótica e Educação Maker
                em escolas confessionais cristãs.
              </p>
              <p className="text-white/75 text-[1rem] leading-relaxed">
                Autor do livro <em>Cartas para um Professor Digital</em>, publicado pela Metrópole
                Digital, e ativo nas redes sociais discutindo educação, tecnologia, fé e formação
                humana.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
