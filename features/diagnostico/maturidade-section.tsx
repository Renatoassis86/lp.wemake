"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MaturidadeHero } from "@/features/diagnostico/maturidade-hero";
import { MaturidadeWizard } from "@/features/diagnostico/maturidade-wizard";
import { ObrigadoMaturidadeHero } from "@/features/diagnostico/obrigado-maturidade-hero";
import { getStageBySlug, type MaturidadeResult } from "@/lib/maturidade-stages";

/**
 * Seção de Diagnóstico de Maturidade — ÚNICO local que existe no site.
 * Renderizada inline na landing principal. Três fases internas:
 *  1. "intro"  → MaturidadeHero (apresentação + CTA "Iniciar diagnóstico")
 *  2. "wizard" → MaturidadeWizard de 8 etapas com progress
 *  3. "result" → ObrigadoMaturidadeHero (StageCard global + Breakdown
 *                por dimensão + CTAs)
 *
 * Tudo no mesmo scroll — usuário começa, responde e vê o diagnóstico
 * sem mudar de página.
 */
export function MaturidadeSection() {
  const [phase, setPhase] = useState<"intro" | "wizard" | "result">("intro");
  const [result, setResult] = useState<MaturidadeResult | null>(null);

  const handleStart = () => {
    setPhase("wizard");
    // Pequeno delay pra mostrar o wizard com transição visível
    setTimeout(() => {
      document.getElementById("maturidade-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const handleComplete = (r: MaturidadeResult) => {
    setResult(r);
    setPhase("result");
    setTimeout(() => {
      document.getElementById("maturidade-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const stage = result ? getStageBySlug(result.stageSlug) : null;

  return (
    <section id="maturidade-section" className="relative">
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <MaturidadeHero onStart={handleStart} />
          </motion.div>
        )}

        {phase === "wizard" && (
          <motion.div
            key="wizard"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >
            <MaturidadeWizard onComplete={handleComplete} />
          </motion.div>
        )}

        {phase === "result" && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ObrigadoMaturidadeHero
              nome={result.nome}
              stage={stage}
              score={result.globalScore}
              dimensions={result.dimensions}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
