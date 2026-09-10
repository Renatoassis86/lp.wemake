import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";
import { ApresentacaoPlano } from "@/features/admin/apresentacao/apresentacao-plano";
import { carregarDadosApresentacao } from "@/features/admin/apresentacao/dados-apresentacao";

export const dynamic = "force-dynamic";

/**
 * Versão da apresentação usada só pela exportação em PDF (rota
 * /api/admin/plano-negocio/apresentacao-pdf, via Puppeteer). Fica fora de
 * /admin de propósito — o layout de /admin embute a barra lateral do painel,
 * que apareceria no PDF. Protegida na própria página (mesma sessão do
 * painel), já que o middleware só cobre /admin/* e /api/admin/*.
 */
export default async function ApresentacaoPlanoPrintPage() {
  const cookieStore = await cookies();
  const session = await verifySession(cookieStore.get(ADMIN_COOKIE)?.value);
  if (!session) redirect("/admin/login");

  const { anos, geoBrasil, escolasPorEstado, estadosComLeiPropria } = await carregarDadosApresentacao();

  return (
    <ApresentacaoPlano
      anos={anos}
      geoBrasil={geoBrasil}
      escolasPorEstado={escolasPorEstado}
      estadosComLeiPropria={estadosComLeiPropria}
      modoImpressao
    />
  );
}
