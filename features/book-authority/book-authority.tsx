"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Users, ShieldAlert, Award, FileText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Glow } from "@/components/ui/glow";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/effects/particles";
import { fadeUp } from "@/lib/motion";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/constants/site";

export function BookAuthority() {
  const researchStats = [
    {
      id: "stat-1",
      icon: Users,
      value: "259",
      label: "Adolescentes",
      description: "De 14 a 17 anos entrevistados e avaliados em sua conduta ética digital.",
    },
    {
      id: "stat-2",
      icon: Award,
      value: "4",
      label: "Estados",
      description: "Pesquisa em escala nacional: Rio Grande do Norte, Paraíba, Paraná e Santa Catarina.",
    },
    {
      id: "stat-3",
      icon: GraduationCap,
      value: "5",
      label: "Modelos de Escola",
      description: "Investigação abrangente em escolas cristãs confessionais, clássica, laica e pública.",
    },
    {
      id: "stat-4",
      icon: ShieldAlert,
      value: "6",
      label: "Dilemas Críticos",
      description: "Análise profunda de impulsividade, cyberbullying, omissão, mentira e cancelamento.",
    },
  ];

  return (
    <Section id="pesquisa" bleed className="relative overflow-hidden py-24 sm:py-32">
      {/* Cinematic Atmosphere background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 50% at 20% 30%, rgba(59,122,229,0.14) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 80% 70%, rgba(94,230,184,0.12) 0%, transparent 60%)",
        }}
      />
      <Glow color="cyan" size="xl" intensity={0.16} className="-left-40 top-1/4" />
      <Glow color="violet" size="lg" intensity={0.15} className="-right-32 bottom-1/4" />
      <Particles count={32} density="subtle" seed={44} className="-z-10 opacity-40" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_1.3fr] gap-12 lg:gap-20 items-center">
          {/* ─── BOOK COVER DISPLAY (Esquerda) ────────────────────── */}
          <div className="relative flex justify-center order-2 lg:order-1 perspective-1200 preserve-3d gpu">
            {/* Soft backdrop glow behind the book */}
            <div
              aria-hidden
              className="
                absolute w-72 h-96 -z-10 rounded-[2rem]
                bg-gradient-to-tr from-[rgb(var(--color-brand-royal))]/20 to-[rgb(var(--color-brand-mint))]/15
                blur-3xl opacity-80
              "
            />
            
            {/* Premium 3D Book Cover Wrap */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotateY: 5, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: -12, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ rotateY: -4, rotateX: 2, scale: 1.03 }}
              className="
                relative aspect-[2/3] w-full max-w-sm overflow-hidden
                rounded-2xl border border-white/15
                bg-ink-900
                shadow-[25px_30px_60px_-15px_rgba(4,8,20,0.85),inset_0_1px_0_rgba(255,255,255,0.08)]
                transition-all duration-500
              "
            >
              <Image
                src="/books/cartas-professor-digital.png"
                alt="Capa do Livro Cartas para um Professor Digital por Dênis Júlio"
                fill
                sizes="(min-width: 1024px) 25rem, 100vw"
                className="object-cover object-center"
                priority
              />
              
              {/* Overlay realistic page-glare sheen */}
              <div 
                aria-hidden 
                className="
                  absolute inset-0 pointer-events-none 
                  bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08]
                "
              />
            </motion.div>

            {/* Float tags */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="
                absolute -left-4 sm:left-4 top-10
                flex items-center gap-2 rounded-full
                border border-[rgb(var(--color-brand-mint))]/30 
                bg-ink-950/90 backdrop-blur px-4 py-2
                font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[rgb(var(--color-brand-mint))]
                shadow-lg
              "
            >
              <span className="size-1.5 rounded-full bg-[rgb(var(--color-brand-mint))] animate-pulse" />
              Pesquisa UFRN
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="
                absolute -right-4 sm:right-4 bottom-10
                flex items-center gap-2 rounded-full
                border border-white/12 
                bg-ink-950/90 backdrop-blur px-4 py-2
                font-mono text-[0.625rem] uppercase tracking-[0.2em] text-white/80
                shadow-lg
              "
            >
              <BookOpen className="size-3.5 text-[rgb(var(--color-brand-royal-soft))]" />
              Ética das Virtudes
            </motion.div>
          </div>

          {/* ─── COPY & STATS GRID (Direita) ───────────────────────── */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <Reveal>
              <Eyebrow>Capítulo VI · Autoridade Intelectual e Pesquisa</Eyebrow>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display font-light text-gradient-cinematic text-[clamp(2.25rem,1.8rem+3vw,4.5rem)] leading-[1.05] tracking-[-0.035em]">
                Cartas para um<br />
                <em className="font-display italic text-ivory-100">
                  Professor Digital
                </em>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 text-[1.0625rem] sm:text-lg leading-[1.65] text-foreground/75">
                Escrita pelo nosso CEO **Dênis Júlio Pereira Francisco**, a obra é fruto de sua pesquisa de Mestrado na UFRN sobre ciberética e formação ética de adolescentes. Em linguagem acessível e profundamente reflexiva, o livro convida educadores, gestores e famílias a pensarem nos desafios do ciberespaço para além da técnica.
              </p>
              <p className="mt-4 text-[0.9375rem] leading-[1.6] text-foreground/60">
                A proposta baseia-se na **Ética das Virtudes** e no desenvolvimento comunitário do caráter, provendo um escudo moral contra a impulsividade e o cancelamento digital. Uma obra pedagógica fundamental que dá suporte filosófico e científico a todo o currículo We Make.
              </p>
            </Reveal>

            {/* Stats Grid */}
            <Stagger
              delayChildren={0.2}
              staggerChildren={0.08}
              className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/10 pt-10"
            >
              {researchStats.map((item) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    variants={fadeUp}
                    className="group/stat relative flex flex-col gap-2 rounded-2xl border border-white/[0.04] bg-white/[0.01] p-5 transition-colors duration-300 hover:bg-white/[0.03] hover:border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/70 group-hover/stat:text-[rgb(var(--color-brand-mint))] group-hover/stat:border-[rgb(var(--color-brand-mint))]/30 transition-colors">
                        <IconComponent className="size-4" />
                      </div>
                      <span className="font-display text-2xl font-light text-white tracking-tight">
                        {item.value}
                      </span>
                      <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-foreground/50">
                        {item.label}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-foreground/60">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </Stagger>

            {/* Call to Actions */}
            <Reveal delay={0.4}>
              <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="https://forms.gle/X5x3W6mXnCExm2JK8"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent({
                      name: "cta_click",
                      placement: "book_authority",
                      label: "Participar do Sorteio do Livro",
                    })
                  }
                >
                  <Button variant="primary" size="lg" trailingIcon>
                    Sorteio do Livro Físico
                  </Button>
                </a>
                
                <a
                  href={`https://wa.me/5583982301530?text=${encodeURIComponent("Olá! Eu gostaria de saber mais sobre a pesquisa de ciberética e o currículo We Make.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent({
                      name: "cta_click",
                      placement: "book_authority",
                      label: "Conhecer a Pesquisa Completa",
                    })
                  }
                >
                  <Button variant="secondary" size="lg">
                    Conhecer a Pesquisa
                  </Button>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
