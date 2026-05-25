"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, GraduationCap, Star, BookOpen, Heart, Award } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  school: string;
  badge: string;
  icon: any;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Unir robótica prática com a soberania de Deus mudou o engajamento dos nossos alunos. O material didático da We Make é riquíssimo, aliando alta técnica e princípios eternos.",
    author: "Ana Beatriz Ramos",
    role: "Coordenadora Pedagógica",
    school: "Colégio Confessional Batista",
    badge: "Parceria Escolar",
    icon: GraduationCap,
    color: "from-[rgb(var(--color-brand-royal))]/20 to-[rgb(var(--color-brand-sky))]/10",
  },
  {
    id: 2,
    text: "A We Make nos ajudou a implantar a cultura maker sem ceder ao materialismo do mercado. Uma proposta pedagógica fundamentada na Cosmovisão Cristã e de altíssima qualidade técnica.",
    author: "Marcos Vinícius Souza",
    role: "Diretor Geral",
    school: "Colégio Presbiteriano da Aliança",
    badge: "Liderança",
    icon: Award,
    color: "from-[rgb(var(--color-brand-mint))]/20 to-[rgb(var(--color-brand-royal))]/10",
  },
  {
    id: 3,
    text: "Pela primeira vez, vejo os alunos programando e construindo robôs pensando em como servir ao próximo, resolver problemas reais e glorificar o Criador na cultura digital.",
    author: "Gabriel Mendes",
    role: "Professor de Tecnologia",
    school: "Instituto Educacional Videira",
    badge: "Corpo Docente",
    icon: BookOpen,
    color: "from-[rgb(var(--color-brand-sky))]/20 to-[rgb(var(--color-brand-mint))]/10",
  },
  {
    id: 4,
    text: "Ver meu filho construir tecnologia com discernimento moral, sabedoria e princípios teológicos sólidos conforta nosso coração como pais. Um diferencial sem igual.",
    author: "Renata Lemos",
    role: "Mãe Confessional",
    school: "Comunidade de Aprendizagem",
    badge: "Comunidade de Pais",
    icon: Heart,
    color: "from-[rgb(var(--color-brand-royal))]/20 to-[rgb(var(--color-brand-mint))]/10",
  },
  {
    id: 5,
    text: "A assessoria contínua de implantação e a formação docente nos deram segurança e consistência pedagógica. Hoje, nossa escola expressa verdade, beleza e propósito na tecnologia.",
    author: "Sandra Albuquerque",
    role: "Coordenadora de Inovação",
    school: "Colégio Confessional Shalom",
    badge: "Inovação Confessional",
    icon: Star,
    color: "from-[rgb(var(--color-brand-mint))]/20 to-[rgb(var(--color-brand-sky))]/10",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = (testimonials[activeIndex] || testimonials[0]) as Testimonial;
  const IconComponent = current.icon;

  return (
    <Section id="depoimentos" bleed className="relative pt-12 pb-24 sm:pt-16 sm:pb-32 bg-[rgb(var(--color-brand-navy))] overflow-hidden">
      {/* Moldes e brilhos de fundo lúdicos */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[rgb(var(--color-brand-mint))]/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[rgb(var(--color-brand-royal))]/15 blur-[120px] rounded-full" />
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <Reveal>
            <span className="font-mono text-sm uppercase tracking-widest text-[rgb(var(--color-brand-mint))] font-bold">
              Testemunhos Reais
            </span>
            <h2 className="mt-4 font-display text-white text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.1] text-balance">
              Escolas confessionais que<br className="hidden sm:block" /> transformaram suas salas de aula.
            </h2>
            <p className="mt-6 text-[1.125rem] text-white/70 leading-relaxed max-w-2xl mx-auto">
              Veja a opinião de diretores, coordenadores pedagógicos, educadores e famílias que encontraram na proposta da We Make a harmonia entre inovação e fé.
            </p>
          </Reveal>
        </div>

        {/* Mosaico Premium com Carrossel de Depoimentos */}
        <div className="relative max-w-4xl mx-auto" ref={containerRef}>

          {/* Fundo Decorativo Lúdico (Brush Stroke-inspired shape) */}
          <div
            className="absolute inset-x-4 -inset-y-6 bg-gradient-to-br from-[rgb(var(--color-brand-mint))]/15 to-[rgb(var(--color-brand-royal))]/10 -z-10 rounded-[3rem] blur-xl opacity-70 rotate-1"
          />

          <Reveal delay={0.2}>
            <div className="relative overflow-hidden bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-16 shadow-2xl flex flex-col md:flex-row gap-8 md:gap-12 items-center backdrop-blur-sm">

              {/* Moldura da esquerda: Badge flutuante lúdico */}
              <div className="relative flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-[rgb(var(--color-brand-royal))] to-[rgb(var(--color-brand-royal-deep))] text-white shadow-xl flex items-center justify-center transition-all duration-500 hover:rotate-6">

                {/* SVG Brush stroke decorativo */}
                <div className="absolute inset-1.5 border border-white/20 rounded-[2rem] pointer-events-none" />

                <IconComponent className="size-10 sm:size-14 md:size-16 opacity-90 animate-pulse" />

                <div className="absolute -bottom-2 -right-2 bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))] p-2.5 rounded-2xl shadow-lg border-2 border-[rgb(var(--color-brand-navy))]">
                  <Quote className="size-4" />
                </div>
              </div>

              {/* Corpo do Testemunho */}
              <div className="flex-1 flex flex-col justify-between h-full text-left">

                {/* Aspas decorativas transparentes no topo */}
                <div className="h-0 relative -top-6 -left-2 opacity-10 pointer-events-none">
                  <span className="font-serif text-[10rem] leading-none text-white">“</span>
                </div>

                <div className="relative min-h-[180px] sm:min-h-[160px] md:min-h-[140px] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={current.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="text-white/90 text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] leading-relaxed italic text-left sm:text-justify text-balance"
                    >
                      &ldquo;{current.text}&rdquo;
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="font-display text-white text-[1.125rem] font-bold">
                        {current.author}
                      </h4>
                      <p className="text-sm text-white/60 mt-0.5">
                        {current.role} · <span className="font-semibold text-[rgb(var(--color-brand-mint))]">{current.school}</span>
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.span
                      key={current.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="inline-flex self-start sm:self-center px-4 py-1.5 rounded-full bg-[rgb(var(--color-brand-mint))]/15 text-[rgb(var(--color-brand-mint))] font-bold text-xs uppercase tracking-wider border border-[rgb(var(--color-brand-mint))]/30"
                    >
                      {current.badge}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </Reveal>

          {/* Navegação Manual com Botões Redondos */}
          <div className="flex items-center justify-between mt-10 px-4">

            {/* Indicadores de bolinhas */}
            <div className="flex gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-[rgb(var(--color-brand-mint))]' : 'w-2.5 bg-white/20 hover:bg-white/40'}`}
                  aria-label={`Ir para depoimento ${i + 1}`}
                />
              ))}
            </div>

            {/* Controles de Seta */}
            <div className="flex gap-3">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-white/15 hover:border-[rgb(var(--color-brand-mint))] bg-white/5 text-white hover:text-[rgb(var(--color-brand-mint))] hover:bg-[rgb(var(--color-brand-mint))]/10 transition-all shadow-md flex items-center justify-center backdrop-blur-sm"
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-white/15 hover:border-[rgb(var(--color-brand-mint))] bg-white/5 text-white hover:text-[rgb(var(--color-brand-mint))] hover:bg-[rgb(var(--color-brand-mint))]/10 transition-all shadow-md flex items-center justify-center backdrop-blur-sm"
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>

          </div>

        </div>
      </Container>
    </Section>
  );
}
