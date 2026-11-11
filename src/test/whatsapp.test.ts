import { describe, expect, it } from "vitest";
import { HEADER_BREAKPOINTS, NAV_ANCHORS, REFS, SECTION_ORDER, SHOW_TEAM, SHOW_TESTIMONIAL, whatsappUrl } from "@/config/site";

describe("WhatsApp links", () => {
  it("sends every button to the approved number with the fixed message", () => {
    const url = new URL(whatsappUrl("x", REFS.hero));
    expect(url.searchParams.get("phone")).toBe("5511941113933");
    expect(url.searchParams.get("text")).toBe("Olá, vim pelo site da SLZ Digital Softwares e desejo mais informações.");
    expect(whatsappUrl("y", REFS.header)).toBe(whatsappUrl("x", REFS.hero));
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
