"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Glow } from "@/components/ui/glow";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/motion";

type Frame = {
  id: string;
  caption: string;
  detail: string;
  ratio: "portrait" | "landscape" | "square" | "tall";
  tone: "blue" | "violet" | "amber" | "cyan";
  motif: "kids" | "code" | "prayer" | "human" | "maker" | "formation";
};

/**
 * Editorial gallery — abstract motif tiles arranged in a magazine grid.
 * Each tile carries a caption and a thematic motif rendered as SVG.
 * When real photography is available, replace the inline <Motif /> with <Image />.
 */
const frames: Frame[] = [
  { id: "1", caption: "Crianças aprendendo a pensar", detail: "Educação Infantil · Roteiros de descoberta", ratio: "portrait", tone: "cyan", motif: "kids" },
  { id: "2", caption: "Adolescentes programando", detail: "Ensino Médio · Trilhas de criação", ratio: "landscape", tone: "blue", motif: "code" },
  { id: "3", caption: "Oração", detail: "Antes da técnica, a contemplação", ratio: "square", tone: "amber", motif: "prayer" },
  { id: "4", caption: "Ambientes maker", detail: "Espaços que ensinam a fazer", ratio: "landscape", tone: "violet", motif: "maker" },
  { id: "5", caption: "Interação humana", detail: "Tecnologia que não substitui o encontro", ratio: "portrait", tone: "cyan", motif: "human" },
  { id: "6", caption: "Formação integral", detail: "Educadores que pensam antes de ensinar", ratio: "tall", tone: "blue", motif: "formation" },
];

const ratioMap = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  tall: "aspect-[3/5]",
} as const;

const toneMap = {
  cyan: { from: "from-ink-700/60", to: "to-glow-cyan/15" },
  blue: { from: "from-ink-800/60", to: "to-glow-blue/18" },
  violet: { from: "from-ink-800/60", to: "to-glow-violet/20" },
  amber: { from: "from-ink-800/60", to: "to-glow-amber/18" },
} as const;

/**
 * Ato VIII — Galeria humana.
 * Frames temáticos: crianças, adolescentes, oração, interação, ambientes maker, formação.
 */
export function Gallery() {
  return (
    <Section id="galeria" bleed>
      <Glow color="amber" size="xl" intensity={0.12} className="left-1/2 -translate-x-1/2 top-0" />

      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Capítulo VIII · Galeria humana</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display font-light text-gradient-cinematic text-[clamp(2.25rem,1.8rem+2.4vw,3.5rem)] leading-[1.05] tracking-[-0.03em]">
              Por trás da tecnologia,{" "}
              <em className="font-display italic text-ivory-100">sempre uma pessoa.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-prose text-[1rem] leading-[1.65] text-foreground/65">
              Aprender é, antes de tudo, uma cena humana. Estes são alguns dos
              momentos que nos lembram, todos os dias, do porquê deste trabalho.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {frames.map((frame, i) => (
            <Parallax
              key={frame.id}
              distance={i % 2 === 0 ? -40 : -60}
              className={cn(
                i === 1 && "lg:row-span-2",
                i === 5 && "lg:row-span-2",
              )}
            >
              <motion.figure
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                className={cn(
                  "group relative overflow-hidden rounded-[1.75rem]",
                  "border border-white/10",
                  "bg-gradient-to-br shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]",
                  toneMap[frame.tone].from,
                  toneMap[frame.tone].to,
                  ratioMap[frame.ratio],
                )}
              >
                <Motif motif={frame.motif} />

                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent"
                />

                <figcaption className="absolute inset-x-0 bottom-0 p-6">
                  <div className="font-display text-[clamp(1.05rem,0.95rem+0.4vw,1.35rem)] leading-tight">
                    {frame.caption}
                  </div>
                  <div className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-foreground/55">
                    {frame.detail}
                  </div>
                </figcaption>
              </motion.figure>
            </Parallax>
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="mt-12 mx-auto max-w-2xl text-center font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-foreground/40">
            Imagens conceituais · Substituídas por fotografia institucional
            na implementação final
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ─── Abstract motifs (placeholder até a fotografia entrar) ──────── */
function Motif({ motif }: { motif: Frame["motif"] }) {
  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      aria-hidden
    >
      <defs>
        <linearGradient id={`g-${motif}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
        </linearGradient>
      </defs>

      {/* shared atmospheric circles */}
      <circle cx="80" cy="80" r="180" fill={`url(#g-${motif})`} opacity="0.6" />
      <circle cx="340" cy="380" r="120" fill={`url(#g-${motif})`} opacity="0.4" />

      {motif === "kids" && (
        <>
          {/* three rising figures */}
          <g stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" fill="none">
            <circle cx="120" cy="220" r="22" />
            <path d="M 120 245 L 120 320 M 100 290 L 140 290 M 110 360 L 120 320 L 130 360" strokeLinecap="round" />
            <circle cx="200" cy="200" r="26" />
            <path d="M 200 230 L 200 320 M 175 285 L 225 285 M 188 365 L 200 320 L 212 365" strokeLinecap="round" />
            <circle cx="280" cy="220" r="22" />
            <path d="M 280 245 L 280 320 M 260 290 L 300 290 M 270 360 L 280 320 L 290 360" strokeLinecap="round" />
          </g>
        </>
      )}
      {motif === "code" && (
        <g fontFamily="monospace" fontSize="13" fill="rgba(255,255,255,0.5)">
          <text x="40" y="120">const formar = () =&gt; {"{"}</text>
          <text x="64" y="148">verdade,</text>
          <text x="64" y="172">beleza,</text>
          <text x="64" y="196">bondade,</text>
          <text x="64" y="220">mandato,</text>
          <text x="40" y="244">{"}"};</text>
          <text x="40" y="296" opacity="0.5">// cultivar o mundo</text>
        </g>
      )}
      {motif === "prayer" && (
        <g stroke="rgba(255,255,255,0.42)" strokeWidth="1.4" fill="none" strokeLinecap="round">
          <circle cx="200" cy="180" r="34" />
          <path d="M 175 260 Q 200 220 225 260 L 225 320 L 175 320 Z" />
          <path d="M 195 280 L 195 320 M 205 280 L 205 320" />
          <path d="M 200 60 L 200 110 M 175 85 L 225 85" opacity="0.7" />
        </g>
      )}
      {motif === "maker" && (
        <g stroke="rgba(255,255,255,0.38)" strokeWidth="1.2" fill="none">
          <rect x="80" y="160" width="240" height="140" rx="6" />
          <line x1="80" y1="200" x2="320" y2="200" />
          <circle cx="120" cy="170" r="3" fill="rgba(96,165,250,0.85)" stroke="none" />
          <circle cx="135" cy="170" r="3" fill="rgba(255,255,255,0.4)" stroke="none" />
          <path d="M 100 250 L 140 220 L 180 240 L 220 210 L 260 235 L 300 220" strokeLinecap="round" />
          <circle cx="180" cy="380" r="20" />
          <path d="M 160 380 L 200 380 M 180 360 L 180 400" strokeLinecap="round" />
        </g>
      )}
      {motif === "human" && (
        <g stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" fill="none" strokeLinecap="round">
          <circle cx="140" cy="200" r="24" />
          <path d="M 140 226 L 140 320 M 110 280 L 170 280 M 122 380 L 140 320 L 158 380" />
          <circle cx="260" cy="200" r="24" />
          <path d="M 260 226 L 260 320 M 230 280 L 290 280 M 242 380 L 260 320 L 278 380" />
          <path d="M 170 280 C 200 260 200 260 230 280" opacity="0.7" />
        </g>
      )}
      {motif === "formation" && (
        <g stroke="rgba(255,255,255,0.38)" strokeWidth="1.3" fill="none">
          <circle cx="200" cy="160" r="28" />
          <path d="M 200 192 L 200 290 M 170 235 L 230 235 M 178 350 L 200 290 L 222 350" strokeLinecap="round" />
          <rect x="120" y="380" width="160" height="40" rx="3" />
          <line x1="140" y1="395" x2="260" y2="395" opacity="0.6" />
          <line x1="140" y1="405" x2="220" y2="405" opacity="0.6" />
        </g>
      )}
    </svg>
  );
}
