"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  ANOS_PLANEJAMENTO,
  calcularProjecaoFinanceira,
  type AnoPlanejamento,
  type LinhaFinanceira,
  type ModoLinha,
  type TipoLinha,
} from "@/lib/plano-financas-calculo";
import { LINHAS_DE_NEGOCIO, type LinhaDeNegocioId } from "@/data/plano-negocio-perguntas";

const TIPOS: { id: TipoLinha; label: string }[] = [
  { id: "receita", label: "Receitas" },
  { id: "custo_fixo", label: "Custos fixos" },
  { id: "custo_variavel", label: "Custos variáveis" },
];

const MODOS: { id: ModoLinha; label: string }[] = [
  { id: "valor", label: "Valor direto (R$)" },
  { id: "clientes_x_ticket", label: "Nº de clientes × ticket" },
  { id: "percentual_receita", label: "% da receita bruta" },
];

function formatBRL(v: number): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function mapRowToLinha(row: any): LinhaFinanceira {
  return {
    id: row.id,
    tipo: row.tipo,
    modo: row.modo,
    macroArea: row.macro_area,
    rubrica: row.rubrica,
    linhaNegocio: row.linha_negocio ?? null,
    ticketMedio: row.ticket_medio != null ? Number(row.ticket_medio) : null,
    reajusteTicketPct: row.reajuste_ticket_pct != null ? Number(row.reajuste_ticket_pct) : 0,
    percentualReceitaPct: row.percentual_receita_pct != null ? Number(row.percentual_receita_pct) : null,
    valoresPorAno: Object.fromEntries(Object.entries(row.valores_por_ano ?? {}).map(([a, v]) => [Number(a), Number(v)])),
    ordem: row.ordem ?? 0,
  };
}

const inputCls =
  "w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-white/90 text-base sm:text-[0.8125rem] placeholder:text-white/30 focus:outline-none focus:border-[rgb(var(--color-brand-mint))]/50";

export function PlanoFinancasTable({
  linhasIniciais,
  investimentoInicialInicial,
}: {
  linhasIniciais: LinhaFinanceira[];
  investimentoInicialInicial: number;
}) {
  const [linhas, setLinhas] = useState<LinhaFinanceira[]>(linhasIniciais);
  const [investimentoInicial, setInvestimentoInicial] = useState(investimentoInicialInicial);
  const patchTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const investimentoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const projecao = useMemo(() => calcularProjecaoFinanceira(linhas, investimentoInicial), [linhas, investimentoInicial]);

  const patchLinha = useCallback((id: string, patch: Partial<LinhaFinanceira>) => {
    setLinhas((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    if (patchTimers.current[id]) clearTimeout(patchTimers.current[id]);
    patchTimers.current[id] = setTimeout(() => {
      const body: Record<string, unknown> = {};
      if (patch.tipo !== undefined) body.tipo = patch.tipo;
      if (patch.modo !== undefined) body.modo = patch.modo;
      if (patch.macroArea !== undefined) body.macro_area = patch.macroArea;
      if (patch.rubrica !== undefined) body.rubrica = patch.rubrica;
      if (patch.linhaNegocio !== undefined) body.linha_negocio = patch.linhaNegocio;
      if (patch.ticketMedio !== undefined) body.ticket_medio = patch.ticketMedio;
      if (patch.reajusteTicketPct !== undefined) body.reajuste_ticket_pct = patch.reajusteTicketPct;
      if (patch.percentualReceitaPct !== undefined) body.percentual_receita_pct = patch.percentualReceitaPct;
      if (patch.valoresPorAno !== undefined) body.valores_por_ano = patch.valoresPorAno;
      fetch(`/api/admin/plano-negocio/financas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).catch(() => {});
    }, 600);
  }, []);

  const patchAno = useCallback(
    (linha: LinhaFinanceira, ano: AnoPlanejamento, valor: number) => {
      patchLinha(linha.id, { valoresPorAno: { ...linha.valoresPorAno, [ano]: valor } });
    },
    [patchLinha],
  );

  async function addLinha(tipo: TipoLinha) {
    const body = {
      tipo,
      modo: "valor" as ModoLinha,
      macro_area: tipo === "receita" ? "Nova linha de receita" : "Nova área de custo",
      rubrica: "Nova rubrica",
      linha_negocio: tipo === "receita" ? LINHAS_DE_NEGOCIO[0].id : null,
      valores_por_ano: {},
      ordem: linhas.length,
    };
    const res = await fetch("/api/admin/plano-negocio/financas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => null);
    if (json?.ok && json.row) setLinhas((ls) => [...ls, mapRowToLinha(json.row)]);
  }

  async function removeLinha(id: string) {
    setLinhas((ls) => ls.filter((l) => l.id !== id));
    await fetch(`/api/admin/plano-negocio/financas/${id}`, { method: "DELETE" }).catch(() => {});
  }

  function handleInvestimentoChange(v: number) {
    setInvestimentoInicial(v);
    if (investimentoTimer.current) clearTimeout(investimentoTimer.current);
    investimentoTimer.current = setTimeout(() => {
      fetch("/api/admin/plano-negocio/financas", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ investimento_inicial: v }),
      }).catch(() => {});
    }, 600);
  }

  return (
    <div className="space-y-8">
      {/* Investimento inicial + resumo */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 flex flex-wrap items-end gap-6">
        <div>
          <label className="block text-white/60 text-[0.75rem] font-mono uppercase tracking-wider mb-1.5">
            Investimento inicial (R$)
          </label>
          <input
            type="number"
            className={`${inputCls} w-48`}
            value={investimentoInicial}
            onChange={(e) => handleInvestimentoChange(Number(e.target.value) || 0)}
          />
        </div>
        <div className="flex flex-wrap gap-6">
          <div>
            <p className="text-white/45 text-[0.6875rem] font-mono uppercase tracking-wider">Ponto de equilíbrio</p>
            <p className="text-white text-[1.125rem] font-display">
              {projecao.breakevenAno ?? "não atingido no período"}
            </p>
          </div>
          <div>
            <p className="text-white/45 text-[0.6875rem] font-mono uppercase tracking-wider">Payback</p>
            <p className="text-white text-[1.125rem] font-display">
              {projecao.paybackMeses != null ? `${projecao.paybackMeses.toFixed(1)} meses` : "não atingido no período"}
            </p>
          </div>
        </div>
      </div>

      {/* Seções por tipo de linha */}
      {TIPOS.map((tipoInfo) => {
        const linhasDoTipo = linhas.filter((l) => l.tipo === tipoInfo.id).sort((a, b) => a.ordem - b.ordem);
        return (
          <div key={tipoInfo.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-white text-[1.125rem]">{tipoInfo.label}</h2>
              <button
                type="button"
                onClick={() => addLinha(tipoInfo.id)}
                className="-m-2 inline-flex items-center gap-1.5 min-h-11 px-2 text-[0.8125rem] font-medium text-[rgb(var(--color-brand-mint))] hover:opacity-80"
              >
                <Plus className="size-4" /> Nova rubrica
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="text-white/45 text-[0.6875rem] font-mono uppercase tracking-wider">
                    <th className="pb-2 pr-3 font-medium">Área / Rubrica</th>
                    {tipoInfo.id === "receita" && <th className="pb-2 pr-3 font-medium">Linha de negócio</th>}
                    <th className="pb-2 pr-3 font-medium">Modo</th>
                    {ANOS_PLANEJAMENTO.map((ano) => (
                      <th key={ano} className="pb-2 pr-3 font-medium text-right">
                        {ano}
                      </th>
                    ))}
                    <th className="pb-2" />
                  </tr>
                </thead>
                <tbody>
                  {linhasDoTipo.map((linha) => (
                    <tr key={linha.id} className="border-t border-white/5 align-top">
                      <td className="py-2 pr-3">
                        <input
                          className={`${inputCls} mb-1`}
                          value={linha.macroArea}
                          onChange={(e) => patchLinha(linha.id, { macroArea: e.target.value })}
                          placeholder="Macro área"
                        />
                        <input
                          className={inputCls}
                          value={linha.rubrica}
                          onChange={(e) => patchLinha(linha.id, { rubrica: e.target.value })}
                          placeholder="Rubrica"
                        />
                      </td>
                      {tipoInfo.id === "receita" && (
                        <td className="py-2 pr-3">
                          <select
                            className={inputCls}
                            value={linha.linhaNegocio ?? ""}
                            onChange={(e) => patchLinha(linha.id, { linhaNegocio: (e.target.value || null) as LinhaDeNegocioId | null })}
                          >
                            {LINHAS_DE_NEGOCIO.map((ln) => (
                              <option key={ln.id} value={ln.id}>
                                {ln.label}
                              </option>
                            ))}
                          </select>
                        </td>
                      )}
                      <td className="py-2 pr-3">
                        <select
                          className={`${inputCls} mb-1`}
                          value={linha.modo}
                          onChange={(e) => patchLinha(linha.id, { modo: e.target.value as ModoLinha })}
                        >
                          {MODOS.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.label}
                            </option>
                          ))}
                        </select>
                        {linha.modo === "clientes_x_ticket" && (
                          <div className="flex gap-1">
                            <input
                              type="number"
                              className={inputCls}
                              value={linha.ticketMedio ?? 0}
                              onChange={(e) => patchLinha(linha.id, { ticketMedio: Number(e.target.value) || 0 })}
                              placeholder="Ticket médio R$"
                              title="Ticket médio anual (R$)"
                            />
                            <input
                              type="number"
                              className={inputCls}
                              value={linha.reajusteTicketPct ?? 0}
                              onChange={(e) => patchLinha(linha.id, { reajusteTicketPct: Number(e.target.value) || 0 })}
                              placeholder="Reajuste % a.a."
                              title="Reajuste anual do ticket (%)"
                            />
                          </div>
                        )}
                        {linha.modo === "percentual_receita" && (
                          <input
                            type="number"
                            className={inputCls}
                            value={linha.percentualReceitaPct ?? 0}
                            onChange={(e) => patchLinha(linha.id, { percentualReceitaPct: Number(e.target.value) || 0 })}
                            placeholder="% da receita"
                          />
                        )}
                      </td>
                      {ANOS_PLANEJAMENTO.map((ano) => (
                        <td key={ano} className="py-2 pr-3">
                          {linha.modo === "percentual_receita" ? (
                            <span className="text-white/30 text-[0.8125rem] block text-right pr-1">calculado</span>
                          ) : (
                            <input
                              type="number"
                              className={`${inputCls} text-right`}
                              value={linha.valoresPorAno[ano] ?? 0}
                              onChange={(e) => patchAno(linha, ano, Number(e.target.value) || 0)}
                              title={linha.modo === "clientes_x_ticket" ? "Número de clientes no ano" : "Valor em R$ no ano"}
                            />
                          )}
                        </td>
                      ))}
                      <td className="py-2">
                        <button
                          type="button"
                          onClick={() => removeLinha(linha.id)}
                          aria-label="Remover rubrica"
                          className="size-11 inline-flex items-center justify-center rounded-lg text-white/40 hover:text-red-400 hover:bg-white/5"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {linhasDoTipo.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-4 text-white/35 text-[0.8125rem]">
                        Nenhuma rubrica ainda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {/* Receita por linha de negócio */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
        <h2 className="font-display text-white text-[1.125rem] mb-4">Receita por linha de negócio</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="text-white/45 text-[0.6875rem] font-mono uppercase tracking-wider">
                <th className="pb-2 pr-3 font-medium">Linha</th>
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
      </div>

      {/* DRE resumido */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
        <h2 className="font-display text-white text-[1.125rem] mb-4">Resultado consolidado</h2>
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
                <td className="py-2 pr-3 text-white/70">Custos fixos</td>
                {projecao.anos.map((a) => (
                  <td key={a.ano} className="py-2 pr-3 text-right text-white/60">
                    {formatBRL(a.custosFixos)}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-white/5">
                <td className="py-2 pr-3 text-white/70">Custos variáveis</td>
                {projecao.anos.map((a) => (
                  <td key={a.ano} className="py-2 pr-3 text-right text-white/60">
                    {formatBRL(a.custosVariaveis)}
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
              <tr className="border-t border-white/5">
                <td className="py-2 pr-3 text-white/50">Resultado acumulado</td>
                {projecao.anos.map((a) => (
                  <td key={a.ano} className="py-2 pr-3 text-right text-white/50">
                    {formatBRL(a.resultadoAcumulado)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
