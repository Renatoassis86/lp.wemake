"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Glow } from "@/components/ui/glow";
import { Particles } from "@/components/effects/particles";
import { SplitText } from "@/components/motion/split-text";
import type { Scene } from "@/data/scenes";

type TitleCardProps = {
  scene: Scene;
  variant: "opening" | "closing";
};

/**
 * Cartelas de abertura e encerramento da sequência cinematográfica.
 *
 *  - Fundo preto cinematográfico com glow + partículas sutis
 *  - Tipografia editorial em larga escala, com split-text reveal
 *  - Pequeno indicador progressivo: "I" para abertura, "VIII" para closing
 */
export function TitleCard({ scene, variant }: TitleCardProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-30, 30]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.35, 0.7, 0.95], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      aria-label={scene.headline}
      className="
        relative isolate
        h-[100svh] min-h-[560px] w-full
        overflow-hidden
        bg-ink-950
      "
    >
      <Glow color="cyan" size="xl" intensity={0.22} className="left-1/2 -translate-x-1/2 top-[25%]" />
      <Glow color="violet" size="xl" intensity={0.18} className="-left-32 bottom-0" />
      <Glow color="blue" size="lg" intensity={0.16} className="-right-32 top-1/3" />
      <Particles count={40} density="subtle" seed={variant === "opening" ? 707 : 808} className="-z-10" />

      <motion.div
        style={{ y, opacity }}
        className="container-rail relative z-10 grid h-full place-items-center text-center"
      >
        <div className="max-w-3xl">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-glow-cyan">
            {scene.eyebrow}
          </span>

          <h2
            className="
              mt-8 font-display font-light text-gradient-cinematic
              text-[clamp(2.5rem,1.8rem+4vw,5.5rem)] leading-[1] tracking-[-0.035em]
            "
          >
            {variant === "closing" ? (
              <span>
                <SplitText text={scene.headline.split(".")[0] ?? scene.headline} by="word" />
                {scene.headline.split(".").length > 1 && (
                  <>
                    <em className="block font-display italic text-white/90">
                      <SplitText
                        text={scene.headline.split(".").slice(1).join(".").trim()}
                        by="word"
                        delay={0.25}
                      />
                    </em>
                  </>
                )}
              </span>
            ) : (
              <SplitText text={scene.headline} by="word" />
            )}
          </h2>

          {scene.caption && (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
              className="mx-auto mt-10 max-w-xl text-[1rem] sm:text-lg leading-[1.6] text-white/70"
            >
              {scene.caption}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 1.1 }}
            className="mt-16 inline-flex items-center gap-3 font-mono text-[0.625rem] uppercase tracking-[0.28em] text-white/50"
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <span>{scene.number}</span>
            <span className="h-px w-12 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
