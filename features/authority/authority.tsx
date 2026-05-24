"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { ArrowRight, BookOpen, Star, Award, GraduationCap, Users } from "lucide-react";

export function Authority() {
  return (
    <>
      <Manifesto />
      <Biography />
      <BookShowcase />
    </>
  );
}

function Manifesto() {
  return (
    <Section bleed className="bg-[#021014] relative overflow-hidden pt-24 pb-0">
      {/* Glow de fundo */}
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
        <div className="w-[800px] h-[800px] bg-[rgb(var(--color-brand-mint))]/10 blur-[120px] rounded-full translate-x-1/3" />
      </div>

      {/* Clip-path SVG definition — blob orgânico */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="ceo-blob" clipPathUnits="objectBoundingBox">
            <path d="M0.52,0.03 C0.68,0.00 0.86,0.07 0.94,0.21 C1.02,0.35 0.99,0.53 0.96,0.68 C0.92,0.84 0.83,0.97 0.68,0.99 C0.53,1.01 0.38,0.94 0.26,0.84 C0.13,0.74 0.04,0.59 0.02,0.44 C-0.01,0.28 0.06,0.12 0.18,0.07 C0.30,0.02 0.42,0.05 0.52,0.03 Z" />
          </clipPath>
        </defs>
      </svg>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Texto esquerda ── */}
          <div className="pb-16 lg:pb-24">
            <Reveal>
              <h2 className="font-display text-white text-[clamp(2.5rem,4.5vw,5rem)] leading-[1.05] mb-8">
                Tecnologia <br className="hidden lg:block" />com{" "}
                <span className="text-[rgb(var(--color-brand-mint))]">alma.</span>
                <br />
                Educação com <br className="hidden lg:block" />{" "}
                <span className="text-[rgb(var(--color-brand-mint))]">propósito.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/80 text-[clamp(1.125rem,1.5vw,1.375rem)] leading-relaxed max-w-lg">
                A We Make ajuda escolas cristãs a formarem alunos capazes de criar, discernir e
                transformar o mundo com sabedoria, caráter e fé.
              </p>
            </Reveal>
          </div>

          {/* ── Foto em molde blob + ícones flutuantes ── */}
          <Reveal delay={0.15}>
            <div className="relative flex items-end justify-center h-[520px] sm:h-[600px] lg:h-[680px]">

              {/* ── Blob de fundo (anel de contorno) ── */}
              <div
                className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[380px] h-[380px] sm:w-[440px] sm:h-[440px]"
                style={{
                  background: "linear-gradient(135deg, rgba(76,138,222,0.18) 0%, rgba(118,243,205,0.12) 100%)",
                  clipPath: "url(#ceo-blob)",
                  border: "2px solid rgba(118,243,205,0.25)",
                }}
              />

              {/* ── Anel decorativo girando ── */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[420px] h-[420px] sm:w-[480px] sm:h-[480px] rounded-full border border-dashed border-[rgb(var(--color-brand-mint))]/20 pointer-events-none"
              />

              {/* ── Foto recortada no blob ── */}
              <div
                className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[380px] h-[380px] sm:w-[440px] sm:h-[440px] overflow-hidden"
                style={{ clipPath: "url(#ceo-blob)" }}
              >
                <Image
                  src="/photos/denis.png"
                  alt="Dênis Júlio — Fundador da We Make"
                  fill
                  className="object-cover object-top scale-110"
                  sizes="440px"
                />
                {/* Overlay sutil escuro nas bordas para integrar ao fundo */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#021014]/40 via-transparent to-transparent" />
              </div>

              {/* ──────────────────────────────────────────────
                  ÍCONES MONOCROMÁTICOS FLUTUANTES
                  Tom sério: branco/10–30% + mint traço fino
              ────────────────────────────────────────────── */}

              {/* Ícone: Cruz — acima direita */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[2%] right-[8%]"
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
                className="absolute top-[38%] left-[2%]"
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
                className="absolute top-[45%] right-[3%]"
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
                className="absolute top-[8%] left-[10%]"
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
                className="absolute bottom-[12%] right-[8%]"
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="opacity-40">
                  <path d="M14 2 L16 12 L26 14 L16 16 L14 26 L12 16 L2 14 L12 12 Z" stroke="rgb(var(--color-brand-mint))" strokeWidth="1.2" fill="none" />
                </svg>
              </motion.div>

              {/* Ícone: Arco/bracket — inferior esquerdo */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[16%] left-[6%]"
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
                className="absolute bottom-[8%] left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 flex items-center gap-3 shadow-xl"
              >
                <div className="w-2 h-2 rounded-full bg-[rgb(var(--color-brand-mint))] animate-pulse" />
                <div>
                  <p className="text-white font-bold text-[0.875rem] leading-none">Dênis Júlio</p>
                  <p className="text-white/50 text-[0.6875rem] mt-0.5">Fundador · We Make</p>
                </div>
              </motion.div>

            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function Biography() {
  return (
    <Section className="py-24 bg-[#021014] relative overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
          <Reveal className="relative">
             <div className="relative w-full aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-[3rem] overflow-hidden shadow-2xl">
               <Image
                 src="/photos/denis julio_bcgreen.png"
                 alt="Dênis Júlio - Fundador da We Make"
                 fill
                 className="object-cover"
               />
             </div>
             <div className="absolute -inset-6 bg-[rgb(var(--color-brand-sky))]/30 rounded-[4rem] -z-10 rotate-6 max-w-md mx-auto lg:mx-0" />
          </Reveal>

          <div>
            <Reveal>
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
  const badges = [
    { icon: GraduationCap, label: "Mestrado UFRN", sub: "Obra acadêmica" },
    { icon: Award,         label: "Publicado pela", sub: "Metrópole Digital" },
    { icon: Users,         label: "Para educadores", sub: "Escolas cristãs" },
    { icon: Star,          label: "Cosmovisão cristã", sub: "Como fundamento" },
  ];

  return (
    <Section bleed className="relative overflow-hidden bg-[#021014] py-28">
      {/* ── Glows de fundo ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-[rgb(var(--color-brand-sky))]/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[rgb(var(--color-brand-mint))]/10 blur-[130px] rounded-full" />
        {/* Grade sutil */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgb(255 255 255 / 1) 1px, transparent 1px), linear-gradient(to right, rgb(255 255 255 / 1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
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

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-between">
          
          {/* ── ESQUERDA: badges de credencial ── */}
          <Reveal className="hidden lg:grid grid-cols-2 gap-4 lg:w-1/3">
            {badges.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm hover:border-[rgb(var(--color-brand-mint))]/40 hover:bg-white/10 transition-all duration-300"
              >
                <Icon className="size-6 text-[rgb(var(--color-brand-mint))]" />
                <span className="text-white font-semibold text-[0.9375rem] leading-snug">{label}</span>
                <span className="text-white/50 text-xs">{sub}</span>
              </div>
            ))}
          </Reveal>

          {/* ── CENTRO: capa do livro ── */}
          <Reveal delay={0.15} className="flex justify-center">
            <div className="book-wrapper relative">
              {/* Brilho atrás do livro */}
              <div className="absolute inset-0 -z-10 scale-[1.3] blur-[60px] bg-[rgb(var(--color-brand-sky))]/30 rounded-full" />

              {/* Livro com perspectiva CSS */}
              <motion.div
                className="book-3d relative w-[240px] sm:w-[280px] lg:w-[300px]"
                initial={{ rotateY: -10, opacity: 0, y: 20 }}
                whileInView={{ rotateY: -10, opacity: 1, y: 0 }}
                whileHover={{ rotateY: -5, scale: 1.04 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
              >
                <div
                  className="relative aspect-[2/3] rounded-sm overflow-hidden"
                  style={{
                    boxShadow: "-16px 16px 48px rgba(0,0,0,0.8), -4px 4px 12px rgba(0,0,0,0.6), 2px 0 6px rgba(255,255,255,0.08)",
                  }}
                >
                  <Image
                    src="/books/cartas-professor-digital.png"
                    alt="Cartas para um Professor Digital — Dênis Júlio"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 240px, 300px"
                    priority
                  />
                </div>

                {/* Lombada sintética (espessura esquerda do livro) */}
                <div
                  className="absolute top-0 left-0 h-full w-[18px] rounded-l-sm"
                  style={{
                    transform: "rotateY(90deg) translateZ(-9px) translateX(-9px)",
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

              {/* Badges mobile (visível só em telas pequenas) */}
              <div className="flex flex-wrap gap-2 mb-8 lg:hidden">
                {badges.map(({ icon: Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-medium border border-white/10">
                    <Icon className="size-3 text-[rgb(var(--color-brand-mint))]" />
                    {label}
                  </span>
                ))}
              </div>

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
