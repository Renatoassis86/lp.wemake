"use client";

import { useState } from "react";
import { AdminTable, type AdminColumn } from "@/features/admin/admin-table";
import { formatDateBR } from "@/lib/admin-format";
import { DeleteConfirmModal } from "@/features/admin/delete-confirm-modal";

type DiagnosticoCompleto = {
  id: string;
  created_at: string;
  nome_escola: string;
  nome_respondente: string | null;
  email: string | null;
  cidade: string | null;
  uf: string | null;
  funcao: string | null;
  status: string | null;
};

export function DiagnosticoRespostasClient({
  initialRows,
}: {
  initialRows: DiagnosticoCompleto[];
}) {
  const [rows, setRows] = useState<DiagnosticoCompleto[]>(initialRows);
  const [deletingRow, setDeletingRow] = useState<DiagnosticoCompleto | null>(null);

  const handleDeleted = (id: string) => {
    setRows((r) => r.filter((row) => row.id !== id));
    setDeletingRow(null);
  };

  const columns: AdminColumn<DiagnosticoCompleto>[] = [
    {
      key: "nome_escola",
      label: "Escola",
      primary: true,
      render: (r) => (
        <p className="font-semibold text-white truncate">{r.nome_escola || "—"}</p>
      ),
    },
    {
      key: "nome_respondente",
      label: "Respondente",
      render: (r) => (
        <div className="min-w-0">
          <p className="text-white truncate">{r.nome_respondente || "—"}</p>
          {r.funcao && r.funcao !== "pendente" && (
            <p className="text-white/45 text-[0.75rem] truncate capitalize">{r.funcao}</p>
          )}
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (r) => (
        <p className="text-white/85 text-[0.8125rem] truncate font-mono">{r.email || "—"}</p>
      ),
    },
    {
      key: "cidade",
      label: "Localidade",
      render: (r) => {
        const local = [r.cidade, r.uf].filter((v) => v && v !== "—").join(" — ");
        return (
          <p className="text-white/75 text-[0.8125rem] truncate">{local || "—"}</p>
        );
      },
    },
    {
      key: "created_at",
      label: "Data",
      render: (r) => (
        <span className="text-[0.75rem] text-white/65 font-mono whitespace-nowrap">
          {formatDateBR(r.created_at)}
        </span>
      ),
    },
  ];

  return (
    <>
      <AdminTable<DiagnosticoCompleto>
        rows={rows}
        columns={columns}
        total={rows.length}
        rowHref={(r) => `/admin/diagnostico-escola/${r.id}`}
        onDelete={(r) => setDeletingRow(r)}
        searchableKeys={["nome_escola", "nome_respondente", "email", "cidade"]}
        emptyText="Nenhum diagnóstico completo ainda."
      />
      {deletingRow && (
        <DeleteConfirmModal
          table="diagnostico_escola"
          id={deletingRow.id}
          itemLabel={deletingRow.nome_escola || "este diagnóstico"}
          cascade="todas as respostas vinculadas"
          open={true}
          onClose={() => setDeletingRow(null)}
          onDeleted={handleDeleted}
        />
      )}
    </>
  );
}
