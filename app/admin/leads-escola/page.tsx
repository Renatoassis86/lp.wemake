import { LeadsEscolaClient } from "@/features/admin/leads-escola-client";

export const dynamic = "force-dynamic";

async function fetchLeads() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) return { rows: [], total: 0 };

  const res = await fetch(
    `${supabaseUrl}/rest/v1/leads_escola?select=*&order=created_at.desc&limit=500`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "count=exact",
      },
      cache: "no-store",
    },
  );
  if (!res.ok) return { rows: [], total: 0 };
  const rows = await res.json();
  const range = res.headers.get("content-range") || "";
  const total = Number(range.split("/")[1] || rows.length);
  return { rows, total };
}

export default async function LeadsEscolaPage() {
  const { rows, total } = await fetchLeads();
  return (
    <div>
      <header className="mb-6 sm:mb-8">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-mint))]/90 font-bold mb-2">
          Captura pública
        </p>
        <h1 className="font-display text-white text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.1]">
          Leads (escolas)
        </h1>
        <p className="text-white/55 text-[0.875rem] sm:text-sm mt-1.5 max-w-2xl">
          Escolas que solicitaram contato pela landing ou pelo formulário de proposta.
        </p>
      </header>
      <LeadsEscolaClient initialRows={rows} total={total} />
    </div>
  );
}
