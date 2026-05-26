import type { Metadata } from "next";
import { LpHeader } from "@/features/diagnostico/lp-header";
import { LpFooter } from "@/features/diagnostico/lp-footer";
import { ObrigadoHero } from "@/features/diagnostico/obrigado-hero";

export const metadata: Metadata = {
  title: "Material liberado! — We Make",
  description:
    "Seu ebook está disponível para download. Próximos passos: diagnóstico, comunidade VIP e conversa com nosso time.",
  robots: { index: false, follow: false },
};

export default function ObrigadoPage({
  searchParams,
}: {
  searchParams: { nome?: string };
}) {
  const nome = (searchParams?.nome || "").trim();
  return (
    <>
      <LpHeader />
      <main className="relative">
        <ObrigadoHero nome={nome} />
      </main>
      <LpFooter />
    </>
  );
}
