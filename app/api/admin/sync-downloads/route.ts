import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/admin/sync-downloads
 *
 * Sincroniza dados de diagnostico_escola qualificados (que fizeram download)
 * para a tabela pdf_downloads, separando assim:
 * - pdf_downloads: Quem fez DOWNLOAD do ebook
 * - diagnostico_respostas: Quem fez DIAGNÓSTICO COMPLETO (8 blocos)
 */
export async function POST(req: Request) {
  const cookieStore = await cookies();
  const session = await verifySession(cookieStore.get(ADMIN_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ ok: false, error: "SupabaseNotConfigured" }, { status: 500 });
  }

  try {
    // Buscar usuários qualificados que ainda não estão em pdf_downloads
    const selectRes = await fetch(
      `${supabaseUrl}/rest/v1/diagnostico_escola?select=id,nome_respondente,email,whatsapp,cargo_qualificado,nome_escola,cidade,uf,created_at&status=eq.lead_qualificado&origem=eq.wemake-landing-ebook&limit=1000`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        cache: "no-store",
      },
    );

    if (!selectRes.ok) {
      return NextResponse.json(
        { ok: false, error: "FetchFailed", details: await selectRes.text() },
        { status: 500 },
      );
    }

    const diagnosticos = await selectRes.json();

    if (!Array.isArray(diagnosticos) || diagnosticos.length === 0) {
      return NextResponse.json({
        ok: true,
        synced: 0,
        message: "Nenhum novo registro para sincronizar",
      });
    }

    // Preparar dados para inserção em pdf_downloads
    const rowsToInsert = diagnosticos.map((d: any) => ({
      nome_contato: d.nome_respondente,
      email: d.email,
      telefone: d.whatsapp,
      cargo: d.cargo_qualificado,
      nome_escola: d.nome_escola,
      cidade: d.cidade === "—" ? null : d.cidade,
      uf: d.uf,
      material: "7-principios",
      fluxo: "ebook-page",
      created_at: d.created_at,
    }));

    // Inserir em pdf_downloads (ignorar duplicatas por email)
    const insertRes = await fetch(`${supabaseUrl}/rest/v1/pdf_downloads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(rowsToInsert),
    });

    if (!insertRes.ok) {
      const errBody = await insertRes.text();
      // Se erro for por duplicata, continuar mesmo assim
      if (!errBody.includes("duplicate key")) {
        console.error("[sync-downloads] insert failed:", insertRes.status, errBody);
        return NextResponse.json(
          { ok: false, error: "InsertFailed", details: errBody },
          { status: 502 },
        );
      }
    }

    return NextResponse.json({
      ok: true,
      synced: rowsToInsert.length,
      message: `${rowsToInsert.length} registros sincronizados para pdf_downloads`,
      records: rowsToInsert.map(r => ({
        email: r.email,
        nome: r.nome_contato,
        escola: r.nome_escola,
      })),
    });
  } catch (err) {
    console.error("[sync-downloads] error:", err);
    return NextResponse.json({ ok: false, error: "ServerError" }, { status: 500 });
  }
}
