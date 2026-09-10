import { readFileSync } from "fs";
import { join } from "path";
import { ApresentacaoPlano, type AnoProjetado } from "@/features/admin/apresentacao/apresentacao-plano";
import type { GeoBrasil } from "@/features/admin/apresentacao/visuais";
import {
  ANOS_PLANEJAMENTO,
  calcularProjecaoFinanceira,
  type LinhaFinanceira,
  type TipoLinha,
  type ModoLinha,
} from "@/lib/plano-financas-calculo";
import type { LinhaDeNegocioId } from "@/data/plano-negocio-perguntas";

export const dynamic = "force-dynamic";

/**
 * Distribuição real das 23 escolas do orçamento 2027 por estado. Base: cadastro
 * do CRM comercial (app_comercial_We Make) e o slide "Onde estamos?" enviado
 * pelo usuário. Corrigido em 2026-09-10 por revisão direta do Dênis: não há
 * escola no ES (removida), SP tem 5 (não 3) e SC tem 3 (não 2) — os nomes das
 * escolas adicionais em SP/SC ainda não foram informados, por isso não estão
 * listados nos comentários abaixo (só o total, pra não inventar atribuição).
 * 22 das 23 escolas já têm UF confirmada; 1 restante ainda não entra aqui.
 */
const ESCOLAS_POR_ESTADO: Record<string, number> = {
  PR: 8, // Educar Londrina, Colégio Lighthouse (Campo Largo), Escola Supremo (Curitiba), Colégio Graciosa (Quatro Barras), Escola Cristã do Reino (Campo Mourão), Colégio Journey (Curitiba), Escola Aprender e Viver (Curitiba), Sagrados Corações (Jacarezinho)
  SP: 5, // inclui ACR Classical Christian School (São Bernardo do Campo), Colégio Cristão Zoe (Guarulhos), Escola Cristã Paz (Itapetininga) + 2 escolas ainda sem nome/cidade confirmados
  SC: 3, // inclui Colégio Cristão Amar (Itajaí), For Life School (Florianópolis) + 1 escola ainda sem nome/cidade confirmados
  PB: 2, // Executivo Colégio e Curso (Guarabira), Centro Educacional Sonho de Eloi (Ingá)
  MA: 1, // Escola Estímulos (São Mateus do Maranhão)
  RS: 1, // Colégio/Instituto Reverendo Olavo Nunes (Porto Alegre)
  RN: 1, // Bee Christian School (Natal/Parnamirim)
  CE: 1, // Centro de Ensino Ágape (Milagres)
};

const ESTADOS_COM_LEI_PROPRIA: Record<string, number> = { DF: 1, SP: 1, MG: 1, PR: 1, RS: 1 };

function carregarGeoBrasil(): GeoBrasil | null {
  try {
    const raw = readFileSync(join(process.cwd(), "public/data/brasil-uf.geojson"), "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function fetchFinancas() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) return { linhas: [] as LinhaFinanceira[], investimentoInicial: 0 };

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

  return { linhas, investimentoInicial };
}

export default async function ApresentacaoPlanoDeNegocioPage() {
  const [{ linhas, investimentoInicial }, geoBrasil] = await Promise.all([
    fetchFinancas(),
    Promise.resolve(carregarGeoBrasil()),
  ]);
  const projecao = calcularProjecaoFinanceira(linhas, investimentoInicial);

  const anos: AnoProjetado[] = ANOS_PLANEJAMENTO.map((ano) => {
    const a = projecao.anos.find((p) => p.ano === ano);
    return { ano, receita: a?.receitaBruta ?? 0, resultado: a?.resultadoLiquido ?? 0, margemPct: a?.margemLiquidaPct ?? 0 };
  });

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
      </header>

      <div className="rounded-2xl overflow-hidden border border-white/10">
        <ApresentacaoPlano
          anos={anos}
          geoBrasil={geoBrasil}
          escolasPorEstado={ESCOLAS_POR_ESTADO}
          estadosComLeiPropria={ESTADOS_COM_LEI_PROPRIA}
        />
      </div>
    </div>
  );
}
