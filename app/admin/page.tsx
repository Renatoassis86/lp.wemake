import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";
import { DashboardStats } from "@/features/admin/dashboard-stats";
import type { StatsPayload } from "@/app/api/admin/stats/route";

export const dynamic = "force-dynamic";

async function fetchInitialStats(): Promise<StatsPayload> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const empty: StatsPayload = { downloads: 0, diagnosticos: 0, leads: 0, emails_unicos: 0, recent: [] };
  if (!supabaseUrl || !supabaseKey) return empty;

  async function count(table: string, filter = ""): Promise<number> {
    const url = `${supabaseUrl}/rest/v1/${table}?select=id${filter ? `&${filter}` : ""}&limit=0`;
    const res = await fetch(url, {
      headers: { apikey: supabaseKey!, Authorization: `Bearer ${supabaseKey}`, Prefer: "count=exact" },
      cache: "no-store",
    }).catch(() => null);
    if (!res?.ok) return 0;
    const range = res.headers.get("content-range") || "";
    return Number(range.split("/")[1] || 0);
  }

  try {
    const [downloads, diagnosticos, leads] = await Promise.all([
      count("pdf_downloads"),
      count("diagnostico_escola"),
      count("leads_escola"),
    ]);

    const LIMIT = 10;
    const [recentPdfs, recentDiags, recentLeads, pdfsEmails, diagEmails, leadsEmails] =
      await Promise.all([
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
        fetch(`${supabaseUrl}/rest/v1/pdf_downloads?select=email&limit=500`, {
          headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` }, cache: "no-store",
        }).then((r) => r.json()).catch(() => []),
        fetch(`${supabaseUrl}/rest/v1/diagnostico_escola?select=email&limit=500`, {
          headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` }, cache: "no-store",
        }).then((r) => r.json()).catch(() => []),
        fetch(`${supabaseUrl}/rest/v1/leads_escola?select=email&limit=500`, {
          headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` }, cache: "no-store",
        }).then((r) => r.json()).catch(() => []),
      ]);

    const allEmails = new Set([
      ...(Array.isArray(pdfsEmails) ? pdfsEmails : []).map((r: any) => r.email?.toLowerCase()).filter(Boolean),
      ...(Array.isArray(diagEmails) ? diagEmails : []).map((r: any) => r.email?.toLowerCase()).filter(Boolean),
      ...(Array.isArray(leadsEmails) ? leadsEmails : []).map((r: any) => r.email?.toLowerCase()).filter(Boolean),
    ]);

    const recent = [
      ...(Array.isArray(recentPdfs) ? recentPdfs : []).map((r: any) => ({
        id: r.id, tipo: "download" as const,
        nome: r.nome_contato || "—", email: r.email || "—",
        cidade: r.cidade, uf: r.uf, created_at: r.created_at,
      })),
      ...(Array.isArray(recentDiags) ? recentDiags : []).map((r: any) => ({
        id: r.id, tipo: "diagnostico" as const,
        nome: r.nome_escola || r.nome_respondente || "—", email: r.email || "—",
        cidade: r.cidade, uf: r.uf, status: r.status, created_at: r.created_at,
      })),
      ...(Array.isArray(recentLeads) ? recentLeads : []).map((r: any) => ({
        id: r.id, tipo: "lead" as const,
        nome: r.nome || "—", email: r.email || "—",
        cidade: r.cidade, uf: r.uf, status: r.status_lead, created_at: r.created_at,
      })),
    ]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 20);

    return { downloads, diagnosticos, leads, emails_unicos: allEmails.size, recent };
  } catch {
    return empty;
  }
}

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const session = await verifySession(cookieStore.get(ADMIN_COOKIE)?.value);
  const username = session?.username || "";

  const initial = await fetchInitialStats();

  return (
    <div>
      <header className="mb-8 sm:mb-10">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-mint))]/90 font-bold mb-2">
          Painel administrativo
        </p>
        <h1 className="font-display text-white text-[clamp(1.875rem,3vw,2.5rem)] leading-[1.05]">
          Visão Geral
        </h1>
        <p className="text-white/65 text-[0.9375rem] sm:text-base mt-2 max-w-2xl">
          Resumo consolidado de todas as interações: downloads, diagnósticos, leads e contatos.
        </p>
      </header>

      <DashboardStats initial={initial} />
    </div>
  );
}
