"use client";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";

const paragraphs = [
  {
    accent: "Acreditamos que",
    body:
      "toda tecnologia é cultural antes de ser técnica. Por trás de cada linguagem, plataforma ou algoritmo existe um modo de imaginar o mundo. Por isso, ensinar tecnologia é, antes de tudo, formar o olhar.",
  },
  {
    accent: "Acreditamos que",
    body:
      "escolas cristãs não precisam escolher entre fidelidade e excelência. A excelência intelectual é uma forma de fidelidade — e a fidelidade não é um obstáculo ao rigor, é a sua raiz.",
  },
  {
    accent: "Acreditamos que",
    body:
      "o futuro pertence às instituições que sabem por que existem. Por isso desenhamos currículo, plataforma e formação a partir das convicções da escola, não contra elas.",
  },
];

/**
 * Manifesto — a slow, contemplative section.
 * Editorial typography, generous whitespace, hairline rails.
 */
export function Manifesto() {
  return (
    <Section id="manifesto" bleed>
      <Container size="lg">
        <Reveal>
          <Eyebrow>Manifesto · 2026</Eyebrow>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            className="
              mt-6 font-display font-light text-gradient-cinematic
              text-[clamp(2.25rem,1.8rem+3vw,4.25rem)]
              leading-[1.05] tracking-[-0.03em]
            "
          >
            Tecnologia não é uma matéria.{" "}
            <em className="font-display italic text-ivory-100">
              É uma forma de habitar o mundo.
            </em>
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-16">
          <Stagger delayChildren={0.1} staggerChildren={0.18}>
            {paragraphs.map((p, i) => (
              <Reveal key={i} as="article" className="relative pl-8 sm:pl-12">
                <div
                  aria-hidden
                  className="absolute left-0 top-2 h-[1px] w-6 bg-gradient-to-r from-glow-cyan to-transparent"
                />
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-glow-cyan">
                  {p.accent}
                </span>
                <p
                  className="
                    mt-3 max-w-[44rem]
                    font-display text-[clamp(1.35rem,1rem+1.1vw,1.875rem)]
                    leading-[1.45] tracking-[-0.015em]
                    text-foreground/85
                  "
                >
                  {p.body}
                </p>
              </Reveal>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.4}>
          <div className="mt-20 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-foreground/45">
              We Make · Editora Educacional
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-white/15 to-transparent" />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
