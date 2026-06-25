import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import ExcelJS from "exceljs";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/admin/export/<table>
 *
 * Exporta a tabela inteira como XLSX bem formatado:
 * - Header verde-mint com fonte branca bold
 * - Linha congelada no topo
 * - Larguras de coluna ajustadas
 * - Datas formatadas pt-BR
 * - Arrays renderizados como CSV inline (ex: segmentos)
 * - Nome de arquivo: <table>-YYYY-MM-DD.xlsx
 */

const ALLOWED_TABLES: Record<string, { label: string; sheetName: string; realTable?: string; filter?: string }> = {
  leads_escola: { label: "Leads (escolas)", sheetName: "Leads" },
  diagnostico_escola: { label: "Diagnósticos", sheetName: "Diagnósticos" },
  diagnostico_completos: {
    label: "Diagnósticos Completos",
    sheetName: "Diagnósticos Completos",
    realTable: "diagnostico_escola",
    filter: "status=eq.diagnostico_completo",
  },
  diagnostico_respostas: { label: "Respostas do diagnóstico", sheetName: "Respostas" },
  pdf_downloads: { label: "Downloads do Ebook", sheetName: "Downloads" },
};

// Coluna preferida pra ordenar (descendente)
const ORDER_BY: Record<string, string> = {
  leads_escola: "created_at.desc",
  diagnostico_escola: "created_at.desc",
  diagnostico_completos: "created_at.desc",
  diagnostico_respostas: "diagnostico_id.asc,bloco.asc,pergunta_id.asc",
  pdf_downloads: "created_at.desc",
};

// Headers amigáveis (label visível na planilha)
const COLUMN_LABELS: Record<string, string> = {
  id: "ID",
  created_at: "Criado em",
  updated_at: "Atualizado em",
  updated_by: "Atualizado por",
  // leads_escola
  nome: "Escola",
  cidade: "Cidade",
  uf: "UF",
  rep_legal_nome: "Responsável",
  rep_legal_email: "E-mail",
  rep_legal_tel: "Telefone",
  origem: "Origem",
  status_lead: "Status",
  observacoes: "Observações",
  // diagnostico_escola
  nome_escola: "Escola",
  nome_respondente: "Respondente",
  funcao: "Função",
  email: "E-mail",
  whatsapp: "WhatsApp",
  telefone: "Telefone",
  segmentos: "Segmentos",
  num_alunos: "Nº alunos",
  maior_turma: "Maior turma",
  eh_confessional: "Confessional?",
  tradicao_confessional: "Tradição",
  cargo_qualificado: "Cargo (qualif.)",
  espaco_maker: "Espaço maker",
  tamanho_escola: "Tamanho",
  consent: "Consentimento LGPD",
  status: "Status",
  // pdf_downloads
  nome_contato: "Nome",
  cargo: "Cargo",
  material: "Material",
  fluxo: "Origem / Fluxo",
  utm_campaign: "UTM Campaign",
  utm_medium: "UTM Medium",
  fbclid: "FBCLID",
  // diagnostico_respostas
  diagnostico_id: "Diagnóstico ID",
  bloco: "Bloco",
  pergunta_id: "Pergunta ID",
  tipo: "Tipo",
  valor_texto: "Resposta (texto)",
  valor_escala: "Resposta (escala 1-5)",
  valor_opcoes: "Resposta (opções)",
};

function formatCell(value: any): any {
  if (value == null) return "";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return value;
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ table: string }> },
) {
  // Auth (middleware já filtra mas reforçamos)
  const cookieStore = await cookies();
  const session = await verifySession(cookieStore.get(ADMIN_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { table } = await ctx.params;
  const tableMeta = ALLOWED_TABLES[table];
  if (!tableMeta) {
    return NextResponse.json({ ok: false, error: "TableNotAllowed" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ ok: false, error: "SupabaseNotConfigured" }, { status: 500 });
  }

  // Busca todos os registros (limite alto pra cobrir tudo)
  const order = ORDER_BY[table] || "created_at.desc";
  const realTable = tableMeta.realTable || table;
  const extraFilter = tableMeta.filter ? `&${tableMeta.filter}` : "";
  const url = `${supabaseUrl}/rest/v1/${realTable}?select=*&order=${encodeURIComponent(order)}&limit=10000${extraFilter}`;
  const sbRes = await fetch(url, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
    cache: "no-store",
  });

  if (!sbRes.ok) {
    const txt = await sbRes.text().catch(() => "");
    console.error("[admin/export] supabase error:", sbRes.status, txt);
    return NextResponse.json({ ok: false, error: "SupabaseError", details: txt }, { status: 502 });
  }

  const rows: any[] = await sbRes.json().catch(() => []);

  // Descobre colunas a partir das chaves da primeira linha (ou usa um set padrão)
  const allKeys = new Set<string>();
  rows.forEach((r) => {
    if (r && typeof r === "object") Object.keys(r).forEach((k) => allKeys.add(k));
  });
  // Ordem preferencial: id, created_at, depois alfabético; updated_* no fim
  const orderedKeys = [
    "id",
    "created_at",
    ...Array.from(allKeys).filter(
      (k) => !["id", "created_at", "updated_at", "updated_by"].includes(k),
    ).sort(),
    "updated_at",
    "updated_by",
  ].filter((k) => allKeys.has(k));

  const workbook = new ExcelJS.Workbook();
  workbook.creator = `WeMake Admin · ${session.username}`;
  workbook.created = new Date();
  const sheet = workbook.addWorksheet(tableMeta.sheetName, {
    views: [{ state: "frozen", ySplit: 1 }],
  });

  // Define colunas
  sheet.columns = orderedKeys.map((key) => ({
    header: COLUMN_LABELS[key] || key,
    key,
    width: Math.max(14, Math.min(40, (COLUMN_LABELS[key] || key).length + 6)),
  }));

  // Estilo do header
  const headerRow = sheet.getRow(1);
  headerRow.height = 22;
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF76F3CD" }, // mint
    };
    cell.font = { bold: true, color: { argb: "FF0B1F44" }, size: 11 };
    cell.alignment = { vertical: "middle", horizontal: "left" };
    cell.border = {
      bottom: { style: "thin", color: { argb: "FF0B1F44" } },
    };
  });

  // Adiciona linhas
  rows.forEach((row) => {
    const cellMap: Record<string, any> = {};
    orderedKeys.forEach((k) => {
      cellMap[k] = formatCell(row?.[k]);
    });
    const r = sheet.addRow(cellMap);
    // Datas como número Excel
    orderedKeys.forEach((k, idx) => {
      const colIdx = idx + 1;
      const cell = r.getCell(colIdx);
      if ((k === "created_at" || k === "updated_at") && row?.[k]) {
        try {
          cell.value = new Date(row[k]);
          cell.numFmt = "dd/mm/yyyy hh:mm";
        } catch {
          /* keep string */
        }
      }
    });
  });

  // Auto-largura (mais robusta — mede caracteres dos valores)
  orderedKeys.forEach((key, idx) => {
    const col = sheet.getColumn(idx + 1);
    let maxLen = (COLUMN_LABELS[key] || key).length;
    rows.forEach((row) => {
      const v = formatCell(row?.[key]);
      const len = String(v ?? "").length;
      if (len > maxLen) maxLen = len;
    });
    col.width = Math.min(60, Math.max(12, maxLen + 4));
  });

  // Linhas zebradas (sutil)
  for (let i = 2; i <= sheet.rowCount; i++) {
    if (i % 2 === 0) {
      sheet.getRow(i).eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFF8FAFC" },
        };
      });
    }
  }

  // Filtro automático no header
  sheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: 1, column: orderedKeys.length },
  };

  const buffer = await workbook.xlsx.writeBuffer();
  const today = new Date().toISOString().slice(0, 10);
  const filename = `${table}-${today}.xlsx`;

  return new NextResponse(buffer as any, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
