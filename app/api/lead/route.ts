import { NextResponse } from "next/server";
import { contactSchema, leadShortSchema, ROLES_LABEL } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NOTIFY_TO = "contato@wemake.com.br";

/**
 * Lead capture endpoint — grava na tabela `leads_escola` (Supabase),
 * envia email de notificação para a equipe e dispara webhook opcional.
 * Aceita dois tipos:
 *   - "reuniao"  → schema completo + sugestão de data/hora
 *   - "material" → schema enxuto (download de PDF)
 */
export async function POST(req: Request) {
  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const type = payload?.type === "material" ? "material" : "reuniao";
  const schema = type === "material" ? leadShortSchema : contactSchema;
  const parsed = schema.safeParse(payload);

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

  const data = parsed.data as any;

  // Observações estruturadas — leads_escola não tem colunas próprias para esses campos
  const meta: string[] = [
    `[${type === "material" ? "Material gratuito" : "Reunião estratégica"}] via wemake-landing`,
    `Cargo: ${ROLES_LABEL[data.role as keyof typeof ROLES_LABEL] || data.role}`,
  ];
  if (type === "reuniao") {
    if (data.preferred_date) meta.push(`Sugestão data: ${data.preferred_date}`);
    if (data.preferred_time) meta.push(`Sugestão horário: ${data.preferred_time}`);
    if (data.message) meta.push(`Mensagem: ${data.message}`);
  }

  const row = {
    nome: data.institution,
    cidade: data.city,
    uf: data.state,
    rep_legal_nome: data.name,
    rep_legal_email: data.email,
    rep_legal_tel: data.whatsapp,
    origem: `wemake-landing-${type}`,
    status_lead: "novo",
    observacoes: meta.join(" | "),
  };

  try {
    const sbRes = await fetch(`${supabaseUrl}/rest/v1/leads_escola`, {
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
      console.error("[lead] supabase insert failed:", sbRes.status, errBody);
      return NextResponse.json(
        { ok: false, error: "SupabaseInsertFailed", status: sbRes.status, details: errBody },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[lead] supabase fetch error:", err);
    return NextResponse.json({ ok: false, error: "SupabaseUnreachable" }, { status: 502 });
  }

  // Email de notificação — dispara em background, não bloqueia resposta
  sendNotificationEmail(type, data).catch((err) => console.error("[lead] email failed:", err));

  // Webhook secundário opcional
  const webhook = process.env.LEAD_INBOX_WEBHOOK;
  if (webhook) {
    fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "wemake-landing", type, receivedAt: new Date().toISOString(), lead: parsed.data }),
    }).catch((err) => console.error("[lead] webhook failed:", err));
  }

  return NextResponse.json({ ok: true });
}

/**
 * Envia email de notificação via Resend (https://resend.com) para a equipe.
 * Requer RESEND_API_KEY e MAIL_FROM no .env. Se não configurado, apenas loga.
 */
async function sendNotificationEmail(type: "reuniao" | "material", data: any) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM || "We Make Landing <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("[lead] RESEND_API_KEY não configurado — email não enviado para", NOTIFY_TO);
    return;
  }

  const isReuniao = type === "reuniao";
  const subject = isReuniao
    ? `🎯 Novo lead — Reunião: ${data.institution} (${data.city}/${data.state})`
    : `📥 Novo lead — Material: ${data.institution} (${data.city}/${data.state})`;

  const roleLabel = ROLES_LABEL[data.role as keyof typeof ROLES_LABEL] || data.role;

  const rows: [string, string][] = [
    ["Tipo de lead", isReuniao ? "Reunião Estratégica" : "Download de Material Gratuito"],
    ["Nome", data.name],
    ["Cargo", roleLabel],
    ["E-mail", data.email],
    ["WhatsApp", data.whatsapp],
    ["Escola", data.institution],
    ["Cidade / UF", `${data.city} — ${data.state}`],
  ];
  if (isReuniao && data.preferred_date) rows.push(["Data preferida", data.preferred_date]);
  if (isReuniao && data.preferred_time) rows.push(["Horário preferido", data.preferred_time]);
  if (isReuniao && data.message) rows.push(["Mensagem", data.message]);
  rows.push(["Recebido em", new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })]);

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #0b1f44;">
      <div style="background: linear-gradient(135deg, #4c8ade, #0b1f44); color: white; padding: 24px; border-radius: 16px 16px 0 0;">
        <h1 style="margin: 0; font-size: 22px;">${isReuniao ? "🎯 Solicitação de Reunião" : "📥 Download de Material"}</h1>
        <p style="margin: 8px 0 0; opacity: 0.85; font-size: 14px;">Novo lead capturado em wemake-landing</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; background: #f8fafc; border-radius: 0 0 16px 16px; overflow: hidden;">
        ${rows.map(([k, v]) => `
          <tr>
            <td style="padding: 14px 20px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #64748b; font-size: 13px; width: 40%;">${escapeHtml(k)}</td>
            <td style="padding: 14px 20px; border-bottom: 1px solid #e2e8f0; color: #0b1f44; font-size: 14px;">${escapeHtml(v || "—")}</td>
          </tr>
        `).join("")}
      </table>
      <p style="text-align: center; margin-top: 16px; font-size: 12px; color: #94a3b8;">
        Email automático de wemake-landing.<br>Responder diretamente para <a href="mailto:${escapeHtml(data.email)}" style="color: #4c8ade;">${escapeHtml(data.email)}</a>.
      </p>
    </div>
  `;

  const text = rows.map(([k, v]) => `${k}: ${v || "—"}`).join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: [NOTIFY_TO],
      reply_to: data.email,
      subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[lead] Resend failed:", res.status, err);
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
