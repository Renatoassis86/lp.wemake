import { ExportButton } from "@/features/admin/export-button";
import { DiagnosticoRespostasClient } from "@/features/admin/diagnostico-respostas-client";

export const dynamic = "force-dynamic";

async function fetchRespostas(): Promise<{ rows: any[]; total: number; error?: string }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return { rows: [], total: 0, error: "Supabase nao configurado." };
  }

  try {
    let res = await fetch(
      `${supabaseUrl}/rest/v1/diagnostico_escola?select=id,nome_escola,nome_respondente,email,whatsapp,funcao,cargo_qualificado,espaco_maker,tamanho_escola,cidade,uf,status,created_at&status=eq.diagnostico_completo&order=created_at.desc&limit=500`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "count=exact",
        },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      return { rows: [], total: 0, error: `Supabase ${res.status}: ${txt}` };
    }

    const rows = (await res.json().catch(() => null)) ?? [];
    const range = res.headers.get("content-range") || "";
    const total = Number(range.split("/")[1] || (Array.isArray(rows) ? rows.length : 0));
    return { rows: Array.isArray(rows) ? rows : [], total };
  } catch (err) {
    return {
      rows: [],
      total: 0,
      error: err instanceof Error ? err.message : "Falha ao buscar diagnósticos",
    };
  }
}

export default async function RespostasPage() {
  const { rows, total, error } = await fetchRespostas();

  return (
    <div>
      <header className="mb-6 sm:mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-mint))]/90 font-bold mb-2">
            Abordagem comercial
          </p>
          <h1 className="font-display text-white text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.1]">
            Diagnósticos Completos
          </h1>
          <p className="text-white/55 text-[0.875rem] sm:text-sm mt-1.5 max-w-2xl">
            Escolas que responderam os 8 blocos do diagnóstico. Clique em qualquer linha para ver
            todas as respostas detalhadas.{" "}
            <strong className="text-white/75">{total.toLocaleString("pt-BR")} escola{total !== 1 ? "s" : ""}.</strong>
          </p>
        </div>
        <ExportButton table="diagnostico_completos" />
      </header>

      {error && (
        <div className="mb-5 p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-200 text-[0.8125rem]">
          <strong className="font-semibold">Aviso:</strong> {error}
        </div>
      )}

      <DiagnosticoRespostasClient initialRows={rows} />
    </div>
  );
}
