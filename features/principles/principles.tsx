"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ModuleSection } from "@/components/ui/module-section";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { principles } from "@/data/principles";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Os 7 Princípios - Capítulo central do livro do Dênis e
 * espinha dorsal pedagógica da We Make.
 *
 * Apresentados em formato editorial (lista numerada + ícone + corpo),
 * sobre fundo ivory para criar respiração entre o Hero (navy) e o
 * Problema (royal). Tom institucional sem ser pesado - escola.
 */
export function Principles() {
  return (
    <ModuleSection id="principios" tone="ivory">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <Eyebrow className="text-[rgb(var(--color-brand-royal))]">
              Os 7 princípios · cosmovisão reformada
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display font-light text-[clamp(2.25rem,1.8rem+3vw,4rem)] leading-[1.05] tracking-[-0.03em] text-[rgb(var(--color-brand-navy))]">
              Sete princípios para ensinar tecnologia{" "}
              <em className="italic">com coerência e fidelidade.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-[1.0625rem] leading-[1.65] text-[rgb(var(--color-brand-navy))]/70">
              Sete princípios construídos a partir da tradição reformada -
              herdeiros da Reforma e da releitura kuyperiana sobre o Reino de
              Deus em todas as esferas da vida. Estruturam o currículo, a
              formação docente e toda a metodologia que entregamos às escolas
              parceiras.
            </p>
          </Reveal>
        </div>

        <Stagger
          delayChildren={0.1}
          staggerChildren={0.08}
          className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {principles.map((p, i) => {
            const Icon = p.icon;
            const isLast = i === principles.length - 1;
            return (
              <motion.article
                key={p.id}
                variants={fadeUp}
                className={cn(
                  "group relative isolate overflow-hidden",
                  "rounded-[1.75rem] border border-[rgb(var(--color-brand-navy))]/8",
                  "bg-white p-7 lg:p-8",
                  "shadow-[0_18px_40px_-24px_rgba(11,31,68,0.18)]",
                  "transition-all duration-500 ease-[var(--ease-cinematic)]",
                  "hover:shadow-[0_24px_56px_-20px_rgba(59,122,229,0.35)] hover:-translate-y-1 hover:border-[rgb(var(--color-brand-royal))]/30",
                  // O último (intencionalidade curricular) ganha destaque
                  isLast && "sm:col-span-2 lg:col-span-3 bg-[rgb(var(--color-brand-navy))] text-white border-transparent",
                )}
              >
                <div className="flex items-start justify-between gap-5">
                  <div
                    className={cn(
                      "inline-flex size-12 items-center justify-center rounded-2xl",
                      isLast
                        ? "bg-[rgb(var(--color-brand-mint))]/15 ring-1 ring-[rgb(var(--color-brand-mint))]/40 text-[rgb(var(--color-brand-mint))]"
                        : "bg-[rgb(var(--color-brand-royal))]/8 ring-1 ring-[rgb(var(--color-brand-royal))]/20 text-[rgb(var(--color-brand-royal))]",
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <span
                    className={cn(
                      "font-display italic text-3xl leading-none select-none",
                      isLast ? "text-white/25" : "text-[rgb(var(--color-brand-navy))]/15",
                    )}
                  >
                    {p.number}
                  </span>
                </div>

                <h3
                  className={cn(
                    "mt-6 font-display text-[1.35rem] leading-[1.15] tracking-[-0.02em]",
                    isLast ? "text-white" : "text-[rgb(var(--color-brand-navy))]",
                  )}
                >
                  {p.title}
                </h3>
                <p
                  className={cn(
                    "mt-2 font-display italic text-[1rem]",
                    isLast ? "text-[rgb(var(--color-brand-mint))]" : "text-[rgb(var(--color-brand-royal))]",
                  )}
                >
                  {p.brief}
                </p>
                <p
                  className={cn(
                    "mt-4 text-[0.9375rem] leading-[1.65]",
                    isLast ? "text-white/75" : "text-[rgb(var(--color-brand-navy))]/70",
                  )}
                >
                  {p.body}
                </p>
              </motion.article>
            );
          })}
        </Stagger>

        <Reveal delay={0.3}>
          <p className="mt-14 text-center font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[rgb(var(--color-brand-navy))]/45">
            Os 7 princípios são desenvolvidos no livro&nbsp;
            <em className="italic">Tecnologia, Virtude e Educação Cristã</em>
            &nbsp;- download gratuito mais abaixo.
          </p>
        </Reveal>
      </Container>
    </ModuleSection>
  );
}
