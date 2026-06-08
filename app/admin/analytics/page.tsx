"use client";

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { MousePointerClick, Users, DollarSign, Target, Loader2, AlertCircle } from "lucide-react";

export default function AnalyticsDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await fetch("/api/metrics");
        if (!res.ok) {
          throw new Error("Falha ao carregar as métricas de tráfego.");
        }
        const json = await res.json();
        if (json.ok) {
          setData(json);
        } else {
          throw new Error(json.error || "Erro desconhecido");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="size-8 text-[rgb(var(--color-brand-royal))] animate-spin" />
        <p className="text-white/60 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
          Carregando dados em tempo real...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-6 max-w-xl mx-auto my-8 flex items-start gap-4">
        <AlertCircle className="size-6 text-red-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-red-200 font-semibold mb-1">Erro de Integração</h3>
          <p className="text-red-300/80 text-sm mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded-xl text-red-200 text-xs font-mono transition"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const isHybrid = !data.integrations.googleAnalytics.active || !data.integrations.metaAds.active;

  const cardItems = [
    {
      title: "Acessos (Sessões)",
      value: data.cards.sessions.value,
      subtitle: data.integrations.googleAnalytics.active ? "Dados reais do GA4" : "Aguardando API",
      icon: MousePointerClick,
      color: "text-blue-400",
    },
    {
      title: "Leads Capturados",
      value: data.cards.leads.value,
      subtitle: "Total real (Formulários + Diagnósticos)",
      icon: Users,
      color: "text-emerald-400",
    },
    {
      title: "Gasto em Ads (Meta)",
      value: data.cards.spend.value,
      subtitle: data.integrations.metaAds.active ? "Dados reais da Meta API" : "Aguardando API",
      icon: DollarSign,
      color: "text-rose-400",
    },
    {
      title: "Agendamentos",
      value: data.cards.meetings.value,
      subtitle: `Taxa de Conversão: ${data.cards.meetings.rate}`,
      icon: Target,
      color: "text-amber-400",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-royal))]/90 font-bold mb-2">
            Inteligência & Tráfego
          </p>
          <h1 className="font-display text-white text-[clamp(1.875rem,3vw,2.5rem)] leading-[1.05]">
            Analytics & Funil
          </h1>
          <p className="text-white/65 text-[0.9375rem] sm:text-base mt-2 max-w-2xl">
            Acompanhe o desempenho das campanhas em tempo real. Esta visão unifica os cliques no anúncio com os agendamentos finais.
          </p>
        </div>

        {/* Status das conexões */}
        <div className="flex flex-col gap-1.5 p-3.5 bg-white/[0.02] border border-white/10 rounded-xl text-[11px] font-mono text-white/50 w-full md:w-auto">
          <div className="text-white/30 uppercase tracking-wider text-[10px] mb-1 font-bold">Status das Integrações</div>
          <div className="flex items-center gap-2">
            <span className={`size-1.5 rounded-full ${data.integrations.googleAnalytics.active ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <span>GA4 API: {data.integrations.googleAnalytics.active ? 'Ativa' : 'Aguardando API'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`size-1.5 rounded-full ${data.integrations.metaAds.active ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <span>Meta Ads API: {data.integrations.metaAds.active ? 'Ativa' : 'Aguardando API'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <span>Supabase Leads: Ativo (Real)</span>
          </div>
        </div>
      </header>

      {/* Cards de Topo */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardItems.map((card, i) => (
          <div key={i} className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 relative overflow-hidden flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="text-white/60 font-medium text-sm">{card.title}</span>
              <card.icon className={"size-5 " + card.color} />
            </div>
            <div className="text-3xl font-display font-bold text-white mb-1">{card.value}</div>
            <div className="text-xs font-mono text-white/40 uppercase tracking-wider">{card.subtitle}</div>
          </div>
        ))}
      </section>

      {/* Gráficos */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Gráfico de Linha: Evolução */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
          <h3 className="text-white/80 font-medium mb-6">Acessos vs Leads Gerados (Últimos 7 dias)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#040814', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" name="Sessões" dataKey="acessos" stroke="#60a5fa" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" name="Leads" dataKey="leads" stroke="#34d399" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Barras: Funil */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
          <h3 className="text-white/80 font-medium mb-6">Funil de Conversão Global</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.funnelData} layout="vertical" margin={{ left: 40, top: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="stage" stroke="rgba(255,255,255,0.6)" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#040814', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                />
                <Bar dataKey="count" name="Total" fill="#818cf8" radius={[0, 4, 4, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </section>

      {/* Tabela de Campanhas */}
      <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 overflow-hidden">
        <h3 className="text-white/80 font-medium mb-4">Desempenho por Campanha (UTM)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10 text-white/50 text-sm font-medium">
                <th className="pb-3 pr-4 font-mono font-normal">Campanha (utm_campaign)</th>
                <th className="pb-3 px-4 font-mono font-normal">Sessões</th>
                <th className="pb-3 px-4 font-mono font-normal">Leads</th>
                <th className="pb-3 px-4 font-mono font-normal">Custo (Meta)</th>
                <th className="pb-3 pl-4 font-mono font-normal text-right">Agendamentos</th>
              </tr>
            </thead>
            <tbody className="text-white/80 text-sm">
              {data.campaigns.map((c: any, i: number) => (
                <tr key={i} className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 pr-4 font-medium text-white max-w-[280px] truncate" title={c.campaign}>
                    {c.campaign}
                  </td>
                  <td className="py-4 px-4 text-blue-400">{c.sessions.toLocaleString("pt-BR")}</td>
                  <td className="py-4 px-4 text-emerald-400">{c.leads.toLocaleString("pt-BR")}</td>
                  <td className="py-4 px-4 text-rose-400">
                    R$ {c.spend.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-4 pl-4 text-right font-bold text-amber-400">{c.meetings.toLocaleString("pt-BR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
          <p className="text-xs text-white/40 font-mono">
            {isHybrid 
              ? "* Integração parcial. Insira as credenciais no painel (Vercel ou .env.local) para ativar todas as conexões em tempo real." 
              : "* Integração de dados em tempo real ativa (Supabase + Google Analytics + Meta Ads)."}
          </p>
        </div>
      </section>

    </div>
  );
}
