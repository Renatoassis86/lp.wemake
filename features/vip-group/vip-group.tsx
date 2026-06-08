"use client";

import Image from "next/image";
import { MessageCircle, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export function VipGroup() {
  const whatsappLink = "https://chat.whatsapp.com/J4giIFuxMFh8vWGBgpAm3z?mode=gi_t";

  return (
    <Section className="pt-12 pb-24 sm:pt-16 sm:pb-32 bg-[rgb(var(--color-brand-navy))] relative overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 sm:gap-14 lg:gap-20 items-center">
          
          {/* Ilustração ou Celular */}
          <Reveal className="order-2 lg:order-1 relative flex justify-center">
            {/* Celular Mockup Menor e Elegante */}
            <div className="relative w-full max-w-[300px] sm:max-w-[320px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/10 bg-[#0b141a] text-xs flex flex-col font-sans">
              
              {/* Header do WhatsApp */}
              <div className="bg-[#075e54] text-white p-3 pt-5 flex items-center gap-2.5 shadow-md relative">
                {/* Foto do Grupo */}
                <div className="size-8 rounded-full bg-[#128C7E] flex items-center justify-center text-white font-bold text-[10px] shadow-inner">
                  WM
                </div>
                
                {/* Nome do Grupo e Status */}
                <div className="flex-1 min-w-0">
                  <div className="font-bold truncate text-[11px]">Comunidade VIP - We Make</div>
                  <div className="text-[9px] text-white/70 truncate">Marcos, Ana, We Make...</div>
                </div>
              </div>

              {/* Corpo da Conversa */}
              <div 
                className="flex-1 p-3 space-y-3 bg-[#0b141a] min-h-[350px] overflow-y-auto"
                style={{ 
                  backgroundImage: "radial-gradient(#1e2b34 1px, transparent 0)", 
                  backgroundSize: "16px 16px" 
                }}
              >
                
                {/* Mensagem 1: Diretor Marcos (Esquerda) */}
                <div className="flex flex-col items-start max-w-[85%]">
                  <div className="bg-[#1f2c34] text-white/90 p-2.5 rounded-r-xl rounded-bl-xl shadow-sm relative">
                    <span className="block font-bold text-[9px] text-emerald-400 mb-0.5">Dir. Marcos (Colégio Confessional)</span>
                    <p className="leading-normal text-[10px]">
                      Boa tarde, líderes! Como tem sido a experiência de vocês com a We Make e a integração da tecnologia com a cosmovisão clássica/cristã? Os pais aceitaram bem?
                    </p>
                    <span className="block text-[8px] text-white/40 text-right mt-1">14:32</span>
                  </div>
                </div>

                {/* Mensagem 2: We Make (Direita - Resposta Oficial) */}
                <div className="flex flex-col items-end w-full">
                  <div className="bg-[#005c4b] text-white/95 p-2.5 rounded-l-xl rounded-br-xl max-w-[85%] shadow-sm relative">
                    <span className="block font-bold text-[9px] text-[#25D366] mb-0.5">We Make</span>
                    <p className="leading-normal text-[10px]">
                      Olá, Marcos! A aceitação é fantástica. Nosso currículo foi desenhado para usar a tecnologia como instrumento para expressar a Verdade, Beleza e Bondade. O foco é a formação ética e humana (a ciberética), e não a técnica fria.
                    </p>
                    <span className="block text-[8px] text-white/50 text-right mt-1">14:35 ✓✓</span>
                  </div>
                </div>

                {/* Mensagem 3: Profa. Ana (Esquerda) */}
                <div className="flex flex-col items-start max-w-[85%]">
                  <div className="bg-[#1f2c34] text-white/90 p-2.5 rounded-r-xl rounded-bl-xl shadow-sm relative">
                    <span className="block font-bold text-[9px] text-sky-400 mb-0.5">Coordenadora Ana</span>
                    <p className="leading-normal text-[10px]">
                      Assino embaixo! Aqui no colégio os alunos amam o espaço maker e os pais elogiam muito a coerência e segurança pedagógica do material didático.
                    </p>
                    <span className="block text-[8px] text-white/40 text-right mt-1">14:38</span>
                  </div>
                </div>

              </div>

              {/* Barra de Digitação Fictícia */}
              <div className="p-2 bg-[#1f2c34] border-t border-white/5 flex items-center gap-2">
                <div className="flex-1 bg-[#2a3942] rounded-full px-3 py-1.5 text-white/50 text-[9px] flex items-center">
                  Mensagem
                </div>
                <div className="size-6 bg-[#00a884] rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                  ✓
                </div>
              </div>

            </div>
          </Reveal>

          {/* Copy e CTA */}
          <Reveal className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/20 text-[#25D366] font-bold text-sm mb-6">
              <Users className="size-4" />
              ACESSO EXCLUSIVO
            </div>
            
            <h2 className="font-display text-white text-[clamp(2rem,4vw,3.5rem)] lg:text-[3.5rem] leading-[1.1] mb-6 text-balance">
              Faça parte da nossa <br className="hidden sm:block"/> <span className="text-[rgb(var(--color-brand-mint))]">Comunidade VIP.</span>
            </h2>
            
            <p className="text-white/80 text-[1.125rem] leading-relaxed mb-8 max-w-xl">
              Entre agora no nosso grupo fechado no WhatsApp e conecte-se com outros líderes educacionais, receba dicas práticas, materiais exclusivos e fique sabendo em primeira mão das novidades da Editora We Make.
            </p>

            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-white/90 font-medium">
                <Image src="/photos/3.png" alt="" width={24} height={24} className="size-6 flex-shrink-0 object-contain" />
                Networking com Diretores e Mantenedores
              </li>
              <li className="flex items-center gap-3 text-white/90 font-medium">
                <Image src="/photos/3.png" alt="" width={24} height={24} className="size-6 flex-shrink-0 object-contain" />
                Dicas de Educação e Cosmovisão Cristã
              </li>
              <li className="flex items-center gap-3 text-white/90 font-medium">
                <Image src="/photos/3.png" alt="" width={24} height={24} className="size-6 flex-shrink-0 object-contain" />
                Convites para Webnários Exclusivos
              </li>
            </ul>

            <a 
              href={whatsappLink} 
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 h-14 px-8 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-105 transition-[background-color,transform] duration-[var(--duration-fast)] ease-[var(--ease-cinematic)]"
            >
              <MessageCircle className="size-5" />
              Entrar no Grupo do WhatsApp
            </a>
          </Reveal>

        </div>
      </Container>
    </Section>
  );
}
