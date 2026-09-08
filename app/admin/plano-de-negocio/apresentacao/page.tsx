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
 * pelo usuário, que confirmou cidade das escolas do Paraná, Ceará, Paraíba,
 * São Paulo e Santa Catarina. 21 das 23 escolas já têm cidade/UF confirmados;
 * as 2 restantes ainda não entram aqui para não inventar dado.
 */
const ESCOLAS_POR_ESTADO: Record<string, number> = {
  PR: 8, // Educar Londrina, Colégio Lighthouse (Campo Largo), Escola Supremo (Curitiba), Colégio Graciosa (Quatro Barras), Escola Cristã do Reino (Campo Mourão), Colégio Journey (Curitiba), Escola Aprender e Viver (Curitiba), Sagrados Corações (Jacarezinho)
  SP: 3, // ACR Classical Christian School (São Bernardo do Campo), Colégio Cristão Zoe (Guarulhos), Escola Cristã Paz (Itapetininga)
  SC: 2, // Colégio Cristão Amar (Itajaí), For Life School (Florianópolis)
  PB: 2, // Executivo Colégio e Curso (Guarabira), Centro Educacional Sonho de Eloi (Ingá)
  ES: 1, // Primeiro o Reino (Vitória)
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
      <header className="mb-4 sm:mb-6">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-mint))]/90 font-bold mb-2">
          Plano de negócio · We Make · 2027–2031
        </p>
        <h1 className="font-display text-white text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.1]">
          Apresentação para investidor
        </h1>
        <p className="text-white/55 text-[0.875rem] sm:text-sm mt-1.5 max-w-2xl">
          Use as setas do teclado, arraste no celular ou clique nas bolinhas para navegar. O ícone no canto
          superior direito abre em tela cheia. Os números financeiros vêm direto de{" "}
          <span className="text-[rgb(var(--color-brand-mint))]">/admin/plano-de-negocio/financeiro</span>.
        </p>
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
