"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { ArrowRight, BookOpen } from "lucide-react";

export function Authority() {
  return (
    <>
      <FounderIntro />
      <SectionBridge />
      <BookShowcase />
    </>
  );
}

/* Divisória ornamental entre fala do fundador e apresentação do livro */
function SectionBridge() {
  return (
    <div className="bg-[#021014] py-10 sm:py-14 flex items-center justify-center relative overflow-hidden">
      {/* Glow sutil mint no centro */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-32 bg-[rgb(var(--color-brand-mint))]/[0.04] blur-[80px] mx-auto max-w-md rounded-full"
      />

      {/* Linha ornamental: traço + ícone livro + traço */}
      <div className="relative flex items-center gap-5 w-full max-w-md px-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-[rgb(var(--color-brand-mint))]/30" />

        <div className="flex-shrink-0 size-10 rounded-full border border-[rgb(var(--color-brand-mint))]/25 bg-[rgb(var(--color-brand-mint))]/[0.04] flex items-center justify-center">
          <BookOpen className="size-4 text-[rgb(var(--color-brand-mint))]/70" />
        </div>

        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/15 to-[rgb(var(--color-brand-mint))]/30" />
      </div>
    </div>
  );
}

function FounderIntro() {
  return (
    <Section bleed className="bg-[#021014] relative overflow-hidden pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24">
      {/* Glow de fundo */}
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none overflow-hidden">
        <div className="w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-[rgb(var(--color-brand-mint))]/10 blur-[120px] rounded-full translate-x-1/3" />
      </div>

      <Container className="relative z-10">
        {/* ── 1) TÍTULO + MANIFESTO (topo, centralizado) ── */}
        <div className="max-w-3xl mx-auto text-center mb-20 lg:mb-24">
          <Reveal>
            <h2 className="font-display text-white text-[clamp(2.5rem,4.5vw,5rem)] leading-[1.05] mb-8">
              Tecnologia com{" "}
              <span className="text-[rgb(var(--color-brand-mint))]">alma.</span>
              <br />
              Educação com{" "}
              <span className="text-[rgb(var(--color-brand-mint))]">propósito.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/80 text-[clamp(1.125rem,1.5vw,1.375rem)] leading-relaxed mx-auto max-w-2xl">
              A We Make ajuda escolas cristãs a formarem alunos capazes de criar, discernir e
              transformar o mundo com sabedoria, caráter e fé.
            </p>
          </Reveal>
        </div>

        {/* ── 2) FOTO NO CÍRCULO (esquerda) + BIO (direita) ── */}
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">

          {/* Foto em molde blob + ícones flutuantes */}
          <Reveal delay={0.15}>
            <div className="relative flex items-center justify-center h-[380px] sm:h-[520px] md:h-[600px] lg:h-[640px]">

              {/* Blob de fundo (anel de contorno) */}
              <div
                className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px]"
                style={{
                  background: "linear-gradient(135deg, rgba(76,138,222,0.18) 0%, rgba(118,243,205,0.12) 100%)",
                  borderRadius: "62% 38% 47% 53% / 45% 60% 40% 55%",
                  border: "2px solid rgba(118,243,205,0.25)",
                }}
              />

              {/* Anel decorativo girando */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px] rounded-full border border-dashed border-[rgb(var(--color-brand-mint))]/20 pointer-events-none"
              />

              {/* Foto do Dênis (CEO, terno azul) — chroma-key remove o verde */}
              <div
                className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] overflow-hidden"
                style={{ borderRadius: "62% 38% 47% 53% / 45% 60% 40% 55%" }}
              >
                <Image
                  src="/photos/fotos7.png"
                  alt="Dênis Júlio — CEO e Fundador da We Make"
                  fill
                  className="object-cover object-top"
                  sizes="440px"
                  style={{ filter: "url(#chroma-green)" }}
                />
              </div>

              {/* Ícone: Cruz — acima direita */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[4%] right-[8%]"
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="opacity-40">
                  <rect x="15" y="2" width="6" height="32" rx="2" fill="rgb(var(--color-brand-mint))" />
                  <rect x="2" y="15" width="32" height="6" rx="2" fill="rgb(var(--color-brand-mint))" />
                </svg>
              </motion.div>

              {/* Ícone: Livro aberto — esquerda meio */}
              <motion.div
                animate={{ y: [0, 6, 0], rotate: [-3, 3, -3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-[40%] left-[2%]"
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-30">
                  <path d="M4 8 C4 8 12 6 20 10 C28 6 36 8 36 8 L36 32 C36 32 28 30 20 34 C12 30 4 32 4 32 Z" stroke="rgb(var(--color-brand-mint))" strokeWidth="1.5" />
                  <line x1="20" y1="10" x2="20" y2="34" stroke="rgb(var(--color-brand-mint))" strokeWidth="1.5" />
                </svg>
              </motion.div>

              {/* Ícone: Nó de circuito — direita meio */}
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[46%] right-[3%]"
              >
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="opacity-35">
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
                className="absolute top-[10%] left-[10%]"
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="opacity-30">
                  <path d="M6 26 L14 10 L24 6 L20 18 Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M14 10 L20 18" stroke="white" strokeWidth="1" />
                  <path d="M6 26 L4 28 L8 28 Z" fill="white" opacity="0.5" />
                </svg>
              </motion.div>

              {/* Ícone: Estrela/faísca — canto inferior direito */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute bottom-[14%] right-[8%]"
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="opacity-40">
                  <path d="M14 2 L16 12 L26 14 L16 16 L14 26 L12 16 L2 14 L12 12 Z" stroke="rgb(var(--color-brand-mint))" strokeWidth="1.2" fill="none" />
                </svg>
              </motion.div>

              {/* Ícone: Arco/bracket — inferior esquerdo */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[18%] left-[6%]"
              >
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" className="opacity-25">
                  <path d="M8 4 C4 4 2 8 2 15 C2 22 4 26 8 26" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M22 4 C26 4 28 8 28 15 C28 22 26 26 22 26" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </motion.div>

              {/* Badge CEO — sobrepõe o canto inferior da foto */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute bottom-[10%] left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 flex items-center gap-3 shadow-xl"
              >
                <div className="w-2 h-2 rounded-full bg-[rgb(var(--color-brand-mint))] animate-pulse" />
                <div>
                  <p className="text-white font-bold text-[0.875rem] leading-none">Dênis Júlio</p>
                  <p className="text-white/50 text-[0.6875rem] mt-0.5">Fundador · We Make</p>
                </div>
              </motion.div>

            </div>
          </Reveal>

          {/* Bio à direita */}
          <div>
            <Reveal delay={0.25}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--color-brand-mint))]/20 text-[rgb(var(--color-brand-mint))] font-bold text-sm mb-6">
                <BookOpen className="size-4" />
                SOBRE O FUNDADOR
              </div>
              <h3 className="font-display text-white text-[clamp(2rem,3vw,3rem)] leading-[1.1] mb-6">
                Dênis Júlio
              </h3>

              <div className="space-y-4 text-white/80 text-[1.0625rem] leading-relaxed text-justify">
                <p>
                  Dênis Júlio Pereira Francisco é graduado em Teologia e especialista em Educação Clássica pela Faculdade Internacional Cidade Viva (FICV), também é mestre pela Universidade Federal do Rio Grande do Norte (UFRN), no Programa de Pós-Graduação em Inovação e Tecnologias Educacionais (PPgITE).
                </p>
                <p>
                  Atua diretamente na área da educação há 10 anos, como professor de Educação Tecnológica, Robótica e Educação Maker. Fundou a We Make, primeira editora brasileira de Educação Tecnológica e Maker fundamentada na Cosmovisão Cristã.
                </p>
                <p>
                  Casado com Gabi, pai de Luísa e Joaquim, Dênis também exerce a função pastoral, o que confere unidade entre sua vocação ministerial, sua prática educacional e sua produção acadêmica. Seu trabalho também pode ser acompanhado em suas redes sociais, onde compartilha reflexões e conteúdos relacionados à educação, tecnologia, fé e formação humana: no Instagram (@denisjulio) e no Substack &quot;Sabedoria &amp; Silício&quot;.
                </p>
              </div>
            </Reveal>
          </div>

        </div>
      </Container>
    </Section>
  );
}

/* ──────────────────────────────────────────────
   BOOK SHOWCASE — seção premium dedicada ao livro
────────────────────────────────────────────── */
function BookShowcase() {
  return (
    <Section bleed className="relative overflow-hidden bg-[#021014] pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-28 lg:pb-40">
      {/* ── Glows de fundo (contidos no terço superior) ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[5%] left-[-5%] w-[400px] h-[400px] bg-[rgb(var(--color-brand-sky))]/[0.03] blur-[160px] rounded-full" />
        <div className="absolute top-[5%] right-[-5%] w-[350px] h-[350px] bg-[rgb(var(--color-brand-mint))]/[0.03] blur-[160px] rounded-full" />
        {/* Grade sutil */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgb(255 255 255 / 1) 1px, transparent 1px), linear-gradient(to right, rgb(255 255 255 / 1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Watermark W — escondido no mobile pra evitar bleed; tablet menor */}
        <div
          aria-hidden
          className="hidden md:block absolute -bottom-12 -left-16 w-[260px] h-[260px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] opacity-[0.09] pointer-events-none select-none -rotate-[8deg]"
        >
          <Image src="/photos/3.png" alt="" fill className="object-contain" sizes="320px" />
        </div>
      </div>

      <Container className="relative z-10">
        {/* Label de seção */}
        <Reveal>
          <div className="flex justify-center mb-14">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[rgb(var(--color-brand-mint))]/30 bg-[rgb(var(--color-brand-mint))]/10 text-[rgb(var(--color-brand-mint))] font-bold text-sm tracking-widest uppercase">
              <BookOpen className="size-4" />
              Obra do Fundador
            </span>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 sm:gap-14 lg:gap-24 items-center max-w-6xl mx-auto">

          {/* ── ESQUERDA: capa do livro grande ── */}
          <Reveal delay={0.15} className="flex justify-center lg:justify-end">
            <div className="book-wrapper relative">
              {/* Halo de luz atrás do livro — contido para não vazar na transição */}
              <div className="absolute inset-0 -z-10 scale-[1.25] blur-[70px] bg-[rgb(var(--color-brand-sky))]/20 rounded-full" />
              <div className="absolute inset-0 -z-10 scale-[1.05] blur-[45px] bg-[rgb(var(--color-brand-mint))]/12 rounded-full" />

              {/* Livro com perspectiva CSS (maior) */}
              <motion.div
                className="book-3d relative w-[260px] sm:w-[340px] md:w-[400px] lg:w-[460px]"
                initial={{ rotateY: -10, opacity: 0, y: 20 }}
                whileInView={{ rotateY: -10, opacity: 1, y: 0 }}
                whileHover={{ rotateY: -5, scale: 1.04 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
              >
                <div
                  className="relative aspect-[2/3] rounded-sm overflow-hidden"
                  style={{
                    boxShadow: "-24px 24px 64px rgba(0,0,0,0.8), -6px 6px 18px rgba(0,0,0,0.6), 2px 0 8px rgba(255,255,255,0.1)",
                  }}
                >
                  <Image
                    src="/books/cartas-professor-digital.png"
                    alt="Cartas para um Professor Digital — Dênis Júlio"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 320px, 460px"
                    priority
                  />
                </div>

                {/* Lombada sintética (espessura esquerda do livro) */}
                <div
                  className="absolute top-0 left-0 h-full w-[22px] rounded-l-sm"
                  style={{
                    transform: "rotateY(90deg) translateZ(-11px) translateX(-11px)",
                    background: "linear-gradient(90deg, #1a2a3a 0%, #2c4a60 40%, #1a2a3a 100%)",
                    boxShadow: "inset -2px 0 6px rgba(0,0,0,0.5)",
                    transformOrigin: "left center",
                  }}
                />
              </motion.div>
            </div>
          </Reveal>

          {/* ── DIREITA: copy do livro ── */}
          <Reveal delay={0.3}>
            <div className="text-white lg:pl-4">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-mint))]/80 mb-4">
                Leitura essencial para educadores
              </p>
              <h2 className="font-display text-[clamp(2rem,3vw,2.75rem)] leading-[1.05] mb-5">
                Cartas para um<br />
                <span className="text-[rgb(var(--color-brand-mint))]">Professor Digital</span>
              </h2>
              <p className="text-white/65 text-[1.0625rem] leading-relaxed mb-8">
                Fruto de sua pesquisa de Mestrado na UFRN sobre ciberética e formação ética de adolescentes no uso das tecnologias digitais. Em linguagem acessível, o livro convida educadores e famílias a pensarem os desafios do mundo digital além da técnica, propondo uma abordagem centrada na Ética das Virtudes. Mais do que um guia sobre tecnologia, é um chamado à formação humana em tempos digitais.
              </p>

              {/* Citação */}
              <blockquote className="mb-8 pl-4 border-l-2 border-[rgb(var(--color-brand-mint))]/50">
                <p className="text-white/80 italic text-[1rem] leading-relaxed">
                  &ldquo;A escola não deve ser apenas um espaço de transmissão de regras, mas também um escudo moral e comunitário capaz de formar alunos mais prudentes, justos, corajosos e responsáveis.&rdquo;
                </p>
              </blockquote>

              <a
                href="#"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))] font-bold text-[1rem] hover:brightness-110 hover:gap-4 transition-all duration-300 shadow-[0_4px_24px_rgba(var(--color-brand-mint),0.3)]"
              >
                Conheça o livro
                <ArrowRight className="size-5" />
              </a>
            </div>
          </Reveal>

        </div>
      </Container>
    </Section>
  );
}
