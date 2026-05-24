import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Instagram, Youtube, MessageCircle } from "lucide-react";

const NAV_LINKS = [
  { label: "Visão", href: "#proposito" },
  { label: "Manifesto", href: "#proposito" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Jornada", href: "#jornada" },
  { label: "Presença", href: "#presenca" },
  { label: "Reunião", href: "#reuniao" },
];

const MODULES = [
  "Robótica Educacional",
  "Programação Criativa",
  "Impressão 3D",
  "Internet das Coisas (IoT)",
  "Inteligência Artificial",
  "Marcenaria Digital",
];

/**
 * Footer institucional completo — Logo, missão, links de navegação,
 * módulos, redes sociais e assinatura Arkos Intelligence.
 */
export function Footer() {
  return (
    <footer className="bg-[rgb(var(--color-brand-navy))] text-white">

      {/* Topo do Footer */}
      <div className="border-b border-white/10">
        <Container className="py-16 sm:py-20">
          <div className="grid lg:grid-cols-[1.5fr_1fr_1fr] gap-12">

            {/* Coluna: Marca + Manifesto */}
            <div>
              <div className="relative h-12 w-44 mb-6">
                <Image
                  src="/photos/6.png"
                  alt="We Make — Educação Tecnológica Cristã"
                  fill
                  className="object-contain object-left"
                />
              </div>
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
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-white/65 hover:text-white transition-colors text-[0.9375rem]">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna: Módulos */}
            <div>
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-white/40 mb-6">
                Módulos We Make
              </h3>
              <ul className="space-y-3">
                {MODULES.map((mod) => (
                  <li key={mod} className="text-white/65 text-[0.9375rem]">
                    {mod}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Faixa inferior */}
      <Container className="py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.75rem] text-white/35">
          <p>© {new Date().getFullYear()} We Make. Todos os direitos reservados.</p>
          <p className="font-mono uppercase tracking-[0.15em]">Criado pela <span className="text-white/55">Arkos Intelligence</span></p>
        </div>
      </Container>

    </footer>
  );
}
