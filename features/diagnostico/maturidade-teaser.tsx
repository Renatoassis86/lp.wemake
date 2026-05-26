import { MaturidadeHero } from "@/features/diagnostico/maturidade-hero";

/**
 * Teaser do diagnóstico na landing principal.
 * Mostra apenas a apresentação (Hero) — o botão "Iniciar diagnóstico" leva
 * para a página fixa `/diagnostico-maturidade` onde o usuário responde o
 * questionário completo.
 */
export function MaturidadeTeaser() {
  return (
    <section id="maturidade-section" className="relative">
      <MaturidadeHero linkHref="/diagnostico-maturidade" />
    </section>
  );
}
