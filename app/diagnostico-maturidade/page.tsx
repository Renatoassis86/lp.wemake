import type { Metadata } from "next";
import { LpHeader } from "@/features/diagnostico/lp-header";
import { LpFooter } from "@/features/diagnostico/lp-footer";
import { MaturidadeSection } from "@/features/diagnostico/maturidade-section";

export const metadata: Metadata = {
  title: "Diagnóstico de Maturidade Tecnológica — We Make",
  description:
    "Avalie em 8 blocos onde sua escola está em educação tecnológica fundamentada na cosmovisão cristã. Nosso time analisa suas respostas e retorna com recomendações.",
  openGraph: {
    title: "Diagnóstico de Maturidade Tecnológica — We Make",
    description:
      "Diagnóstico estruturado para diretores, coordenadores e professores. Em 6 minutos, nosso time analisa e retorna com recomendações personalizadas.",
    type: "website",
    images: [{ url: "/og/wemake-og.jpg", width: 1200, height: 630, alt: "We Make — Tecnologia educacional com cosmovisão reformada" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diagnóstico de Maturidade Tecnológica — We Make",
    description:
      "Diagnóstico estruturado para diretores, coordenadores e professores. Em 6 minutos, nosso time analisa e retorna com recomendações personalizadas.",
    images: ["/og/wemake-og.jpg"],
  },
};

export default function DiagnosticoMaturidadePage() {
  return (
    <>
      <LpHeader />
      <main className="relative">
        <MaturidadeSection />
      </main>
      <LpFooter />
    </>
  );
}
