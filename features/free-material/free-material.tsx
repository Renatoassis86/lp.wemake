"use client";

import Image from "next/image";
import { useState } from "react";
import { Download, FileText, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export function FreeMaterial() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular salvamento no Supabase (será implementado o hook real depois)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsUnlocked(true);
    }, 1500);
  };

  return (
    <Section className="pt-12 pb-24 sm:pt-16 sm:pb-32 bg-[rgb(var(--color-brand-mint))]/10 relative overflow-hidden">
      {/* Elemento Decorativo */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[rgb(var(--color-brand-mint))]/20 blur-[100px] -z-10 rounded-full translate-x-1/2" />

      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Mockup E-book e Sinopse */}
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--color-brand-royal))]/10 text-[rgb(var(--color-brand-royal))] font-bold text-sm mb-6">
              <FileText className="size-4" />
              MATERIAL GRATUITO
            </div>
            <h2 className="font-display text-[rgb(var(--color-brand-navy))] text-[clamp(2rem,3vw,3rem)] leading-[1.1] mb-6">
              7 Princípios para Ensinar Tecnologia com Cosmovisão Cristã
            </h2>
            
            <p className="text-[rgb(var(--color-brand-navy))]/80 text-[1.125rem] leading-relaxed mb-8">
              A sua escola possui equipamentos ou possui uma visão? Descubra como preparar seus alunos para um mundo profundamente tecnológico sem entregá-los ao espírito deste mundo. Neste e-book exclusivo, apresentamos um checklist completo para ajudar sua liderança escolar a diagnosticar a maturidade da educação tecnológica na sua instituição.
            </p>

            <div className="relative w-full max-w-sm aspect-[3/4] mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-[-2deg] hover:rotate-0 transition-transform duration-500 bg-[rgb(var(--color-brand-royal-deep))] flex items-center justify-center">
              {/* O ideal é ter um cover do PDF na pasta public, como não temos, criei um visual legal por css/texto */}
              <div className="text-center p-8">
                <span className="font-display text-[2rem] text-white/90 leading-tight block mb-4">
                  O Filtro<br/>Cristão<br/>para pensar<br/>tecnologia
                </span>
                <span className="inline-block px-4 py-1 border border-white/20 rounded-full text-white/60 text-sm">
                  Checklist e Guia
                </span>
              </div>
              <div className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none">
                 <span className="bg-white/90 text-[rgb(var(--color-brand-royal))] font-bold px-4 py-2 rounded-lg shadow-sm backdrop-blur-sm shadow-xl rotate-12 mt-32">PDF Gratuito</span>
              </div>
            </div>
          </Reveal>

          {/* Gated Content Form */}
          <Reveal delay={0.2}>
            <div className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-xl border border-gray-100 relative z-10">
              
              {!isUnlocked ? (
                <>
                  <h3 className="font-display text-[1.5rem] text-[rgb(var(--color-brand-navy))] mb-2">
                    Baixe o Checklist Completo
                  </h3>
                  <p className="text-gray-500 mb-8">
                    Preencha os dados abaixo para liberar o acesso imediato ao material.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome</label>
                      <input required type="text" className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[rgb(var(--color-brand-royal))] focus:ring-2 focus:ring-[rgb(var(--color-brand-royal))]/20 outline-none transition-all" placeholder="Nome completo" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">E-mail Corporativo</label>
                      <input required type="email" className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[rgb(var(--color-brand-royal))] focus:ring-2 focus:ring-[rgb(var(--color-brand-royal))]/20 outline-none transition-all" placeholder="voce@escola.com.br" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Escola</label>
                      <input required type="text" className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[rgb(var(--color-brand-royal))] focus:ring-2 focus:ring-[rgb(var(--color-brand-royal))]/20 outline-none transition-all" placeholder="Colégio..." />
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-14 mt-4 rounded-xl bg-[rgb(var(--color-brand-royal))] hover:bg-[rgb(var(--color-brand-royal-deep))] text-white font-bold text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-wait"
                    >
                      {isSubmitting ? "Liberando acesso..." : "Quero baixar agora"}
                    </button>
                  </form>
                  <p className="text-xs text-center text-gray-400 mt-4">Suas informações estão seguras. Não enviamos spam.</p>
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="size-10 text-green-600" />
                  </div>
                  <h3 className="font-display text-[1.75rem] text-[rgb(var(--color-brand-navy))] mb-4">
                    Tudo certo!
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Seu material foi liberado com sucesso. Clique no botão abaixo para baixar o PDF.
                  </p>
                  <a 
                    href="/downloads/E_book 2026_camp.pdf" 
                    download="7-Principios-WeMake.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-3 w-full h-14 rounded-xl bg-[rgb(var(--color-brand-mint))] hover:bg-[rgb(var(--color-brand-mint-deep))] text-[rgb(var(--color-brand-navy))] font-bold text-lg shadow-lg hover:-translate-y-1 transition-all"
                  >
                    <Download className="size-5" />
                    Fazer Download do PDF
                  </a>
                </div>
              )}

            </div>
          </Reveal>

        </div>
      </Container>
    </Section>
  );
}
