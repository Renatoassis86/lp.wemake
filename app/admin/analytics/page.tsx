"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { MousePointerClick, Users, DollarSign, Target } from "lucide-react";

const lineData = [
  { name: "01/06", acessos: 400, leads: 24 },
  { name: "02/06", acessos: 300, leads: 13 },
  { name: "03/06", acessos: 550, leads: 48 },
  { name: "04/06", acessos: 450, leads: 39 },
  { name: "05/06", acessos: 600, leads: 55 },
  { name: "06/06", acessos: 700, leads: 68 },
];

const funnelData = [
  { stage: "Acessos", count: 3000 },
  { stage: "Diagnósticos", count: 800 },
  { stage: "Leads Capturados", count: 247 },
  { stage: "Agendamentos", count: 42 },
];

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-royal))]/90 font-bold mb-2">
          Inteligência & Tráfego
        </p>
        <h1 className="font-display text-white text-[clamp(1.875rem,3vw,2.5rem)] leading-[1.05]">
          Analytics & Funil
        </h1>
        <p className="text-white/65 text-[0.9375rem] sm:text-base mt-2 max-w-2xl">
          Acompanhe o desempenho das campanhas em tempo real. Esta visão unifica os cliques no anúncio com os agendamentos finais.
        </p>
      </header>

      {/* Cards de Topo */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Acessos (Sessões)", value: "3.000", subtitle: "+12% vs mês anterior", icon: MousePointerClick, color: "text-blue-400" },
          { title: "Leads Capturados", value: "247", subtitle: "Custo por Lead: R$ 14,50", icon: Users, color: "text-emerald-400" },
          { title: "Gasto em Ads (Meta)", value: "R$ 3.581", subtitle: "Orçamento Mês: 5k", icon: DollarSign, color: "text-rose-400" },
          { title: "Agendamentos", value: "42", subtitle: "Taxa de Conversão: 17%", icon: Target, color: "text-amber-400" },
        ].map((card, i) => (
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
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#040814', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="acessos" stroke="#60a5fa" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="leads" stroke="#34d399" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Barras: Funil */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
          <h3 className="text-white/80 font-medium mb-6">Funil de Conversão Global</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ left: 40, top: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="stage" stroke="rgba(255,255,255,0.6)" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#040814', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                />
                <Bar dataKey="count" fill="#818cf8" radius={[0, 4, 4, 0]} barSize={32} />
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
              <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                <td className="py-4 pr-4 font-medium text-white">bf_escolas_privadas_nov</td>
                <td className="py-4 px-4 text-blue-400">1.250</td>
                <td className="py-4 px-4 text-emerald-400">115</td>
                <td className="py-4 px-4 text-rose-400">R$ 1.200</td>
                <td className="py-4 pl-4 text-right font-bold text-amber-400">22</td>
              </tr>
              <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                <td className="py-4 pr-4 font-medium text-white">retargeting_diagnostico_30d</td>
                <td className="py-4 px-4 text-blue-400">800</td>
                <td className="py-4 px-4 text-emerald-400">89</td>
                <td className="py-4 px-4 text-rose-400">R$ 450</td>
                <td className="py-4 pl-4 text-right font-bold text-amber-400">14</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 pr-4 font-medium text-white">organico_instagram</td>
                <td className="py-4 px-4 text-blue-400">950</td>
                <td className="py-4 px-4 text-emerald-400">43</td>
                <td className="py-4 px-4 text-rose-400">R$ 0</td>
                <td className="py-4 pl-4 text-right font-bold text-amber-400">6</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
          <p className="text-xs text-white/40 font-mono">* Valores simulados. Será integrado com a API Metrics na Fase 3.</p>
        </div>
      </section>

    </div>
  );
}
