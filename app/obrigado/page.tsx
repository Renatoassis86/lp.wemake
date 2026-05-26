import type { Metadata } from "next";
import { LpHeader } from "@/features/diagnostico/lp-header";
import { LpFooter } from "@/features/diagnostico/lp-footer";
import { ObrigadoHero } from "@/features/diagnostico/obrigado-hero";

export const metadata: Metadata = {
  title: "Seu e-book está chegando — We Make",
  description:
    "Responda 4 perguntas rápidas para personalizar sua jornada e baixar o ebook 7 Princípios para Ensinar Tecnologia com Cosmovisão Cristã.",
  robots: { index: false, follow: false },
};

export default function ObrigadoPage({
  searchParams,
}: {
  searchParams: { nome?: string; email?: string };
}) {
  const nome = (searchParams?.nome || "").trim();
  const email = (searchParams?.email || "").trim();
  return (
    <>
      <LpHeader />
      <main className="relative">
        <ObrigadoHero nome={nome} email={email} />
      </main>
      <LpFooter />
    </>
  );
}
