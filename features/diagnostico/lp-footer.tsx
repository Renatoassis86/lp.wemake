import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { SocialIcons } from "@/features/footer/social-icons";

/**
 * Footer da LP de captura — logo + missão + contato + CTA.
 * SEM coluna de navegação (LP deve manter o foco no objetivo).
 */
export function LpFooter() {
  return (
    <footer className="bg-[rgb(var(--color-brand-navy))] text-white">

      {/* Topo do footer: marca + contato + CTA */}
      <div className="border-b border-white/10">
        <Container className="py-14 sm:py-16">
          <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-start">

            {/* Coluna: Marca + Missão + Sociais */}
            <div>
              <Logo className="mb-6" />
              <p className="text-white/65 text-[1rem] leading-relaxed max-w-md">
                A primeira editora brasileira de Educação Tecnológica e Maker fundamentada na
                Cosmovisão Cristã. Tecnologia com alma. Educação com propósito.
              </p>

              <SocialIcons className="mt-7" />
            </div>

            {/* Coluna: Contato + CTA */}
            <div className="relative">
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-white/40 mb-6">
                Contato
              </h3>

              <ul className="list-none space-y-4 pl-0 mb-8">
                <li>
                  <a
                    href="mailto:contato@wemake.com.br"
                    className="group inline-flex items-center gap-3 text-white/75 hover:text-white transition-colors text-[0.9375rem]"
                  >
                    <span className="inline-flex size-9 items-center justify-center rounded-full bg-white/5 group-hover:bg-[rgb(var(--color-brand-mint))]/20 transition-colors">
                      <Mail className="size-4" />
                    </span>
                    contato@wemake.com.br
                  </a>
                </li>
                <li>
                  <a
                    href="https://chat.whatsapp.com/J4giIFuxMFh8vWGBgpAm3z?mode=gi_t"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 text-white/75 hover:text-white transition-colors text-[0.9375rem]"
                  >
                    <span className="inline-flex size-9 items-center justify-center rounded-full bg-white/5 group-hover:bg-[#25D366]/25 transition-colors">
                      <Phone className="size-4" />
                    </span>
                    WhatsApp comercial
                  </a>
                </li>
              </ul>

              {/* CTA principal — destaque */}
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-3 bg-[rgb(var(--color-brand-mint))]/20 blur-2xl rounded-full animate-pulse pointer-events-none"
                />
                <a
                  href="/#reuniao"
                  className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))] font-bold text-[1.0625rem] tracking-tight hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_rgba(118,243,205,0.6)] transition-all duration-300 shadow-[0_8px_28px_-6px_rgba(118,243,205,0.45)] ring-1 ring-[rgb(var(--color-brand-mint))]/40"
                >
                  Falar com consultor
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <p className="mt-3 text-[0.75rem] text-white/45">Resposta em até 24h úteis.</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Faixa inferior: copyright + assinatura */}
      <Container className="py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.75rem] text-white/45">
          <p>© {new Date().getFullYear()} We Make. Todos os direitos reservados.</p>
          <p className="font-mono uppercase tracking-[0.15em]">
            Criado pela <span className="text-white/70">Arkos Intelligence</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
