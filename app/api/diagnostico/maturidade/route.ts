import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { diagnosticoMaturidadeSchema } from "@/lib/validation";
import { getNotifyEmails } from "@/lib/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Submit do questionário de maturidade (8 blocos).
 * Salva tudo em uma única tabela: diagnostico_maturidade
 * - Cabeçalho (identificação da escola)
 * - Todas as respostas em JSON
 * - Email de notificação
 */
export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = diagnosticoMaturidadeSchema.safeParse(payload);
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

  const cookieStore = await cookies();
  const utmSource = cookieStore.get("utm_source")?.value;
  const utmCampaign = cookieStore.get("utm_campaign")?.value;
  const utmMedium = cookieStore.get("utm_medium")?.value;
  const fbclid = cookieStore.get("fbclid")?.value;

  const meta: string[] = [];
  if (utmSource) meta.push(`UTM Source: ${utmSource}`);
  if (utmCampaign) meta.push(`UTM Campaign: ${utmCampaign}`);
  if (utmMedium) meta.push(`UTM Medium: ${utmMedium}`);
  if (fbclid) meta.push(`FBCLID: ${fbclid}`);

  // Consolidar tudo em uma única tabela
  const diagnosticoRow = {
    nome_escola: data.nome_escola,
    cidade: data.cidade,
    uf: data.uf || null,
    nome_respondente: data.nome_respondente,
    funcao: data.funcao,
    segmentos: data.segmentos.length > 0 ? data.segmentos : null,
    num_alunos: data.num_alunos ?? null,
    maior_turma: data.maior_turma ?? null,
    eh_confessional: data.eh_confessional ? (data.eh_confessional === "sim" ? true : false) : null,
    tradicao_confessional: data.tradicao_confessional || null,
    email: data.email,
    whatsapp: data.whatsapp,
    consent: data.consent,
    origem: "wemake-landing-diagnostico-maturidade",
    status: "diagnostico_completo",
    respostas: data.respostas.length > 0 ? data.respostas : null,
    observacoes: meta.length > 0 ? meta.join(" | ") : null,
  };

  try {
    const sbRes = await fetch(`${supabaseUrl}/rest/v1/diagnostico_maturidade`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(diagnosticoRow),
    });

    if (!sbRes.ok) {
      const errBody = await sbRes.text();
      console.error("[diagnostico-maturidade] insert failed:", sbRes.status, errBody);
      console.error("[diagnostico-maturidade] data sent:", JSON.stringify(diagnosticoRow, null, 2));
      return NextResponse.json(
        { ok: false, error: "SupabaseInsertFailed", details: errBody, status: sbRes.status },
        { status: 502 },
      );
    }

    // Para return=minimal, não há body na resposta
    const diagnosticoId = data.email + "-" + Date.now();

    // 2) Email para o time (em background, não bloqueia)
    sendNotificationEmail(data, diagnosticoId).catch((err) =>
      console.error("[diagnostico-maturidade] email failed:", err),
    );

    return NextResponse.json({ ok: true, diagnostico_id: diagnosticoId });
  } catch (err) {
    console.error("[diagnostico-maturidade] supabase fetch error:", err);
    const errMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, error: "SupabaseUnreachable", details: errMsg },
      { status: 502 },
    );
  }
}

async function sendNotificationEmail(
  data: ReturnType<typeof diagnosticoMaturidadeSchema.parse>,
  id: string,
) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM || "We Make Landing <onboarding@resend.dev>";
  if (!apiKey) return;

  const escalas = data.respostas.filter((r) => r.tipo === "scale" && typeof r.valor_escala === "number");
  const mediaEscala = escalas.length
    ? (escalas.reduce((acc, r) => acc + (r.valor_escala ?? 0), 0) / escalas.length).toFixed(1)
    : "—";

  const rows: [string, string][] = [
    ["Origem", "Diagnóstico de Maturidade completo (8 blocos)"],
    ["ID interno", id],
    ["Escola", data.nome_escola],
    ["Cidade", data.cidade + (data.uf ? ` — ${data.uf}` : "")],
    ["Respondente", data.nome_respondente],
    ["Função", data.funcao],
    ["Email", data.email],
    ["WhatsApp", data.whatsapp],
    ["Segmentos", data.segmentos.join(", ")],
    ["Alunos (aprox.)", data.num_alunos ? String(data.num_alunos) : "—"],
    ["Maior turma", data.maior_turma ? `${data.maior_turma} alunos` : "—"],
    ["Confessional?", data.eh_confessional || "—"],
    ["Tradição", data.tradicao_confessional || "—"],
    ["Respostas totais", String(data.respostas.length)],
    ["Média escala 1-5", mediaEscala],
    ["Recebido em", new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })],
  ];

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; color: #0b1f44;">
      <div style="background: linear-gradient(135deg, #76f3cd, #4c8ade); color: #0b1f44; padding: 24px; border-radius: 16px 16px 0 0;">
        <h1 style="margin: 0; font-size: 22px;">Diagnóstico de Maturidade completo</h1>
        <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.85;">${data.nome_escola} — ${data.cidade}</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; background: #f8fafc; border-radius: 0 0 16px 16px; overflow: hidden;">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #64748b; font-size: 13px; width: 38%;">${escapeHtml(k)}</td>
            <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; color: #0b1f44; font-size: 14px;">${escapeHtml(v || "—")}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <p style="text-align: center; margin-top: 16px; font-size: 12px; color: #94a3b8;">
        Detalhes completos das respostas no Supabase (id <code>${escapeHtml(id)}</code>).
      </p>
    </div>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from,
      to: getNotifyEmails(),
      reply_to: data.email,
      subject: `Diagnóstico completo — ${data.nome_escola} (${data.cidade})`,
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
