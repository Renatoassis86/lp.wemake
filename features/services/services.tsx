"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Cpu, Scissors, Palette, Wrench, Settings, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

/* Paleta monocromática unificada (We Make navy/mint) — todos iguais */
const ICON_BG = "bg-[rgb(var(--color-brand-mint))]/15";
const ICON_COLOR = "text-[rgb(var(--color-brand-mint-deep))]";

const solutions = [
  {
    title: "Currículo completo de Educação Tecnológica e Maker",
    desc: "Aulas estruturadas com trilhas envolvendo programação, robótica, eletrônica, modelagem e impressão 3D, engenharia, cultura maker e cidadania digital.",
    color: ICON_BG,
    iconColor: ICON_COLOR,
    icon: Cpu,
  },
  {
    title: "Material didático do aluno",
    desc: "Livro maker do aluno, que funcionará como um portfólio pessoal: poderá anotar ideias; registrar etapas de criação, organizar aprendizados e conquistas ao longo das aulas.",
    color: ICON_BG,
    iconColor: ICON_COLOR,
    icon: BookOpen,
  },
  {
    title: "Metodologia própria",
    desc: "Conhecer · Explorar · Criar. Os alunos são convidados a conhecer um problema real, explorar conceitos fundamentais e criar soluções práticas por meio de projetos mão na massa.",
    color: ICON_BG,
    iconColor: ICON_COLOR,
    icon: Palette,
  },
  {
    title: "Assessoria pedagógica, tecnológica e teológica",
    desc: "A escola não recebe apenas aulas prontas, mas acompanhamento para implantação, formação docente, organização da sala maker e melhoria contínua da prática pedagógica.",
    color: ICON_BG,
    iconColor: ICON_COLOR,
    icon: Scissors,
  },
  {
    title: "Plataforma Virtual completa",
    desc: "Materiais e recursos organizados em um ambiente digital de apoio para os professores, pais e coordenação.",
    color: ICON_BG,
    iconColor: ICON_COLOR,
    icon: Settings,
  },
  {
    title: "Ecologia Formativa",
    desc: "Projetamos com você uma sala maker completa, que atenda toda a comunidade escolar e não apenas às aulas da We Make.",
    color: ICON_BG,
    iconColor: ICON_COLOR,
    icon: Wrench,
  },
];

export function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <Section
      id="solucoes"
      ref={containerRef}
      bleed
      className="relative min-h-[100svh] flex flex-col pt-16 pb-24 overflow-hidden bg-[rgb(var(--color-brand-royal))] z-10"
    >
      <BackgroundIcons y={yBg} />

      {/* Watermark W gigante — escondido em mobile (causaria bleed/overflow) */}
      <div
        aria-hidden
        className="hidden md:block absolute top-[8%] left-1/2 -translate-x-1/2 w-[320px] md:w-[420px] lg:w-[560px] aspect-square opacity-[0.07] pointer-events-none select-none z-0"
      >
        <Image src="/photos/3.png" alt="" fill className="object-contain" sizes="500px" />
      </div>

      <Container className="relative z-30 flex flex-col h-full gap-10 sm:gap-14 lg:gap-16">

        {/* Topo centralizado: título em destaque */}
        <div className="text-center max-w-4xl mx-auto mt-4 sm:mt-8 mb-2 sm:mb-4">
          <Reveal>
            <p className="font-mono text-[0.75rem] sm:text-[0.8125rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-mint))] mb-5 font-bold">
              O que entregamos
            </p>
            <h2 className="font-display text-white text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] mb-6 text-balance">
              Soluções e <span className="text-[rgb(var(--color-brand-mint))]">Diferenciais</span>
            </h2>
            <p className="text-white/85 text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-relaxed max-w-2xl mx-auto">
              Uma plataforma completa que une currículo, formação e tecnologia para escolas cristãs que querem ensinar com propósito.
            </p>
          </Reveal>
        </div>

        {/* Grid de Soluções com Cores Lúdicas */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-[1.5rem] p-6 sm:p-8 shadow-lg flex flex-col bg-white border-2 border-transparent hover:border-white card-hover-lift`}
            >
              <div className={`size-12 rounded-[1rem] ${item.color} flex items-center justify-center mb-5`}>
                <item.icon className={`size-6 ${item.iconColor}`} />
              </div>
              <h3 className="font-display text-[rgb(var(--color-brand-navy))] text-[1.125rem] sm:text-[1.25rem] font-bold mb-3 leading-[1.2]">
                {item.title}
              </h3>
              <p className="text-[rgb(var(--color-brand-navy))]/90 text-[1rem] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function BackgroundIcons({ y }: { y: any }) {
  return (
    <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none">
      <Cpu className="absolute top-[15%] left-[80%] size-24 text-white rotate-12" />
      <Settings className="absolute top-[50%] left-[15%] size-32 text-white -rotate-12" />
      <Palette className="absolute top-[70%] left-[85%] size-16 text-white rotate-6" />
      <Wrench className="absolute bottom-[10%] left-[45%] size-28 text-white rotate-45" />
      <BookOpen className="absolute bottom-[20%] right-[10%] size-20 text-white -rotate-12" />
      <Scissors className="absolute top-[30%] left-[5%] size-20 text-white rotate-12" />
    </motion.div>
  );
}

