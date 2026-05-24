"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Glow } from "@/components/ui/glow";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { problems } from "@/data/problems";
import { fadeUp } from "@/lib/motion";

/**
 * Ato III — O Problema das Escolas.
 * Diagnóstico honesto em três golpes. Visual: linhas brutas, tipografia firme,
 * sem decoração — corte editorial reto.
 */
export function Problem() {
  return (
    <Section id="problema" bleed>
      <Glow color="amber" size="xl" intensity={0.12} className="left-1/2 -translate-x-1/2 top-0" />

      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Capítulo III · O problema</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display font-light text-gradient-cinematic text-[clamp(2.25rem,1.8rem+2.6vw,3.75rem)] leading-[1.05] tracking-[-0.03em]">
              Toda escola adota tecnologia.{" "}
              <em className="font-display italic text-ivory-100">
                Poucas escolhem com clareza.
              </em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-prose text-[1.0625rem] leading-[1.6] text-foreground/65">
              Em quase uma década visitando escolas confessionais no Brasil,
              vemos três padrões se repetirem — e é deles que a We Make
              nasceu para cuidar.
            </p>
          </Reveal>
        </div>

        <Stagger
          delayChildren={0.1}
          staggerChildren={0.18}
          className="mt-20 divide-y divide-white/10 border-y border-white/10"
        >
          {problems.map((p) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.id}
                variants={fadeUp}
                className="grid lg:grid-cols-12 gap-8 py-12 lg:py-16"
              >
                <div className="lg:col-span-2 flex items-start gap-4">
                  <span className="font-display italic text-[clamp(3rem,2rem+3vw,5rem)] leading-none text-glow-amber/70 select-none">
                    {p.number}
                  </span>
                </div>

                <div className="lg:col-span-6">
                  <div className="flex items-center gap-3">
                    <Icon className="size-5 text-foreground/55" aria-hidden />
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-foreground/45">
                      Falha estrutural
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-[1.15] tracking-[-0.02em]">
                    {p.title}
                  </h3>
                </div>

                <div className="lg:col-span-4 space-y-5">
                  <p className="text-[0.9375rem] leading-[1.7] text-foreground/70">
                    {p.diagnosis}
                  </p>
                  <p className="border-l-2 border-glow-amber/40 pl-4 font-display italic text-[0.9375rem] leading-[1.5] text-ivory-100/85">
                    {p.consequence}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
