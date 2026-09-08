"use client";

import { useEffect, useRef, useState } from "react";
import {
  Maximize,
  Minimize,
  ExternalLink,
  Download,
  Tv,
  RefreshCw,
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
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Carrega o HTML nativo da apresentação Deck Forge para injetar diretamente via srcDoc (evita 404 de rotas estáticas)
    fetch("/deck/index.html")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((html) => {
        // Substitui caminhos relativos para garantir resolução de CSS/JS no domínio
        const htmlAjustado = html
          .replace(/href="deck.css"/g, 'href="/deck/deck.css"')
          .replace(/href="brand.css"/g, 'href="/deck/brand.css"')
          .replace(/src="icons.js"/g, 'src="/deck/icons.js"')
          .replace(/src="motion.js"/g, 'src="/deck/motion.js"')
          .replace(/src="presenter.js"/g, 'src="/deck/presenter.js"')
          .replace(/src="img\//g, 'src="/deck/img/');
        setHtmlContent(htmlAjustado);
        setCarregando(false);
      })
      .catch((err) => {
        console.warn("Falha ao carregar via fetch, fallback para URL do iframe:", err);
        setCarregando(false);
      });
  }, []);

  const alternarTelaCheia = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setTelaCheia(true);
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
    <div className="w-full flex flex-col gap-3">
      {/* Barra de Ações Rápidas */}
      <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[rgb(var(--color-brand-mint))] uppercase tracking-wider font-bold px-1">
            Plano de Negócio 2027–2031
          </span>
          <span className="text-white/40 text-xs hidden sm:inline">|</span>
          <span className="text-xs text-white/70 hidden sm:inline">
            30 Slides Cinematográficos · Skill Deck Forge
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={alternarTelaCheia}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[rgb(var(--color-brand-mint))] hover:bg-[rgb(var(--color-brand-mint))]/90 text-[rgb(var(--color-brand-navy))] font-bold text-xs shadow transition cursor-pointer"
          >
            <Tv className="size-3.5" />
            <span>Tela Cheia</span>
          </button>

          <a
            href="/deck/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-xs border border-white/15 transition"
          >
            <ExternalLink className="size-3.5" />
            <span>Abrir Aba</span>
          </a>

          <a
            href="/Apresentacao_We_Make_Plano_de_Negocio_2027_2031.pdf"
            download="Apresentacao_We_Make_Plano_de_Negocio_2027_2031.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-xs border border-white/15 transition"
          >
            <Download className="size-3.5" />
            <span>PDF (30 Slides)</span>
          </a>
        </div>
      </div>

      {/* Container da Apresentação Canvas 16:9 */}
      <div
        ref={containerRef}
        className={`relative w-full rounded-2xl overflow-hidden border border-white/15 bg-[#0B0F1A] shadow-2xl transition-all ${
          telaCheia ? "fixed inset-0 z-50 rounded-none border-none" : "aspect-[16/9] min-h-[500px] lg:min-h-[640px]"
        }`}
      >
        {carregando && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0B0F1A] text-white/60 gap-3">
            <RefreshCw className="size-6 animate-spin text-[rgb(var(--color-brand-mint))]" />
            <span className="text-xs font-mono">Carregando apresentação cinematográfica...</span>
          </div>
        )}

        <iframe
          ref={iframeRef}
          srcDoc={htmlContent || undefined}
          src={htmlContent ? undefined : "/deck/index.html"}
          title="Apresentação We Make Plano de Negócio 2027-2031"
          className="w-full h-full border-0"
          allow="fullscreen"
        />

        <button
          type="button"
          onClick={alternarTelaCheia}
          aria-label={telaCheia ? "Sair da tela cheia" : "Entrar em tela cheia"}
          className="absolute top-4 right-4 z-30 size-9 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition shadow-lg"
        >
          {telaCheia ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
        </button>
      </div>
    </div>
  );
}
