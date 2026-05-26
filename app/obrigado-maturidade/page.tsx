import type { Metadata } from "next";
import { LpHeader } from "@/features/diagnostico/lp-header";
import { LpFooter } from "@/features/diagnostico/lp-footer";
import { ObrigadoMaturidadeHero } from "@/features/diagnostico/obrigado-maturidade-hero";
import { getStageBySlug } from "@/lib/maturidade-stages";

export const metadata: Metadata = {
  title: "Diagnóstico concluído — We Make",
  description:
    "Seu diagnóstico de maturidade tecnológica foi recebido. Acesse o ebook completo e converse com nosso time.",
  robots: { index: false, follow: false },
};

export default function ObrigadoMaturidadePage({
  searchParams,
}: {
  searchParams: { nome?: string; estagio?: string; score?: string };
}) {
  const nome = (searchParams?.nome || "").trim();
  const stage = getStageBySlug(searchParams?.estagio);
  const score = Number(searchParams?.score) || 0;

  return (
    <>
      <LpHeader />
      <main className="relative">
        <ObrigadoMaturidadeHero nome={nome} stage={stage} score={score} />
      </main>
      <LpFooter />
    </>
  );
}
