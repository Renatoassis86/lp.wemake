import { DiagnosticosClient } from "@/features/admin/diagnosticos-client";
import { ExportButton } from "@/features/admin/export-button";

export const dynamic = "force-dynamic";

async function fetchDiagnosticos() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) return { rows: [], total: 0 };

  const res = await fetch(
    `${supabaseUrl}/rest/v1/diagnostico_escola?select=*&order=created_at.desc&limit=500`,
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

export default async function DiagnosticosPage() {
  const { rows, total } = await fetchDiagnosticos();
  return (
    <div>
      <header className="mb-6 sm:mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-mint))]/90 font-bold mb-2">
            Funil do diagnóstico
          </p>
          <h1 className="font-display text-white text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.1]">
            Diagnósticos de maturidade
          </h1>
          <p className="text-white/55 text-[0.875rem] sm:text-sm mt-1.5 max-w-2xl">
            Escolas em qualquer etapa do funil: captura de lead, ebook qualificado ou
            diagnóstico completo. Clique numa linha pra ver respostas detalhadas.
          </p>
        </div>
        <ExportButton table="diagnostico_escola" />
      </header>
      <DiagnosticosClient initialRows={rows} total={total} />
    </div>
  );
}
