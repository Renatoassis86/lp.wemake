import { NextResponse } from "next/server";
import { diagnosticoMaturidadeSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NOTIFY_TO = "contato@wemake.com.br";

/**
 * Submit do questionário de maturidade (8 blocos).
 * 1) Insert em diagnostico_escola (cabeçalho/identificação)
 * 2) Bulk insert em diagnostico_respostas (1 linha por resposta)
 * 3) Email de notificação para o time
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

  // 1) Cabeçalho da escola
  const escolaRow = {
    nome_escola: data.nome_escola,
    cidade: data.cidade,
    uf: data.uf,
    nome_respondente: data.nome_respondente,
    funcao: data.funcao,
    segmentos: data.segmentos,
    num_alunos: data.num_alunos ?? null,
    maior_turma: data.maior_turma ?? null,
    eh_confessional: data.eh_confessional ?? null,
    tradicao_confessional: data.tradicao_confessional ?? null,
    email: data.email,
    whatsapp: data.whatsapp,
    consent: data.consent,
    origem: "wemake-landing-diagnostico-maturidade",
    status: "diagnostico_completo",
  };

  let diagnosticoId: string;
  try {
    const sbRes = await fetch(`${supabaseUrl}/rest/v1/diagnostico_escola`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(escolaRow),
    });
    if (!sbRes.ok) {
      const errBody = await sbRes.text();
      console.error("[diagnostico-maturidade] insert escola failed:", sbRes.status, errBody);
      return NextResponse.json(
        { ok: false, error: "SupabaseInsertFailed", details: errBody },
        { status: 502 },
      );
    }
    const inserted = await sbRes.json();
    diagnosticoId = inserted?.[0]?.id;
    if (!diagnosticoId) throw new Error("Sem ID após insert");
  } catch (err) {
    console.error("[diagnostico-maturidade] supabase fetch error:", err);
    return NextResponse.json({ ok: false, error: "SupabaseUnreachable" }, { status: 502 });
  }

  // 2) Bulk insert das respostas
  if (data.respostas.length > 0) {
    const rows = data.respostas.map((r) => ({
      diagnostico_id: diagnosticoId,
      bloco: r.bloco,
      pergunta_id: r.pergunta_id,
      tipo: r.tipo,
      valor_texto: r.valor_texto ?? null,
      valor_escala: r.valor_escala ?? null,
      valor_opcoes: r.valor_opcoes ?? null,
    }));

    try {
      const sbRes = await fetch(`${supabaseUrl}/rest/v1/diagnostico_respostas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(rows),
      });
      if (!sbRes.ok) {
        const errBody = await sbRes.text();
        console.error("[diagnostico-maturidade] insert respostas failed:", sbRes.status, errBody);
        // Não falha o request — cabeçalho já foi salvo; equipe pode reprocessar via log
      }
    } catch (err) {
      console.error("[diagnostico-maturidade] bulk insert respostas error:", err);
    }
  }

  // 3) Email para o time
  sendNotificationEmail(data, diagnosticoId).catch((err) =>
    console.error("[diagnostico-maturidade] email failed:", err),
  );

  return NextResponse.json({ ok: true, diagnostico_id: diagnosticoId });
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
        <h1 style="margin: 0; font-size: 22px;">🎯 Diagnóstico de Maturidade completo</h1>
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
      to: [NOTIFY_TO],
      reply_to: data.email,
      subject: `🎯 Diagnóstico completo — ${data.nome_escola} (${data.cidade})`,
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
