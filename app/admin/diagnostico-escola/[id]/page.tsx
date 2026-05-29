import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Users, Building2 } from "lucide-react";
import { notFound } from "next/navigation";
import { formatDateBR } from "@/lib/admin-format";
import { BLOCKS } from "@/features/diagnostico/maturidade/blocks-config";
import { RecordEditForm, type FieldDef } from "@/features/admin/record-edit-form";
import { DeleteButton } from "@/features/admin/delete-button";

const DIAG_FIELDS: FieldDef[] = [
  { name: "nome_escola", label: "Escola", type: "text", colSpan: 2 },
  { name: "cidade", label: "Cidade", type: "text" },
  { name: "uf", label: "UF", type: "text" },
  { name: "nome_respondente", label: "Respondente", type: "text" },
  {
    name: "funcao",
    label: "Função",
    type: "select",
    options: [
      { value: "mantenedor", label: "Mantenedor" },
      { value: "diretor", label: "Diretor(a)" },
      { value: "coordenador", label: "Coordenador(a)" },
      { value: "professor", label: "Professor(a)" },
      { value: "outro", label: "Outro" },
    ],
  },
  { name: "email", label: "E-mail", type: "email" },
  { name: "whatsapp", label: "WhatsApp", type: "tel" },
  { name: "telefone", label: "Telefone fixo", type: "tel" },
  { name: "num_alunos", label: "Número de alunos", type: "number" },
  { name: "maior_turma", label: "Alunos na maior turma", type: "number" },
  {
    name: "segmentos",
    label: "Segmentos",
    type: "multi",
    colSpan: 2,
    options: [
      { value: "infantil", label: "Infantil" },
      { value: "fund1", label: "Fundamental 1" },
      { value: "fund2", label: "Fundamental 2" },
      { value: "medio", label: "Ensino Médio" },
    ],
  },
  {
    name: "eh_confessional",
    label: "Confessional cristã?",
    type: "select",
    options: [
      { value: "sim", label: "Sim" },
      { value: "nao", label: "Não" },
    ],
  },
  { name: "tradicao_confessional", label: "Tradição", type: "text" },
  {
    name: "cargo_qualificado",
    label: "Cargo (qualificação)",
    type: "select",
    options: [
      { value: "gestor", label: "Gestor / Diretor / Coordenador" },
      { value: "professor", label: "Professor" },
      { value: "mantenedor", label: "Mantenedor / Dono" },
      { value: "outro", label: "Outro" },
    ],
  },
  {
    name: "espaco_maker",
    label: "Espaço maker",
    type: "select",
    options: [
      { value: "tem_funciona", label: "Já tem e funciona bem" },
      { value: "tem_melhorar", label: "Tem mas precisa melhorar" },
      { value: "planejando", label: "Está planejando construir" },
      { value: "nao_tem", label: "Não tem (caro demais)" },
    ],
  },
  {
    name: "tamanho_escola",
    label: "Tamanho da escola",
    type: "select",
    options: [
      { value: "pequena", label: "Pequena (< 200)" },
      { value: "media", label: "Média (200-500)" },
      { value: "grande", label: "Grande (500+)" },
    ],
  },
  { name: "origem", label: "Origem", type: "text" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "lead_capturado", label: "Lead capturado" },
      { value: "lead_qualificado", label: "Lead qualificado" },
      { value: "diagnostico_completo", label: "Diagnóstico completo" },
      { value: "contatado", label: "Contatado" },
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

export const dynamic = "force-dynamic";

async function fetchDiagnostico(id: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) return null;

  try {
    const [headRes, respRes] = await Promise.all([
      fetch(
        `${supabaseUrl}/rest/v1/diagnostico_escola?id=eq.${encodeURIComponent(id)}&select=*`,
        {
          headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
          cache: "no-store",
        },
      ),
      // Tenta ordenar; se as colunas nao existirem, cai para sem order
      fetch(
        `${supabaseUrl}/rest/v1/diagnostico_respostas?diagnostico_id=eq.${encodeURIComponent(id)}&select=*&order=bloco.asc`,
        {
          headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
          cache: "no-store",
        },
      ),
    ]);
    if (!headRes.ok) return null;
    const headRows = (await headRes.json().catch(() => [])) ?? [];
    const head = Array.isArray(headRows) ? headRows[0] : null;
    if (!head) return null;
    let respostas: any[] = [];
    if (respRes.ok) {
      const parsed = await respRes.json().catch(() => []);
      respostas = Array.isArray(parsed) ? parsed : [];
    } else {
      // Fallback: tenta sem order
      const fallback = await fetch(
        `${supabaseUrl}/rest/v1/diagnostico_respostas?diagnostico_id=eq.${encodeURIComponent(id)}&select=*`,
        {
          headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
          cache: "no-store",
        },
      );
      if (fallback.ok) {
        const parsed = await fallback.json().catch(() => []);
        respostas = Array.isArray(parsed) ? parsed : [];
      }
    }
    return { head, respostas };
  } catch (err) {
    console.error("[admin/diag-detail] fetch error:", err);
    return null;
  }
}

export default async function DiagnosticoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetchDiagnostico(id);
  if (!data) notFound();
  const { head, respostas } = data;

  // Agrupa respostas por bloco
  const byBloco: Record<number, any[]> = {};
  for (const r of respostas) {
    const b = r.bloco as number;
    if (!byBloco[b]) byBloco[b] = [];
    byBloco[b].push(r);
  }

  // Mapeia question_id -> pergunta config (label, opções)
  const questionMap = new Map<string, { label: string; tipo: string; bloco: number; blocoTitulo: string }>();
  for (const b of BLOCKS) {
    for (const q of b.questions) {
      questionMap.set(q.id, {
        label: q.label,
        tipo: q.tipo,
        bloco: b.numero,
        blocoTitulo: b.titulo,
      });
    }
  }

  // Média global das escalas
  const escalas = respostas.filter((r: any) => r.tipo === "scale" && typeof r.valor_escala === "number");
  const media = escalas.length
    ? (escalas.reduce((acc: number, r: any) => acc + r.valor_escala, 0) / escalas.length).toFixed(1)
    : null;

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <Link
          href="/admin/diagnostico-escola"
          className="inline-flex items-center gap-1.5 text-[0.8125rem] text-white/65 hover:text-white transition"
        >
          <ArrowLeft className="size-4" /> Voltar para a lista
        </Link>
        <DeleteButton
          table="diagnostico_escola"
          id={head.id}
          itemLabel={head.nome_escola || "este diagnóstico"}
          redirectTo="/admin/diagnostico-escola"
          cascade={respostas.length > 0 ? `${respostas.length} respostas vinculadas` : undefined}
        />
      </div>

      {/* Header da escola */}
      <header className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7 mb-6">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-mint))]/90 font-bold mb-2">
          Diagnóstico de {formatDateBR(head.created_at)}
        </p>
        <h1 className="font-display text-white text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] mb-4">
          {head.nome_escola}
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4 text-[0.875rem]">
          <InfoLine icon={MapPin} label="Localização" value={[head.cidade, head.uf].filter(Boolean).join(" · ")} />
          <InfoLine icon={Building2} label="Confessional" value={head.eh_confessional === "sim" ? `Sim — ${head.tradicao_confessional || ""}` : head.eh_confessional || "—"} />
          <InfoLine icon={Users} label="Alunos" value={head.num_alunos ? String(head.num_alunos) : "—"} />
          <InfoLine icon={Users} label="Maior turma" value={head.maior_turma ? `${head.maior_turma} alunos` : "—"} />
          <InfoLine icon={Mail} label="E-mail" value={head.email} />
          <InfoLine icon={Phone} label="WhatsApp/Tel" value={head.whatsapp || head.telefone || "—"} />
          <InfoLine icon={Users} label="Respondente" value={`${head.nome_respondente || "—"} (${head.funcao || "—"})`} />
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/8 text-[0.75rem]">
          <Chip label="Origem" value={head.origem || "—"} />
          <Chip label="Status" value={head.status || "—"} />
          <Chip label="Segmentos" value={(head.segmentos || []).join(", ") || "—"} />
          {head.cargo_qualificado && <Chip label="Cargo" value={head.cargo_qualificado} />}
          {head.espaco_maker && <Chip label="Espaço maker" value={head.espaco_maker} />}
          {head.tamanho_escola && <Chip label="Tamanho" value={head.tamanho_escola} />}
          {media && <Chip label="Média escala" value={`${media} / 5`} highlight />}
        </div>
      </header>

      {/* Formulário de edição dos campos do cabeçalho */}
      <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
        <h2 className="font-display text-white text-[1.125rem] mb-1">Editar informações</h2>
        <p className="text-white/55 text-[0.8125rem] mb-5">
          Atualiza os dados cadastrais da escola. As respostas do questionário (abaixo) não
          são editáveis pelo painel.
        </p>
        <RecordEditForm
          table="diagnostico_escola"
          id={head.id}
          initial={head}
          fields={DIAG_FIELDS}
        />
      </section>

      {/* Respostas */}
      <h2 className="font-display text-white text-[1.125rem] mb-3 mt-8">
        Respostas do questionário
      </h2>
      {respostas.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center text-white/55">
          Esta escola ainda não respondeu o questionário de 8 blocos.
        </div>
      ) : (
        <div className="space-y-5">
          {Object.entries(byBloco)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([bloco, respList]) => {
              const blocoNum = Number(bloco);
              const blocoConfig = BLOCKS.find((b) => b.numero === blocoNum);
              return (
                <section
                  key={bloco}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
                >
                  <div className="px-5 sm:px-6 py-4 bg-white/[0.03] border-b border-white/8 flex items-center gap-3">
                    <div>
                      <p className="text-[0.6875rem] font-mono uppercase tracking-wide text-white/55">
                        Bloco {bloco}
                      </p>
                      <h2 className="font-display text-white text-[1.125rem]">
                        {blocoConfig?.titulo || `Bloco ${bloco}`}
                      </h2>
                    </div>
                  </div>
                  <ul className="divide-y divide-white/5">
                    {respList.map((r: any) => {
                      const q = questionMap.get(r.pergunta_id);
                      return (
                        <li key={r.id} className="px-5 sm:px-6 py-4">
                          <p className="text-[0.8125rem] text-white/80 leading-snug mb-2">
                            {q?.label || r.pergunta_id}
                          </p>
                          <AnswerRender resposta={r} />
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
        </div>
      )}
    </div>
  );
}

function InfoLine({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="size-4 text-white/40 shrink-0 mt-0.5" />
      <div className="min-w-0">
        <p className="text-[0.6875rem] font-mono uppercase tracking-wide text-white/45">{label}</p>
        <p className="text-white/85 truncate">{value || "—"}</p>
      </div>
    </div>
  );
}

function Chip({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${
        highlight
          ? "bg-[rgb(var(--color-brand-mint))]/15 border-[rgb(var(--color-brand-mint))]/30 text-[rgb(var(--color-brand-mint))]"
          : "bg-white/5 border-white/10 text-white/75"
      }`}
    >
      <span className="font-mono text-[0.625rem] uppercase tracking-wide opacity-70">{label}:</span>
      <span className="font-semibold">{value}</span>
    </span>
  );
}

function AnswerRender({ resposta }: { resposta: any }) {
  if (resposta.tipo === "scale") {
    const v = Number(resposta.valor_escala);
    return (
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className={`size-7 sm:size-8 rounded-md flex items-center justify-center font-display font-bold text-[0.875rem] ${
                n === v
                  ? "bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))]"
                  : "bg-white/5 text-white/40 border border-white/10"
              }`}
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    );
  }
  if (resposta.tipo === "checkbox") {
    const opts = Array.isArray(resposta.valor_opcoes) ? resposta.valor_opcoes : [];
    return (
      <div className="flex flex-wrap gap-1.5">
        {opts.map((o: string) => (
          <span
            key={o}
            className="px-2.5 py-0.5 rounded-md bg-[rgb(var(--color-brand-mint))]/10 border border-[rgb(var(--color-brand-mint))]/25 text-[rgb(var(--color-brand-mint))] text-[0.75rem]"
          >
            {o}
          </span>
        ))}
      </div>
    );
  }
  if (resposta.tipo === "radio") {
    return (
      <span className="inline-flex px-2.5 py-0.5 rounded-md bg-[rgb(var(--color-brand-sky))]/15 border border-[rgb(var(--color-brand-sky))]/30 text-[rgb(var(--color-brand-sky))] text-[0.8125rem]">
        {resposta.valor_texto || resposta.valor_opcoes?.[0] || "—"}
      </span>
    );
  }
  return (
    <p className="text-white/80 text-[0.875rem] leading-relaxed whitespace-pre-wrap">
      {resposta.valor_texto || "—"}
    </p>
  );
}
