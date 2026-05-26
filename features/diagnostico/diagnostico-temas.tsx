import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

const temas = [
  "Por que ensinar tecnologia a partir da cosmovisão cristã",
  "Discernimento sobre o uso de telas em casa e na escola",
  "Formação docente para professores em escolas confessionais",
  "Currículo estruturado por progressão e faixa etária",
  "Virtudes formadas pela prática técnica (prudência, responsabilidade, colaboração)",
  "Ciberética e formação humana na era digital",
  "Checklist prático de diagnóstico para a liderança escolar",
];

/**
 * Lista de temas do ebook — estilo Poliedro adaptado:
 * 2 colunas com bullets de check, fundo branco limpo, identidade mint.
 */
export function DiagnosticoTemas() {
  return (
    <Section className="pt-16 sm:pt-20 pb-16 sm:pb-20 bg-white relative">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <Reveal>
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-royal))] mb-4 font-bold">
              Confira os temas
            </p>
            <h2 className="font-display text-[rgb(var(--color-brand-navy))] text-[clamp(1.875rem,3.5vw,2.75rem)] leading-[1.1] mb-4 text-balance">
              O que você vai encontrar neste material
            </h2>
            <p className="text-[rgb(var(--color-brand-navy))]/70 text-[1.0625rem] leading-relaxed">
              7 capítulos práticos para apoiar diretores, coordenadores e professores em
              decisões pedagógicas com clareza e propósito.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ul className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {temas.map((tema, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[rgb(var(--color-brand-navy))] text-[1rem] sm:text-[1.0625rem] leading-snug"
              >
                <CheckCircle2 className="size-5 shrink-0 mt-0.5 text-[rgb(var(--color-brand-mint-deep))]" />
                <span>{tema}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
