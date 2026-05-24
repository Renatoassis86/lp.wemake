import { cn } from "@/lib/utils";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

/**
 * Tom de uma seção — define background, cor de texto, glow ambient
 * e tonalidade dos divisores.
 *
 *   navy       cinema profundo (hero, manifesto CEO, humans, FAQ)
 *   ivory      respiração clara (princípios, serviços, material, reunião)
 *   royal      institucional brand (problema, CTAs, sobre o Denis)
 *   mint       energia / VIP / momentos celebrativos
 *   sky        intermediário leve (presença, transições)
 */
export type SectionTone = "navy" | "ivory" | "royal" | "mint" | "sky";

type ModuleSectionProps = ComponentPropsWithoutRef<"section"> & {
  id?: string;
  tone?: SectionTone;
  /** Aplica padding vertical menor (CTAs curtos, banners). */
  tight?: boolean;
  /** Sobreposição negativa que "monta" a seção sobre a anterior. */
  overlap?: boolean;
  /** Esconde o border-radius superior — usar quando vier logo após hero/closer. */
  flat?: boolean;
};

const toneClasses: Record<SectionTone, { bg: string; fg: string; hairline: string }> = {
  navy: {
    bg: "bg-ink-950",
    fg: "text-foreground",
    hairline: "via-white/15",
  },
  ivory: {
    bg: "bg-[rgb(var(--color-brand-ivory))]",
    fg: "text-[rgb(var(--color-brand-navy))]",
    hairline: "via-black/15",
  },
  royal: {
    bg: "bg-[rgb(var(--color-brand-royal))]",
    fg: "text-white",
    hairline: "via-white/25",
  },
  mint: {
    bg: "bg-[rgb(var(--color-brand-mint))]",
    fg: "text-[rgb(var(--color-brand-navy))]",
    hairline: "via-black/15",
  },
  sky: {
    bg: "bg-[rgb(var(--color-brand-royal-soft))]",
    fg: "text-[rgb(var(--color-brand-navy))]",
    hairline: "via-black/20",
  },
};

/**
 * Bloco modular com cor própria e cantos arredondados.
 *
 *   - Cada módulo é um cartão de borda arredondada que se sobrepõe
 *     levemente ao anterior (idiom Apple / Stripe / Linear).
 *   - O scroll cria uma sensação de "cartões empilhados", suavizando
 *     transições entre cores fortes (royal/ivory/mint) sem precisar
 *     de wave dividers SVG.
 *   - Mantém ritmo vertical (var(--space-section)) e adiciona
 *     `relative isolate overflow-hidden` para abrigar glows internos.
 */
export const ModuleSection = forwardRef<HTMLElement, ModuleSectionProps>(
  function ModuleSection(
    {
      id,
      tone = "navy",
      tight = false,
      overlap = true,
      flat = false,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const t = toneClasses[tone];
    return (
      <section
        ref={ref}
        id={id}
        data-tone={tone}
        className={cn(
          "relative isolate overflow-hidden",
          "transition-colors duration-700",
          t.bg,
          t.fg,
          // Cantos arredondados — só os superiores quando se sobrepõe à seção anterior
          !flat && "rounded-t-[2.5rem] sm:rounded-t-[3.5rem]",
          !flat && overlap && "-mt-12 sm:-mt-16",
          // Padding vertical interno
          tight
            ? "py-[var(--space-section-tight)]"
            : "py-[var(--space-section)]",
          className,
        )}
        {...rest}
      >
        {children}
      </section>
    );
  },
);
