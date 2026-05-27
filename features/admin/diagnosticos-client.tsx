"use client";

import { useState } from "react";
import { AdminTable, formatDateBR, type AdminColumn } from "@/features/admin/admin-table";
import { StatusEditor } from "@/features/admin/status-editor";

type Diagnostico = {
  id: string;
  created_at: string;
  nome_escola: string;
  cidade: string | null;
  uf: string | null;
  nome_respondente: string | null;
  funcao: string | null;
  email: string | null;
  whatsapp: string | null;
  telefone: string | null;
  segmentos: string[] | null;
  num_alunos: number | null;
  eh_confessional: string | null;
  tradicao_confessional: string | null;
  cargo_qualificado: string | null;
  espaco_maker: string | null;
  tamanho_escola: string | null;
  status: string | null;
  origem: string | null;
};

const STATUS_OPTIONS = [
  { value: "lead_capturado", label: "Lead capturado", variant: "default" as const },
  { value: "lead_qualificado", label: "Lead qualificado", variant: "warning" as const },
  { value: "diagnostico_completo", label: "Diagnóstico completo", variant: "success" as const },
  { value: "contatado", label: "Contatado", variant: "warning" as const },
  { value: "agendado", label: "Agendado", variant: "success" as const },
  { value: "fechado", label: "Fechado", variant: "success" as const },
  { value: "descartado", label: "Descartado", variant: "muted" as const },
];

export function DiagnosticosClient({
  initialRows,
  total,
}: {
  initialRows: Diagnostico[];
  total: number;
}) {
  const [rows, setRows] = useState<Diagnostico[]>(initialRows);

  const handleStatusChange = (id: string, newStatus: string) => {
    setRows((r) => r.map((row) => (row.id === id ? { ...row, status: newStatus } : row)));
  };

  const columns: AdminColumn<Diagnostico>[] = [
    {
      key: "nome_escola",
      label: "Escola",
      primary: true,
      render: (r) => (
        <div className="min-w-0">
          <p className="font-semibold text-white truncate">{r.nome_escola || "—"}</p>
          <p className="text-white/45 text-[0.75rem] mt-0.5 truncate">
            {[r.cidade, r.uf].filter(Boolean).join(" · ") || "—"}
          </p>
        </div>
      ),
    },
    {
      key: "nome_respondente",
      label: "Respondente",
      render: (r) => (
        <div className="min-w-0">
          <p className="text-white truncate">{r.nome_respondente || "—"}</p>
          <p className="text-white/45 text-[0.75rem] truncate">
            {r.funcao ? <span className="capitalize">{r.funcao}</span> : "—"}
          </p>
        </div>
      ),
    },
    {
      key: "email",
      label: "Contato",
      render: (r) => (
        <div className="min-w-0">
          <p className="text-white/85 text-[0.8125rem] truncate">{r.email || "—"}</p>
          <p className="text-white/45 text-[0.75rem] truncate">{r.whatsapp || r.telefone || "—"}</p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (r) => (
        <StatusEditor
          table="diagnostico_escola"
          id={r.id}
          field="status"
          value={r.status || "lead_capturado"}
          options={STATUS_OPTIONS}
          onChange={(newVal) => handleStatusChange(r.id, newVal)}
        />
      ),
    },
    {
      key: "created_at",
      label: "Criado",
      render: (r) => (
        <span className="text-[0.75rem] text-white/65 font-mono whitespace-nowrap">
          {formatDateBR(r.created_at)}
        </span>
      ),
    },
  ];

  return (
    <AdminTable<Diagnostico>
      rows={rows}
      columns={columns}
      total={total}
      rowHref={(r) => `/admin/diagnostico-escola/${r.id}`}
      searchableKeys={[
        "nome_escola",
        "cidade",
        "nome_respondente",
        "email",
        "whatsapp",
        "telefone",
      ]}
      emptyText="Nenhum diagnóstico ainda."
    />
  );
}
