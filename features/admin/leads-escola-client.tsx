"use client";

import { useState } from "react";
import { AdminTable, StatusBadge, formatDateBR, type AdminColumn } from "@/features/admin/admin-table";
import { StatusEditor } from "@/features/admin/status-editor";

type Lead = {
  id: string;
  created_at: string;
  nome: string;
  cidade: string | null;
  uf: string | null;
  rep_legal_nome: string | null;
  rep_legal_email: string | null;
  rep_legal_tel: string | null;
  status_lead: string | null;
  observacoes: string | null;
  origem: string | null;
};

const STATUS_OPTIONS = [
  { value: "novo", label: "Novo", variant: "default" as const },
  { value: "contatado", label: "Contatado", variant: "warning" as const },
  { value: "qualificado", label: "Qualificado", variant: "success" as const },
  { value: "agendado", label: "Agendado", variant: "success" as const },
  { value: "fechado", label: "Fechado", variant: "success" as const },
  { value: "descartado", label: "Descartado", variant: "muted" as const },
];

export function LeadsEscolaClient({ initialRows, total }: { initialRows: Lead[]; total: number }) {
  const [rows, setRows] = useState<Lead[]>(initialRows);

  const handleStatusChange = (id: string, newStatus: string) => {
    setRows((r) => r.map((row) => (row.id === id ? { ...row, status_lead: newStatus } : row)));
  };

  const columns: AdminColumn<Lead>[] = [
    {
      key: "nome",
      label: "Escola",
      primary: true,
      render: (r) => (
        <div>
          <p className="font-semibold text-white">{r.nome || "—"}</p>
          <p className="text-white/45 text-[0.75rem] mt-0.5">
            {[r.cidade, r.uf].filter(Boolean).join(" · ") || "—"}
          </p>
        </div>
      ),
    },
    {
      key: "rep_legal_nome",
      label: "Responsável",
      render: (r) => (
        <div className="min-w-0">
          <p className="truncate">{r.rep_legal_nome || "—"}</p>
          <p className="text-white/45 text-[0.75rem] truncate mt-0.5">
            {r.rep_legal_email || r.rep_legal_tel || "—"}
          </p>
        </div>
      ),
    },
    {
      key: "origem",
      label: "Origem",
      render: (r) => (
        <span className="text-[0.75rem] text-white/65 font-mono">{r.origem || "—"}</span>
      ),
    },
    {
      key: "status_lead",
      label: "Status",
      render: (r) => (
        <StatusEditor
          table="leads_escola"
          id={r.id}
          field="status_lead"
          value={r.status_lead || "novo"}
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
    <AdminTable<Lead>
      rows={rows}
      columns={columns}
      total={total}
      rowHref={(r) => `/admin/leads-escola/${r.id}`}
      searchableKeys={["nome", "cidade", "rep_legal_nome", "rep_legal_email", "rep_legal_tel"]}
      emptyText="Nenhum lead capturado ainda."
    />
  );
}
