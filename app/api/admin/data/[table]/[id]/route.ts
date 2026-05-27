import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET    /api/admin/data/<table>/<id>  — busca registro (ou lista resp. por diag_id)
 * PATCH  /api/admin/data/<table>/<id>  — atualiza campos permitidos
 * DELETE /api/admin/data/<table>/<id>  — exclui registro (cascade em diagnostico_escola)
 *
 * Tabelas: leads_escola, diagnostico_escola, diagnostico_respostas
 */

const READ_TABLES = new Set([
  "leads_escola",
  "diagnostico_escola",
  "diagnostico_respostas",
]);

/* Campos editáveis por tabela — qualquer outro é ignorado no PATCH */
const EDITABLE_FIELDS: Record<string, string[]> = {
  leads_escola: [
    "nome",
    "cidade",
    "uf",
    "rep_legal_nome",
    "rep_legal_email",
    "rep_legal_tel",
    "origem",
    "status_lead",
    "observacoes",
  ],
  diagnostico_escola: [
    "nome_escola",
    "cidade",
    "uf",
    "nome_respondente",
    "funcao",
    "email",
    "whatsapp",
    "telefone",
    "segmentos",
    "num_alunos",
    "eh_confessional",
    "tradicao_confessional",
    "cargo_qualificado",
    "espaco_maker",
    "tamanho_escola",
    "origem",
    "status",
    "observacoes",
  ],
};

const DELETABLE_TABLES = new Set(["leads_escola", "diagnostico_escola"]);

async function requireSession() {
  const cookieStore = await cookies();
  return verifySession(cookieStore.get(ADMIN_COOKIE)?.value);
}

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) return null;
  return { supabaseUrl, supabaseKey };
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ table: string; id: string }> },
) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const { table, id } = await ctx.params;
  if (!READ_TABLES.has(table)) {
    return NextResponse.json({ ok: false, error: "TableNotAllowed" }, { status: 400 });
  }

  const sb = getSupabase();
  if (!sb) return NextResponse.json({ ok: false, error: "SupabaseNotConfigured" }, { status: 500 });

  const filterCol = table === "diagnostico_respostas" ? "diagnostico_id" : "id";
  const orderClause = table === "diagnostico_respostas" ? "&order=bloco.asc,pergunta_id.asc" : "";

  const url = `${sb.supabaseUrl}/rest/v1/${table}?${filterCol}=eq.${encodeURIComponent(id)}&select=*${orderClause}`;
  const res = await fetch(url, {
    headers: {
      apikey: sb.supabaseKey,
      Authorization: `Bearer ${sb.supabaseKey}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "SupabaseError" }, { status: 502 });
  }
  const rows = await res.json();
  if (table === "diagnostico_respostas") {
    return NextResponse.json({ ok: true, rows });
  }
  return NextResponse.json({ ok: true, row: rows?.[0] ?? null });
}

/* Schema PATCH é lax — aceita qualquer chave; filtramos depois pela allowlist */
const patchSchema = z.record(z.string(), z.any());

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ table: string; id: string }> },
) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const { table, id } = await ctx.params;
  const editable = EDITABLE_FIELDS[table];
  if (!editable) {
    return NextResponse.json({ ok: false, error: "TableNotEditable" }, { status: 400 });
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "ValidationError", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  // Filtra somente campos permitidos
  const update: Record<string, unknown> = {};
  for (const key of editable) {
    if (key in parsed.data) {
      const value = parsed.data[key];
      // Normaliza: string vazia vira null em colunas opcionais
      update[key] = value === "" ? null : value;
    }
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ ok: false, error: "NoFieldsToUpdate" }, { status: 400 });
  }

  // Trilha de auditoria
  update["updated_by"] = session.username;
  update["updated_at"] = new Date().toISOString();

  const sb = getSupabase();
  if (!sb) return NextResponse.json({ ok: false, error: "SupabaseNotConfigured" }, { status: 500 });

  const url = `${sb.supabaseUrl}/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey: sb.supabaseKey,
      Authorization: `Bearer ${sb.supabaseKey}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify(update),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[admin/data PATCH] supabase error:", res.status, text);
    return NextResponse.json({ ok: false, error: "SupabaseError", details: text }, { status: 502 });
  }

  const rows = await res.json();
  return NextResponse.json({ ok: true, row: rows?.[0] ?? null });
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ table: string; id: string }> },
) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const { table, id } = await ctx.params;
  if (!DELETABLE_TABLES.has(table)) {
    return NextResponse.json({ ok: false, error: "TableNotDeletable" }, { status: 400 });
  }

  const sb = getSupabase();
  if (!sb) return NextResponse.json({ ok: false, error: "SupabaseNotConfigured" }, { status: 500 });

  // Pra diagnostico_escola, apaga primeiro as respostas (caso FK nao tenha cascade)
  if (table === "diagnostico_escola") {
    const delRespUrl = `${sb.supabaseUrl}/rest/v1/diagnostico_respostas?diagnostico_id=eq.${encodeURIComponent(id)}`;
    const delResp = await fetch(delRespUrl, {
      method: "DELETE",
      headers: {
        apikey: sb.supabaseKey,
        Authorization: `Bearer ${sb.supabaseKey}`,
        Prefer: "return=minimal",
      },
    });
    if (!delResp.ok) {
      const text = await delResp.text().catch(() => "");
      // Nao falha aqui — pode nao ter respostas pra apagar
      console.warn("[admin/data DELETE] respostas warn:", delResp.status, text);
    }
  }

  const url = `${sb.supabaseUrl}/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      apikey: sb.supabaseKey,
      Authorization: `Bearer ${sb.supabaseKey}`,
      Prefer: "return=minimal",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[admin/data DELETE] supabase error:", res.status, text);
    return NextResponse.json({ ok: false, error: "SupabaseError", details: text }, { status: 502 });
  }

  return NextResponse.json({ ok: true, deleted_by: session.username });
}
