"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Glow } from "@/components/ui/glow";
import { Section } from "@/components/ui/section";
import { Aurora } from "@/components/effects/aurora";
import { Particles } from "@/components/effects/particles";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { siteConfig } from "@/constants/site";
import { fadeUp } from "@/lib/motion";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { CeoCinematicPlayer, type CeoPlayerHandle } from "./ceo-cinematic-player";
import { SpeakerCard } from "./speaker-card";

/**
 * Capítulo V — Carta filmada do CEO.
 *
 * Composição vertical em quatro tempos:
 *   1. Eyebrow + headline editorial em larga escala
 *   2. Subheadline + linha do palestrante
 *   3. Player premium (16:9, com poster editorial e autoplay mudo)
 *   4. Índice TED-style + cartão do speaker em grid
 *
 * Inspiração visual: TED Talk × Netflix documentary × Apple keynote.
 */
export function CeoVideo() {
  const playerRef = useRef<CeoPlayerHandle | null>(null);
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const [playerLive, setPlayerLive] = useState(false);

  const speakerLine = `Com ${siteConfig.founder.name} · ${siteConfig.founder.role} · ${siteConfig.ceo.duration}`;

  const jumpTo = (index: number, seconds: number, label: string) => {
    playerRef.current?.seekTo(seconds);
    setActiveChapter(index);
    setPlayerLive(true);
    trackEvent({
      name: "cta_click",
      placement: "ceo_chapter",
      label,
    });
  };

  return (
    <Section id="ceo" bleed className="relative overflow-hidden">
      {/* Layered atmosphere — floating gradients, aurora, particles, glow orbs */}
      <Aurora className="opacity-60" />
      <Glow color="cyan" size="xl" intensity={0.24} className="-left-40 top-1/3" />
      <Glow color="violet" size="xl" intensity={0.22} className="-right-40 top-1/3" />
      <Glow color="blue" size="lg" intensity={0.18} className="left-1/2 -translate-x-1/2 bottom-0" />
      <Particles count={42} density="subtle" seed={211} className="-z-10 opacity-70" />

      {/* Floating drift orbs (decorative) */}
      <FloatingOrbs />

      <Container size="2xl" className="relative z-10">
        {/* ─── Editorial header ───────────────────────────────────── */}
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <Eyebrow>Capítulo V · Mensagem do fundador</Eyebrow>
          </Reveal>

          <Reveal delay={0.1}>
            <h2
              className="
                mt-7 font-display font-light text-gradient-cinematic
                text-[clamp(2.5rem,1.9rem+3.5vw,5.25rem)]
                leading-[1] tracking-[-0.038em]
              "
            >
              A pergunta que deu origem{" "}
              <em className="font-display italic text-ivory-100">
                à We Make.
              </em>
            </h2>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mx-auto mt-7 max-w-2xl text-balance text-[1.0625rem] sm:text-lg leading-[1.55] text-foreground/70">
              Uma conversa sobre tecnologia, formação humana e o futuro das
              escolas cristãs — vista a partir da cosmovisão reformada.
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-7 inline-flex items-center gap-3">
              <span
                aria-hidden
                className="h-px w-10 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.26em] text-foreground/55">
                {speakerLine}
              </span>
              <span
                aria-hidden
                className="h-px w-10 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
          </Reveal>
        </div>

        {/* ─── Player ─────────────────────────────────────────────── */}
        <Reveal delay={0.35}>
          <div className="relative mx-auto mt-20 max-w-[78rem]">
            {/* Underglow — sits behind the player and warms on hover */}
            <div
              aria-hidden
              className="
                absolute -inset-x-6 -bottom-10 -top-10 -z-10 rounded-[3rem]
                bg-[radial-gradient(60%_60%_at_50%_50%,rgba(96,165,250,0.18)_0%,transparent_70%)]
                blur-3xl
              "
            />

            <CeoCinematicPlayer
              ref={playerRef}
              src={siteConfig.ceo.videoFull}
              poster={siteConfig.ceo.videoPoster}
              captions={siteConfig.ceo.videoCaption}
              talkTitle={siteConfig.ceo.talkTitle}
              speakerLine={speakerLine}
              durationLabel={siteConfig.ceo.duration}
              softAutoplay
            />
          </div>
        </Reveal>

        {/* ─── Talk chapters (TED-style index) + speaker card ─────── */}
        <div className="mt-20 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Chapter index */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-foreground/55">
                  Capítulos da conversa
                </span>
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-foreground/35">
                  Clique para saltar
                </span>
              </div>
            </Reveal>

            <Stagger
              delayChildren={0.05}
              staggerChildren={0.06}
              className="mt-6 divide-y divide-white/10 border-y border-white/10"
            >
              {siteConfig.ceo.talkChapters.map((chapter, i) => {
                const isActive = activeChapter === i;
                return (
                  <motion.button
                    key={`${chapter.time}-${chapter.label}`}
                    type="button"
                    variants={fadeUp}
                    onClick={() => jumpTo(i, chapter.seconds, chapter.label)}
                    className={cn(
                      "group grid w-full grid-cols-[auto_auto_1fr_auto] items-center gap-4 py-4 text-left",
                      "transition-colors duration-300",
                      isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground",
                    )}
                  >
                    <span className="font-mono text-[0.75rem] tabular-nums tracking-[0.2em] text-foreground/40 w-8">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-xs tabular-nums",
                        isActive ? "text-glow-cyan" : "text-foreground/55 group-hover:text-glow-cyan/80",
                      )}
                    >
                      {chapter.time}
                    </span>
                    <span className="font-display text-[1.0625rem] tracking-[-0.015em]">
                      {chapter.label}
                    </span>
                    <span
                      className={cn(
                        "inline-flex size-8 items-center justify-center rounded-full transition-all duration-300",
                        isActive
                          ? "border border-glow-cyan/40 bg-glow-cyan/15 text-glow-cyan"
                          : "border border-white/10 bg-white/[0.03] text-foreground/60 group-hover:border-white/25 group-hover:text-foreground",
                      )}
                    >
                      <Play className="size-3 translate-x-[1px] fill-current" aria-hidden />
                    </span>
                  </motion.button>
                );
              })}
            </Stagger>
          </div>

          {/* Speaker card */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <SpeakerCard live={playerLive} />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Three slow-drifting orbs that float across the section.
 * Pure CSS animation — GPU-cheap, hidden under reduced-motion via Particles' guard.
 */
function FloatingOrbs() {
  const orbs = [
    { tone: "rgba(96,165,250,0.18)", size: 280, left: "8%",  top: "18%", delay: "0s",   duration: "26s" },
    { tone: "rgba(139,92,246,0.16)", size: 360, left: "78%", top: "30%", delay: "-7s",  duration: "32s" },
    { tone: "rgba(59,130,246,0.14)", size: 200, left: "44%", top: "78%", delay: "-12s", duration: "28s" },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden motion-reduce:hidden">
      {orbs.map((orb, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: orb.left,
            top: orb.top,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(closest-side, ${orb.tone} 0%, transparent 75%)`,
            filter: "blur(40px)",
            animation: `orb-drift ${orb.duration} ease-in-out ${orb.delay} infinite alternate`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes orb-drift {
          0%   { transform: translate3d(0, 0, 0) scale(1); }
          50%  { transform: translate3d(-30px, 24px, 0) scale(1.08); }
          100% { transform: translate3d(28px, -22px, 0) scale(0.96); }
        }
      `}</style>
    </div>
  );
}
