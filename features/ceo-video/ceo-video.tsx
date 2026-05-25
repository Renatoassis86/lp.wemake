"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

const PANDA_VIDEO_SRC =
  "https://player-vz-98c53a17-46f.tv.pandavideo.com.br/embed/?v=22fe98ff-c64f-4250-bc9a-b357abb976d2";

export function CeoVideo() {
  return (
    <Section id="ceo" className="pt-12 pb-24 sm:pt-16 sm:pb-32 bg-[rgb(var(--color-brand-navy))] relative overflow-hidden">
      {/* Watermark W — canto inferior direito, escondido em mobile pra evitar scroll horizontal */}
      <div
        aria-hidden
        className="hidden md:block absolute -bottom-16 -right-20 w-[320px] md:w-[380px] lg:w-[420px] aspect-square opacity-[0.09] pointer-events-none select-none rotate-[12deg] z-0"
      >
        <Image src="/photos/3.png" alt="" fill className="object-contain" sizes="380px" />
      </div>

      <Container>
        <Reveal>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-[rgb(var(--color-brand-mint))]/80 mb-4">
              Masterclass · Dênis Júlio
            </p>
            <h2 className="font-display text-white text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.05] mb-6 text-balance">
              Por que ensinar tecnologia a partir da cosmovisão cristã?
            </h2>
            <p className="text-white/70 text-[1.125rem] leading-relaxed">
              A principal razão não é apenas a pressão do nosso tempo, uma normativa educacional ou o fato de que não existe neutralidade. Tudo isso importa, mas há algo mais profundo. Nesta masterclass, Dênis Júlio apresenta a principal razão pela qual nós, educadores cristãos, precisamos nos engajar nesta missão gloriosa de educar mentes e corações, levando a luz do Evangelho para a Educação Tecnológica e Digital.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="relative max-w-4xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl bg-black border border-white/10">
            {/* Wrapper 16:9 com iframe Panda Video */}
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                src={PANDA_VIDEO_SRC}
                title="Dênis Júlio — Ciência e fé"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
