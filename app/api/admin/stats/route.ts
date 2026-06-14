import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export type StatsPayload = {
  downloads: number;
  diagnosticos: number;
  leads: number;
  emails_unicos: number;
  recent: RecentEntry[];
};

export type RecentEntry = {
  id: string;
  tipo: "download" | "diagnostico" | "lead";
  nome: string;
  email: string;
  cidade?: string;
  uf?: string;
  status?: string;
  created_at: string;
};

async function countTable(
  supabaseUrl: string,
  key: string,
  table: string,
  filter?: string,
): Promise<number> {
  const url = `${supabaseUrl}/rest/v1/${table}?select=id${filter ? `&${filter}` : ""}&limit=0`;
  const res = await fetch(url, {
    headers: { apikey: key, Authorization: `Bearer ${key}`, Prefer: "count=exact" },
    cache: "no-store",
  });
  if (!res.ok) return 0;
  const range = res.headers.get("content-range") || "";
  return Number(range.split("/")[1] || 0);
}

export async function GET() {
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
    const [downloads, diagnosticos, leads] = await Promise.all([
      countTable(supabaseUrl, supabaseKey, "pdf_downloads"),
      countTable(supabaseUrl, supabaseKey, "diagnostico_escola"),
      countTable(supabaseUrl, supabaseKey, "leads_escola"),
    ]);

    // Emails únicos entre as 3 tabelas
    const [pdfsEmails, diagEmails, leadsEmails] = await Promise.all([
      fetch(`${supabaseUrl}/rest/v1/pdf_downloads?select=email&limit=500`, {
        headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
        cache: "no-store",
      }).then((r) => r.json()).catch(() => []),
      fetch(`${supabaseUrl}/rest/v1/diagnostico_escola?select=email&limit=500`, {
        headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
        cache: "no-store",
      }).then((r) => r.json()).catch(() => []),
      fetch(`${supabaseUrl}/rest/v1/leads_escola?select=email&limit=500`, {
        headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
        cache: "no-store",
      }).then((r) => r.json()).catch(() => []),
    ]);

    const allEmails = new Set([
      ...(Array.isArray(pdfsEmails) ? pdfsEmails : []).map((r: any) => r.email?.toLowerCase()).filter(Boolean),
      ...(Array.isArray(diagEmails) ? diagEmails : []).map((r: any) => r.email?.toLowerCase()).filter(Boolean),
      ...(Array.isArray(leadsEmails) ? leadsEmails : []).map((r: any) => r.email?.toLowerCase()).filter(Boolean),
    ]);
    const emails_unicos = allEmails.size;

    // Atividade recente — últimos 10 de cada tabela, merge e ordena por data
    const LIMIT = 10;
    const [recentPdfs, recentDiags, recentLeads] = await Promise.all([
      fetch(
        `${supabaseUrl}/rest/v1/pdf_downloads?select=id,nome_contato,email,cidade,uf,created_at&order=created_at.desc&limit=${LIMIT}`,
        { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` }, cache: "no-store" },
      ).then((r) => r.json()).catch(() => []),
      fetch(
        `${supabaseUrl}/rest/v1/diagnostico_escola?select=id,nome_escola,nome_respondente,email,cidade,uf,status,created_at&order=created_at.desc&limit=${LIMIT}`,
        { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` }, cache: "no-store" },
      ).then((r) => r.json()).catch(() => []),
      fetch(
        `${supabaseUrl}/rest/v1/leads_escola?select=id,nome,email,cidade,uf,status_lead,created_at&order=created_at.desc&limit=${LIMIT}`,
        { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` }, cache: "no-store" },
      ).then((r) => r.json()).catch(() => []),
    ]);

    const recent: RecentEntry[] = [
      ...(Array.isArray(recentPdfs) ? recentPdfs : []).map((r: any): RecentEntry => ({
        id: r.id,
        tipo: "download",
        nome: r.nome_contato || "—",
        email: r.email || "—",
        cidade: r.cidade,
        uf: r.uf,
        created_at: r.created_at,
      })),
      ...(Array.isArray(recentDiags) ? recentDiags : []).map((r: any): RecentEntry => ({
        id: r.id,
        tipo: "diagnostico",
        nome: r.nome_escola || r.nome_respondente || "—",
        email: r.email || "—",
        cidade: r.cidade,
        uf: r.uf,
        status: r.status,
        created_at: r.created_at,
      })),
      ...(Array.isArray(recentLeads) ? recentLeads : []).map((r: any): RecentEntry => ({
        id: r.id,
        tipo: "lead",
        nome: r.nome || "—",
        email: r.email || "—",
        cidade: r.cidade,
        uf: r.uf,
        status: r.status_lead,
        created_at: r.created_at,
      })),
    ]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 20);

    const payload: StatsPayload = { downloads, diagnosticos, leads, emails_unicos, recent };
    return NextResponse.json({ ok: true, ...payload });
  } catch (err) {
    console.error("[admin/stats]", err);
    return NextResponse.json({ ok: false, error: "InternalError" }, { status: 500 });
  }
}
