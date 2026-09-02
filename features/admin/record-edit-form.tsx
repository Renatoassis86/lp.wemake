"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export type FieldType = "text" | "email" | "tel" | "number" | "textarea" | "select" | "multi";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  /** Opções para type="select" ou "multi" */
  options?: { value: string; label: string }[];
  placeholder?: string;
  /** Toma full row (mais usado para grupos lado a lado) */
  colSpan?: 1 | 2;
  helper?: string;
};

export function RecordEditForm({
  table,
  id,
  initial,
  fields,
  redirectAfter,
}: {
  table: "leads_escola" | "diagnostico_escola";
  id: string;
  initial: Record<string, any>;
  fields: FieldDef[];
  redirectAfter?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, any>>(() => {
    const out: Record<string, any> = {};
    for (const f of fields) {
      const v = initial[f.name];
      out[f.name] =
        v == null
          ? f.type === "multi"
            ? []
            : ""
          : f.type === "multi"
            ? Array.isArray(v) ? v : []
            : v;
    }
    return out;
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  function setValue(name: string, value: any) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSavedAt(null);

    // Normaliza payload: campos numéricos viram number (ou null)
    const payload: Record<string, any> = { ...values };
    for (const numField of ["num_alunos", "maior_turma"]) {
      if (payload[numField] != null && payload[numField] !== "") {
        const n = Number(payload[numField]);
        payload[numField] = Number.isFinite(n) ? n : null;
      } else {
        payload[numField] = null;
      }
    }

    try {
      const res = await fetch(`/api/admin/data/${table}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setError(data?.details || data?.error || "Falha ao salvar");
        setSaving(false);
        return;
      }
      setSavedAt(new Date());
      setSaving(false);
      if (redirectAfter) {
        setTimeout(() => {
          router.push(redirectAfter);
          router.refresh();
        }, 600);
      } else {
        router.refresh();
      }
    } catch {
      setError("Sem conexão.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((f) => (
          <FieldRender
            key={f.name}
            field={f}
            value={values[f.name]}
            onChange={(v) => setValue(f.name, v)}
          />
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap pt-4 border-t border-white/10">
        <div className="min-h-[24px]">
          {error && (
            <p className="inline-flex items-center gap-1.5 text-red-300 text-[0.8125rem]">
              <AlertCircle className="size-4" /> {error}
            </p>
          )}
          {savedAt && !error && (
            <p className="inline-flex items-center gap-1.5 text-[rgb(var(--color-brand-mint))] text-[0.8125rem]">
              <CheckCircle2 className="size-4" /> Salvo às{" "}
              {savedAt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-[rgb(var(--color-brand-mint))] hover:bg-[rgb(var(--color-brand-mint-deep))] text-[rgb(var(--color-brand-navy))] font-bold text-[0.9375rem] transition disabled:opacity-60 disabled:cursor-wait"
        >
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {saving ? "Salvando..." : "Salvar alterações"}
        </button>
      </div>
    </form>
  );
}

function FieldRender({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: any;
  onChange: (v: any) => void;
}) {
  const colSpanClass = field.colSpan === 2 ? "sm:col-span-2" : "";
  const labelEl = (
    <label htmlFor={field.name} className="block text-[0.8125rem] font-semibold text-white/85 mb-1.5">
      {field.label}
    </label>
  );

  if (field.type === "textarea") {
    return (
      <div className={`${colSpanClass}`}>
        {labelEl}
        <textarea
          id={field.name}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          placeholder={field.placeholder}
          className="w-full px-3.5 py-2.5 text-[0.9375rem] rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/30 focus:bg-white/[0.06] focus:border-[rgb(var(--color-brand-mint))]/50 focus:ring-2 focus:ring-[rgb(var(--color-brand-mint))]/15 outline-none transition resize-y"
        />
        {field.helper && <p className="text-[0.75rem] text-white/45 mt-1">{field.helper}</p>}
      </div>
    );
  }
  if (field.type === "select") {
    return (
      <div className={colSpanClass}>
        {labelEl}
        <select
          id={field.name}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-11 px-3.5 text-[0.9375rem] rounded-xl bg-white/[0.04] border border-white/10 text-white focus:bg-white/[0.06] focus:border-[rgb(var(--color-brand-mint))]/50 outline-none transition"
        >
          <option value="">— Sem valor —</option>
          {(field.options || []).map((o) => (
            <option key={o.value} value={o.value} className="bg-[rgb(var(--color-brand-navy))]">
              {o.label}
            </option>
          ))}
        </select>
        {field.helper && <p className="text-[0.75rem] text-white/45 mt-1">{field.helper}</p>}
      </div>
    );
  }
  if (field.type === "multi") {
    const arr: string[] = Array.isArray(value) ? value : [];
    const toggle = (val: string) => {
      if (arr.includes(val)) onChange(arr.filter((x) => x !== val));
      else onChange([...arr, val]);
    };
    return (
      <div className={colSpanClass}>
        {labelEl}
        <div className="flex flex-wrap gap-2">
          {(field.options || []).map((o) => {
            const selected = arr.includes(o.value);
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => toggle(o.value)}
                className={`px-3.5 h-11 rounded-full border-2 font-semibold text-[0.8125rem] transition ${
                  selected
                    ? "border-[rgb(var(--color-brand-mint))] bg-[rgb(var(--color-brand-mint))]/15 text-[rgb(var(--color-brand-mint))]"
                    : "border-white/15 text-white/70 hover:border-white/30"
                }`}
              >
                {o.label}
              </button>
            );
          })}
        </div>
        {field.helper && <p className="text-[0.75rem] text-white/45 mt-1">{field.helper}</p>}
      </div>
    );
  }
  return (
    <div className={colSpanClass}>
      {labelEl}
      <input
        id={field.name}
        type={field.type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className="w-full h-11 px-3.5 text-[0.9375rem] rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/30 focus:bg-white/[0.06] focus:border-[rgb(var(--color-brand-mint))]/50 focus:ring-2 focus:ring-[rgb(var(--color-brand-mint))]/15 outline-none transition"
      />
      {field.helper && <p className="text-[0.75rem] text-white/45 mt-1">{field.helper}</p>}
    </div>
  );
}
