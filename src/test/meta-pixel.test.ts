import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  choice: "granted" as "granted" | "denied",
  send: vi.fn(),
}));

vi.mock("@/lib/consent", () => ({
  readChoice: () => mocks.choice,
  canTrack: async () => mocks.choice === "granted",
}));
vi.mock("@/lib/meta-contact.functions", () => ({
  reportMetaContact: mocks.send,
}));

import { trackWhatsAppConversion } from "@/lib/meta-pixel";

const EVENT_ID = "0f7c12f8-ae28-4b3b-b55f-c47dd08b3a37";

describe("Meta WhatsApp conversions", () => {
  beforeEach(() => {
    mocks.choice = "granted";
    mocks.send.mockReset();
    mocks.send.mockResolvedValue({ sent: true });
    window.fbq = vi.fn() as unknown as NonNullable<Window["fbq"]>;
    Object.defineProperty(window.crypto, "randomUUID", { configurable: true, value: () => EVENT_ID });
  });

  it("uses the same event ID in the Pixel and Conversions API for deduplication", async () => {
    trackWhatsAppConversion("hero");

    await vi.waitFor(() => expect(mocks.send).toHaveBeenCalledOnce());
    expect(window.fbq).toHaveBeenCalledWith(
      "track",
      "Contact",
      { content_name: "WhatsApp", content_category: "hero" },
      { eventID: EVENT_ID },
    );
    expect(mocks.send).toHaveBeenCalledWith({ data: { eventId: EVENT_ID, ref: "hero" } });
  });

  it("does not send a conversion without advertising consent", () => {
    mocks.choice = "denied";

    trackWhatsAppConversion("botao-flutuante");

    expect(window.fbq).not.toHaveBeenCalled();
    expect(mocks.send).not.toHaveBeenCalled();
  });
});
