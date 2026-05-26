import { NextResponse } from "next/server";
import { diagnosticoQualificacaoSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NOTIFY_TO = "contato@wemake.com.br";

const CARGO_LABEL: Record<string, string> = {
  gestor: "Gestor / Diretor / Coordenador",
  professor: "Professor",
  mantenedor: "Mantenedor / Dono",
  outro: "Outro",
};
const ESPACO_LABEL: Record<string, string> = {
  tem_funciona: "Já tem e funciona bem",
  tem_melhorar: "Tem mas precisa melhorar",
  planejando: "Está planejando construir",
  nao_tem: "Não tem (caro demais)",
};
const TAMANHO_LABEL: Record<string, string> = {
  pequena: "Pequena (< 200 alunos)",
  media: "Média (200-500 alunos)",
  grande: "Grande (500+ alunos)",
};
const ORCAMENTO_LABEL: Record<string, string> = {
  nao_definido: "Ainda não definiu",
  "5_15k": "R$ 5-15k",
  "15_50k": "R$ 15-50k",
  "50k_mais": "R$ 50k+",
};

/**
 * Etapa 2 da LP do ebook — qualificação na /obrigado.
 * UPDATE no lead existente (chave: email) com os 4 dados de qualificação.
 * Após sucesso, o cliente libera o download do ebook.
 */
export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = diagnosticoQualificacaoSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "ValidationError", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ ok: false, error: "SupabaseNotConfigured" }, { status: 500 });
  }

  const data = parsed.data;

  const updateRow = {
    cargo_qualificado: data.cargo_qualificado,
    espaco_maker: data.espaco_maker,
    tamanho_escola: data.tamanho_escola,
    orcamento_2026: data.orcamento_2026,
    status: "lead_qualificado",
  };

  // UPDATE WHERE email = :email&order=created_at.desc&limit=1 — atualiza o lead mais recente
  // (PostgREST permite filter na URL)
  try {
    const url = `${supabaseUrl}/rest/v1/diagnostico_escola?email=eq.${encodeURIComponent(data.email)}&order=created_at.desc`;
    const sbRes = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(updateRow),
    });
    if (!sbRes.ok) {
      const errBody = await sbRes.text();
      console.error("[qualificar] supabase update failed:", sbRes.status, errBody);
      return NextResponse.json(
        { ok: false, error: "SupabaseUpdateFailed", details: errBody },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[qualificar] supabase fetch error:", err);
    return NextResponse.json({ ok: false, error: "SupabaseUnreachable" }, { status: 502 });
  }

  // Email de notificação ao time (lead qualificado é o mais importante)
  sendQualifiedLeadEmail(data).catch((err) =>
    console.error("[qualificar] email failed:", err),
  );

  return NextResponse.json({ ok: true });
}

async function sendQualifiedLeadEmail(data: ReturnType<typeof diagnosticoQualificacaoSchema.parse>) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM || "We Make Landing <onboarding@resend.dev>";
  if (!apiKey) return;

  const rows: [string, string][] = [
    ["Origem", "LP /obrigado — qualificação completa (Etapa 2)"],
    ["E-mail", data.email],
    ["Cargo", CARGO_LABEL[data.cargo_qualificado] || data.cargo_qualificado],
    ["Espaço maker", ESPACO_LABEL[data.espaco_maker] || data.espaco_maker],
    ["Tamanho da escola", TAMANHO_LABEL[data.tamanho_escola] || data.tamanho_escola],
    ["Orçamento 2026", ORCAMENTO_LABEL[data.orcamento_2026] || data.orcamento_2026],
    ["Qualificado em", new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })],
  ];

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #0b1f44;">
      <div style="background: linear-gradient(135deg, #76f3cd, #4c8ade); color: #0b1f44; padding: 24px; border-radius: 16px 16px 0 0;">
        <h1 style="margin: 0; font-size: 22px;">🔥 Lead qualificado!</h1>
        <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.85;">${data.email}</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; background: #f8fafc; border-radius: 0 0 16px 16px; overflow: hidden;">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding: 14px 20px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #64748b; font-size: 13px; width: 42%;">${escapeHtml(k)}</td>
            <td style="padding: 14px 20px; border-bottom: 1px solid #e2e8f0; color: #0b1f44; font-size: 14px;">${escapeHtml(v || "—")}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <p style="text-align: center; margin-top: 16px; font-size: 12px; color: #94a3b8;">
        Lead pronto para abordagem comercial. Reply direto para <a href="mailto:${escapeHtml(data.email)}" style="color: #4c8ade;">${escapeHtml(data.email)}</a>.
      </p>
    </div>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from,
      to: [NOTIFY_TO],
      reply_to: data.email,
      subject: `🔥 Lead QUALIFICADO — ${data.email}`,
      html,
    }),
  });
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
