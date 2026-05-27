import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { formatDateBR } from "@/lib/admin-format";

export const dynamic = "force-dynamic";

async function fetchRespostas() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) return { rows: [], total: 0 };

  const res = await fetch(
    `${supabaseUrl}/rest/v1/diagnostico_respostas?select=*&order=created_at.desc&limit=500`,
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

export default async function RespostasPage() {
  const { rows, total } = await fetchRespostas();

  // Agrupa por diagnostico_id
  const grouped = new Map<string, any[]>();
  for (const r of rows) {
    const key = r.diagnostico_id || "—";
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(r);
  }
  const groups = Array.from(grouped.entries()).slice(0, 200);

  return (
    <div>
      <header className="mb-6 sm:mb-8">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-mint))]/90 font-bold mb-2">
          Dados brutos
        </p>
        <h1 className="font-display text-white text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.1]">
          Respostas do diagnóstico
        </h1>
        <p className="text-white/55 text-[0.875rem] sm:text-sm mt-1.5 max-w-2xl">
          Cada linha desta tabela é uma resposta individual a uma pergunta dos 8 blocos.
          Total: <strong className="text-white/85">{total.toLocaleString("pt-BR")}</strong> respostas
          agrupadas por diagnóstico.
        </p>
      </header>

      <div className="space-y-3">
        {groups.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center text-white/55">
            Nenhuma resposta ainda.
          </div>
        ) : (
          groups.map(([diagId, respList]) => {
            const first = respList[0];
            return (
              <Link
                key={diagId}
                href={`/admin/diagnostico-escola/${diagId}`}
                className="block rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 p-4 sm:p-5 transition group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[0.6875rem] uppercase tracking-wide text-white/45 truncate mb-1">
                      ID: {diagId}
                    </p>
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="font-display text-white text-[1.0625rem]">
                        {respList.length} respostas
                      </span>
                      <span className="text-[0.75rem] text-white/55 font-mono">
                        {formatDateBR(first?.created_at)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {Array.from(new Set(respList.map((r) => r.bloco))).sort().map((b) => (
                        <span
                          key={b}
                          className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[0.6875rem] font-mono text-white/65"
                        >
                          B{b}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ExternalLink className="size-4 text-white/40 group-hover:text-[rgb(var(--color-brand-mint))] group-hover:translate-x-1 transition shrink-0 mt-1" />
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
