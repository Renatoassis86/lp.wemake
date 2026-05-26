"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Download, MessageCircle, Sparkles, CalendarDays, ArrowRight, BarChart3 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { EBOOK_ISCA_PDF, EBOOK_ISCA_FILENAME, WHATSAPP_VIP_LINK } from "@/constants/ebooks";

/**
 * Pagina de obrigado da LP /diagnostico.
 * Libera o download imediato + 3 CTAs para qualificar o lead:
 * 1) Form gamificado de maturidade (lead quente)
 * 2) Grupo VIP no WhatsApp
 * 3) Falar com consultor (lead muito quente)
 */
export function ObrigadoHero({ nome }: { nome: string }) {
  const primeiroNome = nome ? `, ${nome}` : "";

  return (
    <Section
      bleed
      className="relative pt-[7rem] sm:pt-[10rem] md:pt-[11rem] pb-16 sm:pb-24 lg:pb-28 bg-[rgb(var(--color-brand-royal-deep))] overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[rgb(var(--color-brand-mint))]/15 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[rgb(var(--color-brand-sky))]/15 blur-[120px] rounded-full" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Reveal>
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center justify-center size-20 sm:size-24 rounded-full bg-[rgb(var(--color-brand-mint))]/20 border-2 border-[rgb(var(--color-brand-mint))]/40 mb-6"
            >
              <CheckCircle2 className="size-10 sm:size-12 text-[rgb(var(--color-brand-mint))]" />
            </motion.div>

            <h1 className="font-display text-white text-[clamp(2rem,4vw+1rem,3.75rem)] leading-[1.05] mb-5 text-balance">
              Material liberado{primeiroNome}!
            </h1>
            <p className="text-white/85 text-[1.0625rem] sm:text-[1.1875rem] leading-relaxed max-w-2xl mx-auto">
              Seu acesso ao ebook <strong className="text-white">7 Princípios para Ensinar Tecnologia com Cosmovisão Cristã</strong> está pronto.
            </p>
          </Reveal>
        </div>

        {/* Card principal: download */}
        <Reveal delay={0.1}>
          <div className="max-w-2xl mx-auto mb-10">
            <a
              href={EBOOK_ISCA_PDF}
              download={EBOOK_ISCA_FILENAME}
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
                    Baixar o ebook (PDF)
                  </div>
                  <div className="text-[0.8125rem] sm:text-sm opacity-80 font-medium mt-0.5">
                    Clique para iniciar o download
                  </div>
                </div>
              </div>
              <ArrowRight className="size-5 sm:size-6 shrink-0 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </Reveal>

        {/* Faixa VIP WhatsApp — destaque imediato após download */}
        <Reveal delay={0.18}>
          <div className="max-w-2xl mx-auto mb-12 -mt-2">
            <a
              href={WHATSAPP_VIP_LINK}
              target="_blank"
              rel="noreferrer"
              className="group relative flex items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#25D366]/15 to-[#25D366]/5 border-2 border-[#25D366]/40 hover:border-[#25D366]/70 hover:-translate-y-0.5 transition-all backdrop-blur-sm shadow-lg"
            >
              {/* Glow pulsante atrás */}
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

        {/* Próximos passos: 3 CTAs em cards */}
        <Reveal delay={0.25}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-mint))]/90 mb-3 font-bold">
                Próximos passos
              </p>
              <h2 className="font-display text-white text-[clamp(1.5rem,2.5vw,2.25rem)] leading-[1.15] text-balance">
                Quer aprofundar e levar a tecnologia educacional cristã para a sua escola?
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* CTA 1 — Form gamificado de diagnóstico */}
              <CardCTA
                icon={<BarChart3 className="size-6" />}
                title="Quero meu diagnóstico"
                desc="Em ~3 minutos, descubra o nível de maturidade tecnológica da sua escola e receba recomendações personalizadas."
                cta="Iniciar diagnóstico"
                href="/diagnostico/maturidade"
                accent="mint"
                featured
              />

              {/* CTA 2 — Grupo VIP WhatsApp */}
              <CardCTA
                icon={<MessageCircle className="size-6" />}
                title="Comunidade VIP"
                desc="Entre no grupo fechado no WhatsApp e converse com outros líderes educacionais que vivem o mesmo desafio."
                cta="Entrar no grupo"
                href={WHATSAPP_VIP_LINK}
                external
                accent="green"
              />

              {/* CTA 3 — Falar com consultor */}
              <CardCTA
                icon={<CalendarDays className="size-6" />}
                title="Falar com consultor"
                desc="Agende uma conversa direta com nosso time e descubra como implementar na sua escola com propósito."
                cta="Agendar conversa"
                href="/#reuniao"
                accent="sky"
              />
            </div>
          </div>
        </Reveal>

        {/* Tip / dica final */}
        <Reveal delay={0.4}>
          <div className="max-w-2xl mx-auto mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm">
              <Sparkles className="size-4 text-[rgb(var(--color-brand-mint))]" />
              Também enviamos uma cópia do ebook por e-mail.
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function CardCTA({
  icon, title, desc, cta, href, external, accent, featured,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  cta: string;
  href: string;
  external?: boolean;
  accent: "mint" | "green" | "sky";
  featured?: boolean;
}) {
  const accentRing = {
    mint: "ring-[rgb(var(--color-brand-mint))]/40",
    green: "ring-[#25D366]/40",
    sky: "ring-[rgb(var(--color-brand-sky))]/40",
  }[accent];

  const iconBg = {
    mint: "bg-[rgb(var(--color-brand-mint))]/20 text-[rgb(var(--color-brand-mint))]",
    green: "bg-[#25D366]/20 text-[#25D366]",
    sky: "bg-[rgb(var(--color-brand-sky))]/20 text-[rgb(var(--color-brand-sky))]",
  }[accent];

  const btnBg = {
    mint: "bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))] hover:bg-[rgb(var(--color-brand-mint-deep))]",
    green: "bg-[#25D366] text-white hover:bg-[#128C7E]",
    sky: "bg-[rgb(var(--color-brand-sky))] text-[rgb(var(--color-brand-navy))] hover:brightness-110",
  }[accent];

  return (
    <div
      className={`group relative flex flex-col h-full p-6 sm:p-7 rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-sm hover:bg-white/[0.1] hover:-translate-y-1 transition-all duration-300 ${
        featured ? `ring-2 ${accentRing}` : ""
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-6 inline-flex items-center px-2.5 py-1 rounded-full bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))] text-[0.6875rem] font-bold tracking-wide uppercase">
          Recomendado
        </span>
      )}
      <div className={`size-12 rounded-xl ${iconBg} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="font-display text-white text-[1.125rem] sm:text-[1.1875rem] leading-tight mb-2.5">
        {title}
      </h3>
      <p className="text-white/70 text-[0.9375rem] leading-relaxed mb-5 flex-1">
        {desc}
      </p>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className={`inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full font-bold text-[0.9375rem] transition-all ${btnBg}`}
      >
        {cta}
        <ArrowRight className="size-4" />
      </a>
    </div>
  );
}
