/**
 * Utilitários de formatação compartilhados entre server e client components
 * do /admin. Mantenha este arquivo SEM "use client" pra poder ser importado
 * em qualquer lugar.
 */

export function formatDateBR(iso?: string | null): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function StatusBadge({
  value,
  variant = "default",
}: {
  value: string;
  variant?: "default" | "success" | "warning" | "muted";
}) {
  const styles =
    variant === "success"
      ? "bg-[rgb(var(--color-brand-mint))]/15 text-[rgb(var(--color-brand-mint))] border-[rgb(var(--color-brand-mint))]/30"
      : variant === "warning"
        ? "bg-amber-400/10 text-amber-200 border-amber-400/30"
        : variant === "muted"
          ? "bg-white/5 text-white/55 border-white/10"
          : "bg-[rgb(var(--color-brand-sky))]/15 text-[rgb(var(--color-brand-sky))] border-[rgb(var(--color-brand-sky))]/30";

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[0.6875rem] font-mono uppercase tracking-wide whitespace-nowrap ${styles}`}
    >
      {value}
    </span>
  );
}
