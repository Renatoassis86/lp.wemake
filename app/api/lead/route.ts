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
