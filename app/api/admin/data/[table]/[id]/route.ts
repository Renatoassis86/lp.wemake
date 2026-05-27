import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/admin/data/<table>/<id> — busca um registro.
 *  - leads_escola, diagnostico_escola: por id direto.
 *  - diagnostico_respostas: lista as respostas de UM diagnostico (id = diagnostico_id).
 *
 * PATCH /api/admin/data/<table>/<id> — atualiza campos permitidos.
 *  - leads_escola: status_lead, observacoes
 *  - diagnostico_escola: status, observacoes
 */

const READ_TABLES = new Set([
  "leads_escola",
  "diagnostico_escola",
  "diagnostico_respostas",
]);

const EDITABLE_FIELDS: Record<string, string[]> = {
  leads_escola: ["status_lead", "observacoes"],
  diagnostico_escola: ["status", "observacoes"],
};

const ALLOWED_STATUS_LEAD = [
  "novo",
  "contatado",
  "qualificado",
  "agendado",
  "fechado",
  "descartado",
];
const ALLOWED_STATUS_DIAG = [
  "lead_capturado",
  "lead_qualificado",
  "diagnostico_completo",
  "contatado",
  "agendado",
  "fechado",
  "descartado",
];

const patchSchema = z.object({
  status_lead: z.enum(ALLOWED_STATUS_LEAD as [string, ...string[]]).optional(),
  status: z.enum(ALLOWED_STATUS_DIAG as [string, ...string[]]).optional(),
  observacoes: z.string().max(2000).optional().nullable(),
});

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

  // diagnostico_respostas: busca por diagnostico_id (1 diagnostico -> N respostas)
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
  // Para tabelas 1-row, retorna primeiro item. Para respostas, retorna array.
  if (table === "diagnostico_respostas") {
    return NextResponse.json({ ok: true, rows });
  }
  return NextResponse.json({ ok: true, row: rows?.[0] ?? null });
}

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

  // Filtra somente campos permitidos para a tabela
  const update: Record<string, unknown> = {};
  for (const key of editable) {
    if (key in parsed.data) {
      // @ts-expect-error indexar Zod parsed shape
      update[key] = parsed.data[key];
    }
  }
  // Trilha de auditoria
  update["updated_by"] = session.username;
  update["updated_at"] = new Date().toISOString();

  if (Object.keys(update).length === 2) {
    return NextResponse.json({ ok: false, error: "NoFieldsToUpdate" }, { status: 400 });
  }

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
