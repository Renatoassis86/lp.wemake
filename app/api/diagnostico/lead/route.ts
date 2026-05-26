import { NextResponse } from "next/server";
import { diagnosticoLeadSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NOTIFY_TO = "contato@wemake.com.br";

/**
 * Captura de lead da LP /diagnostico (form curto antes do download do ebook).
 * Grava em public.diagnostico_escola e dispara email para a equipe.
 */
export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = diagnosticoLeadSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "ValidationError", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("[diagnostico-lead] env missing", {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey,
    });
    return NextResponse.json({ ok: false, error: "SupabaseNotConfigured" }, { status: 500 });
  }

  const data = parsed.data;

  // Etapa 1: captura mínima. Qualificação adicional vem na /obrigado via UPDATE.
  // `funcao` e `cidade` são obrigatórios no schema do DB — usamos valores neutros até a qualificação preencher.
  const row = {
    nome_escola: data.nome_escola,
    cidade: "—",
    nome_respondente: data.nome,
    funcao: "pendente",
    email: data.email,
    whatsapp: data.telefone,
    telefone: data.telefone,
    consent: data.consent,
    origem: "wemake-landing-ebook",
    status: "lead_capturado",
  };

  // 1) Insert no Supabase
  try {
    const sbRes = await fetch(`${supabaseUrl}/rest/v1/diagnostico_escola`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify(row),
    });
    if (!sbRes.ok) {
      const errBody = await sbRes.text();
      console.error("[diagnostico-lead] supabase insert failed:", sbRes.status, errBody);
      return NextResponse.json(
        { ok: false, error: "SupabaseInsertFailed", status: sbRes.status, details: errBody },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[diagnostico-lead] supabase fetch error:", err);
    return NextResponse.json({ ok: false, error: "SupabaseUnreachable" }, { status: 502 });
  }

  // 2) Email de notificação em background
  sendNotificationEmail(data).catch((err) =>
    console.error("[diagnostico-lead] email failed:", err),
  );

  return NextResponse.json({ ok: true });
}

async function sendNotificationEmail(data: ReturnType<typeof diagnosticoLeadSchema.parse>) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM || "We Make Landing <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("[diagnostico-lead] RESEND_API_KEY ausente — pulei email");
    return;
  }

  const rows: [string, string][] = [
    ["Origem", "LP /diagnostico — captura inicial (Etapa 1)"],
    ["Nome", data.nome],
    ["E-mail", data.email],
    ["WhatsApp", data.telefone],
    ["Escola", data.nome_escola],
    ["Status", "Lead capturou. Aguardando qualificação na /obrigado."],
    ["Recebido em", new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })],
  ];

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #0b1f44;">
      <div style="background: linear-gradient(135deg, #76f3cd, #4c8ade); color: #0b1f44; padding: 24px; border-radius: 16px 16px 0 0;">
        <h1 style="margin: 0; font-size: 22px;">📥 Novo lead — Diagnóstico/Ebook</h1>
        <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.85;">Capturado em wemake-landing/diagnostico</p>
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
        Responder diretamente para <a href="mailto:${escapeHtml(data.email)}" style="color: #4c8ade;">${escapeHtml(data.email)}</a>.
      </p>
    </div>
  `;

  const text = rows.map(([k, v]) => `${k}: ${v || "—"}`).join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: [NOTIFY_TO],
      reply_to: data.email,
      subject: `📥 Novo lead (Etapa 1) — ${data.nome_escola}`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[diagnostico-lead] Resend failed:", res.status, err);
  }
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
