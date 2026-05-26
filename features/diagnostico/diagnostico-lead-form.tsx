"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AlertCircle, ArrowRight, BookOpenCheck, User2, Mail, Phone, Building2, MapPin } from "lucide-react";
import { PERFIL_ESCOLA_LABEL, ROLES_LABEL } from "@/lib/validation";

/**
 * Form curto da LP /diagnostico — 8 campos. Após submit OK redireciona pra /obrigado.
 */
export function DiagnosticoLeadForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const form = e.currentTarget;
    const data = {
      nome: (form.elements.namedItem("nome") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      telefone: (form.elements.namedItem("telefone") as HTMLInputElement).value,
      cargo: (form.elements.namedItem("cargo") as HTMLSelectElement).value,
      nome_escola: (form.elements.namedItem("nome_escola") as HTMLInputElement).value,
      perfil_escola: (form.elements.namedItem("perfil_escola") as HTMLSelectElement).value,
      cidade: (form.elements.namedItem("cidade") as HTMLInputElement).value,
      ja_conversou_especialista:
        (form.elements.namedItem("ja_conversou_especialista") as HTMLSelectElement).value === "sim",
      consent: (form.elements.namedItem("consent") as HTMLInputElement).checked,
    };

    try {
      const res = await fetch("/api/diagnostico/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(
          json?.error === "ValidationError"
            ? "Confira os campos e tente novamente."
            : "Não foi possível liberar agora. Tente em instantes.",
        );
        setIsSubmitting(false);
        return;
      }
      // Sucesso → vai pra /obrigado com nome para personalização
      router.push(`/obrigado?nome=${encodeURIComponent(data.nome.split(" ")[0] || "")}`);
    } catch {
      setSubmitError("Falha de conexão. Tente novamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <Section
      id="diagnostico-form"
      bleed
      className="py-16 sm:py-24 bg-[rgb(var(--color-brand-royal-deep))] relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgb(var(--color-brand-mint))]/10 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--color-brand-mint))]/20 text-[rgb(var(--color-brand-mint))] font-bold text-sm mb-5">
                <BookOpenCheck className="size-4" />
                ACESSO IMEDIATO
              </div>
              <h2 className="font-display text-white text-[clamp(1.875rem,3.5vw,3rem)] leading-[1.1] mb-4 text-balance">
                Preencha para baixar o ebook
              </h2>
              <p className="text-white/80 text-[1.0625rem] leading-relaxed max-w-xl mx-auto">
                Liberamos o material imediatamente após o envio. Suas informações são
                confidenciais.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-[1.75rem] sm:rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-2xl space-y-5"
            >
              <DiagField id="nome" label="Nome" placeholder="Seu nome completo" icon={<User2 className="size-4" />} required />

              <div className="grid sm:grid-cols-2 gap-4">
                <DiagField id="email" type="email" label="E-mail" placeholder="voce@escola.com.br" icon={<Mail className="size-4" />} required />
                <DiagField id="telefone" type="tel" label="Telefone" placeholder="(99) 99999-9999" icon={<Phone className="size-4" />} required />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <DiagSelect
                  id="cargo"
                  label="Seu cargo"
                  icon={<User2 className="size-4" />}
                  required
                  options={[
                    { value: "", label: "Selecione..." },
                    ...Object.entries(ROLES_LABEL).map(([value, label]) => ({ value, label })),
                    { value: "outro", label: "Outro" },
                  ]}
                />
                <DiagField id="nome_escola" label="Nome da escola" placeholder="Colégio..." icon={<Building2 className="size-4" />} required />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <DiagSelect
                  id="perfil_escola"
                  label="Perfil da escola"
                  icon={<Building2 className="size-4" />}
                  required
                  options={[
                    { value: "", label: "Selecione..." },
                    ...Object.entries(PERFIL_ESCOLA_LABEL).map(([value, label]) => ({ value, label })),
                  ]}
                />
                <DiagField id="cidade" label="Cidade" placeholder="Sua cidade" icon={<MapPin className="size-4" />} required />
              </div>

              <DiagSelect
                id="ja_conversou_especialista"
                label="Já conversou com um especialista sobre o tema?"
                icon={<User2 className="size-4" />}
                required
                options={[
                  { value: "", label: "Selecione..." },
                  { value: "sim", label: "Sim, já conversei" },
                  { value: "nao", label: "Não, ainda não" },
                ]}
              />

              <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-0.5 size-4 rounded border-gray-300 text-[rgb(var(--color-brand-royal))] focus:ring-[rgb(var(--color-brand-royal))]/30"
                />
                <span>
                  Concordo com o tratamento dos meus dados para receber o material e
                  comunicações relevantes da We Make (LGPD).
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
                className="w-full h-14 mt-2 rounded-xl bg-[rgb(var(--color-brand-mint))] hover:bg-[rgb(var(--color-brand-mint-deep))] text-[rgb(var(--color-brand-navy))] font-bold text-[1.0625rem] flex items-center justify-center gap-3 transition-all shadow-lg disabled:opacity-70 disabled:cursor-wait hover:-translate-y-0.5"
              >
                {isSubmitting ? "Liberando acesso..." : "Quero baixar o ebook agora"}
                {!isSubmitting && <ArrowRight className="size-5" />}
              </button>
              <p className="text-xs text-center text-gray-400">
                Suas informações estão seguras. Não enviamos spam.
              </p>
            </form>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function DiagField({
  id, label, placeholder, type = "text", required, icon,
}: { id: string; label: string; placeholder?: string; type?: string; required?: boolean; icon: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{icon}</div>
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          placeholder={placeholder}
          className="w-full h-12 pl-9 pr-4 text-base rounded-xl border border-gray-200 focus:border-[rgb(var(--color-brand-royal))] focus:ring-2 focus:ring-[rgb(var(--color-brand-royal))]/20 outline-none transition-all"
        />
      </div>
    </div>
  );
}

function DiagSelect({
  id, label, required, icon, options,
}: { id: string; label: string; required?: boolean; icon: React.ReactNode; options: { value: string; label: string }[] }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{icon}</div>
        <select
          id={id}
          name={id}
          required={required}
          className="w-full h-12 pl-9 pr-4 text-base rounded-xl border border-gray-200 focus:border-[rgb(var(--color-brand-royal))] focus:ring-2 focus:ring-[rgb(var(--color-brand-royal))]/20 outline-none transition-all appearance-none bg-white text-gray-700"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
