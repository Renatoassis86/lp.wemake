import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession, ADMIN_COOKIE } from "@/lib/admin-auth";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Helper to request access token from Google OAuth2 using Service Account JWT.
 */
async function getGoogleAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const base64Header = Buffer.from(JSON.stringify(header)).toString("base64url");
  const base64Claim = Buffer.from(JSON.stringify(claim)).toString("base64url");
  const signInput = `${base64Header}.${base64Claim}`;

  const signer = crypto.createSign("RSA-SHA256");
  signer.update(signInput);
  const cleanKey = privateKey.replace(/\\n/g, "\n");
  const signature = signer.sign(cleanKey, "base64url");

  const jwt = `${signInput}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    throw new Error(`Google token fetch failed: ${await res.text()}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

/**
 * Helper to request access token from Google OAuth2 using Client ID, Client Secret, and Refresh Token.
 */
async function getGoogleAccessTokenViaOAuth2(clientId: string, clientSecret: string, refreshToken: string): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!res.ok) {
    throw new Error(`Google OAuth2 token refresh failed: ${await res.text()}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

/**
 * Parser helpers to extract UTM variables from unstructured observacoes text column.
 */
function parseUtmCampaign(observacoes: string | null): string {
  if (!observacoes) return "organico/direto";
  const match = observacoes.match(/UTM Campaign:\s*([^|]+)/i);
  if (match && match[1]) {
    return match[1].trim();
  }
  return "organico/direto";
}

export async function GET(req: Request) {
  // Defense in depth (only admin sessions can see metrics)
  const cookieStore = await cookies();
  const session = await verifySession(cookieStore.get(ADMIN_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ ok: false, error: "SupabaseNotConfigured" }, { status: 500 });
  }

  try {
    // 1) Fetch records from Supabase
    const leadsRes = await fetch(`${supabaseUrl}/rest/v1/leads_escola?select=id,status_lead,created_at,observacoes`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      cache: "no-store",
    });
    const leads = leadsRes.ok ? await leadsRes.json() : [];

    const diagnosticosRes = await fetch(`${supabaseUrl}/rest/v1/diagnostico_escola?select=id,status,created_at,observacoes`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      cache: "no-store",
    });
    const diagnosticos = diagnosticosRes.ok ? await diagnosticosRes.json() : [];

    // 2) Top level Supabase metrics
    const totalLeads = leads.length + diagnosticos.length;
    const leadsAgendados = leads.filter((l: any) => l.status_lead === "agendado" || l.status_lead === "fechado").length;
    const diagAgendados = diagnosticos.filter((d: any) => d.status === "agendado" || d.status === "fechado").length;
    const totalAgendamentos = leadsAgendados + diagAgendados;
    const conversionRate = totalLeads > 0 ? parseFloat(((totalAgendamentos / totalLeads) * 100).toFixed(1)) : 0;

    // 3) Setup last 7 days daily data structure
    const dailyMap: { [date: string]: { dateStr: string; acessos: number; leads: number } } = {};
    const datesList: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
      dailyMap[key] = { dateStr: key, acessos: 0, leads: 0 };
      datesList.push(key);
    }

    // Count Supabase leads created per day
    const countLeadDate = (createdAtStr: string) => {
      if (!createdAtStr) return;
      try {
        const date = new Date(createdAtStr);
        const key = date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
        if (dailyMap[key]) {
          dailyMap[key].leads += 1;
        }
      } catch {}
    };

    leads.forEach((l: any) => countLeadDate(l.created_at));
    diagnosticos.forEach((d: any) => countLeadDate(d.created_at));

    // 4) Fetch Google Analytics 4 sessions (if credentials available)
    let hasGa = false;
    let gaError = null;
    let totalSessions = 0;

    const propertyId = (process.env.GA4_PROPERTY_ID || "").trim();
    const hasOAuth2 = process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN;
    const hasServiceAccount = process.env.GOOGLE_SERVICES_JSON;

    if (propertyId && (hasOAuth2 || hasServiceAccount)) {
      try {
        let accessToken = "";
        if (hasOAuth2) {
          accessToken = await getGoogleAccessTokenViaOAuth2(
            process.env.GOOGLE_CLIENT_ID!.trim(),
            process.env.GOOGLE_CLIENT_SECRET!.trim(),
            process.env.GOOGLE_REFRESH_TOKEN!.trim()
          );
        } else {
          let jsonStr = process.env.GOOGLE_SERVICES_JSON!.trim();
          if (jsonStr.startsWith("'") && jsonStr.endsWith("'")) {
            jsonStr = jsonStr.slice(1, -1);
          } else if (jsonStr.startsWith('"') && jsonStr.endsWith('"')) {
            jsonStr = jsonStr.slice(1, -1);
          }
          const credentials = JSON.parse(jsonStr);
          accessToken = await getGoogleAccessToken(credentials.client_email, credentials.private_key);
        }
        
        // Report for the last 7 days
        const reportRes = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dateRanges: [{ startDate: "6daysAgo", endDate: "today" }],
            dimensions: [{ name: "date" }],
            metrics: [{ name: "sessions" }],
          }),
        });

        if (reportRes.ok) {
          const report = await reportRes.json();
          const rows = report.rows || [];
          rows.forEach((row: any) => {
            const dateStr = row.dimensionValues?.[0]?.value; // "YYYYMMDD"
            const sessionCount = parseInt(row.metricValues?.[0]?.value || "0", 10);
            totalSessions += sessionCount;

            if (dateStr) {
              const year = parseInt(dateStr.substring(0, 4), 10);
              const month = parseInt(dateStr.substring(4, 6), 10) - 1;
              const day = parseInt(dateStr.substring(6, 8), 10);
              const d = new Date(year, month, day);
              const key = d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
              if (dailyMap[key]) {
                dailyMap[key].acessos += sessionCount;
              }
            }
          });
          hasGa = true;
        } else {
          throw new Error(`GA4 report error: ${await reportRes.text()}`);
        }
      } catch (e: any) {
        console.error("[api/metrics] GA4 API failed, entering fallback:", e);
        gaError = e.message;
      }
    }

    // Google Analytics fallback (do not mock data)
    if (!hasGa) {
      datesList.forEach((key) => {
        const entry = dailyMap[key];
        if (entry) {
          entry.acessos = 0;
        }
      });
      totalSessions = 0;
    }

    // Convert dailyMap to structured array for Recharts
    const lineData = datesList.map((key) => {
      const entry = dailyMap[key] || { dateStr: key, acessos: 0, leads: 0 };
      return {
        name: key,
        acessos: entry.acessos,
        leads: entry.leads,
      };
    });

    // 5) Fetch Meta Ads Spend (if credentials available)
    let hasMeta = false;
    let metaSpend = 0;
    let metaCampaigns: { [name: string]: number } = {};
    let metaError = null;

    if (process.env.META_ACCESS_TOKEN && process.env.META_AD_ACCOUNT_ID) {
      try {
        const adAccountId = process.env.META_AD_ACCOUNT_ID;
        const accessToken = process.env.META_ACCESS_TOKEN;
        const since = new Date();
        since.setDate(since.getDate() - 6);
        const sinceStr = since.toISOString().split("T")[0];
        const untilStr = new Date().toISOString().split("T")[0];

        const metaRes = await fetch(
          `https://graph.facebook.com/v19.0/${adAccountId}/insights?fields=campaign_name,spend&level=campaign&time_range=%7B%22since%22:%22${sinceStr}%22,%22until%22:%22${untilStr}%22%7D&access_token=${accessToken}`,
        );
        if (metaRes.ok) {
          const data = await metaRes.json();
          const insights = data.data || [];
          insights.forEach((item: any) => {
            const spend = parseFloat(item.spend || "0");
            metaSpend += spend;
            if (item.campaign_name) {
              metaCampaigns[item.campaign_name] = spend;
            }
          });
          hasMeta = true;
        } else {
          throw new Error(`Meta Ads API failed: ${await metaRes.text()}`);
        }
      } catch (e: any) {
        console.error("[api/metrics] Meta API failed, entering fallback:", e);
        metaError = e.message;
      }
    }

    // Meta Ads fallback (no simulated data)
    if (!hasMeta) {
      metaSpend = 0;
    }

    // 6) Aggregated campaign details (parsing UTMs from observations)
    const campaignsMap: {
      [name: string]: {
        campaign: string;
        sessions: number;
        leads: number;
        spend: number;
        meetings: number;
      };
    } = {};

    campaignsMap["organico/direto"] = { campaign: "organico/direto", sessions: 0, leads: 0, spend: 0, meetings: 0 };

    const processRow = (row: any, isLeadTable: boolean) => {
      const campaign = parseUtmCampaign(row.observacoes);
      if (!campaignsMap[campaign]) {
        campaignsMap[campaign] = { campaign, sessions: 0, leads: 0, spend: 0, meetings: 0 };
      }
      campaignsMap[campaign].leads += 1;

      const isAgendado = isLeadTable
        ? (row.status_lead === "agendado" || row.status_lead === "fechado")
        : (row.status === "agendado" || row.status === "fechado");

      if (isAgendado) {
        campaignsMap[campaign].meetings += 1;
      }
    };

    leads.forEach((l: any) => processRow(l, true));
    diagnosticos.forEach((d: any) => processRow(d, false));

    // Distribute spend and sessions across campaigns (no simulated fallbacks)
    Object.keys(campaignsMap).forEach((name) => {
      const item = campaignsMap[name];
      if (!item) return;
      if (name === "organico/direto") {
        item.spend = 0;
        item.sessions = 0;
      } else {
        const campaignSpend = hasMeta ? metaCampaigns[name] : undefined;
        if (campaignSpend !== undefined) {
          item.spend = campaignSpend;
        } else {
          item.spend = 0;
        }
        item.sessions = 0;
      }
    });

    const campaignList = Object.values(campaignsMap).sort((a, b) => b.leads - a.leads);

    // Global funnel data
    const funnelData = [
      { stage: "Acessos (Sessões)", count: totalSessions },
      { stage: "Diagnósticos Inseridos", count: diagnosticos.length },
      { stage: "Leads Totais", count: totalLeads },
      { stage: "Agendamentos", count: totalAgendamentos },
    ];

    // Response packet
    return NextResponse.json({
      ok: true,
      integrations: {
        googleAnalytics: { active: hasGa, error: gaError },
        metaAds: { active: hasMeta, error: metaError },
      },
      cards: {
        sessions: { value: hasGa ? totalSessions.toLocaleString("pt-BR") : "Aguardando API" },
        leads: { value: totalLeads.toLocaleString("pt-BR") },
        spend: { value: hasMeta ? `R$ ${metaSpend.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "Aguardando API" },
        meetings: { value: totalAgendamentos.toString(), rate: `${conversionRate}%` },
      },
      lineData,
      funnelData,
      campaigns: campaignList,
    });
  } catch (error: any) {
    console.error("[api/metrics] Global error:", error);
    return NextResponse.json({ ok: false, error: "InternalServerError", details: error.message }, { status: 500 });
  }
}
