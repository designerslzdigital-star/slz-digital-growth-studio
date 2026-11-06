// Single source for contact config and WhatsApp origin codes.
// [PLACEHOLDER] Replace with the real number: country code + digits only, e.g. 5598XXXXXXXXX.
export const WHATSAPP_NUMBER = "5500000000000";

export const REFS = {
  header: "header",
  hero: "hero",
  solucoes: "solucoes",
  card: (n: number) => `solucoes-card-${n}`,
  diagnostico: "diagnostico",
  ctaFinal: "cta-final",
  flutuante: "botao-flutuante",
} as const;

// Content flags: blocks stay hidden until real, authorized content exists.
export const SHOW_TESTIMONIAL = false;
export const SHOW_TEAM = false;
export const SHOW_RESULTS = false;

export function whatsappUrl(message: string, ref: string) {
  const text = `${message} [ref: ${ref}]`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
