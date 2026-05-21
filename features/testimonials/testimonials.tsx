"use client";

import { Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { testimonials } from "@/data/testimonials";
import { fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";

/**
 * Editorial testimonials — three columns of long-form quotes.
 * No avatars, no fake star ratings; only authoritative voices.
 */
export function Testimonials() {
  return (
    <Section id="vozes" bleed>
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Vozes institucionais</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display font-light text-gradient-cinematic text-[clamp(2rem,1.6rem+2vw,3.25rem)] leading-[1.1] tracking-[-0.025em]">
              Diretores e mantenedores que pensam com a gente.
            </h2>
          </Reveal>
        </div>

        <Stagger
          delayChildren={0.1}
          staggerChildren={0.12}
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.id}
              variants={fadeUp}
              className="
                relative flex flex-col gap-6
                rounded-3xl border border-white/10
                bg-gradient-to-b from-white/[0.04] to-white/[0]
                p-8 lg:p-10
                shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
              "
            >
              <Quote className="size-7 text-glow-cyan/70" aria-hidden />
              <blockquote className="font-display text-lg leading-[1.45] text-foreground/85">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-auto pt-6 border-t border-white/10">
                <div className="font-display text-base">{t.author}</div>
                <div className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-foreground/45">
                  {t.role} · {t.institution}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
