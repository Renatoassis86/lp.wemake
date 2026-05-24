"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Glow } from "@/components/ui/glow";
import { Reveal } from "@/components/motion/reveal";
import { statePresence } from "@/data/states";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

/**
 * Ato VII — Presença Nacional.
 *
 * Mapa estilizado do Brasil renderizado como rede:
 *   - silhueta abstrata em traço fino
 *   - nó pulsante por estado com presença
 *   - estados de destaque conectados por linhas sutis
 *   - lista lateral com contagem por UF
 *
 * Não pretende ser cartograficamente preciso — é uma visualização editorial.
 */
export function PresenceMap() {
  const [active, setActive] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const activeState = statePresence.find((s) => s.uf === active);

  const highlights = statePresence.filter((s) => s.highlight);

  return (
    <Section id="presenca" bleed>
      <Glow color="cyan" size="xl" intensity={0.2} className="-right-40 top-1/3" />
      <Glow color="violet" size="xl" intensity={0.16} className="-left-40 bottom-0" />

      <Container>
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Capítulo VII · Presença nacional</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display font-light text-gradient-cinematic text-[clamp(2.25rem,1.8rem+2.6vw,3.75rem)] leading-[1.05] tracking-[-0.03em]">
                Um movimento que atravessa o Brasil.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-prose text-[1rem] leading-[1.65] text-foreground/65">
                Escolas confessionais de diferentes tradições — presbiteriana,
                batista, adventista, luterana, anglicana, metodista, reformada —
                têm escolhido a We Make como interlocutora institucional.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.2}>
              <PresenceStats />
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-20 grid lg:grid-cols-12 gap-10">
            {/* Map */}
            <div
              className="
                lg:col-span-8 relative overflow-hidden
                rounded-[2rem] border border-white/10
                bg-gradient-to-br from-ink-900 via-ink-950 to-ink-950
                p-6 sm:p-10
                shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]
                min-h-[480px]
              "
            >
              <svg
                viewBox="0 0 1000 1100"
                className="size-full"
                role="img"
                aria-label="Mapa estilizado do Brasil com estados parceiros da We Make"
              >
                {/* Stylized Brazil silhouette (simplified) */}
                <BrazilSilhouette />

                {/* Connection lines between highlight states */}
                {!reduced && (
                  <g stroke="rgba(96,165,250,0.18)" strokeWidth="0.7" fill="none">
                    {highlights.flatMap((a, i) =>
                      highlights.slice(i + 1, i + 3).map((b) => (
                        <line
                          key={`${a.uf}-${b.uf}`}
                          x1={a.x}
                          y1={a.y}
                          x2={b.x}
                          y2={b.y}
                          strokeDasharray="3 4"
                        />
                      )),
                    )}
                  </g>
                )}

                {/* State nodes */}
                {statePresence.map((state, i) => {
                  const isActive = active === state.uf;
                  const isHighlight = !!state.highlight;
                  const radius = state.partners > 0
                    ? Math.max(6, Math.min(22, 5 + Math.log2(state.partners + 1) * 4))
                    : 4;

                  return (
                    <g
                      key={state.uf}
                      onMouseEnter={() => setActive(state.uf)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(state.uf)}
                      onBlur={() => setActive(null)}
                      tabIndex={0}
                      role="button"
                      aria-label={`${state.name} — ${state.partners > 0 ? "estado ativo" : "expansão prevista"}`}
                      className="cursor-pointer focus:outline-none"
                    >
                      {/* outer pulse */}
                      {isHighlight && !reduced && (
                        <motion.circle
                          cx={state.x}
                          cy={state.y}
                          r={radius}
                          fill="rgba(96,165,250,0.18)"
                          initial={{ scale: 1, opacity: 0.7 }}
                          animate={{ scale: 2.4, opacity: 0 }}
                          transition={{
                            duration: 2.8,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: i * 0.18,
                          }}
                          style={{ transformOrigin: `${state.x}px ${state.y}px` }}
                        />
                      )}

                      <circle
                        cx={state.x}
                        cy={state.y}
                        r={radius}
                        fill={state.partners > 0 ? "rgb(96,165,250)" : "rgba(255,255,255,0.18)"}
                        opacity={isActive ? 1 : isHighlight ? 0.95 : state.partners > 0 ? 0.75 : 0.45}
                        style={{
                          filter:
                            state.partners > 0
                              ? "drop-shadow(0 0 10px rgba(96,165,250,0.7))"
                              : "none",
                          transition: "opacity 220ms",
                        }}
                      />
                      <circle
                        cx={state.x}
                        cy={state.y}
                        r={radius + 4}
                        fill="transparent"
                        stroke={isActive ? "rgba(255,255,255,0.6)" : "transparent"}
                        strokeWidth="1.2"
                      />
                      <text
                        x={state.x}
                        y={state.y - radius - 8}
                        textAnchor="middle"
                        className="pointer-events-none select-none"
                        fontFamily="ui-monospace, monospace"
                        fontSize="14"
                        fill={isActive ? "rgb(255,255,255)" : "rgba(255,255,255,0.55)"}
                        opacity={isActive || isHighlight ? 1 : 0.65}
                      >
                        {state.uf}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Floating detail card */}
              {activeState && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="
                    pointer-events-none absolute bottom-6 left-6
                    rounded-2xl border border-white/15 bg-ink-900/80 backdrop-blur-xl
                    px-5 py-4
                    shadow-[0_24px_48px_-16px_rgba(0,0,0,0.7)]
                  "
                >
                  <div className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-glow-cyan">
                    {activeState.uf} · {activeState.name}
                  </div>
                  <div className="mt-1 font-display text-xl">
                    {activeState.partners > 0 ? "Estado ativo" : "Em expansão"}
                  </div>
                  <div className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-foreground/45">
                    {activeState.partners > 0
                      ? "Escolas em parceria · We Make"
                      : "Próxima onda · campanha 2026"}
                  </div>
                </motion.div>
              )}
            </div>

            {/* State list */}
            <div className="lg:col-span-4">
              <div
                className="
                  rounded-[2rem] border border-white/10
                  bg-white/[0.025]
                  p-6 sm:p-8
                  h-full
                "
              >
                <div className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-foreground/45">
                  Estados com presença ativa
                </div>
                <ul className="mt-5 space-y-2 max-h-[420px] overflow-y-auto pr-1">
                  {statePresence
                    .filter((s) => s.partners > 0)
                    .sort((a, b) => b.partners - a.partners)
                    .map((state) => (
                      <li
                        key={state.uf}
                        onMouseEnter={() => setActive(state.uf)}
                        onMouseLeave={() => setActive(null)}
                        className={cn(
                          "flex items-center justify-between gap-3 px-3 py-2 rounded-xl",
                          "transition-colors duration-200",
                          active === state.uf
                            ? "bg-white/[0.06]"
                            : "hover:bg-white/[0.03]",
                        )}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-mono text-[0.6875rem] tracking-[0.18em] text-glow-cyan w-8">
                            {state.uf}
                          </span>
                          <span className="truncate text-sm text-foreground/80">
                            {state.name}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-glow-cyan">
                          <span className="size-1.5 rounded-full bg-glow-cyan shadow-[0_0_8px_rgba(96,165,250,0.7)]" />
                          ativo
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function PresenceStats() {
  const stats = [
    { label: "cobertura atual",       value: "NACIONAL" },
    { label: "expansão prevista",     value: "20 cidades" },
    { label: "parcerias iniciam em",  value: "JAN 2027" },
    { label: "disponibilidade",       value: "VAGAS LIMITADAS" },
  ];
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
      {stats.map((s) => (
        <div key={s.label} className="bg-ink-900 px-5 py-6">
          <dt className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-foreground/45">
            {s.label}
          </dt>
          <dd className="mt-2 font-display text-3xl tracking-[-0.02em] text-gradient-cinematic">
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Highly simplified silhouette of Brazil rendered as a single closed path.
 * Visual reference only — not a geographically accurate boundary.
 */
function BrazilSilhouette() {
  return (
    <path
      d="
        M 320 140
        Q 380 110 460 130
        Q 540 110 600 150
        Q 660 130 700 180
        Q 760 200 820 280
        Q 880 360 870 460
        Q 880 560 820 640
        Q 800 740 740 800
        Q 700 880 620 940
        Q 560 1010 480 1040
        Q 430 1030 410 970
        Q 360 920 340 850
        Q 280 800 260 720
        Q 220 640 240 540
        Q 200 460 220 380
        Q 240 280 280 220
        Q 290 170 320 140 Z
      "
      fill="rgba(96,165,250,0.04)"
      stroke="rgba(255,255,255,0.16)"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  );
}
