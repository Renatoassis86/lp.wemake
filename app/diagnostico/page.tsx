import type { Metadata } from "next";
import { WaveDivider } from "@/components/ui/wave-divider";
import { LpHeader } from "@/features/diagnostico/lp-header";
import { LpFooter } from "@/features/diagnostico/lp-footer";
import { DiagnosticoHero } from "@/features/diagnostico/diagnostico-hero";
import { DiagnosticoLeadForm } from "@/features/diagnostico/diagnostico-lead-form";
import { DiagnosticoTemas } from "@/features/diagnostico/diagnostico-temas";
import { DiagnosticoAutor } from "@/features/diagnostico/diagnostico-autor";

export const metadata: Metadata = {
  title: "7 Princípios para Ensinar Tecnologia com Cosmovisão Cristã — Ebook gratuito",
  description:
    "Material exclusivo para diretores, mantenedores e coordenadores pedagógicos avaliarem a maturidade tecnológica da sua escola.",
  openGraph: {
    title: "Ebook gratuito — 7 Princípios para Ensinar Tecnologia com Cosmovisão Cristã",
    description:
      "Receba gratuitamente o ebook da We Make e descubra como ensinar tecnologia com propósito.",
    type: "website",
  },
};

export default function DiagnosticoPage() {
  return (
    <>
      <LpHeader />
      <main className="relative">
        <DiagnosticoHero />
        <WaveDivider fromColor="#4c8ade" toColor="#2a69ba" variant={1} height={50} />

        <DiagnosticoLeadForm />
        <WaveDivider fromColor="#2a69ba" toColor="#ffffff" variant={1} height={60} />

        <DiagnosticoTemas />
        <WaveDivider fromColor="#ffffff" toColor="#0b1f44" variant={1} height={60} />

        <DiagnosticoAutor />
      </main>
      <LpFooter />
    </>
  );
}
