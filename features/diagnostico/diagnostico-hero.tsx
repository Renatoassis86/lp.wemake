"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  User2,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { PERFIL_ESCOLA_LABEL, ROLES_LABEL } from "@/lib/validation";

const COVER_SRC = "/books/7-principios-cosmovisao-crista.jpg";

/**
 * Hero + Form em layout split (lg+) — devices stack à esquerda, formulário à direita.
 * Devices mostrando a capa do ebook: notebook (atrás) + iPad (centro) + iPhone (frente).
 */
export function DiagnosticoHero() {
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
      className="relative pt-[7rem] sm:pt-[9rem] md:pt-[10rem] lg:pt-[11rem] pb-12 sm:pb-16 lg:pb-20 bg-[rgb(var(--color-brand-royal))] overflow-hidden"
    >
      <Atmosphere />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">

          {/* ─── COLUNA ESQUERDA: badge + título + subtítulo + devices stack ─── */}
          <div className="order-1">
            <Reveal>
              <div className="relative inline-block mb-6">
                {/* Glow pulsante atrás do badge */}
                <div
                  aria-hidden
                  className="absolute -inset-1.5 bg-[rgb(var(--color-brand-mint))]/40 blur-xl rounded-full animate-pulse pointer-events-none"
                />
                <div className="relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))] font-extrabold text-[0.875rem] sm:text-[0.9375rem] tracking-wide shadow-[0_8px_24px_-4px_rgba(118,243,205,0.6)] ring-2 ring-[rgb(var(--color-brand-mint))]/40">
                  <span className="flex items-center justify-center size-6 sm:size-7 rounded-full bg-[rgb(var(--color-brand-navy))] text-[rgb(var(--color-brand-mint))]">
                    <Sparkles className="size-3.5 sm:size-4" />
                  </span>
                  <span className="leading-none">
                    <span className="font-display text-[1rem] sm:text-[1.125rem] mr-1.5">100% GRATUITO</span>
                    <span className="opacity-80">para educadores e lideranças</span>
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1
                className="font-display text-white text-[clamp(1.875rem,3.5vw+0.5rem,3.25rem)] leading-[1.05] tracking-normal text-balance mb-4"
                style={{ textShadow: "0 4px 12px rgba(0,0,0,0.18)" }}
              >
                7 Princípios para ensinar tecnologia com{" "}
                <span className="text-[rgb(var(--color-brand-mint))]">cosmovisão cristã</span>
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-white/85 text-[0.9375rem] sm:text-[1rem] leading-relaxed mb-8 max-w-xl">
                Material exclusivo para diretores, mantenedores, coordenadores e professores
                avaliarem a maturidade tecnológica da sua escola.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <DevicesStack />
            </Reveal>
          </div>

          {/* ─── COLUNA DIREITA: formulário ─── */}
          <Reveal delay={0.25} className="order-2 w-full">
            <div className="bg-white rounded-[1.5rem] sm:rounded-[1.75rem] p-5 sm:p-6 md:p-7 shadow-2xl">
              <div className="mb-5">
                <h2 className="font-display text-[rgb(var(--color-brand-navy))] text-[1.375rem] sm:text-[1.5rem] leading-[1.1] mb-1.5">
                  Receba o ebook agora
                </h2>
                <p className="text-gray-500 text-[0.875rem] leading-snug">
                  Preencha os dados abaixo. Download imediato após o envio.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <Field id="nome" label="Nome" placeholder="Seu nome" icon={<User2 className="size-4" />} required />
                <Field id="email" type="email" label="E-mail" placeholder="voce@escola.com.br" icon={<Mail className="size-4" />} required />
                <Field id="telefone" type="tel" label="Telefone" placeholder="(99) 99999-9999" icon={<Phone className="size-4" />} required />

                <SelectField
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

                <Field id="nome_escola" label="Nome da escola" placeholder="Colégio..." icon={<Building2 className="size-4" />} required />

                <div className="grid grid-cols-2 gap-3">
                  <SelectField
                    id="perfil_escola"
                    label="Perfil"
                    icon={<Building2 className="size-4" />}
                    required
                    options={[
                      { value: "", label: "Selecione" },
                      ...Object.entries(PERFIL_ESCOLA_LABEL).map(([value, label]) => ({ value, label })),
                    ]}
                  />
                  <Field id="cidade" label="Cidade" placeholder="Sua cidade" icon={<MapPin className="size-4" />} required />
                </div>

                <SelectField
                  id="ja_conversou_especialista"
                  label="Já conversou com um especialista?"
                  icon={<User2 className="size-4" />}
                  required
                  options={[
                    { value: "", label: "Selecione..." },
                    { value: "sim", label: "Sim, já conversei" },
                    { value: "nao", label: "Ainda não" },
                  ]}
                />

                <label className="flex items-start gap-2.5 text-[0.8125rem] text-gray-600 cursor-pointer leading-snug pt-1">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-0.5 size-4 rounded border-gray-300 text-[rgb(var(--color-brand-royal))] focus:ring-[rgb(var(--color-brand-royal))]/30 shrink-0"
                  />
                  <span>Concordo em receber o material e comunicações da We Make (LGPD).</span>
                </label>

                {submitError && (
                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[0.8125rem]">
                    <AlertCircle className="size-4 shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 mt-1 rounded-xl bg-[rgb(var(--color-brand-mint))] hover:bg-[rgb(var(--color-brand-mint-deep))] text-[rgb(var(--color-brand-navy))] font-bold text-[0.9375rem] flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-70 disabled:cursor-wait hover:-translate-y-0.5"
                >
                  {isSubmitting ? "Liberando acesso..." : "Quero baixar o ebook agora"}
                  {!isSubmitting && <ArrowRight className="size-4" />}
                </button>

                <p className="text-[0.6875rem] text-center text-gray-400">
                  Seus dados são confidenciais. Sem spam.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ─── Devices Stack: Notebook (atrás) + iPad (centro) + iPhone (frente) ─── */
function DevicesStack() {
  return (
    <div className="relative w-full max-w-[520px] aspect-[5/4] mx-auto lg:mx-0">
      {/* Glow */}
      <div className="absolute inset-0 -z-10 scale-[1.3] blur-[80px] bg-[rgb(var(--color-brand-mint))]/30 rounded-full" />
      <div className="absolute inset-0 -z-10 scale-[1.1] blur-[55px] bg-[rgb(var(--color-brand-royal-soft))]/35 rounded-full" />

      {/* ── NOTEBOOK (atrás, esquerda-baixo) ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-0 left-0 w-[68%]"
      >
        {/* Tela */}
        <div
          className="relative aspect-[16/10] rounded-t-xl bg-[#1a2333] p-2 ring-1 ring-white/15"
          style={{ boxShadow: "-10px 14px 38px rgba(0,0,0,0.45)" }}
        >
          {/* Câmera */}
          <div className="absolute inset-x-1/2 -translate-x-1/2 top-1 size-1 rounded-full bg-white/30" />
          <div className="relative w-full h-full rounded-md overflow-hidden bg-[rgb(var(--color-brand-navy))]">
            <Image
              src={COVER_SRC}
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 240px, 360px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
          </div>
        </div>
        {/* Base */}
        <div className="relative h-3 bg-gradient-to-b from-[#2a3344] to-[#10182a] rounded-b-[1.25rem] shadow-2xl">
          <div className="absolute inset-x-1/2 top-0 -translate-x-1/2 w-[32%] h-[3px] bg-black/40 rounded-b-md" />
        </div>
      </motion.div>

      {/* ── IPAD (centro, sobreposto) ── */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: 4 }}
        animate={{ opacity: 1, y: 0, rotate: 3 }}
        transition={{ duration: 0.85, delay: 0.15 }}
        className="absolute bottom-[8%] left-[42%] w-[36%]"
      >
        <div
          className="relative aspect-[3/4] rounded-[1.2rem] bg-[#1a2333] p-2 ring-1 ring-white/15"
          style={{ boxShadow: "-12px 18px 42px rgba(0,0,0,0.55)" }}
        >
          <div className="absolute inset-x-1/2 -translate-x-1/2 top-2 size-1.5 rounded-full bg-black/40 ring-1 ring-white/20" />
          <div className="relative w-full h-full rounded-[0.85rem] overflow-hidden bg-[rgb(var(--color-brand-navy))]">
            <Image
              src={COVER_SRC}
              alt=""
              fill
              sizes="180px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/8 to-transparent pointer-events-none" />
          </div>
          <div className="absolute inset-x-1/2 -translate-x-1/2 bottom-1 w-[28%] h-[3px] bg-white/30 rounded-full" />
        </div>
      </motion.div>

      {/* ── IPHONE (frente, direita-cima) ── */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -8 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ duration: 0.85, delay: 0.3 }}
        className="absolute top-[4%] right-[2%] w-[22%]"
      >
        <div
          className="relative aspect-[9/19] rounded-[1.4rem] bg-[#0e1424] p-[6px] ring-1 ring-white/20"
          style={{ boxShadow: "-10px 16px 36px rgba(0,0,0,0.55)" }}
        >
          {/* Dynamic Island */}
          <div className="absolute inset-x-1/2 -translate-x-1/2 top-1.5 w-[36%] h-[10px] bg-black rounded-full ring-1 ring-white/10 z-10" />
          <div className="relative w-full h-full rounded-[1rem] overflow-hidden bg-[rgb(var(--color-brand-navy))]">
            <Image
              src={COVER_SRC}
              alt=""
              fill
              sizes="100px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/8 to-transparent pointer-events-none" />
          </div>
          {/* Home indicator */}
          <div className="absolute inset-x-1/2 -translate-x-1/2 bottom-1 w-[36%] h-[2.5px] bg-white/40 rounded-full" />
        </div>
      </motion.div>

      {/* ── Selo GRÁTIS ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5, ease: "backOut" }}
        className="absolute top-[6%] left-[10%] size-16 sm:size-[72px] rounded-full bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))] flex items-center justify-center font-display text-[0.875rem] font-bold shadow-xl -rotate-12 z-20 ring-4 ring-[rgb(var(--color-brand-royal))]/40"
      >
        GRÁTIS
      </motion.div>
    </div>
  );
}

/* ─── Form atoms (Field + SelectField) ─── */
function Field({
  id, label, placeholder, type = "text", required, icon,
}: { id: string; label: string; placeholder?: string; type?: string; required?: boolean; icon: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.8125rem] font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{icon}</div>
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          placeholder={placeholder}
          className="w-full h-11 pl-8 pr-3 text-[0.9375rem] rounded-lg border border-gray-200 focus:border-[rgb(var(--color-brand-royal))] focus:ring-2 focus:ring-[rgb(var(--color-brand-royal))]/20 outline-none transition-all"
        />
      </div>
    </div>
  );
}

function SelectField({
  id, label, required, icon, options,
}: { id: string; label: string; required?: boolean; icon: React.ReactNode; options: { value: string; label: string }[] }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.8125rem] font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{icon}</div>
        <select
          id={id}
          name={id}
          required={required}
          className="w-full h-11 pl-8 pr-3 text-[0.9375rem] rounded-lg border border-gray-200 focus:border-[rgb(var(--color-brand-royal))] focus:ring-2 focus:ring-[rgb(var(--color-brand-royal))]/20 outline-none transition-all appearance-none bg-white text-gray-700"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function Atmosphere() {
  return (
    <>
      <div
        aria-hidden
        className="hidden md:block absolute -left-[20%] top-0 w-[50%] aspect-square rounded-full border-[60px] lg:border-[80px] border-[rgb(var(--color-brand-royal-deep))]/40 opacity-50"
      />
      <div
        aria-hidden
        className="hidden md:block absolute -right-[30%] top-1/3 -translate-y-1/3 w-[70%] aspect-square rounded-full border-[40px] lg:border-[50px] border-[rgb(var(--color-brand-royal-soft))]/30"
      />
    </>
  );
}
