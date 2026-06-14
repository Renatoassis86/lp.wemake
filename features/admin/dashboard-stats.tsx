"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Download,
  BarChart3,
  Users,
  Mail,
  ArrowRight,
  RefreshCw,
  BookOpen,
  ClipboardList,
} from "lucide-react";
import { formatDateBR } from "@/lib/admin-format";
import type { StatsPayload, RecentEntry } from "@/app/api/admin/stats/route";

const POLL_INTERVAL_MS = 60_000; // 60 segundos

const TIPO_CONFIG: Record<
  RecentEntry["tipo"],
  { label: string; icon: React.ElementType; color: string; href: (id: string) => string }
> = {
  download: {
    label: "Download",
    icon: BookOpen,
    color: "text-[rgb(var(--color-brand-mint))] bg-[rgb(var(--color-brand-mint))]/10",
    href: () => "/admin/pdf-downloads",
  },
  diagnostico: {
    label: "Diagnóstico",
    icon: ClipboardList,
    color: "text-[rgb(var(--color-brand-royal))] bg-[rgb(var(--color-brand-royal))]/10",
    href: (id) => `/admin/diagnostico-escola/${id}`,
  },
  lead: {
    label: "Lead",
    icon: Users,
    color: "text-[rgb(var(--color-brand-sky))] bg-[rgb(var(--color-brand-sky))]/10",
    href: (id) => `/admin/leads-escola/${id}`,
  },
};

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return "agora mesmo";
  const m = Math.floor(s / 60);
  if (m < 60) return `há ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `há ${h}h`;
  const d = Math.floor(h / 24);
  return `há ${d}d`;
}

function sinceUpdated(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 5) return "agora mesmo";
  if (s < 60) return `${s}s atrás`;
  const m = Math.floor(s / 60);
  return `${m}min atrás`;
}

export function DashboardStats({ initial }: { initial: StatsPayload }) {
  const [stats, setStats] = useState<StatsPayload>(initial);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [sinceLabel, setSinceLabel] = useState("agora mesmo");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  async function refresh() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
        setLastUpdated(Date.now());
      }
    } finally {
      setLoading(false);
    }
  }

  // polling
  useEffect(() => {
    intervalRef.current = setInterval(refresh, POLL_INTERVAL_MS);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  // atualiza o label "atualizado X atrás" a cada 15s
  useEffect(() => {
    const t = setInterval(() => setSinceLabel(sinceUpdated(lastUpdated)), 15_000);
    return () => clearInterval(t);
  }, [lastUpdated]);

  const cards = [
    {
      href: "/admin/pdf-downloads",
      label: "Downloads do Ebook",
      icon: Download,
      value: stats.downloads,
      color: "from-[rgb(var(--color-brand-mint))]/20 to-[rgb(var(--color-brand-mint))]/5",
    },
    {
      href: "/admin/diagnostico-respostas",
      label: "Diagnósticos",
      icon: BarChart3,
      value: stats.diagnosticos,
      color: "from-[rgb(var(--color-brand-royal))]/20 to-[rgb(var(--color-brand-royal))]/5",
    },
    {
      href: "/admin/leads-escola",
      label: "Leads Escolas",
      icon: Users,
      value: stats.leads,
      color: "from-[rgb(var(--color-brand-sky))]/25 to-[rgb(var(--color-brand-sky))]/5",
    },
    {
      label: "Emails Únicos",
      icon: Mail,
      value: stats.emails_unicos,
      color: "from-[rgb(var(--color-brand-mint-deep))]/20 to-[rgb(var(--color-brand-mint-deep))]/5",
    },
  ];

  return (
    <div>
      {/* Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          const inner = (
            <>
              <div
                aria-hidden
                className={`absolute inset-0 -z-10 bg-gradient-to-br ${card.color} opacity-60 group-hover:opacity-100 transition-opacity`}
              />
              <div className="flex items-start justify-between mb-4">
                <div className="size-10 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center">
                  <Icon className="size-5 text-[rgb(var(--color-brand-mint))]" />
                </div>
                {"href" in card && (
                  <ArrowRight className="size-4 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-[color,transform]" />
                )}
              </div>
              <p className="text-white/75 text-[0.875rem] mb-2">{card.label}</p>
              <span className="font-display text-white text-[2rem] sm:text-[2.5rem] leading-none font-bold tabular-nums">
                {card.value.toLocaleString("pt-BR")}
              </span>
            </>
          );

          if ("href" in card && card.href) {
            return (
              <Link
                key={card.label}
                href={card.href}
                className="group relative rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 p-5 sm:p-6 overflow-hidden card-hover-lift"
              >
                {inner}
              </Link>
            );
          }
          return (
            <div
              key={card.label}
              className="group relative rounded-2xl bg-white/[0.04] border border-white/10 p-5 sm:p-6 overflow-hidden"
            >
              {inner}
            </div>
          );
        })}
      </section>

      {/* Barra de status + refresh */}
      <div className="mt-4 flex items-center justify-between text-[0.75rem] text-white/40 px-1">
        <span>
          Atualizado <span className="text-white/60">{sinceLabel}</span>
          <span className="mx-2">·</span>
          Sincroniza automaticamente a cada 60s
        </span>
        <button
          type="button"
          onClick={refresh}
          disabled={loading}
          className="inline-flex items-center gap-1.5 text-white/55 hover:text-white transition disabled:opacity-40"
        >
          <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
          Atualizar agora
        </button>
      </div>

      {/* Feed de atividade recente */}
      <section className="mt-8">
        <h2 className="font-display text-white text-[1.125rem] mb-4">Atividade recente</h2>
        {stats.recent.length === 0 ? (
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 text-center text-white/45">
            Nenhuma atividade registrada ainda.
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden divide-y divide-white/5">
            {stats.recent.map((entry) => {
              const cfg = TIPO_CONFIG[entry.tipo];
              const Icon = cfg.icon;
              const localidade = [entry.cidade, entry.uf]
                .filter((v) => v && v !== "—")
                .join(" · ");

              return (
                <Link
                  key={`${entry.tipo}-${entry.id}`}
                  href={cfg.href(entry.id)}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.03] transition group"
                >
                  {/* Ícone tipo */}
                  <div className={`size-8 shrink-0 rounded-lg flex items-center justify-center ${cfg.color}`}>
                    <Icon className="size-4" />
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-semibold text-[0.875rem] truncate">
                        {entry.nome}
                      </span>
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded text-[0.6rem] font-mono uppercase tracking-wider border shrink-0 ${cfg.color} border-current/30`}
                      >
                        {cfg.label}
                      </span>
                    </div>
                    <p className="text-white/50 text-[0.75rem] truncate mt-0.5">
                      {entry.email}
                      {localidade && (
                        <span className="ml-2 text-white/35">{localidade}</span>
                      )}
                    </p>
                  </div>

                  {/* Data */}
                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="text-white/65 text-[0.75rem] font-mono whitespace-nowrap">
                      {formatDateBR(entry.created_at)}
                    </p>
                    <p className="text-white/35 text-[0.6875rem] mt-0.5">
                      {timeAgo(entry.created_at)}
                    </p>
                  </div>

                  <ArrowRight className="size-3.5 text-white/25 group-hover:text-white/60 group-hover:translate-x-0.5 transition-[color,transform] shrink-0" />
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
