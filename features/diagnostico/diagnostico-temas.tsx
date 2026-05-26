import { BookOpenText, Lightbulb, Shield, Sparkles, GraduationCap, Compass, Heart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

const temas = [
  {
    icon: BookOpenText,
    title: "Por que ensinar tecnologia com cosmovisão cristã",
    desc: "A motivação profunda que vai além de pressão de mercado ou tendências educacionais.",
  },
  {
    icon: Shield,
    title: "Discernimento sobre o uso de telas",
    desc: "Como conduzir conversas honestas e bíblicas sobre os limites do digital na vida do aluno.",
  },
  {
    icon: GraduationCap,
    title: "Formação docente confessional",
    desc: "O que o professor de tecnologia em uma escola cristã precisa saber, ser e fazer.",
  },
  {
    icon: Compass,
    title: "Currículo estruturado por progressão",
    desc: "Trilhas de cultura maker, programação, robótica e pensamento computacional por faixa etária.",
  },
  {
    icon: Heart,
    title: "Virtudes formadas pela técnica",
    desc: "Prudência, responsabilidade, colaboração e domínio próprio dentro da educação tecnológica.",
  },
  {
    icon: Sparkles,
    title: "Ciberética e formação humana",
    desc: "Como preparar adolescentes para a vida digital sem entregá-los ao espírito deste mundo.",
  },
  {
    icon: Lightbulb,
    title: "Checklist de diagnóstico para a liderança",
    desc: "Ferramenta prática para avaliar onde sua escola está e por onde começar.",
  },
];

export function DiagnosticoTemas() {
  return (
    <Section className="pt-16 sm:pt-20 pb-16 sm:pb-20 bg-white relative">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Reveal>
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-royal))] mb-4 font-bold">
              O que você vai encontrar
            </p>
            <h2 className="font-display text-[rgb(var(--color-brand-navy))] text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] mb-5 text-balance">
              7 temas que vão transformar a educação tecnológica da sua escola
            </h2>
            <p className="text-[rgb(var(--color-brand-navy))]/70 text-[1.0625rem] leading-relaxed">
              Cada capítulo do ebook foi escrito para apoiar diretores, coordenadores e
              professores em decisões pedagógicas com clareza e propósito.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {temas.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.05}>
              <div className="group relative h-full p-6 sm:p-7 rounded-2xl bg-white border border-[rgb(var(--color-brand-navy))]/8 shadow-sm hover:shadow-xl hover:border-[rgb(var(--color-brand-mint))]/40 transition-all duration-300">
                <div className="size-12 rounded-xl bg-[rgb(var(--color-brand-mint))]/15 text-[rgb(var(--color-brand-mint-deep))] flex items-center justify-center mb-5">
                  <Icon className="size-6" />
                </div>
                <h3 className="font-display text-[rgb(var(--color-brand-navy))] text-[1.125rem] sm:text-[1.1875rem] leading-[1.2] mb-2.5">
                  {title}
                </h3>
                <p className="text-[rgb(var(--color-brand-navy))]/70 text-[0.9375rem] leading-relaxed">
                  {desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
