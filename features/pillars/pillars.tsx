"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Glow } from "@/components/ui/glow";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { pillars } from "@/data/pillars";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/motion";

const accentMap = {
  cyan: { ring: "ring-glow-cyan/30", chip: "text-glow-cyan", glow: "cyan" as const },
  blue: { ring: "ring-glow-blue/30", chip: "text-glow-blue", glow: "blue" as const },
  violet: { ring: "ring-glow-violet/30", chip: "text-glow-violet", glow: "violet" as const },
  amber: { ring: "ring-glow-amber/30", chip: "text-glow-amber", glow: "amber" as const },
};

/**
 * Os quatro pilares — apresentados em grade editorial.
 * Cards sutis com hairline, número editorial e ícone.
 */
export function Pillars() {
  return (
    <Section id="pilares" bleed>
      <Glow color="violet" size="xl" intensity={0.18} className="-left-40 top-0" />

      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Os quatro pilares</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="
                mt-5 font-display font-light text-gradient-cinematic
                text-[clamp(2.25rem,1.8rem+2.5vw,3.75rem)]
                leading-[1.05] tracking-[-0.03em]
              "
            >
              Uma pedagogia da tecnologia, pensada do início ao fim.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-prose text-lg leading-[1.55] text-foreground/65">
              Quatro pilares pedagógicos estruturam o currículo, a formação de
              educadores e o desenho de cada material editorial.
            </p>
          </Reveal>
        </div>

        <Stagger
          delayChildren={0.1}
          staggerChildren={0.1}
          className="mt-20 grid gap-px sm:grid-cols-2 lg:grid-cols-4 rounded-2xl border border-white/10 overflow-hidden bg-white/[0.04]"
        >
          {pillars.map((pillar) => {
            const accent = accentMap[pillar.accent];
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.id}
                variants={fadeUp}
                className="group relative bg-ink-900 p-8 lg:p-10 transition-colors duration-500 hover:bg-ink-850"
              >
                <Glow
                  color={accent.glow}
                  size="md"
                  intensity={0.18}
                  className="-top-32 -right-32 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div
                    className={cn(
                      "inline-flex size-12 items-center justify-center rounded-2xl",
                      "border border-white/10 bg-white/[0.04] ring-1",
                      accent.ring,
                    )}
                  >
                    <Icon className="size-5 text-foreground/80" aria-hidden />
                  </div>
                  <span className="font-mono text-[0.75rem] tracking-[0.2em] text-foreground/35">
                    {pillar.number}
                  </span>
                </div>

                <h3 className="mt-10 font-display text-2xl tracking-tight">
                  {pillar.title}
                </h3>
                <p className={cn("mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em]", accent.chip)}>
                  {pillar.subtitle}
                </p>
                <p className="mt-5 text-[0.9375rem] leading-[1.6] text-foreground/65">
                  {pillar.description}
                </p>
              </motion.article>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
