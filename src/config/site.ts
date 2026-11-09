// Single source for contact config and WhatsApp origin codes.
// [PLACEHOLDER] Replace with the real number: country code + digits only, e.g. 5598XXXXXXXXX.
export const WHATSAPP_NUMBER = "5500000000000";

export const REFS = {
  header: "header",
  hero: "hero",
  solucoes: "solucoes",
  servicos: "servicos",
  fundador: "fundador",
  testeSeguranca: "teste-seguranca",
  card: (n: number) => `solucoes-card-${n}`,
  diagnostico: "diagnostico",
  ctaFinal: "cta-final",
  flutuante: "botao-flutuante",
} as const;

// Content flags: blocks stay hidden until real, authorized content exists.
export const SHOW_TESTIMONIAL = false;
export const SHOW_TEAM = false;
export const SHOW_RESULTS = false;

// Preview reminders are deliberately visible until every claim is approved.
export const SHOW_REVIEW_NOTES = true;
export const SYSTEMS_VIDEO_ID: string | null = null;
export const FOUNDER_PHOTO_URL: string | null = null;
export const SOURCE_URLS = {
  study: "https://proceedings.mlr.press/v306/zhao26ax.html",
  report: "https://www.xataka.com.br/diversos/vazamento-dados-custa-r-7-44-milhoes-em-media-no-brasil-recorde",
  law: "https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2018/lei/l13709.htm",
} as const;

export const SECTION_ORDER = ["hero", "numeros", "dor", "solucoes", "servicos", "prova", "fundador", "requisitos", "pos-entrega", "seguranca", "global", "faq", "cta-final", "rodape"] as const;
export const NAV_ANCHORS = ["solucoes", "servicos", "fundador", "requisitos", "pos-entrega", "seguranca", "global", "faq"] as const;
export const HEADER_BREAKPOINTS = { languageName: 1400, whatsapp: 1220, desktopMenu: 1060 } as const;

export function whatsappUrl(message: string, ref: string) {
  const text = `${message} [ref: ${ref}]`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
