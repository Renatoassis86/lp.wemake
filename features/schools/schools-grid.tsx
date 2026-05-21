"use client";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { schools } from "@/data/schools";

/**
 * Wall of partner schools — institutional credibility row.
 * Two infinite marquees moving in opposite directions for cinematic weight.
 */
export function SchoolsGrid() {
  const top = schools.slice(0, Math.ceil(schools.length / 2));
  const bottom = schools.slice(Math.ceil(schools.length / 2));

  return (
    <Section id="escolas" bleed tight>
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 items-end">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Instituições parceiras</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display font-light text-gradient-cinematic text-[clamp(2rem,1.6rem+2vw,3.25rem)] leading-[1.1] tracking-[-0.025em]">
                Uma rede crescente de escolas{" "}
                <em className="font-display italic text-ivory-100">com convicção e ambição.</em>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.2}>
              <p className="text-[0.9375rem] leading-[1.6] text-foreground/65">
                Escolas confessionais de diferentes tradições têm escolhido a We Make
                como interlocutora institucional para repensar tecnologia e formação.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>

      <div className="mt-16 space-y-4">
        <Marquee speed="slow">
          {top.map((school) => (
            <SchoolChip key={school.id} name={school.name} location={`${school.city} · ${school.state}`} />
          ))}
        </Marquee>
        <Marquee speed="base" reverse>
          {bottom.map((school) => (
            <SchoolChip key={school.id} name={school.name} location={`${school.city} · ${school.state}`} />
          ))}
        </Marquee>
      </div>
    </Section>
  );
}

function SchoolChip({ name, location }: { name: string; location: string }) {
  return (
    <div
      className="
        flex items-center gap-4 shrink-0
        rounded-full border border-white/10 bg-white/[0.025] backdrop-blur-md
        px-6 py-3
      "
    >
      <span
        className="size-2 rounded-full bg-glow-cyan/80 shadow-[0_0_10px_rgba(96,165,250,0.6)]"
        aria-hidden
      />
      <div>
        <div className="font-display text-base leading-tight">{name}</div>
        <div className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-foreground/40">
          {location}
        </div>
      </div>
    </div>
  );
}
