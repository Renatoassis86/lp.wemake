"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactInput } from "@/lib/validation";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Strategic lead capture form.
 * Hooked to React Hook Form + Zod. Posts to /api/lead by default,
 * but works in “fire-and-display-success” mode if no endpoint is wired.
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { message: "", consent: false },
  });

  const onSubmit = async (data: ContactInput) => {
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch(() => {
        // Endpoint may not be wired in this environment; fail silently in MVP.
      });
      trackEvent({
        name: "lead_submit",
        channel: "contact_form",
        school: data.institution,
      });
      setSubmitted(true);
      reset();
    } catch {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div
        className="
          flex flex-col items-center justify-center gap-4
          rounded-3xl border border-glow-cyan/30 bg-glow-cyan/[0.04]
          px-8 py-16 text-center
        "
      >
        <div className="inline-flex size-12 items-center justify-center rounded-full bg-glow-cyan/15 ring-1 ring-glow-cyan/40">
          <Check className="size-5 text-glow-cyan" aria-hidden />
        </div>
        <h3 className="font-display text-2xl">Recebemos sua mensagem.</h3>
        <p className="max-w-md text-[0.9375rem] text-foreground/65">
          Nosso time institucional retornará em até <strong>um dia útil</strong> com
          uma proposta de agenda para reunião estratégica.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
      <Field label="Nome completo" error={errors.name?.message}>
        <Input
          {...register("name")}
          autoComplete="name"
          placeholder="Como devemos chamar você?"
        />
      </Field>

      <Field label="Email institucional" error={errors.email?.message}>
        <Input
          {...register("email")}
          type="email"
          autoComplete="email"
          placeholder="diretoria@suaescola.com.br"
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Função" error={errors.role?.message}>
          <SelectNative {...register("role")}>
            <option value="">Selecione…</option>
            <option value="diretor">Diretor(a)</option>
            <option value="mantenedor">Mantenedor(a)</option>
            <option value="coordenador">Coordenador(a)</option>
            <option value="outro">Outro</option>
          </SelectNative>
        </Field>

        <Field label="Porte da escola" error={errors.students?.message}>
          <SelectNative {...register("students")}>
            <option value="">Selecione…</option>
            <option value="<200">Até 200 alunos</option>
            <option value="200-500">200 a 500</option>
            <option value="500-1000">500 a 1.000</option>
            <option value="1000-2500">1.000 a 2.500</option>
            <option value=">2500">Mais de 2.500</option>
          </SelectNative>
        </Field>
      </div>

      <Field label="Instituição" error={errors.institution?.message}>
        <Input
          {...register("institution")}
          placeholder="Nome da escola"
          autoComplete="organization"
        />
      </Field>

      <Field label="Mensagem (opcional)" error={errors.message?.message}>
        <Textarea
          {...register("message")}
          placeholder="Conte brevemente o momento da sua instituição."
          rows={4}
        />
      </Field>

      <label className="flex items-start gap-3 text-[0.8125rem] text-foreground/60">
        <input
          type="checkbox"
          {...register("consent")}
          className="mt-1 size-4 rounded border-white/20 bg-transparent accent-glow-cyan"
        />
        <span>
          Autorizo a We Make a entrar em contato e tratar meus dados conforme a{" "}
          <a href="/privacidade" className="text-foreground underline decoration-white/30 hover:decoration-white">
            Política de Privacidade
          </a>
          .
        </span>
      </label>
      {errors.consent?.message && (
        <p className="text-sm text-red-300/90 -mt-2">{errors.consent.message}</p>
      )}

      <Button
        type="submit"
        size="xl"
        trailingIcon={!isSubmitting}
        disabled={isSubmitting}
        className="mt-2 w-full sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Enviando…
          </>
        ) : (
          "Solicitar reunião estratégica"
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-[0.8125rem] text-red-300/90">{error}</p>}
    </div>
  );
}

function SelectNative({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"select">) {
  return (
    <select
      {...props}
      className={cn(
        "h-12 px-4 rounded-xl appearance-none",
        "border border-white/10 hover:border-white/20 focus:border-glow-cyan/60",
        "bg-ink-900 text-[0.9375rem] text-foreground",
        "transition-colors duration-300 ease-[var(--ease-cinematic)]",
        "focus:outline-none focus:ring-2 focus:ring-glow-cyan/30",
        className,
      )}
    />
  );
}
