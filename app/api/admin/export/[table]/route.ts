import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import ExcelJS from "exceljs";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TableMeta = {
  label: string;
  sheetName: string;
  realTable?: string;
  filter?: string;
  /** Select customizado com joins PostgREST (ex: col1,col2,outra_tabela!inner(col)) */
  customSelect?: string;
  /** Chave da relação embutida a ser "achatada" no row — prefixada com escola_ */
  flattenRelation?: string;
  /** Ordem explícita das colunas (sobrepõe o sort automático) */
  columnOrder?: string[];
};

const ALLOWED_TABLES: Record<string, TableMeta> = {
  leads_escola: { label: "Leads (escolas)", sheetName: "Leads" },
  diagnostico_escola: { label: "Diagnósticos", sheetName: "Diagnósticos" },
  diagnostico_completos: {
    label: "Diagnósticos Completos",
    sheetName: "Diagnósticos Completos",
    realTable: "diagnostico_escola",
    filter: "status=eq.diagnostico_completo",
  },
  respostas_completas: {
    label: "Respostas dos Diagnósticos",
    sheetName: "Respostas",
    realTable: "diagnostico_respostas",
    customSelect:
      "id,created_at,bloco,pergunta_id,tipo,valor_texto,valor_escala,valor_opcoes,diagnostico_escola!inner(nome_escola,nome_respondente,email,cidade,uf)",
    filter: "diagnostico_escola.status=eq.diagnostico_completo",
    flattenRelation: "diagnostico_escola",
    columnOrder: [
      "escola_nome_escola",
      "escola_nome_respondente",
      "escola_email",
      "escola_cidade",
      "escola_uf",
      "bloco",
      "pergunta_id",
      "tipo",
      "valor_texto",
      "valor_escala",
      "valor_opcoes",
      "created_at",
      "id",
    ],
  },
  diagnostico_respostas: { label: "Respostas do diagnóstico", sheetName: "Respostas" },
  pdf_downloads: { label: "Downloads do Ebook", sheetName: "Downloads" },
};

const ORDER_BY: Record<string, string> = {
  leads_escola: "created_at.desc",
  diagnostico_escola: "created_at.desc",
  diagnostico_completos: "created_at.desc",
  respostas_completas: "bloco.asc,pergunta_id.asc",
  diagnostico_respostas: "diagnostico_id.asc,bloco.asc,pergunta_id.asc",
  pdf_downloads: "created_at.desc",
};

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
  utm_source: "UTM Source",
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
  // chaves achatadas do join com diagnostico_escola
  escola_nome_escola: "Escola",
  escola_nome_respondente: "Respondente",
  escola_email: "E-mail",
  escola_cidade: "Cidade",
  escola_uf: "UF",
};

function formatCell(value: any): any {
  if (value == null) return "";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") {
    try { return JSON.stringify(value); } catch { return String(value); }
  }
  return value;
}

/** Achata a relação embutida pelo PostgREST (objeto aninhado) prefixando as chaves com "escola_". */
function flattenRows(rows: any[], relationKey: string): any[] {
  return rows.map((row) => {
    const nested = row[relationKey];
    if (!nested || typeof nested !== "object") return row;
    const { [relationKey]: _drop, ...rest } = row;
    const prefixed: Record<string, any> = {};
    Object.entries(nested).forEach(([k, v]) => { prefixed[`escola_${k}`] = v; });
    return { ...prefixed, ...rest };
  });
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ table: string }> },
) {
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

  const order = ORDER_BY[table] || "created_at.desc";
  const realTable = tableMeta.realTable || table;
  const selectParam = tableMeta.customSelect ? encodeURIComponent(tableMeta.customSelect) : "*";
  const extraFilter = tableMeta.filter ? `&${tableMeta.filter}` : "";
  const url = `${supabaseUrl}/rest/v1/${realTable}?select=${selectParam}&order=${encodeURIComponent(order)}&limit=10000${extraFilter}`;

  const sbRes = await fetch(url, {
    headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
    cache: "no-store",
  });

  if (!sbRes.ok) {
    const txt = await sbRes.text().catch(() => "");
    console.error("[admin/export] supabase error:", sbRes.status, txt);
    return NextResponse.json({ ok: false, error: "SupabaseError", details: txt }, { status: 502 });
  }

  let rows: any[] = await sbRes.json().catch(() => []);

  if (tableMeta.flattenRelation) {
    rows = flattenRows(rows, tableMeta.flattenRelation);
  }

  // Descobre colunas
  const allKeys = new Set<string>();
  rows.forEach((r) => { if (r && typeof r === "object") Object.keys(r).forEach((k) => allKeys.add(k)); });

  let orderedKeys: string[];
  if (tableMeta.columnOrder) {
    // Usa a ordem explícita, mantendo apenas as chaves que existem no resultado
    orderedKeys = [
      ...tableMeta.columnOrder.filter((k) => allKeys.has(k)),
      ...Array.from(allKeys).filter((k) => !tableMeta.columnOrder!.includes(k)).sort(),
    ];
  } else {
    orderedKeys = [
      "id",
      "created_at",
      ...Array.from(allKeys).filter((k) => !["id", "created_at", "updated_at", "updated_by"].includes(k)).sort(),
      "updated_at",
      "updated_by",
    ].filter((k) => allKeys.has(k));
  }

  const workbook = new ExcelJS.Workbook();
  workbook.creator = `WeMake Admin · ${session.username}`;
  workbook.created = new Date();
  const sheet = workbook.addWorksheet(tableMeta.sheetName, {
    views: [{ state: "frozen", ySplit: 1 }],
  });

  sheet.columns = orderedKeys.map((key) => ({
    header: COLUMN_LABELS[key] || key,
    key,
    width: Math.max(14, Math.min(40, (COLUMN_LABELS[key] || key).length + 6)),
  }));

  const headerRow = sheet.getRow(1);
  headerRow.height = 22;
  headerRow.eachCell((cell) => {
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF76F3CD" } };
    cell.font = { bold: true, color: { argb: "FF0B1F44" }, size: 11 };
    cell.alignment = { vertical: "middle", horizontal: "left" };
    cell.border = { bottom: { style: "thin", color: { argb: "FF0B1F44" } } };
  });

  rows.forEach((row) => {
    const cellMap: Record<string, any> = {};
    orderedKeys.forEach((k) => { cellMap[k] = formatCell(row?.[k]); });
    const r = sheet.addRow(cellMap);
    orderedKeys.forEach((k, idx) => {
      const cell = r.getCell(idx + 1);
      if ((k === "created_at" || k === "updated_at") && row?.[k]) {
        try { cell.value = new Date(row[k]); cell.numFmt = "dd/mm/yyyy hh:mm"; } catch { /* keep string */ }
      }
    });
  });

  orderedKeys.forEach((key, idx) => {
    const col = sheet.getColumn(idx + 1);
    let maxLen = (COLUMN_LABELS[key] || key).length;
    rows.forEach((row) => {
      const len = String(formatCell(row?.[key]) ?? "").length;
      if (len > maxLen) maxLen = len;
    });
    col.width = Math.min(60, Math.max(12, maxLen + 4));
  });

  for (let i = 2; i <= sheet.rowCount; i++) {
    if (i % 2 === 0) {
      sheet.getRow(i).eachCell((cell) => {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF8FAFC" } };
      });
    }
  }

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
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
