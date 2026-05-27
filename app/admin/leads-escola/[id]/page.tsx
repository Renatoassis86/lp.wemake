import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { formatDateBR } from "@/lib/admin-format";
import { RecordEditForm, type FieldDef } from "@/features/admin/record-edit-form";
import { DeleteButton } from "@/features/admin/delete-button";

export const dynamic = "force-dynamic";

const LEAD_FIELDS: FieldDef[] = [
  { name: "nome", label: "Escola", type: "text", colSpan: 2 },
  { name: "cidade", label: "Cidade", type: "text" },
  { name: "uf", label: "UF", type: "text", placeholder: "PB" },
  { name: "rep_legal_nome", label: "Responsável", type: "text", colSpan: 2 },
  { name: "rep_legal_email", label: "E-mail", type: "email" },
  { name: "rep_legal_tel", label: "Telefone / WhatsApp", type: "tel" },
  { name: "origem", label: "Origem", type: "text", helper: "ex: wemake-landing-material" },
  {
    name: "status_lead",
    label: "Status",
    type: "select",
    options: [
      { value: "novo", label: "Novo" },
      { value: "contatado", label: "Contatado" },
      { value: "qualificado", label: "Qualificado" },
      { value: "agendado", label: "Agendado" },
      { value: "fechado", label: "Fechado" },
      { value: "descartado", label: "Descartado" },
    ],
  },
  {
    name: "observacoes",
    label: "Observações internas",
    type: "textarea",
    colSpan: 2,
    helper: "Anotações do time — não vão pra escola.",
  },
];

async function fetchLead(id: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) return null;
  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/leads_escola?id=eq.${encodeURIComponent(id)}&select=*`,
      {
        headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
        cache: "no-store",
      },
    );
    if (!res.ok) return null;
    const rows = await res.json().catch(() => []);
    return Array.isArray(rows) && rows[0] ? rows[0] : null;
  } catch {
    return null;
  }
}

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await fetchLead(id);
  if (!lead) notFound();

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <Link
          href="/admin/leads-escola"
          className="inline-flex items-center gap-1.5 text-[0.8125rem] text-white/65 hover:text-white transition"
        >
          <ArrowLeft className="size-4" /> Voltar para lista
        </Link>
        <DeleteButton
          table="leads_escola"
          id={lead.id}
          itemLabel={lead.nome || "este lead"}
          redirectTo="/admin/leads-escola"
        />
      </div>

      <header className="mb-6">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-mint))]/90 font-bold mb-2">
          Lead capturado em {formatDateBR(lead.created_at)}
        </p>
        <h1 className="font-display text-white text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1]">
          {lead.nome || "Sem nome"}
        </h1>
        {lead.updated_at && lead.updated_by && (
          <p className="text-white/45 text-[0.75rem] mt-1 font-mono">
            Última edição: {formatDateBR(lead.updated_at)} por {lead.updated_by}
          </p>
        )}
      </header>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
        <RecordEditForm
          table="leads_escola"
          id={lead.id}
          initial={lead}
          fields={LEAD_FIELDS}
        />
      </div>
    </div>
  );
}
