"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Glow } from "@/components/ui/glow";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { Particles } from "@/components/effects/particles";
import { worldChanges } from "@/data/world-changes";
import { fadeUp } from "@/lib/motion";

/**
 * Ato II - O Mundo Mudou.
 * Diagnóstico cultural sóbrio: IA, telas, crise educacional, cultura digital.
 * Apresentado como sequência editorial - números romanos + leituras espaçadas.
 */
export function WorldChanged() {
  return (
    <Section id="mundo" bleed>
      <Glow color="violet" size="xl" intensity={0.16} className="-left-40 top-20" />
      <Glow color="blue" size="lg" intensity={0.16} className="-right-32 bottom-20" />
      <Particles count={28} density="subtle" seed={42} className="-z-10 opacity-60" />

      <Container>
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Capítulo II · Diagnóstico</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display font-light text-gradient-cinematic text-[clamp(2.25rem,1.8rem+3vw,4.25rem)] leading-[1.05] tracking-[-0.03em]">
                O mundo mudou.{" "}
                <em className="font-display italic text-ivory-100">
                  A escola precisa responder à altura.
                </em>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.2}>
              <p className="text-[1.0625rem] leading-[1.6] text-foreground/65">
                Quatro forças culturais reconfiguram, simultaneamente, o que
                significa formar uma pessoa no século XXI.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Storytelling Image */}
        <Reveal delay={0.4}>
          <div className="relative mt-16 aspect-[21/9] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
            <Image
              src="/photos/foto1.png"
              alt="Alunos em um ambiente de aprendizagem moderno e maker"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
          </div>
        </Reveal>

        <Stagger
          delayChildren={0.1}
          staggerChildren={0.14}
          className="mt-20 grid gap-10 md:grid-cols-2"
        >
          {worldChanges.map((change) => {
            const Icon = change.icon;
            return (
              <motion.article
                key={change.id}
                variants={fadeUp}
                className="
                  group relative
                  rounded-[1.75rem] border border-white/10
                  bg-gradient-to-b from-white/[0.04] to-white/[0]
                  p-8 lg:p-10
                  transition-colors duration-500
                  hover:border-white/20
                "
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] ring-1 ring-glow-cyan/20">
                    <Icon className="size-5 text-foreground/80" aria-hidden />
                  </div>
                  <span className="font-mono text-[0.75rem] tracking-[0.22em] text-foreground/35">
                    {change.number}
                  </span>
                </div>

                <h3 className="mt-10 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-glow-cyan">
                  {change.signal}
                </h3>
                <p className="mt-3 font-display text-[clamp(1.25rem,1.05rem+0.7vw,1.6rem)] leading-[1.3] tracking-[-0.015em] text-foreground/90">
                  {change.headline}
                </p>
                <p className="mt-5 max-w-prose text-[0.9375rem] leading-[1.65] text-foreground/65">
                  {change.body}
                </p>
              </motion.article>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
