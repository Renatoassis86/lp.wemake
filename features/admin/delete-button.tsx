"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { DeleteConfirmModal } from "@/features/admin/delete-confirm-modal";

/**
 * Botão "Excluir" + modal de confirmação. Usado nas páginas de detalhe.
 * Para listas, use diretamente o DeleteConfirmModal com estado controlado.
 */
export function DeleteButton({
  table,
  id,
  itemLabel,
  redirectTo,
  variant = "danger",
  size = "md",
  cascade,
}: {
  table: "leads_escola" | "diagnostico_escola";
  id: string;
  itemLabel: string;
  redirectTo: string;
  variant?: "danger" | "ghost";
  size?: "sm" | "md";
  cascade?: string;
}) {
  const [open, setOpen] = useState(false);

  const triggerClasses =
    variant === "danger"
      ? "bg-red-500/10 hover:bg-red-500/20 border-red-400/30 text-red-200"
      : "bg-white/5 hover:bg-white/10 border-white/15 text-white/75 hover:text-red-200";
  const sizeClasses =
    size === "sm" ? "h-10 px-3 text-[0.8125rem]" : "h-11 px-4 text-[0.875rem]";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-2 rounded-xl border font-semibold transition ${triggerClasses} ${sizeClasses}`}
      >
        <Trash2 className="size-4" />
        Excluir
      </button>

      <DeleteConfirmModal
        table={table}
        id={id}
        itemLabel={itemLabel}
        cascade={cascade}
        open={open}
        onClose={() => setOpen(false)}
        redirectTo={redirectTo}
      />
    </>
  );
}
