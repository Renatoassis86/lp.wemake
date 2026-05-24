import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Lead capture endpoint.
 * Validates on the server and forwards to:
 *   - LEAD_INBOX_WEBHOOK (e.g. Slack / n8n / Zapier)
 *   - LEAD_INBOX_EMAIL (transactional, when wired)
 * Returns 200 immediately so the client UX stays snappy.
 */
export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "ValidationError", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          whatsapp: parsed.data.whatsapp,
          role: parsed.data.role,
          institution: parsed.data.institution,
          city: parsed.data.city,
          state: parsed.data.state,
          message: parsed.data.message || "",
          source: "wemake-landing",
          created_at: new Date().toISOString()
        }),
      });
    } catch (err) {
      console.error("[lead] Supabase save failed:", err);
    }
  }

  const webhook = process.env.LEAD_INBOX_WEBHOOK;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "wemake-landing",
          receivedAt: new Date().toISOString(),
          lead: parsed.data,
        }),
      });
    } catch (err) {
      console.error("[lead] webhook failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
