import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { formatDateBR } from "@/lib/admin-format";

export const dynamic = "force-dynamic";

async function fetchRespostas(): Promise<{ rows: any[]; total: number; error?: string }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return { rows: [], total: 0, error: "Supabase nao configurado." };
  }

  try {
    // Tenta ordenar por created_at; se a coluna nao existir, cai para id
    let res = await fetch(
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

    if (!res.ok) {
      // Tenta de novo sem o order (a tabela pode nao ter created_at)
      res = await fetch(
        `${supabaseUrl}/rest/v1/diagnostico_respostas?select=*&limit=500`,
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
    }

    const rows = (await res.json().catch(() => null)) ?? [];
    const range = res.headers.get("content-range") || "";
    const total = Number(range.split("/")[1] || (Array.isArray(rows) ? rows.length : 0));
    return { rows: Array.isArray(rows) ? rows : [], total };
  } catch (err) {
    return {
      rows: [],
      total: 0,
      error: err instanceof Error ? err.message : "Falha ao buscar respostas",
    };
  }
}

export default async function RespostasPage() {
  const { rows, total, error } = await fetchRespostas();

  // Agrupa por diagnostico_id (defensivo)
  const grouped = new Map<string, any[]>();
  for (const r of rows) {
    if (!r || typeof r !== "object") continue;
    const key = String(r.diagnostico_id || "sem_id");
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
          Total: <strong className="text-white/85">{total.toLocaleString("pt-BR")}</strong>{" "}
          respostas agrupadas por diagnóstico.
        </p>
      </header>

      {error && (
        <div className="mb-5 p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-200 text-[0.8125rem]">
          <strong className="font-semibold">Aviso:</strong> {error}
        </div>
      )}

      <div className="space-y-3">
        {groups.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center text-white/55">
            Nenhuma resposta ainda.
          </div>
        ) : (
          groups.map(([diagId, respList]) => {
            const first = Array.isArray(respList) && respList.length > 0 ? respList[0] : null;
            const blocos = Array.from(
              new Set(
                (respList || [])
                  .map((r) => r?.bloco)
                  .filter((b) => b != null),
              ),
            ).sort((a: any, b: any) => Number(a) - Number(b));

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
                      {first?.created_at && (
                        <span className="text-[0.75rem] text-white/55 font-mono">
                          {formatDateBR(first.created_at)}
                        </span>
                      )}
                    </div>
                    {blocos.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {blocos.map((b) => (
                          <span
                            key={String(b)}
                            className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[0.6875rem] font-mono text-white/65"
                          >
                            B{b}
                          </span>
                        ))}
                      </div>
                    )}
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
