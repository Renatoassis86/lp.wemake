"use client";

import { CalendarHeart, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ModuleSection } from "@/components/ui/module-section";
import { Reveal } from "@/components/motion/reveal";
import { whatsappLink } from "@/constants/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Variant = "mint" | "navy" | "royal" | "ivory";

type ConsultorBannerProps = {
  /** Onde este banner aparece - usado em analytics. */
  placement: string;
  /** Tom visual do cartão. */
  variant?: Variant;
  /** Headline curta - sobrescreve o padrão. */
  headline?: string;
  /** Subtexto opcional. */
  caption?: string;
  /** Esconder o pacote de seção (para colocar dentro de outra). */
  inline?: boolean;
};

const palettes = {
  mint: {
    bg: "bg-[rgb(var(--color-brand-mint))]",
    ring: "border-[rgb(var(--color-brand-navy))]/10",
    fg: "text-[rgb(var(--color-brand-navy))]",
    cta: "bg-[rgb(var(--color-brand-navy))] text-white hover:bg-[rgb(var(--color-brand-royal-deep))]",
    icon: "bg-[rgb(var(--color-brand-navy))]/10 ring-1 ring-[rgb(var(--color-brand-navy))]/20 text-[rgb(var(--color-brand-navy))]",
  },
  navy: {
    bg: "bg-[rgb(var(--color-brand-navy))]",
    ring: "border-white/10",
    fg: "text-white",
    cta: "bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))] hover:bg-[rgb(var(--color-brand-mint-deep))] hover:text-white",
    icon: "bg-[rgb(var(--color-brand-mint))]/15 ring-1 ring-[rgb(var(--color-brand-mint))]/40 text-[rgb(var(--color-brand-mint))]",
  },
  royal: {
    bg: "bg-[rgb(var(--color-brand-royal))]",
    ring: "border-white/15",
    fg: "text-white",
    cta: "bg-white text-[rgb(var(--color-brand-royal))] hover:bg-[rgb(var(--color-brand-mint))] hover:text-[rgb(var(--color-brand-navy))]",
    icon: "bg-white/15 ring-1 ring-white/30 text-white",
  },
  ivory: {
    bg: "bg-ivory-200",
    ring: "border-[rgb(var(--color-brand-navy))]/10",
    fg: "text-[rgb(var(--color-brand-navy))]",
    cta: "bg-[rgb(var(--color-brand-royal))] text-white hover:bg-[rgb(var(--color-brand-royal-deep))]",
    icon: "bg-[rgb(var(--color-brand-royal))]/10 ring-1 ring-[rgb(var(--color-brand-royal))]/20 text-[rgb(var(--color-brand-royal))]",
  },
} as const;

/**
 * ConsultorBanner - chamada comercial direta para implementação do Sistema We Make.
 *
 * Distribuído ao longo da página para focar na venda B2B e no agendamento
 * de reuniões estratégicas.
 */
export function ConsultorBanner({
  placement,
  variant = "navy",
  headline = "Pronto para transformar sua escola com o Sistema We Make?",
  caption = "Fale com um consultor agora e descubra como implementar nosso currículo maker e formação de professores para 2027.",
  inline = false,
}: ConsultorBannerProps) {
  const p = palettes[variant];

  const card = (
    <Reveal>
      <div
        className={cn(
          "group relative isolate overflow-hidden",
          "rounded-[2rem] border p-7 sm:p-9",
          "shadow-[0_24px_60px_-24px_rgba(11,31,68,0.45)]",
          p.bg,
          p.ring,
          p.fg,
        )}
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4 max-w-2xl">
            <div
              className={cn(
                "inline-flex size-12 shrink-0 items-center justify-center rounded-2xl",
                p.icon
              )}
              aria-hidden
            >
              <CalendarHeart className="size-5" />
            </div>
            <div>
              <h3 className="font-display text-[clamp(1.25rem,1.05rem+0.7vw,1.6rem)] leading-[1.2] tracking-[-0.015em]">
                {headline}
              </h3>
              <p
                className={cn(
                  "mt-2 text-[0.9375rem] leading-[1.55]",
                  variant === "navy" || variant === "royal" ? "text-white/70" : "text-[rgb(var(--color-brand-navy))]/70"
                )}
              >
                {caption}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="#reuniao"
              onClick={() =>
                trackEvent({
                  name: "cta_click",
                  placement,
                  label: "Agendar Reunião - Banner",
                })
              }
              className={cn(
                "inline-flex shrink-0 items-center justify-center gap-2",
                "h-12 px-6 rounded-full",
                "font-medium text-[0.9375rem]",
                "transition-colors duration-300 ease-[var(--ease-cinematic)]",
                "shadow-[0_12px_30px_-12px_rgba(0,0,0,0.35)]",
                p.cta,
              )}
            >
              <CalendarHeart className="size-4" aria-hidden />
              Agendar Reunião
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );

  if (inline) return card;

  return (
    <ModuleSection tight tone="ivory">
      <Container>{card}</Container>
    </ModuleSection>
  );
}
