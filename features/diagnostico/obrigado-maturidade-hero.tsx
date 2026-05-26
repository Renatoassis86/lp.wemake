"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Download, MessageCircle, Sparkles, CalendarDays, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { EBOOK_COMPLETO_PDF, EBOOK_COMPLETO_FILENAME, WHATSAPP_VIP_LINK } from "@/constants/ebooks";

/**
 * Página de sucesso APÓS o usuário completar o diagnóstico de maturidade.
 * Libera o ebook COMPLETO (sem desfoque) + 2 CTAs (WhatsApp VIP + Falar com consultor).
 */
export function ObrigadoMaturidadeHero({ nome }: { nome: string }) {
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
              Diagnóstico recebido
            </p>
            <h1 className="font-display text-white text-[clamp(2rem,4vw+1rem,3.75rem)] leading-[1.05] mb-5 text-balance">
              Obrigado pela sua dedicação{primeiroNome}!
            </h1>
            <p className="text-white/85 text-[1.0625rem] sm:text-[1.1875rem] leading-relaxed max-w-2xl mx-auto">
              Suas respostas foram registradas e nosso time vai analisar para preparar
              recomendações personalizadas para a sua escola. Como agradecimento, liberamos
              agora o <strong className="text-white">ebook completo</strong> sem desfoque.
            </p>
          </Reveal>
        </div>

        {/* Card principal — download do ebook COMPLETO */}
        <Reveal delay={0.1}>
          <div className="max-w-2xl mx-auto mb-8">
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
                    Versão sem desfoque · acesso total ao conteúdo
                  </div>
                </div>
              </div>
              <ArrowRight className="size-5 sm:size-6 shrink-0 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </Reveal>

        {/* Faixa VIP WhatsApp em destaque */}
        <Reveal delay={0.18}>
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
        <Reveal delay={0.25}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="font-display text-white text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.15] text-balance">
                Quer transformar isso em um plano real para a sua escola?
              </h2>
              <p className="text-white/70 text-[0.9375rem] sm:text-[1rem] leading-relaxed mt-3 max-w-xl mx-auto">
                Agende uma conversa direta com nosso time e discutimos os próximos passos
                baseados no diagnóstico que você acabou de fazer.
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
