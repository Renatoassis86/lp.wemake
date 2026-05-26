import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

const temas = [
  "A pergunta que a escola cristã precisa responder sobre tecnologia",
  "Os 3 sinais de alerta de uma educação tecnológica sem formação",
  "O filtro bíblico (Criação · Queda · Redenção · Restauração) para pensar tecnologia",
  "Os 7 Princípios para uma educação tecnológica fundamentada na cosmovisão cristã",
  "Como formar virtudes — prudência, domínio próprio, colaboração — através da técnica",
  "Por que criar é mais formativo que consumir e como mudar a postura dos alunos",
  "Checklist de 5 dimensões para diagnosticar a maturidade da sua escola",
];

/**
 * Lista de temas do ebook — conteúdo fiel ao PDF
 * "7 Princípios para Ensinar Tecnologia com Cosmovisão Cristã".
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
              Um guia bíblico-pedagógico para a liderança da sua escola formar alunos
              sábios diante de um mundo profundamente tecnológico — sem cair no medo nem
              na fascinação acrítica pela inovação.
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
