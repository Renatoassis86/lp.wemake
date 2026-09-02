import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";
import { PLANO_NEGOCIO_SECOES } from "@/data/plano-negocio-perguntas";
import { PlanoNegocioForm } from "@/features/admin/plano-negocio-form";

export const dynamic = "force-dynamic";

async function fetchRespostas(username: string): Promise<Record<string, string>> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) return {};

  const res = await fetch(
    `${supabaseUrl}/rest/v1/plano_negocio_respostas?username=eq.${encodeURIComponent(username)}&select=question_id,resposta`,
    {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
      cache: "no-store",
    },
  ).catch(() => null);
  if (!res?.ok) return {};

  const rows = (await res.json()) as Array<{ question_id: string; resposta: string | null }>;
  const respostas: Record<string, string> = {};
  for (const row of rows) respostas[row.question_id] = row.resposta ?? "";
  return respostas;
}

export default async function PlanoDeNegocioPage() {
  const cookieStore = await cookies();
  const session = await verifySession(cookieStore.get(ADMIN_COOKIE)?.value);
  const username = session?.username || "";

  const respostasIniciais = await fetchRespostas(username);

  return (
    <div>
      <header className="mb-6 sm:mb-8">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-mint))]/90 font-bold mb-2">
          Plano de negócio · We Make
        </p>
        <h1 className="font-display text-white text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.1]">
          Questionário — {username}
        </h1>
        <p className="text-white/55 text-[0.875rem] sm:text-sm mt-1.5 max-w-2xl">
          Suas respostas são salvas automaticamente e ficam visíveis só para você até a apresentação
          consolidada. Renato, Denis e Emanuel respondem cada um o próprio questionário.
        </p>
      </header>
      <PlanoNegocioForm secoes={PLANO_NEGOCIO_SECOES} respostasIniciais={respostasIniciais} />
    </div>
  );
}
