import { GOOGLE_TAG_MANAGER_ID } from "@/config/site";
import { applySignals, readChoice } from "@/lib/consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/** Load only after an explicit grant; unanswered purposes remain denied. */
export function syncTagManager() {
  const analytics = readChoice("analytics") ?? "denied";
  const advertising = readChoice("advertising") ?? "denied";
  applySignals("analytics", analytics);
  applySignals("advertising", advertising);

  if (analytics !== "granted" && advertising !== "granted") return;
  if (document.getElementById("google-tag-manager")) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.id = "google-tag-manager";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GOOGLE_TAG_MANAGER_ID}`;
  document.head.appendChild(script);
}