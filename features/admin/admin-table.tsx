"use client";

import { useState, useMemo, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";

// Re-exporta utilitários para conveniência de quem já importava daqui
export { formatDateBR, StatusBadge } from "@/lib/admin-format";

export type AdminColumn<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => ReactNode;
  /** Mostra no card mobile como destaque */
  primary?: boolean;
  className?: string;
};

export function AdminTable<T extends Record<string, any>>({
  rows,
  columns,
  total,
  pageSize = 50,
  rowHref,
  onDelete,
  emptyText = "Nada por aqui ainda.",
  searchableKeys = [],
}: {
  rows: T[];
  columns: AdminColumn<T>[];
  total: number;
  pageSize?: number;
  rowHref?: (row: T) => string | null;
  /** Se passado, cada linha ganha botao de excluir rapido (com confirmacao) */
  onDelete?: (row: T) => void;
  emptyText?: string;
  searchableKeys?: (keyof T | string)[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);

  // Filtro client-side (busca rápida na página atual)
  const filtered = useMemo(() => {
    if (!query.trim() || searchableKeys.length === 0) return rows;
    const q = query.toLowerCase();
    return rows.filter((row) =>
      searchableKeys.some((key) => {
        const val = (row as any)[key];
        if (val == null) return false;
        return String(val).toLowerCase().includes(q);
      }),
    );
  }, [query, rows, searchableKeys]);

  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  return (
    <div className="space-y-4">
      {/* Busca + total */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder="Buscar..."
            className="w-full h-10 pl-10 pr-4 text-[0.875rem] rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/30 focus:bg-white/[0.08] focus:border-[rgb(var(--color-brand-mint))]/50 outline-none transition"
          />
        </div>
        <p className="text-[0.75rem] text-white/50 font-mono">
          {filtered.length} de {total} {total === 1 ? "registro" : "registros"}
        </p>
      </div>

      {/* DESKTOP: Tabela (linha inteira clicavel se rowHref) */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/8 bg-white/[0.02]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/8">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`text-left text-[0.6875rem] font-mono uppercase tracking-wider text-white/55 font-bold px-3 py-2.5 whitespace-nowrap ${col.className || ""}`}
                >
                  {col.label}
                </th>
              ))}
              {(rowHref || onDelete) && (
                <th className="w-24 text-right text-[0.6875rem] font-mono uppercase tracking-wider text-white/55 font-bold px-3 py-3">
                  Ações
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (rowHref ? 1 : 0)}
                  className="px-4 py-10 text-center text-white/50 text-sm"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              paged.map((row, i) => {
                const href = rowHref?.(row);
                const clickable = !!href;
                return (
                  <tr
                    key={(row.id as string) || i}
                    onClick={() => {
                      if (href) router.push(href);
                    }}
                    className={`border-b border-white/5 last:border-0 row-hover group ${
                      clickable
                        ? "cursor-pointer hover:bg-[rgb(var(--color-brand-mint))]/[0.06]"
                        : "hover:bg-white/[0.03]"
                    }`}
                  >
                    {columns.map((col) => (
                      <td
                        key={String(col.key)}
                        className={`px-3 py-2.5 text-[0.8125rem] text-white/85 ${col.className || ""}`}
                      >
                        {col.render ? col.render(row) : String(row[col.key as keyof T] ?? "—")}
                      </td>
                    ))}
                    {(rowHref || onDelete) && (
                      <td className="px-3 py-3 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          {href && (
                            <Link
                              href={href}
                              onClick={(e) => e.stopPropagation()}
                              aria-label="Editar"
                              title="Editar"
                              className="inline-flex items-center justify-center size-8 rounded-lg bg-[rgb(var(--color-brand-mint))]/10 hover:bg-[rgb(var(--color-brand-mint))]/25 border border-[rgb(var(--color-brand-mint))]/30 text-[rgb(var(--color-brand-mint))] card-hover-soft"
                            >
                              <Pencil className="size-3.5" />
                            </Link>
                          )}
                          {onDelete && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDelete(row);
                              }}
                              aria-label="Excluir"
                              title="Excluir"
                              className="inline-flex items-center justify-center size-8 rounded-lg bg-red-500/10 hover:bg-red-500/25 border border-red-400/30 text-red-200 card-hover-soft"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE: Cards */}
      <div className="md:hidden space-y-3">
        {paged.length === 0 ? (
          <p className="text-center text-white/50 text-sm py-8">{emptyText}</p>
        ) : (
          paged.map((row, i) => {
            const href = rowHref?.(row);
            const primary = columns.find((c) => c.primary) ?? columns[0];
            const others = columns.filter((c) => c !== primary);
            const card = (
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 hover:bg-white/[0.05] card-hover-soft">
                <div className="mb-3">
                  <p className="font-display text-white text-[1rem] leading-tight">
                    {primary?.render ? primary.render(row) : String(row[primary?.key as keyof T] ?? "—")}
                  </p>
                </div>
                <dl className="space-y-1.5">
                  {others.map((col) => (
                    <div
                      key={String(col.key)}
                      className="flex items-baseline justify-between gap-3 text-[0.8125rem]"
                    >
                      <dt className="text-white/45 font-mono uppercase text-[0.625rem] tracking-wide shrink-0">
                        {col.label}
                      </dt>
                      <dd className="text-white/85 text-right min-w-0 truncate">
                        {col.render ? col.render(row) : String(row[col.key as keyof T] ?? "—")}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            );
            return href ? (
              <Link key={(row.id as string) || i} href={href} className="block">
                {card}
              </Link>
            ) : (
              <div key={(row.id as string) || i}>{card}</div>
            );
          })
        )}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-white/10 text-[0.8125rem] text-white/75 hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="size-4" /> Anterior
          </button>
          <span className="text-[0.75rem] text-white/55 font-mono">
            Página {page + 1} de {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-white/10 text-[0.8125rem] text-white/75 hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Próxima <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}

