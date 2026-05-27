"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2, Check, ChevronDown } from "lucide-react";
import { StatusBadge } from "@/features/admin/admin-table";

export type StatusOption = {
  value: string;
  label: string;
  variant?: "default" | "success" | "warning" | "muted";
};

export function StatusEditor({
  table,
  id,
  field,
  value,
  options,
  onChange,
}: {
  table: "leads_escola" | "diagnostico_escola";
  id: string;
  field: "status_lead" | "status";
  value: string;
  options: StatusOption[];
  onChange: (newValue: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  async function selectStatus(newValue: string) {
    if (newValue === value) {
      setOpen(false);
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/data/${table}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: newValue }),
      });
      if (!res.ok) {
        setError("Falha ao salvar");
        setSaving(false);
        return;
      }
      onChange(newValue);
      setOpen(false);
      setSaving(false);
    } catch {
      setError("Sem conexão");
      setSaving(false);
    }
  }

  const current = options.find((o) => o.value === value) ?? options[0]!;

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={saving}
        className="inline-flex items-center gap-1.5 hover:opacity-85 transition disabled:opacity-50"
      >
        <StatusBadge value={current.label} variant={current.variant} />
        {saving ? (
          <Loader2 className="size-3 text-white/50 animate-spin" />
        ) : (
          <ChevronDown className="size-3 text-white/40" />
        )}
      </button>

      {open && (
        <div className="absolute z-30 mt-1 right-0 min-w-[180px] bg-[rgb(var(--color-brand-navy))] border border-white/15 rounded-xl shadow-2xl py-1 backdrop-blur-md">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => selectStatus(opt.value)}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-[0.8125rem] text-white/85 hover:bg-white/8 transition"
            >
              <span>{opt.label}</span>
              {opt.value === value && <Check className="size-3.5 text-[rgb(var(--color-brand-mint))]" />}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="absolute -bottom-5 right-0 text-[0.6875rem] text-red-300 whitespace-nowrap">{error}</p>
      )}
    </div>
  );
}
