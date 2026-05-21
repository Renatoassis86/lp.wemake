"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Glow } from "@/components/ui/glow";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { Particles } from "@/components/effects/particles";
import { vision } from "@/data/vision";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

const accentMap = {
  cyan: { ring: "ring-glow-cyan/30", chip: "text-glow-cyan", glow: "cyan" as const, line: "from-glow-cyan/50" },
  blue: { ring: "ring-glow-blue/30", chip: "text-glow-blue", glow: "blue" as const, line: "from-glow-blue/50" },
  violet: { ring: "ring-glow-violet/30", chip: "text-glow-violet", glow: "violet" as const, line: "from-glow-violet/50" },
  amber: { ring: "ring-glow-amber/30", chip: "text-glow-amber", glow: "amber" as const, line: "from-glow-amber/50" },
  rose: { ring: "ring-rose-400/30", chip: "text-rose-300", glow: "violet" as const, line: "from-rose-400/50" },
  emerald: { ring: "ring-emerald-400/30", chip: "text-emerald-300", glow: "cyan" as const, line: "from-emerald-400/50" },
} as const;

/**
 * Ato IV — A Visão da We Make.
 * Os transcendentais clássicos coroados pelo Mandato Cultural.
 * Apresentados como um quadro institucional — numeração romana, grego,
 * tipografia editorial, espaçamento generoso.
 */
export function Vision() {
  return (
    <Section id="visao" bleed>
      <Glow color="violet" size="xl" intensity={0.18} className="-left-40 top-0" />
      <Glow color="cyan" size="xl" intensity={0.16} className="-right-40 bottom-0" />
      <Particles count={36} density="base" seed={91} className="-z-10 opacity-50" />

      <Container>
        <div className="max-w-4xl">
          <Reveal>
            <Eyebrow>Capítulo IV · A nossa visão</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display font-light text-gradient-cinematic text-[clamp(2.25rem,1.8rem+3vw,4.25rem)] leading-[1.05] tracking-[-0.035em]">
              Três transcendentais clássicos,{" "}
              <em className="font-display italic text-ivory-100">
                coroados por um mandato.
              </em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-prose text-[1.0625rem] leading-[1.65] text-foreground/65">
              A visão da We Make repousa em quatro pilares filosóficos que
              atravessam todo o currículo, toda a formação e cada decisão de
              produto. Eles não são slogans — são princípios herdados de uma
              tradição que tem dois mil anos.
            </p>
          </Reveal>
        </div>

        <Stagger
          delayChildren={0.1}
          staggerChildren={0.12}
          className="mt-20 grid gap-8 md:grid-cols-2"
        >
          {vision.map((principle, i) => {
            const accent = accentMap[principle.accent];
            const Icon = principle.icon;
            const isLast = i === vision.length - 1;
            return (
              <motion.article
                key={principle.id}
                variants={fadeUp}
                className={cn(
                  "group relative isolate overflow-hidden",
                  "rounded-[2rem] border border-white/10",
                  "bg-gradient-to-b from-white/[0.05] to-white/[0]",
                  "p-10 lg:p-12",
                  "transition-colors duration-700 hover:border-white/20",
                  isLast && "md:col-span-2",
                )}
              >
                <Glow
                  color={accent.glow}
                  size="md"
                  intensity={0.18}
                  className="-top-32 -right-32 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                />

                <div className="flex items-start justify-between gap-6">
                  <div
                    className={cn(
                      "inline-flex size-14 items-center justify-center rounded-2xl",
                      "border border-white/10 bg-white/[0.05] ring-1",
                      accent.ring,
                    )}
                  >
                    <Icon className="size-6 text-foreground/85" aria-hidden />
                  </div>
                  <span className="font-display italic text-[clamp(2.5rem,1.6rem+3vw,4rem)] leading-none text-foreground/15 select-none">
                    {principle.number}
                  </span>
                </div>

                <div
                  aria-hidden
                  className={cn(
                    "mt-12 h-px w-24",
                    "bg-gradient-to-r to-transparent",
                    accent.line,
                  )}
                />

                <h3 className="mt-6 font-display text-[clamp(2rem,1.5rem+1.8vw,3rem)] leading-[1.05] tracking-[-0.025em]">
                  {principle.title}
                </h3>
                {principle.greek && (
                  <p className={cn("mt-1 font-display italic text-lg", accent.chip)}>
                    {principle.greek} · {principle.subtitle}
                  </p>
                )}

                <p className="mt-6 max-w-prose text-[1rem] leading-[1.7] text-foreground/70">
                  {principle.description}
                </p>
              </motion.article>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
