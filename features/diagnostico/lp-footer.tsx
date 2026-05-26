import { Container } from "@/components/ui/container";

/**
 * Footer minimalista para LPs de captura.
 * Sem links secundários — apenas copyright + assinatura.
 */
export function LpFooter() {
  return (
    <footer className="bg-[rgb(var(--color-brand-navy))] text-white/60 border-t border-white/10">
      <Container className="py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.75rem]">
          <p>© {new Date().getFullYear()} We Make. Todos os direitos reservados.</p>
          <p className="font-mono uppercase tracking-[0.15em]">
            Criado pela <span className="text-white/85">Arkos Intelligence</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
