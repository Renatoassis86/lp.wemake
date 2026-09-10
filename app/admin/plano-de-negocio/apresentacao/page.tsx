import { ApresentacaoPlano } from "@/features/admin/apresentacao/apresentacao-plano";
import { carregarDadosApresentacao } from "@/features/admin/apresentacao/dados-apresentacao";

export const dynamic = "force-dynamic";

export default async function ApresentacaoPlanoDeNegocioPage() {
  const { anos, geoBrasil, escolasPorEstado, estadosComLeiPropria } = await carregarDadosApresentacao();

  return (
    <div>
      <header className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="font-display text-white text-xl sm:text-2xl font-bold">
            Apresentação do Plano de Negócio
          </h1>
          <p className="text-white/50 text-xs sm:text-sm mt-0.5 font-mono">
            We Make · 2027–2031
          </p>
        </div>
        <a
          href="/api/admin/plano-negocio/apresentacao-pdf"
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))] text-[0.8125rem] font-semibold hover:opacity-90 transition shrink-0"
        >
          Baixar PDF
        </a>
      </header>

      <div className="rounded-2xl overflow-hidden border border-white/10">
        <ApresentacaoPlano
          anos={anos}
          geoBrasil={geoBrasil}
          escolasPorEstado={escolasPorEstado}
          estadosComLeiPropria={estadosComLeiPropria}
        />
      </div>
    </div>
  );
}
