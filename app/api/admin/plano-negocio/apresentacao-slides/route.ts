import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Guarda edições feitas slide a slide na apresentação React (fora do modo tela
 * cheia), na tabela apresentacao_overrides do Supabase — { chave -> html editado }.
 * O componente troca o JSX original do slide pelo HTML salvo quando existe uma
 * entrada para a chave. Antes gravava em arquivo local (data/apresentacao-
 * overrides.json), que não sobrevive a um deploy serverless; no Supabase a
 * edição fica permanente de verdade.
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
  const sb = getSupabase();
  if (!sb) {
    return NextResponse.json({ success: false, error: "SupabaseNotConfigured" }, { status: 500 });
  }

  try {
    const res = await fetch(`${sb.supabaseUrl}/rest/v1/apresentacao_overrides?select=chave,html`, {
      headers: { apikey: sb.supabaseKey, Authorization: `Bearer ${sb.supabaseKey}` },
      cache: "no-store",
    });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ success: false, error: `SupabaseError: ${text}` }, { status: 502 });
    }
    const rows: { chave: string; html: string }[] = await res.json();
    const overrides = Object.fromEntries(rows.map((r) => [r.chave, r.html]));
    return NextResponse.json({ success: true, overrides });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erro ao ler as edições salvas" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const sb = getSupabase();
  if (!sb) {
    return NextResponse.json({ success: false, error: "SupabaseNotConfigured" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { chave, html } = body;

    if (!chave || typeof chave !== "string") {
      return NextResponse.json({ success: false, error: "Chave do slide ausente" }, { status: 400 });
    }
    if (typeof html !== "string" || html.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Conteúdo HTML vazio" }, { status: 400 });
    }

    const res = await fetch(`${sb.supabaseUrl}/rest/v1/apresentacao_overrides`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: sb.supabaseKey,
        Authorization: `Bearer ${sb.supabaseKey}`,
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify({ chave, html, updated_by: session.username, updated_at: new Date().toISOString() }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ success: false, error: `SupabaseError: ${text}` }, { status: 502 });
    }

    return NextResponse.json({ success: true, updatedAt: new Date().toISOString() });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erro ao salvar a edição do slide" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const sb = getSupabase();
  if (!sb) {
    return NextResponse.json({ success: false, error: "SupabaseNotConfigured" }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const chave = searchParams.get("chave");
    if (!chave) {
      return NextResponse.json({ success: false, error: "Chave do slide ausente" }, { status: 400 });
    }

    const res = await fetch(`${sb.supabaseUrl}/rest/v1/apresentacao_overrides?chave=eq.${encodeURIComponent(chave)}`, {
      method: "DELETE",
      headers: { apikey: sb.supabaseKey, Authorization: `Bearer ${sb.supabaseKey}` },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ success: false, error: `SupabaseError: ${text}` }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erro ao descartar a edição do slide" },
      { status: 500 }
    );
  }
}
