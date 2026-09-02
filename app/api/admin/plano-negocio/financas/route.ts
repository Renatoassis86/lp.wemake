import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Tabela financeira compartilhada do plano de negócio (não é por usuário — é a
 * mesma planilha pros três sócios lerem e editarem juntos). Qualquer sócio logado
 * pode criar/editar/excluir linhas e atualizar o investimento inicial.
 */

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

export async function GET() {
  const session = await requireSession();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const sb = getSupabase();
  if (!sb) return NextResponse.json({ ok: false, error: "SupabaseNotConfigured" }, { status: 500 });

  const [linhasRes, configRes] = await Promise.all([
    fetch(`${sb.supabaseUrl}/rest/v1/plano_financas_linhas?select=*&order=ordem.asc`, {
      headers: { apikey: sb.supabaseKey, Authorization: `Bearer ${sb.supabaseKey}` },
      cache: "no-store",
    }),
    fetch(`${sb.supabaseUrl}/rest/v1/plano_financas_config?select=*&limit=1`, {
      headers: { apikey: sb.supabaseKey, Authorization: `Bearer ${sb.supabaseKey}` },
      cache: "no-store",
    }),
  ]);

  if (!linhasRes.ok || !configRes.ok) {
    return NextResponse.json({ ok: false, error: "SupabaseError" }, { status: 502 });
  }

  const linhas = await linhasRes.json();
  const configRows = await configRes.json();
  return NextResponse.json({ ok: true, linhas, config: configRows?.[0] ?? null });
}

const linhaSchema = z.object({
  tipo: z.enum(["receita", "custo_fixo", "custo_variavel"]),
  modo: z.enum(["valor", "clientes_x_ticket", "percentual_receita"]),
  macro_area: z.string().min(1).max(150),
  rubrica: z.string().min(1).max(200),
  linha_negocio: z.enum(["curriculo-maker", "formacao-docente", "plataforma", "espaco-maker", "assessoria"]).nullable().optional(),
  ticket_medio: z.number().nullable().optional(),
  reajuste_ticket_pct: z.number().nullable().optional(),
  percentual_receita_pct: z.number().nullable().optional(),
  valores_por_ano: z.record(z.string(), z.number()).default({}),
  ordem: z.number().default(0),
});

export async function POST(req: Request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = linhaSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "ValidationError", issues: parsed.error.issues }, { status: 422 });
  }

  const sb = getSupabase();
  if (!sb) return NextResponse.json({ ok: false, error: "SupabaseNotConfigured" }, { status: 500 });

  const res = await fetch(`${sb.supabaseUrl}/rest/v1/plano_financas_linhas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: sb.supabaseKey,
      Authorization: `Bearer ${sb.supabaseKey}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify({ ...parsed.data, updated_by: session.username }),
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ ok: false, error: "SupabaseError", details: text }, { status: 502 });
  }
  const rows = await res.json();
  return NextResponse.json({ ok: true, row: rows?.[0] ?? null });
}

const configSchema = z.object({
  investimento_inicial: z.number().min(0),
});

export async function PUT(req: Request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = configSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "ValidationError", issues: parsed.error.issues }, { status: 422 });
  }

  const sb = getSupabase();
  if (!sb) return NextResponse.json({ ok: false, error: "SupabaseNotConfigured" }, { status: 500 });

  const existingRes = await fetch(`${sb.supabaseUrl}/rest/v1/plano_financas_config?select=id&limit=1`, {
    headers: { apikey: sb.supabaseKey, Authorization: `Bearer ${sb.supabaseKey}` },
    cache: "no-store",
  });
  const existingRows = existingRes.ok ? await existingRes.json() : [];
  const existingId = existingRows?.[0]?.id as string | undefined;

  const body = {
    investimento_inicial: parsed.data.investimento_inicial,
    updated_by: session.username,
    updated_at: new Date().toISOString(),
  };

  const url = existingId
    ? `${sb.supabaseUrl}/rest/v1/plano_financas_config?id=eq.${encodeURIComponent(existingId)}`
    : `${sb.supabaseUrl}/rest/v1/plano_financas_config`;

  const res = await fetch(url, {
    method: existingId ? "PATCH" : "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: sb.supabaseKey,
      Authorization: `Bearer ${sb.supabaseKey}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ ok: false, error: "SupabaseError", details: text }, { status: 502 });
  }
  const rows = await res.json();
  return NextResponse.json({ ok: true, row: rows?.[0] ?? null });
}
