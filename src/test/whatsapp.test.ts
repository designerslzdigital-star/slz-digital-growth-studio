import { describe, expect, it } from "vitest";
import { HEADER_BREAKPOINTS, NAV_ANCHORS, REFS, SECTION_ORDER, SHOW_TEAM, SHOW_TESTIMONIAL, whatsappUrl, WHATSAPP_NUMBER } from "@/config/site";

describe("WhatsApp links", () => {
  it("appends the origin ref code to the prefilled message", () => {
    const url = whatsappUrl("Olá!", REFS.hero);
    expect(url).toBe(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! [ref: hero]")}`);
  });
  it("numbers solution shortcut cards 1 to 5", () => {
    expect(REFS.card(5)).toBe("solucoes-card-5");
  });
  it("adds the sixth solution origin", () => {
    expect(new URL(whatsappUrl("Resgate", REFS.card(6))).searchParams.get("text")).toBe("Resgate [ref: solucoes-card-6]");
  });
  it.each([["servicos", REFS.servicos], ["fundador", REFS.fundador], ["teste-seguranca", REFS.testeSeguranca]])("preserves the %s origin", (origin, ref) => {
    expect(new URL(whatsappUrl("Projeto", ref)).searchParams.get("text")).toBe(`Projeto [ref: ${origin}]`);
  });
  it("keeps the remaining blocks in order without the removed final CTA", () => {
    expect(SECTION_ORDER).toEqual(["hero", "numeros", "dor", "solucoes", "servicos", "prova", "fundador", "requisitos", "pos-entrega", "seguranca", "global", "faq", "rodape"]);
  });
  it("uses only the eight approved menu destinations", () => {
    expect(NAV_ANCHORS).toEqual(["solucoes", "servicos", "fundador", "requisitos", "pos-entrega", "seguranca", "global", "faq"]);
  });
  it("keeps header visibility at the requested thresholds", () => {
    expect(HEADER_BREAKPOINTS).toEqual({ languageName: 1400, whatsapp: 1220, desktopMenu: 1060 });
  });
  it("hides unapproved testimonials", () => { expect(SHOW_TESTIMONIAL).toBe(false); });
  it("hides unapproved team material", () => { expect(SHOW_TEAM).toBe(false); });
});
