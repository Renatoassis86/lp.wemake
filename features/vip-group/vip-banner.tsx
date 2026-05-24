"use client";

import { MessageCircle, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ModuleSection } from "@/components/ui/module-section";
import { Reveal } from "@/components/motion/reveal";
import { whatsappLink } from "@/constants/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Variant = "mint" | "navy" | "royal";

type VipBannerProps = {
  /** Onde este banner aparece — usado em analytics. */
  placement: string;
  /** Tom visual do cartão. */
  variant?: Variant;
  /** Headline curta — sobrescreve o padrão. */
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
  },
  navy: {
    bg: "bg-[rgb(var(--color-brand-navy))]",
    ring: "border-white/10",
    fg: "text-white",
    cta: "bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))] hover:bg-[rgb(var(--color-brand-mint-deep))] hover:text-white",
  },
  royal: {
    bg: "bg-[rgb(var(--color-brand-royal))]",
    ring: "border-white/15",
    fg: "text-white",
    cta: "bg-white text-[rgb(var(--color-brand-royal))] hover:bg-[rgb(var(--color-brand-mint))] hover:text-[rgb(var(--color-brand-navy))]",
  },
} as const;

/**
 * VipBanner — chamada compacta para o grupo VIP do WhatsApp.
 *
 * Distribuído em pontos estratégicos da landing (depois do vídeo do CEO,
 * depois dos 7 princípios, depois da presença etc.) para multiplicar a
 * captura sem competir com o formulário de reunião estratégica.
 *
 * Pode ser usado:
 *   - como uma seção própria (default — `inline=false`)
 *   - como componente embutido em outra seção (`inline=true`)
 */
export function VipBanner({
  placement,
  variant = "mint",
  headline = "Quer estar perto de tudo o que acontece na We Make?",
  caption = "Entre no grupo VIP no WhatsApp — conteúdos, bastidores e convites exclusivos para gestores escolares cristãos.",
  inline = false,
}: VipBannerProps) {
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
          <div className="flex items-start gap-4 max-w-xl">
            <div
              className={cn(
                "inline-flex size-12 shrink-0 items-center justify-center rounded-2xl",
                variant === "navy"
                  ? "bg-[rgb(var(--color-brand-mint))]/15 ring-1 ring-[rgb(var(--color-brand-mint))]/40 text-[rgb(var(--color-brand-mint))]"
                  : variant === "royal"
                  ? "bg-white/15 ring-1 ring-white/30 text-white"
                  : "bg-[rgb(var(--color-brand-navy))]/10 ring-1 ring-[rgb(var(--color-brand-navy))]/20",
              )}
              aria-hidden
            >
              <Users className="size-5" />
            </div>
            <div>
              <h3 className="font-display text-[clamp(1.25rem,1.05rem+0.7vw,1.6rem)] leading-[1.2] tracking-[-0.015em]">
                {headline}
              </h3>
              <p
                className={cn(
                  "mt-2 text-[0.9375rem] leading-[1.55]",
                  variant === "navy" ? "text-white/70" : variant === "royal" ? "text-white/85" : "text-[rgb(var(--color-brand-navy))]/70",
                )}
              >
                {caption}
              </p>
            </div>
          </div>

          <a
            href={whatsappLink("vip")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent({
                name: "cta_click",
                placement,
                label: "Entrar no grupo VIP",
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
            <MessageCircle className="size-4" aria-hidden />
            Entrar no grupo VIP
          </a>
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
