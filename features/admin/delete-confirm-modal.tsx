"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, AlertTriangle, X } from "lucide-react";

/**
 * Modal de confirmação de exclusão — Sim/Não simples.
 * Controlado por `open/onClose`. Usado tanto pelo DeleteButton quanto
 * pelas listas (botão trash inline).
 */
export function DeleteConfirmModal({
  table,
  id,
  itemLabel,
  cascade,
  open,
  onClose,
  onDeleted,
  redirectTo,
}: {
  table: "leads_escola" | "diagnostico_escola";
  id: string;
  itemLabel: string;
  cascade?: string;
  open: boolean;
  onClose: () => void;
  /** Callback opcional após delete OK (usar para remover linha do estado local) */
  onDeleted?: (id: string) => void;
  /** Se passado, navega após delete (útil em página de detalhe) */
  redirectTo?: string;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function handleDelete() {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/data/${table}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.details || data?.error || "Falha ao excluir");
        setDeleting(false);
        return;
      }
      onDeleted?.(id);
      setDeleting(false);
      if (redirectTo) {
        router.push(redirectTo);
        router.refresh();
      } else {
        onClose();
        router.refresh();
      }
    } catch {
      setError("Falha de conexão.");
      setDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => !deleting && onClose()}
      />
      <div className="relative w-full max-w-md rounded-2xl bg-[rgb(var(--color-brand-navy))] border border-red-400/30 p-6 shadow-2xl">
        <button
          type="button"
          onClick={() => !deleting && onClose()}
          disabled={deleting}
          aria-label="Fechar"
          className="absolute top-3 right-3 size-8 inline-flex items-center justify-center rounded-lg hover:bg-white/5 text-white/60 card-hover-soft"
        >
          <X className="size-4" />
        </button>
        <div className="inline-flex items-center justify-center size-12 rounded-full bg-red-500/15 border border-red-400/30 mb-4">
          <AlertTriangle className="size-6 text-red-300" />
        </div>
        <h2 className="font-display text-white text-[1.25rem] leading-tight mb-2">
          Tem certeza?
        </h2>
        <p className="text-white/75 text-[0.9375rem] leading-relaxed mb-3">
          Você está prestes a excluir <strong className="text-white">{itemLabel}</strong>{" "}
          definitivamente do banco de dados. Esta ação{" "}
          <strong className="text-red-200">não pode ser desfeita</strong>.
        </p>
        {cascade && (
          <p className="text-amber-200/85 text-[0.8125rem] mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-400/30">
            Atenção: Também serão apagados: {cascade}
          </p>
        )}

        {error && (
          <p className="text-red-300 text-[0.8125rem] mb-3 p-2 bg-red-500/10 rounded">{error}</p>
        )}

        <div className="flex gap-3 justify-end mt-5">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="inline-flex items-center justify-center h-11 px-6 rounded-xl border border-white/15 hover:bg-white/5 text-white font-semibold text-[0.9375rem] card-hover-soft disabled:opacity-50"
          >
            Não
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            autoFocus
            className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-[0.9375rem] card-hover-lift disabled:opacity-50 disabled:cursor-wait"
          >
            {deleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
            {deleting ? "Excluindo..." : "Sim, excluir"}
          </button>
        </div>
      </div>
    </div>
  );
}
