import type { Metadata } from "next";
import { LpHeader } from "@/features/diagnostico/lp-header";
import { LpFooter } from "@/features/diagnostico/lp-footer";
import { ObrigadoHero } from "@/features/diagnostico/obrigado-hero";

export const metadata: Metadata = {
  title: "Seu e-book está chegando — We Make",
  description:
    "Responda 3 perguntas rápidas para personalizar sua jornada e baixar o ebook 7 Princípios para Ensinar Tecnologia com Cosmovisão Cristã.",
  robots: { index: false, follow: false },
};

// Next 16: searchParams é Promise — precisa de await
export default async function ObrigadoPage({
  searchParams,
}: {
  searchParams: Promise<{ nome?: string; email?: string }>;
}) {
  const { nome: rawNome, email: rawEmail } = await searchParams;
  const nome = (rawNome || "").trim();
  const email = (rawEmail || "").trim();
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
