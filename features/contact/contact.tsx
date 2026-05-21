"use client";

import { Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Glow } from "@/components/ui/glow";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/constants/site";
import { ContactForm } from "./contact-form";

/**
 * Contact — split layout: institutional pitch on the left, lead form on the right.
 * Strategic CTA, not a generic “send us a message”.
 */
export function Contact() {
  return (
    <Section id="reuniao" bleed>
      <Glow color="cyan" size="xl" intensity={0.22} className="-right-40 top-0" />
      <Glow color="violet" size="lg" intensity={0.16} className="-left-40 bottom-0" />

      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Capítulo XIII · Reunião estratégica</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display font-light text-gradient-cinematic text-[clamp(2rem,1.6rem+2vw,3.5rem)] leading-[1.05] tracking-[-0.03em]">
                Vamos pensar a sua escola juntos.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-[1.0625rem] leading-[1.55] text-foreground/65">
                Toda parceria começa com uma reunião estratégica entre nosso
                time institucional e a direção da escola. Não é uma reunião
                comercial — é o início de um diálogo.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <dl className="mt-10 space-y-5">
                <ContactLine
                  icon={<Mail className="size-4" />}
                  label="Relacionamento institucional"
                  value={siteConfig.contact.email}
                  href={`mailto:${siteConfig.contact.email}`}
                />
                <ContactLine
                  icon={<MapPin className="size-4" />}
                  label="Sede"
                  value={siteConfig.contact.address}
                />
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-7">
            <Reveal delay={0.2}>
              <div
                className="
                  rounded-3xl border border-white/10
                  bg-ink-900/70 backdrop-blur-xl
                  p-8 lg:p-10
                  shadow-[0_40px_80px_-32px_rgba(0,0,0,0.7)]
                "
              >
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ContactLine({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const Tag = href ? "a" : "div";
  return (
    <div className="flex items-start gap-4">
      <div
        className="
          inline-flex size-10 items-center justify-center rounded-full
          border border-white/10 bg-white/[0.03] text-foreground/70
        "
        aria-hidden
      >
        {icon}
      </div>
      <div className="flex flex-col">
        <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-foreground/45">
          {label}
        </dt>
        <Tag
          {...(href ? { href } : {})}
          className="mt-1 font-display text-lg text-foreground hover:text-glow-cyan transition-colors"
        >
          {value}
        </Tag>
      </div>
    </div>
  );
}
