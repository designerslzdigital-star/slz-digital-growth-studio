import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  analytics: null as "granted" | "denied" | null,
  advertising: null as "granted" | "denied" | null,
  applySignals: vi.fn(),
}));

vi.mock("@/lib/consent", () => ({
  readChoice: (purpose: "analytics" | "advertising") => mocks[purpose],
  applySignals: mocks.applySignals,
}));

import { syncTagManager } from "@/lib/tag-manager";

describe("Google Tag Manager consent", () => {
  beforeEach(() => {
    document.getElementById("google-tag-manager")?.remove();
    window.dataLayer = [];
    mocks.analytics = null;
    mocks.advertising = null;
    mocks.applySignals.mockClear();
  });

  it("does not load before consent or after refusing both purposes", () => {
    syncTagManager();
    expect(document.getElementById("google-tag-manager")).toBeNull();
    mocks.analytics = "denied";
    mocks.advertising = "denied";
    syncTagManager();
    expect(window.dataLayer).toEqual([]);
  });

  it("loads GTM-WLNNQZFL only once after analytics consent and keeps advertising denied", () => {
    mocks.analytics = "granted";
    syncTagManager();
    syncTagManager();
    expect(document.querySelectorAll("#google-tag-manager")).toHaveLength(1);
    expect(document.getElementById("google-tag-manager")?.getAttribute("src")).toBe(
      "https://www.googletagmanager.com/gtm.js?id=GTM-WLNNQZFL",
    );
    expect(mocks.applySignals).toHaveBeenCalledWith("advertising", "denied");
    expect(window.dataLayer).toHaveLength(1);
  });

  it("loads after advertising consent without granting analytics", () => {
    mocks.advertising = "granted";
    syncTagManager();
    expect(document.getElementById("google-tag-manager")).not.toBeNull();
    expect(mocks.applySignals).toHaveBeenCalledWith("analytics", "denied");
  });

  it("updates both signals when consent is revoked without initializing again", () => {
    mocks.analytics = "granted";
    syncTagManager();
    mocks.applySignals.mockClear();
    mocks.analytics = "denied";
    syncTagManager();
    expect(mocks.applySignals).toHaveBeenCalledWith("analytics", "denied");
    expect(mocks.applySignals).toHaveBeenCalledWith("advertising", "denied");
    expect(window.dataLayer).toHaveLength(1);
  });
});