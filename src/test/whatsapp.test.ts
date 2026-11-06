import { describe, expect, it } from "vitest";
import { REFS, whatsappUrl, WHATSAPP_NUMBER } from "@/config/site";

describe("WhatsApp links", () => {
  it("appends the origin ref code to the prefilled message", () => {
    const url = whatsappUrl("Olá!", REFS.hero);
    expect(url).toBe(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! [ref: hero]")}`);
  });
  it("numbers solution shortcut cards 1 to 5", () => {
    expect(REFS.card(5)).toBe("solucoes-card-5");
  });
});
