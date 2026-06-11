"use client";

import { Container } from "@/components/ui/container";
import { Download, BarChart3, CheckCircle2 } from "lucide-react";

type Analytics = {
  totalDownloads: number;
  totalDiagnosis: number;
  conversionRate: string;
};

export function AnalyticsDownloads({ analytics }: { analytics: Analytics }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-display text-white text-2xl mb-2">📊 Ebook & Diagnóstico</h2>
        <p className="text-white/55">Diferenciação entre Downloads e Diagnósticos Completos</p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Card 1: Downloads */}
        <div className="bg-white/[0.05] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-[rgb(var(--color-brand-mint))]/20">
              <Download className="size-5 text-[rgb(var(--color-brand-mint))]" />
            </div>
            <h3 className="text-white font-semibold">Downloads do Ebook</h3>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{analytics.totalDownloads}</p>
          <p className="text-white/50 text-sm">Pessoas que fizeram download do PDF</p>
          <p className="text-white/40 text-xs mt-2">📁 Tabela: pdf_downloads</p>
        </div>

        {/* Card 2: Diagnóstico */}
        <div className="bg-white/[0.05] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-[rgb(var(--color-brand-royal))]/20">
              <BarChart3 className="size-5 text-[rgb(var(--color-brand-royal))]" />
            </div>
            <h3 className="text-white font-semibold">Diagnósticos Completos</h3>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{analytics.totalDiagnosis}</p>
          <p className="text-white/50 text-sm">Pessoas que responderam 8 blocos de perguntas</p>
          <p className="text-white/40 text-xs mt-2">📁 Tabela: diagnostico_respostas</p>
        </div>

        {/* Card 3: Taxa de Conversão */}
        <div className="bg-white/[0.05] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-[rgb(var(--color-brand-mint-deep))]/20">
              <CheckCircle2 className="size-5 text-[rgb(var(--color-brand-mint-deep))]" />
            </div>
            <h3 className="text-white font-semibold">Taxa de Conversão</h3>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{analytics.conversionRate}</p>
          <p className="text-white/50 text-sm">% de quem fez download → diagnóstico</p>
          <p className="text-white/40 text-xs mt-2">📊 (Diagnósticos / Downloads)</p>
        </div>
      </div>

      {/* Explicação */}
      <div className="bg-white/[0.03] border border-white/8 rounded-lg p-5">
        <h4 className="font-semibold text-white mb-3">📋 Diferença entre os módulos:</h4>
        <div className="space-y-3 text-sm text-white/70">
          <div>
            <p className="text-[rgb(var(--color-brand-mint))] font-semibold">📄 Downloads (pdf_downloads)</p>
            <p className="ml-4">✅ Usuário preencheu formulário de 4 campos (nome, email, WhatsApp, escola)</p>
            <p className="ml-4">✅ Foi qualificado (cargo, espaço maker, tamanho)</p>
            <p className="ml-4">✅ Clicou em "Baixar PDF" e recebeu o ebook</p>
          </div>
          <div>
            <p className="text-[rgb(var(--color-brand-royal))] font-semibold">📊 Diagnósticos (diagnostico_respostas)</p>
            <p className="ml-4">✅ Usuário respondeu todos os 8 blocos de perguntas</p>
            <p className="ml-4">✅ Resultado: Diagnóstico completo de maturidade tecnológica</p>
            <p className="ml-4">✅ Muito mais qualificado para venda</p>
          </div>
        </div>
      </div>
    </div>
  );
}
