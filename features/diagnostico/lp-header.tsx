import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";

/**
 * Header minimalista para LPs de captura.
 * Apenas a logo (clicável -> home). Sem menu para reduzir distrações.
 */
export function LpHeader() {
  return (
    <header className="absolute top-0 inset-x-0 z-50 pt-6 sm:pt-8">
      <Container size="2xl">
        <div className="flex items-center justify-between">
          <Logo />
          <Link
            href="/"
            className="hidden sm:inline-flex items-center text-[0.8125rem] font-medium text-white/70 hover:text-white transition-colors"
          >
            ← Voltar ao site
          </Link>
        </div>
      </Container>
    </header>
  );
}
