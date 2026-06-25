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
  whatsapp: string | null;
  funcao: string | null;
  cargo_qualificado: string | null;
  espaco_maker: string | null;
  tamanho_escola: string | null;
  cidade: string | null;
  uf: string | null;
  status: string | null;
};

const FUNCAO_LABEL: Record<string, string> = {
  mantenedor: "Mantenedor(a)",
  diretor: "Diretor(a)",
  coordenador: "Coordenador(a)",
  professor: "Professor(a)",
  gestor: "Gestor(a)",
  outro: "Outro",
};

const CARGO_QUAL_LABEL: Record<string, string> = {
  gestor: "Gestor / Diretor",
  professor: "Professor(a)",
  mantenedor: "Mantenedor(a)",
  outro: "Outro",
};

const ESPACO_MAKER_LABEL: Record<string, string> = {
  tem_funciona: "Tem e funciona",
  tem_melhorar: "Tem, precisa melhorar",
  planejando: "Planejando construir",
  nao_tem: "Não tem",
};

const ESPACO_MAKER_COLOR: Record<string, string> = {
  tem_funciona: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  tem_melhorar: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  planejando: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  nao_tem: "bg-red-500/20 text-red-300 border-red-500/30",
};

const TAMANHO_LABEL: Record<string, string> = {
  pequena: "< 200 alunos",
  media: "200–500 alunos",
  grande: "500+ alunos",
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
        <div>
          <p className="font-semibold text-white truncate">{r.nome_escola || "—"}</p>
          {(r.cidade || r.uf) && (
            <p className="text-white/45 text-[0.75rem] mt-0.5 truncate">
              {[r.cidade, r.uf].filter((v) => v && v !== "—").join(" — ")}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "nome_respondente",
      label: "Respondente",
      render: (r) => {
        const cargoLabel =
          r.cargo_qualificado
            ? CARGO_QUAL_LABEL[r.cargo_qualificado] || r.cargo_qualificado
            : r.funcao && r.funcao !== "pendente"
            ? FUNCAO_LABEL[r.funcao] || r.funcao
            : null;
        return (
          <div className="min-w-0">
            <p className="text-white truncate">{r.nome_respondente || "—"}</p>
            {cargoLabel && (
              <p className="text-white/45 text-[0.75rem] truncate capitalize">{cargoLabel}</p>
            )}
          </div>
        );
      },
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      className: "hidden md:table-cell",
      render: (r) =>
        r.whatsapp ? (
          <a
            href={`https://wa.me/55${r.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="text-[0.75rem] text-[rgb(var(--color-brand-mint))] hover:underline font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            {r.whatsapp}
          </a>
        ) : (
          <span className="text-white/30 text-[0.75rem]">—</span>
        ),
    },
    {
      key: "espaco_maker",
      label: "Espaço Maker",
      className: "hidden lg:table-cell",
      render: (r) => {
        if (!r.espaco_maker) return <span className="text-white/30 text-[0.75rem]">—</span>;
        const colorClass = ESPACO_MAKER_COLOR[r.espaco_maker] || "bg-white/10 text-white/60 border-white/20";
        return (
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.7rem] font-medium border ${colorClass}`}>
            {ESPACO_MAKER_LABEL[r.espaco_maker] || r.espaco_maker}
          </span>
        );
      },
    },
    {
      key: "tamanho_escola",
      label: "Tamanho",
      className: "hidden xl:table-cell",
      render: (r) => (
        <span className="text-[0.75rem] text-white/65">
          {r.tamanho_escola ? TAMANHO_LABEL[r.tamanho_escola] || r.tamanho_escola : "—"}
        </span>
      ),
    },
    {
      key: "email",
      label: "E-mail",
      className: "hidden xl:table-cell",
      render: (r) => (
        <p className="text-white/75 text-[0.75rem] truncate font-mono">{r.email || "—"}</p>
      ),
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
        searchableKeys={["nome_escola", "nome_respondente", "email", "whatsapp", "cidade"]}
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
