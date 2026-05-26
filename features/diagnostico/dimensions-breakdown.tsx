"use client";

import { motion } from "framer-motion";
import { Compass, Heart, BookMarked, Wrench, Building2 } from "lucide-react";
import type { DimensionResult, DimensionKey } from "@/lib/maturidade-stages";

const ICON_BY_KEY: Record<DimensionKey, React.ComponentType<{ className?: string }>> = {
  visao_cosmovisao: Compass,
  carater_discernimento: Heart,
  curriculo_progressao: BookMarked,
  pratica_maker: Wrench,
  gestao_estrutura: Building2,
};

const COLOR_MAP = {
  orange: "rgb(255, 144, 80)",
  sky: "rgb(var(--color-brand-sky))",
  royal: "rgb(var(--color-brand-royal))",
  mint: "rgb(var(--color-brand-mint))",
} as const;

/**
 * Breakdown analítico das 5 dimensões do diagnóstico.
 * Renderiza um card por dimensão com score, nível e barra colorida.
 */
export function DimensionsBreakdown({ dimensions }: { dimensions: DimensionResult[] }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-mint))]/90 mb-3 font-bold">
          Análise detalhada
        </p>
        <h2 className="font-display text-white text-[clamp(1.5rem,2.5vw,2.25rem)] leading-[1.15] mb-3 text-balance">
          Desempenho por dimensão
        </h2>
        <p className="text-white/70 text-[0.9375rem] sm:text-[1rem] leading-relaxed max-w-xl mx-auto">
          O ebook avalia cinco dimensões da educação tecnológica cristã. Veja onde sua
          escola é forte e onde há mais espaço para amadurecer.
        </p>
      </div>

      <div className="space-y-3">
        {dimensions.map((d, i) => (
          <DimensionCard key={d.dimension.key} result={d} delay={i * 0.08} />
        ))}
      </div>
    </div>
  );
}

function DimensionCard({ result, delay }: { result: DimensionResult; delay: number }) {
  const { dimension, score, level } = result;
  const Icon = ICON_BY_KEY[dimension.key];
  const accent = COLOR_MAP[level.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg"
    >
      <div className="flex items-start gap-4">
        {/* Ícone */}
        <div
          className="size-11 sm:size-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
          style={{ background: accent }}
        >
          <Icon className="size-5 sm:size-6 text-white" />
        </div>

        {/* Corpo */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-gray-400 font-bold">
              Dimensão {dimension.number}
            </p>
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-md text-[0.6875rem] font-bold tracking-wide uppercase text-white"
              style={{ background: accent }}
            >
              {level.label}
            </span>
          </div>

          <h3 className="font-display text-[rgb(var(--color-brand-navy))] text-[1.0625rem] sm:text-[1.1875rem] leading-tight mb-2">
            {dimension.name}
          </h3>

          <p className="text-[rgb(var(--color-brand-navy))]/70 text-[0.875rem] sm:text-[0.9375rem] leading-snug mb-3">
            {dimension.description}
          </p>

          {/* Score + barra */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 0.9, delay: delay + 0.2, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: accent }}
              />
              {/* Marcadores 25/50/75 */}
              {[25, 50, 75].map((m) => (
                <div
                  key={m}
                  className="absolute top-0 bottom-0 w-px bg-white/80"
                  style={{ left: `${m}%` }}
                />
              ))}
            </div>
            <span
              className="font-display text-[1.125rem] sm:text-[1.25rem] font-bold tabular-nums shrink-0"
              style={{ color: accent }}
            >
              {score}%
            </span>
          </div>

          {/* Blurb interpretativa do nível */}
          <p className="text-[rgb(var(--color-brand-navy))]/60 text-[0.8125rem] leading-snug mt-3 italic">
            {level.blurb}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
