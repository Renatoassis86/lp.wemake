import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Respostas do questionário do plano de negócio — uma linha por (username, question_id).
 * Cada usuário logado só lê/grava as PRÓPRIAS respostas: o username nunca vem do
 * client, sempre da sessão (cookie HMAC), então não dá pra um sócio responder no
 * lugar do outro através desta rota.
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

  const url = `${sb.supabaseUrl}/rest/v1/plano_negocio_respostas?username=eq.${encodeURIComponent(session.username)}&select=question_id,resposta,updated_at`;
  const res = await fetch(url, {
    headers: { apikey: sb.supabaseKey, Authorization: `Bearer ${sb.supabaseKey}` },
    cache: "no-store",
  });
  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "SupabaseError" }, { status: 502 });
  }
  const rows = await res.json();
  return NextResponse.json({ ok: true, rows });
}

const putSchema = z.object({
  question_id: z.string().min(1).max(150),
  resposta: z.string().max(20000),
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
  const parsed = putSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "ValidationError", issues: parsed.error.issues }, { status: 422 });
  }

  const sb = getSupabase();
  if (!sb) return NextResponse.json({ ok: false, error: "SupabaseNotConfigured" }, { status: 500 });

  const url = `${sb.supabaseUrl}/rest/v1/plano_negocio_respostas?on_conflict=username,question_id`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: sb.supabaseKey,
      Authorization: `Bearer ${sb.supabaseKey}`,
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify({
      username: session.username,
      question_id: parsed.data.question_id,
      resposta: parsed.data.resposta,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[plano-negocio/respostas PUT] supabase error:", res.status, text);
    return NextResponse.json({ ok: false, error: "SupabaseError", details: text }, { status: 502 });
  }

  const rows = await res.json();
  return NextResponse.json({ ok: true, row: rows?.[0] ?? null });
}
