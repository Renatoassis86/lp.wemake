import { Container } from "@/components/ui/container";
import { Instagram, Youtube, MessageCircle, Mail, Phone, ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { primaryNav } from "@/constants/nav";

/**
 * Footer institucional — Logo, missão, navegação, contato + CTA principal.
 */
export function Footer() {
  return (
    <footer className="bg-[rgb(var(--color-brand-navy))] text-white">

      {/* Topo do Footer */}
      <div className="border-b border-white/10">
        <Container className="py-16 sm:py-20">
          <div className="grid md:grid-cols-[1.6fr_1fr_1.4fr] gap-12 md:gap-12 lg:gap-16 items-start">

            {/* Coluna: Marca + Manifesto */}
            <div>
              <Logo className="mb-6" />
              <p className="text-white/65 text-[1rem] leading-relaxed max-w-xs">
                A primeira editora brasileira de Educação Tecnológica e Maker fundamentada na Cosmovisão Cristã. Tecnologia com alma. Educação com propósito.
              </p>
              <div className="flex items-center gap-4 mt-8">
                <a href="https://www.instagram.com/denisjulio" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[rgb(var(--color-brand-mint))]/30 flex items-center justify-center transition-colors" aria-label="Instagram">
                  <Instagram className="size-5" />
                </a>
                <a href="https://chat.whatsapp.com/J4giIFuxMFh8vWGBgpAm3z?mode=gi_t" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25D366]/30 flex items-center justify-center transition-colors" aria-label="WhatsApp">
                  <MessageCircle className="size-5" />
                </a>
                <a href="https://www.youtube.com/@wemake" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500/30 flex items-center justify-center transition-colors" aria-label="YouTube">
                  <Youtube className="size-5" />
                </a>
              </div>
            </div>

            {/* Coluna: Navegação */}
            <div>
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-white/40 mb-6">
                Navegação
              </h3>
              <ul className="list-none space-y-3 pl-0">
                {primaryNav.map((link) => (
                  <li key={link.id}>
                    <a href={link.href} className="text-white/65 hover:text-white transition-colors text-[0.9375rem]">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna: Contato + CTA Principal em destaque */}
            <div className="relative">
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-white/40 mb-6">
                Contato
              </h3>

              <ul className="list-none space-y-4 pl-0 mb-10">
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
                    href="https://wa.me/5500000000000"
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

              {/* CTA principal — alto destaque */}
              <div className="relative">
                {/* Glow mint pulsante atrás */}
                <div
                  aria-hidden
                  className="absolute -inset-3 bg-[rgb(var(--color-brand-mint))]/20 blur-2xl rounded-full animate-pulse pointer-events-none"
                />
                <a
                  href="#reuniao"
                  className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))] font-bold text-[1.0625rem] tracking-tight hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_rgba(118,243,205,0.6)] transition-all duration-300 shadow-[0_8px_28px_-6px_rgba(118,243,205,0.45)] ring-1 ring-[rgb(var(--color-brand-mint))]/40"
                >
                  Falar com consultor
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <p className="mt-3 text-[0.75rem] text-white/45">
                  Resposta em até 24h úteis.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Faixa inferior (com folga para o botão WhatsApp flutuante) */}
      <Container className="py-6 pb-24 sm:pb-6 sm:pr-24">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.75rem] text-white/35">
          <p>© {new Date().getFullYear()} We Make. Todos os direitos reservados.</p>
          <p className="font-mono uppercase tracking-[0.15em]">Criado pela <span className="text-white/55">Arkos Intelligence</span></p>
        </div>
      </Container>

    </footer>
  );
}
