import type { Metadata } from "next";
import { WaveDivider } from "@/components/ui/wave-divider";
import { LpHeader } from "@/features/diagnostico/lp-header";
import { LpFooter } from "@/features/diagnostico/lp-footer";
import { DiagnosticoHero } from "@/features/diagnostico/diagnostico-hero";
import { DiagnosticoTemas } from "@/features/diagnostico/diagnostico-temas";
import { DiagnosticoAutor } from "@/features/diagnostico/diagnostico-autor";

export const metadata: Metadata = {
  title: "7 Princípios para Ensinar Tecnologia com Cosmovisão Cristã — Ebook gratuito",
  description:
    "Material exclusivo para diretores, mantenedores, coordenadores e professores avaliarem a maturidade tecnológica da sua escola.",
  openGraph: {
    title: "Ebook gratuito — 7 Princípios para Ensinar Tecnologia com Cosmovisão Cristã",
    description:
      "Receba gratuitamente o ebook da We Make e descubra como ensinar tecnologia com propósito.",
    type: "website",
    images: [{ url: "/og/wemake-og.jpg", width: 1200, height: 630, alt: "We Make — Tecnologia educacional com cosmovisão reformada" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ebook gratuito — 7 Princípios para Ensinar Tecnologia com Cosmovisão Cristã",
    description:
      "Receba gratuitamente o ebook da We Make e descubra como ensinar tecnologia com propósito.",
    images: ["/og/wemake-og.jpg"],
  },
};

export default function DiagnosticoPage() {
  return (
    <>
      <LpHeader />
      <main className="relative">
        <DiagnosticoHero />
        <WaveDivider fromColor="#4c8ade" toColor="#ffffff" variant={1} height={50} />

        <DiagnosticoTemas />
        <WaveDivider fromColor="#ffffff" toColor="#143358" variant={1} height={60} />

        <DiagnosticoAutor />
        {/* Autor azul-medio → Footer navy | tons distintos com transicao suave */}
        <WaveDivider fromColor="#143358" toColor="#0b1f44" variant={3} height={70} />
      </main>
      <LpFooter />
    </>
  );
}
