import { PLANO_NEGOCIO_SECOES, PLANO_NEGOCIO_USERNAMES, LINHAS_DE_NEGOCIO } from "@/data/plano-negocio-perguntas";
import {
  ANOS_PLANEJAMENTO,
  calcularProjecaoFinanceira,
  type LinhaFinanceira,
  type TipoLinha,
  type ModoLinha,
} from "@/lib/plano-financas-calculo";
import type { LinhaDeNegocioId } from "@/data/plano-negocio-perguntas";

export const dynamic = "force-dynamic";

function formatBRL(v: number): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

async function fetchTudo() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return { respostasPorUsuario: {} as Record<string, Record<string, string>>, linhas: [] as LinhaFinanceira[], investimentoInicial: 0 };
  }

  const [respostasRes, linhasRes, configRes] = await Promise.all([
    fetch(`${supabaseUrl}/rest/v1/plano_negocio_respostas?select=username,question_id,resposta`, {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
      cache: "no-store",
    }).catch(() => null),
    fetch(`${supabaseUrl}/rest/v1/plano_financas_linhas?select=*&order=ordem.asc`, {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
      cache: "no-store",
    }).catch(() => null),
    fetch(`${supabaseUrl}/rest/v1/plano_financas_config?select=*&limit=1`, {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
      cache: "no-store",
    }).catch(() => null),
  ]);

  const respostasRows = respostasRes?.ok ? await respostasRes.json() : [];
  const respostasPorUsuario: Record<string, Record<string, string>> = {};
  for (const row of respostasRows ?? []) {
    const userAnswers = (respostasPorUsuario[row.username] ??= {});
    userAnswers[row.question_id] = row.resposta ?? "";
  }

  const linhasRows = linhasRes?.ok ? await linhasRes.json() : [];
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
    valoresPorAno: Object.fromEntries(Object.entries(row.valores_por_ano ?? {}).map(([a, v]) => [Number(a), Number(v)])),
    ordem: row.ordem ?? 0,
  }));

  const configRows = configRes?.ok ? await configRes.json() : [];
  const investimentoInicial = Number(configRows?.[0]?.investimento_inicial ?? 0);

  return { respostasPorUsuario, linhas, investimentoInicial };
}

export default async function ApresentacaoPlanoDeNegocioPage() {
  const { respostasPorUsuario, linhas, investimentoInicial } = await fetchTudo();
  const projecao = calcularProjecaoFinanceira(linhas, investimentoInicial);

  const totalPerguntas = PLANO_NEGOCIO_SECOES.reduce(
    (acc, s) => acc + s.subsecoes.reduce((a, sub) => a + sub.perguntas.length, 0),
    0,
  );
  const respondidasPorUsuario = Object.fromEntries(
    PLANO_NEGOCIO_USERNAMES.map((u) => [
      u,
      Object.values(respostasPorUsuario[u] ?? {}).filter((v) => v?.trim()).length,
    ]),
  );

  return (
    <div>
      <header className="mb-8">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-mint))]/90 font-bold mb-2">
          Plano de negócio · We Make · 2027–2031
        </p>
        <h1 className="font-display text-white text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.1]">
          Apresentação consolidada
        </h1>
        <p className="text-white/55 text-[0.875rem] sm:text-sm mt-1.5 max-w-2xl">
          Cruza as respostas de Renato, Denis e Emanuel capítulo a capítulo, e fecha com o resumo do
          capítulo financeiro. Atualiza sozinha conforme o questionário e a planilha financeira mudam.
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4">
          {PLANO_NEGOCIO_USERNAMES.map((u) => (
            <div key={u} className="text-[0.8125rem]">
              <span className="text-white/80 font-semibold capitalize">{u}</span>{" "}
              <span className="text-white/40">
                {respondidasPorUsuario[u]}/{totalPerguntas} respondidas
              </span>
            </div>
          ))}
        </div>
      </header>

      <div className="space-y-10">
        {PLANO_NEGOCIO_SECOES.map((secao, i) => (
          <section key={secao.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-7">
            <h2 className="font-display text-white text-[1.375rem] leading-tight">
              <span className="font-mono text-[0.75rem] opacity-50 mr-2">{String(i + 1).padStart(2, "0")}</span>
              {secao.titulo}
            </h2>
            {secao.intro && <p className="text-white/50 text-[0.8125rem] mt-2 max-w-3xl">{secao.intro}</p>}

            <div className="mt-5 space-y-6">
              {secao.subsecoes.map((sub, subIdx) => (
                <div key={subIdx}>
                  {sub.titulo && (
                    <h3 className="text-[rgb(var(--color-brand-mint))]/90 font-mono uppercase tracking-wider text-[0.75rem] font-bold mb-3">
                      {sub.titulo}
                    </h3>
                  )}
                  <div className="space-y-5">
                    {sub.perguntas.map((p) => (
                      <div key={p.id} className="border-t border-white/5 pt-4 first:border-t-0 first:pt-0">
                        <p className="text-white/90 text-[0.9375rem] font-medium leading-snug mb-3">{p.pergunta}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {PLANO_NEGOCIO_USERNAMES.map((u) => {
                            const resposta = respostasPorUsuario[u]?.[p.id];
                            return (
                              <div key={u} className="rounded-xl border border-white/10 bg-black/20 p-3">
                                <p className="text-white/50 text-[0.6875rem] font-mono uppercase tracking-wider mb-1.5 capitalize">
                                  {u}
                                </p>
                                <p className={`text-[0.8125rem] whitespace-pre-wrap ${resposta?.trim() ? "text-white/85" : "text-white/30 italic"}`}>
                                  {resposta?.trim() || "Ainda não respondido"}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Resumo financeiro */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-7">
          <h2 className="font-display text-white text-[1.375rem] leading-tight mb-2">
            <span className="font-mono text-[0.75rem] opacity-50 mr-2">11</span>
            Capítulo Financeiro — resumo
          </h2>
          <p className="text-white/50 text-[0.8125rem] mb-5 max-w-3xl">
            Detalhamento completo e edição em{" "}
            <span className="text-[rgb(var(--color-brand-mint))]">/admin/plano-de-negocio/financeiro</span>.
          </p>

          <div className="flex flex-wrap gap-8 mb-6">
            <div>
              <p className="text-white/45 text-[0.6875rem] font-mono uppercase tracking-wider">Investimento inicial</p>
              <p className="text-white text-[1.25rem] font-display">{formatBRL(investimentoInicial)}</p>
            </div>
            <div>
              <p className="text-white/45 text-[0.6875rem] font-mono uppercase tracking-wider">Ponto de equilíbrio</p>
              <p className="text-white text-[1.25rem] font-display">{projecao.breakevenAno ?? "não atingido no período"}</p>
            </div>
            <div>
              <p className="text-white/45 text-[0.6875rem] font-mono uppercase tracking-wider">Payback</p>
              <p className="text-white text-[1.25rem] font-display">
                {projecao.paybackMeses != null ? `${projecao.paybackMeses.toFixed(1)} meses` : "não atingido no período"}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="text-white/45 text-[0.6875rem] font-mono uppercase tracking-wider">
                  <th className="pb-2 pr-3 font-medium">Receita por linha</th>
                  {ANOS_PLANEJAMENTO.map((ano) => (
                    <th key={ano} className="pb-2 pr-3 font-medium text-right">
                      {ano}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LINHAS_DE_NEGOCIO.map((ln) => (
                  <tr key={ln.id} className="border-t border-white/5">
                    <td className="py-2 pr-3 text-white/80 text-[0.8125rem]">{ln.label}</td>
                    {projecao.anos.map((a) => (
                      <td key={a.ano} className="py-2 pr-3 text-right text-white/70 text-[0.8125rem]">
                        {formatBRL(a.receitaPorLinha[ln.id] ?? 0)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="text-white/45 text-[0.6875rem] font-mono uppercase tracking-wider">
                  <th className="pb-2 pr-3 font-medium" />
                  {ANOS_PLANEJAMENTO.map((ano) => (
                    <th key={ano} className="pb-2 pr-3 font-medium text-right">
                      {ano}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[0.8125rem]">
                <tr className="border-t border-white/5">
                  <td className="py-2 pr-3 text-white/70">Receita bruta</td>
                  {projecao.anos.map((a) => (
                    <td key={a.ano} className="py-2 pr-3 text-right text-white/80">
                      {formatBRL(a.receitaBruta)}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-white/5">
                  <td className="py-2 pr-3 text-white/70">Custos totais</td>
                  {projecao.anos.map((a) => (
                    <td key={a.ano} className="py-2 pr-3 text-right text-white/60">
                      {formatBRL(a.custosTotais)}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-white/10">
                  <td className="py-2 pr-3 text-white font-semibold">Resultado líquido</td>
                  {projecao.anos.map((a) => (
                    <td
                      key={a.ano}
                      className={`py-2 pr-3 text-right font-semibold ${a.resultadoLiquido >= 0 ? "text-[rgb(var(--color-brand-mint))]" : "text-red-400"}`}
                    >
                      {formatBRL(a.resultadoLiquido)}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-white/5">
                  <td className="py-2 pr-3 text-white/50">Margem líquida</td>
                  {projecao.anos.map((a) => (
                    <td key={a.ano} className="py-2 pr-3 text-right text-white/50">
                      {a.margemLiquidaPct.toFixed(1)}%
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
