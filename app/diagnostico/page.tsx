import type { Metadata } from "next";
import { Nav } from "@/features/navigation/nav";
import { Footer } from "@/features/footer/footer";
import { WaveDivider } from "@/components/ui/wave-divider";
import { DiagnosticoHero } from "@/features/diagnostico/diagnostico-hero";
import { DiagnosticoTemas } from "@/features/diagnostico/diagnostico-temas";
import { DiagnosticoAutor } from "@/features/diagnostico/diagnostico-autor";
import { DiagnosticoWizard } from "@/features/diagnostico/diagnostico-wizard";

export const metadata: Metadata = {
  title: "Diagnóstico de Maturidade Tecnológica + Ebook gratuito — We Make",
  description:
    "Responda nosso diagnóstico exclusivo e receba o ebook '7 Princípios para Ensinar Tecnologia com Cosmovisão Cristã'. Para diretores, coordenadores e mantenedores de escolas confessionais.",
  openGraph: {
    title: "Diagnóstico + Ebook gratuito — We Make",
    description:
      "Avalie a maturidade tecnológica da sua escola e receba o ebook gratuito da We Make.",
    type: "website",
  },
};

export default function DiagnosticoPage() {
  return (
    <>
      <Nav />
      <main className="relative">
        <DiagnosticoHero />
        <WaveDivider fromColor="#4c8ade" toColor="#ffffff" variant={1} height={70} />

        <DiagnosticoTemas />
        <WaveDivider fromColor="#ffffff" toColor="#0b1f44" variant={1} height={70} />

        <DiagnosticoAutor />
        <WaveDivider fromColor="#0b1f44" toColor="#2a69ba" variant={1} height={60} />

        <DiagnosticoWizard />
        <WaveDivider fromColor="#2a69ba" toColor="#0b1f44" variant={1} height={60} />
      </main>
      <Footer />
    </>
  );
}
