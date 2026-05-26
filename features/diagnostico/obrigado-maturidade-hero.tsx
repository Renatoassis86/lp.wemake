"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Download,
  MessageCircle,
  Sparkles,
  CalendarDays,
  ArrowRight,
  Trophy,
  Compass,
  Map,
  Rocket,
  Award,
  Crown,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { EBOOK_COMPLETO_PDF, EBOOK_COMPLETO_FILENAME, WHATSAPP_VIP_LINK } from "@/constants/ebooks";
import type { Stage, DimensionResult } from "@/lib/maturidade-stages";
import { DimensionsBreakdown } from "@/features/diagnostico/dimensions-breakdown";

const STAGE_ICONS = {
  1: Compass, // descoberta
  2: Map,     // primeiros passos
  3: Rocket,  // estruturação
  4: Award,   // consolidação
  5: Crown,   // excelência
} as const;

/**
 * Tela de obrigado APÓS o diagnóstico de maturidade.
 * Mostra o estágio (1-5) calculado + ebook completo + WhatsApp + consultor.
 */
export function ObrigadoMaturidadeHero({
  nome,
  stage,
  score,
  dimensions,
}: {
  nome: string;
  stage: Stage | null;
  score: number;
  dimensions?: DimensionResult[] | null;
}) {
  const primeiroNome = nome ? `, ${nome}` : "";

  return (
    <Section
      bleed
      className="relative pt-[7rem] sm:pt-[10rem] md:pt-[11rem] pb-16 sm:pb-24 lg:pb-28 bg-[rgb(var(--color-brand-royal-deep))] overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[rgb(var(--color-brand-mint))]/15 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[rgb(var(--color-brand-sky))]/15 blur-[120px] rounded-full" />
      </div>

      <Container className="relative z-10">
        {/* Cabeçalho de boas-vindas */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <Reveal>
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center justify-center size-20 sm:size-24 rounded-full bg-[rgb(var(--color-brand-mint))]/20 border-2 border-[rgb(var(--color-brand-mint))]/40 mb-6"
            >
              <CheckCircle2 className="size-10 sm:size-12 text-[rgb(var(--color-brand-mint))]" />
            </motion.div>

            <p className="font-mono text-[0.75rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-mint))]/90 mb-3 font-bold">
              Diagnóstico concluído
            </p>
            <h1 className="font-display text-white text-[clamp(2rem,4vw+1rem,3.75rem)] leading-[1.05] mb-5 text-balance">
              Obrigado pela sua dedicação{primeiroNome}!
            </h1>
            <p className="text-white/85 text-[1.0625rem] sm:text-[1.1875rem] leading-relaxed max-w-2xl mx-auto">
              Suas respostas foram analisadas. Veja abaixo o estágio em que sua escola se
              encontra e os próximos passos sugeridos.
            </p>
          </Reveal>
        </div>

        {/* CARD DO ESTÁGIO — peça central */}
        {stage && (
          <Reveal delay={0.1}>
            <StageCard stage={stage} score={score} />
          </Reveal>
        )}

        {/* BREAKDOWN POR DIMENSÃO — análise detalhada */}
        {dimensions && (
          <Reveal delay={0.15}>
            <div className="mt-10 sm:mt-12">
              <DimensionsBreakdown dimensions={dimensions} />
            </div>
          </Reveal>
        )}

        {/* Card download do ebook completo */}
        <Reveal delay={0.2}>
          <div className="max-w-2xl mx-auto mb-6 mt-10">
            <a
              href={EBOOK_COMPLETO_PDF}
              download={EBOOK_COMPLETO_FILENAME}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 p-6 sm:p-7 rounded-2xl bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))] font-bold shadow-2xl hover:shadow-[0_16px_48px_-12px_rgba(118,243,205,0.6)] hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="size-12 sm:size-14 rounded-xl bg-[rgb(var(--color-brand-navy))]/10 flex items-center justify-center shrink-0">
                  <Download className="size-6 sm:size-7" />
                </div>
                <div className="text-left">
                  <div className="text-[1rem] sm:text-[1.125rem] font-bold leading-tight">
                    Baixar o ebook completo (PDF)
                  </div>
                  <div className="text-[0.8125rem] sm:text-sm opacity-80 font-medium mt-0.5">
                    Versão sem desfoque · acesso total liberado
                  </div>
                </div>
              </div>
              <ArrowRight className="size-5 sm:size-6 shrink-0 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </Reveal>

        {/* Faixa VIP WhatsApp */}
        <Reveal delay={0.25}>
          <div className="max-w-2xl mx-auto mb-12">
            <a
              href={WHATSAPP_VIP_LINK}
              target="_blank"
              rel="noreferrer"
              className="group relative flex items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#25D366]/15 to-[#25D366]/5 border-2 border-[#25D366]/40 hover:border-[#25D366]/70 hover:-translate-y-0.5 transition-all backdrop-blur-sm shadow-lg"
            >
              <div aria-hidden className="absolute inset-0 bg-[#25D366]/15 blur-2xl rounded-2xl animate-pulse pointer-events-none -z-10" />
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="size-12 sm:size-14 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0 shadow-md">
                  <MessageCircle className="size-6 sm:size-7 text-white" fill="white" />
                </div>
                <div className="text-left min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-[#25D366] text-white text-[0.625rem] font-bold tracking-wider uppercase">
                      VIP
                    </span>
                    <div className="text-white text-[1rem] sm:text-[1.0625rem] font-bold leading-tight">
                      Entre no grupo de líderes
                    </div>
                  </div>
                  <div className="text-white/75 text-[0.8125rem] sm:text-sm leading-snug">
                    Networking com diretores, materiais exclusivos e atualizações em primeira mão.
                  </div>
                </div>
              </div>
              <ArrowRight className="size-5 shrink-0 text-[#25D366] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </Reveal>

        {/* CTA Falar com consultor */}
        <Reveal delay={0.3}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="font-display text-white text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.15] text-balance">
                Quer transformar este diagnóstico em um plano real?
              </h2>
              <p className="text-white/70 text-[0.9375rem] sm:text-[1rem] leading-relaxed mt-3 max-w-xl mx-auto">
                Agende uma conversa direta com nosso time. A partir do estágio que você está,
                vamos pensar os próximos passos com você.
              </p>
            </div>
            <div className="flex justify-center">
              <a
                href="/#reuniao"
                className="group relative inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))] font-bold text-[1.0625rem] tracking-tight hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_rgba(118,243,205,0.6)] transition-all duration-300 shadow-[0_8px_28px_-6px_rgba(118,243,205,0.45)] ring-1 ring-[rgb(var(--color-brand-mint))]/40"
              >
                <CalendarDays className="size-5" />
                Falar com consultor
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="max-w-2xl mx-auto mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm">
              <Sparkles className="size-4 text-[rgb(var(--color-brand-mint))]" />
              Uma cópia do diagnóstico foi enviada para o seu e-mail.
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ─── Card do estágio (1-5) — peça central da página ─── */
function StageCard({ stage, score }: { stage: Stage; score: number }) {
  const Icon = STAGE_ICONS[stage.number];
  const [imgOk, setImgOk] = useState(true);

  const accentColor = {
    mint: "rgb(var(--color-brand-mint))",
    sky: "rgb(var(--color-brand-sky))",
    royal: "rgb(var(--color-brand-royal))",
    orange: "rgb(255, 144, 80)",
    navy: "rgb(var(--color-brand-navy))",
  }[stage.color];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative rounded-[2rem] bg-white shadow-2xl overflow-hidden"
      >
        {/* Faixa colorida superior */}
        <div
          className="h-2"
          style={{
            background: `linear-gradient(90deg, ${accentColor}, rgb(var(--color-brand-mint)))`,
          }}
        />

        {/* IMAGEM ILUSTRATIVA do estágio (gerada por IA) */}
        {imgOk && (
          <div className="relative w-full aspect-[16/7] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={stage.image}
              alt={`Ilustração do ${stage.name}`}
              className="w-full h-full object-cover"
              onError={() => setImgOk(false)}
            />
            {/* Overlay sutil pra integrar com o card */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(180deg, transparent 60%, ${accentColor}15 100%)`,
              }}
            />
          </div>
        )}

        <div className="p-7 sm:p-10">
          {/* Header do card */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div
                className="size-14 sm:size-16 rounded-2xl flex items-center justify-center shrink-0 shadow-md"
                style={{ background: accentColor }}
              >
                <Icon className="size-7 sm:size-8 text-white" />
              </div>
              <div>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-gray-500 mb-1 font-bold">
                  Sua escola está no
                </p>
                <h2 className="font-display text-[rgb(var(--color-brand-navy))] text-[1.5rem] sm:text-[1.875rem] leading-[1.1]">
                  {stage.name}
                </h2>
              </div>
            </div>

            {/* Score badge */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="font-display text-[2rem] sm:text-[2.5rem] leading-none text-[rgb(var(--color-brand-navy))] font-bold">
                  {score}%
                </div>
                <div className="text-[0.6875rem] text-gray-500 uppercase tracking-wide mt-0.5">
                  Score
                </div>
              </div>
              <Trophy className="size-7 sm:size-8 text-[rgb(var(--color-brand-mint-deep))]" />
            </div>
          </div>

          {/* Progress bar dos 5 estágios */}
          <div className="mb-7">
            <div className="flex items-center justify-between mb-2 text-[0.6875rem] text-gray-500 font-medium">
              <span>Descoberta</span>
              <span>Excelência</span>
            </div>
            <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${accentColor}, rgb(var(--color-brand-mint)))`,
                }}
              />
              {/* Marcadores de estágio */}
              {[20, 40, 60, 80].map((m) => (
                <div
                  key={m}
                  className="absolute top-0 bottom-0 w-px bg-white/70"
                  style={{ left: `${m}%` }}
                />
              ))}
            </div>
          </div>

          {/* Tagline */}
          <p
            className="font-display text-[1.125rem] sm:text-[1.25rem] leading-snug mb-4"
            style={{ color: accentColor }}
          >
            {stage.tagline}
          </p>

          {/* Descrição */}
          <p className="text-[rgb(var(--color-brand-navy))]/85 text-[1rem] sm:text-[1.0625rem] leading-relaxed mb-7">
            {stage.description}
          </p>

          {/* Recomendações */}
          <div className="mb-7">
            <h3 className="font-display text-[rgb(var(--color-brand-navy))] text-[1.125rem] mb-4">
              Recomendações para os próximos passos
            </h3>
            <ul className="space-y-2.5">
              {stage.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-3 text-[rgb(var(--color-brand-navy))]/85 text-[0.9375rem] sm:text-[1rem] leading-snug">
                  <CheckCircle2
                    className="size-5 shrink-0 mt-0.5"
                    style={{ color: accentColor }}
                  />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Next step (callout) */}
          <div
            className="rounded-xl p-4 sm:p-5 border-2 text-[0.9375rem] leading-relaxed text-[rgb(var(--color-brand-navy))]/90"
            style={{
              backgroundColor: `${accentColor}10`,
              borderColor: `${accentColor}40`,
            }}
          >
            <div className="flex items-start gap-2.5">
              <Sparkles className="size-4 shrink-0 mt-0.5" style={{ color: accentColor }} />
              <div>
                <span className="font-bold">Próximo passo recomendado:</span> {stage.nextStep}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
