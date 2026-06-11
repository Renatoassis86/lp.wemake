"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

/**
 * Botão de "Baixar planilha" — dispara GET no /api/admin/export/<table>
 * e força o download do XLSX gerado.
 */
export function ExportButton({
  table,
  label = "Baixar planilha",
}: {
  table: "leads_escola" | "diagnostico_escola" | "diagnostico_respostas" | "pdf_downloads";
  label?: string;
}) {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleExport() {
    setDownloading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/export/${table}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Falha ao exportar");
        setDownloading(false);
        return;
      }
      const blob = await res.blob();
      const cd = res.headers.get("content-disposition") || "";
      const match = cd.match(/filename="([^"]+)"/);
      const filename = match?.[1] || `${table}.xlsx`;

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloading(false);
    } catch {
      setError("Falha de conexão.");
      setDownloading(false);
    }
  }

  return (
    <div className="inline-flex flex-col items-end">
      <button
        type="button"
        onClick={handleExport}
        disabled={downloading}
        className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[rgb(var(--color-brand-mint))]/10 hover:bg-[rgb(var(--color-brand-mint))]/20 border border-[rgb(var(--color-brand-mint))]/30 text-[rgb(var(--color-brand-mint))] font-bold text-[0.875rem] transition disabled:opacity-60 disabled:cursor-wait"
      >
        {downloading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Download className="size-4" />
        )}
        {downloading ? "Gerando..." : label}
      </button>
      {error && (
        <p className="text-red-300 text-[0.75rem] mt-1">{error}</p>
      )}
    </div>
  );
}
