"use client";

import { useState } from "react";
import { AdminTable, type AdminColumn } from "@/features/admin/admin-table";
import { formatDateBR } from "@/lib/admin-format";
import { DeleteConfirmModal } from "@/features/admin/delete-confirm-modal";

type PdfDownload = {
  id: string;
  created_at: string;
  nome_contato: string | null;
  email: string | null;
  telefone: string | null;
  cargo: string | null;
  nome_escola: string | null;
  cidade: string | null;
  uf: string | null;
  material: string | null;
  fluxo: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  utm_medium: string | null;
  fbclid: string | null;
};

const CARGO_LABEL: Record<string, string> = {
  mantenedor: "Mantenedor(a)",
  gestor: "Gestor(a)",
  diretor: "Diretor(a)",
  coordenador: "Coordenador(a)",
  professor: "Professor(a)",
};

export function PdfDownloadsClient({
  initialRows,
  total,
}: {
  initialRows: PdfDownload[];
  total: number;
}) {
  const [rows, setRows] = useState<PdfDownload[]>(initialRows);
  const [deletingRow, setDeletingRow] = useState<PdfDownload | null>(null);

  const handleDeleted = (id: string) => {
    setRows((r) => r.filter((row) => row.id !== id));
    setDeletingRow(null);
  };

  const columns: AdminColumn<PdfDownload>[] = [
    {
      key: "nome_contato",
      label: "Contato",
      primary: true,
      render: (r) => (
        <div>
          <p className="font-semibold text-white">{r.nome_contato || "—"}</p>
          <p className="text-white/45 text-[0.75rem] mt-0.5">
            {r.email || "—"}
          </p>
        </div>
      ),
    },
    {
      key: "nome_escola",
      label: "Escola",
      render: (r) => (
        <div className="min-w-0">
          <p className="font-medium truncate">{r.nome_escola || "—"}</p>
          <p className="text-white/45 text-[0.75rem] truncate mt-0.5">
            {[r.cidade, r.uf].filter(Boolean).join(" · ") || "—"}
          </p>
        </div>
      ),
    },
    {
      key: "cargo",
      label: "Cargo",
      className: "hidden md:table-cell",
      render: (r) => (
        <span className="text-[0.75rem] text-white/75">
          {r.cargo ? CARGO_LABEL[r.cargo] || r.cargo : "—"}
        </span>
      ),
    },
    {
      key: "telefone",
      label: "WhatsApp",
      className: "hidden lg:table-cell",
      render: (r) => (
        <a
          href={`https://wa.me/55${r.telefone?.replace(/\D/g, "")}`}
          target="_blank"
          rel="noreferrer"
          className="text-[0.75rem] text-[rgb(var(--color-brand-mint))] hover:underline"
        >
          {r.telefone || "—"}
        </a>
      ),
    },
    {
      key: "fluxo",
      label: "Origem",
      className: "hidden sm:table-cell",
      render: (r) => (
        <span className="text-[0.75rem] text-white/65 font-mono uppercase">
          {r.fluxo === "free-material" ? "📄 Free Material" : r.fluxo || "—"}
        </span>
      ),
    },
    {
      key: "utm_source",
      label: "UTM Source",
      className: "hidden xl:table-cell",
      render: (r) => (
        <span className="text-[0.75rem] text-white/65 font-mono">{r.utm_source || "—"}</span>
      ),
    },
    {
      key: "created_at",
      label: "Data de download",
      render: (r) => (
        <span className="text-[0.75rem] text-white/65 font-mono whitespace-nowrap">
          {formatDateBR(r.created_at)}
        </span>
      ),
    },
  ];

  return (
    <>
      <AdminTable<PdfDownload>
        rows={rows}
        columns={columns}
        total={total}
        onDelete={(r) => setDeletingRow(r)}
        searchableKeys={["nome_contato", "email", "telefone", "nome_escola", "cidade"]}
        emptyText="Nenhum download de PDF registrado ainda."
      />
      {deletingRow && (
        <DeleteConfirmModal
          table="pdf_downloads"
          id={deletingRow.id}
          itemLabel={deletingRow.nome_contato || "este download"}
          open={true}
          onClose={() => setDeletingRow(null)}
          onDeleted={handleDeleted}
        />
      )}
    </>
  );
}
