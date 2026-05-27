"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, AlertTriangle, X } from "lucide-react";

/**
 * Modal de confirmação de exclusão — controlado por `open/onClose`.
 * Usado tanto pelo DeleteButton quanto pelas listas (botão trash inline).
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
  const [confirmText, setConfirmText] = useState("");
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
      setConfirmText("");
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
          className="absolute top-3 right-3 size-8 inline-flex items-center justify-center rounded-lg hover:bg-white/5 text-white/60"
        >
          <X className="size-4" />
        </button>
        <div className="inline-flex items-center justify-center size-12 rounded-full bg-red-500/15 border border-red-400/30 mb-4">
          <AlertTriangle className="size-6 text-red-300" />
        </div>
        <h2 className="font-display text-white text-[1.25rem] leading-tight mb-2">
          Excluir registro?
        </h2>
        <p className="text-white/70 text-[0.875rem] leading-relaxed mb-3">
          Esta ação é <strong className="text-red-200">permanente</strong>. O registro{" "}
          <strong className="text-white">{itemLabel}</strong> será apagado do banco.
        </p>
        {cascade && (
          <p className="text-amber-200/85 text-[0.8125rem] mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-400/30">
            ⚠️ Também serão apagados: {cascade}
          </p>
        )}
        <p className="text-white/55 text-[0.75rem] mb-2">
          Digite <code className="text-red-200 font-mono">EXCLUIR</code> para confirmar:
        </p>
        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          disabled={deleting}
          autoFocus
          className="w-full h-10 px-3 mb-4 text-[0.875rem] rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/20 outline-none transition"
          placeholder="EXCLUIR"
        />

        {error && (
          <p className="text-red-300 text-[0.8125rem] mb-3 p-2 bg-red-500/10 rounded">{error}</p>
        )}

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="h-10 px-4 rounded-xl border border-white/15 hover:bg-white/5 text-white/75 font-medium text-[0.875rem] transition"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting || confirmText !== "EXCLUIR"}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-[0.875rem] transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {deleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
            {deleting ? "Excluindo..." : "Excluir permanentemente"}
          </button>
        </div>
      </div>
    </div>
  );
}
