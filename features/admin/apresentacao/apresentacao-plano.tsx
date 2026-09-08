"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Maximize,
  Minimize,
  ExternalLink,
  Download,
  Tv,
  RefreshCw,
  Pencil,
  Save,
  Undo2,
  AlertTriangle,
  CheckCircle2,
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
  const [modoEdicao, setModoEdicao] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [status, setStatus] = useState<{ tipo: "ok" | "erro"; texto: string } | null>(null);
  const editKeyGuardRef = useRef<((e: KeyboardEvent) => void) | null>(null);

  const ajustarCaminhos = (html: string) =>
    html
      .replace(/href="deck.css"/g, 'href="/deck/deck.css"')
      .replace(/href="brand.css"/g, 'href="/deck/brand.css"')
      .replace(/src="icons.js"/g, 'src="/deck/icons.js"')
      .replace(/src="motion.js"/g, 'src="/deck/motion.js"')
      .replace(/src="presenter.js"/g, 'src="/deck/presenter.js"')
      .replace(/src="img\//g, 'src="/deck/img/');

  const carregarApresentacao = useCallback(() => {
    setCarregando(true);
    return fetch("/deck/index.html", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((html) => {
        setHtmlContent(ajustarCaminhos(html));
        setCarregando(false);
      })
      .catch((err) => {
        console.warn("Falha ao carregar via fetch, fallback para URL do iframe:", err);
        setCarregando(false);
      });
  }, []);

  useEffect(() => {
    // Carrega o HTML nativo da apresentação Deck Forge
    carregarApresentacao();

    // Monitora evento nativo de fullscreen para manter estado em sincronia em iPads/Android/Desktop
    const handleFullscreenChange = () => {
      const isFull = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement
      );
      setTelaCheia(isFull);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  const alternarTelaCheia = () => {
    if (!containerRef.current) return;

    const el = containerRef.current as any;
    const isCurrentlyFull = telaCheia || !!document.fullscreenElement;

    if (!isCurrentlyFull) {
      // Suporte nativo para Chrome/Firefox + WebKit (Safari iPad/iPhone)
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => setTelaCheia(true));
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
        setTelaCheia(true);
      } else {
        // Fallback total via CSS Overlay em dispositivos iOS/Safari restritos
        setTelaCheia(true);
      }
      iframeRef.current?.focus();
    } else {
      const doc = document as any;
      if (doc.exitFullscreen) {
        doc.exitFullscreen().catch(() => setTelaCheia(false));
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
        setTelaCheia(false);
      } else {
        setTelaCheia(false);
      }
    }
  };

  // Bloqueia os atalhos de teclado do próprio deck (setas, espaço, "p") enquanto
  // o usuário está digitando dentro de um campo contentEditable, para não trocar
  // de slide sem querer no meio da edição de texto.
  const guardaTeclado = (e: KeyboardEvent) => {
    const alvo = e.target as HTMLElement | null;
    if (alvo?.isContentEditable) {
      e.stopPropagation();
    }
  };

  const entrarModoEdicao = () => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) {
      setStatus({ tipo: "erro", texto: "Não foi possível acessar o conteúdo da apresentação para editar." });
      return;
    }

    doc.body.contentEditable = "true";
    doc.body.style.cursor = "text";

    // marca, controles e ícones ficam fora da edição de texto
    doc.querySelectorAll<HTMLElement>(".logo-zone, #deck-controls, svg").forEach((el) => {
      el.contentEditable = "false";
    });

    doc.addEventListener("keydown", guardaTeclado, true);
    editKeyGuardRef.current = guardaTeclado;

    setStatus(null);
    setModoEdicao(true);
  };

  const limparEdicao = () => {
    const doc = iframeRef.current?.contentDocument;
    if (doc) {
      doc.body.contentEditable = "false";
      doc.body.style.cursor = "";
      if (editKeyGuardRef.current) {
        doc.removeEventListener("keydown", editKeyGuardRef.current, true);
        editKeyGuardRef.current = null;
      }
    }
    setModoEdicao(false);
  };

  const descartarEdicao = () => {
    limparEdicao();
    setStatus(null);
    carregarApresentacao();
  };

  const salvarEdicao = async () => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) {
      setStatus({ tipo: "erro", texto: "Não foi possível ler o conteúdo editado." });
      return;
    }

    setSalvando(true);
    setStatus(null);
    try {
      const htmlFinal = "<!DOCTYPE html>\n" + doc.documentElement.outerHTML;
      const res = await fetch("/api/admin/plano-negocio/apresentacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: htmlFinal }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      limparEdicao();
      setStatus({
        tipo: "ok",
        texto: "Alterações salvas. O PDF baixável não é atualizado automaticamente — regenere-o à parte.",
      });
      carregarApresentacao();
    } catch (err: any) {
      setStatus({ tipo: "erro", texto: err?.message || "Erro ao salvar as alterações." });
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Barra Responsiva de Ações Rápidas (Mobile, iPad e Desktop) */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-xl bg-white/[0.04] border border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-[0.7rem] sm:text-xs font-mono text-[rgb(var(--color-brand-mint))] uppercase tracking-wider font-bold px-1">
            Plano 2027–2031
          </span>
          <span className="text-white/40 text-xs hidden sm:inline">|</span>
          <span className="text-xs text-white/70 hidden sm:inline">
            40 Slides Cinematográficos · Skill Deck Forge
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {modoEdicao ? (
            <>
              <button
                type="button"
                onClick={salvarEdicao}
                disabled={salvando}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgb(var(--color-brand-mint))] hover:bg-[rgb(var(--color-brand-mint))]/90 disabled:opacity-60 text-[rgb(var(--color-brand-navy))] font-bold text-xs shadow transition cursor-pointer"
              >
                {salvando ? <RefreshCw className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
                <span>{salvando ? "Salvando..." : "Salvar"}</span>
              </button>
              <button
                type="button"
                onClick={descartarEdicao}
                disabled={salvando}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 disabled:opacity-60 text-white font-medium text-xs border border-white/15 transition"
              >
                <Undo2 className="size-3.5" />
                <span className="hidden sm:inline">Descartar</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={entrarModoEdicao}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/15 transition cursor-pointer"
            >
              <Pencil className="size-3.5" />
              <span>Editar</span>
            </button>
          )}

          <button
            type="button"
            onClick={alternarTelaCheia}
            disabled={modoEdicao}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgb(var(--color-brand-mint))] hover:bg-[rgb(var(--color-brand-mint))]/90 disabled:opacity-40 text-[rgb(var(--color-brand-navy))] font-bold text-xs shadow transition cursor-pointer"
          >
            <Tv className="size-3.5" />
            <span>{telaCheia ? "Sair Tela Cheia" : "Tela Cheia"}</span>
          </button>

          <a
            href="/deck/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-xs border border-white/15 transition"
          >
            <ExternalLink className="size-3.5" />
            <span className="hidden sm:inline">Abrir Aba</span>
          </a>

          <a
            href="/Apresentacao_We_Make_Plano_de_Negocio_2027_2031.pdf"
            download="Apresentacao_We_Make_Plano_de_Negocio_2027_2031.pdf"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-xs border border-white/15 transition"
          >
            <Download className="size-3.5" />
            <span>PDF</span>
          </a>
        </div>
      </div>

      {modoEdicao && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
          <Pencil className="size-3.5 shrink-0" />
          <span>
            Modo de edição ativo — clique no texto dentro da apresentação para alterar. Nada é salvo até você clicar
            em <strong>Salvar</strong>.
          </span>
        </div>
      )}

      {status && (
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs border ${
            status.tipo === "ok"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
              : "bg-red-500/10 border-red-500/30 text-red-200"
          }`}
        >
          {status.tipo === "ok" ? (
            <CheckCircle2 className="size-3.5 shrink-0" />
          ) : (
            <AlertTriangle className="size-3.5 shrink-0" />
          )}
          <span>{status.texto}</span>
        </div>
      )}

      {/* Container de exibição 100% responsivo para Mobile, iPad e Tela Cheia */}
      <div
        ref={containerRef}
        className={`relative w-full rounded-2xl overflow-hidden border border-white/15 bg-[#0B0F1A] shadow-2xl transition-all ${
          telaCheia
            ? "fixed inset-0 z-[9999] w-screen h-screen rounded-none border-none p-0 m-0"
            : "aspect-[16/9] min-h-[320px] sm:min-h-[460px] md:min-h-[560px] lg:min-h-[640px]"
        }`}
      >
        {carregando && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0B0F1A] text-white/60 gap-3">
            <RefreshCw className="size-6 animate-spin text-[rgb(var(--color-brand-mint))]" />
            <span className="text-xs font-mono">Carregando apresentação...</span>
          </div>
        )}

        <iframe
          ref={iframeRef}
          srcDoc={htmlContent || undefined}
          src={htmlContent ? undefined : "/deck/index.html"}
          title="Apresentação We Make Plano de Negócio 2027-2031"
          className="w-full h-full border-0 touch-pan-x touch-pan-y"
          allow="fullscreen"
        />

        {/* Botão flutuante de alternar Tela Cheia */}
        <button
          type="button"
          onClick={alternarTelaCheia}
          aria-label={telaCheia ? "Sair da tela cheia" : "Entrar em tela cheia"}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 size-9 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition shadow-lg"
        >
          {telaCheia ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
        </button>
      </div>
    </div>
  );
}
