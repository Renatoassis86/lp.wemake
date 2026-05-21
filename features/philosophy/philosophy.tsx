"use client";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Glow } from "@/components/ui/glow";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";

/**
 * Filosofia — seção contemplativa.
 * Citação editorial em larga escala, com glow ambiente.
 */
export function Philosophy() {
  return (
    <Section id="filosofia" bleed className="overflow-visible">
      <Glow color="violet" size="xl" intensity={0.22} className="left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />

      <Container size="lg">
        <Reveal>
          <Eyebrow>Cosmovisão</Eyebrow>
        </Reveal>

        <Parallax distance={-40}>
          <Reveal delay={0.1}>
            <blockquote className="mt-10">
              <p
                className="
                  font-display font-light italic
                  text-[clamp(2rem,1.4rem+3.2vw,4.75rem)]
                  leading-[1.1] tracking-[-0.025em]
                  text-gradient-cinematic
                "
              >
                “Educar é cultivar a alma para que ela reconheça a verdade,
                ame o que é belo e produza o que é bom — inclusive com tecnologia.”
              </p>
              <footer className="mt-12 flex items-center gap-4">
                <div
                  className="size-12 rounded-full bg-gradient-to-br from-ink-300/20 to-glow-violet/20 ring-1 ring-white/10"
                  aria-hidden
                />
                <div>
                  <div className="font-display text-lg">Equipe pedagógica We Make</div>
                  <div className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/45">
                    Caderno editorial · Volume 01
                  </div>
                </div>
              </footer>
            </blockquote>
          </Reveal>
        </Parallax>
      </Container>
    </Section>
  );
}
