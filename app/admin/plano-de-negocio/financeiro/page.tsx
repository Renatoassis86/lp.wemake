import type { LinhaFinanceira, TipoLinha, ModoLinha } from "@/lib/plano-financas-calculo";
import type { LinhaDeNegocioId } from "@/data/plano-negocio-perguntas";
import { PlanoFinancasTable } from "@/features/admin/plano-financas-table";

export const dynamic = "force-dynamic";

async function fetchDados(): Promise<{ linhas: LinhaFinanceira[]; investimentoInicial: number }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) return { linhas: [], investimentoInicial: 0 };

  const [linhasRes, configRes] = await Promise.all([
    fetch(`${supabaseUrl}/rest/v1/plano_financas_linhas?select=*&order=ordem.asc`, {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
      cache: "no-store",
    }).catch(() => null),
    fetch(`${supabaseUrl}/rest/v1/plano_financas_config?select=*&limit=1`, {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
      cache: "no-store",
    }).catch(() => null),
  ]);

  const linhasRows = linhasRes?.ok ? await linhasRes.json() : [];
  const configRows = configRes?.ok ? await configRes.json() : [];

  const linhas: LinhaFinanceira[] = (linhasRows ?? []).map((row: any) => ({
    id: row.id,
    tipo: row.tipo as TipoLinha,
    modo: row.modo as ModoLinha,
    macroArea: row.macro_area,
    rubrica: row.rubrica,
    linhaNegocio: (row.linha_negocio as LinhaDeNegocioId) ?? null,
    ticketMedio: row.ticket_medio != null ? Number(row.ticket_medio) : null,
    reajusteTicketPct: row.reajuste_ticket_pct != null ? Number(row.reajuste_ticket_pct) : 0,
    percentualReceitaPct: row.percentual_receita_pct != null ? Number(row.percentual_receita_pct) : null,
    valoresPorAno: Object.fromEntries(
      Object.entries(row.valores_por_ano ?? {}).map(([ano, v]) => [Number(ano), Number(v)]),
    ),
    ordem: row.ordem ?? 0,
  }));

  return { linhas, investimentoInicial: Number(configRows?.[0]?.investimento_inicial ?? 0) };
}

export default async function PlanoFinanceiroPage() {
  const { linhas, investimentoInicial } = await fetchDados();

  return (
    <div>
      <header className="mb-6 sm:mb-8">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-mint))]/90 font-bold mb-2">
          Plano de negócio · We Make
        </p>
        <h1 className="font-display text-white text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.1]">
          Capítulo Financeiro (2027–2031)
        </h1>
        <p className="text-white/55 text-[0.875rem] sm:text-sm mt-1.5 max-w-2xl">
          Planilha compartilhada — qualquer sócio pode editar. Receita, custo fixo e custo variável,
          abertos pelas cinco linhas de negócio da We Make. Resultado, margem, ponto de equilíbrio e
          payback são calculados automaticamente.
        </p>
      </header>
      <PlanoFinancasTable linhasIniciais={linhas} investimentoInicialInicial={investimentoInicial} />
    </div>
  );
}
