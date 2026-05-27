"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowRight, MessageCircle, CalendarDays, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { WaveDivider } from "@/components/ui/wave-divider";
import { MaturidadeHero } from "@/features/diagnostico/maturidade-hero";
import { MaturidadeWizard } from "@/features/diagnostico/maturidade-wizard";

/**
 * Experiência completa de Diagnóstico de Maturidade — usada na rota
 * `/diagnostico-maturidade`. Três fases inline:
 *  1. "intro"   → MaturidadeHero (apresentação + CTA "Iniciar diagnóstico")
 *  2. "wizard"  → MaturidadeWizard de 8 blocos com progress
 *  3. "enviado" → Mensagem de "diagnóstico enviado para análise" (sem mostrar resultado)
 *
 * O resultado calculado fica somente no Supabase + email do time — usamos o
 * diagnóstico como isca para marcar uma conversa estratégica com a escola.
 */
export function MaturidadeSection() {
  const [phase, setPhase] = useState<"intro" | "wizard" | "enviado">("intro");

  const handleStart = () => {
    setPhase("wizard");
    setTimeout(() => {
      document.getElementById("maturidade-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const handleComplete = () => {
    setPhase("enviado");
    setTimeout(() => {
      document.getElementById("maturidade-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

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
            {/* Transição royal → navy (tom sobre tom, suave igual landing) */}
            <WaveDivider fromColor="#4c8ade" toColor="#0b1f44" variant={1} height={70} />
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

        {phase === "enviado" && (
          <motion.div
            key="enviado"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EnviadoMessage />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── Mensagem de "diagnóstico enviado para análise" ─── */
function EnviadoMessage() {
  return (
    <Section
      bleed
      className="relative pt-[7rem] sm:pt-[10rem] md:pt-[11rem] pb-20 sm:pb-28 lg:pb-32 bg-[rgb(var(--color-brand-navy))] overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[rgb(var(--color-brand-mint))]/15 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[rgb(var(--color-brand-sky))]/12 blur-[120px] rounded-full" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center justify-center size-20 sm:size-24 rounded-full bg-[rgb(var(--color-brand-mint))]/20 border-2 border-[rgb(var(--color-brand-mint))]/40 mb-7"
            >
              <CheckCircle2 className="size-10 sm:size-12 text-[rgb(var(--color-brand-mint))]" />
            </motion.div>

            <p className="font-mono text-[0.75rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-mint))]/90 mb-4 font-bold">
              Diagnóstico enviado
            </p>
            <h1 className="font-display text-white text-[clamp(2rem,4vw+1rem,3.5rem)] leading-[1.05] mb-6 text-balance">
              Obrigado pelo seu tempo!
            </h1>
            <p className="text-white/85 text-[1.0625rem] sm:text-[1.1875rem] leading-relaxed max-w-2xl mx-auto mb-10">
              O diagnóstico foi enviado para análise do nosso time de especialistas. Entraremos
              em contato em breve para lhe dar os resultados customizados para sua escola.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12 text-left">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-xl bg-[rgb(var(--color-brand-mint))]/15 border border-[rgb(var(--color-brand-mint))]/30 flex items-center justify-center shrink-0">
                    <Sparkles className="size-5 text-[rgb(var(--color-brand-mint))]" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-[0.9375rem] mb-1">Análise especializada</p>
                    <p className="text-white/70 text-[0.8125rem] leading-snug">
                      Nosso time vai cruzar suas respostas com nossa metodologia
                      de cosmovisão cristã + maturidade tecnológica.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-xl bg-[rgb(var(--color-brand-mint))]/15 border border-[rgb(var(--color-brand-mint))]/30 flex items-center justify-center shrink-0">
                    <CalendarDays className="size-5 text-[rgb(var(--color-brand-mint))]" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-[0.9375rem] mb-1">Retorno em até 3 dias úteis</p>
                    <p className="text-white/70 text-[0.8125rem] leading-snug">
                      Vamos entrar em contato pelo e-mail e WhatsApp que você
                      informou para agendar uma conversa estratégica.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 border-white/20 hover:border-white/40 text-white font-semibold text-[0.9375rem] card-hover-lift"
              >
                Voltar para o início
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="https://chat.whatsapp.com/J4giIFuxMFh8vWGBgpAm3z?mode=gi_t"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:brightness-110 text-white font-semibold text-[0.9375rem] shadow-lg card-hover-lift"
              >
                <MessageCircle className="size-4" fill="white" />
                Entre no grupo VIP
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
