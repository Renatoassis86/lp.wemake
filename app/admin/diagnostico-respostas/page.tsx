import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { formatDateBR } from "@/lib/admin-format";
import { ExportButton } from "@/features/admin/export-button";

export const dynamic = "force-dynamic";

async function fetchRespostas(): Promise<{ rows: any[]; total: number; error?: string }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return { rows: [], total: 0, error: "Supabase nao configurado." };
  }

  try {
    let res = await fetch(
      `${supabaseUrl}/rest/v1/diagnostico_maturidade?select=id,nome_escola,nome_respondente,email,cidade,uf,funcao,status,created_at&order=created_at.desc&limit=500`,
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
            Dados brutos
          </p>
          <h1 className="font-display text-white text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.1]">
            Diagnósticos de Maturidade Completos
          </h1>
          <p className="text-white/55 text-[0.875rem] sm:text-sm mt-1.5 max-w-2xl">
            Escolas que responderam o diagnóstico completo (8 blocos).
            Total: <strong className="text-white/85">{total.toLocaleString("pt-BR")}</strong>{" "}
            diagnósticos.
          </p>
        </div>
        <ExportButton table="diagnostico_maturidade" />
      </header>

      {error && (
        <div className="mb-5 p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-200 text-[0.8125rem]">
          <strong className="font-semibold">Aviso:</strong> {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02]">
              <th className="px-4 sm:px-6 py-3 text-left text-[0.75rem] font-semibold text-white/55 uppercase tracking-wide">
                Escola
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-[0.75rem] font-semibold text-white/55 uppercase tracking-wide">
                Respondente
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-[0.75rem] font-semibold text-white/55 uppercase tracking-wide">
                Email
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-[0.75rem] font-semibold text-white/55 uppercase tracking-wide">
                Localidade
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-[0.75rem] font-semibold text-white/55 uppercase tracking-wide">
                Data
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-white/55">
                  Nenhum diagnóstico completo ainda.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.03] transition">
                  <td className="px-4 sm:px-6 py-3 text-sm text-white/85">{row.nome_escola}</td>
                  <td className="px-4 sm:px-6 py-3 text-sm text-white/85">{row.nome_respondente}</td>
                  <td className="px-4 sm:px-6 py-3 text-sm text-white/55 font-mono text-[0.8125rem]">
                    {row.email}
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-sm text-white/55">
                    {row.cidade} — {row.uf}
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-sm text-white/55 font-mono text-[0.8125rem]">
                    {formatDateBR(row.created_at)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
