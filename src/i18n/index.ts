import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import ptBR from "./locales/pt-BR";
import ptPT from "./locales/pt-PT";
import esES from "./locales/es-ES";
import en from "./locales/en";

export const LANGS = [
  { slug: "pt-br", code: "pt-BR", name: "Português BR", flag: "🇧🇷" },
  { slug: "pt-pt", code: "pt-PT", name: "Português PT", flag: "🇵🇹" },
  { slug: "es", code: "es-ES", name: "Español", flag: "🇪🇸" },
  { slug: "en", code: "en", name: "English", flag: "🇬🇧" },
] as const;

export type LangSlug = (typeof LANGS)[number]["slug"];
export const DEFAULT_SLUG: LangSlug = "pt-br";
export const STORAGE_KEY = "slz-lang";

export const isLangSlug = (s: string): s is LangSlug => LANGS.some((l) => l.slug === s);
export const langBySlug = (s: LangSlug) => LANGS.find((l) => l.slug === s)!;

export const dicts = { "pt-BR": ptBR, "pt-PT": ptPT, "es-ES": esES, en };

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: Object.fromEntries(Object.entries(dicts).map(([k, v]) => [k, { translation: v }])),
    lng: "pt-BR",
    fallbackLng: "pt-BR",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    initAsync: false,
  });
}

/** Typed dictionary + t() bound to the route language (no global language switch). */
export function useDict(slug: LangSlug) {
  const code = langBySlug(slug).code;
  const { t } = useTranslation("translation", { lng: code });
  const d = dicts[code] as typeof ptBR;
  return { t, d, code };
}

export function detectSlug(): LangSlug {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && isLangSlug(saved)) return saved;
  } catch {
    /* storage unavailable */
  }
  const nav = (typeof navigator !== "undefined" ? navigator.language : "").toLowerCase();
  if (nav.startsWith("pt-pt")) return "pt-pt";
  if (nav.startsWith("pt")) return "pt-br";
  if (nav.startsWith("es")) return "es";
  if (nav.startsWith("en")) return "en";
  return DEFAULT_SLUG;
}

export function saveSlug(slug: LangSlug) {
  try {
    localStorage.setItem(STORAGE_KEY, slug);
  } catch {
    /* ignore */
  }
}

export default i18n;
