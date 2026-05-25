"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarDays, Building2, User2, Mail, Phone, CheckCircle2, AlertCircle, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { ROLES_LABEL, UF_OPTIONS } from "@/lib/validation";

export function Consultor() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      whatsapp: (form.elements.namedItem("whatsapp") as HTMLInputElement).value,
      institution: (form.elements.namedItem("institution") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLSelectElement).value,
      city: (form.elements.namedItem("city") as HTMLInputElement).value,
      state: (form.elements.namedItem("state") as HTMLSelectElement).value,
      consent: (form.elements.namedItem("consent") as HTMLInputElement).checked,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "",
      preferred_date: (form.elements.namedItem("preferred_date") as HTMLInputElement)?.value || "",
      preferred_time: (form.elements.namedItem("preferred_time") as HTMLInputElement)?.value || "",
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
          : "Não foi possível enviar agora. Tente novamente em instantes.");
        setIsSubmitting(false);
        return;
      }
      setIsDone(true);
    } catch {
      setSubmitError("Falha de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="reuniao" bleed className="pt-12 pb-24 sm:pt-16 sm:pb-32 bg-[rgb(var(--color-brand-royal-deep))] relative overflow-hidden">
      {/* Glow decorativo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgb(var(--color-brand-mint))]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Watermark W — topo esquerdo, atrás da copy (longe do formulário à direita) */}
      <div
        aria-hidden
        className="absolute top-8 -left-16 w-[400px] h-[400px] opacity-[0.09] pointer-events-none select-none rotate-[6deg] z-0 hidden lg:block"
      >
        <Image src="/photos/3.png" alt="" fill className="object-contain" sizes="360px" />
      </div>

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
                    <SelectField
                      id="role"
                      icon={<Building2 className="size-4" />}
                      label="Seu Cargo"
                      required
                      options={[
                        { value: "", label: "Selecione..." },
                        ...Object.entries(ROLES_LABEL).map(([value, label]) => ({ value, label })),
                      ]}
                    />
                  </div>
                  <Field id="institution" icon={<Building2 className="size-4" />} label="Nome da Escola" placeholder="Colégio..." required />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field id="email" icon={<Mail className="size-4" />} type="email" label="E-mail" placeholder="voce@escola.com.br" required />
                    <Field id="whatsapp" icon={<Phone className="size-4" />} type="tel" label="WhatsApp" placeholder="(99) 99999-9999" required />
                  </div>

                  <div className="grid sm:grid-cols-[1fr_120px] gap-4">
                    <Field id="city" icon={<MapPin className="size-4" />} label="Cidade" placeholder="Sua cidade" required />
                    <SelectField
                      id="state"
                      icon={<MapPin className="size-4" />}
                      label="UF"
                      required
                      options={[
                        { value: "", label: "—" },
                        ...UF_OPTIONS.map((uf) => ({ value: uf, label: uf })),
                      ]}
                    />
                  </div>

                  {/* Sugestão de data + horário para a reunião */}
                  <div className="rounded-2xl border border-[rgb(var(--color-brand-mint))]/30 bg-[rgb(var(--color-brand-mint))]/5 p-4">
                    <p className="flex items-center gap-2 text-sm font-semibold text-[rgb(var(--color-brand-navy))] mb-3">
                      <CalendarDays className="size-4 text-[rgb(var(--color-brand-royal))]" />
                      Sugestão de data e horário (opcional)
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="preferred_date" className="block text-xs font-medium text-gray-600 mb-1">Data preferida</label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><CalendarDays className="size-4" /></div>
                          <input
                            id="preferred_date"
                            name="preferred_date"
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full h-11 pl-9 pr-3 rounded-xl border border-gray-200 focus:border-[rgb(var(--color-brand-royal))] focus:ring-2 focus:ring-[rgb(var(--color-brand-royal))]/20 outline-none transition-all bg-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="preferred_time" className="block text-xs font-medium text-gray-600 mb-1">Horário preferido</label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><Clock className="size-4" /></div>
                          <input
                            id="preferred_time"
                            name="preferred_time"
                            type="time"
                            className="w-full h-11 pl-9 pr-3 rounded-xl border border-gray-200 focus:border-[rgb(var(--color-brand-royal))] focus:ring-2 focus:ring-[rgb(var(--color-brand-royal))]/20 outline-none transition-all bg-white"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-[0.6875rem] text-gray-500 mt-2">Confirmaremos a disponibilidade por e-mail/WhatsApp.</p>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Conte um pouco sobre sua escola (opcional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Total de alunos, séries atendidas, principais desafios..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[rgb(var(--color-brand-royal))] focus:ring-2 focus:ring-[rgb(var(--color-brand-royal))]/20 outline-none transition-all resize-y"
                    />
                  </div>

                  <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      className="mt-0.5 size-4 rounded border-gray-300 text-[rgb(var(--color-brand-royal))] focus:ring-[rgb(var(--color-brand-royal))]/30"
                    />
                    <span>
                      Concordo com o tratamento dos meus dados para que a equipe We Make entre em contato sobre esta solicitação (LGPD).
                    </span>
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

function SelectField({
  id, label, icon, required, options,
}: {
  id: string; label: string; icon: React.ReactNode; required?: boolean;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{icon}</div>
        <select
          id={id}
          name={id}
          required={required}
          className="w-full h-12 pl-9 pr-4 rounded-xl border border-gray-200 focus:border-[rgb(var(--color-brand-royal))] focus:ring-2 focus:ring-[rgb(var(--color-brand-royal))]/20 outline-none transition-all appearance-none bg-white text-gray-700"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
