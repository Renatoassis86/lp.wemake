import { PdfDownloadsClient } from "@/features/admin/pdf-downloads-client";
import { ExportButton } from "@/features/admin/export-button";

export const dynamic = "force-dynamic";

async function fetchPdfDownloads() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) return { rows: [], total: 0 };

  const res = await fetch(
    `${supabaseUrl}/rest/v1/pdf_downloads?select=*&order=created_at.desc&limit=500`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "count=exact",
      },
      cache: "no-store",
    },
  );
  if (!res.ok) return { rows: [], total: 0 };
  const rows = await res.json();
  const range = res.headers.get("content-range") || "";
  const total = Number(range.split("/")[1] || rows.length);
  return { rows, total };
}

export default async function PdfDownloadsPage() {
  const { rows, total } = await fetchPdfDownloads();
  return (
    <div>
      <header className="mb-6 sm:mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-mint))]/90 font-bold mb-2">
            Materiais gratuitos
          </p>
          <h1 className="font-display text-white text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.1]">
            Downloads de PDF
          </h1>
          <p className="text-white/55 text-[0.875rem] sm:text-sm mt-1.5 max-w-2xl">
            Pessoas que baixaram o ebook "7 Princípios para Ensinar Tecnologia com Cosmovisão Cristã".
          </p>
        </div>
        <ExportButton table="pdf_downloads" />
      </header>
      <PdfDownloadsClient initialRows={rows} total={total} />
    </div>
  );
}
