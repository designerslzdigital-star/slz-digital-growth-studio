import { META_PIXEL_ID } from "@/config/site";
import { canTrack, readChoice } from "@/lib/consent";
import { reportMetaContact } from "@/lib/meta-contact.functions";

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export function initializeMetaPixel() {
  if (window.fbq) return;

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.queue = [];
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.id = "meta-pixel";
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  const firstScript = document.getElementsByTagName("script")[0];
  if (firstScript?.parentNode) firstScript.parentNode.insertBefore(script, firstScript);
  else document.head.appendChild(script);

  fbq("init", META_PIXEL_ID);
}

export function trackWhatsAppConversion(refCode: string) {
  if (readChoice("advertising") !== "granted") return;

  void (async () => {
    const allowed = await canTrack("advertising");
    if (!allowed || readChoice("advertising") !== "granted") return;

    const eventId = window.crypto.randomUUID();
    const customData = { content_name: "WhatsApp", content_category: refCode };
    window.fbq?.("track", "Contact", customData, { eventID: eventId });

    try {
      await reportMetaContact({ data: { eventId, ref: refCode } });
    } catch {
      // A measurement failure must never prevent the WhatsApp conversation.
    }
  })();
}
