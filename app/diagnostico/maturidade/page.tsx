import type { Metadata } from "next";
import { WaveDivider } from "@/components/ui/wave-divider";
import { LpHeader } from "@/features/diagnostico/lp-header";
import { LpFooter } from "@/features/diagnostico/lp-footer";
import { MaturidadeHero } from "@/features/diagnostico/maturidade-hero";

export const metadata: Metadata = {
  title: "Diagnóstico de Maturidade Tecnológica — We Make",
  description:
    "Avalie a maturidade tecnológica da sua escola cristã em 8 blocos. Diagnóstico gratuito para diretores, coordenadores e professores em ~6 minutos.",
  openGraph: {
    title: "Diagnóstico de Maturidade Tecnológica — We Make",
    description:
      "Avalie a maturidade tecnológica da sua escola cristã em 8 blocos. Diagnóstico gratuito.",
    type: "website",
  },
};

export default function MaturidadePage() {
  return (
    <>
      <LpHeader />
      <main className="relative">
        <MaturidadeHero />
        <WaveDivider fromColor="#4c8ade" toColor="#0b1f44" variant={1} height={60} />

        {/* Form de 8 blocos — implementacao do wizard vem no proximo passo */}
        <section id="maturidade-form" className="bg-[rgb(var(--color-brand-navy))] py-20 sm:py-28">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--color-brand-mint))]/15 text-[rgb(var(--color-brand-mint))] font-bold text-sm mb-5 border border-[rgb(var(--color-brand-mint))]/30">
              EM CONSTRUÇÃO
            </div>
            <h2 className="font-display text-white text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] mb-4 text-balance">
              O questionário de 8 blocos será disponibilizado em breve
            </h2>
            <p className="text-white/70 text-[1.0625rem] leading-relaxed mb-8">
              Estamos finalizando a experiência gamificada com barra de progresso, validação
              por etapa e diagnóstico personalizado ao final.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center h-12 px-6 rounded-full border-2 border-white/15 text-white font-semibold text-[0.9375rem] hover:bg-white/5 transition-colors"
            >
              Voltar à página inicial
            </a>
          </div>
        </section>
      </main>
      <LpFooter />
    </>
  );
}
