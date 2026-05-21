export function formatCount(n: number, locale = "pt-BR"): string {
  if (n >= 1000) {
    return new Intl.NumberFormat(locale, {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(n);
  }
  return n.toLocaleString(locale);
}

export function pad(n: number, width = 2): string {
  return n.toString().padStart(width, "0");
}

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
