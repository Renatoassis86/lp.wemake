import { LINHAS_DE_NEGOCIO, type LinhaDeNegocioId } from "@/data/plano-negocio-perguntas";

/** Horizonte de planejamento do plano de negócio da We Make. */
export const ANOS_PLANEJAMENTO = [2027, 2028, 2029, 2030, 2031] as const;
export type AnoPlanejamento = (typeof ANOS_PLANEJAMENTO)[number];

export type TipoLinha = "receita" | "custo_fixo" | "custo_variavel";
export type ModoLinha = "valor" | "clientes_x_ticket" | "percentual_receita";

export interface LinhaFinanceira {
  id: string;
  tipo: TipoLinha;
  modo: ModoLinha;
  macroArea: string;
  rubrica: string;
  /** Linha de negócio da We Make a que esta rubrica pertence (obrigatório para receita). */
  linhaNegocio?: LinhaDeNegocioId | null;
  ticketMedio?: number | null;
  reajusteTicketPct?: number | null;
  percentualReceitaPct?: number | null;
  valoresPorAno: Partial<Record<AnoPlanejamento, number>>;
  ordem: number;
}

export interface ProjecaoAno {
  ano: AnoPlanejamento;
  receitaPorLinha: Record<LinhaDeNegocioId, number>;
  receitaBruta: number;
  custosFixos: number;
  custosVariaveis: number;
  custosTotais: number;
  resultadoLiquido: number;
  margemLiquidaPct: number;
  resultadoAcumulado: number;
}

export interface ResultadoProjecao {
  anos: ProjecaoAno[];
  paybackMeses: number | null;
  breakevenAno: AnoPlanejamento | null;
}

function anoIndex(ano: AnoPlanejamento): number {
  return ANOS_PLANEJAMENTO.indexOf(ano);
}

function receitaVaziaPorLinha(): Record<LinhaDeNegocioId, number> {
  return Object.fromEntries(LINHAS_DE_NEGOCIO.map((l) => [l.id, 0])) as Record<LinhaDeNegocioId, number>;
}

function valorReceitaNoAno(linha: LinhaFinanceira, ano: AnoPlanejamento): number {
  if (linha.modo === "clientes_x_ticket") {
    const clientes = linha.valoresPorAno[ano] ?? 0;
    const idx = anoIndex(ano);
    const ticketBase = linha.ticketMedio ?? 0;
    const reajuste = linha.reajusteTicketPct ?? 0;
    const ticket = ticketBase * Math.pow(1 + reajuste / 100, idx);
    return clientes * ticket;
  }
  return linha.valoresPorAno[ano] ?? 0;
}

function valorCustoNoAno(linha: LinhaFinanceira, ano: AnoPlanejamento, receitaBrutaDoAno: number): number {
  if (linha.modo === "percentual_receita") {
    return receitaBrutaDoAno * ((linha.percentualReceitaPct ?? 0) / 100);
  }
  return linha.valoresPorAno[ano] ?? 0;
}

export function calcularProjecaoFinanceira(linhas: LinhaFinanceira[], investimentoInicial: number): ResultadoProjecao {
  const receitaLinhas = linhas.filter((l) => l.tipo === "receita");
  const fixosLinhas = linhas.filter((l) => l.tipo === "custo_fixo");
  const variaveisLinhas = linhas.filter((l) => l.tipo === "custo_variavel");

  const anos: ProjecaoAno[] = [];
  let resultadoAcumulado = -investimentoInicial;

  for (const ano of ANOS_PLANEJAMENTO) {
    const receitaPorLinha = receitaVaziaPorLinha();
    for (const l of receitaLinhas) {
      const valor = valorReceitaNoAno(l, ano);
      const linhaId = l.linhaNegocio ?? LINHAS_DE_NEGOCIO[0].id;
      receitaPorLinha[linhaId] = (receitaPorLinha[linhaId] ?? 0) + valor;
    }
    const receitaBruta = Object.values(receitaPorLinha).reduce((a, b) => a + b, 0);

    const custosFixos = fixosLinhas.reduce((acc, l) => acc + valorCustoNoAno(l, ano, receitaBruta), 0);
    const custosVariaveis = variaveisLinhas.reduce((acc, l) => acc + valorCustoNoAno(l, ano, receitaBruta), 0);
    const custosTotais = custosFixos + custosVariaveis;

    const resultadoLiquido = receitaBruta - custosTotais;
    const margemLiquidaPct = receitaBruta > 0 ? (resultadoLiquido / receitaBruta) * 100 : 0;

    resultadoAcumulado += resultadoLiquido;

    anos.push({ ano, receitaPorLinha, receitaBruta, custosFixos, custosVariaveis, custosTotais, resultadoLiquido, margemLiquidaPct, resultadoAcumulado });
  }

  const breakevenAno = anos.find((a) => a.resultadoLiquido > 0)?.ano ?? null;

  let paybackMeses: number | null = null;
  let acumuladoAnterior = -investimentoInicial;
  for (const a of anos) {
    if (acumuladoAnterior < 0 && a.resultadoAcumulado >= 0 && a.resultadoLiquido !== 0) {
      const fracaoDoAno = -acumuladoAnterior / a.resultadoLiquido;
      paybackMeses = anoIndex(a.ano) * 12 + fracaoDoAno * 12;
      break;
    }
    acumuladoAnterior = a.resultadoAcumulado;
  }

  return { anos, paybackMeses, breakevenAno };
}
