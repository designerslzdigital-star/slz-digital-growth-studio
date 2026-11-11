import { LANGS, dicts, isLangSlug, langBySlug, DEFAULT_SLUG, type LangSlug } from "./index";

export const SITE_URL = "https://www.slzdigital.com.br/software";

export function langHead(raw: string, path = "", titleOverride?: string) {
  const slug: LangSlug = isLangSlug(raw) ? raw : DEFAULT_SLUG;
  const l = langBySlug(slug);
  const d = dicts[l.code];
  const title = titleOverride ? `${titleOverride} — SLZ Digital` : d.meta.title;
  const description = path === "/privacidade" ? d.legal.privacy[0] : path === "/termos" ? d.legal.terms[1] : d.meta.description;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: l.code.replace("-", "_") },
      { property: "og:url", content: `${SITE_URL}/${slug}${path}` },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: `${SITE_URL}/og-image.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/${slug}${path}` },
      ...LANGS.map((x) => ({ rel: "alternate", hrefLang: x.code, href: `${SITE_URL}/${x.slug}${path}` })),
      { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}/${DEFAULT_SLUG}${path}` },
    ],
  };
}
