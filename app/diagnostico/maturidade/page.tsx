import type { Metadata } from "next";
import { WaveDivider } from "@/components/ui/wave-divider";
import { LpHeader } from "@/features/diagnostico/lp-header";
import { LpFooter } from "@/features/diagnostico/lp-footer";
import { MaturidadeHero } from "@/features/diagnostico/maturidade-hero";
import { MaturidadeWizard } from "@/features/diagnostico/maturidade-wizard";

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
        <MaturidadeWizard />
      </main>
      <LpFooter />
    </>
  );
}
