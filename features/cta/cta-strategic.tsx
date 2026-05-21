"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Glow } from "@/components/ui/glow";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { trackEvent } from "@/lib/analytics";

/**
 * Strategic CTA band — final invitation before the footer.
 * Single message, single action, maximum visual weight.
 */
export function CtaStrategic() {
  return (
    <Section bleed tight>
      <Container>
        <Reveal>
          <div
            className="
              relative overflow-hidden rounded-[2rem]
              border border-white/10
              bg-gradient-to-b from-ink-850 via-ink-900 to-ink-950
              px-8 py-20 sm:px-16 sm:py-28
              text-center
              shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)]
            "
          >
            <Glow color="cyan" size="xl" intensity={0.35} className="-top-40 left-1/2 -translate-x-1/2" />
            <Glow color="violet" size="lg" intensity={0.18} className="-bottom-40 left-1/4" />

            <div className="relative">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-glow-cyan">
                Capítulo XIII · Próximo passo
              </span>
              <h2 className="mt-6 mx-auto max-w-3xl font-display font-light text-gradient-cinematic text-[clamp(2.25rem,1.8rem+2.5vw,4rem)] leading-[1.05] tracking-[-0.03em]">
                Agende uma conversa estratégica{" "}
                <em className="font-display italic text-ivory-100">com nosso time institucional.</em>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.55] text-foreground/65">
                Uma hora. Sem compromisso. O início de um diálogo sobre tecnologia,
                formação humana e o futuro da sua escola.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  size="xl"
                  trailingIcon
                  asChild
                  onClick={() =>
                    trackEvent({
                      name: "cta_click",
                      placement: "cta_strategic",
                      label: "Agendar conversa",
                    })
                  }
                >
                  <a href="#reuniao">Agendar conversa</a>
                </Button>
                <Button size="xl" variant="secondary" asChild>
                  <a href="#manifesto">Ler o manifesto</a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
