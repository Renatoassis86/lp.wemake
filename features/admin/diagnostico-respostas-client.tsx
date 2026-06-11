"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { formatDateBR } from "@/lib/admin-format";
import { DeleteConfirmModal } from "@/features/admin/delete-confirm-modal";

export function DiagnosticoRespostasClient({ initialRows }: { initialRows: any[] }) {
  const [rows, setRows] = useState(initialRows);
  const [deletingRow, setDeletingRow] = useState<any | null>(null);

  const handleDeleted = (id: string) => {
    setRows(rows.filter((r) => r.id !== id));
    setDeletingRow(null);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02]">
              <th className="px-4 sm:px-6 py-3 text-left text-[0.75rem] font-semibold text-white/55 uppercase tracking-wide">
                Escola
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-[0.75rem] font-semibold text-white/55 uppercase tracking-wide">
                Respondente
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-[0.75rem] font-semibold text-white/55 uppercase tracking-wide">
                Email
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-[0.75rem] font-semibold text-white/55 uppercase tracking-wide">
                Localidade
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-[0.75rem] font-semibold text-white/55 uppercase tracking-wide">
                Data
              </th>
              <th className="px-4 sm:px-6 py-3 text-center text-[0.75rem] font-semibold text-white/55 uppercase tracking-wide">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-white/55">
                  Nenhum diagnóstico completo ainda.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.03] transition">
                  <td className="px-4 sm:px-6 py-3 text-sm text-white/85">{row.nome_escola}</td>
                  <td className="px-4 sm:px-6 py-3 text-sm text-white/85">{row.nome_respondente}</td>
                  <td className="px-4 sm:px-6 py-3 text-sm text-white/55 font-mono text-[0.8125rem]">
                    {row.email}
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-sm text-white/55">
                    {row.cidade} — {row.uf}
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-sm text-white/55 font-mono text-[0.8125rem]">
                    {formatDateBR(row.created_at)}
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => setDeletingRow(row)}
                      className="inline-flex items-center justify-center size-8 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition"
                      title="Excluir diagnóstico"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {deletingRow && (
        <DeleteConfirmModal
          table="diagnostico_escola"
          id={deletingRow.id}
          itemLabel={`${deletingRow.nome_escola} (${deletingRow.nome_respondente})`}
          open={true}
          onClose={() => setDeletingRow(null)}
          onDeleted={handleDeleted}
        />
      )}
    </>
  );
}
