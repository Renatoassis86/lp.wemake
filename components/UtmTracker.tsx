"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function UtmTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;

    const utm_source = searchParams.get("utm_source");
    const utm_campaign = searchParams.get("utm_campaign");
    const utm_medium = searchParams.get("utm_medium");
    const fbclid = searchParams.get("fbclid");

    const setCookie = (name: string, value: string) => {
      // Expira em 30 dias
      const date = new Date();
      date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;
    };

    if (utm_source) setCookie("utm_source", utm_source);
    if (utm_campaign) setCookie("utm_campaign", utm_campaign);
    if (utm_medium) setCookie("utm_medium", utm_medium);
    if (fbclid) setCookie("fbclid", fbclid);

  }, [searchParams]);

  return null;
}
