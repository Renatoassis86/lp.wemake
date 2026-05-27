"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Loga pra Vercel function logs (use o digest pra grep)
    console.error("[admin-error]", error.message, error.digest, error.stack);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full rounded-2xl border border-red-400/20 bg-red-500/[0.04] p-6 sm:p-8 text-center">
        <div className="inline-flex items-center justify-center size-14 rounded-full bg-red-500/15 border border-red-400/30 mb-5">
          <AlertTriangle className="size-7 text-red-300" />
        </div>
        <h1 className="font-display text-white text-[1.5rem] sm:text-[1.75rem] leading-tight mb-2">
          Erro nesta página
        </h1>
        <p className="text-white/70 text-[0.9375rem] leading-relaxed mb-5">
          Aconteceu algo inesperado ao carregar os dados.
        </p>
        {error.digest && (
          <p className="text-[0.75rem] text-white/45 font-mono mb-2">
            Digest: <span className="text-white/70">{error.digest}</span>
          </p>
        )}
        {error.message && (
          <pre className="text-[0.75rem] text-red-200/80 bg-black/30 rounded-lg p-3 mb-5 text-left overflow-auto max-h-32 whitespace-pre-wrap break-all">
            {error.message}
          </pre>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-[rgb(var(--color-brand-mint))] hover:bg-[rgb(var(--color-brand-mint-deep))] text-[rgb(var(--color-brand-navy))] font-bold text-[0.875rem] transition"
          >
            <RefreshCw className="size-4" />
            Tentar novamente
          </button>
          <a
            href="/admin"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-xl border border-white/15 hover:bg-white/5 text-white/85 font-medium text-[0.875rem] transition"
          >
            <Home className="size-4" />
            Voltar para o painel
          </a>
        </div>
      </div>
    </main>
  );
}
