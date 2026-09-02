import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) return null;
  return { supabaseUrl, supabaseKey };
}

async function requireSession() {
  const cookieStore = await cookies();
  return verifySession(cookieStore.get(ADMIN_COOKIE)?.value);
}

const patchSchema = z.object({
  tipo: z.enum(["receita", "custo_fixo", "custo_variavel"]).optional(),
  modo: z.enum(["valor", "clientes_x_ticket", "percentual_receita"]).optional(),
  macro_area: z.string().min(1).max(150).optional(),
  rubrica: z.string().min(1).max(200).optional(),
  linha_negocio: z.enum(["curriculo-maker", "formacao-docente", "plataforma", "espaco-maker", "assessoria"]).nullable().optional(),
  ticket_medio: z.number().nullable().optional(),
  reajuste_ticket_pct: z.number().nullable().optional(),
  percentual_receita_pct: z.number().nullable().optional(),
  valores_por_ano: z.record(z.string(), z.number()).optional(),
  ordem: z.number().optional(),
});

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = patchSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "ValidationError", issues: parsed.error.issues }, { status: 422 });
  }

  const sb = getSupabase();
  if (!sb) return NextResponse.json({ ok: false, error: "SupabaseNotConfigured" }, { status: 500 });

  const res = await fetch(`${sb.supabaseUrl}/rest/v1/plano_financas_linhas?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey: sb.supabaseKey,
      Authorization: `Bearer ${sb.supabaseKey}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      ...parsed.data,
      updated_by: session.username,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ ok: false, error: "SupabaseError", details: text }, { status: 502 });
  }
  const rows = await res.json();
  return NextResponse.json({ ok: true, row: rows?.[0] ?? null });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const sb = getSupabase();
  if (!sb) return NextResponse.json({ ok: false, error: "SupabaseNotConfigured" }, { status: 500 });

  const res = await fetch(`${sb.supabaseUrl}/rest/v1/plano_financas_linhas?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: {
      apikey: sb.supabaseKey,
      Authorization: `Bearer ${sb.supabaseKey}`,
      Prefer: "return=minimal",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ ok: false, error: "SupabaseError", details: text }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
