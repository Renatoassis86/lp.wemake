"use client";

import { useState } from "react";
import { CalendarDays, Building2, User2, Mail, Phone, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export function Consultor() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      school: (form.elements.namedItem("school") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLInputElement).value,
      students: (form.elements.namedItem("students") as HTMLSelectElement).value,
    };

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "reuniao" }),
      });
    } catch (_) {}

    setIsSubmitting(false);
    setIsDone(true);
  };

  return (
    <Section id="reuniao" bleed className="pt-12 pb-24 sm:pt-16 sm:pb-32 bg-[rgb(var(--color-brand-royal-deep))] relative overflow-hidden">
      {/* Glow decorativo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgb(var(--color-brand-mint))]/10 blur-[120px] rounded-full pointer-events-none" />

      <Container>
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">

          {/* Copy Esquerda */}
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--color-brand-mint))]/20 text-[rgb(var(--color-brand-mint))] font-bold text-sm mb-6">
              <CalendarDays className="size-4" />
              REUNIÃO ESTRATÉGICA
            </div>
            <h2 className="font-display text-white text-[clamp(2.5rem,4vw,4rem)] leading-[1.05] mb-6">
              Vamos conversar sobre a sua escola?
            </h2>
            <p className="text-white/75 text-[1.125rem] leading-relaxed mb-8 max-w-lg">
              Agende uma conversa direta com um dos nossos consultores e descubra como a We Make pode transformar a educação tecnológica na sua instituição — com propósito, currículo completo e formação docente.
            </p>

            <ul className="space-y-4">
              {[
                "Diagnóstico gratuito da sua situação atual",
                "Apresentação do currículo completo da We Make",
                "Plano de implementação personalizado para sua escola",
                "Sem compromisso — apenas uma conversa honesta",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/80 text-[1rem]">
                  <CheckCircle2 className="size-5 text-[rgb(var(--color-brand-mint))] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Formulário */}
          <Reveal delay={0.15}>
            <div className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-2xl">
              {!isDone ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display text-[rgb(var(--color-brand-navy))] text-[1.75rem] mb-2">
                    Preencha seus dados
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Entraremos em contato em até 24h úteis para agendar a conversa.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field id="name" icon={<User2 className="size-4" />} label="Seu Nome" placeholder="Nome completo" required />
                    <Field id="role" icon={<Building2 className="size-4" />} label="Seu Cargo" placeholder="Diretor, Coordenador..." required />
                  </div>
                  <Field id="school" icon={<Building2 className="size-4" />} label="Nome da Escola" placeholder="Colégio..." required />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field id="email" icon={<Mail className="size-4" />} type="email" label="E-mail" placeholder="voce@escola.com.br" required />
                    <Field id="phone" icon={<Phone className="size-4" />} type="tel" label="WhatsApp" placeholder="(99) 99999-9999" required />
                  </div>

                  <div>
                    <label htmlFor="students" className="block text-sm font-medium text-gray-700 mb-1">
                      Total de Alunos
                    </label>
                    <select
                      id="students"
                      name="students"
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[rgb(var(--color-brand-royal))] focus:ring-2 focus:ring-[rgb(var(--color-brand-royal))]/20 outline-none bg-white text-gray-700"
                    >
                      <option value="">Selecione...</option>
                      <option>Menos de 100 alunos</option>
                      <option>100 a 300 alunos</option>
                      <option>300 a 800 alunos</option>
                      <option>Mais de 800 alunos</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 mt-2 rounded-xl bg-[rgb(var(--color-brand-royal))] hover:bg-[rgb(var(--color-brand-royal-deep))] text-white font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-70 disabled:cursor-wait hover:-translate-y-0.5"
                  >
                    {isSubmitting ? "Enviando..." : "Quero agendar minha reunião"}
                  </button>
                  <p className="text-xs text-center text-gray-400">
                    Seus dados são confidenciais e nunca serão compartilhados.
                  </p>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="size-10 text-green-600" />
                  </div>
                  <h3 className="font-display text-[rgb(var(--color-brand-navy))] text-[2rem] mb-4">
                    Recebemos sua solicitação!
                  </h3>
                  <p className="text-gray-600 text-[1.125rem] max-w-sm mx-auto">
                    Em breve um dos nossos consultores entrará em contato para confirmar a data da sua reunião.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function Field({
  id, label, placeholder, icon, type = "text", required,
}: {
  id: string; label: string; placeholder: string; icon: React.ReactNode; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          placeholder={placeholder}
          className="w-full h-12 pl-9 pr-4 rounded-xl border border-gray-200 focus:border-[rgb(var(--color-brand-royal))] focus:ring-2 focus:ring-[rgb(var(--color-brand-royal))]/20 outline-none transition-all"
        />
      </div>
    </div>
  );
}
