import type { ReactNode } from "react";
import { Nav } from "@/features/navigation/nav";
import { Footer } from "@/features/footer/footer";

/**
 * Layout do "site institucional" — landing principal.
 * Rotas DENTRO de (site) recebem Nav + Footer completos.
 * Rotas FORA (ex: /ebook_7_principios, /diagnostico-maturidade, /obrigado) usam apenas o layout raiz e
 * podem decidir mostrar header/footer minimal próprio.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
