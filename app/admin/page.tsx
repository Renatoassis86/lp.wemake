import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowRight, Users, ClipboardList, ListChecks } from "lucide-react";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

type TableStats = { table: string; total: number; recent: number };

async function fetchTableStats(table: string): Promise<TableStats> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) return { table, total: 0, recent: 0 };

  // total via HEAD com Prefer: count=exact
  const headRes = await fetch(`${supabaseUrl}/rest/v1/${table}?select=id`, {
    method: "HEAD",
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Prefer: "count=exact",
    },
    cache: "no-store",
  });
  const range = headRes.headers.get("content-range") || "";
  const total = Number(range.split("/")[1] || 0);

  // recent: criados nos últimos 7 dias
  const since = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString();
  const recRes = await fetch(
    `${supabaseUrl}/rest/v1/${table}?select=id&created_at=gte.${encodeURIComponent(since)}`,
    {
      method: "HEAD",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "count=exact",
      },
      cache: "no-store",
    },
  );
  const recRange = recRes.headers.get("content-range") || "";
  const recent = Number(recRange.split("/")[1] || 0);

  return { table, total, recent };
}

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const session = await verifySession(cookieStore.get(ADMIN_COOKIE)?.value);
  const username = session?.username || "";

  const [leads, diagnosticos, respostas] = await Promise.all([
    fetchTableStats("leads_escola"),
    fetchTableStats("diagnostico_escola"),
    fetchTableStats("diagnostico_respostas"),
  ]);

  const modules = [
    {
      href: "/admin/leads-escola",
      label: "Leads (escolas)",
      sub: "Capturas do formulário público de proposta.",
      icon: Users,
      stats: leads,
      color: "from-[rgb(var(--color-brand-mint))]/20 to-[rgb(var(--color-brand-mint))]/5",
    },
    {
      href: "/admin/diagnostico-escola",
      label: "Diagnósticos",
      sub: "Escolas que iniciaram ou completaram o questionário.",
      icon: ClipboardList,
      stats: diagnosticos,
      color: "from-[rgb(var(--color-brand-royal))]/20 to-[rgb(var(--color-brand-royal))]/5",
    },
    {
      href: "/admin/diagnostico-respostas",
      label: "Respostas detalhadas",
      sub: "1 linha por pergunta respondida do diagnóstico.",
      icon: ListChecks,
      stats: respostas,
      color: "from-[rgb(var(--color-brand-sky))]/25 to-[rgb(var(--color-brand-sky))]/5",
    },
  ];

  return (
    <div>
      <header className="mb-8 sm:mb-10">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-mint))]/90 font-bold mb-2">
          Painel administrativo
        </p>
        <h1 className="font-display text-white text-[clamp(1.875rem,3vw,2.5rem)] leading-[1.05]">
          Olá, {username || "admin"} 👋
        </h1>
        <p className="text-white/65 text-[0.9375rem] sm:text-base mt-2 max-w-2xl">
          Acompanhe os leads e diagnósticos coletados pela landing. Os números abaixo
          mostram o total e quantos chegaram nos últimos 7 dias.
        </p>
      </header>

      {/* Cards de módulos */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
        {modules.map((m) => {
          const Icon = m.icon;
          return (
            <Link
              key={m.href}
              href={m.href}
              className="group relative rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 p-5 sm:p-6 card-hover-lift overflow-hidden"
            >
              <div
                aria-hidden
                className={`absolute inset-0 -z-10 bg-gradient-to-br ${m.color} opacity-60 group-hover:opacity-100 transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-cinematic)]`}
              />
              <div className="flex items-start justify-between mb-5">
                <div className="size-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                  <Icon className="size-5 text-[rgb(var(--color-brand-mint))]" />
                </div>
                <ArrowRight className="size-4 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-[color,transform] duration-[var(--duration-fast)] ease-[var(--ease-cinematic)]" />
              </div>
              <h2 className="font-display text-white text-[1.25rem] leading-tight mb-1">
                {m.label}
              </h2>
              <p className="text-white/55 text-[0.8125rem] leading-relaxed mb-4 line-clamp-2">
                {m.sub}
              </p>
              <div className="flex items-baseline gap-2 mt-auto">
                <span className="font-display text-white text-[2rem] sm:text-[2.25rem] leading-none font-bold tabular-nums">
                  {m.stats.total.toLocaleString("pt-BR")}
                </span>
                <span className="text-white/50 text-[0.75rem]">registros</span>
              </div>
              <div className="mt-2 text-[0.75rem] text-[rgb(var(--color-brand-mint))]/85 font-mono uppercase tracking-wide">
                +{m.stats.recent} nos últimos 7 dias
              </div>
            </Link>
          );
        })}
      </section>

      {/* Dica de fluxo */}
      <section className="mt-10 p-5 sm:p-6 rounded-2xl border border-white/8 bg-white/[0.02]">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-white/55 mb-2 font-bold">
          Como usar
        </p>
        <p className="text-white/70 text-[0.9375rem] leading-relaxed">
          Comece pelo módulo <strong className="text-white">Diagnósticos</strong> — cada
          escola que completou o questionário aparece lá com botão de detalhe (mostra
          as respostas bloco a bloco). Você pode atualizar o status do lead/diagnóstico
          conforme avança o relacionamento.
        </p>
      </section>
    </div>
  );
}
