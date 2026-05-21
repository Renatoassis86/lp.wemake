import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { Logo } from "@/components/ui/logo";
import { footerNav } from "@/constants/nav";
import { siteConfig } from "@/constants/site";

/**
 * Institutional footer — sober, editorial, four columns + brand line.
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-950 pt-24 pb-12">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-[1.6] text-foreground/55">
              {siteConfig.description}
            </p>
            <p className="mt-8 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-foreground/35">
              {siteConfig.contact.address}
            </p>
          </div>

          <FooterCol title="Institucional" links={footerNav.institucional} />
          <FooterCol title="Soluções" links={footerNav.solucoes} />
          <FooterCol title="Recursos" links={footerNav.recursos} />
        </div>

        <Divider className="my-12" />

        <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-foreground/40">
            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <ul className="flex flex-wrap gap-6 text-[0.8125rem] text-foreground/55">
            {footerNav.legal.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-foreground transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div
          aria-hidden
          className="mt-20 select-none text-center font-display font-light tracking-[-0.04em] leading-[0.9]"
          style={{
            fontSize: "clamp(4rem, 16vw, 18rem)",
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          We Make.
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div className="lg:col-span-2">
      <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-foreground/45">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-[0.9375rem] text-foreground/75 hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
