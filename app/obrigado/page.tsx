import type { Metadata } from "next";
import { Nav } from "@/features/navigation/nav";
import { Footer } from "@/features/footer/footer";
import { ObrigadoHero } from "@/features/diagnostico/obrigado-hero";

export const metadata: Metadata = {
  title: "Material liberado! — We Make",
  description: "Seu ebook está disponível para download. Próximos passos: diagnóstico, comunidade VIP e conversa com nosso time.",
  robots: { index: false, follow: false }, // não indexar a página de agradecimento
};

export default function ObrigadoPage({
  searchParams,
}: {
  searchParams: { nome?: string };
}) {
  const nome = (searchParams?.nome || "").trim();
  return (
    <>
      <Nav />
      <main className="relative">
        <ObrigadoHero nome={nome} />
      </main>
      <Footer />
    </>
  );
}
