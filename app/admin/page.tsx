import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowRight, Download, BarChart3, Users, Mail } from "lucide-react";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

type SummaryStats = {
  downloads: number;
  diagnosticos: number;
  leads: number;
  emails_unicos: number;
};

async function fetchSummaryStats(): Promise<SummaryStats> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) return { downloads: 0, diagnosticos: 0, leads: 0, emails_unicos: 0 };

  try {
    // Contar downloads
    const dlRes = await fetch(`${supabaseUrl}/rest/v1/pdf_downloads?select=id`, {
      method: "HEAD",
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}`, Prefer: "count=exact" },
      cache: "no-store",
    });
    const dlRange = dlRes.headers.get("content-range") || "";
    const downloads = Number(dlRange.split("/")[1] || 0);

    // Contar diagnósticos
    const diagRes = await fetch(`${supabaseUrl}/rest/v1/diagnostico_escola?select=id`, {
      method: "HEAD",
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}`, Prefer: "count=exact" },
      cache: "no-store",
    });
    const diagRange = diagRes.headers.get("content-range") || "";
    const diagnosticos = Number(diagRange.split("/")[1] || 0);

    // Contar leads
    const leadsRes = await fetch(`${supabaseUrl}/rest/v1/leads_escola?select=id`, {
      method: "HEAD",
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}`, Prefer: "count=exact" },
      cache: "no-store",
    });
    const leadsRange = leadsRes.headers.get("content-range") || "";
    const leads = Number(leadsRange.split("/")[1] || 0);

    // Contar emails únicos
    const emailRes = await fetch(`${supabaseUrl}/rest/v1/pdf_downloads?select=email`, {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
      cache: "no-store",
    });
    const pdfs = (await emailRes.json()) || [];

    const diagEmailRes = await fetch(`${supabaseUrl}/rest/v1/diagnostico_escola?select=email`, {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
      cache: "no-store",
    });
    const diags = (await diagEmailRes.json()) || [];

    const leadsEmailRes = await fetch(`${supabaseUrl}/rest/v1/leads_escola?select=email`, {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
      cache: "no-store",
    });
    const leadsData = (await leadsEmailRes.json()) || [];

    const allEmails = new Set([
      ...pdfs.map((r: any) => r.email?.toLowerCase()).filter(Boolean),
      ...diags.map((r: any) => r.email?.toLowerCase()).filter(Boolean),
      ...leadsData.map((r: any) => r.email?.toLowerCase()).filter(Boolean),
    ]);
    const emails_unicos = allEmails.size;

    return { downloads, diagnosticos, leads, emails_unicos };
  } catch {
    return { downloads: 0, diagnosticos: 0, leads: 0, emails_unicos: 0 };
  }
}

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const session = await verifySession(cookieStore.get(ADMIN_COOKIE)?.value);
  const username = session?.username || "";

  const { downloads, diagnosticos, leads, emails_unicos } = await fetchSummaryStats();

  const cards = [
    {
      href: "/admin/pdf-downloads",
      label: "Downloads do Ebook",
      icon: Download,
      value: downloads,
      color: "from-[rgb(var(--color-brand-mint))]/20 to-[rgb(var(--color-brand-mint))]/5",
    },
    {
      href: "/admin/diagnostico-respostas",
      label: "Diagnósticos",
      icon: BarChart3,
      value: diagnosticos,
      color: "from-[rgb(var(--color-brand-royal))]/20 to-[rgb(var(--color-brand-royal))]/5",
    },
    {
      href: "/admin/leads-escola",
      label: "Leads Escolas",
      icon: Users,
      value: leads,
      color: "from-[rgb(var(--color-brand-sky))]/25 to-[rgb(var(--color-brand-sky))]/5",
    },
    {
      label: "Emails Únicos",
      icon: Mail,
      value: emails_unicos,
      color: "from-[rgb(var(--color-brand-mint-deep))]/20 to-[rgb(var(--color-brand-mint-deep))]/5",
    },
  ];

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

      {/* Cards de resumo */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          const cardContent = (
            <>
              <div
                aria-hidden
                className={`absolute inset-0 -z-10 bg-gradient-to-br ${card.color} opacity-60 group-hover:opacity-100 transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-cinematic)]`}
              />
              <div className="flex items-start justify-between mb-4">
                <div className="size-10 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center">
                  <Icon className="size-5 text-[rgb(var(--color-brand-mint))]" />
                </div>
                {card.href && (
                  <ArrowRight className="size-4 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-[color,transform] duration-[var(--duration-fast)] ease-[var(--ease-cinematic)]" />
                )}
              </div>
              <p className="text-white/75 text-[0.875rem] mb-2">{card.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-white text-[2rem] sm:text-[2.5rem] leading-none font-bold tabular-nums">
                  {card.value.toLocaleString("pt-BR")}
                </span>
              </div>
            </>
          );

          if (card.href) {
            return (
              <Link
                key={card.label}
                href={card.href}
                className="group relative rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 p-5 sm:p-6 overflow-hidden card-hover-lift cursor-pointer"
              >
                {cardContent}
              </Link>
            );
          }

          return (
            <div
              key={card.label}
              className="group relative rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 p-5 sm:p-6 overflow-hidden cursor-default"
            >
              {cardContent}
            </div>
          );
        })}
      </section>

      {/* Info */}
      <section className="mt-10 p-5 sm:p-6 rounded-2xl border border-white/8 bg-white/[0.02]">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-white/55 mb-2 font-bold">
          Navegação
        </p>
        <div className="space-y-2 text-white/70 text-[0.9375rem]">
          <p>
            📥 <strong className="text-white">Dados Ebook</strong> — Todas as pessoas que baixaram o ebook 7 Princípios
          </p>
          <p>
            📋 <strong className="text-white">Diagnóstico</strong> — Todas as respostas do diagnóstico de maturidade (8 blocos)
          </p>
          <p>
            👥 <strong className="text-white">Leads Escolas</strong> — Escolas que deixaram contatos (reunião estratégica)
          </p>
          <p>
            📈 <strong className="text-white">Analytics & Funil</strong> — Métricas de conversão e comportamento
          </p>
        </div>
      </section>
    </div>
  );
}
