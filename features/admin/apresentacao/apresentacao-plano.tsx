"use client";

import { useRef, useState } from "react";
import {
  Maximize,
  Minimize,
  ExternalLink,
  Download,
  Presentation,
  Sparkles,
  CheckCircle2,
  Tv,
} from "lucide-react";
import type { GeoBrasil } from "./visuais";

export interface AnoProjetado {
  ano: number;
  receita: number;
  resultado: number;
  margemPct: number;
}

interface Props {
  anos: AnoProjetado[];
  geoBrasil: GeoBrasil | null;
  escolasPorEstado: Record<string, number>;
  estadosComLeiPropria: Record<string, number>;
}

export function ApresentacaoPlano({ }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [telaCheia, setTelaCheia] = useState(false);

  const alternarTelaCheia = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setTelaCheia(true);
        // Tenta dar foco ao iframe para que navegação por teclado (Setas) funcione diretamente
        iframeRef.current?.focus();
      }).catch((err) => {
        console.error("Erro ao entrar em tela cheia:", err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setTelaCheia(false);
      }).catch((err) => {
        console.error("Erro ao sair da tela cheia:", err);
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Barra de Ações Rápidas da Apresentação */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-[rgb(var(--color-brand-mint))]/15 text-[rgb(var(--color-brand-mint))] flex items-center justify-center border border-[rgb(var(--color-brand-mint))]/30 shrink-0">
            <Presentation className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-white text-base">Apresentação Oficial Deck Forge</span>
              <span className="px-2 py-0.5 rounded-full bg-[rgb(var(--color-brand-mint))]/20 text-[rgb(var(--color-brand-mint))] text-[0.6875rem] font-mono font-bold tracking-wider uppercase border border-[rgb(var(--color-brand-mint))]/30">
                30 Slides · 16:9 Canvas
              </span>
            </div>
            <p className="text-white/60 text-xs mt-0.5">
              Identidade visual da marca We Make, gráficos animados, zona fixa de logo e imagens Gemini Pro.
            </p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          <button
            type="button"
            onClick={alternarTelaCheia}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[rgb(var(--color-brand-mint))] hover:bg-[rgb(var(--color-brand-mint))]/90 text-[rgb(var(--color-brand-navy))] font-bold text-xs sm:text-sm shadow-lg shadow-[rgb(var(--color-brand-mint))]/10 transition cursor-pointer"
          >
            <Tv className="size-4" />
            <span>Exibir em Tela Cheia (1920x1080)</span>
          </button>

          <a
            href="/deck/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm border border-white/15 transition"
          >
            <ExternalLink className="size-4" />
            <span className="hidden sm:inline">Abrir em Nova Aba</span>
          </a>

          <a
            href="/docs/plano_negocio/Apresentacao_We_Make_Plano_de_Negocio_2027_2031.pdf"
            download="Apresentacao_We_Make_Plano_de_Negocio_2027_2031.pdf"
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm border border-white/15 transition"
          >
            <Download className="size-4" />
            <span className="hidden sm:inline">Baixar PDF</span>
          </a>
        </div>
      </div>

      {/* Destaques da Skill Deck Forge */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/8 flex items-center gap-3">
          <CheckCircle2 className="size-4 text-[rgb(var(--color-brand-mint))] shrink-0" />
          <span className="text-xs text-white/75">Narrativa &amp; 30 Slides Estruturados</span>
        </div>
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/8 flex items-center gap-3">
          <Sparkles className="size-4 text-[rgb(var(--color-brand-mint))] shrink-0" />
          <span className="text-xs text-white/75">Fotos Editoriais Gemini &amp; Visual Bento/Flow</span>
        </div>
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/8 flex items-center gap-3">
          <Tv className="size-4 text-[rgb(var(--color-brand-mint))] shrink-0" />
          <span className="text-xs text-white/75">Otimizado para Smart TV e Notebooks</span>
        </div>
      </div>

      {/* Container de exibição do Deck Canvas 16:9 em tela cheia ou responsivo */}
      <div
        ref={containerRef}
        className={`relative w-full rounded-2xl overflow-hidden border border-white/15 bg-[#0B0F1A] shadow-2xl transition-all ${
          telaCheia ? "fixed inset-0 z-50 rounded-none border-none" : "aspect-[16/9] min-h-[500px] lg:min-h-[640px]"
        }`}
      >
        <iframe
          ref={iframeRef}
          src="/deck/index.html"
          title="Apresentação We Make Plano de Negócio 2027-2031 (Deck Forge)"
          className="w-full h-full border-0"
          allow="fullscreen"
        />

        {/* Botão flutuante para alternar tela cheia dentro da janela */}
        <button
          type="button"
          onClick={alternarTelaCheia}
          aria-label={telaCheia ? "Sair da tela cheia" : "Entrar em tela cheia"}
          className="absolute top-4 right-4 z-30 size-10 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition shadow-lg"
        >
          {telaCheia ? <Minimize className="size-5" /> : <Maximize className="size-5" />}
        </button>
      </div>
    </div>
  );
}
