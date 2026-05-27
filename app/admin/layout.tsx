import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";
import { AdminShell } from "@/features/admin/admin-shell";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const session = await verifySession(cookieStore.get(ADMIN_COOKIE)?.value);

  // Login page renderiza fora do shell — checa pelo header forwarded?
  // Solução simples: o layout sempre envolve, e a página de login fica visível
  // mesmo sem sessão. O middleware já garante que outras paginas redirecionam.
  if (!session) {
    // Como o middleware já cuida disso para /admin/* exceto /admin/login,
    // só chegamos aqui sem sessão na rota /admin/login. Renderize raw.
    return <>{children}</>;
  }

  return <AdminShell username={session.username}>{children}</AdminShell>;
}
