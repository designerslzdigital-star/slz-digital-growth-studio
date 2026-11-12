import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { canTrack, onConsentChange, readChoice } from "@/lib/consent";
import { initializeMetaPixel } from "@/lib/meta-pixel";

export function MetaPixel() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const trackedPath = useRef<string | null>(null);

  useEffect(() => {
    let active = true;

    const start = async () => {
      if (readChoice("advertising") !== "granted") return;
      const allowed = await canTrack("advertising");
      if (!active || !allowed || readChoice("advertising") !== "granted" || trackedPath.current === pathname) return;

      initializeMetaPixel();
      window.fbq?.("track", "PageView");
      trackedPath.current = pathname;
    };

    void start();
    const unsubscribe = onConsentChange(() => void start());
    return () => {
      active = false;
      unsubscribe();
    };
  }, [pathname]);

  return null;
}
