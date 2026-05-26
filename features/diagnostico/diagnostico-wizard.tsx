"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { AlertCircle, Clock } from "lucide-react";

/**
 * Stub do Wizard — a implementação real (8 blocos, validação Zod por etapa,
 * progress bar, submit pra /api/diagnostico) vem no Passo 3.
 */
export function DiagnosticoWizard() {
  return (
    <Section
      id="diagnostico-form"
      bleed
      className="py-16 sm:py-24 bg-[rgb(var(--color-brand-royal-deep))] relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgb(var(--color-brand-mint))]/10 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto bg-white rounded-[1.75rem] sm:rounded-[2rem] p-6 sm:p-10 shadow-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--color-brand-mint))]/15 text-[rgb(var(--color-brand-mint-deep))] font-bold text-sm mb-5">
              <Clock className="size-4" />
              EM PREPARAÇÃO
            </div>
            <h2 className="font-display text-[rgb(var(--color-brand-navy))] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] mb-4 text-balance">
              Wizard de Diagnóstico
            </h2>
            <p className="text-[rgb(var(--color-brand-navy))]/70 text-[1.0625rem] leading-relaxed mb-6">
              Em breve, este espaço terá o formulário de diagnóstico estruturado em 8 blocos:
              identificação, momento atual, visão, currículo, cosmovisão cristã, professores,
              infraestrutura e dores principais.
            </p>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-left mb-6">
              <AlertCircle className="size-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-amber-900 text-sm leading-relaxed">
                Esta página está em construção. O formulário de diagnóstico será publicado no
                próximo passo do projeto.
              </p>
            </div>

            <a
              href="/"
              className="inline-flex items-center justify-center h-12 px-6 rounded-full border-2 border-[rgb(var(--color-brand-navy))]/15 text-[rgb(var(--color-brand-navy))] font-semibold text-[0.9375rem] hover:bg-[rgb(var(--color-brand-navy))]/5 transition-colors"
            >
              Voltar para a página principal
            </a>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
