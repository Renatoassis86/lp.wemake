import type { Metadata } from "next";
import { siteConfig } from "@/constants/site";

interface BuildMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Central SEO/metadata factory.
 * Every page/section that needs metadata flows through here
 * so titles, descriptions, OG, Twitter, canonical and JSON-LD stay aligned.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  ogImage = siteConfig.ogImage,
  noIndex = false,
}: BuildMetadataOptions = {}): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const fullTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description,
    applicationName: siteConfig.name,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: url,
      languages: { "pt-BR": url },
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: "pt_BR",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${siteConfig.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    manifest: "/site.webmanifest",
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    category: "education",
  };
}

/** Organization JSON-LD — emitted from the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/photos/2.png`,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    sameAs: Object.values(siteConfig.social),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Relacionamento Institucional",
        email: siteConfig.contact.email,
        availableLanguage: ["Portuguese"],
        areaServed: "BR",
      },
    ],
  } as const;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: "pt-BR",
    publisher: { "@type": "Organization", name: siteConfig.name },
  } as const;
}
