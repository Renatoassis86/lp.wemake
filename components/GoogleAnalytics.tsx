import Script from "next/script";

// O ideal é definir NEXT_PUBLIC_GA_ID no arquivo .env.local
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "G-0L1LBJLKXJ"; 

export function GoogleAnalytics() {

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_TRACKING_ID}');
        `}
      </Script>
    </>
  );
}
