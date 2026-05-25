"use client";

import Image from "next/image";
import { useState } from "react";
import { Download, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { ROLES_LABEL, UF_OPTIONS } from "@/lib/validation";

export function FreeMaterial() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const form = e.currentTarget;
    const data = {
      type: "material",
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      whatsapp: (form.elements.namedItem("whatsapp") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLSelectElement).value,
      institution: (form.elements.namedItem("institution") as HTMLInputElement).value,
      city: (form.elements.namedItem("city") as HTMLInputElement).value,
      state: (form.elements.namedItem("state") as HTMLSelectElement).value,
      consent: (form.elements.namedItem("consent") as HTMLInputElement).checked,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(json?.error === "ValidationError"
          ? "Confira os campos e tente novamente."
          : "Não foi possível liberar agora. Tente em instantes.");
        setIsSubmitting(false);
        return;
      }
      setIsUnlocked(true);
    } catch {
      setSubmitError("Falha de conexão. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section className="pt-12 pb-24 sm:pt-16 sm:pb-32 bg-[rgb(var(--color-brand-mint))]/10 relative overflow-hidden">
      {/* Elemento Decorativo */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[rgb(var(--color-brand-mint))]/20 blur-[100px] -z-10 rounded-full translate-x-1/2" />

      {/* Marca d'água — emblema We Make */}
      <div aria-hidden className="absolute top-[8%] left-[-6%] w-[420px] h-[420px] opacity-[0.08] -rotate-12 pointer-events-none select-none">
        <Image src="/photos/3.png" alt="" fill className="object-contain" sizes="420px" />
      </div>
      <div aria-hidden className="absolute bottom-[8%] right-[-5%] w-[360px] h-[360px] opacity-[0.07] rotate-12 pointer-events-none select-none">
        <Image src="/photos/3.png" alt="" fill className="object-contain" sizes="360px" />
      </div>

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

            {/* Capa real do ebook com glow + perspectiva */}
            <div className="relative w-full max-w-[380px] aspect-square mx-auto lg:mx-0 flex items-center justify-center overflow-visible my-8">

              {/* Glow de fundo (mint + sky) */}
              <div className="absolute inset-0 -z-10 scale-[1.2] blur-[80px] bg-[rgb(var(--color-brand-mint))]/30 rounded-full" />
              <div className="absolute inset-0 -z-10 scale-[0.9] blur-[50px] bg-[rgb(var(--color-brand-sky))]/30 rounded-full" />

              {/* Espiral decorativa */}
              <svg viewBox="0 0 100 100" className="absolute -top-4 -right-4 size-36 text-[rgb(var(--color-brand-mint))]/60 z-0 pointer-events-none select-none">
                <path d="M50 50 C40 30 20 40 30 60 C40 80 80 60 70 30 C60 0 0 20 20 70 C40 120 120 80 90 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>

              {/* Capa real do ebook (PNG) com perspectiva sutil */}
              <div
                className="relative z-10 w-[240px] sm:w-[280px] aspect-[2/3] rounded-md overflow-hidden hover:scale-[1.04] hover:-rotate-2 transition-transform duration-500"
                style={{
                  boxShadow: "-16px 16px 48px rgba(11,31,68,0.35), -4px 4px 12px rgba(11,31,68,0.25), 2px 0 6px rgba(255,255,255,0.4)",
                }}
              >
                <Image
                  src="/books/7-principios-cosmovisao-crista.jpg"
                  alt="7 Princípios para Ensinar Tecnologia com Cosmovisão Cristã — ebook gratuito We Make"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 240px, 280px"
                  priority
                />
                {/* Lombada sintética (borda esquerda) */}
                <div className="absolute top-0 left-0 h-full w-[3px] bg-gradient-to-b from-white/30 via-white/10 to-transparent" />
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
                    <FmField name="name" label="Seu Nome" placeholder="Nome completo" required />
                    <FmField name="email" type="email" label="E-mail Corporativo" placeholder="voce@escola.com.br" required />
                    <FmField name="whatsapp" type="tel" label="WhatsApp" placeholder="(99) 99999-9999" required />
                    <FmSelect name="role" label="Seu Cargo" required options={[
                      { value: "", label: "Selecione..." },
                      ...Object.entries(ROLES_LABEL).map(([value, label]) => ({ value, label })),
                    ]} />
                    <FmField name="institution" label="Nome da Escola" placeholder="Colégio..." required />
                    <div className="grid grid-cols-[1fr_100px] gap-3">
                      <FmField name="city" label="Cidade" placeholder="Sua cidade" required />
                      <FmSelect name="state" label="UF" required options={[
                        { value: "", label: "—" },
                        ...UF_OPTIONS.map((uf) => ({ value: uf, label: uf })),
                      ]} />
                    </div>

                    <label className="flex items-start gap-3 text-xs text-gray-600 cursor-pointer pt-1">
                      <input type="checkbox" name="consent" required className="mt-0.5 size-4 rounded border-gray-300 text-[rgb(var(--color-brand-royal))] focus:ring-[rgb(var(--color-brand-royal))]/30" />
                      <span>Concordo em receber o material e contatos da We Make (LGPD).</span>
                    </label>

                    {submitError && (
                      <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                        <AlertCircle className="size-4 shrink-0 mt-0.5" />
                        <span>{submitError}</span>
                      </div>
                    )}

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

function FmField({
  name, label, placeholder, type = "text", required,
}: { name: string; label: string; placeholder?: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[rgb(var(--color-brand-royal))] focus:ring-2 focus:ring-[rgb(var(--color-brand-royal))]/20 outline-none transition-all"
      />
    </div>
  );
}

function FmSelect({
  name, label, required, options,
}: { name: string; label: string; required?: boolean; options: { value: string; label: string }[] }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        id={name}
        name={name}
        required={required}
        className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[rgb(var(--color-brand-royal))] focus:ring-2 focus:ring-[rgb(var(--color-brand-royal))]/20 outline-none transition-all appearance-none bg-white text-gray-700"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
