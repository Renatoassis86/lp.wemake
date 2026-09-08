import { CAPITULOS_RELATORIO } from "@/data/plano-negocio-relatorio";
import { RelatorioA4 } from "@/features/admin/relatorio-a4";

export const dynamic = "force-dynamic";

export default function RelatorioPlanoDeNegocioPage() {
  return (
    <div>
      <header className="mb-6 sm:mb-8">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-mint))]/90 font-bold mb-2">
          Plano de negócio · We Make · 2027–2031
        </p>
        <h1 className="font-display text-white text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.1]">
          Relatório completo — formato A4
        </h1>
        <p className="text-white/55 text-[0.875rem] sm:text-sm mt-1.5 max-w-2xl">
          Os 14 capítulos do Plano de Negócio 2027–2031 na íntegra, prontos para leitura ou exportação em PDF.
          Fonte: We_Make_Plano_de_Negocio_2027_2031 (4).pdf.
        </p>
        <div className="mt-4">
          <a
            href="/api/admin/plano-negocio/relatorio-pdf"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))] text-[0.8125rem] font-semibold hover:opacity-90 transition"
          >
            Baixar PDF
          </a>
        </div>
      </header>

      <div className="rounded-2xl overflow-hidden border border-white/10">
        <RelatorioA4 capitulos={CAPITULOS_RELATORIO} />
      </div>
    </div>
  );
}
