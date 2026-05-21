"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Glow } from "@/components/ui/glow";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { services } from "@/data/services";
import { fadeUp } from "@/lib/motion";

/**
 * Ato VI — Produtos e Serviços.
 * Cinco frentes integradas, apresentadas em formato catálogo editorial.
 * Cada linha é um capítulo: número editorial, ícone, headline, corpo, lista de entregas.
 */
export function Services() {
  return (
    <Section id="solucoes" bleed>
      <Glow color="cyan" size="xl" intensity={0.16} className="-left-40 top-0" />

      <Container>
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Capítulo VI · O portfólio</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display font-light text-gradient-cinematic text-[clamp(2.25rem,1.8rem+2.6vw,3.75rem)] leading-[1.05] tracking-[-0.03em]">
                Cinco frentes integradas.{" "}
                <em className="font-display italic text-ivory-100">
                  Uma única visão institucional.
                </em>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.2}>
              <p className="text-[1rem] leading-[1.65] text-foreground/65">
                Currículo, formação, plataforma, espaço maker e assessoria.
                Adotáveis em conjunto ou em sequência — sempre articulados
                pela mesma visão pedagógica.
              </p>
            </Reveal>
          </div>
        </div>

        <Stagger
          delayChildren={0.1}
          staggerChildren={0.12}
          className="mt-20 divide-y divide-white/10 border-y border-white/10"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                variants={fadeUp}
                className="group grid gap-6 sm:gap-10 py-10 lg:py-14 lg:grid-cols-12 items-start"
              >
                <div className="lg:col-span-2 flex items-start gap-3 lg:flex-col">
                  <div
                    aria-hidden
                    className="inline-flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] ring-1 ring-glow-cyan/20"
                  >
                    <Icon className="size-5 text-foreground/80" />
                  </div>
                  <div className="lg:mt-4">
                    <span className="block font-mono text-[0.75rem] tracking-[0.22em] text-foreground/35">
                      {service.number}
                    </span>
                    <span className="mt-1 block font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-glow-cyan/80">
                      {service.category}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <h3 className="font-display text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] leading-[1.1] tracking-[-0.025em]">
                    {service.name}
                  </h3>
                  <p className="mt-2 font-display italic text-lg text-ivory-100/85">
                    {service.headline}
                  </p>
                  <p className="mt-5 max-w-prose text-[0.9375rem] leading-[1.65] text-foreground/65">
                    {service.description}
                  </p>
                  <a
                    href="#reuniao"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-glow-cyan hover:text-glow-cyan/80 transition-colors"
                  >
                    Conversar sobre {service.name.toLowerCase()}
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>

                <div className="lg:col-span-5">
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {service.features.map((feat) => (
                      <li
                        key={feat}
                        className="
                          flex items-start gap-3
                          rounded-2xl border border-white/[0.06]
                          bg-white/[0.025] px-4 py-3
                          text-[0.875rem] leading-snug text-foreground/75
                        "
                      >
                        <span
                          className="mt-1 size-1.5 shrink-0 rounded-full bg-glow-cyan/80 shadow-[0_0_8px_rgba(96,165,250,0.7)]"
                          aria-hidden
                        />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
