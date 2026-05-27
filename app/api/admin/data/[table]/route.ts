import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/admin/data/<table>?limit=50&offset=0&order=created_at.desc
 *
 * Tabelas permitidas (allowlist hard-coded):
 *  - leads_escola
 *  - diagnostico_escola
 *  - diagnostico_respostas
 *
 * Auth: cookie de sessão valido (middleware ja filtra, mas re-validamos
 * aqui pra defesa em profundidade).
 */

const ALLOWED_TABLES = new Set([
  "leads_escola",
  "diagnostico_escola",
  "diagnostico_respostas",
]);

export async function GET(
  req: Request,
  ctx: { params: Promise<{ table: string }> },
) {
  // Defense in depth (alem do middleware)
  const cookieStore = await cookies();
  const session = await verifySession(cookieStore.get(ADMIN_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { table } = await ctx.params;
  if (!ALLOWED_TABLES.has(table)) {
    return NextResponse.json({ ok: false, error: "TableNotAllowed" }, { status: 400 });
  }

  const url = new URL(req.url);
  const limit = Math.min(Number(url.searchParams.get("limit") || 50), 500);
  const offset = Math.max(Number(url.searchParams.get("offset") || 0), 0);
  const order = url.searchParams.get("order") || "created_at.desc";

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ ok: false, error: "SupabaseNotConfigured" }, { status: 500 });
  }

  const sbUrl = `${supabaseUrl}/rest/v1/${table}?select=*&order=${encodeURIComponent(order)}&limit=${limit}&offset=${offset}`;
  const res = await fetch(sbUrl, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Prefer: "count=exact",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[admin/data] supabase error:", res.status, text);
    return NextResponse.json({ ok: false, error: "SupabaseError", details: text }, { status: 502 });
  }

  const rows = await res.json();
  // Content-Range header: "0-49/123"
  const contentRange = res.headers.get("content-range") || "";
  const total = Number(contentRange.split("/")[1] || rows.length);

  return NextResponse.json({ ok: true, rows, total, limit, offset });
}
