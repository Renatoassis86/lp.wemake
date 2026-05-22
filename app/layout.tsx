import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { fontVariables, fontDisplay, fontSans, fontMono } from "@/lib/fonts";
import { LenisProvider } from "@/lib/lenis";
import { ScrollProgressBar } from "@/components/motion/scroll-progress";
import { ChapterRail } from "@/components/navigation/chapter-rail";
import { Nav } from "@/features/navigation/nav";
import { Footer } from "@/features/footer/footer";
import { buildMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#040814" },
    { media: "(prefers-color-scheme: dark)", color: "#040814" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={cn(
        fontDisplay.variable,
        fontSans.variable,
        fontMono.variable,
        fontVariables,
      )}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground antialiased">
        <a
          href="#topo"
          className="
            sr-only focus:not-sr-only
            focus:fixed focus:top-4 focus:left-4 focus:z-[200]
            focus:px-4 focus:py-2 focus:rounded-full
            focus:bg-foreground focus:text-background focus:font-medium
          "
        >
          Pular para o conteúdo
        </a>

        <ScrollProgressBar />

        <LenisProvider>
          <Nav />
          <ChapterRail />
          {children}
          <Footer />
        </LenisProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
      </body>
    </html>
  );
}
