import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { fontVariables, fontDisplay, fontSans, fontMono } from "@/lib/fonts";
import { LenisProvider } from "@/lib/lenis";
import { ScrollProgressBar } from "@/components/motion/scroll-progress";
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

function GlobalSVGMasks() {
  return (
    <svg width="0" height="0" className="absolute pointer-events-none" style={{ visibility: "hidden" }}>
      <defs>
        {/* Brush 1: Dinâmico e assimétrico */}
        <clipPath id="brush-1" clipPathUnits="objectBoundingBox">
          <path d="M0.05,0.1 C0.1,-0.05 0.8,-0.05 0.95,0.1 C1.1,0.25 1.05,0.8 0.9,0.95 C0.75,1.1 0.1,1.1 0.02,0.9 C-0.06,0.7 0,0.25 0.05,0.1 Z" />
        </clipPath>
        {/* Brush 2: Mais horizontal e ondulado */}
        <clipPath id="brush-2" clipPathUnits="objectBoundingBox">
          <path d="M0.1,0.05 C0.3,-0.02 0.7,-0.02 0.9,0.1 C1.05,0.2 1.1,0.7 0.95,0.9 C0.8,1.1 0.2,1.1 0.05,0.95 C-0.1,0.8 -0.05,0.2 0.1,0.05 Z" />
        </clipPath>
        {/* Brush 3: Formato de gota inclinada orgânica */}
        <clipPath id="brush-3" clipPathUnits="objectBoundingBox">
          <path d="M0.08,0.15 C0.15,0.02 0.85,-0.05 0.95,0.12 C1.05,0.3 0.98,0.85 0.85,0.95 C0.7,1.05 0.1,0.98 0.02,0.85 C-0.06,0.7 0,0.3 0.08,0.15 Z" />
        </clipPath>
        {/* Máscara do Problema / Propósito */}
        <clipPath id="problem-brush" clipPathUnits="objectBoundingBox">
          <path d="M0.08,0.15 C0.15,0.02 0.85,-0.05 0.95,0.12 C1.05,0.3 0.98,0.85 0.85,0.95 C0.7,1.05 0.1,0.98 0.02,0.85 C-0.06,0.7 0,0.3 0.08,0.15 Z" />
        </clipPath>
        {/* Máscara da Autoridade / Manifesto (CEO) */}
        <clipPath id="ceo-blob" clipPathUnits="objectBoundingBox">
          <path d="M0.52,0.03 C0.68,0.00 0.86,0.07 0.94,0.21 C1.02,0.35 0.99,0.53 0.96,0.68 C0.92,0.84 0.83,0.97 0.68,0.99 C0.53,1.01 0.38,0.94 0.26,0.84 C0.13,0.74 0.04,0.59 0.02,0.44 C-0.01,0.28 0.06,0.12 0.18,0.07 C0.30,0.02 0.42,0.05 0.52,0.03 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

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
        <GlobalSVGMasks />
        
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
