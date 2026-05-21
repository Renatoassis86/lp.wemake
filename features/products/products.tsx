"use client";

import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { products } from "@/data/products";
import { fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";

/**
 * Soluções — apresentado como catálogo editorial.
 * Linhas largas e hairlines, como uma página de revista.
 */
export function Products() {
  return (
    <Section id="solucoes" bleed>
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Soluções institucionais</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="
                  mt-5 font-display font-light text-gradient-cinematic
                  text-[clamp(2.25rem,1.8rem+2.5vw,3.75rem)]
                  leading-[1.05] tracking-[-0.03em]
                "
              >
                Não vendemos um produto.{" "}
                <em className="font-display italic text-ivory-100">
                  Editamos uma forma de pensar a escola.
                </em>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <p className="text-lg leading-[1.55] text-foreground/65">
                Quatro frentes integradas — currículo, plataforma, formação e
                consultoria — que podem ser adotadas em conjunto ou
                gradualmente, conforme o estágio da sua instituição.
              </p>
            </Reveal>
          </div>
        </div>

        <Stagger
          delayChildren={0.1}
          staggerChildren={0.12}
          className="mt-20 divide-y divide-white/10 border-y border-white/10"
        >
          {products.map((product, i) => (
            <motion.article
              key={product.id}
              variants={fadeUp}
              className="group grid gap-6 sm:gap-10 py-10 lg:py-14 lg:grid-cols-12 items-start"
            >
              <div className="lg:col-span-2 flex items-baseline gap-3 lg:gap-0 lg:flex-col">
                <span className="font-mono text-[0.75rem] tracking-[0.22em] text-foreground/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-glow-cyan/80 lg:mt-3">
                  {product.category}
                </span>
              </div>

              <div className="lg:col-span-5">
                <h3 className="font-display text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] leading-[1.1] tracking-[-0.025em]">
                  {product.name}
                </h3>
                <p className="mt-2 font-display italic text-lg text-ivory-100/85">
                  {product.headline}
                </p>
                <p className="mt-5 max-w-prose text-[0.9375rem] leading-[1.6] text-foreground/65">
                  {product.description}
                </p>
                <a
                  href="#contato"
                  className="
                    mt-6 inline-flex items-center gap-2
                    text-sm font-medium text-glow-cyan
                    hover:text-glow-cyan/80 transition-colors
                  "
                >
                  Conversar sobre {product.name.toLowerCase()}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              <div className="lg:col-span-5">
                <ul className="grid sm:grid-cols-2 gap-3">
                  {product.features.map((feat) => (
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
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
