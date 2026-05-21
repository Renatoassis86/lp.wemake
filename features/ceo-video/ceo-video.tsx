"use client";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Glow } from "@/components/ui/glow";
import { VideoPlayer } from "@/components/ui/video-player";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/constants/site";

/**
 * Ato V — Vídeo do CEO.
 * Apresentação de Dênis, fundador da We Make.
 * Player cinematográfico em larga escala, com overlay editorial.
 */
export function CeoVideo() {
  return (
    <Section id="ceo" bleed>
      <Glow color="cyan" size="xl" intensity={0.22} className="-left-32 top-1/2 -translate-y-1/2" />
      <Glow color="violet" size="xl" intensity={0.18} className="-right-32 top-1/2 -translate-y-1/2" />

      <Container size="xl">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Capítulo V · Mensagem do fundador</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display font-light text-gradient-cinematic text-[clamp(2rem,1.6rem+2.5vw,3.75rem)] leading-[1.05] tracking-[-0.03em]">
                Uma carta filmada para diretores e mantenedores.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.2}>
              <p className="text-[1rem] leading-[1.65] text-foreground/65">
                {siteConfig.founder.name} apresenta a We Make em primeira pessoa:
                a história do movimento, as convicções que o fundaram e o convite
                aberto às escolas que querem caminhar conosco.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.25}>
          <div className="mt-16">
            <VideoPlayer
              src={siteConfig.ceo.videoFull}
              poster={siteConfig.ceo.videoPoster}
              captions={siteConfig.ceo.videoCaption}
              durationLabel={siteConfig.ceo.duration}
              title="Tecnologia com raiz — uma visão para escolas cristãs"
              byline={`${siteConfig.founder.name} · ${siteConfig.founder.role}`}
            />
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <figure className="mt-10 flex items-center gap-5">
            <div
              aria-hidden
              className="size-12 rounded-full bg-gradient-to-br from-ink-300/20 to-glow-cyan/20 ring-1 ring-white/10"
            />
            <figcaption>
              <div className="font-display text-lg">{siteConfig.founder.name}</div>
              <div className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-foreground/45">
                {siteConfig.founder.role} · We Make
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </Section>
  );
}
