import Image from "next/image";
import { BookOpen } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export function DiagnosticoAutor() {
  return (
    <Section bleed className="py-16 sm:py-24 bg-[rgb(var(--color-brand-navy))] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-[rgb(var(--color-brand-mint))]/[0.06] blur-[120px] rounded-full" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-center max-w-5xl mx-auto">

          {/* Foto do Dênis em blob orgânico */}
          <Reveal>
            <div className="relative w-full max-w-[320px] aspect-square mx-auto lg:mx-0">
              {/* Blob colorido atrás */}
              <div
                aria-hidden
                className="absolute inset-0 -z-10 scale-105"
                style={{
                  background: "linear-gradient(135deg, rgb(var(--color-brand-sky)) 0%, rgb(var(--color-brand-mint)) 100%)",
                  borderRadius: "62% 38% 47% 53% / 45% 60% 40% 55%",
                  filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.3))",
                }}
              />
              {/* Foto */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ borderRadius: "62% 38% 47% 53% / 45% 60% 40% 55%" }}
              >
                <Image
                  src="/photos/denis julio_bcgreen.png"
                  alt="Dênis Júlio — Fundador We Make"
                  fill
                  className="object-cover object-top"
                  sizes="320px"
                />
              </div>
            </div>
          </Reveal>

          {/* Bio */}
          <Reveal delay={0.15}>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--color-brand-mint))]/15 text-[rgb(var(--color-brand-mint))] font-bold text-sm mb-5 border border-[rgb(var(--color-brand-mint))]/30">
                <BookOpen className="size-4" />
                SOBRE O AUTOR
              </div>
              <h2 className="font-display text-white text-[clamp(1.875rem,3vw,2.75rem)] leading-[1.1] mb-5 text-balance">
                Dênis Júlio
              </h2>
              <p className="text-white/85 text-[1.0625rem] leading-relaxed mb-4">
                Fundador da <strong className="text-white">We Make</strong>, a primeira editora brasileira de Educação
                Tecnológica e Maker fundamentada na Cosmovisão Cristã.
              </p>
              <p className="text-white/75 text-[1rem] leading-relaxed mb-4">
                Graduado em Teologia, especialista em Educação Clássica (FICV) e mestre pelo
                Programa de Pós-Graduação em Inovação e Tecnologias Educacionais da UFRN. Atua há
                mais de 10 anos como professor de Educação Tecnológica, Robótica e Educação Maker
                em escolas confessionais cristãs.
              </p>
              <p className="text-white/75 text-[1rem] leading-relaxed">
                Autor do livro <em>Cartas para um Professor Digital</em>, publicado pela Metrópole
                Digital, e ativo nas redes sociais discutindo educação, tecnologia, fé e formação
                humana.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
